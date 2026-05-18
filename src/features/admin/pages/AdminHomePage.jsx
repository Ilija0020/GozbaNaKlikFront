import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout/DashboardLayout";

const AdminHomePage = () => {
  return (
    <DashboardLayout 
      roleTitle="Sistemski Admin" 
      welcomeMessage="Globalni nadzor nad korisnicima, restoranima i parametrima platforme Gozba Na Klik."
    >
      <div className="dashboard-grid" style={{ marginBottom: '25px' }}>
        <div style={{ background: '#f1f2f6', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <strong style={{ fontSize: '20px', color: '#2f3542' }}>142</strong>
          <div style={{ color: '#57606f', fontSize: '12px' }}>Ukupno Korisnika</div>
        </div>
        <div style={{ background: '#f1f2f6', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <strong style={{ fontSize: '20px', color: '#2f3542' }}>12</strong>
          <div style={{ color: '#57606f', fontSize: '12px' }}>Aktivnih Restorana</div>
        </div>
        <div style={{ background: '#f1f2f6', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
          <strong style={{ fontSize: '20px', color: '#2f3542' }}>8</strong>
          <div style={{ color: '#57606f', fontSize: '12px' }}>Aktivnih Kurira</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="action-card">
          <div className="card-icon">👥</div>
          <h3>Korisnički nalozi</h3>
          <p>Pregled, blokiranje i izmena svih korisnika.</p>
        </div>
        <div className="action-card">
          <div className="card-icon">👔</div>
          <h3>Registruj Vlasnika</h3>
          <p>Kreiraj novi verifikovani nalog za ugostitelja.</p>
        </div>
        <div className="action-card">
          <div className="card-icon">🚴</div>
          <h3>Registruj Kurira</h3>
          <p>Dodaj novog dostavljača u sistem dostave.</p>
        </div>
      </div>

    </DashboardLayout>
  );
};

export default AdminHomePage;