// =============================================================
// COMPOSANT SEARCHBAR - Barre de recherche reutilisable
/*  Il recoit trois "props" (parametres) du parent :
 - placeholder : texte grise dans la barre (optionnel)
 - onSearch : la fonction a appeler quand l'utilisateur lance une recherche
 - initialQuery : texte initial pour pre-remplir la barre (optionnel)
   Utile quand on arrive sur /search?q=boucles : la barre affiche "boucles"
*/

import React, { useState, useEffect } from "react";
import "../styles/SearchBar.css";

// Props = Param que le composant parent envoie a SearchBar
// (c'est comme les arguments d'une fonction)
interface SearchBarProps {
  placeholder?: string; // texte grise dans la barre (optionnel, "?" = pas obligatoire)
  onSearch: (query: string) => void; // fonction appelee quand on lance la recherche
  initialQuery?: string; // texte initial pour pre-remplir la barre (optionnel)
}

function SearchBar(props: SearchBarProps) {
  // State local : ce que l'utilisateur est en train de taper
  // On initialise avec initialQuery si elle existe, sinon chaine vide
  const [query, setQuery] = useState(props.initialQuery || "");

  /*  --- EFFET : SYNCHRONISER LE STATE AVEC initialQuery ---
   Si le parent change la prop initialQuery (par exemple quand l'URL change),
   on met a jour le state local pour que la barre affiche le bon texte.
   Sans ce useEffect, la barre garderait l'ancien texte meme si l'URL change.
   */
  useEffect(
    function () {
      // Si initialQuery est definie et differente du state actuel,
      // on met a jour le state
      if (props.initialQuery !== undefined) {
        setQuery(props.initialQuery);
      }
    },
    [props.initialQuery],
  );
  // ^ Se declenche quand props.initialQuery change

  // Quand l'utilisateur passe le formulaire
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Si la barre est vide, on ne fait rien
    if (!query.trim()) {
      return;
    }

    // Appeler la fonction du parent avec le texte tapé
    // C'est le parent qui decide quoi faire avec
    props.onSearch(query);
  }

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        type="text"
        className="searchbar-input"
        placeholder={
          props.placeholder || "Rechercher un produit, un artisan..."
        }
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
