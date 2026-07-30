require("dotenv").config();
require("./db");

const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");
const authRoutes = require("./routes/authRoutes");
const friendRoutes = require("./routes/friends");
const eventRoutes = require("./routes/eventRoutes");
const messageRoutes = require("./routes/messageRoutes");
const aiRoutes = require("./routes/aiRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const profileRoutes = require("./routes/profileRoutes");

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// =========================
// CORS Configuration
// =========================

const allowedOrigins = [
    "http://localhost:5173",
    "https://connect-better.vercel.app",
];

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests without origin (Postman, Render health checks)
        if (!origin) {
            return callback(null, true);
        }

        // Allow localhost, production and ALL Vercel preview deployments
        if (
            allowedOrigins.includes(origin) ||
            origin.endsWith(".vercel.app")
        ) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
};

// Socket.IO
const io = new Server(server, {
    cors: corsOptions,
});

app.set("io", io);

app.use(cors(corsOptions));
app.use(express.json());

// =========================
// Routes
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/reactions", require("./routes/reactionRoutes"));
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/messages", messageRoutes);
app.use("/api/groups", require("./routes/groupRoutes"));
app.use("/api/ai", aiRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/profile", profileRoutes);

// Socket handlers
require("./services/socket")(io);

// =========================
// Health Check
// =========================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "ConnectBetter API is running 🚀",
    });
});

// Protected Route

app.get("/api/protected", authMiddleware, (req, res) => {
    res.json("Protected route accessed!");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});