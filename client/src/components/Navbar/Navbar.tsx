// =============================================================
// COMPOSANT NAVBAR
// =============================================================

import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/accueil" className="navbar-item">
        Accueil
      </NavLink>

      <NavLink to="/recherche" className="navbar-item">
        Recherche
      </NavLink>

      <NavLink to="/favoris" className="navbar-item">
        Favoris
      </NavLink>

      <NavLink to="/profil" className="navbar-item">
        Profil
      </NavLink>
    </nav>
  );
}

export default Navbar;
