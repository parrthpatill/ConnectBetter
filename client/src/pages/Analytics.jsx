import { useEffect, useState } from "react";
import { getDashboard } from "../services/analyticsService";
import StatCard from "../components/StatCard";
import WeeklyActivityChart from "../components/charts/WeeklyActivityChart";
import MonthlyActivityChart from "../components/charts/MonthlyActivityChart";
import FriendGrowthChart from "../components/charts/FriendGrowthChart";
import EventSummary from "../components/charts/EventSummary";

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
        return <h2>Loading Analytics...</h2>;
    }

    return (

        <div>

            <h1>Analytics Dashboard</h1>

            <div className="analytics-page">

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

                    <div className="full-width">
                        <WeeklyActivityChart />
                    </div>

                    <div className="full-width">
                        <MonthlyActivityChart />
                    </div>

                    <FriendGrowthChart />
                    <EventSummary />
                </div>

            </div>

        </div>

    );

}

export default Analytics;