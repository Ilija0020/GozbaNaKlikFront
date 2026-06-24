import React, { useEffect, useState } from "react";
import "./OwnerRestaurantsSection.scss";
import { ownerRestaurantService } from "../../services/ownerRestaurantService";
import Spinner from "../../../../core/layout/spinner/Spinner";
import Toast from "../../../../core/layout/Toast/Toast";

const API_BASE_URL = "http://localhost:5128";

const OwnerRestaurantsSection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const loadRestaurants = async () => {
      try {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (!user) {
          setToastMessage("Korisnik nije prijavljen");
          return;
        }

        const data = await ownerRestaurantService.getRestaurantsByOwner(
          user.id,
        );
        setRestaurants(data);
      } catch (err) {
        setToastMessage("Doslo je do greske pri ucitavanju restorana.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurants();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="owner-restaurants">
      {toastMessage && (
        <Toast
          type="error"
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
                  {restaurant.photo ? (
                    <img
                      src={`${API_BASE_URL}${restaurant.photo}`}
                      alt={restaurant.name}
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </div>

                <div className="owner-restaurant-card__body">
                  <h4>{restaurant.name}</h4>
                  <p className="owner-restaurant-card__address">
                    {restaurant.address}
                  </p>
                  <p className="owner-restaurant-card__description">
                    {restaurant.description}
                  </p>

                  <div className="owner-restaurant-card__actions">
                    <button type="button">Izmeni</button>
                    <button type="button">Radno vreme</button>
                    <button type="button">Jelovnik</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default OwnerRestaurantsSection;
