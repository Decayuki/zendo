// =============================================================
// COMPOSANT CATEGORY MENU - Menu depliable famille > categories

/*    Utilise dans la page Recherche (sidebar gauche)
 Chaque famille (Femme, Homme...) se deplie pour montrer les categories

 DEUX MODES DE FONCTIONNEMENT :
 1. Mode "navigation" (sans props) : les liens menent vers /femme/bijoux (NavLink)
 2. Mode "filtre" (avec onSelect) : les clics mettent a jour les query params
    de la page parente (Search), ce qui declenche un fetch sans changer de page

 Le mode filtre est utilise dans la page Search : quand on clique sur
 "Femme > Bijoux", ca change l'URL en /recherche?family=Femme&category=Bijoux
 au lieu de naviguer vers /femme/bijoux
 =============================================================
 */

import React, { useState, useEffect } from "react";
import { KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { toSlug } from "../../utils/formatUrl";
import "./CategoryMenu.css";

// Dico pour afficher les noms propres
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

// --- PROPS ---
// Si onSelect est fourni, le menu fonctionne en mode "filtre" (pas de navigation)
// activeFamily et activeCategory permettent de mettre en surbrillance la selection
interface CategoryMenuProps {
  onSelect?: (family: string, category?: string) => void;
  activeFamily?: string;
  activeCategory?: string;
}

function CategoryMenu(props: CategoryMenuProps) {
  // Quelle famille est ouverte (depliee) dans le menu
  // Si activeFamily est fourni par le parent, on l'utilise comme valeur initiale
  const [openFamily, setOpenFamily] = useState<string | null>(
    props.activeFamily || null,
  );

  // --- EFFET : SYNCHRONISER L'OUVERTURE AVEC LE PARENT ---
  // Si le parent change activeFamily (par exemple via les query params),
  // on deplie automatiquement la bonne famille dans le menu
  useEffect(
    function () {
      if (props.activeFamily) {
        setOpenFamily(props.activeFamily);
      }
    },
    [props.activeFamily],
  );

  const families = Object.keys(FAMILY_LABELS);
  const categories = Object.keys(CATEGORY_LABELS);

  // Ouvrir/fermer une famille dans le menu
  function toggleFamily(family: string) {
    if (openFamily === family) {
      setOpenFamily(null);
    } else {
      setOpenFamily(family);
    }
  }

  // --- GESTION DU CLIC SUR "VOIR TOUT" (une famille entiere) ---
  function handleFamilyClick(family: string) {
    // Mode filtre : on appelle la fonction du parent
    if (props.onSelect) {
      props.onSelect(family);
    }
  }

  // --- GESTION DU CLIC SUR UNE CATEGORIE ---
  function handleCategoryClick(family: string, category: string) {
    // Mode filtre : on appelle la fonction du parent
    if (props.onSelect) {
      props.onSelect(family, category);
    }
  }

  return (
    <nav className="category-menu">
      <ul className="family-list">
        {families.map(function (family) {
          // Est-ce que cette famille est celle active (selectionnée par le parent) ?
          const isFamilyActive = props.activeFamily === family;

          return (
            <li key={family} className="family-item">
              {/* En-tete de la famille  */}
              <div
                className={
                  "family-header" +
                  (openFamily === family ? " open" : "") +
                  (isFamilyActive ? " active" : "")
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
                    {props.onSelect ? (
                      // Mode filtre : bouton qui appelle onSelect
                      <button
                        className={
                          "category-button" +
                          (isFamilyActive && !props.activeCategory
                            ? " active-link"
                            : "")
                        }
                        onClick={function () {
                          handleFamilyClick(family);
                        }}
                      >
                        Voir tout
                      </button>
                    ) : (
                      // Mode navigation : un lien classique
                      <NavLink
                        to={"/" + toSlug(family)}
                        className={function (navData) {
                          return navData.isActive ? "active-link" : "";
                        }}
                        end
                      >
                        Voir tout
                      </NavLink>
                    )}
                  </li>

                  {/* Les categories de cette famille */}
                  {categories.map(function (cat) {
                    // Est-ce que cette categorie est celle active ?
                    const isCatActive =
                      isFamilyActive && props.activeCategory === cat;

                    return (
                      <li key={cat} className="category-item">
                        {props.onSelect ? (
                          // Mode filtre
                          <button
                            className={
                              "category-button" +
                              (isCatActive ? " active-link" : "")
                            }
                            onClick={function () {
                              handleCategoryClick(family, cat);
                            }}
                          >
                            {CATEGORY_LABELS[cat]}
                          </button>
                        ) : (
                          // Mode navigation
                          <NavLink
                            to={"/" + toSlug(family) + "/" + toSlug(cat)}
                            className={function (navData) {
                              return navData.isActive ? "active-link" : "";
                            }}
                          >
                            {CATEGORY_LABELS[cat]}
                          </NavLink>
                        )}
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
