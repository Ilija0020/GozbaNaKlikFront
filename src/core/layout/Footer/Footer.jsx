import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss"; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          Gozba<span>NaKlik</span>
        </div>

        <div className="footer__links">
          <Link to="/">O nama</Link>
          <Link to="/">Kontakt</Link>
          <Link to="/">Uslovi korišćenja</Link>
        </div>
      </div>
      
      <div className="footer__copy">
        &copy; {new Date().getFullYear()} Gozba Na Klik. Sva prava zadržana.
      </div>
    </footer>
  );
};

export default Footer;