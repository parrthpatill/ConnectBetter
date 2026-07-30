const db = require("../db");

// Helper function to check if two users are friends
async function checkFriend(u1, u2) {
    const result = await db.query(
        `SELECT 1
         FROM friend_requests
         WHERE (
                (sender_id = $1 AND receiver_id = $2)
             OR (sender_id = $2 AND receiver_id = $1)
         )
         AND status = 'accepted'`,
        [u1, u2]
    );

    return result.rows.length > 0;
}

// Send message (REST)
exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, text } = req.body;

        // Check if users are friends
        const isFriend = await checkFriend(req.user.id, receiverId);
        if (!isFriend) {
            return res.status(403).json({ error: "Not friends" });
        }

        const result = await db.query(
            `INSERT INTO messages (sender_id, receiver_id, text)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [req.user.id, receiverId, text]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get chat history
exports.getMessages = async (req, res) => {
    try {
        const { userId } = req.params;

        // Check if users are friends
        const isFriend = await checkFriend(req.user.id, userId);
        if (!isFriend) {
            return res.status(403).json({ error: "Not friends" });
        }

        const result = await db.query(
            `SELECT * FROM messages
             WHERE (sender_id = $1 AND receiver_id = $2)
                OR (sender_id = $2 AND receiver_id = $1)
             ORDER BY created_at ASC`,
            [req.user.id, userId]
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getGroupMessages = async (req, res) => {
    const { groupId } = req.params;
    const member = await db.query(
        `SELECT 1
        FROM group_members
        WHERE group_id = $1
        AND user_id = $2`,
        [groupId, req.user.id]
    );

    if (member.rows.length === 0) {

        return res.status(403).json({
            error: "Not a member of this group"
        });

    }
    try {
        const result = await db.query(
            `SELECT
                m.*,
                u.name AS sender_name
            FROM messages m
            JOIN users u
            ON u.id = m.sender_id
            WHERE m.group_id = $1
            ORDER BY m.created_at ASC`,
            [groupId]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.sendGroupMessage = async (req, res) => {

    const { groupId, text } = req.body;

    try {

        // Verify membership
        const member = await db.query(
            `SELECT 1
             FROM group_members
             WHERE group_id = $1
             AND user_id = $2`,
            [groupId, req.user.id]
        );

        if (member.rows.length === 0) {
            return res.status(403).json({
                error: "Not a member of this group"
            });
        }

        const inserted = await db.query(
            `INSERT INTO messages
            (
                sender_id,
                receiver_id,
                text,
                group_id,
                is_group
            )
            VALUES
            (
                $1,
                NULL,
                $2,
                $3,
                TRUE
            )
            RETURNING id`,
            [
                req.user.id,
                text,
                groupId
            ]
        );

        const result = await db.query(
            `SELECT
                m.*,
                u.name AS sender_name
            FROM messages m
            JOIN users u
            ON u.id = m.sender_id
            WHERE m.id = $1`,
            [inserted.rows[0].id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

};