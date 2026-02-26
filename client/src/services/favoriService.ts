// =============================================================
// UTILITAIRE FAVORIS
// Contient les fonctions pour gérer les favoris de l'utilisateur
// =============================================================

const removeFavori = (
  // je récupere l'id du produit pour le supprimer des favoris de l'utilisateur
  productId: string,
) => {
  // j'envoie une requete DELETE à l'API pour supprimer le produit des favoris de l'utilisateur
  return fetch(`http://localhost:5001/api/favoris/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.message;
    });
};

const addFavori = (
  // je récupere l'id du produit pour l'ajouter aux favoris de l'utilisateur
  productId: string,
) => {
  // j'envoie une requete POST à l'API pour ajouter le produit aux favoris de l'utilisateur
  return fetch(`http://localhost:5001/api/favoris/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.message;
    });
};

export { removeFavori, addFavori };
