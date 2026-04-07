const db = require("../db");

// GET NOTIFICATIONS
exports.getNotifications = async (req, res) => {
    const userId = req.user.id;

    try {
        const notifications = await db.query(
            `SELECT * FROM notifications
             WHERE user_id = $1
             ORDER BY created_at DESC`,
            [userId]
        );

        res.json(notifications.rows);

        const io = req.app.get("io");
        io.to(user_id).emit("receive_notification", {
            message: "You got a notification"
        });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};