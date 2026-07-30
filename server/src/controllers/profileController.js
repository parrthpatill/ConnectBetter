const db = require("../db");

exports.getProfile = async (req, res) => {
    try {

        const userId = req.user.id;

        // User details
        const userResult = await db.query(
            `SELECT id, name, email, created_at
             FROM users
             WHERE id = $1`,
            [userId]
        );

        if (userResult.rows.length === 0) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        // Friend count
        const friendsResult = await db.query(
            `SELECT COUNT(*)
             FROM friend_requests
             WHERE (
                    sender_id = $1
                 OR receiver_id = $1
             )
             AND status = 'accepted'`,
            [userId]
        );

        // Event count
        const eventsResult = await db.query(
            `SELECT COUNT(*)
             FROM events
             WHERE user_id = $1`,
            [userId]
        );

        // Recent events
        const recentEventsResult = await db.query(
            `SELECT id, title, event_date
            FROM events
            WHERE user_id = $1
            ORDER BY event_date DESC
            LIMIT 5`,
            [userId]
        );
        res.json({
            user: userResult.rows[0],
            friends: Number(friendsResult.rows[0].count),
            events: Number(eventsResult.rows[0].count),
            recentEvents: recentEventsResult.rows,
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Server error",
        });

    }
};