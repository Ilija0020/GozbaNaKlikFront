import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { getHomeRouteByRole } from "../../../core/utils/roleUtils";
import UserContext from "../../../core/contexts/UserContext";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setUser } = useContext(UserContext);
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const loginData = {
        userName: data.username,
        password: data.password,
      };
      const token = await authService.login(loginData);

      localStorage.setItem("token", token);

      const payload = JSON.parse(atob(token.split(".")[1]));

      setUser(payload);

      const homeRoute = getHomeRouteByRole(payload.role);

      navigate(homeRoute);
    } catch (error) {
      setServerError(
        error.response?.data?.Message || "Došlo je do greške prilikom prijave.",
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Prijava</h2>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
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
              <span className="error-message">{errors.username.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Lozinka</label>
            <input
              id="password"
              type="password"
              disabled={isSubmitting}
              {...register("password", { required: "Lozinka je obavezna" })}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
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
            {isSubmitting ? "Učitavanje..." : "Prijavi se"}
          </button>
        </form>

        <div className="auth-links">
          Nemate nalog? <Link to="/register">Registrujte se ovde</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
