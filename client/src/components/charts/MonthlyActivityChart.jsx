import ChartCard from "../ChartCard";
import useAnalytics from "../../hooks/useAnalytics";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import { getMonthlyActivity } from "../../services/analyticsService";

function MonthlyActivityChart() {

    const {
        data,
        loading,
        error
    } = useAnalytics(getMonthlyActivity);

    if (loading) {
        return <p>Loading monthly activity...</p>;
    }

    if (error) {
        return <p>Failed to load monthly activity.</p>;
    }

    return (

        <ChartCard title="Monthly Activity">

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="month"
                        angle={-30}
                        textAnchor="end"
                        height={70}
                    />
                    <YAxis />

                    <Tooltip />

                    <Legend />

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

export default MonthlyActivityChart;