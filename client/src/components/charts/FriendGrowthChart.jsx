import ChartCard from "../ChartCard";
import useAnalytics from "../../hooks/useAnalytics";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

import { getFriendGrowth } from "../../services/analyticsService";

function FriendGrowthChart() {

    const {
        data,
        loading,
        error
    } = useAnalytics(getFriendGrowth);

    if (loading) {
        return <p>Loading friend growth...</p>;
    }

    if (error) {
        return <p>Failed to load friend growth.</p>;
    }

    return (

        <ChartCard title="Friend Growth">

            <ResponsiveContainer
                width="100%"
                height={350}
            >

                <BarChart data={data}>

                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="#e5e7eb"
                    />

                    <XAxis
                        dataKey="month"
                        angle={-30}
                        textAnchor="end"
                        height={70}
                    />

                    <YAxis />

                    <Tooltip />

                    <Legend />

                    <Bar 
                        dataKey="friends" 
                        fill="#2563eb"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </ChartCard>

    );

}

export default FriendGrowthChart;