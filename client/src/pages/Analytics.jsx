import { useEffect, useState } from "react";
import { getDashboard } from "../services/analyticsService";

import StatCard from "../components/StatCard";
import WeeklyActivityChart from "../components/charts/WeeklyActivityChart";
import MonthlyActivityChart from "../components/charts/MonthlyActivityChart";
import FriendGrowthChart from "../components/charts/FriendGrowthChart";
import EventSummary from "../components/charts/EventSummary";

import "../styles/analytics.css";

function Analytics() {

    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const data = await getDashboard();
                setStats(data);

            } catch (error) {

                console.error("Failed to load dashboard:", error);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    if (loading) {

        return (
            <div className="analytics-loading">
                Loading Analytics...
            </div>
        );

    }

    return (

        <div className="analytics-page">

            <div className="analytics-header">

                <div>

                    <h1>Analytics Dashboard</h1>

                    <p>
                        Track your activity, engagement and overall growth.
                    </p>

                </div>

            </div>

            <div className="stats-grid">

                <StatCard
                    title="Friends"
                    value={stats.friends}
                />

                <StatCard
                    title="Events"
                    value={stats.events}
                />

                <StatCard
                    title="Messages"
                    value={stats.messages}
                />

                <StatCard
                    title="Groups"
                    value={stats.groups}
                />

                <StatCard
                    title="Notifications"
                    value={stats.notifications}
                />

                <StatCard
                    title="Productivity Score"
                    value={stats.productivityScore}
                />

            </div>

            <div className="charts-grid">

                <div className="chart-card full-width">
                    <WeeklyActivityChart />
                </div>

                <div className="chart-card full-width">
                    <MonthlyActivityChart />
                </div>

                <div className="chart-card">
                    <FriendGrowthChart />
                </div>

                <div className="chart-card">
                    <EventSummary />
                </div>

            </div>

        </div>

    );

}

export default Analytics;