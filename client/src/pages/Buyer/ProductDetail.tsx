import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "../../styles/ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addFavoris } from "../../reducers/favoris";
import { deleteFavoris } from "../../reducers/favoris";

function ProductDetail() {
  // ETATS

  const dispatch = useDispatch();

  const [productImage, setProductImage] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productID, setProductID] = useState("");
  const [userFavoris, setUserFavoris] = useState(false);
  const [userCart, setUserCart] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/product/:id")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductImage(data.product.images);
        setProductName(data.product.name);
        setProductPrice(data.product.price);
        setProductDescription(data.product.description);
        setProductID(data.product._id);
        setUserFavoris(data.product.isFavoris);
      });
  }, []);

  const firstImage = () => {
    if (productImage.length > 0) {
      return productImage[0];
    } else {
      return "";
    }
  };
  const smallImage = () => {
    for (let i = 1; i < productImage.length; i++) {
      if (productImage[i]) {
        return productImage[i];
      }
    }
    return "";
  };

  /*setUserCart(data.productCart);

  const handleFavoriClick = () => {
    if (productID === userFavoris) {
      dispatch(deleteFavoris(productID));
    } else {
      setUserFavoris(data.productFavoris);
      dispatch(addFavoris(productID));
    }
  };

  const handleAddCartClick = () => {
    if (productID in productFavoris) {
      dispatch(deleteFavoris(productID));
      setProductFavoris(false);
    } else {
      dispatch(addFavoris(productID));
    }
  };

  let iconStyle = {};
  if (userFavoris) {
    iconStyle = { color: "#E9BE59" };
  }*/

  return (
    <div>
      <Header />
      <div className="product-detail-container">
        <div className="product-image">
          <img src={firstImage()} alt="Product" />
        </div>
        <div className="product-info">
          <h1 className="product-title">{productName}</h1>
          <p className="product-price">Prix : {productPrice}€</p>
          <FontAwesomeIcon
            icon={faHeart}
            // onClick={() => handleFavoriClick()}
            // style={iconStyle}
            className="heart-icon"
          />
        </div>
        <div className="product-smallImage">
          <img src={smallImage()} alt="Product" />
        </div>
        <div className="product-description-container">
          <p className="product-description">{productDescription}</p>
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
