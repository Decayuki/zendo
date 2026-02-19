// =============================================================
// COMPOSANT SEARCHBAR - Barre de recherche reutilisable
// Ce composant peut etre appele depuis n'importe quelle page :
// la page Recherche, la page Accueil, un header, etc.
//
// Il recoit deux "props" (parametres) du parent :
// - value : le texte actuellement tape dans la barre
// - onSearch : la fonction a appeler quand l'utilisateur lance une recherche
// =============================================================

import React, { useState } from "react";
import "../styles/SearchBar.css";

// Les props = les parametres que le composant parent envoie a SearchBar
// C'est comme les arguments d'une fonction
interface SearchBarProps {
  placeholder?: string; // texte grise dans la barre (optionnel, "?" = pas obligatoire)
  onSearch: (query: string) => void; // fonction appelee quand on lance la recherche
}

function SearchBar(props: SearchBarProps) {
  // State local : ce que l'utilisateur est en train de taper
  const [query, setQuery] = useState("");

  // Quand l'utilisateur soumet le formulaire (clic ou Entree)
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Si la barre est vide, on ne fait rien
    if (!query.trim()) {
      return;
    }

    // Appeler la fonction du parent avec le texte tape
    // C'est le parent qui decide quoi faire avec (appel API, filtre local, etc.)
    props.onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        type="text"
        className="searchbar-input"
        placeholder={props.placeholder || "Rechercher un produit, un artisan..."}
        value={query}
        onChange={function (e) {
          setQuery(e.target.value);
        }}
      />
      <button type="submit" className="searchbar-button">
        Rechercher
      </button>
    </form>
  );
}

export default SearchBar;
