import { useState } from "react";

import Button from "./Button";
import Input from "./Input";

import { createEvent } from "../services/eventService";

function EventForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        event_type: "",
        event_date: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await createEvent(formData);

            if (onSuccess) {
                onSuccess();
            }

        } catch (err) {
            setError(
                err.response?.data?.error || "Failed to create event"
            );
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <Input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
            />

            <Input
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
            />

            <Input
                name="event_type"
                placeholder="Event Type"
                value={formData.event_type}
                onChange={handleChange}
            />

            <Input
                type="datetime-local"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
            />

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <Button type="submit">
                Create Event
            </Button>

        </form>
    );
}

export default EventForm;