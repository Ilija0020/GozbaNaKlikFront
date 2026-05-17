import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setServerError("");
      const user = await authService.login(data.username, data.password);
      
      const userDataToSave = {
        id: user.id,
        username: user.username,
        role: user.role,
        name: user.name,
        surname: user.surname
      };

      localStorage.setItem("user", JSON.stringify(userDataToSave));
      console.log("Uspesna prijava! Sačuvan korisnik:", userDataToSave);
      
      navigate("/");
    } catch (error) {
      setServerError(error.response?.data || "Došlo je do greške prilikom prijave.");
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
              {...register("username", { required: "Korisničko ime je obavezno" })} 
            />
            {errors.username && <span className="error-message">{errors.username.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Lozinka</label>
            <input 
              id="password" 
              type="password" 
              disabled={isSubmitting}
              {...register("password", { required: "Lozinka je obavezna" })} 
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>

          {serverError && <div className="error-message" style={{textAlign: "center", marginTop: "10px"}}>{serverError}</div>}

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