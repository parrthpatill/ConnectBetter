const db = require("../db");

// ADD / UPDATE REACTION
exports.reactToEvent = async (req, res) => {
    const userId = req.user.id;
    const { eventId, type } = req.body;

    try {
        const reaction = await db.query(
            `INSERT INTO reactions (user_id, event_id, type)
             VALUES ($1,$2,$3)
             ON CONFLICT (user_id, event_id)
             DO UPDATE SET type = $3
             RETURNING *`,
            [userId, eventId, type]
        );

        // 🔔 CREATE NOTIFICATION
        const event = await db.query(
            "SELECT user_id FROM events WHERE id = $1",
            [eventId]
        );

        if (event.rows[0].user_id !== userId) {
            await db.query(
                "INSERT INTO notifications (user_id, sender_id, type, event_id) VALUES ($1,$2,$3,$4)",
                [event.rows[0].user_id, userId, "reaction", eventId]
            );
        }

        res.json(reaction.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};