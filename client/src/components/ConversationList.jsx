function ConversationList({
    friends,
    selectedFriend,
    onSelectFriend,
}) {

    return (
        <div className="w-80 border-r bg-white">

            <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">
                    Conversations
                </h2>
            </div>

            {
                friends.length === 0 ? (

                    <div className="p-4 text-gray-500">
                        No friends found.
                    </div>

                ) : (

                    friends.map((friend) => (

                        <button
                            key={friend.id}
                            onClick={() => onSelectFriend(friend)}
                            className={`w-full text-left p-4 border-b hover:bg-gray-100 transition ${
                                selectedFriend?.id === friend.id
                                    ? "bg-gray-200"
                                    : ""
                            }`}
                        >

                            <div className="font-medium">
                                {friend.name}
                            </div>

                            <div className="text-sm text-gray-500">
                                {friend.email}
                            </div>

                        </button>

                    ))

                )
            }

        </div>
    );
}

export default ConversationList;