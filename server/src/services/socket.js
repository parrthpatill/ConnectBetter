const db = require("../db");
const users = {}; // userId -> socketId

module.exports = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // 🔹 store user connection
        socket.on("join", (userId) => {
            users[userId] = socket.id;
            console.log("User joined:", userId);
        });

        // 🔹 send notification to specific user
        socket.on("send_notification", ({ userId, message }) => {
            const socketId = users[userId];

            if (socketId) {
                io.to(socketId).emit("receive_notification", message);
            }
        });

        // 🔹 disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);

            // remove user
            for (let id in users) {
                if (users[id] === socket.id) {
                    delete users[id];
                    break;
                }
            }
        });

        socket.on("sendMessage", async ({ sender, receiver, text }) => {
            try {
                // Save in DB
                const result = await db.query(
                    `INSERT INTO messages (sender_id, receiver_id, text)
                    VALUES ($1, $2, $3)
                    RETURNING *`,
                    [sender, receiver, text]
                );
                const message = result.rows[0];
                const room = [sender, receiver].sort().join("_");

                io.to(room).emit("receiveMessage", message);

            } catch (err) {
                console.log(err);
            }
        });
    });
};


