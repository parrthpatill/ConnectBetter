import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import EventForm from "../components/EventForm";
import EventCard from "../components/EventCard";

import { getEvents } from "../services/eventService";

import { useAuth } from "../context/AuthContext";
import { deleteEvent } from "../services/eventService";

import AppLayout from "../layouts/AppLayout";

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
        <AppLayout>

            <button
                onClick={() => setShowModal(true)}
            >
                Create Event
            </button>

            <br /><br />

            {events.map(event => (
                <EventCard
                    key={event.id}
                    event={event}
                    currentUser={user}
                    onDelete={handleDelete}
                />
            ))}

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

        </AppLayout>
    );
}

export default Feed;