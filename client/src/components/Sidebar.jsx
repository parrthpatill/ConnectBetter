import { NavLink } from "react-router-dom";

import "../styles/sidebar.css";

function Sidebar() {

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
            </NavLink>

            <NavLink to="/analytics">
                Analytics
            </NavLink>

            <NavLink to="/profile">
                Profile
            </NavLink>

        </aside>

    );

}

export default Sidebar;