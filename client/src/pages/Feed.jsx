import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";

import { getEvents } from "../services/eventService";

import { useAuth } from "../context/AuthContext";
import { deleteEvent } from "../services/eventService";

function Feed() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const { user } = useAuth();

    const fetchEvents = async () => {
        try {
            const data = await getEvents();
            setEvents(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
            fetchEvents();
        }, []);

        const handleDelete = async (eventId) => {
        try {
            await deleteEvent(eventId);

            setEvents((prev) =>
                prev.filter((event) => event.id !== eventId)
            );

        } catch (err) {
            console.error(err);
        }
    };
    return (
        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "900px",
                    margin: "30px auto",
                }}
            >
                <button
                    onClick={() => setShowModal(true)}
                >
                    Create Event
                </button>

                <br />
                <br />

                {events.length === 0 ? (
                    <p>No events yet.</p>
                ) : (
                    events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                            currentUser={user}
                            onDelete={handleDelete}
                        />
                    ))
                )}
            </div>

            {showModal && (
                <Modal
                    title="Create Event"
                    onClose={() => setShowModal(false)}
                >
                    <EventForm
                        onSuccess={() => {
                            setShowModal(false);
                            fetchEvents();
                        }}
                    />
                </Modal>
            )}
        </>
    );
}

export default Feed;