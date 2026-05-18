import React from "react";
import { useNavigate } from "react-router-dom";
import "./DashboardLayout.scss";

const DashboardLayout = ({ children, roleTitle, welcomeMessage }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || { name: "Korisnik", surname: "" };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      {/* Gornji mini-header unutar dashboarda */}
      <div className="dashboard-header-bar">
        <div className="welcome-txt">
          <h2>Dobrodošao, {user.name}! 👋</h2>
          <span className="role-badge">{roleTitle}</span>
        </div>
        <p className="subtitle-msg">{welcomeMessage}</p>
      </div>

      {/* Glavni sadrzaj specifican za ulogu */}
      <div className="dashboard-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;