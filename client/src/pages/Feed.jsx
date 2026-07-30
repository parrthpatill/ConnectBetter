import { useEffect, useState } from "react";

import Modal from "../components/Modal";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";

import { getEvents } from "../services/eventService";

import { useAuth } from "../context/AuthContext";
import { deleteEvent } from "../services/eventService";
import "../styles/feed.css";

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

            <div className="feed-header">

                <div>
                    <h1>Activity Feed</h1>
                    <p>Stay updated with the latest activity from your network.</p>
                </div>

                <button
                    className="create-event-btn"
                    onClick={() => setShowModal(true)}
                >
                    + Create Event
                </button>

            </div>

            {events.length === 0 ? (

                <div className="empty-feed">

                    <h3>No events yet</h3>

                    <p>
                        Create your first event to get started.
                    </p>

                </div>

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