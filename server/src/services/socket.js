const db = require("../db");
const users = {}; // userId -> socketId

module.exports = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // 🔹 store user connection
        socket.on("join", (userId) => {
            socket.userId = userId;
            users[userId] = socket.id;
            console.log("User joined:", userId);
        });

        socket.on("joinPrivateRoom", ({ sender, receiver }) => {
            const room = [sender, receiver]
                .sort()
                .join("_");
            socket.join(room);
            console.log(
                `User ${sender} joined room ${room}`
            );
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

        socket.on("sendMessage", async ({ receiver, text }) => {
            console.log("sendMessage event received", {
                sender: socket.userId,
                receiver,
                text,
            });
            try {

                // Ensure the sender is authenticated
                if (!socket.userId) {
                    return;
                }

                // Check if both users are friends
                const friendship = await db.query(
                    `SELECT 1
                    FROM friend_requests
                    WHERE (
                            (sender_id = $1 AND receiver_id = $2)
                        OR (sender_id = $2 AND receiver_id = $1)
                    )
                    AND status = 'accepted'`,
                    [socket.userId, receiver]
                );

                if (friendship.rows.length === 0) {
                    return;
                }

                // Save message
                const result = await db.query(
                    `INSERT INTO messages (sender_id, receiver_id, text)
                    VALUES ($1, $2, $3)
                    RETURNING *`,
                    [socket.userId, receiver, text]
                );

                const message = result.rows[0];

                const room = [socket.userId, receiver]
                    .sort()
                    .join("_");

                io.to(room).emit("receiveMessage", message);

            } catch (err) {
                console.error(err);
            }
        });

        // Join group room
        socket.on("joinGroup", (groupId) => {
            socket.join(`group_${groupId}`);
        });

        socket.on(
            "sendGroupMessage",
            ({ groupId, message }) => {

                io.to(`group_${groupId}`).emit(
                    "receiveGroupMessage",
                    message
                );

            }
        );

    });
};


