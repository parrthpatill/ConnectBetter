import { useEffect, useState } from "react";
import "../styles/friends.css";
import { useNavigate } from "react-router-dom";
import {
    searchUsers,
    sendFriendRequest,
    getPendingRequests,
    acceptFriendRequest,
    getFriends,
} from "../services/friendService";

function Friends() {

    const [query, setQuery] = useState("");

    const [results, setResults] = useState([]);

    const [pending, setPending] = useState([]);

    const [friends, setFriends] = useState([]);

    const [sentRequests, setSentRequests] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {

        try {

            const requests = await getPendingRequests();
            const friendsList = await getFriends();

            setPending(requests);
            setFriends(friendsList);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        fetchData();

    }, []);

    const handleSearch = async (value) => {

        setQuery(value);

        if (!value.trim()) {

            setResults([]);
            return;

        }

        try {

            const users = await searchUsers(value);

            setResults(users);

        } catch (err) {

            console.error(err);

        }

    };

    const handleSendRequest = async (id) => {

        try {

            await sendFriendRequest(id);

            setSentRequests(prev => [...prev, id]);

        } catch (err) {

            console.error(err);

        }

    };

    const handleAccept = async (id) => {

        try {

            await acceptFriendRequest(id);

            fetchData();

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="friends-page">

            <div className="friends-header">

                <h1>Friends</h1>

                <p>
                    Search users, manage requests and connect with friends.
                </p>

            </div>

            <div className="friends-section">

                <h2>Search Users</h2>

                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="friends-search"
                />

                {results.length > 0 && (

                    <div className="friends-list">

                        {results.map((user) => (

                            <div
                                key={user.id}
                                className="friend-card"
                            >

                                <div className="friend-info">

                                    <div className="friend-avatar">

                                        {user.name.charAt(0).toUpperCase()}

                                    </div>

                                    <div>

                                        <h3>{user.name}</h3>

                                        <p>{user.email}</p>

                                    </div>

                                </div>

                                <button
                                    disabled={sentRequests.includes(user.id)}
                                    onClick={() =>
                                        handleSendRequest(user.id)
                                    }
                                >

                                    {sentRequests.includes(user.id)
                                        ? "Request Sent"
                                        : "Send Request"}

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            <div className="friends-section">

                <h2>
                    Pending Requests ({pending.length})
                </h2>

                {pending.length === 0 ? (

                    <p>No pending requests.</p>

                ) : (

                    <div className="friends-list">

                        {pending.map((user) => (

                            <div
                                key={user.sender_id}
                                className="friend-card"
                            >

                                <div className="friend-info">

                                    <div className="friend-avatar">

                                        {user.name.charAt(0).toUpperCase()}

                                    </div>

                                    <div>

                                        <h3>{user.name}</h3>

                                        <p>{user.email}</p>

                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        handleAccept(user.sender_id)
                                    }
                                >

                                    Accept

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            <div className="friends-section">

                <h2>
                    Your Friends ({friends.length})
                </h2>

                {friends.length === 0 ? (

                    <p>No friends yet.</p>

                ) : (

                    <div className="friends-list">

                        {friends.map((user) => (

                            <div
                                key={user.id}
                                className="friend-card"
                            >

                                <div className="friend-info">

                                    <div className="friend-avatar">

                                        {user.name.charAt(0).toUpperCase()}

                                    </div>

                                    <div>

                                        <h3>{user.name}</h3>

                                        <p>{user.email}</p>

                                    </div>

                                </div>

                                <button
                                    onClick={() =>
                                        navigate("/messages", {
                                            state: {
                                                friend: user,
                                            },
                                        })
                                    }
                                >

                                    Message

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default Friends;