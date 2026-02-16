import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {Home, Search, Favorite, Person, Storefront} from "@mui/icons-material";
import "../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();

  // Ta logique de couleur (inchangée)
  const getIconColor = (path: string) => {
    return location.pathname === path ? "#eed7b8" : "#e5e5e5";
  };

  return (
    <nav className="navbar-container">
      {/* SECTION CENTRALE (Navigation) */}
      <div className="nav-links-center">
        <Link to="/home">
          <Home sx={{ color: getIconColor("/home"), fontSize: 22 }} />
        </Link>
        <Link to="/recherche">
          <Search sx={{ color: getIconColor("/recherche"), fontSize: 22 }} />
        </Link>

        <Link to="/favoris">
          <Favorite sx={{ color: getIconColor("/favoris"), fontSize: 22 }} />
        </Link>
          <Link to="/profil">
          <Person sx={{ color: getIconColor("/profil"), fontSize: 22 }} />
        </Link>
        <Link to="/boutique">
          <Storefront sx={{ color: getIconColor("/boutique"), fontSize: 22 }} />
        </Link>
      </div>


    </nav>
  );
};

export default Navbar;