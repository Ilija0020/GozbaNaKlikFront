import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout/DashboardLayout";
import "./CustomerHomePage.scss";
import { Link } from "react-router-dom";

const CustomerHomePage = () => {
  return (
    <DashboardLayout
      roleTitle="Kupac"
      welcomeMessage="Pregledaj najbolje restorane i naruči omiljenu hranu u par klikova."
    >
      <div className="customer-home">
        <div className="hero-search-section">
          <h3>🍕 Šta ti se jede danas?</h3>
          <input
            type="text"
            placeholder="Pretraži restorane, kuhinje ili jela..."
            className="search-input"
          />
        </div>

        <div className="dashboard-grid">
          <Link to="/restaurants" className="action-card">
            <div className="card-icon">🏪</div>
            <h3>Pregled restorana</h3>
            <p>Istraži dostupne restorane i njihovu ponudu.</p>
          </Link>
          <div className="action-card">
            <div className="card-icon">📍</div>
            <h3>Moje adrese</h3>
            <p>Upravljaj lokacijama za brzu dostavu.</p>
          </div>
          <div className="action-card">
            <div className="card-icon">👤</div>
            <h3>Moj profil</h3>
            <p>Ažuriraj lične podatke i preferencije.</p>
          </div>
        </div>

        <div className="status-panel">
          <h4>📦 Poslednja porudžbina</h4>
          <p className="empty-status">
            Trenutno nemaš aktivnih porudžbina. Vreme je da nešto ukusno
            naručiš!
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerHomePage;
