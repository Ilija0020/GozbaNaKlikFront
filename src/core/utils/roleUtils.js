import React from "react";

export const getHomeRouteByRole = (role) => {
  switch (role) {
    case "Customer":
      return "/customer/home";
    case "Owner":
      return "/owner/home";
    case "Employee":
      return "/employee/home";
    case "Courier":
      return "/courier/home";
    case "Admin":
      return "/admin/home";
    default:
      return "/login";
  }
};