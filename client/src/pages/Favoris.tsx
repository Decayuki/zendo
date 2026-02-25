// =============================================================
// PAGE FAVORIS - Liste des produits ajoutes en favoris
// Pour l'instant c'est un placeholder (page vide)
// Plus tard on affichera les produits sauvegardes par l'utilisateur
// =============================================================

import React from "react";
import "../styles/Pages.css";
import "../styles/Favoris.css";
import { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import { Link, useParams } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductModal from "../components/ProductModal/ProductModal";
import { addToCart } from "../services/cartService";
import { Message } from "../components/Message/Message";

function Favoris() {
  // ETATS & HOOKS
  const [favoris, setFavoris] = useState<any[]>([]);

  const [error, setError] = useState("");

  // set l'état pour afficher ou non le modal de sélection des variations
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // fetch les favoris de l'utilisateur
    fetch(`http://localhost:5001/api/favoris`, {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => {
        const favoris = data.favoris || [];
        for (let i = 0; i < favoris.length; i++) {
          fetch(`http://localhost:5001/api/products/${favoris[i]._id}`, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
            .then((response) => response.json())
            .then((data) => {
              favoris[i].variations = data.variations;
            });
        }
        setFavoris(data.favoris);
        console.log(data.favoris);
      });
  }, []);

  const favorisList = () => {
    return favoris.map((favori: any) => (
      <div key={favori._id} className="favoris-item">
        <Link to={`/produit/${favori._id}`} className="favoris-link">
          <img
            src={favori.images?.[0] || "/placeholder.png"}
            alt={favori.name}
            className="favoris-image"
          />
        </Link>
        <div className="favoris-info">
          <h3 className="favoris-title">{favori.name}</h3>
          <div className="favoris-bottom">
            <p className="favoris-price">{favori.price}€</p>
            <FontAwesomeIcon
              onClick={() => setShowModal(true)}
              className="favoris-cart"
              icon={faCartShopping}
              size="lg"
              color="black"
            />
            <ProductModal
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onConfirm={({ color, size, quantity }: any) => {
                // j'appelle la fonction addToCart du service cartService pour ajouter le produit au panier de l'utilisateur
                // .then pour récupérer le message d'ajout au panier et l'afficher à l'utilisateur
                addToCart(favori._id, color, size, quantity).then((message) => {
                  setError(message);
                });
              }}
              title="Choisissez une variation"
              variations={favori.variations || []}
            />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="page-container">
      <Header />
      <div className="page-content">
        <Message message={error} variant="error" />
        <div className="page-favoris">
          <div className="page-favoris-list">{favorisList()}</div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}

export default Favoris;
