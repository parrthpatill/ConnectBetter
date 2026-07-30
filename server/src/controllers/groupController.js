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
        const uniqueMembers = [...new Set(members || [])];

        for (const memberId of uniqueMembers) {

            if (memberId === userId) continue;

            await db.query(
                `INSERT INTO group_members
                (group_id, user_id)
                VALUES ($1,$2)`,
                [group.id, memberId]
            );

        }

        res.json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getMyGroups = async (req, res) => {

    try {

        const result = await db.query(
            `SELECT
                g.id,
                g.name,
                g.created_at,
                COUNT(gm2.user_id) AS member_count
            FROM groups g
            JOIN group_members gm
                ON gm.group_id = g.id
            LEFT JOIN group_members gm2
                ON gm2.group_id = g.id
            WHERE gm.user_id = $1
            GROUP BY g.id
            ORDER BY g.created_at DESC;`,
            [req.user.id]
        );

        res.json(
             result.rows.map(group => ({
                ...group,
                member_count: Number(group.member_count),
            }))
        );

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};