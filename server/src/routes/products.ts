// =============================================================
// ROUTES PRODUCTS - Définit les URLs pour la gestion des produits
// /api/products/...
// =============================================================

import { Router } from "express";
import {
  getProducts,
  createProduct,
  deleteProduct,
} from "../controllers/products";

// On crée un "routeur" Express pour les produits
const router = Router();

// Route de test : GET /api/products/ping → vérifie que le préfixe fonctionne
router.get("/ping", (_, res) => {
  res.json({ ok: true, message: "Routes produits OK" });
});

// Récupérer la liste des produits
// GET /api/products
router.get("/", getProducts);

// Créer un nouveau produit
// POST /api/products
router.post("/", createProduct);

// Supprimer un produit par son id
// DELETE /api/products/:id
router.delete("/:id", deleteProduct);

// On exporte le routeur pour l'utiliser dans index.ts
export default router;

