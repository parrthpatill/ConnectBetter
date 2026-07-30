import { useEffect, useState } from "react";
import api from "../api/axios";

function CreateGroupModal({ onSuccess }) {

    const [friends, setFriends] = useState([]);
    const [name, setName] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchFriends();

    }, []);

    async function fetchFriends() {

        try {

            const res = await api.get("/friends");

            setFriends(res.data);

        } catch (err) {

            console.error(err);

        }

    }

    function toggleMember(id) {

        setSelectedMembers((prev) => {

            if (prev.includes(id)) {

                return prev.filter(memberId => memberId !== id);

            }

            return [...prev, id];

        });

    }

    async function handleCreateGroup() {

        if (!name.trim()) {

            alert("Enter a group name.");

            return;

        }

        setLoading(true);

        try {

            await api.post("/groups/create", {
                name,
                members: selectedMembers,
            });

            onSuccess();

        } catch (err) {

            console.error(err);

            alert("Failed to create group.");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="create-group-form">

            <label>

                Group Name

            </label>

            <input
                type="text"
                placeholder="Enter group name"
                value={name}
                onChange={(e) =>
                    setName(e.target.value)
                }
            />

            <label>

                Select Friends

            </label>

            <div className="friends-checkbox-list">

                {

                    friends.length === 0 ?

                        <p>No friends found.</p>

                    :

                        friends.map(friend => (

                            <label
                                key={friend.id}
                                className="checkbox-item"
                            >

                                <input
                                    type="checkbox"
                                    checked={
                                        selectedMembers.includes(friend.id)
                                    }
                                    onChange={() =>
                                        toggleMember(friend.id)
                                    }
                                />

                                <span>

                                    {friend.name}

                                </span>

                            </label>

                        ))

                }

            </div>

            <button
                className="create-group-submit"
                onClick={handleCreateGroup}
                disabled={loading}
            >

                {

                    loading ?

                        "Creating..."

                    :

                        "Create Group"

                }

            </button>

        </div>

    );

}

export default CreateGroupModal;