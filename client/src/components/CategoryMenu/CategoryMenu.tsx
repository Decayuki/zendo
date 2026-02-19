// =============================================================
// COMPOSANT CATEGORY MENU - Menu depliable famille > categories
// Utilisé dans la page Recherche (sidebar gauche)
// Chaque famille (Femme, Homme...) se deplie pour montrer les categories
// Les liens menent vers les pages de listing par famille/categorie
// =============================================================

import React, { useState } from "react";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { toSlug } from "../../utils/formatUrl";
import "./CategoryMenu.css";

// Dictionnaire pour afficher les noms propres (avec accents)
// Les cles sont les valeurs stockees en BDD, les valeurs sont ce qu'on affiche
const FAMILY_LABELS: Record<string, string> = {
  Femme: "Femme",
  Homme: "Homme",
  Garcon: "Garcon",
  Fille: "Fille",
  Bebe_fille: "Bebe Fille",
  Bebe_garcon: "Bebe Garcon",
  Jouet: "Jouets",
  Maison: "Maison",
};

const CATEGORY_LABELS: Record<string, string> = {
  Vetements: "Vetements",
  Bijoux: "Bijoux",
  Chaussures: "Chaussures",
  Sacs: "Sacs",
  Accessoires: "Accessoires",
  Sport: "Sport",
  Beaute: "Beaute",
  Luminaire: "Luminaire",
  Tapis: "Tapis",
  Decoration: "Decoration",
  Art_de_la_table: "Art de la table",
};

function CategoryMenu() {
  // Quelle famille est ouverte (null = tout ferme)
  const [openFamily, setOpenFamily] = useState<string | null>(null);

  const families = Object.keys(FAMILY_LABELS);
  const categories = Object.keys(CATEGORY_LABELS);

  // Ouvrir/fermer une famille
  function toggleFamily(family: string) {
    if (openFamily === family) {
      setOpenFamily(null);
    } else {
      setOpenFamily(family);
    }
  }

  return (
    <nav className="category-menu">
      <ul className="family-list">
        {families.map(function (family) {
          return (
            <li key={family} className="family-item">
              {/* En-tete de la famille (cliquable pour deplier) */}
              <div
                className={
                  "family-header" + (openFamily === family ? " active" : "")
                }
                onClick={function () {
                  toggleFamily(family);
                }}
              >
                <span className="family-name">{FAMILY_LABELS[family]}</span>
                {openFamily === family ? (
                  <KeyboardArrowDown />
                ) : (
                  <KeyboardArrowRight />
                )}
              </div>

              {/* Liste des categories (visible seulement si la famille est ouverte) */}
              {openFamily === family && (
                <ul className="category-list">
                  {/* Option "Voir tout" pour la famille entiere */}
                  <li className="category-item">
                    <NavLink
                      to={"/" + toSlug(family)}
                      className={function (navData) {
                        return navData.isActive ? "active-link" : "";
                      }}
                      end
                    >
                      Voir tout
                    </NavLink>
                  </li>

                  {/* Les categories de cette famille */}
                  {categories.map(function (cat) {
                    return (
                      <li key={cat} className="category-item">
                        <NavLink
                          to={"/" + toSlug(family) + "/" + toSlug(cat)}
                          className={function (navData) {
                            return navData.isActive ? "active-link" : "";
                          }}
                        >
                          {CATEGORY_LABELS[cat]}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default CategoryMenu;
