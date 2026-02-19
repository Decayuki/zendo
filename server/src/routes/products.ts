// =============================================================
// ROUTES PRODUCTS - Définit les URLs pour la gestion des produits
// /api/products/...
// =============================================================

import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products";

// Créer un "routeur" Express pour les produits
const router = Router();

// Récupérer la liste des produits
// GET /api/products
router.get("/", getProducts);

// Créer un nouveau produit
// POST /api/products
router.post("/", createProduct);

// Modifier un produit par son id
// PUT /api/products/:id
router.put("/:id", updateProduct);

// Supprimer un produit par son id
// DELETE /api/products/:id
router.delete("/:id", deleteProduct);

// On exporte le routeur pour l'utiliser dans index.ts
export default router;

