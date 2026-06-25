import React, { useState } from "react";
import "./OwnerRestaurantWorkingHoursModal.scss";

const daysOfWeek = [
  { value: "Monday", label: "Ponedeljak" },
  { value: "Tuesday", label: "Utorak" },
  { value: "Wednesday", label: "Sreda" },
  { value: "Thursday", label: "Cetvrtak" },
  { value: "Friday", label: "Petak" },
  { value: "Saturday", label: "Subota" },
  { value: "Sunday", label: "Nedelja" },
];

const OwnerRestaurantWorkingHoursModal = ({ restaurant, onCancel, onSave }) => {
  const [workingHours, setWorkingHours] = useState(
    daysOfWeek.map((day) => ({
      day: day.value,
      label: day.label,
      isOpen: true,
      startTime: "08:00",
      endTime: "22:00",
    })),
  );

  const handleWorkingHoursChange = (day, field, value) => {
    setWorkingHours((currentHours) =>
      currentHours.map((item) =>
        item.day === day ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const workingHoursForBackend = workingHours
      .filter((item) => item.isOpen)
      .map((item) => ({
        day: item.day,
        startTime: `${item.startTime}:00`,
        endTime: `${item.endTime}:00`,
      }));

    onSave(workingHoursForBackend);
  };
  return (
    <div className="owner-working-hours-modal" onClick={onCancel}>
      <div
        className="owner-working-hours-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="owner-working-hours-modal__header">
          <h4>Radno vreme: {restaurant.name}</h4>
          <button type="button" onClick={onCancel} aria-label="Zatvori formu">
            ×
          </button>
        </div>

        <form className="working-hours-form" onSubmit={handleSubmit}>
          {workingHours.map((item) => (
            <div className="working-hours-form__row" key={item.day}>
              <label className="working-hours-form__day">
                <input
                  type="checkbox"
                  checked={item.isOpen}
                  onChange={(event) =>
                    handleWorkingHoursChange(
                      item.day,
                      "isOpen",
                      event.target.checked,
                    )
                  }
                />
                {item.label}
              </label>

              <div className="working-hours-form__time-inputs">
                <input
                  type="time"
                  value={item.startTime}
                  disabled={!item.isOpen}
                  onChange={(event) =>
                    handleWorkingHoursChange(
                      item.day,
                      "startTime",
                      event.target.value,
                    )
                  }
                />

                <span>do</span>

                <input
                  type="time"
                  value={item.endTime}
                  disabled={!item.isOpen}
                  onChange={(event) =>
                    handleWorkingHoursChange(
                      item.day,
                      "endTime",
                      event.target.value,
                    )
                  }
                />
              </div>
            </div>
          ))}

          <div className="working-hours-form__actions">
            <button type="submit">Sacuvaj</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OwnerRestaurantWorkingHoursModal;
