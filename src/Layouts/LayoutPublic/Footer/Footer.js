import React from "react";
import { Link } from "react-router-dom";
import icons from "../../../assets/icons";
import "./Footer.scss";
const Footer = () => {
  const { youtube, twitter, facebook } = icons;
  return (
    <footer className="public-footer text-center">
      <hr />
      <address>
        <p>Gamezonia 2020 - Best price videogames!!</p>
        <p>
          Downhill street, 7 - Brno (Czechia) <br />
          tlf: 00420 123456789 / 00420 987654321 - Contact:
          juanjose@menacosta.website <br />
          <Link to="/contact" className="nav-link" alt="Link to contact">
            Contact us
          </Link>
        </p>
      </address>
      <ul className="nav justify-content-center social">
        <li>
          <a
            href="http://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {youtube}
          </a>
        </li>
        <li>
          <a
            href="http://www.facebook.com/juan.j.mena"
            target="_blank"
            rel="noopener noreferrer"
          >
            {facebook}
          </a>
        </li>
        <li>
          <a
            href="http://twitter.com/JuanJosMenaCost"
            target="_blank"
            rel="noopener noreferrer"
          >
            {twitter}
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
