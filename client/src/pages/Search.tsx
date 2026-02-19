// =============================================================
// PAGE RECHERCHE - Barre de recherche + menu categories (sidebar)
// Layout : sidebar gauche (CategoryMenu) + zone de resultats a droite
// Utilise le composant reutilisable SearchBar + CategoryMenu
// =============================================================

import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryMenu from "../components/CategoryMenu/CategoryMenu";
import "../styles/Search.css";

function Search() {
  // --- STATES ---

  // Le texte qui a ete recherche (pour afficher "Aucun resultat pour ...")
  const [searchedQuery, setSearchedQuery] = useState("");

  // Resultats de la recherche (pour l'instant vide, sera rempli par l'API plus tard)
  const [results, setResults] = useState<any[]>([]);

  // Indique si une recherche a ete lancee
  const [hasSearched, setHasSearched] = useState(false);

  // --- FONCTION APPELEE PAR LE COMPOSANT SEARCHBAR ---
  // Quand l'utilisateur clique "Rechercher" dans la SearchBar,
  // le composant appelle cette fonction avec le texte tape
  function handleSearch(query: string) {
    // Sauvegarder le texte recherche
    setSearchedQuery(query);

    // Marquer qu'une recherche a ete faite
    setHasSearched(true);

    // TODO: plus tard, appeler le backend pour chercher les produits
    // Exemple futur :
    // api.get("/products/search?q=" + query).then(function(response) {
    //   setResults(response.data.products);
    // });

    // Pour l'instant, on simule avec un tableau vide
    setResults([]);
  }

  // --- AFFICHAGE ---
  return (
    <div className="search-page-container">
      {/* Barre de recherche en haut */}
      <header className="search-header">
        <SearchBar onSearch={handleSearch} />
      </header>

      {/* Layout : sidebar + resultats */}
      <div className="search-layout">
        {/* Colonne gauche : menu des familles et categories */}
        <aside className="search-sidebar">
          <CategoryMenu />
        </aside>

        {/* Colonne droite : resultats de recherche */}
        <div className="search-results">
          {/* Si une recherche a ete faite mais aucun resultat */}
          {hasSearched && results.length === 0 && (
            <p className="search-empty">
              Aucun resultat pour "{searchedQuery}"
            </p>
          )}

          {/* Si il y a des resultats, on les affiche */}
          {results.map(function (product, index) {
            return (
              <div key={index} className="search-card">
                <h3 className="search-card-title">{product.name}</h3>
                <p className="search-card-price">{product.price} EUR</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Search;
