import React from "react";
import { Navigate } from "react-router-dom";
import { getHomeRouteByRole } from "../utils/roleUtils";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={getHomeRouteByRole(user.role)} replace />;
  }

  return children;
};

export default ProtectedRoute;