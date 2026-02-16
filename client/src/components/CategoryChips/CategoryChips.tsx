// =============================================================
// COMPOSANT CATEGORYCHIPS - Puces par categorie
// Affiche les categories sous forme de boutons arrondis (chips)
// Extrait de la page Accueil
// =============================================================

import React from "react";
import "./CategoryChips.css";

// Props du composant
interface CategoryChipsProps {
  categories: string[]; // tableau de noms de categories
  onCategoryClick: (category: string) => void; // fonction appelee au clic
}

function CategoryChips(props: CategoryChipsProps) {
  return (
    <section className="category-chips-section">
      <h2 className="category-chips-title">Acheter par categorie</h2>
      <div className="category-chips-list">
        {props.categories.map(function (category) {
          return (
            <button
              key={category}
              className="category-chip"
              onClick={function () {
                props.onCategoryClick(category);
              }}
            >
              {/* Remplacer les underscores par des espaces pour l'affichage */}
              {category.replace("_", " ")}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CategoryChips;
