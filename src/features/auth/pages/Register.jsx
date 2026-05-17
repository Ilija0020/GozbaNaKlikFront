import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

const Register = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
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
        username: data.username,
        password: data.password
      };
      
      await authService.register(dataForBackend);
      
      console.log("Uspesna registracija!");
      reset(); 
      
      navigate("/login");
    } catch (error) {
      setServerError(error.response?.data || "Došlo je do greške prilikom registracije.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card auth-card--wide">
        <h2>Registracija</h2>
        
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
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="surname">Prezime</label>
                <input 
                  id="surname" 
                  type="text" 
                  disabled={isSubmitting}
                  {...register("surname", { required: "Prezime je obavezno" })} 
                />
                {errors.surname && <span className="error-message">{errors.surname.message}</span>}
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
                      message: "Unesite validan email format"
                    }
                  })} 
                />
                {errors.email && <span className="error-message">{errors.email.message}</span>}
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
                  {...register("password", { 
                    required: "Lozinka je obavezna",
                    minLength: {
                      value: 6,
                      message: "Lozinka mora imati najmanje 6 karaktera"
                    }
                  })} 
                />
                {errors.password && <span className="error-message">{errors.password.message}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Potvrdite lozinku</label>
                <input 
                  id="confirmPassword" 
                  type="password" 
                  disabled={isSubmitting}
                  {...register("confirmPassword", { 
                    required: "Potvrda lozinke je obavezna"
                  })} 
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
              </div>
            </div>
          </div>

          {serverError && <div className="error-message" style={{textAlign: "center", marginTop: "10px"}}>{serverError}</div>}

          <button type="submit" className="btn-submit" disabled={isSubmitting}>
            {isSubmitting ? "Učitavanje..." : "Registruj se"}
          </button>
        </form>

        <div className="auth-links">
          Već imate nalog? <Link to="/login">Prijavite se</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;