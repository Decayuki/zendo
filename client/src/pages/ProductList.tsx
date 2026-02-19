// =============================================================
// PAGE PRODUCT LIST - Liste des produits par famille et categorie
// URL dynamique : /femme → tous les produits Femme
//                 /femme/bijoux → les bijoux Femme
// Utilise les utils formatUrl pour convertir les slugs URL en noms BDD
// =============================================================

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { fromSlug } from "../utils/formatUrl";
import ProductView from "../components/ProductView/ProductView";
import "../styles/ProductList.css";

// Listes des enums pour la conversion slug → nom BDD
const FAMILIES = ["Femme", "Homme", "Garcon", "Fille", "Bebe_fille", "Bebe_garcon", "Jouet", "Maison"];
const CATEGORIES = ["Vetements", "Bijoux", "Chaussures", "Sacs", "Accessoires", "Sport", "Beaute", "Luminaire", "Tapis", "Decoration", "Art_de_la_table"];

function ProductList() {
  // Etape 1 : recuperer les parametres de l'URL
  // Exemple : /femme/bijoux → familySlug = "femme", categorySlug = "bijoux"
  const params = useParams();
  const familySlug = params.family;
  const categorySlug = params.category;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Convertir les slugs URL en noms BDD
  // "femme" → "Femme", "bebe-fille" → "Bebe_fille"
  const dbFamily = familySlug ? fromSlug(familySlug, FAMILIES) : null;
  const dbCategory = categorySlug ? fromSlug(categorySlug, CATEGORIES) : null;

  // Etape 2 : charger les produits depuis le backend
  useEffect(function () {
    setLoading(true);

    // Construire les parametres de la requete
    const queryParams: any = {};
    if (dbFamily) {
      queryParams.family = dbFamily;
    }
    if (dbCategory) {
      queryParams.category = dbCategory;
    }

    api.get("/products", { params: queryParams })
      .then(function (response) {
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch(function (error) {
        console.error("Erreur chargement produits:", error);
        setLoading(false);
      });
  }, [dbFamily, dbCategory]);

  // Etape 3 : affichage
  return (
    <div className="product-list-page">
      <header className="list-header">
        <h1 className="list-title">
          {dbFamily} {dbCategory ? "> " + dbCategory.replace("_", " ") : ""}
        </h1>
        <p className="product-count">{products.length} produits trouves</p>
      </header>

      <main className="product-grid-container">
        {loading ? (
          <div className="loader">Chargement des produits...</div>
        ) : (
          <div className="product-grid">
            {products.map(function (product: any) {
              return (
                <ProductView
                  key={product._id}
                  id={product._id}
                  title={product.name}
                  price={product.price || 0}
                  image={product.images && product.images[0] ? product.images[0] : ""}
                  description={product.description || ""}
                />
              );
            })}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="no-results">
            Aucun produit ne correspond a cette categorie pour le moment.
          </div>
        )}
      </main>
    </div>
  );
}

export default ProductList;
