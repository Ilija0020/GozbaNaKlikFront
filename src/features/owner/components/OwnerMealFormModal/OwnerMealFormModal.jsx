import React, { useEffect, useRef, useState } from "react";
import "./OwnerMealFormModal.scss";
import { useForm } from "react-hook-form";

const API_BASE_URL = "http://localhost:5128";

const OwnerMealFormModal = ({ meal, allergens, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const fileInputRef = useRef(null);
  const photoPreviewObjectUrlRef = useRef(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const [photoError, setPhotoError] = useState("");

  const isEditMode = Boolean(meal);
  const watchedName = watch("name");
  const watchedPrice = watch("price");
  const watchedAllergenIds = watch("allergenIds") || [];

  const selectedAllergens = allergens.filter((allergen) =>
    watchedAllergenIds.includes(String(allergen.id)),
  );

  const getExistingPhotoPreviewUrl = () => {
    return meal?.photo ? `${API_BASE_URL}${meal.photo}` : "";
  };

  const clearPhotoPreviewObjectUrl = () => {
    if (photoPreviewObjectUrlRef.current) {
      URL.revokeObjectURL(photoPreviewObjectUrlRef.current);
      photoPreviewObjectUrlRef.current = null;
    }
  };

  const showSelectedPhotoPreview = (file) => {
    clearPhotoPreviewObjectUrl();

    const previewUrl = URL.createObjectURL(file);
    photoPreviewObjectUrlRef.current = previewUrl;
    setPhotoPreviewUrl(previewUrl);
  };

  const restoreExistingPhotoPreview = () => {
    clearPhotoPreviewObjectUrl();
    setPhotoPreviewUrl(getExistingPhotoPreviewUrl());
  };

  useEffect(() => {
    reset({
      name: meal?.name || "",
      description: meal?.description || "",
      price: meal?.price || "",
      allergenIds:
        meal?.allergens?.map((allergen) => String(allergen.id)) || [],
    });

    setSelectedPhoto(null);
    setPhotoPreviewUrl(getExistingPhotoPreviewUrl());
    setPhotoError("");

    return () => {
      clearPhotoPreviewObjectUrl();
    };
  }, [meal, reset]);

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

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const error = validatePhoto(file);

    if (error) {
      setPhotoError(error);
      setSelectedPhoto(null);
      restoreExistingPhotoPreview();
      return;
    }

    setPhotoError("");
    setSelectedPhoto(file);
    showSelectedPhotoPreview(file);
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];

    if (!file) return;

    const error = validatePhoto(file);

    if (error) {
      setPhotoError(error);
      setSelectedPhoto(null);
      restoreExistingPhotoPreview();
      return;
    }

    setPhotoError("");
    setSelectedPhoto(file);
    showSelectedPhotoPreview(file);
  };

  const preventFileOpen = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onSubmit = async (data) => {
    await onSave({
      name: data.name,
      description: data.description,
      price: Number(data.price),
      allergenIds: (data.allergenIds || []).map((id) => Number(id)),
      photo: selectedPhoto,
    });
  };

  return (
    <div
      className="owner-meal-modal"
      onClick={onCancel}
      onDragOver={preventFileOpen}
      onDrop={preventFileOpen}
    >
      <div
        className="owner-meal-modal__content"
        onClick={(event) => event.stopPropagation()}
      >
        <form className="owner-meal-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="owner-meal-form__header">
            <h4>
              {isEditMode ? `Izmena jela: ${meal.name}` : "Dodavanje jela"}
            </h4>

            <button
              type="button"
              className="owner-meal-form__close"
              onClick={onCancel}
              disabled={isSubmitting}
              aria-label="Zatvori formu"
            >
              ×
            </button>
          </div>

          <div className="owner-meal-form__layout">
            <div className="owner-meal-form__fields">
              <div className="form-group">
                <label htmlFor="name">
                  Naziv jela <span className="required-mark">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Unesite naziv jela"
                  disabled={isSubmitting}
                  {...register("name", {
                    required: "Naziv jela je obavezan",
                    minLength: {
                      value: 2,
                      message: "Naziv mora imati najmanje 2 karaktera",
                    },
                    maxLength: {
                      value: 100,
                      message: "Naziv moze imati najvise 100 karaktera",
                    },
                  })}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="price">
                  Cena <span className="required-mark">*</span>
                </label>
                <div className="owner-meal-form__price-input">
                  <input
                    id="price"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Unesite cenu"
                    disabled={isSubmitting}
                    {...register("price", {
                      required: "Cena je obavezna",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Cena mora biti veca od 0",
                      },
                      max: {
                        value: 100000,
                        message: "Cena moze biti najvise 100000",
                      },
                    })}
                  />
                  <span>RSD</span>
                </div>
                {errors.price && (
                  <span className="error-message">{errors.price.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="description">
                  Opis <span className="required-mark">*</span>
                </label>
                <textarea
                  id="description"
                  disabled={isSubmitting}
                  placeholder="Unesite opis jela"
                  {...register("description", {
                    required: "Opis jela je obavezan",
                    minLength: {
                      value: 2,
                      message: "Opis mora imati najmanje 2 karaktera",
                    },
                    maxLength: {
                      value: 500,
                      message: "Opis moze imati najvise 500 karaktera",
                    },
                  })}
                />
                {errors.description && (
                  <span className="error-message">
                    {errors.description.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label>Slika jela</label>
                <span className="field-hint">
                  Slika nije obavezna. Mozes je dodati sada ili kasnije.
                </span>

                <div
                  className={`file-upload ${
                    selectedPhoto ? "file-upload--selected" : ""
                  }`}
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

              <div className="form-group">
                <label>Alergeni</label>
                <span className="field-hint">
                  Oznaci alergene koje jelo sadrzi.
                </span>

                <div className="owner-meal-form__allergens">
                  {allergens.length === 0 ? (
                    <p>Nema dostupnih alergena.</p>
                  ) : (
                    allergens.map((allergen) => (
                      <label
                        className="owner-meal-form__allergen"
                        key={allergen.id}
                      >
                        <input
                          type="checkbox"
                          value={allergen.id}
                          disabled={isSubmitting}
                          {...register("allergenIds")}
                        />
                        <span>{allergen.name}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            </div>

            <aside className="owner-meal-form__preview">
              <span className="owner-meal-form__preview-label">
                Pregled u jelovniku
              </span>

              <div className="owner-meal-form__preview-image">
                {photoPreviewUrl ? (
                  <img src={photoPreviewUrl} alt="Pregled slike jela" />
                ) : (
                  <span>Slika jela</span>
                )}
              </div>

              <h5>{watchedName || "Naziv jela"}</h5>
              <strong>
                {watchedPrice && watchedPrice > 0
                  ? `${watchedPrice} RSD`
                  : "Cena"}
              </strong>

              <div className="owner-meal-form__preview-allergens">
                {selectedAllergens.length > 0 ? (
                  selectedAllergens.map((allergen) => (
                    <span key={allergen.id}>{allergen.name}</span>
                  ))
                ) : (
                  <span>Bez oznacenih alergena</span>
                )}
              </div>
            </aside>
          </div>

          <div className="owner-meal-form__actions">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Čuvanje..."
                : isEditMode
                  ? "Sačuvaj izmene"
                  : "Dodaj jelo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OwnerMealFormModal;
