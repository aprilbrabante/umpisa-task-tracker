import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";
import AddTask from "../pages/AddTask";
import EditTask from "../pages/EditTask";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";

export default function AppRoutes({ isAuthenticated }) {

  return (

    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/"
        element={
          isAuthenticated
            ? <Dashboard />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/dashboard"
        element={
          isAuthenticated
            ? <Dashboard />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/tasks"
        element={
          isAuthenticated
            ? <Tasks />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/tasks/create"
        element={
          isAuthenticated
            ? <AddTask />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/tasks/edit/:id"
        element={
          isAuthenticated
            ? <EditTask />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/profile"
        element={
          isAuthenticated
            ? <Profile />
            : <Navigate to="/login" />
        }
      />

      <Route
        path="/change-password"
        element={
          isAuthenticated
            ? <ChangePassword />
            : <Navigate to="/login" />
        }
      />

    </Routes>
  );
}