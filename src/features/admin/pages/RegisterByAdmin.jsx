import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authService } from "../../auth/services/authService";
import DashboardLayout from "../../../core/layout/DashboardLayout/DashboardLayout";
import "./RegisterByAdmin.scss";

const RegisterByAdmin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setServerError("");

      if (data.password !== data.confirmPassword) {
        setServerError("Lozinke se ne poklapaju!");
        return;
      }

      const dataForBackend = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        userName: data.username,
        password: data.password,
        role: data.role,
      };

      await authService.registerByAdmin(dataForBackend);

      reset();

      navigate("/admin/users");
    } catch (error) {
      const responseData = error.response?.data;

      const errorMessage =
        typeof responseData === "string"
          ? responseData
          : responseData?.Message ||
            responseData?.message ||
            "Doslo je do greske prilikom registracije.";

      setServerError(errorMessage);
    }
  };

  return (
    <DashboardLayout
      roleTitle="Sistemski Admin"
      welcomeMessage="Kreirajte nove naloge za vlasnike restorana i kurire."
    >
      <div className="admin-register-form">
        <h2>Registracija novog korisnika</h2>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="auth-form-row">
            {/* LEVA KOLONA: Lični podaci */}
            <div className="auth-form-column">
              <div className="form-group">
                <label htmlFor="name">Ime</label>
                <input
                  id="name"
                  type="text"
                  disabled={isSubmitting}
                  {...register("name", { required: "Ime je obavezno" })}
                />
                {errors.name && (
                  <span className="error-message">{errors.name.message}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="surname">Prezime</label>
                <input
                  id="surname"
                  type="text"
                  disabled={isSubmitting}
                  {...register("surname", { required: "Prezime je obavezno" })}
                />
                {errors.surname && (
                  <span className="error-message">
                    {errors.surname.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  disabled={isSubmitting}
                  {...register("email", {
                    required: "Email je obavezan",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Unesite validan email format",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-message">{errors.email.message}</span>
                )}
              </div>
            </div>

            {/* DESNA KOLONA: Podaci o nalogu */}
            <div className="auth-form-column">
              <div className="form-group">
                <label htmlFor="username">Korisničko ime</label>
                <input
                  id="username"
                  type="text"
                  disabled={isSubmitting}
                  {...register("username", {
                    required: "Korisničko ime je obavezno",
                  })}
                />
                {errors.username && (
                  <span className="error-message">
                    {errors.username.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Lozinka</label>
                <input
                  id="password"
                  type="password"
                  disabled={isSubmitting}
                  {...register("password", {
                    required: "Lozinka je obavezna",
                    minLength: {
                      value: 6,
                      message: "Lozinka mora imati najmanje 6 karaktera",
                    },
                  })}
                />
                {errors.password && (
                  <span className="error-message">
                    {errors.password.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Potvrdite lozinku</label>
                <input
                  id="confirmPassword"
                  type="password"
                  disabled={isSubmitting}
                  {...register("confirmPassword", {
                    required: "Potvrda lozinke je obavezna",
                  })}
                />
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="auth-form-centered">
            <div className="form-group">
              <label htmlFor="role">Uloga</label>
              <select
                id="role"
                disabled={isSubmitting}
                {...register("role", { required: "Uloga je obavezna" })}
              >
                <option value="">Izaberite ulogu...</option>
                <option value="Owner">Vlasnik restorana</option>
                <option value="Courier">Kurir</option>
              </select>
              {errors.role && (
                <span className="error-message">{errors.role.message}</span>
              )}
            </div>
          </div>

          {serverError && (
            <div
              className="error-message"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              {serverError}
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "Učitavanje..." : "Registruj korisnika"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default RegisterByAdmin;
