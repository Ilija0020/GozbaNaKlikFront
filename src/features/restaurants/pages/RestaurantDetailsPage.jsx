import React, { useEffect, useState } from "react";
import "./RestaurantDetailsPage.scss";
import { Link, useParams } from "react-router-dom";
import { publicRestaurantService } from "../services/publicRestaurantService";
import MealCard from "../components/MealCard/MealCard";
import { API_BASE_URL } from "../../../core/services/apiAxios";
import fallbackRestaurantImage from "../../../assets/local-restaurant-logo.png";

const RestaurantDetailsPage = () => {
  const { restaurantId } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const restaurantPhotoSource = restaurant?.photo
    ? `${API_BASE_URL}${restaurant.photo}`
    : fallbackRestaurantImage;

  useEffect(() => {
    const loadRestaurant = async () => {
      try {
        setIsLoading(true);
        setError("");

        const [restaurantData, mealsData] = await Promise.all([
          publicRestaurantService.getRestaurantById(restaurantId),
          publicRestaurantService.getRestaurantMeals(restaurantId),
        ]);

        setRestaurant(restaurantData);
        setMeals(mealsData);
      } catch (error) {
        console.error(error);
        setError("Nije moguće učitati restoran.");
      } finally {
        setIsLoading(false);
      }
    };

    loadRestaurant();
  }, [restaurantId]);

  if (isLoading) {
    return <p>Učitavanje restorana...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="restaurant-details">
      <Link to="/restaurants" className="restaurant-details__back-link">
        ← Nazad na restorane
      </Link>
      <div className="restaurant-details__header">
        <div className="restaurant-details__image-wrapper">
          <img
            src={restaurantPhotoSource}
            alt={`Restoran ${restaurant.name}`}
            className={`restaurant-details__image ${
              restaurant.photo ? "" : "restaurant-details__image--fallback"
            }`}
          />
        </div>

        <div className="restaurant-details__info">
          <h1 className="restaurant-details__title">{restaurant.name}</h1>

          <p className="restaurant-details__description">
            {restaurant.description || "Opis restorana nije dostupan."}
          </p>

          <p className="restaurant-details__address">{restaurant.address}</p>
        </div>
      </div>

      <h2 className="restaurant-details__menu-title">Jelovnik</h2>

      {meals.length === 0 ? (
        <p className="restaurant-details__empty">
          Ovaj restoran trenutno nema dostupnih jela.
        </p>
      ) : (
        <div className="restaurant-details__meals">
          {meals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>
      )}
    </section>
  );
};
export default RestaurantDetailsPage;
