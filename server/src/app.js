require('dotenv').config();
require('./db');

const express = require('express');
const cors = require('cors');
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friends");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);

app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "ConnectBetter API is running 🚀"
    });
});

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json("Protected route accessed!");
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});