import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../core/layout/DashboardLayout/DashboardLayout";
import Spinner from "../../../../core/layout/spinner/Spinner";
import { restaurantService } from "../../services/restaurantService";
import { adminService } from "../../services/adminService";
import "./restaurantList.scss";
import RestaurantModal from "../restaurantModal/restaurantModal";
//
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState(null);
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchData = async () => {
    try {
      const [restaurantsData, ownersData] = await Promise.all([
        restaurantService.getAllRestaurants(),
        adminService.getOwners(),
      ]);
      setRestaurants(restaurantsData);
      setOwners(ownersData);
    } catch (err) {
      setError("Doslo je do greske prilikom ucitavanja podataka.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setSelectedRestaurant(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRestaurant(null);
  };

  const handleSave = async (data) => {
    try {
      if (selectedRestaurant) {
        await restaurantService.updateRestaurant(selectedRestaurant.id, data);
      } else {
        await restaurantService.createRestaurant(data);
      }
      handleCloseModal();
      await fetchData();
    } catch (err) {
      setError("Doslo je do greske prilikom cuvanja restorana.");
    }
  };

  const handleDeleteConfirm = (id) => {
    setDeleteConfirmId(id);
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  const handleDelete = async (id) => {
    try {
      await restaurantService.deleteRestaurant(id);
      setDeleteConfirmId(null);
      await fetchData();
    } catch (err) {
      setError("Doslo je do greske prilikom brisanja restorana.");
    }
  };

  const getOwnerName = (ownerId) => {
    const owner = owners.find((o) => o.id === ownerId);
    return owner ? `${owner.name} ${owner.surname}` : "-";
  };

  return (
    <DashboardLayout
      roleTitle="Sistemski Admin"
      welcomeMessage="Pregled i upravljanje svim restoranima na platformi."
    >
      <div className="restaurant-list-page">

        {error && <p className="restaurant-list-page__error">{error}</p>}

        <div className="restaurant-list-page__toolbar">
          <h2 className="restaurant-list-page__title">Restorani</h2>
          <button className="btn btn--primary" onClick={handleOpenCreate}>
            + Dodaj restoran
          </button>
        </div>

        {restaurants === null && !error && <Spinner />}

        {restaurants !== null && restaurants.length === 0 && (
          <div className="restaurant-list-page__empty">
            <p>Nema registrovanih restorana u sistemu.</p>
          </div>
        )}

        {restaurants !== null && restaurants.length > 0 && (
          <table className="restaurant-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Naziv</th>
                <th>Adresa</th>
                <th>Vlasnik</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant.id}>
                  <td>{restaurant.id}</td>
                  <td className="restaurant-table__name">{restaurant.name}</td>
                  <td>{restaurant.address}</td>
                  <td>{getOwnerName(restaurant.ownerId)}</td>
                  <td>
                    {deleteConfirmId === restaurant.id ? (
                      <div className="restaurant-table__confirm">
                        <span className="restaurant-table__confirm-text">Sigurno?</span>
                        <button
                          className="btn btn--danger"
                          onClick={() => handleDelete(restaurant.id)}
                        >
                          Da, obrisi
                        </button>
                        <button
                          className="btn btn--secondary"
                          onClick={handleDeleteCancel}
                        >
                          Odustani
                        </button>
                      </div>
                    ) : (
                      <div className="restaurant-table__actions">
                        <button
                          className="btn btn--secondary"
                          onClick={() => handleOpenEdit(restaurant)}
                        >
                          Izmeni
                        </button>
                        <button
                          className="btn btn--danger"
                          onClick={() => handleDeleteConfirm(restaurant.id)}
                        >
                          Obrisi
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>

      {modalOpen && (
        <RestaurantModal
          restaurant={selectedRestaurant}
          owners={owners}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}

    </DashboardLayout>
  );
};

export default RestaurantList;