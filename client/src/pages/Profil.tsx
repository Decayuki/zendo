// =============================================================
// PAGE PROFIL - Informations de l'utilisateur connecte
// Pour l'instant c'est un placeholder (page vide)
// Plus tard on affichera : infos perso, parametres, "Ouvrir ma boutique"
// =============================================================

import React from "react";
import "../styles/Pages.css";
import { Header } from "../components/Header/Header";

function Profil() {
  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">Mon profil</h1>
      <p className="page-placeholder">
        Bientot ici : informations personnelles, parametres, ouvrir ma
        boutique...
      </p>
    </div>
  );
}

export default Profil;
