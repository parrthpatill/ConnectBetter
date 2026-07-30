import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api/axios";

import ConversationList from "../components/ConversationList";
import ChatWindow from "../components/ChatWindow";
import socket from "../services/socket";

import "../styles/messages.css";

function Messages() {

    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);

    const location = useLocation();

    useEffect(() => {

        const fetchFriends = async () => {

            try {

                const response = await api.get("/friends");

                setFriends(response.data);

                if (location.state?.friend) {

                    const friend = response.data.find(
                        (f) => f.id === location.state.friend.id
                    );

                    if (friend) {
                        setSelectedFriend(friend);
                    }

                }

            } catch (error) {

                console.error("Failed to load friends:", error);

            }

        };

        fetchFriends();

    }, [location.state]);

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

        const currentUser =
            JSON.parse(localStorage.getItem("user"));

        socket.emit("joinPrivateRoom", {
            sender: currentUser.id,
            receiver: selectedFriend.id,
        });

    }, [selectedFriend]);

    useEffect(() => {

        const handleReceiveMessage = (message) => {

            setMessages((prev) => {

                const exists = prev.some(
                    (msg) => msg.id === message.id
                );

                if (exists) {
                    return prev;
                }

                return [...prev, message];

            });

        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {

            socket.off(
                "receiveMessage",
                handleReceiveMessage
            );

        };

    }, []);

    const handleSendMessage = async (text) => {

        if (!selectedFriend || !text.trim()) {
            return;
        }

        try {

            const res = await api.post("/messages", {
                receiverId: selectedFriend.id,
                text,
            });

            socket.emit("sendMessage", res.data);

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="messages-page">

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