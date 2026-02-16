import React, { useState } from 'react';
import '../styles/ProductModal.css';
import Button from './Button/Button'; 

// interface: fonctionnalité à TypeScript.Définir clairement ce que le composant parent doit fournir. 
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: { color: string; size: string }) => void;
  title: string;
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  if (!isOpen) return null;

  const handleValidation = () => {
    if (selectedColor && selectedSize) {
      onConfirm({ color: selectedColor, size: selectedSize });
      onClose(); 
    } else {
      alert("Veuillez choisir une couleur et une taille");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>Sélectionnez vos options :</p>

        {/* Section Couleurs */}
        <div className="option-group">
          <label>Couleur :</label>
          <div className="options">

            {/* Plus Tard :  Remplacer ["Doré", "Argenté", "Rose"] par le résultat de GET /product/variations:color */}
            {["Doré", "Argenté", "Rose"].map((color) => (
              <button 
                key={color}
                className={selectedColor === color ? "active" : ""}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Section Tailles */}
        <div className="option-group">
          <label>Taille :</label>
          <div className="options">

            {/* Plus Tard :  Remplacer ["S", "M", "L"] par le résultat de GET /product/variations:size */}
            {["S", "M", "L"].map((size) => (
              <button 
                key={size}
                className={selectedSize === size ? "active" : ""}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Utilisation le composant Button personnalisé  */}
        <div className="modal-actions">
          <Button 
            variant="secondary" 
            onClick={onClose}
          >
            Annuler
          </Button>
          
          <Button 
          // style de JC
            variant="primary" 
            onClick={handleValidation}
          >
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;