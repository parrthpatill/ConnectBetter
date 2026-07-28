import api from "../api/axios";

export const createEvent = async (eventData) => {
    const response = await api.post("/events", eventData);
    return response.data;
};

export const getEvents = async () => {
    const response = await api.get("/events");
    return response.data;
};

export const deleteEvent = async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
};