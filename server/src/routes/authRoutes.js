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

router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await pool.query(
            "SELECT * FROM users WHERE email=$1",
            [email]
        );

        if(user.rows.length === 0){
            return res.status(400).json("User not found");
        }

        const validPassword = await bcrypt.compare(
            password,
            user.rows[0].password
        );

        if(!validPassword){
            return res.status(401).json("Invalid password");
        }

        const token = jwt.sign(
            { id: user.rows[0].id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (err) {
        console.error(err.message);
    }
});

module.exports = router;