const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/authMiddleware"); 

// Sending Request
router.post("/request/:id", auth, async (req, res) => {
    const sender = req.user.id;
    const receiver = req.params.id;

    if (sender == receiver)
        return res.status(400).json({ msg: "Cannot send to yourself" });

    // prevent duplicate & reverse duplicate
    const exist = await db.query(
        `SELECT * FROM friend_requests 
         WHERE (sender_id=$1 AND receiver_id=$2)
         OR (sender_id=$2 AND receiver_id=$1)`,
        [sender, receiver]
    );

    if (exist.rows.length > 0)
        return res.status(400).json({ msg: "Request already exists" });

    await db.query(
        "INSERT INTO friend_requests (sender_id, receiver_id) VALUES ($1,$2)",
        [sender, receiver]
    );

    await db.query(
        `INSERT INTO notifications
        (
            user_id,
            sender_id,
            type
        )
        VALUES
        (
            $1,
            $2,
            $3
        )`,
        [
            receiver,
            sender,
            "friend_request"
        ]
    );
    const io = req.app.get("io");

    io.to(receiver.toString()).emit(
        "newNotification"
    );
    res.json({ msg: "Friend request sent" });
});

// Accept Request
router.post("/accept/:id", auth, async (req, res) => {
    const receiver = req.user.id;
    const sender = req.params.id;

    const result = await db.query(
        `UPDATE friend_requests 
         SET status='accepted' 
         WHERE sender_id=$1 AND receiver_id=$2`,
        [sender, receiver]
    );
    await db.query(
        `INSERT INTO notifications
        (
            user_id,
            sender_id,
            type
        )
        VALUES
        (
            $1,
            $2,
            $3
        )`,
        [
            sender,
            receiver,
            "friend_accept"
        ]
    );
    const io = req.app.get("io");

    io.to(sender.toString()).emit(
        "newNotification"
    );

    if (result.rowCount === 0)
        return res.status(404).json({ msg: "Request not found" });

    res.json({ msg: "Friend request accepted" });
});

// Get Friends
router.get("/", auth, async (req, res) => {
    const userId = req.user.id;

    const result = await db.query(`
        SELECT u.id, u.name, u.email
        FROM users u
        WHERE u.id IN (
            SELECT sender_id FROM friend_requests 
            WHERE receiver_id=$1 AND status='accepted'
            UNION
            SELECT receiver_id FROM friend_requests 
            WHERE sender_id=$1 AND status='accepted'
        )
    `, [userId]);

    res.json(result.rows);
});

// Get pending requests
router.get("/pending", auth, async (req, res) => {
    const userId = req.user.id;

    const result = await db.query(`
        SELECT fr.id, u.id as sender_id, u.name, u.email
        FROM friend_requests fr
        JOIN users u ON fr.sender_id = u.id
        WHERE fr.receiver_id=$1 AND fr.status='pending'
    `, [userId]);

    res.json(result.rows);
});

// Search users
router.get("/search", auth, async (req, res) => {

    const userId = req.user.id;
    const query = req.query.query || "";

    try {

        const result = await db.query(
            `SELECT id, name, email
             FROM users
             WHERE id != $1
               AND (
                    name ILIKE $2
                    OR email ILIKE $2
               )
             LIMIT 20`,
            [userId, `%${query}%`]
        );

        res.json(result.rows);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: "Server error"
        });

    }

});

module.exports = router;