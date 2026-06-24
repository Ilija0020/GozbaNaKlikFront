import React, { useState } from "react";
import SideDashboardLayout from "../../../core/layout/DashboardLayout/SideDashboardLayout/SideDashboardLayout";
import OwnerSideBar from "../components/OwnerSideBar/OwnerSideBar";
import "./OwnerHomePage.scss";
import OwnerRestaurantsSection from "../components/OwnerRestaurantsSection/OwnerRestaurantsSection";

const OwnerHomePage = () => {
  const [activeSection, setActiveSection] = useState("restaurants");

  const renderContent = () => {
    if (activeSection === "restaurants") {
      return <OwnerRestaurantsSection />;
    }
    if (activeSection === "employees") {
      return <p>Ovde ce biti kartice mojih zaposlenih.</p>;
    }
    if (activeSection === "orders") {
      return <p>Ovde ce biti kartice mojih porudzbina.</p>;
    }
    if (activeSection === "settings") {
      return <p>Ovde ce biti podesavanja.</p>;
    }
    return null;
  };

  return (
    <SideDashboardLayout
      title="Panel vlasnika restorana"
      subtitle="Upravljaj restoranima, zaposlenima i porudzbinama."
      sidebar={
        <OwnerSideBar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      }
    >
      {renderContent()}
    </SideDashboardLayout>
  );
};

export default OwnerHomePage;
