import React, { useEffect, useState } from "react";
import "./OwnerRestaurantsSection.scss";
import { ownerRestaurantService } from "../../services/ownerRestaurantService";
import Spinner from "../../../../core/layout/spinner/Spinner";
import Toast from "../../../../core/layout/Toast/Toast";
import OwnerRestaurantEditForm from "../OwnerRestaurantEditForm/OwnerRestaurantEditForm";

const API_BASE_URL = "http://localhost:5128";

const OwnerRestaurantsSection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [brokenImageIds, setBrokenImageIds] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (!user) {
          setToastType("error");
          setToastMessage("Korisnik nije prijavljen");
          return;
        }

        const data = await ownerRestaurantService.getRestaurantsByOwner(
          user.id,
        );
        setRestaurants(data);
      } catch (err) {
        setToastType("error");
        setToastMessage("Doslo je do greske pri ucitavanju restorana.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleEditClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleSaveRestaurant = async (formData) => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (!user || !selectedRestaurant) {
        setToastType("error");
        setToastMessage("Nije moguce sacuvati izmene");
        return;
      }
      await ownerRestaurantService.updateRestaurantByOwner(
        selectedRestaurant.id,
        user.id,
        {
          name: formData.name,
          address: formData.address,
          description: formData.description,
        },
      );
      if (formData.photo) {
        await ownerRestaurantService.uploadRestaurantPhoto(
          selectedRestaurant.id,
          user.id,
          formData.photo,
        );
      }
      const updatedRestaurant =
        await ownerRestaurantService.getRestaurantsByOwner(user.id);

      setRestaurants(updatedRestaurant);
      setSelectedRestaurant(null);
      setToastType("success");
      setToastMessage("Restoran je uspesno izmenjen");
    } catch (err) {
      setToastType("error");
      setToastMessage("Doslo je do greske pri cuvanju restorana.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="owner-restaurants">
      {toastMessage && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
      <div className="owner-restaurants__header">
        <div>
          <h3>Moji Restorani</h3>
          <p>Pregled restorana koji su ti dodeljeni</p>
        </div>
      </div>

      {restaurants.length === 0 ? (
        <p>Trenutno nemas dodeljenih restorana.</p>
      ) : (
        <div className="owner-restaurants__list">
          {restaurants.map((restaurant) => {
            return (
              <article className="owner-restaurant-card" key={restaurant.id}>
                <div className="owner-restaurant-card__image">
                  {restaurant.photo &&
                  !brokenImageIds.includes(restaurant.id) ? (
                    <img
                      src={`${API_BASE_URL}${restaurant.photo}`}
                      alt={restaurant.name}
                      onError={() =>
                        setBrokenImageIds((previousIds) => [
                          ...previousIds,
                          restaurant.id,
                        ])
                      }
                    />
                  ) : (
                    <span>Nema slike</span>
                  )}
                </div>

                <div className="owner-restaurant-card__body">
                  <h4>{restaurant.name}</h4>
                  <p className="owner-restaurant-card__address">
                    {restaurant.address}
                  </p>
                  <p className="owner-restaurant-card__description">
                    {restaurant.description || "Ovaj restoran nema opis."}
                  </p>

                  <div className="owner-restaurant-card__actions">
                    <button
                      type="button"
                      onClick={() => handleEditClick(restaurant)}
                    >
                      Izmeni
                    </button>
                    <button type="button">Radno vreme</button>
                    <button type="button">Jelovnik</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {selectedRestaurant && (
        <OwnerRestaurantEditForm
          restaurant={selectedRestaurant}
          onCancel={() => setSelectedRestaurant(null)}
          onSave={handleSaveRestaurant}
        />
      )}
    </div>
  );
};
export default OwnerRestaurantsSection;
