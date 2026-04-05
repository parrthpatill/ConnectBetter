const db = require("../db");

// CREATE EVENT
exports.createEvent = async (req, res) => {
    const userId = req.user.id;
    const { title, description, event_type, event_date } = req.body;

    try {
        const result = await db.query(
            `INSERT INTO events (user_id, title, description, event_type, event_date)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [userId, title, description, event_type, event_date]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// FETCH EVENTS
exports.getEvents = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT e.*, u.name
            FROM events e
            JOIN users u ON e.user_id = u.id
            ORDER BY e.created_at DESC
        `);

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
    const userId = req.user.id;
    const eventId = req.params.id;

    try {
        const event = await db.query(
            "SELECT * FROM events WHERE id = $1",
            [eventId]
        );

        if (event.rows.length === 0) {
            return res.status(404).json({ error: "Event not found" });
        }

        if (event.rows[0].user_id !== userId) {
            return res.status(403).json({ error: "Unauthorized" });
        }

        await db.query("DELETE FROM events WHERE id = $1", [eventId]);

        res.json({ message: "Event deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
};