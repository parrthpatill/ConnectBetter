import { useState } from "react";
function ChatWindow({
    selectedFriend,
    messages,
    onSendMessage,
    isGroup = false,
}) {
    const [text, setText] = useState("");
    const currentUser =
        JSON.parse(localStorage.getItem("user"));

    if (!selectedFriend) {

        return (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">
                    Select a conversation to start chatting.
                </p>
            </div>
        );

    }

    return (

        <div className="flex-1 flex flex-col">

            <div className="border-b p-4 bg-white">

                <h2 className="text-xl font-semibold">
                    {selectedFriend.name}
                </h2>

                <p className="text-gray-500 text-sm">
                    {selectedFriend.email}
                </p>

            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">

                {
                    messages.length === 0 ? (

                        <p className="text-gray-400 text-center">
                            No messages yet.
                        </p>

                    ) : (

                        messages.map((message) => (

                            <div
                                key={message.id}
                                className={`flex ${
                                    message.sender_id === currentUser.id
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >

                                <div
                                    className={`px-4 py-2 rounded-lg max-w-xs ${
                                        message.sender_id === currentUser.id
                                            ? "bg-blue-500 text-white"
                                            : "bg-gray-200"
                                    }`}
                                >

                                    <div
                                        className={`px-4 py-2 rounded-lg max-w-xs ${
                                            message.sender_id === currentUser.id
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200"
                                        }`}
                                    >

                                        {isGroup && message.sender_id !== currentUser.id && (

                                            <div className="text-xs font-semibold mb-1">
                                                {message.sender_name || `User ${message.sender_id}`}
                                            </div>

                                        )}

                                        {message.text}

                                    </div>

                                </div>

                            </div>

                        ))

                    )
                }

            </div>

            <div className="border-t p-4 bg-white flex gap-3">

                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && text.trim()) {
                            onSendMessage(text);
                            setText("");
                        }
                    }}
                    placeholder="Type a message..."
                    className="flex-1 border rounded-lg px-4 py-2 outline-none"
                />

                <button
                    onClick={() => {

                        if (!text.trim()) {
                            return;
                        }

                        onSendMessage(text);

                        setText("");

                    }}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                >
                    Send
                </button>

            </div>

        </div>

    );
}

export default ChatWindow;