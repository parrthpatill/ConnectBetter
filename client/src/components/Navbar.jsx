import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="navbar">
            <h2>ConnectBetter</h2>

            <div className="nav-links">
                <span>Feed</span>
                <span>Events</span>
                <span>Groups</span>
                <span>Profile</span>
            </div>

            <div>
                {user && <strong>{user.name}</strong>}
            </div>
        </nav>
    );
}

export default Navbar;