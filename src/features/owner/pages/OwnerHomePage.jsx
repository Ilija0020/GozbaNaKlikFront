import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout/DashboardLayout";

const OwnerHomePage = () => {
  return (
    <DashboardLayout 
      roleTitle="Vlasnik Restorana" 
      welcomeMessage="Upravljaj svojim ugostiteljskim objektima, jelovnicima i zaposlenima na jednom mestu."
    >
      <div className="dashboard-grid">
        <div className="action-card">
          <div className="card-icon">🏢</div>
          <h3>Moji restorani</h3>
          <p>Pregled i izmena informacija o tvojim objektima.</p>
        </div>
        <div className="action-card">
          <div className="card-icon">📜</div>
          <h3>Jelovnici i jela</h3>
          <p>Dodaj nova jela, prilagodi cene i sastojke.</p>
        </div>
        <div className="action-card">
          <div className="card-icon">🕒</div>
          <h3>Radno vreme</h3>
          <p>Podesi redovno radno vreme i neradne dane.</p>
        </div>
        <div className="action-card">
          <div className="card-icon">👥</div>
          <h3>Zaposleni</h3>
          <p>Upravljaj kuvarima i osobljem tvog restorana.</p>
        </div>
      </div>

      <div className="status-panel" style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
        <div>
          <h2 style={{ color: '#ff4757', margin: '0 0 5px 0' }}>1</h2>
          <p style={{ margin: 0, color: '#747d8c', fontSize: '14px' }}>Aktivni restoran</p>
        </div>
        <div style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
          <h2 style={{ color: '#ff4757', margin: '0 0 5px 0' }}>24</h2>
          <p style={{ margin: 0, color: '#747d8c', fontSize: '14px' }}>Ukupno jela</p>
        </div>
        <div style={{ borderLeft: '1px solid #eee', paddingLeft: '40px' }}>
          <h2 style={{ color: '#ff4757', margin: '0 0 5px 0' }}>4</h2>
          <p style={{ margin: 0, color: '#747d8c', fontSize: '14px' }}>Registrovana radnika</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerHomePage;