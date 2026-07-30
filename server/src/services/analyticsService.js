const db = require("../db");
const {
    mapWeeklyData,
    mapMonthlyData,
    mapFriendGrowth
} = require("../utils/analyticsHelpers");
class AnalyticsService {

    async getDashboard(userId) {

        // Total Accepted Friends
        const friendsResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM friend_requests
            WHERE status='accepted'
            AND (sender_id=$1 OR receiver_id=$1)
            `,
            [userId]
        );

        // Total Events
        const eventsResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM events
            WHERE user_id=$1
            `,
            [userId]
        );

        // Total Messages Sent
        const messagesResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM messages
            WHERE sender_id=$1
            `,
            [userId]
        );

        // Total Groups Created
        const groupsResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM groups
            WHERE created_by=$1
            `,
            [userId]
        );

        // Unread Notifications
        const notificationsResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM notifications
            WHERE user_id=$1
            AND is_read=false
            `,
            [userId]
        );

        const friends = Number(friendsResult.rows[0].total);

        const events = Number(eventsResult.rows[0].total);

        const messages = Number(messagesResult.rows[0].total);

        const groups = Number(groupsResult.rows[0].total);

        const notifications = Number(
            notificationsResult.rows[0].total
        );

        const productivityScore =
            friends +
            (events * 2) +
            Math.floor(messages / 10) +
            (groups * 2) -
            notifications;

        return {

            friends,

            events,

            messages,

            groups,

            notifications,

            productivityScore

        };

    }

    async getMostActiveFriends(userId) {

        const result = await db.query(
            `
            SELECT
                u.id,
                u.name,
                COUNT(*)::INT AS messages
            FROM
            (
                SELECT
                    CASE
                        WHEN sender_id = $1 THEN receiver_id
                        ELSE sender_id
                    END AS friend_id
                FROM messages
                WHERE
                (
                    sender_id = $1
                    OR receiver_id = $1
                )
                AND is_group = false
            ) m

            JOIN users u
                ON u.id = m.friend_id

            JOIN friend_requests f
                ON
                (
                    (
                        f.sender_id = $1
                        AND f.receiver_id = u.id
                    )
                    OR
                    (
                        f.receiver_id = $1
                        AND f.sender_id = u.id
                    )
                )

            WHERE
                f.status='accepted'

            GROUP BY
                u.id,
                u.name

            ORDER BY
                messages DESC;
            `,
            [userId]
        );

        return result.rows;

    }

    async getProductivityScore(userId) {

        const [
            friends,
            events,
            messages,
            groups,
            comments,
            reactions,
            aiLogs,
            notifications
        ] = await Promise.all([

            db.query(`
                SELECT COUNT(*) AS total
                FROM friend_requests
                WHERE
                (
                    sender_id=$1
                    OR receiver_id=$1
                )
                AND status='accepted'
            `,[userId]),

            db.query(`
                SELECT COUNT(*) AS total
                FROM events
                WHERE user_id=$1
            `,[userId]),

            db.query(`
                SELECT COUNT(*) AS total
                FROM messages
                WHERE sender_id=$1
            `,[userId]),

            db.query(`
                SELECT COUNT(*) AS total
                FROM groups
                WHERE created_by=$1
            `,[userId]),

            db.query(`
                SELECT COUNT(*) AS total
                FROM comments
                WHERE user_id=$1
            `,[userId]),

            db.query(`
                SELECT COUNT(*) AS total
                FROM reactions
                WHERE user_id=$1
            `,[userId]),

            db.query(`
                SELECT COUNT(*) AS total
                FROM ai_logs
                WHERE user_id=$1
            `,[userId]),

            db.query(`
                SELECT COUNT(*) AS total
                FROM notifications
                WHERE
                    user_id=$1
                AND
                    is_read=false
            `,[userId])

        ]);

        const acceptedFriends = Number(friends.rows[0].total);

        const totalEvents = Number(events.rows[0].total);

        const totalMessages = Number(messages.rows[0].total);

        const totalGroups = Number(groups.rows[0].total);

        const totalComments = Number(comments.rows[0].total);

        const totalReactions = Number(reactions.rows[0].total);

        const totalAiLogs = Number(aiLogs.rows[0].total);

        const unreadNotifications =
            Number(notifications.rows[0].total);

        const score =
            acceptedFriends * 5 +
            totalEvents * 10 +
            totalMessages * 1 +
            totalGroups * 8 +
            totalComments * 3 +
            totalReactions * 2 +
            totalAiLogs * 4 -
            unreadNotifications;

        return {

            productivityScore: score,

            breakdown: {

                acceptedFriends,

                totalEvents,

                totalMessages,

                totalGroups,

                totalComments,

                totalReactions,

                totalAiLogs,

                unreadNotifications

            }

        };

    }

    async getEventSummary(userId) {

        const totalResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM events
            WHERE user_id = $1
            `,
            [userId]
        );

        const upcomingResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM events
            WHERE user_id = $1
            AND event_date >= CURRENT_DATE
            `,
            [userId]
        );

        const completedResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM events
            WHERE user_id = $1
            AND event_date < CURRENT_DATE
            `,
            [userId]
        );

        const weekResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM events
            WHERE user_id = $1
            AND DATE_TRUNC('week', event_date)
                = DATE_TRUNC('week', CURRENT_DATE)
            `,
            [userId]
        );

        const monthResult = await db.query(
            `
            SELECT COUNT(*) AS total
            FROM events
            WHERE user_id = $1
            AND DATE_TRUNC('month', event_date)
                = DATE_TRUNC('month', CURRENT_DATE)
            `,
            [userId]
        );

        return {

            totalEvents: Number(totalResult.rows[0].total),

            upcomingEvents: Number(upcomingResult.rows[0].total),

            completedEvents: Number(completedResult.rows[0].total),

            eventsThisWeek: Number(weekResult.rows[0].total),

            eventsThisMonth: Number(monthResult.rows[0].total)

        };

    }

    async getWeeklyActivity(userId) {

        const messageResult = await db.query(
            `
            SELECT
                EXTRACT(DOW FROM created_at)::INT AS day,
                COUNT(*)::INT AS total
            FROM messages
            WHERE sender_id = $1
            GROUP BY day
            `,
            [userId]
        );

        const eventResult = await db.query(
            `
            SELECT
                EXTRACT(DOW FROM event_date)::INT AS day,
                COUNT(*)::INT AS total
            FROM events
            WHERE user_id = $1
            GROUP BY day
            `,
            [userId]
        );

        return mapWeeklyData(
            messageResult.rows,
            eventResult.rows
        );

    }

    async getMonthlyActivity(userId) {

        const messageResult = await db.query(
            `
            SELECT
                EXTRACT(MONTH FROM created_at)::INT AS month,
                COUNT(*)::INT AS total
            FROM messages
            WHERE sender_id = $1
            GROUP BY month
            ORDER BY month
            `,
            [userId]
        );

        const eventResult = await db.query(
            `
            SELECT
                EXTRACT(MONTH FROM event_date)::INT AS month,
                COUNT(*)::INT AS total
            FROM events
            WHERE user_id = $1
            GROUP BY month
            ORDER BY month
            `,
            [userId]
        );

        return mapMonthlyData(
            messageResult.rows,
            eventResult.rows
        );

    }

    async getFriendGrowth(userId) {

        const result = await db.query(
            `
            SELECT
                EXTRACT(MONTH FROM created_at)::INT AS month,
                COUNT(*)::INT AS total
            FROM friend_requests
            WHERE
            (
                sender_id = $1
                OR receiver_id = $1
            )
            AND status = 'accepted'
            GROUP BY month
            ORDER BY month
            `,
            [userId]
        );

        const monthNames = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        return mapFriendGrowth(result.rows);

    }

}

module.exports = new AnalyticsService();