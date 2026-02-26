// =============================================================
// PAGE FAVORIS - Liste des produits ajoutes en favoris
// Pour l'instant c'est un placeholder (page vide)
// Plus tard on affichera les produits sauvegardes par l'utilisateur
// =============================================================

import React from "react";
import "../styles/Pages.css";
import "../styles/Cart.css";
import { useEffect, useState } from "react";
import { Header } from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import { Message } from "../components/Message/Message";
import Button from "../components/Button/Button";
import { Link, useParams } from "react-router-dom";

function Cart() {
  // ETATS & HOOKS
  const [cart, setCart] = useState<any[]>([]);

  const [error, setError] = useState("");

  useEffect(() => {
    // fetch les produits du panier de l'utilisateur
    fetch(`http://localhost:5001/api/cart`, {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => {
        const cart = data.cart || [];
        setCart(cart);

        // charger les données de chaque produit
        for (let i = 0; i < cart.length; i++) {
          fetch(`http://localhost:5001/api/products/${cart[i].product}`, {
            method: "GET",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          })
            .then((response) => response.json())
            .then((productData) => {
              cart[i].productData = productData.product;
              // mettre à jour le panier avec les données du produit
              setCart([...cart]);
            });
        }
        console.log(cart);
      });
  }, []);

  const cartList = () => {
    return cart.map((item: any) => (
      <div key={item._id} className="product-item">
        <Link to={`/produit/${item.product}`} className="product-link">
          <img
            src={item.productData?.images?.[0] || "/placeholder.png"}
            alt={item.productData?.name}
            className="product-image"
          />
        </Link>
        <div className="product-info">
          <h3 className="product-title">{item.productData?.name}</h3>
          <div className="product-bottom">
            <p className="product-price">{item.productData?.price}€</p>
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
        <div className="page-cart">
          <div className="page-cart-list">{cartList()}</div>
        </div>
        <Button>Paiement</Button>
      </div>
      <Navbar />
    </div>
  );
}

export default Cart;
