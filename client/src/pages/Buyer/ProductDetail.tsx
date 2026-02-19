import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button/Button";
import { Header } from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import "../../styles/ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { addcart, deletecart } from "../../reducers/cart";

function ProductDetail() {
  // ETATS

  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [productImage, setProductImage] = useState([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [userId, setUserID] = useState();
  const [productID, setProductID] = useState("");
  const [isFavori, setIsFavori] = useState(false);
  const [userFavori, setUserFavori] = useState();
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

  const handleFavoriClick = () => {
    if (productID.includes(userFavori)) {
      fetch(`http://localhost:3000/user/${userId}/favoris/${productID}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          productID: productID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== 200) {
            alert(data.message);
            setError(data.message);
          } else {
            setError("");
            setIsFavori(false);
          }
        });
    } else {
      fetch(`http://localhost:3000/user/${userId}/favoris/${productID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          productID: productID,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status !== 200) {
            alert(data.message);
            setError(data.message);
          } else {
            setError("");
            setIsFavori(true);
          }
        });
    }
  };

  const handleAddCartClick = () => {
    if (userCart && userCart.includes(productID)) {
      dispatch(deletecart(productID));
      setUserCart(userCart.filter((id) => id !== productID));
    } else {
      dispatch(addcart(productID));
    }
  };

  let iconStyle = {};
  if (isFavori) {
    iconStyle = { color: "#E9BE59" };
  }

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
            onClick={() => handleFavoriClick()}
            style={iconStyle}
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
          <Button onClick={() => handleAddCartClick()}>
            Ajouter au panier
          </Button>
        </div>
        <Navbar />
      </div>
    </div>
  );
}

export default ProductDetail;
