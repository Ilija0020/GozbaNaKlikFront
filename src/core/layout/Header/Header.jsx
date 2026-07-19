import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";
import Toast from "../toast/Toast";
import { getHomeRouteByRole } from "../../utils/roleUtils";
import UserContext from "../../contexts/UserContext";

const Header = () => {
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUser(payload);
      } catch (error) {
        console.error("Neispravan token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowToast(true);
    navigate("/login");

    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

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
              <Link to="/login" className="header__btn header__btn--login">
                Prijava
              </Link>
              <Link
                to="/register"
                className="header__btn header__btn--register"
              >
                Registracija
              </Link>
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
};

export default Header;
