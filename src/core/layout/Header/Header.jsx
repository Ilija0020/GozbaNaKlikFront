import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__logo">
          Gozba<span>NaKlik</span>
        </Link>
        <nav className="header__nav">
          <Link to="/login" className="header__btn header__btn--login">Prijava</Link>
          <Link to="/register" className="header__btn header__btn--register">Registracija</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
