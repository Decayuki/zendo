import React from "react";
import Button from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "../../styles/ProductDetail.css";

function ProductDetail() {
  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-image">
          <img
            src="https://tbs-tbs-storage.omn.proximis.com/Imagestorage/imagesSynchro/1500/1500/6a52180926fa68154cea0b237b32692d143752ef_MALIKRON14488_1_p.jpg"
            alt="Product"
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">Titre du produit</h1>
          <p className="product-price">Prix : 49,99€</p>
        </div>
        <div className="product-smallImage">
          <img
            src="https://tbs-tbs-storage.omn.proximis.com/Imagestorage/imagesSynchro/1500/1500/6a52180926fa68154cea0b237b32692d143752ef_MALIKRON14488_1_p.jpg"
            alt="Product"
          />
          <img
            src="https://tbs-tbs-storage.omn.proximis.com/Imagestorage/imagesSynchro/1500/1500/6a52180926fa68154cea0b237b32692d143752ef_MALIKRON14488_1_p.jpg"
            alt="Product"
          />
          <img
            src="https://tbs-tbs-storage.omn.proximis.com/Imagestorage/imagesSynchro/1500/1500/6a52180926fa68154cea0b237b32692d143752ef_MALIKRON14488_1_p.jpg"
            alt="Product"
          />
        </div>
        <div className="product-description-container">
          <p className="product-description">
            Description du produit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
        </div>
        <div className="product-buttons">
          <Button onClick={() => alert("Produit ajouté au panier")}>
            Ajouter au panier
          </Button>
          <Button onClick={() => alert("Produit ajouté aux favoris")}>
            Ajouter aux favoris
          </Button>
        </div>
        <Navbar />
        <div>ProductDetail</div>
      </div>
    </div>
  );
}

export default ProductDetail;
