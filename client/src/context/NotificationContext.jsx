import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import socket from "../services/socket";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
    const [unreadCount, setUnreadCount] = useState(0);

    const fetchUnreadCount = async () => {
        try {
            const response = await api.get(
                "/notifications/unread-count"
            );

            setUnreadCount(response.data.count);

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchUnreadCount();

        const handleNotification = () => {
            setUnreadCount(prev => prev + 1);
        };

        socket.on(
            "newNotification",
            handleNotification
        );

        return () => {
            socket.off(
                "newNotification",
                handleNotification
            );
        };
    }, []);

    return (
        <NotificationContext.Provider
            value={{
                unreadCount,
                setUnreadCount,
                fetchUnreadCount,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    return useContext(NotificationContext);
}