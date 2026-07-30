import "../styles/navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="navbar">

            <div className="navbar-logo">
                <h2>ConnectBetter</h2>
            </div>

            <div className="navbar-user">

                <div className="user-avatar">
                    {user?.name?.charAt(0).toUpperCase()}
                </div>

                <span className="user-name">
                    {user?.name}
                </span>

            </div>

        </nav>
    );
}

export default Navbar;