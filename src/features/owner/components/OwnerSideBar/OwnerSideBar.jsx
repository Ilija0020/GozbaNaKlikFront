import React from "react";
import "./OwnerSideBar.scss";

const OwnerSideBar = ({ activeSection, onSectionChange }) => {
  return (
    <nav className="owner-sidebar">
      <button
        type="button"
        className={activeSection === "restaurants" ? "active" : ""}
        onClick={() => onSectionChange("restaurants")}
      >
        Moji restorani
      </button>

      <button
        type="button"
        className={activeSection === "employees" ? "active" : ""}
        onClick={() => onSectionChange("employees")}
      >
        Moji Zaposleni
      </button>

      <button
        type="button"
        className={activeSection === "orders" ? "active" : ""}
        onClick={() => onSectionChange("orders")}
      >
        Porudzbine
      </button>

      <button
        type="button"
        className={activeSection === "settings" ? "active" : ""}
        onClick={() => onSectionChange("settings")}
      >
        Podesavanja
      </button>
    </nav>
  );
};
export default OwnerSideBar;
