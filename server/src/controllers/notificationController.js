const db = require("../db");

exports.getNotifications = async (req, res) => {
    const userId = req.user.id;

    try {
        const notifications = await db.query(
            `SELECT
                n.*,
                u.name AS sender_name
            FROM notifications n
            LEFT JOIN users u
                ON u.id = n.sender_id
            WHERE n.user_id = $1
            ORDER BY n.created_at DESC`,
            [userId]
        );

        const formattedNotifications = notifications.rows.map((notification) => {

            let message = "";

            switch (notification.type) {

                case "comment":
                    message = `${notification.sender_name} commented on your event.`;
                    break;

                case "reaction":
                    message = `${notification.sender_name} reacted to your event.`;
                    break;

                case "friend_request":
                    message = `${notification.sender_name} sent you a friend request.`;
                    break;

                case "friend_accept":
                    message = `${notification.sender_name} accepted your friend request.`;
                    break;

                default:
                    message = "New notification.";

            }

            return {
                ...notification,
                message
            };

        });

        res.json(formattedNotifications);


    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Server error",
        });
    }
};

exports.markNotificationsRead = async (req, res) => {
    const userId = req.user.id;

    try {

        await db.query(
            `UPDATE notifications
             SET is_read = TRUE
             WHERE user_id = $1
               AND is_read = FALSE`,
            [userId]
        );

        res.json({
            message: "Notifications marked as read"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Server error"
        });

    }
};

exports.getUnreadCount = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT COUNT(*) AS count
             FROM notifications
             WHERE user_id = $1
             AND is_read = FALSE`,
            [req.user.id]
        );

        res.json({
            count: Number(result.rows[0].count)
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Server error"
        });
    }
};