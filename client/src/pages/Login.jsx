import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/auth.css";

import {
    FaComments,
    FaCalendarAlt,
    FaUsers,
    FaChartLine,
} from "react-icons/fa";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

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

        setError("");
        setLoading(true);

        try {
            const data = await loginUser(formData);

            login(data.token, data.user);

            navigate("/feed");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-left">

                <div className="auth-left-content">

                    <h1>Welcome Back!</h1>

                    <p>
                        Sign in to ConnectBetter and continue chatting,
                        collaborating, organizing events, and growing
                        your community.
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

                    <h2>Login</h2>

                    <p className="auth-subtitle">
                        Welcome back! Please sign in.
                    </p>

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

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
                                ? "Logging in..."
                                : "Login"}
                        </button>

                    </form>

                    <div className="auth-footer">

                        <p>
                            Don't have an account?{" "}
                            <Link to="/register">
                                Register
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;