import React, { useState, useEffect } from 'react';
import '../styles/ProductModal.css';
import Button from './Button/Button'; 

// interface: fonctionnalité à TypeScript.Définir clairement ce que le composant parent doit fournir. 
interface Variation {
  _id?: string;
  color?: string;
  size?: string;
  stock: number;
  price: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: { color: string; size: string }) => void;
  title: string;
  variations?: Variation[];
}

const ProductModal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, variations = [] }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Debug: vérifier si le modal devrait être ouvert
  useEffect(() => {
    console.log('ProductModal isOpen:', isOpen);
    console.log('ProductModal variations:', variations);
  }, [isOpen, variations]);

  // Réinitialiser les sélections quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setSelectedColor("");
      setSelectedSize("");
    }
  }, [isOpen]);

  // Filtrer les variations avec stock > 0
  const availableVariations = variations.filter((v) => v.stock > 0);

  // Extraire les couleurs uniques disponibles (avec stock > 0)
  const availableColors = Array.from(
    new Set(
      availableVariations
        .map((v) => v.color)
        .filter((color): color is string => Boolean(color))
    )
  );

  // Extraire les tailles uniques disponibles pour la couleur sélectionnée (avec stock > 0)
  const availableSizes = Array.from(
    new Set(
      availableVariations
        .filter((v) => !selectedColor || v.color === selectedColor)
        .map((v) => v.size)
        .filter((size): size is string => Boolean(size))
    )
  );

  // Réinitialiser la taille si la couleur change et que la taille actuelle n'est plus disponible
  useEffect(() => {
    if (selectedColor && !availableSizes.includes(selectedSize)) {
      setSelectedSize("");
    }
  }, [selectedColor, availableSizes, selectedSize]);

  // Ne pas rendre le modal s'il n'est pas ouvert
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
    <div 
      className="modal-overlay" 
      onClick={onClose}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'white',
          padding: '25px',
          borderRadius: '15px',
          width: '90%',
          maxWidth: '400px',
          textAlign: 'center'
        }}
      >
        <h2>{title}</h2>
        <p>Sélectionnez vos options :</p>

        {/* Section Couleurs */}
        <div className="option-group">
          <label>Couleur :</label>
          <div className="options">
            {availableColors.length > 0 ? (
              availableColors.map((color) => (
                <button 
                  key={color}
                  className={selectedColor === color ? "active" : ""}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))
            ) : (
              <p className="no-options">Aucune couleur disponible</p>
            )}
          </div>
        </div>

        {/* Section Tailles */}
        <div className="option-group">
          <label>Taille :</label>
          <div className="options">
            {availableSizes.length > 0 ? (
              availableSizes.map((size) => (
                <button 
                  key={size}
                  className={selectedSize === size ? "active" : ""}
                  onClick={() => setSelectedSize(size)}
                  disabled={!selectedColor}
                >
                  {size}
                </button>
              ))
            ) : (
              <p className="no-options">
                {selectedColor ? "Aucune taille disponible pour cette couleur" : "Sélectionnez d'abord une couleur"}
              </p>
            )}
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