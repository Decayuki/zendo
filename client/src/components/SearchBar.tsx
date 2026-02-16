import React, { useState } from 'react';
import { Search } from '@mui/icons-material';
import '../styles/SearchBar.css';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, on peut mettre futur algorithme de recherche
    console.log("Recherche lancée pour :", query);
  };

  return (
    <div className="search-container">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Rechercher un produit, une marque..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <Search sx={{ color: "#3b4553", fontSize: 18 }} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;

// e.nom de la variable qui contien l'objet 'événement' généré par le navigateur au moment où on valide le formulaire
// : React.FremEvent : En TypeScript, préciser que c'est un FromEvent, TypeScript sait que cest événement vient d'un formulaire
// e.preventDefault() : Pour qu'on ne perdra pas l'état après le recharge. Le comportement par défaut d'un formulaire : Quand on clique sur "Envoyer" ou que tu tapes "Entrée", le navigateur prend toutes les données du formulaire, les met dans l'URL, et recharge toute la page. 
