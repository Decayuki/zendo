import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../components/Button/Button";
import { Header } from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import "../styles/ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addcart, deletecart } from "../reducers/cart";
import { useParams } from "react-router-dom";
import { Message } from "../components/Message/Message";
import ProductModal from "../components/ProductModal/ProductModal";
import { color } from "@mui/system";

function ProductDetail() {
  // ETATS & HOOKS

  const dispatch = useDispatch();

  // permet d'afficher le message d'ajout ou de suppression des favoris
  const [error, setError] = useState("");
  // set les données nécessaires à la page product detail
  const [product, setProduct] = useState<any>({
    images: [],
    name: "",
    price: 0,
    description: "",
    _id: "",
  });
  const [variations, setVariations] = useState<any[]>([
    {
      color: "",
      size: "",
    },
  ]);
  // set la donnée favorie pour afficher le coeur plein ou vide
  const [isFavori, setIsFavori] = useState(false);
  // set les favoris de l'utilisateur pour vérifier si le produit est dans les favoris ou pas
  const [userFavori, setUserFavori] = useState([]);
  // ajoute une variable d'état pour stocker les produits du panier de l'utilisateur
  const [userCart, setUserCart] = useState<string[]>([]);
  // Récupère l'ID de la route
  const { id } = useParams();
  // set le message d'ajout ou de suppression du panier
  const [message, setMessage] = useState("");
  // set l'état pour afficher ou non le modal de sélection des variations
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // si je n'ai pas d'id, je ne fetch rien
    if (!id) return;
    // fetch les données du produit
    fetch(`http://localhost:5001/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.product);
        setVariations(data.variations || []);
        console.log(data.variations);
      })
      .catch((error) => console.error("Erreur fetch produit:", error));
    // fetch les favoris de l'utilisateur pour vérifier si le produit est dans les favoris ou pas
    fetch(`http://localhost:5001/api/favoris`, {
      method: "GET",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserFavori(data.favoris || []);
        if (
          data.favoris &&
          data.favoris.find((favori: any) => favori._id === id)
        ) {
          setIsFavori(true);
        }
      });
  }, [id]);
  // fonction pour récupérer la première image du produit
  const firstImage = () => {
    if (product?.images && product.images.length > 0) {
      return product.images[0];
    }
    return "";
  };
  // fonction pour récupérer la deuxième image du produit si elle existe, sinon la première image
  const smallImage = () => {
    if (!product?.images) return "";
    for (let i = 1; i < product.images.length; i++) {
      if (product.images[i]) {
        return product.images[i];
      }
    }
    return "";
  };

  const handleFavoriClick = () => {
    // si je n'ai pas d'id je ne fetch pas
    if (!id) return;
    // set des états favori pour afficher le message d'ajout ou de suppression des favoris et pour afficher le coeur plein ou vide
    const previousState = isFavori;
    const nextState = !isFavori;

    setIsFavori(nextState);
    // si le produit était déjà dans les favoris, je le supprime, sinon je l'ajoute
    if (previousState) {
      fetch(`http://localhost:5001/api/favoris/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setError(data.message);
        });
    } else {
      fetch(`http://localhost:5001/api/favoris/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setError(data.message);
        });
    }
  };

  // fonction pour ajouter ou supprimer le produit du panier de l'utilisateur
  const handleAddCartClick = () => {
    // si je n'ai pas d'id je ne fetch pas
    if (!product?._id) return;
    if (variations && variations.length > 0) {
      setShowModal(true);
    } else {
      console.log("Produit ajouté au panier:", product._id);
      dispatch(addcart(product._id));
      setUserCart([...userCart, product._id]);
      setError("Produit ajouté au panier");
    }
  };

  return (
    <div>
      <Header />

      <div className="product-detail-container">
        <div className="product-image">
          <img src={firstImage()} alt="Product" />
        </div>

        <div className="product-info">
          <h1 className="product-title">{product?.name || "Produit"}</h1>
          <p className="product-price">Prix : {product?.price || 0}€</p>

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
          <p className="product-description">{product?.description || ""}</p>
        </div>
        <Button onClick={handleAddCartClick}>Ajouter au panier</Button>
        <ProductModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={(selection) => {
            handleAddCartClick(selection);
          }}
          title="Choisissez une variation"
          variations={variations}
        />
      </div>

      <Navbar />
    </div>
  );
}

export default ProductDetail;
