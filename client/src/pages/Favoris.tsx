// =============================================================
// PAGE FAVORIS - Liste des produits ajoutes en favoris
// Pour l'instant c'est un placeholder (page vide)
// Plus tard on affichera les produits sauvegardes par l'utilisateur
// =============================================================

import React from "react";
import "../styles/Pages.css";
import { Header } from "../components/Header/Header";

function Favoris() {
  return (
    <div className="page-container">
      <Header />
      <h1 className="page-title">Mes favoris</h1>
      <p className="page-placeholder">Vous n'avez pas encore de favoris.</p>
    </div>
  );
}

export default Favoris;
