import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNotifications } from "../context/NotificationContext";
import "../styles/notifications.css";

function Notifications() {
    const { setUnreadCount } = useNotifications();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await api.get("/notifications");

                setNotifications(response.data);

                await api.patch("/notifications/read");

                setUnreadCount(0);
            } catch (err) {
                console.error("Failed to load notifications:", err);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="notifications-page">

            <div className="notifications-header">
                <h1>Notifications</h1>
                <p>Stay updated with everything happening in your network.</p>
            </div>

            {notifications.length === 0 ? (

                <div className="empty-notifications">

                    <h3>No notifications yet</h3>

                    <p>Friend requests and activity updates will appear here.</p>

                </div>

            ) : (

                <div className="notifications-list">

                    {notifications.map((notification) => (

                        <div
                            key={notification.id}
                            className={`notification-card ${
                                !notification.is_read ? "unread" : ""
                            }`}
                        >

                            <div className="notification-content">

                                <p className="notification-message">
                                    {notification.message}
                                </p>

                                <div className="notification-meta">

                                    <span>
                                        {notification.type || "Notification"}
                                    </span>

                                    <span>
                                        {new Date(
                                            notification.created_at
                                        ).toLocaleString()}
                                    </span>

                                </div>

                            </div>

                            {!notification.is_read && (
                                <div className="notification-badge" />
                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default Notifications;