import { useEffect, useState } from "react";
import api from "../api/axios";

import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow";
import socket from "../services/socket";

function Messages() {

    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {

        const fetchFriends = async () => {

            try {

                const response = await api.get("/friends");

                setFriends(response.data);

            } catch (error) {

                console.error("Failed to load friends:", error);

            }

        };

        fetchFriends();

    }, []);

    useEffect(() => {

        if (!selectedFriend) {
            setMessages([]);
            return;
        }

        const fetchMessages = async () => {

            try {

                const response = await api.get(
                    `/messages/${selectedFriend.id}`
                );

                setMessages(response.data);

            } catch (error) {

                console.error("Failed to load messages:", error);

            }

        };

        fetchMessages();

    }, [selectedFriend]);

    useEffect(() => {

        if (!selectedFriend) {
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem("user"));

        socket.emit("joinPrivateRoom", {
            sender: currentUser.id,
            receiver: selectedFriend.id,
        });

    }, [selectedFriend]);

    useEffect(() => {

        const handleReceiveMessage = (message) => {

            setMessages((prev) => {

                // Prevent duplicate messages
                const exists = prev.some((msg) => msg.id === message.id);

                if (exists) {
                    return prev;
                }

                return [...prev, message];

            });

        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {

            socket.off("receiveMessage", handleReceiveMessage);

        };

    }, []);

    // temperory
    useEffect(() => {
        console.log("Socket connected:", socket.connected);

        socket.on("connect", () => {
            console.log("Socket connected with id:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.log("Socket error:", err);
        });

        return () => {
            socket.off("connect");
            socket.off("connect_error");
        };
    }, []);

    const handleSendMessage = (text) => {
        console.log("Sending:", text);
        if (!selectedFriend || !text.trim()) {
            return;
        }

        socket.emit("sendMessage", {
            receiver: selectedFriend.id,
            text,
        });

    };

    return (
        <div className="flex h-[calc(100vh-80px)] bg-gray-100 rounded-lg overflow-hidden">

            <ConversationList
                friends={friends}
                selectedFriend={selectedFriend}
                onSelectFriend={setSelectedFriend}
            />

            <ChatWindow
                selectedFriend={selectedFriend}
                messages={messages}
                onSendMessage={handleSendMessage}
            />

        </div>
    );
}

export default Messages;