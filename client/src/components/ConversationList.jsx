function ConversationList({
    friends,
    selectedFriend,
    onSelectFriend,
}) {
    return (
        <div className="conversation-list">

            <div className="conversation-header">
                <h2>Conversations</h2>
            </div>

            {friends.length === 0 ? (

                <div className="conversation-empty">
                    No friends found.
                </div>

            ) : (

                friends.map((friend) => (

                    <button
                        key={friend.id}
                        onClick={() => onSelectFriend(friend)}
                        className={`conversation-item ${
                            selectedFriend?.id === friend.id
                                ? "active"
                                : ""
                        }`}
                    >

                        <div className="conversation-name">
                            {friend.name}
                        </div>

                        <div className="conversation-email">
                            {friend.email}
                        </div>

                    </button>

                ))

            )}

        </div>
    );
}

export default ConversationList;