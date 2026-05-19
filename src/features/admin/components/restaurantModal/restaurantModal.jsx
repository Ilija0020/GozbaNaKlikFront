import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./restaurantModal.scss";

const RestaurantModal = ({ restaurant, owners, onSave, onClose }) => {
  const isEditMode = !!restaurant;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    if (isEditMode) {
      reset({
        name: restaurant.name,
        address: restaurant.address,
        ownerId: restaurant.ownerId,
      });
    }
  }, [restaurant, isEditMode, reset]);

  const onSubmit = async (data) => {
    await onSave({
      name: data.name,
      address: data.address,
      ownerId: parseInt(data.ownerId),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        <div className="modal__header">
          <h3 className="modal__title">
            {isEditMode ? "Izmeni restoran" : "Dodaj restoran"}
          </h3>
          <button className="modal__close" onClick={onClose}>&times;</button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit(onSubmit)}>

          <div className="form-group">
            <label htmlFor="name">Naziv restorana</label>
            <input
              id="name"
              type="text"
              disabled={isSubmitting}
              placeholder="npr. Pizzeria Napoli"
              {...register("name", { required: "Naziv je obavezan" })}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresa</label>
            <input
              id="address"
              type="text"
              disabled={isSubmitting}
              placeholder="npr. Ulica br. 1, Novi Sad"
              {...register("address", { required: "Adresa je obavezna" })}
            />
            {errors.address && <span className="error-message">{errors.address.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="ownerId">Vlasnik</label>
            <select
              id="ownerId"
              disabled={isSubmitting}
              {...register("ownerId", { required: "Vlasnik je obavezan" })}
            >
              <option value="">Izaberite vlasnika...</option>
              {owners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} {owner.surname} (@{owner.username})
                </option>
              ))}
            </select>
            {errors.ownerId && <span className="error-message">{errors.ownerId.message}</span>}
          </div>

          <div className="modal__actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Odustani
            </button>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Cuvanje..."
                : isEditMode
                ? "Sacuvaj izmene"
                : "Dodaj restoran"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default RestaurantModal;