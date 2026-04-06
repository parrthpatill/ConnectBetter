const db = require("../db");

// ADD COMMENT
exports.addComment = async (req, res) => {
    const userId = req.user.id;
    const { eventId, content } = req.body;

    try {
        // Insert comment into comments table
        const comment = await db.query(
            "INSERT INTO comments (user_id, event_id, content) VALUES ($1,$2,$3) RETURNING *",
            [userId, eventId, content]
        );

        // Get Even Detials
        const event = await db.query(
            "SELECT user_id FROM events WHERE id = $1",
            [eventId]
        );

        // check is it is a self comment
        if (event.rows[0].user_id !== userId) {
            // create notification
            await db.query(
                "INSERT INTO notifications (user_id, sender_id, type, event_id) VALUES ($1,$2,$3,$4)",
                [event.rows[0].user_id, userId, "comment", eventId]
            );
        }

        res.json(comment.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};