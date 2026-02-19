// =============================================================
// COMPOSANT PRODUCT MODAL - Selection couleur/taille avant ajout panier
// S'ouvre quand on clique sur l'icone panier dans ProductView
// L'utilisateur choisit couleur + taille puis valide
// Plus tard les options viendront du backend (GET /product/variations)
// =============================================================

import React, { useState } from "react";
import Button from "../Button/Button";
import "./ProductModal.css";

// Les props que le composant parent doit fournir
interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (selection: { color: string; size: string }) => void;
  title: string;
}

function ProductModal(props: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  // Si la modal est fermee, on n'affiche rien
  if (!props.isOpen) {
    return null;
  }

  // Quand l'utilisateur valide ses choix
  function handleValidation() {
    if (selectedColor && selectedSize) {
      props.onConfirm({ color: selectedColor, size: selectedSize });
      props.onClose();
    } else {
      alert("Veuillez choisir une couleur et une taille");
    }
  }

  // Plus tard : remplacer ces listes par les vraies variantes du backend
  const colors = ["Dore", "Argente", "Rose"];
  const sizes = ["S", "M", "L"];

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{props.title}</h2>
        <p>Selectionnez vos options :</p>

        {/* Section Couleurs */}
        <div className="option-group">
          <label>Couleur :</label>
          <div className="options">
            {colors.map(function (color) {
              return (
                <button
                  key={color}
                  className={selectedColor === color ? "active" : ""}
                  onClick={function () { setSelectedColor(color); }}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Tailles */}
        <div className="option-group">
          <label>Taille :</label>
          <div className="options">
            {sizes.map(function (size) {
              return (
                <button
                  key={size}
                  className={selectedSize === size ? "active" : ""}
                  onClick={function () { setSelectedSize(size); }}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Boutons Annuler / Ajouter */}
        <div className="modal-actions">
          <Button variant="secondary" onClick={props.onClose}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleValidation}>
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
