const db = require("../db");
const users = {}; // userId -> socketId

module.exports = (io) => {

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // 🔹 store user connection
        socket.on("join", (userId) => {

            socket.userId = userId;

            users[userId] = socket.id;

            socket.join(userId.toString());

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

        socket.on("sendMessage", (message) => {

            const room = [
                message.sender_id,
                message.receiver_id,
            ]
                .sort()
                .join("_");

            io.to(room).emit("receiveMessage", message);

        });

        // Join group room
        socket.on("joinGroup", async (groupId) => {
            try {
                if (!socket.userId) {
                    return;
                }

                const member = await db.query(
                    `SELECT 1
                    FROM group_members
                    WHERE group_id = $1
                    AND user_id = $2`,
                    [groupId, socket.userId]
                );

                if (member.rows.length === 0) {
                    return;
                }

                socket.join(`group_${groupId}`);

            } catch (err) {
                console.error(err);
            }
        });
        socket.on("leaveGroup", (groupId) => {
            socket.leave(`group_${groupId}`);
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


