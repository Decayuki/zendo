import React from 'react';
import SearchBar from '../components/SearchBar';
import Product from '../components/Product';
import '../styles/Home.css';
import ring from '../asset/Logo/Logo.png';

const dummyProducts = [
 
  {
    id: 2,
    title: "Bracelet Zen",
    price: 25.50,
    image: ring,
    description: "Un bracelet minimaliste pour accompagner vos tenues quotidiennes avec élégancevefgzfzffez"
  }
];



const Home: React.FC = () => {
  return (
   <div>
      {/* Code pour header */}
      {/* Intégration de la barre de recherche */}
      <section className="search-section">
        <SearchBar />
      </section>
     <main className="product-grid">
        {dummyProducts.map((item) => (
          <Product 
            key={item.id} // Obligatoire pour React
            id={item.id}
            title={item.title}
            price={item.price}
            image={item.image}
            description={item.description}
          />
        ))}
      </main>

    </div>
  );
};

export default Home; 

// const Home: React.FC = () => { ... }, on dit explicitement à TypeScript : "Cette variable est un composant fonctionnel React".