// =============================================================
// COMPOSANT FAMILYCARDS - Boutons des familles (Femme, Homme...)
// Scroll horizontal sur mobile, extrait de la page Accueil
// =============================================================

import React from "react";
import "./FamilyCards.css";

// Props du composant
interface FamilyCardsProps {
  families: string[]; // tableau de noms de familles
  onFamilyClick: (family: string) => void; // fonction appelee au clic
}

function FamilyCards(props: FamilyCardsProps) {
  return (
    <section className="family-cards-section">
      <h2 className="family-cards-title">Categories</h2>
      <div className="family-cards-scroll">
        {props.families.map(function (family) {
          return (
            <button
              key={family}
              className="family-card"
              onClick={function () {
                props.onFamilyClick(family);
              }}
            >
              {family}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default FamilyCards;
