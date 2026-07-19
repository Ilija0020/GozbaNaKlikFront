import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { getHomeRouteByRole } from "../utils/roleUtils";
import UserContext from "../contexts/UserContext";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useContext(UserContext);

  const token = localStorage.getItem("token");
  let currentUser = user;

  if (!currentUser && token) {
    try {
      currentUser = JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Neispravan token:", error);
      localStorage.removeItem("token");

      return <Navigate to="/login" replace />;
    }
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to={getHomeRouteByRole(currentUser.role)} replace />;
  }

  return children;
};

export default ProtectedRoute;
