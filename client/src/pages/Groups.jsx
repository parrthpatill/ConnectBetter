import { useEffect, useState } from "react";
import api from "../api/axios";
import ChatWindow from "../components/ChatWindow";
import "../styles/groups.css";
import socket from "../services/socket";
import Modal from "../components/Modal";
import CreateGroupModal from "../components/CreateGroupModal";

function Groups() {

    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);


    useEffect(() => {

        fetchGroups();

    }, []);

    useEffect(() => {
        if (!selectedGroup) return;

        socket.emit("joinGroup", selectedGroup.id);

        return () => {
            socket.emit("leaveGroup", selectedGroup.id);
        };
    }, [selectedGroup]);

    useEffect(() => {

        function handleGroupMessage(message) {

            if (message.group_id !== selectedGroup?.id) {
                return;
            }

            setMessages(prev => {

                const exists = prev.some(
                    m => m.id === message.id
                );

                if (exists) {
                    return prev;
                }

                return [...prev, message];

            });

        }

        socket.on(
            "receiveGroupMessage",
            handleGroupMessage
        );

        return () => {

            socket.off(
                "receiveGroupMessage",
                handleGroupMessage
            );

        };

    }, [selectedGroup]);

    async function fetchGroups() {

        try {

            const res = await api.get("/groups");

            setGroups(res.data);

        } catch (err) {

            console.error(err);

        }

    }

    async function fetchMessages(groupId) {

        try {

            const res = await api.get(`/messages/group/${groupId}`);

            setMessages(res.data);

        } catch (err) {

            console.error(err);

        }

    }

    async function handleSendMessage(text) {

        if (!selectedGroup) return;

        try {

            const res = await api.post(
                "/messages/group",
                {
                    groupId: selectedGroup.id,
                    text
                }
            );

            socket.emit("sendGroupMessage", {
                groupId: selectedGroup.id,
                message: res.data
            });

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <div className="groups-page">

            <div className="groups-sidebar">

                <div className="groups-header">

                    <h2>Groups</h2>

                    <button
                        className="create-group-btn"
                        onClick={() => setShowCreateModal(true)}
                    >
                        + Create
                    </button>

                </div>

                {

                    groups.length === 0 ?

                        <p>No groups yet.</p>

                    :

                        groups.map(group => (

                            <div
                                key={group.id}
                                className={
                                    selectedGroup?.id === group.id
                                        ? "group-item active"
                                        : "group-item"
                                }
                                onClick={() => {

                                    setSelectedGroup(group);

                                    fetchMessages(group.id);

                                }}
                            >

                                <div className="group-avatar">

                                    {group.name.charAt(0).toUpperCase()}

                                </div>

                                <div className="group-details">

                                    <h3>

                                        {group.name}

                                    </h3>

                                    <p>

                                        {group.member_count} Members

                                    </p>

                                </div>

                            </div>

                        ))

                }

            </div>

            <div className="groups-chat">

                {

                    selectedGroup ? (

                        <ChatWindow
                            messages={messages}
                            selectedFriend={{
                                name: selectedGroup.name,
                                email: "Group Chat",
                            }}
                            onSendMessage={handleSendMessage}
                            isGroup={true}
                        />

                    ) : (

                        <div className="no-group-selected">

                            <h2>

                                Select a Group

                            </h2>

                            <p>

                                Choose a group from the left to start chatting.

                            </p>

                        </div>

                    )

                }

            </div>

            {
                showCreateModal && (

                    <Modal
                        title="Create Group"
                        onClose={() => setShowCreateModal(false)}
                    >

                        <CreateGroupModal
                            onClose={() =>
                                setShowCreateModal(false)
                            }
                            onSuccess={() => {

                                fetchGroups();

                                setShowCreateModal(false);

                            }}
                        />

                    </Modal>

                )
            }

        </div>

    );

}

export default Groups;