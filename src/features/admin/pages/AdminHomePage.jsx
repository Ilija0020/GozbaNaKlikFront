import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../core/layout/DashboardLayout/DashboardLayout";
import "./AdminHomePage.scss";

const AdminHomePage = () => {
  return (
    <DashboardLayout 
      roleTitle="Sistemski Admin" 
      welcomeMessage="Globalni nadzor nad korisnicima, restoranima i parametrima platforme Gozba Na Klik."
    >
      <div className="admin-home">
        <div className="dashboard-grid counters-grid">
          <div className="counter-item">
            <strong>142</strong>
            <div className="counter-label">Ukupno Korisnika</div>
          </div>
          <div className="counter-item">
            <strong>12</strong>
            <div className="counter-label">Aktivnih Restorana</div>
          </div>
          <div className="counter-item">
            <strong>8</strong>
            <div className="counter-label">Aktivnih Kurira</div>
          </div>
        </div>

        <div className="dashboard-grid">
          <Link to="/admin/users" className="action-card">
            <div className="card-icon">👥</div>
            <h3>Korisnički nalozi</h3>
            <p>Pregled, blokiranje i izmena svih korisnika.</p>
          </Link>
          <Link to="/admin/register-user" className="action-card">
            <div className="card-icon">👔</div>
            <h3>Registruj Vlasnika</h3>
            <p>Kreiraj novi verifikovani nalog za ugostitelja.</p>
          </Link>
          <Link to="/admin/register-user" className="action-card">
            <div className="card-icon">🚴</div>
            <h3>Registruj Kurira</h3>
            <p>Dodaj novog dostavljača u sistem dostave.</p>
          </Link>
          <Link to="/admin/restaurants" className="action-card">
            <div className="card-icon">🍽️</div>
            <h3>Restorani</h3>
            <p>Pregled, kreiranje, izmena i brisanje restorana.</p>
          </Link>
        </div>

        <div className="status-panel">
          <h4>📋 Sistemski logovi (Poslednje registracije)</h4>
          <ul className="logs-list">
            <li>Korisnik <strong>marko99</strong> se registrovao kao Kupac <span className="log-time">(Pre 5 min)</span></li>
            <li>Novi restoran <strong>"Pizzeria Napoli"</strong> poslat na odobrenje <span className="log-time">(Pre 1h)</span></li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminHomePage;