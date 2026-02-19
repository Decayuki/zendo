import React, { useState, useEffect } from "react";
import { FavoriteBorder, Favorite, AddShoppingCart } from "@mui/icons-material";
import "../styles/ProductView.css";
import ProductModal from "./ProductModal";

// Définition de la structure des données du produit (TypeScript)
interface Variation {
  _id?: string;
  color?: string;
  size?: string;
  stock: number;
  price: number;
}

interface ProductProps {
  id: string | number;
  title: string;
  price: number;
  image: string;
  description: string;
  variations?: Variation[];
}

const Product: React.FC<ProductProps> = ({
  title,
  price,
  image,
  description,
  variations = [],
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Debug: vérifier l'état du modal
  useEffect(() => {
    console.log('ProductView - isModalOpen:', isModalOpen);
    console.log('ProductView - variations:', variations);
  }, [isModalOpen, variations]);

  // Fonction pour limiter la description à 100 caractères maximum (97 caractères + "..." = 100)
  const truncateDescription = (text: string) => {
    if (!text) return "";
    return text.length > 50 ? text.substring(0, 47) + "..." : text;
  };
  // Fonction appelée depuis Modal quand l'user valide ses choix
  const handleAddToCart = (selection: { color: string; size: string }) => {
    console.log(
      `Produit ajouté : ${title}, Couleur: ${selection.color}, Taille: ${selection.size}`,
    );
    // Plus tard : ici on enverra l'ID du produit et ses variantes au backend.
  };

  return (
    <div className="product-card">
      {/* Image du produit */}
      <img src={image} alt={title} className="product-image" />

      <div className="product-info">
        {/* Première ligne : Titre et Icônes */}
        <div className="product-header">
          <h3 className="product-title">{title}</h3>
          <div className="product-actions">
            {/* Toggle Favoris */}
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="icon-btn"
            >
              {isFavorite ? (
                <Favorite sx={{ color: "#eed7b8" }} />
              ) : (
                <FavoriteBorder />
              )}
            </button>

            {/* Ouvre la Modal pour sélectionner les variantes avant l'achat */}
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Clic sur panier, ouverture modal');
                setIsModalOpen(true);
              }} 
              className="icon-btn"
              type="button"
            >
              <AddShoppingCart />
            </button>
          </div>
        </div>

        {/* Deuxième ligne : Prix */}
        <p className="product-price">{price.toFixed(2)} €</p>

        {/* Troisième ligne : Description limitée */}
        <p className="product-description">
          {truncateDescription(description)}
        </p>
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleAddToCart}
          title={title}
          variations={variations}
        />
      </div>
    </div>
  );
};

export default Product;
