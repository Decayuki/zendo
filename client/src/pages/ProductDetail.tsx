import React, { useState, useEffect } from "react";
import Button from "../components/Button/Button";
import { Header } from "../components/Header/Header";
import "../styles/ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Message } from "../components/Message/Message";
import ProductModal from "../components/Modal/ProductModal/ProductModal";
import { addToCart } from "../services/cartService";
import api from "../services/api";

function ProductDetail() {
  // ETATS & HOOKS

  // permet d'afficher le message d'ajout ou de suppression des favoris
  const [error, setError] = useState("");
  // set les donnees necessaires a la page product detail
  const [product, setProduct] = useState<any>({
    images: [],
    name: "",
    description: "",
    _id: "",
  });
  // set les variations du produit
  const [variations, setVariations] = useState<any[]>([]);
  // set la donnee favorie pour afficher le coeur plein ou vide
  const [isFavori, setIsFavori] = useState(false);
  // set le message d'ajout ou de suppression du panier
  const [message, setMessage] = useState("");
  // set l'etat pour afficher ou non le modal de selection des variations
  const [showModal, setShowModal] = useState(false);

  // Recupere l'ID de la route
  const { id } = useParams();

  // Calcule le prix minimum depuis les variations (car price est sur Variation, pas Product)
  const minPrice = variations.length > 0
    ? Math.min(...variations.map(function (v: any) { return v.price || 0; }))
    : 0;

  // useEffect pour fetch les donnees du produit et verifier les favoris
  useEffect(function () {
    if (!id) return;

    // fetch les donnees du produit via api.ts
    api.get("/products/" + id)
      .then(function (response) {
        setProduct(response.data.product);
        setVariations(response.data.variations || []);
      })
      .catch(function (error) {
        console.error("Erreur fetch produit:", error);
      });

    // fetch les favoris de l'utilisateur pour verifier si le produit est dans les favoris
    api.get("/favoris", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then(function (response) {
        const favoris = response.data.favoris || [];
        if (favoris.find(function (favori: any) { return favori._id === id; })) {
          setIsFavori(true);
        }
      });
  }, [id]);

  // fonction pour recuperer la premiere image du produit
  function firstImage() {
    if (product && product.images && product.images.length > 0) {
      return product.images[0];
    }
    return "";
  }

  // fonction pour recuperer la deuxieme image du produit si elle existe
  function smallImage() {
    if (!product || !product.images) return "";
    for (let i = 1; i < product.images.length; i++) {
      if (product.images[i]) {
        return product.images[i];
      }
    }
    return "";
  }

  function handleFavoriClick() {
    if (!id) return;

    const previousState = isFavori;
    setIsFavori(!isFavori);

    // si le produit etait deja dans les favoris, on le supprime, sinon on l'ajoute
    if (previousState) {
      api.delete("/favoris/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(function (response) {
          setError(response.data.message);
        });
    } else {
      api.post("/favoris/" + id, {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then(function (response) {
          setError(response.data.message);
        });
    }
  }

  // fonction pour ajouter un produit dans le panier de l'utilisateur
  function handleAddCartClick(color: string, size: string, quantity: number) {
    if (!product || !product._id) return;
    if (showModal) {
      addToCart(product._id, color, size, quantity).then(function (message: string) {
        setError(message);
      });
    }
  }

  return (
    <div>
      <Header />

      <div className="product-detail-container">
        <div className="product-image">
          <img src={firstImage()} alt="Product" />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product ? product.name : "Produit"}</h1>
          <p className="product-price">Prix : {minPrice}€</p>

          <FontAwesomeIcon
            icon={faHeart}
            onClick={handleFavoriClick}
            style={isFavori ? { color: "#E9BE59" } : {}}
            className="heart-icon"
          />
        </div>

        <Message message={error} variant="error" />

        <div className="product-smallImage">
          <img src={smallImage()} alt="Product" />
        </div>

        <div className="product-description-container">
          <p className="product-description">{product ? product.description : ""}</p>
        </div>
        <ProductModal
          isOpen={showModal}
          onClose={function () { setShowModal(false); }}
          onConfirm={function ({ color, size, quantity }: any) {
            handleAddCartClick(color, size, quantity);
          }}
          title="Choisissez une variation"
          variations={variations}
        />
        <Button onClick={function () { setShowModal(true); }}>Ajouter au panier</Button>
      </div>
    </div>
  );
}

export default ProductDetail;
