import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import { useState } from "react";
import Toast from "../toast/Toast";
import { getHomeRouteByRole } from "../../utils/roleUtils";

const Header = () => {

  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setShowToast(true);
    navigate("/login");

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  }

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Gozba<span>NaKlik</span>
        </Link>
        <nav className="header__nav">
          {user ? (
  <>
          <Link
            to={getHomeRouteByRole(user.role)}
            className="header__btn header__btn--login"
          >
            Početna
          </Link>
              <button
                onClick={handleLogout}
                className="header__btn header__btn--register"
              >
                Odjavi se
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header__btn header__btn--login">Prijava</Link>
              <Link to="/register" className="header__btn header__btn--register">Registracija</Link>
            </>
          )}
        </nav>
      </div>
      {showToast && (
        <Toast 
          type="success"
          message="Uspešno ste se odjavili"
          onClose={() => setShowToast(false)}
        />
      )}
    </header>
  );
}

export default Header;
