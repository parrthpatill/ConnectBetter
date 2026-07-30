import { useEffect, useState } from "react";
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

                console.error("Failed to load dashboard stats:", error);

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
                <p>Loading...</p>
            </aside>
        );
    }

    return (
        <aside className="right-panel">

            <h3>Quick Stats</h3>

            <p>Events Created: {stats.events}</p>

            <p>Friends: {stats.friends}</p>

            <p>Unread Notifications: {stats.notifications}</p>

            <p>Productivity Score: {stats.productivityScore}</p>

        </aside>
    );
}

export default RightPanel;