// =============================================================
// PAGE PROFIL - Informations de l'utilisateur connecte
// Pour l'instant c'est un placeholder (page vide)
// Plus tard on affichera : infos perso, parametres, "Ouvrir ma boutique"
// =============================================================

import React from "react";
import ProfileHeader from "../components/Profils/ProfileHeader";


const Profil = () => {
  return (
    <div className="profile-page-container">
      {/* Affichage de la partie haute (photo + nom) */}
      <ProfileHeader />

      {/* Tu pourras ajouter ici la suite : menu, historique, déconnexion */}
      <div className="profile-options-list">
        {/* Exemple futur : 
           <button>Mes commandes</button>
           <button>Paramètres</button>
        */}
      </div>
    </div>
  );
};

export default Profil;