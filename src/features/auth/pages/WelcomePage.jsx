import React from "react";
import { Link } from "react-router-dom";
import "./WelcomePage.scss";

const WelcomePage = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <span className="hero__badge">Gladan si?</span>
        <h1 className="hero__title">
          Uzmi pauzu od kuvanja, <br/>ugrabi <span>brz zalogaj</span>.
        </h1>
        <p className="hero__subtitle">
          Gozba na klik ti donosi širok izbor restorana i kuhinja direktno na tvoj prag uz samo par klikova.
        </p>
        <div className="hero__actions">
          <Link to="/login" className="hero__btn hero__btn--primary">Prijavi se</Link>
          <Link to="/register" className="hero__btn hero__btn--secondary">Kreiraj nalog</Link>
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
