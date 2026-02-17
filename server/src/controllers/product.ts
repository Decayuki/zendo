// =============================================================
// CONTROLLER PRODUCT - Logique metier pour les produits
// =============================================================

import { Request, Response } from "express";
import Product from "../models/Products";

// GET /api/products
// Recupere les produits avec filtres optionnels
function getProducts(req: Request, res: Response) {
  const filter: any = { status: true };

  // Filtre par famille
  if (req.query.family) {
    filter.family = req.query.family;
  }

  // Filtre par categorie
  if (req.query.category) {
    filter.category = req.query.category;
  }

  // Filtre Made in France
  if (req.query.madeInFrance === "true") {
    filter.madeInFrance = true;
  }

  // Tri
  let sortOption: any = { createdAt: -1 };
  if (req.query.sort === "recent") {
    sortOption = { createdAt: -1 };
  } else if (req.query.sort === "ancien") {
    sortOption = { createdAt: 1 };
  } else if (req.query.sort === "popular") {
    sortOption = { createdAt: -1 };
  }

  // Limite
  let limit = 20;
  if (req.query.limit) {
    limit = parseInt(req.query.limit as string) || 20;
  }

  Product.find(filter)
    .sort(sortOption)
    .limit(limit)
    .then(function (products) {
      res.json({ products: products });
    })
    .catch(function (error) {
      console.error("Erreur getProducts:", error);
      res.status(500).json({ message: "Erreur serveur" });
    });
}

// GET /api/products/:id
// Recupere un produit par ID
function getProductById(req: Request, res: Response) {
  Product.findById(req.params.id)
    .then(function (product) {
      if (!product) {
        return res.status(404).json({ message: "Produit non trouve" });
      }
      res.json({ product: product });
    })
    .catch(function (error) {
      console.error("Erreur getProductById:", error);
      res.status(500).json({ message: "Erreur serveur" });
    });
}

export { getProducts, getProductById };
