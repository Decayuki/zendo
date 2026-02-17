import React from 'react';
import SearchBar from '../components/SearchBar';
import Product from '../components/ProductView';
import '../styles/Home.css';




const Home: React.FC = () => {
  return (
   <div>
      {/* Code pour header */}
      {/* Intégration de la barre de recherche */}
      <section className="search-section">
        <SearchBar />
      </section>

    </div>
  );
};

export default Home; 

// const Home: React.FC = () => { ... }, on dit explicitement à TypeScript : "Cette variable est un composant fonctionnel React".