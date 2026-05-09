import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

import AppButton from "./ui/AppButton";
import AppNavLink from "./ui/AppNavLink";

export default function AppNavbar() {

  const { clearToken } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    clearToken();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* BRAND */}
        <span
          className="navbar-brand fw-bold"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          TaskTracker
        </span>

        {/* MOBILE BUTTON */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAVIGATION */}
        <div
          className="collapse navbar-collapse"
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <AppNavLink
                to="/dashboard"
                label="Dashboard"
              />
            </li>
            <li className="nav-item">
              <AppNavLink
                to="/tasks"
                label="Tasks"
              />
            </li>
            <li className="nav-item">
              <AppNavLink
                to="/tasks/create"
                label="Add Task"
              />
            </li>
            <li className="nav-item">
              <AppNavLink
                to="/profile"
                label="Profile"
              />
            </li>
            <li className="nav-item">
              <AppButton
                label="Logout"
                variant="danger"
                className="btn-sm"
                onClick={logout}
              />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}