import ChartCard from "../ChartCard";
import StatCard from "../StatCard";
import useAnalytics from "../../hooks/useAnalytics";

import { getEventSummary } from "../../services/analyticsService";

function EventSummary() {

    const {
        data,
        loading,
        error
    } = useAnalytics(getEventSummary);

    if (loading) {
        return <p>Loading event summary...</p>;
    }

    if (error) {
        return <p>Failed to load event summary.</p>;
    }

    return (

        <ChartCard title="Event Summary">

            <div className="event-summary-grid">

                <StatCard
                    title="Total Events"
                    value={data.totalEvents}
                />

                <StatCard
                    title="Upcoming"
                    value={data.upcomingEvents}
                />

                <StatCard
                    title="Completed"
                    value={data.completedEvents}
                />

                <StatCard
                    title="This Week"
                    value={data.eventsThisWeek}
                />

                <StatCard
                    title="This Month"
                    value={data.eventsThisMonth}
                />

            </div>

        </ChartCard>

    );

}

export default EventSummary;