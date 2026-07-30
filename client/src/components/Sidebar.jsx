import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/sidebar.css";
import socket from "../services/socket";
import { useNotifications } from "../context/NotificationContext";

function Sidebar() {

    const { unreadCount } = useNotifications();
    useEffect(() => {

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

        <aside className="sidebar">

            <NavLink to="/">
                Feed
            </NavLink>

            <NavLink to="/events">
                Events
            </NavLink>

            <NavLink to="/messages">
                Messages
            </NavLink>

            <NavLink to="/groups">
                Groups
            </NavLink>

            <NavLink to="/notifications">
                Notifications
                
                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount}
                    </span>
                )}
            </NavLink>

            <NavLink to="/analytics">
                Analytics
            </NavLink>

            <NavLink to="/profile">
                Profile
            </NavLink>

            <NavLink to="/friends">
                Friends
            </NavLink>

        </aside>

    );

}

export default Sidebar;