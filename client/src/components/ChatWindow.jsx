import { useEffect, useRef, useState } from "react";

function ChatWindow({
    selectedFriend,
    messages,
    onSendMessage,
    isGroup = false,
}) {
    const [text, setText] = useState("");

    const currentUser =
        JSON.parse(localStorage.getItem("user"));

    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    if (!selectedFriend) {
        return (
            <div className="chat-window">
                <div className="chat-placeholder">
                    <p>Select a conversation to start chatting.</p>
                </div>
            </div>
        );
    }

    const handleSend = () => {
        if (!text.trim()) {
            return;
        }

        onSendMessage(text);
        setText("");
    };

    return (
        <div className="chat-window">

            <div className="chat-header">
                <h2>{selectedFriend.name}</h2>
                <p>{selectedFriend.email}</p>
            </div>

            <div className="chat-messages">

                {messages.length === 0 ? (

                    <p className="no-messages">
                        No messages yet.
                    </p>

                ) : (

                    messages.map((message) => {

                        const isMine =
                            message.sender_id === currentUser.id;

                        return (

                            <div
                                key={message.id}
                                className={`message-row ${
                                    isMine
                                        ? "sent"
                                        : "received"
                                }`}
                            >

                                <div
                                    className={`message-bubble ${
                                        isMine
                                            ? "sent"
                                            : "received"
                                    }`}
                                >

                                    {isGroup && !isMine && (

                                        <div className="sender-name">
                                            {message.sender_name ||
                                                `User ${message.sender_id}`}
                                        </div>

                                    )}

                                    {message.text}

                                </div>

                            </div>

                        );

                    })

                )}

                <div ref={messagesEndRef} />

            </div>

            <div className="chat-input-area">

                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) =>
                        setText(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSend();
                        }
                    }}
                />

                <button
                    className="send-btn"
                    onClick={handleSend}
                >
                    Send
                </button>

            </div>

        </div>
    );
}

export default ChatWindow;