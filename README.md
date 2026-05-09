
# UMPISA Tech Exam – Task Tracker Application

A full-stack Task Tracker application built with ReactJS, Node.js, Express.js, and MongoDB.

This application allows users to:
- Register and Login
- Create Tasks
- Update Tasks
- Delete Tasks
- Toggle Task Status
- View Profile
- Change Password

--------------------------------------------------

# Tech Stack

## Frontend
- ReactJS
- React Router DOM
- Bootstrap 5
- Axios
- Context API
- Vite

## Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcryptjs

--------------------------------------------------

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout
- Change Password

## Task Management
- Create Task
- Edit Task
- Delete Task
- Toggle Task Status
- View User-Specific Tasks

## UI / UX
- Responsive Mobile-First Design
- Reusable Components
- Reusable Navbar
- Reusable Buttons and Inputs
- Dashboard Statistics
- Loading States
- Confirmation Modal

--------------------------------------------------

# Project Structure

```text
client/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── routes/
│   ├── App.jsx
│   └── main.jsx
│
server/
├── controllers/
├── models/
├── routes/
├── auth.js
└── index.js
```

--------------------------------------------------

# Environment Variables

This project includes sample environment files:

- .env.example

To run the application properly:

1. Copy the example file
2. Rename it to .env

--------------------------------------------------

## Client Setup

Inside the client folder:

cp .env.example .env

Example content:

VITE_TASK_TRACKER_API=http://localhost:4000

--------------------------------------------------

## Server Setup

Inside the server folder:

cp .env.example .env

Example content:

PORT=4000

MONGODB_STRING=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET_KEY=YOUR_SECRET_KEY

--------------------------------------------------

# Important Notes

- Do NOT commit actual .env files to GitHub.
- Only .env.example files are included for setup reference.
- Replace placeholder values with your own configuration if needed.

--------------------------------------------------

# Installation Guide

## 1. Clone Repository

git clone <repository-url>

--------------------------------------------------

# Backend Setup

## 2. Navigate to Server

cd server

## 3. Install Dependencies

npm install

## 4. Run Backend Server

npm start

Server will run on:

http://localhost:4000

--------------------------------------------------

# Frontend Setup

## 5. Navigate to Client

Open another terminal:

cd client

## 6. Install Dependencies

npm install

## 7. Run Frontend

npm run dev

Frontend will run on:

http://localhost:5173

--------------------------------------------------

# API Endpoints

## User Routes

```text
POST    /users/register          Register user
POST    /users/login             Login user
GET     /users/details           Get user profile
PATCH   /users/update-password   Update password
```

---

## Task Routes

```text
GET      /tasks        Get all user tasks
POST     /tasks        Create task
PATCH    /tasks/:id    Update task
DELETE   /tasks/:id    Delete task
```

--------------------------------------------------

# Running Tests

## Frontend Tests

npm run test

--------------------------------------------------

# Notes

- This project uses MongoDB Atlas for cloud database hosting.
- All tasks are user-specific and protected via JWT authentication.
- Responsive design is implemented using Bootstrap 5.
- Protected routes prevent unauthorized access.

--------------------------------------------------

# Author

April Anne Blanco