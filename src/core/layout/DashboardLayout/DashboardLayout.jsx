import React, { useContext } from "react";
import "./DashboardLayout.scss";
import UserContext from "../../contexts/UserContext";

const DashboardLayout = ({ children, roleTitle, welcomeMessage }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="dashboard-container">
      {/* Gornji mini-header unutar dashboarda */}
      <div className="dashboard-header-bar">
        <div className="welcome-txt">
          <h2>Dobrodošao, {user?.username || "Korisnik"}! 👋</h2>
          <span className="role-badge">{roleTitle}</span>
        </div>
        <p className="subtitle-msg">{welcomeMessage}</p>
      </div>

      {/* Glavni sadrzaj specifican za ulogu */}
      <div className="dashboard-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;
