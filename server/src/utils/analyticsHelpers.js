const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function mapWeeklyData(messageRows, eventRows) {

    return DAYS.map((dayName, index) => {

        const message = messageRows.find(
            row => Number(row.day) === index
        );

        const event = eventRows.find(
            row => Number(row.day) === index
        );

        return {

            day: dayName,

            messages: message ? Number(message.total) : 0,

            events: event ? Number(event.total) : 0

        };

    });

}

function mapMonthlyData(messageRows, eventRows) {

    return MONTHS.map((monthName, index) => {

        const message = messageRows.find(
            row => Number(row.month) === index + 1
        );

        const event = eventRows.find(
            row => Number(row.month) === index + 1
        );

        return {

            month: monthName,

            messages: message ? Number(message.total) : 0,

            events: event ? Number(event.total) : 0

        };

    });

}

function mapFriendGrowth(rows) {

    return MONTHS.map((monthName, index) => {

        const row = rows.find(
            r => Number(r.month) === index + 1
        );

        return {

            month: monthName,

            friends: row ? Number(row.total) : 0

        };

    });

}

module.exports = {

    mapWeeklyData,

    mapMonthlyData,

    mapFriendGrowth

};