import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { fromSlug } from '../utils/formatUrl';
import Product from '../components/ProductView';
import '../styles/ProductList.css';
import product from '../asset/Logo/Product.png';

// Liste des enums pour la conversion
const FAMILIES = ["Femme", "Homme", "Garcon", "Fille", "Bebe_fille", "Bebe_garcon", "Jouet", "Maison"];
const CATEGORIES = ["Vetements", "Bijoux", "Chaussures", "Sacs", "Accessoires", "Sport", "Beaute", "Luminaire", "Tapis", "Decoration", "Art_de_la_table"];

// --- SIMULATION DE DONNÉES (MOCK DATA) ---
const mockProducts = [
  { id: 1, title: "Bracelet Or", price: 89.00, image: product, description: "Bracelet en or 18 carats ciselé à la main.", family: "Homme", category: "Vetements" },
  { id: 2, title: "Robe de Soirée", price: 120.00, image: product, description: "Robe longue élégante pour vos événements.", family: "Femme", category: "Vetements" },
  { id: 3, title: "Bracelet Or", price: 89.00, image: product, description: "Bracelet en or 18 carats ciselé à la main.", family: "Femme", category: "Vetements" },
];

const ProductList: React.FC = () => {
  const { family: familySlug, category: categorySlug } = useParams();
  const [products, setProducts] = useState(mockProducts); // On commence avec les mock data
  const [loading, setLoading] = useState(false);

  const dbFamily = familySlug ? fromSlug(familySlug, FAMILIES) : null;
  const dbCategory = categorySlug ? fromSlug(categorySlug, CATEGORIES) : null;

  useEffect(() => {
    const getProducts = async () => {
      // 🚀 Décommenter cette partie quand le backend sera prêt
      /*
      setLoading(true);
      try {
        const response = await api.get('/products', {
          params: { family: dbFamily, category: dbCategory }
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Erreur API", err);
      } finally {
        setLoading(false);
      }
      */
      
      // Simulation locale : on filtre nos mockProducts selon l'URL
      const filtered = mockProducts.filter(p => {
        const matchFamily = dbFamily ? p.family === dbFamily : true;
        const matchCategory = dbCategory ? p.category === dbCategory : true;
        return matchFamily && matchCategory;
      });
      setProducts(filtered);
    };

    getProducts();
  }, [dbFamily, dbCategory]);

  return (
    <div className="product-list-page">
      <header className="list-header">
        <h1 className="list-title">
          {dbFamily} {dbCategory ? `> ${dbCategory.replace('_', ' ')}` : ''}
        </h1>
        <p className="product-count">{products.length} produits trouvés</p>
      </header>
      
      <main className="product-grid-container">
        {loading ? (
          <div className="loader">Chargement des produits...</div>
        ) : (
          <div className="product-grid">
            {products.map((p: any) => (
              <Product 
                key={p.id} 
                id={p.id} 
                title={p.title} 
                price={p.price} 
                image={p.image} 
                description={p.description} 
              />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="no-results">
            Aïe ! Aucun produit ne correspond à cette catégorie pour le moment.
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductList;