import React, { useEffect, useRef, useState } from "react";
import "./OwnerRestaurantEditForm.scss";
import { useForm } from "react-hook-form";

const OwnerRestaurantEditForm = ({ restaurant, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const fileInputRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoError, setPhotoError] = useState("");

  useEffect(() => {
    if (restaurant) {
      reset({
        name: restaurant.name || "",
        address: restaurant.address || "",
        description: restaurant.description || "",
      });
      setSelectedPhoto(null);
      setPhotoError("");
    }
  }, [restaurant, reset]);

  const onSubmit = async (data) => {
    await onSave({
      name: data.name,
      address: data.address,
      description: data.description,
      photo: selectedPhoto,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      const error = validatePhoto(file);
      if (error) {
        setPhotoError(error);
        setSelectedPhoto(null);
        return;
      }
      setPhotoError("");
      setSelectedPhoto(file);
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];

    if (file) {
      const error = validatePhoto(file);
      if (error) {
        setPhotoError(error);
        setSelectedPhoto(null);
        return;
      }
      setPhotoError("");
      setSelectedPhoto(file);
    }
  };

  const preventFileOpen = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const validatePhoto = (file) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Dozvoljeni su samo JPG, PNG i WEBP formati.";
    }
    if (file.size > maxSize) {
      return "Slika mora biti manja od 5MB.";
    }
    return "";
  };

  return (
    <div
      className="owner-edit-modal"
      onClick={onCancel}
      onDragOver={preventFileOpen}
      onDrop={preventFileOpen}
    >
      <div
        className="owner-edit-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="owner-restaurant-edit-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="owner-restaurant-edit-form__header">
            <h4>Izmena restorana: {restaurant.name}</h4>
            <button
              type="button"
              className="owner-restaurant-edit-form__close"
              onClick={onCancel}
              disabled={isSubmitting}
              aria-label="Zatvori formu"
            >
              ×
            </button>
          </div>
          <div className="form-group">
            <label htmlFor="name">Naziv restorana</label>
            <input
              type="text"
              id="name"
              disabled={isSubmitting}
              {...register("name", { required: "Naziv je obavezan" })}
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresa</label>
            <input
              type="text"
              id="address"
              disabled={isSubmitting}
              {...register("address", { required: "Adresa je obavezna" })}
            />
            {errors.address && (
              <span className="error-message">{errors.address.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Opis</label>
            <textarea
              id="description"
              disabled={isSubmitting}
              {...register("description")}
            />
          </div>

          <div className="form-group">
            <label>Slika restorana</label>

            <div
              className={`file-upload ${selectedPhoto ? "file-upload--selected" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={preventFileOpen}
              onDrop={handleFileDrop}
              role="button"
              tabIndex={0}
            >
              {photoError && (
                <span className="error-message">{photoError}</span>
              )}
              <input
                ref={fileInputRef}
                type="file"
                disabled={isSubmitting}
                accept=".jpg, .jpeg, .png, .webp"
                onChange={handleFileChange}
              />

              <span className="file-upload__title">
                Izaberi ili prevuci sliku
              </span>
              <span className="file-upload__text">
                {selectedPhoto
                  ? selectedPhoto.name
                  : "JPG, PNG ili WEBP do 5MB"}
              </span>
            </div>
          </div>

          <div className="owner-restaurant-edit-form__actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Čuvanje..." : "Sačuvaj"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OwnerRestaurantEditForm;
