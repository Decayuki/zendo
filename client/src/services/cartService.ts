// =============================================================
// UTILITAIRE AJOUT AU PANIER
// Contient la fonction addToCart qui envoie une requete POST a l'API
// pour ajouter un produit au panier de l'utilisateur
// =============================================================

import api from "./api";

const addToCart = function (
  productId: string,
  color: string,
  size: string,
  quantity: number,
) {
  // on envoie une requete POST via api.ts au lieu d'une URL en dur
  return api
    .post("/cart/" + productId, {
      color: color,
      size: size,
      quantity: quantity,
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(function (response) {
      return response.data.message;
    });
};

export { addToCart };
