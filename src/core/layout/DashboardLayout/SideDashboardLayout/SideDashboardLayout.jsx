import React from "react";
import "./SideDashboardLayout.scss";

const SideDashboardLayout = ({ sidebar, children, title, subtitle }) => {
  return (
    <div className="side-dashboard">
      <aside className="side-dashboard__sidebar">{sidebar}</aside>
      <section className="side-dashboard__main">
        <div className="side-dashboard__header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className="side-dashboard__content">{children}</div>
      </section>
    </div>
  );
};
export default SideDashboardLayout;
