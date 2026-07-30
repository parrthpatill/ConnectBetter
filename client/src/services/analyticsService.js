import api from "../api/axios";

export const getDashboard = async () => {
    const response = await api.get("/analytics/dashboard");
    return response.data;
};

export const getActiveFriends = async () => {
    const response = await api.get("/analytics/active-friends");
    return response.data;
};

export const getEventSummary = async () => {
    const response = await api.get("/analytics/event-summary");
    return response.data.data;
};

export const getWeeklyActivity = async () => {
    const response = await api.get("/analytics/weekly-activity");
    return response.data.data;
};

export const getMonthlyActivity = async () => {
    const response = await api.get("/analytics/monthly-activity");
    return response.data.data;
};

export const getFriendGrowth = async () => {
    const response = await api.get("/analytics/friend-growth");
    return response.data.data;
};

export const getProductivityScore = async () => {
    const response = await api.get("/analytics/productivity-score");
    return response.data;
};