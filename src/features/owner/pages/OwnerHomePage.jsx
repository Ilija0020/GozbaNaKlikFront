import React from "react";
import DashboardLayout from "../../../core/layout/DashboardLayout/DashboardLayout";
import "./OwnerHomePage.scss";

const OwnerHomePage = () => {
  return (
    <DashboardLayout 
      roleTitle="Vlasnik Restorana" 
      welcomeMessage="Upravljaj svojim ugostiteljskim objektima, jelovnicima i zaposlenima na jednom mestu."
    >
      <div className="owner-home">
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

        <div className="status-panel">
          <div className="stats-container">
            <div className="stat-box">
              <h2>1</h2>
              <p>Aktivni restoran</p>
            </div>
            <div className="stat-box">
              <h2>24</h2>
              <p>Ukupno jela</p>
            </div>
            <div className="stat-box">
              <h2>4</h2>
              <p>Registrovana radnika</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OwnerHomePage;