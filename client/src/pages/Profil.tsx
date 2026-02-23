// =============================================================
// PAGE PROFIL - Informations de l'utilisateur connecte
// Pour l'instant c'est un placeholder (page vide)
// Plus tard on affichera : infos perso, parametres, "Ouvrir ma boutique"
// =============================================================

import React from "react";
import ProfileHeader from "../components/Profils/ProfileHeader";
import ProfileMenu from "../components/Profils/ProfileMenu";
import "../styles/Pages.css";


const Profil = () => {
  return (
    <div className="page-container">
      {/* Affichage de la partie haute (photo + nom) */}
      <ProfileHeader />

      {/* Partie menu de gestion */}
      <ProfileMenu />

      {/* Tu pourras ajouter ici la suite : menu, historique, déconnexion */}
      <div>
        {/* Exemple futur : 
           <button>Mes commandes</button>
           <button>Paramètres</button>
        */}
      </div>
    </div>
  );
};

export default Profil;