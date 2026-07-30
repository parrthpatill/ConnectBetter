import api from "../api/axios";

export const searchUsers = async (query) => {
    const res = await api.get(`/friends/search?query=${query}`);
    return res.data;
};

export const sendFriendRequest = async (id) => {

    const res = await api.post(
        `/friends/request/${id}`
    );

    return res.data;

};

export const getPendingRequests = async () => {
    const res = await api.get("/friends/pending");
    return res.data;
};

export const acceptFriendRequest = async (id) => {

    const res = await api.post(
        `/friends/accept/${id}`
    );

    return res.data;

};

export const getFriends = async () => {
    const res = await api.get("/friends");
    return res.data;
};