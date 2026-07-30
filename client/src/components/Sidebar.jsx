import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

import {
    FiHome,
    FiUsers,
    FiMessageCircle,
    FiBell,
    FiBarChart2,
    FiUser,
    FiGrid,
} from "react-icons/fi";

import { useNotifications } from "../context/NotificationContext";

function Sidebar() {
    const { unreadCount } = useNotifications();

    return (
        <aside className="sidebar">

            <NavLink to="/">
                <FiHome />
                <span>Feed</span>
            </NavLink>

            <NavLink to="/friends">
                <FiUsers />
                <span>Friends</span>
            </NavLink>

            <NavLink to="/messages">
                <FiMessageCircle />
                <span>Messages</span>
            </NavLink>

            <NavLink to="/groups">
                <FiGrid />
                <span>Groups</span>
            </NavLink>

            <NavLink to="/notifications">
                <FiBell />
                <span>Notifications</span>

                {unreadCount > 0 && (
                    <span className="notification-badge">
                        {unreadCount}
                    </span>
                )}
            </NavLink>

            <NavLink to="/analytics">
                <FiBarChart2 />
                <span>Analytics</span>
            </NavLink>

            <NavLink to="/profile">
                <FiUser />
                <span>Profile</span>
            </NavLink>

        </aside>
    );
}

export default Sidebar;