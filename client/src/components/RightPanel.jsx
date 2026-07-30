import { useEffect, useState } from "react";
import {
    FiCalendar,
    FiUsers,
    FiBell,
    FiTrendingUp,
} from "react-icons/fi";
import { getDashboard } from "../services/analyticsService";
import "../styles/rightPanel.css";

function RightPanel() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getDashboard();
                setStats(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <aside className="right-panel">
                <h3>Quick Stats</h3>

                <div className="loading-state">
                    Loading dashboard...
                </div>
            </aside>
        );
    }

    return (
        <aside className="right-panel">

            <h3>Quick Stats</h3>

            <div className="stats-list">

                <div className="stat-row">

                    <div className="stat-left">
                        <FiCalendar />
                        <span>Events</span>
                    </div>

                    <span className="stat-value">
                        {stats.events}
                    </span>

                </div>

                <div className="stat-row">

                    <div className="stat-left">
                        <FiUsers />
                        <span>Friends</span>
                    </div>

                    <span className="stat-value">
                        {stats.friends}
                    </span>

                </div>

                <div className="stat-row">

                    <div className="stat-left">
                        <FiBell />
                        <span>Notifications</span>
                    </div>

                    <span className="stat-value">
                        {stats.notifications}
                    </span>

                </div>

                <div className="stat-row">

                    <div className="stat-left">
                        <FiTrendingUp />
                        <span>Productivity</span>
                    </div>

                    <span className="stat-value">
                        {stats.productivityScore}
                    </span>

                </div>

            </div>

        </aside>
    );
}

export default RightPanel;