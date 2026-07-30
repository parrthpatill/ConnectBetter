# ConnectBetter - Analytics Module Documentation

## Overview

The Analytics Module provides meaningful insights into user activity within ConnectBetter. Instead of simply storing data, it analyzes user interactions such as friendships, messages, events, and engagement to generate useful statistics that can be displayed on the dashboard.

All analytics endpoints require authentication using a valid JWT Bearer Token.

---

# Base URL

```
/api/analytics
```

---

# Authentication

All endpoints require:

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 1. Dashboard Summary

### Endpoint

```
GET /dashboard
```

### Description

Returns an overview of the user's activity across the platform.

### Response

```json
{
    "friends": 12,
    "events": 8,
    "messages": 146,
    "groups": 4,
    "notifications": 2,
    "productivityScore": 83
}
```

### Data Included

- Total accepted friends
- Total events created
- Total messages sent
- Total groups created
- Total unread notifications
- Productivity score

---

# 2. Most Active Friends

### Endpoint

```
GET /active-friends
```

### Description

Returns the friends with whom the authenticated user has exchanged the highest number of direct messages.

Only accepted friends are considered.

Group messages are excluded.

### Response

```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "id": 2,
            "name": "Rahul",
            "messages": 21
        },
        {
            "id": 7,
            "name": "Sneha",
            "messages": 13
        }
    ]
}
```

---

# 3. Event Frequency

### Endpoint

```
GET /event-summary
```

### Description

Returns statistics related to the user's events.

Events are categorized based on their event date.

### Response

```json
{
    "success": true,
    "data": {
        "totalEvents": 12,
        "upcomingEvents": 4,
        "completedEvents": 8,
        "eventsThisWeek": 2,
        "eventsThisMonth": 5
    }
}
```

---

# 4. Weekly Activity

### Endpoint

```
GET /weekly-activity
```

### Description

Returns message and event activity grouped by weekday.

Useful for dashboards and activity charts.

### Response

```json
{
    "success": true,
    "data": [
        {
            "day": "Monday",
            "messages": 12,
            "events": 2
        },
        {
            "day": "Tuesday",
            "messages": 5,
            "events": 1
        }
    ]
}
```

---

# 5. Monthly Activity

### Endpoint

```
GET /monthly-activity
```

### Description

Returns monthly message and event activity.

All twelve months are returned to simplify frontend chart rendering.

### Response

```json
{
    "success": true,
    "data": [
        {
            "month": "January",
            "messages": 20,
            "events": 4
        },
        {
            "month": "February",
            "messages": 12,
            "events": 3
        }
    ]
}
```

---

# 6. Friend Growth

### Endpoint

```
GET /friend-growth
```

### Description

Shows the number of accepted friendships gained each month.

Useful for displaying networking growth trends.

### Response

```json
{
    "success": true,
    "data": [
        {
            "month": "January",
            "friends": 3
        },
        {
            "month": "February",
            "friends": 5
        }
    ]
}
```

---

# 7. Productivity Score

### Endpoint

```
GET /productivity-score
```

### Description

Calculates a productivity score based on user engagement across the platform.

The score considers multiple user activities including:

- Accepted friendships
- Events created
- Messages sent
- Groups created
- Comments
- Reactions
- AI assistant usage
- Unread notifications

### Response

```json
{
    "success": true,
    "data": {
        "productivityScore": 127,
        "breakdown": {
            "acceptedFriends": 9,
            "totalEvents": 5,
            "totalMessages": 42,
            "totalGroups": 3,
            "totalComments": 18,
            "totalReactions": 22,
            "totalAiLogs": 7,
            "unreadNotifications": 2
        }
    }
}
```

---

# Module Architecture

```
Client
    │
    ▼
Routes
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
PostgreSQL
```

---

# Technologies Used

- Node.js
- Express.js
- PostgreSQL
- JWT Authentication
- SQL Aggregation
- PostgreSQL Functions
- REST API Architecture

---

# SQL Concepts Used

The Analytics Module demonstrates several SQL concepts:

- COUNT()
- GROUP BY
- ORDER BY
- JOIN
- CASE Expressions
- DATE_TRUNC()
- EXTRACT()
- Aggregate Functions

---

# Future Improvements

The Analytics Module can be extended with:

- Real-time analytics using Socket.IO
- AI-generated productivity insights
- Cached dashboard statistics
- Streak tracking
- Weekly and monthly trend comparisons
- Interactive analytics charts

---

# Conclusion

The Analytics Module transforms raw user activity into meaningful insights that help users understand their engagement within ConnectBetter. It provides a scalable backend foundation for future dashboard visualizations, AI recommendations, and productivity tracking while maintaining a clean service-based architecture.