import useAnalytics from "../../hooks/useAnalytics";
import ChartCard from "../ChartCard";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { getWeeklyActivity } from "../../services/analyticsService";

function WeeklyActivityChart() {

    const {
        data,
        loading,
        error
    } = useAnalytics(getWeeklyActivity);

    if (loading) {
        return <p>Loading weekly activity...</p>;
    }

    if (error) {
        return <p>Failed to load weekly activity.</p>;
    }

    return (

        <ChartCard title="Weekly Activity">
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="day" />

                    <YAxis />

                    <Tooltip />

                    <Line
                        type="monotone"
                        dataKey="messages"
                    />

                    <Line
                        type="monotone"
                        dataKey="events"
                    />

                </LineChart>
            </ResponsiveContainer>

        </ChartCard>

    );

}

export default WeeklyActivityChart;