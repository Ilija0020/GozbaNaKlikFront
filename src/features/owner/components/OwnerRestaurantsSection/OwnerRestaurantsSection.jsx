import React, { useEffect, useState } from "react";
import "./OwnerRestaurantsSection.scss";
import { ownerRestaurantService } from "../../services/ownerRestaurantService";
import Spinner from "../../../../core/layout/spinner/Spinner";
import Toast from "../../../../core/layout/Toast/Toast";
import OwnerRestaurantEditForm from "../OwnerRestaurantEditForm/OwnerRestaurantEditForm";
import OwnerRestaurantWorkingHoursModal from "../OwnerRestaurantWorkingHoursModal/OwnerRestaurantWorkingHoursModal";
import OwnerMealsSection from "../OwnerMealsSection/OwnerMealsSection";

const API_BASE_URL = "http://localhost:5128";

const getTodayName = () => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[new Date().getDay()];
};

const getTodayDate = () => {
  return new Date().toISOString().slice(0, 10);
};

const formatTime = (time) => {
  return time.slice(0, 5);
};

const getTodayWorkingHours = (workingHours) => {
  const today = getTodayName();

  return workingHours?.find((item) => item.day === today);
};

const isTodayNonWorkingDay = (nonWorkingDays) => {
  const today = getTodayDate();

  return nonWorkingDays?.some((item) => item.date === today);
};

const getTodayWorkingHoursText = (restaurant) => {
  if (isTodayNonWorkingDay(restaurant.nonWorkingDays)) {
    return "Danas: neradni dan";
  }

  const todayWorkingHours = getTodayWorkingHours(restaurant.workingHours);

  if (!todayWorkingHours) return "Danas: zatvoreno";

  const nextDayText = todayWorkingHours.endsNextDay ? " (posle ponoci)" : "";

  return `Danas: ${formatTime(todayWorkingHours.startTime)} - ${formatTime(todayWorkingHours.endTime)}${nextDayText}`;
};

const OwnerRestaurantsSection = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [workingHoursRestaurant, setWorkingHoursRestaurant] = useState(null);
  const [menuRestaurant, setMenuRestaurant] = useState(null);

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

  const handleSaveWorkingHours = async (scheduleData) => {
    try {
      const userString = localStorage.getItem("user");
      const user = userString ? JSON.parse(userString) : null;

      if (!user || !workingHoursRestaurant) {
        setToastType("error");
        setToastMessage("Nije moguce sacuvati radno vreme");
        return;
      }

      await ownerRestaurantService.updateRestaurantWorkingHours(
        workingHoursRestaurant.id,
        user.id,
        scheduleData.workingHours,
      );

      await ownerRestaurantService.updateRestaurantNonWorkingDays(
        workingHoursRestaurant.id,
        user.id,
        scheduleData.nonWorkingDays,
      );

      const updatedRestaurants =
        await ownerRestaurantService.getRestaurantsByOwner(user.id);

      setRestaurants(updatedRestaurants);
      setWorkingHoursRestaurant(null);
      setToastType("success");
      setToastMessage("Raspored restorana je uspesno sacuvan.");
    } catch (err) {
      setToastType("error");
      setToastMessage("Doslo je do greske pri cuvanju rasporeda restorana.");
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (menuRestaurant) {
    return (
      <OwnerMealsSection
        restaurant={menuRestaurant}
        onBack={() => setMenuRestaurant(null)}
      />
    );
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
            const todayWorkingHours = getTodayWorkingHours(
              restaurant.workingHours,
            );
            const todayNonWorkingDay = isTodayNonWorkingDay(
              restaurant.nonWorkingDays,
            );

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
                  <div className="owner-restaurant-card__content">
                    <div>
                      <h4>{restaurant.name}</h4>
                      <p className="owner-restaurant-card__address">
                        {restaurant.address}
                      </p>
                      <p className="owner-restaurant-card__description">
                        {restaurant.description || "Ovaj restoran nema opis."}
                      </p>
                    </div>

                    <div
                      className={`owner-restaurant-card__working-hours ${
                        todayWorkingHours && !todayNonWorkingDay
                          ? "owner-restaurant-card__working-hours--open"
                          : "owner-restaurant-card__working-hours--closed"
                      }`}
                    >
                      <span>Radno vreme</span>
                      <strong>{getTodayWorkingHoursText(restaurant)}</strong>
                    </div>
                  </div>

                  <div className="owner-restaurant-card__actions">
                    <button
                      type="button"
                      onClick={() => handleEditClick(restaurant)}
                    >
                      Izmeni
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkingHoursRestaurant(restaurant)}
                    >
                      Radno vreme
                    </button>
                    <button
                      type="button"
                      onClick={() => setMenuRestaurant(restaurant)}
                    >
                      Jelovnik
                    </button>
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
      {workingHoursRestaurant && (
        <OwnerRestaurantWorkingHoursModal
          restaurant={workingHoursRestaurant}
          onCancel={() => setWorkingHoursRestaurant(null)}
          onSave={handleSaveWorkingHours}
        />
      )}
    </div>
  );
};
export default OwnerRestaurantsSection;
