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

module.exports = router;