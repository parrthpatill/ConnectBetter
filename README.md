# ConnectBetter – Real-Time Social Productivity Platform

ConnectBetter is a full-stack social productivity platform that combines social networking, collaboration, and event management into a single application. Users can connect with friends, create groups, organize events, communicate through real-time messaging, and track engagement through analytics.

---

## Features

### Authentication
- Secure JWT Authentication
- User Registration & Login
- Protected Routes
- Persistent Sessions

### Social Features
- Friend Search
- Friend Requests
- Friends List
- User Profiles

### Real-Time Messaging
- One-to-One Chat
- Group Chat
- Socket.IO Powered Messaging
- Live Message Delivery

### Groups
- Create Groups
- Join Groups
- Group Conversations
- Member Management

### Event Management
- Create Events
- Join Events
- Event Feed
- Community Event Discovery

### Social Interactions
- Posts
- Comments
- Reactions
- Notifications

### Analytics Dashboard
- User Activity Statistics
- Events Created
- Friend Count
- Productivity Insights

### AI Features
- AI-powered productivity assistance
- Conversation logging for AI interactions

---

# Tech Stack

## Frontend
- React.js
- React Router
- Axios
- React Icons
- Recharts
- Socket.IO Client
- CSS3

## Backend
- Node.js
- Express.js
- Socket.IO
- JWT Authentication
- bcrypt

## Database
- PostgreSQL

## Deployment
- Frontend: Vercel
- Backend: Render
- Database: Supabase PostgreSQL

---

# Architecture

```
React Frontend
       │
       ▼
 Express.js REST API
       │
       ├──────────────► PostgreSQL
       │
       ├──────────────► Socket.IO
       │
       └──────────────► AI Services
```

---

# Project Structure

```
ConnectBetter
│
├── client
│   ├── public
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── styles
│   └── package.json
│
├── server
│   ├── src
│   │   ├── middleware
│   │   ├── routes
│   │   ├── services
│   │   ├── db
│   │   └── app.js
│   └── package.json
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/parrthpatill/ConnectBetter.git

cd ConnectBetter
```

---

# Backend Setup

```bash
cd server

npm install

npm start
```

Runs on

```
http://localhost:5000
```

---

# Frontend Setup

```bash
cd client

npm install

npm run dev
```

Runs on

```
http://localhost:5173
```

---

# Environment Variables

## Backend (.env)

```env
PORT=5000

DATABASE_URL=

JWT_SECRET=

CLIENT_URL=

GROQ_API_KEY=

GROQ_API_KEY_ASSISTANT=
```

## Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api

VITE_SOCKET_URL=http://localhost:5000
```

---

# REST API

## Authentication

```
POST    /api/auth/register

POST    /api/auth/login
```

## Friends

```
GET     /api/friends

POST    /api/friends/request

POST    /api/friends/accept

GET     /api/friends/pending
```

## Events

```
GET     /api/events

POST    /api/events

PUT     /api/events/:id

DELETE  /api/events/:id
```

## Messages

```
GET     /api/messages/:friendId

POST    /api/messages
```

## Groups

```
GET     /api/groups

POST    /api/groups

POST    /api/groups/:id/join
```

## Notifications

```
GET     /api/notifications
```

## Analytics

```
GET     /api/analytics
```

---

# Real-Time Communication

Socket.IO is used for:

- Instant Messaging
- Group Messaging
- Live Notifications
- Online User Tracking

---

# Deployment

## Frontend

https://connect-better.vercel.app

## Backend

https://connectbetter-api.onrender.com

---

# Future Improvements

- Voice & Video Calling
- File Sharing
- Message Reactions
- Read Receipts
- Dark Mode
- Mobile Responsive Improvements
- Push Notifications
- AI Smart Event Recommendations
- Email Notifications

---

# Author

**Parth Patil**

GitHub: https://github.com/parrthpatill

---

# License

This project is licensed under the MIT License.
