import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNotifications } from "../context/NotificationContext";

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

        <div className="max-w-3xl mx-auto p-6">

            <h1 className="text-3xl font-bold mb-6">
                Notifications
            </h1>

            {
                notifications.length === 0 ? (

                    <p className="text-gray-500">
                        No notifications yet.
                    </p>

                ) : (

                    <div className="space-y-4">

                        {
                            notifications.map((notification) => (

                                <div
                                    key={notification.id}
                                    className={`rounded-lg shadow p-4 border-l-4 ${
                                        notification.is_read
                                            ? "bg-white border-gray-300"
                                            : "bg-blue-50 border-blue-500"
                                    }`}
                                >

                                    <p className="font-medium text-gray-800">
                                        {notification.message}
                                    </p>

                                    <div className="mt-2 flex justify-between items-center text-sm text-gray-500">

                                        <span>
                                            {notification.type || "Notification"}
                                        </span>

                                        <span>
                                            {new Date(notification.created_at).toLocaleString()}
                                        </span>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                )
            }

        </div>

    );

}

export default Notifications;