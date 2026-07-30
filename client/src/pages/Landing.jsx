import { Link } from "react-router-dom";
import "../styles/landing.css";
import {
    FaComments,
    FaCalendarAlt,
    FaUsers,
    FaChartLine,
    FaArrowRight,
} from "react-icons/fa";
function Landing() {
    return (
        <div className="landing">

            {/* Navbar */}
            <nav className="landing-navbar">
                <Link
                    to="/"
                    className="landing-logo"
                >
                    <h2>ConnectBetter</h2>
                </Link>

                <div className="landing-links">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>

                    <Link
                        to="/login"
                        className="btn btn-outline"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="btn btn-primary"
                    >
                        Register
                    </Link>
                </div>
            </nav>

            {/* Hero */}
            <section className="hero">

                <div className="hero-content">

                    <h1>
                        Connect Better.
                        <br />
                        Collaborate Smarter.
                    </h1>

                    <p>
                        ConnectBetter is a modern social platform that
                        helps students and teams chat in real time,
                        organize events, build communities, and stay
                        connected effortlessly.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/register"
                            className="btn btn-primary"
                        >
                            Get Started <FaArrowRight />
                        </Link>

                        <Link
                            to="/login"
                            className="btn btn-outline"
                        >
                            Login
                        </Link>

                    </div>

                </div>

                <div className="hero-preview">

                    <div className="preview-window">

                        <div className="preview-header">

                            <div className="preview-logo">
                                ConnectBetter
                            </div>

                            <div className="preview-avatar">
                                PP
                            </div>

                        </div>

                        <div className="preview-body">

                            <div className="preview-sidebar">

                                <div className="sidebar-item active">
                                    Feed
                                </div>

                                <div className="sidebar-item">
                                    Messages
                                </div>

                                <div className="sidebar-item">
                                    Friends
                                </div>

                                <div className="sidebar-item">
                                    Groups
                                </div>

                            </div>

                            <div className="preview-feed">

                                <div className="feed-card">
                                    <h4>Upcoming Hackathon</h4>
                                    <p>
                                        Join the annual coding event this weekend.
                                    </p>
                                </div>

                                <div className="feed-card">
                                    <h4>New Message</h4>
                                    <p>
                                        Alex: "Let's meet at 5 PM."
                                    </p>
                                </div>

                                <div className="feed-card">
                                    <h4>Community Update</h4>
                                    <p>
                                        12 new members joined Web Dev Group.
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/* Features */}

            <section
                id="features"
                className="features"
            >

                <h2>Everything You Need</h2>

                <div className="feature-grid">

                    <div className="feature-card">
                        <h3> <FaComments /> Real-Time Messaging</h3>

                        <p>
                            Chat instantly with friends and teammates using
                            live messaging powered by Socket.IO.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3> <FaCalendarAlt /> Event Management</h3>

                        <p>
                            Create, manage, and organize events with an
                            intuitive interface.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3> <FaUsers /> Groups</h3>

                        <p>
                            Build communities, collaborate on projects,
                            and stay connected.
                        </p>
                    </div>

                    <div className="feature-card">
                        <h3> <FaChartLine /> Analytics</h3>

                        <p>
                            Gain insights into your activity with a
                            beautiful dashboard.
                        </p>
                    </div>

                </div>

            </section>

            {/* CTA */}

            <section
                id="about"
                className="cta"
            >

                <h2>Ready to Connect?</h2>

                <p>
                    Join ConnectBetter today and start building stronger
                    communities.
                </p>

                <Link
                    to="/register"
                    className="btn btn-primary"
                >
                    Join Now
                </Link>

            </section>

            {/* Footer */}

            <footer className="landing-footer">
                <p>
                    © 2026 ConnectBetter. Built with React, Express &
                    PostgreSQL.
                </p>
            </footer>

        </div>
    );
}

export default Landing;