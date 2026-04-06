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

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};