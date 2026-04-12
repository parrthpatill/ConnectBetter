const db = require("../db");

// Helper function to check if two users are friends
async function checkFriend(u1, u2) {
    const result = await db.query(
        `SELECT 1 FROM friends 
         WHERE (user1 = $1 AND user2 = $2)
            OR (user1 = $2 AND user2 = $1)`,
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