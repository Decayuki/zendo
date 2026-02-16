import React from 'react';
import CategoryMenu from '../components/CategoryMenu';
import SearchBar from '../components/SearchBar';
import '../styles/Search.css';

const Search: React.FC = () => {
  /**
   * ÉTAPE FUTURE BACKEND :
   * On passera les paramètres de recherche (query) et de catégorie (filter)
   * pour que la base de données ne renvoie que les bijoux correspondants.
   */

  return (
    <div className="search-page-container">
      {/* Barre de recherche en haut, centrée */}
      <header className="search-header">
        <SearchBar />
      </header>

      <div className="search-layout">
        {/* Colonne de Gauche : Le Menu des familles et catégories */}
        <aside className="search-sidebar">
          <CategoryMenu />
        </aside>

      </div>
    </div>
  );
};

export default Search;