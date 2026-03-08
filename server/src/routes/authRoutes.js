const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await pool.query(
            "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
            [name, email, hashedPassword]
        );

        res.json({
            message: "User registered successfully",
            user: user.rows[0]
        });

    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;