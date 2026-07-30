import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import {
    FaComments,
    FaCalendarAlt,
    FaUsers,
    FaChartLine,
} from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/auth.css";

function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);

        try {
            const data = await registerUser(formData);

            setMessage(data.message);

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-left">

                <div className="auth-left-content">

                    <h1>Join ConnectBetter</h1>

                    <p>
                        Create your account and start chatting,
                        organizing events, building communities,
                        and collaborating with your friends.
                    </p>

                    <div className="auth-features">

                        <div className="auth-feature">
                            <FaComments />
                            <span>Real-time Messaging</span>
                        </div>

                        <div className="auth-feature">
                            <FaCalendarAlt />
                            <span>Event Management</span>
                        </div>

                        <div className="auth-feature">
                            <FaUsers />
                            <span>Build Communities</span>
                        </div>

                        <div className="auth-feature">
                            <FaChartLine />
                            <span>Analytics Dashboard</span>
                        </div>

                    </div>

                </div>

            </div>

            <div className="auth-right">

                <div className="auth-card">

                    <Link
                        to="/"
                        className="back-home"
                    >
                        ← Back to Home
                    </Link>

                    <div className="auth-logo">
                        <Link to="/">
                            ConnectBetter
                        </Link>
                    </div>

                    <h2>Create Account</h2>

                    <p className="auth-subtitle">
                        Start your ConnectBetter journey.
                    </p>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <div className="password-field">

                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() =>
                                    setShowPassword(!showPassword)
                                }
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <FaEye />
                                )}
                            </button>

                        </div>

                        {message && (
                            <p
                                style={{
                                    color: "#16a34a",
                                    textAlign: "center",
                                }}
                            >
                                {message}
                            </p>
                        )}

                        {error && (
                            <p className="auth-error">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="auth-button"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating Account..."
                                : "Create Account"}
                        </button>

                    </form>

                    <div className="auth-footer">

                        <p>
                            Already have an account?{" "}
                            <Link to="/login">
                                Login
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;