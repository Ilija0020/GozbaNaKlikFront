import React, { useEffect, useState } from "react";
import "./OwnerMealsSection.scss";
import { ownerMealService } from "../../services/ownerMealService";
import OwnerMealFormModal from "../OwnerMealFormModal/OwnerMealFormModal";
import Spinner from "../../../../core/layout/spinner/Spinner";
import Toast from "../../../../core/layout/Toast/Toast";

const API_BASE_URL = "http://localhost:5128";

const OwnerMealsSection = ({ restaurant, onBack }) => {
  const [meals, setMeals] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [isMealFormOpen, setIsMealFormOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [brokenImageIds, setBrokenImageIds] = useState([]);

  useEffect(() => {
    const loadMeals = async () => {
      try {
        if (!restaurant) return;

        const mealsData = await ownerMealService.getMealsByRestaurant(
          restaurant.id,
        );

        const allergensData = await ownerMealService.getAllergens();

        setMeals(mealsData);
        setAllergens(allergensData);
      } catch (error) {
        setToastType("error");
        setToastMessage("Doslo je do greske pri ucitavanju jela.");
      } finally {
        setIsLoading(false);
      }
    };

    loadMeals();
  }, [restaurant]);

  useEffect(() => {
    if (!toastMessage) return;

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  if (isLoading) {
    return <Spinner />;
  }

  const handleAddMealClick = () => {
    setSelectedMeal(null);
    setIsMealFormOpen(true);
  };

  const handleEditMealClick = (meal) => {
    setSelectedMeal(meal);
    setIsMealFormOpen(true);
  };

  const handleCloseMealForm = () => {
    setSelectedMeal(null);
    setIsMealFormOpen(false);
  };

  const handleSaveMeal = async (formData) => {
    try {
      if (!restaurant) {
        setToastType("error");
        setToastMessage("Nije moguce sacuvati jelo.");
        return;
      }

      let savedMeal;

      if (selectedMeal) {
        savedMeal = await ownerMealService.updateMeal(
          restaurant.id,
          selectedMeal.id,
          {
            name: formData.name,
            description: formData.description,
            price: formData.price,
            allergenIds: formData.allergenIds,
          },
        );
      } else {
        savedMeal = await ownerMealService.createMeal(restaurant.id, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          allergenIds: formData.allergenIds,
        });
      }

      if (formData.photo) {
        savedMeal = await ownerMealService.uploadMealPhoto(
          restaurant.id,
          savedMeal.id,
          formData.photo,
        );
      }

      const updatedMeals = await ownerMealService.getMealsByRestaurant(
        restaurant.id,
      );

      setMeals(updatedMeals);
      handleCloseMealForm();
      setToastType("success");
      setToastMessage("Jelo je uspesno sacuvano.");
    } catch (error) {
      console.error(error);
      console.error(error.response?.data);

      setToastType("error");
      setToastMessage("Doslo je do greske pri cuvanju jela.");
    }
  };

  const handleDeleteMeal = async (meal) => {
    const isConfirmed = window.confirm(
      `Da li ste sigurni da zelite da obrisete jelo "${meal.name}"?`,
    );

    if (!isConfirmed) return;

    try {
      if (!restaurant) {
        setToastType("error");
        setToastMessage("Nije moguce obrisati jelo.");
        return;
      }

      await ownerMealService.deleteMeal(restaurant.id, meal.id);

      const updatedMeals = await ownerMealService.getMealsByRestaurant(
        restaurant.id,
      );

      setMeals(updatedMeals);
      setToastType("success");
      setToastMessage("Jelo je uspesno obrisano.");
    } catch (error) {
      console.error(error);
      console.error(error.response?.data);

      setToastType("error");
      setToastMessage("Doslo je do greske pri brisanju jela.");
    }
  };

  return (
    <div className="owner-meals">
      {toastMessage && (
        <Toast
          type={toastType}
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}

      <div className="owner-meals__header">
        <div>
          <h3>Jelovnik: {restaurant.name}</h3>
          <p>Pregled jela za izabrani restoran</p>
        </div>

        <div className="owner-meals__actions">
          <button type="button" onClick={onBack}>
            Nazad na restorane
          </button>

          <button type="button" onClick={handleAddMealClick}>
            Dodaj jelo
          </button>
        </div>
      </div>

      {meals.length === 0 ? (
        <p>Ovaj restoran trenutno nema dodata jela.</p>
      ) : (
        <div className="owner-meals__list">
          {meals.map((meal) => (
            <article className="owner-meal-card" key={meal.id}>
              <div className="owner-meal-card__image">
                {meal.photo && !brokenImageIds.includes(meal.id) ? (
                  <img
                    src={`${API_BASE_URL}${meal.photo}`}
                    alt={meal.name}
                    onError={() =>
                      setBrokenImageIds((previousIds) => [
                        ...previousIds,
                        meal.id,
                      ])
                    }
                  />
                ) : (
                  <span>Nema slike</span>
                )}
              </div>

              <div className="owner-meal-card__body">
                <div className="owner-meal-card__content">
                  <div>
                    <h4>{meal.name}</h4>
                    <p>{meal.description || "Ovo jelo nema opis."}</p>
                    <strong>{meal.price} RSD</strong>
                  </div>

                  {meal.allergens?.length > 0 && (
                    <div className="owner-meal-card__allergens">
                      {meal.allergens.map((allergen) => (
                        <span key={allergen.id}>{allergen.name}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="owner-meal-card__actions">
                  <button
                    type="button"
                    onClick={() => handleEditMealClick(meal)}
                  >
                    Izmeni
                  </button>
                  <button type="button" onClick={() => handleDeleteMeal(meal)}>
                    Obriši
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {isMealFormOpen && (
        <OwnerMealFormModal
          meal={selectedMeal}
          allergens={allergens}
          onCancel={handleCloseMealForm}
          onSave={handleSaveMeal}
        />
      )}
    </div>
  );
};
export default OwnerMealsSection;
