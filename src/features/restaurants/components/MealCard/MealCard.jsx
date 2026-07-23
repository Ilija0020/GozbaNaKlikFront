import React from "react";
import "./MealCard.scss";
import { API_BASE_URL } from "../../../../core/services/apiAxios";
import fallbackMealImage from "../../../../assets/gyros-meal.png";

const MealCard = ({ meal }) => {
  const photoSource = meal.photo
    ? `${API_BASE_URL}${meal.photo}`
    : fallbackMealImage;

  return (
    <article className="meal-card">
      <div className="meal-card__image-wrapper">
        <img
          src={photoSource}
          alt={`Jelo ${meal.name}`}
          className="meal-card__image"
        />
      </div>
      <div className="meal-card__content">
        <h3 className="meal-card__name">{meal.name}</h3>
        <p className="meal-card__description">{meal.description}</p>
        <p className="meal-card__price">{meal.price} RSD</p>
        {meal.allergens.length > 0 && (
          <p className="meal-card__allergens">
            Alergeni:{" "}
            {meal.allergens.map((allergen) => allergen.name).join(", ")}
          </p>
        )}
      </div>
    </article>
  );
};

export default MealCard;
