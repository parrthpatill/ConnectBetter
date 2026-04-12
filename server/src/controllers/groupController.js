const db = require("../db");

// Create group
exports.createGroup = async (req, res) => {
    const { name, members } = req.body;
    const userId = req.user.id;

    try {
        const result = await db.query(
            "INSERT INTO groups (name, created_by) VALUES ($1, $2) RETURNING *",
            [name, userId]
        );

        const group = result.rows[0];

        // add creator
        await db.query(
            "INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)",
            [group.id, userId]
        );

        // add members
        for (let m of members) {
            await db.query(
                "INSERT INTO group_members (group_id, user_id) VALUES ($1, $2)",
                [group.id, m]
            );
        }

        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};