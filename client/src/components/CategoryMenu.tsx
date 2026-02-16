import React, { useState } from 'react';
import { KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import '../styles/CategoryMenu.css';

// --- Configuration des noms d'affichage ---
// On crée un dictionnaire pour transformer les enums de la base de données 
// en texte propre pour l'utilisateur (Français, Majuscules, sans _)
const FAMILY_LABELS: Record<string, string> = {
  Femme: "Femme",
  Homme: "Homme",
  Garcon: "Garçon",
  Fille: "Fille",
  Bebe_fille: "Bébé Fille",
  Bebe_garcon: "Bébé Garçon",
  Jouet: "Jouets",
  Maison: "Maison",
};

const CATEGORY_LABELS: Record<string, string> = {
  Vetements: "Vêtements",
  Bijoux: "Bijoux",
  Chaussures: "Chaussures",
  Sacs: "Sacs",
  Accessoires: "Accessoires",
  Sport: "Sport",
  Beaute: "Beauté",
  Luminaire: "Luminaire",
  Tapis: "Tapis",
  Decoration: "Décoration",
  Art_de_la_table: "Art de la table",
};

const CategoryMenu: React.FC = () => {
  // État pour savoir quelle famille est actuellement ouverte (null = tout fermé)
  const [openFamily, setOpenFamily] = useState<string | null>(null);

  /**
   * ÉTAPE FUTURE BACKEND (Filtrage) :
   * Actuellement, nous affichons toutes les catégories.
   * Plus tard, il faudra faire un appel API (ex: GET /categories/count) 
   * qui renvoie uniquement les catégories contenant au moins 1 produit actif.
   * On stockera ce résultat dans un useEffect.
   */
  const categories = Object.keys(CATEGORY_LABELS);
  const families = Object.keys(FAMILY_LABELS);

  const toggleFamily = (family: string) => {
    setOpenFamily(openFamily === family ? null : family);
  };

  return (
    <nav className="category-menu">
      <ul className="family-list">
        {families.map((family) => (
          <li key={family} className="family-item">
            {/* L'en-tête de la famille (ex: Femme) */}
            <div 
              className={`family-header ${openFamily === family ? 'active' : ''}`}
              onClick={() => toggleFamily(family)}
            >
              <span className="family-name">{FAMILY_LABELS[family]}</span>
              {openFamily === family ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
            </div>

            {/* Liste des catégories (dépliante) */}
            {openFamily === family && (
              <ul className="category-list">
                {categories.map((cat) => (
                  <li key={cat} className="category-item">
                    {/* ÉTAPE FUTURE BACKEND :
                        Ajouter un lien <Link to={`/boutique/${family}/${cat}`}>
                        pour filtrer les produits au clic.
                    */}
                    {CATEGORY_LABELS[cat]}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;