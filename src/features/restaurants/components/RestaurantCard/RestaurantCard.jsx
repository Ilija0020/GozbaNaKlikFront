import React from "react";
import localRestaurantLogo from "../../../../assets/local-restaurant-logo.png";
import "./RestaurantCard.scss";
import { API_BASE_URL } from "../../../../core/services/apiAxios";
import { Link } from "react-router-dom";
import {
  getTodayWorkingHoursText,
  getTodayWorkingHours,
  isTodayNonWorkingDay,
} from "../../utils/restaurantWorkingHours";

const RestaurantCard = ({ restaurant }) => {
  const todayWorkingHours = getTodayWorkingHours(restaurant.workingHours);
  const todayNonWorkingDay = isTodayNonWorkingDay(restaurant.nonWorkingDays);

  const photoSource = restaurant.photo
    ? `${API_BASE_URL}${restaurant.photo}`
    : localRestaurantLogo;

  return (
    <article className="restaurant-card">
      <Link
        to={`/restaurants/${restaurant.id}`}
        className="restaurant-card__link"
      >
        <div className="restaurant-card__image-wrapper">
          <img
            src={photoSource}
            alt={`Restoran ${restaurant.name}`}
            className="restaurant-card__image"
          />
        </div>
        <div className="restaurant-card__content">
          <h2 className="restaurant-card__name">{restaurant.name}</h2>
          <p className="restaurant-card__description">
            {restaurant.description || "Opis restorana nije dostupan."}
          </p>
          <p
            className={`restaurant-card__working-hours ${
              !todayWorkingHours || todayNonWorkingDay
                ? "restaurant-card__working-hours--closed"
                : ""
            }`}
          >
            {getTodayWorkingHoursText(restaurant)}
          </p>
          <p className="restaurant-card__address">{restaurant.address}</p>
        </div>
      </Link>
    </article>
  );
};
export default RestaurantCard;
