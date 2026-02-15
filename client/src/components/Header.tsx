import React from "react";
import "../styles/Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCartShopping,
  faCompass,
  faNavicon,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="header">
      <div className="header-menu">
        <Link to="/menu">
          <FontAwesomeIcon icon={faNavicon} size="lg" color="#ffffff" />
        </Link>
      </div>
      <div className="header-logo">
        <FontAwesomeIcon icon={faCompass} size="lg" color="#ffffff" />
        <Link to="/homepage" className="link">
          <h1 className="header-title">Zendo</h1>
        </Link>
      </div>
      <div className="header-cart">
        <Link to="/notifications">
          <FontAwesomeIcon icon={faBell} size="lg" color="#ffffff" />
        </Link>
        <Link to="/cart">
          <FontAwesomeIcon icon={faCartShopping} size="lg" color="#ffffff" />
        </Link>
      </div>
    </header>
  );
}
