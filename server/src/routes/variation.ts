// =============================================================
// ROUTES VARIATION - Aiguillage pour les variantes produit
// Les variantes sont liees a un produit via productId dans l'URL
//
// GET    /api/products/:productId/variations  -> liste des variantes
// POST   /api/products/:productId/variations  -> creer une variante
// DELETE /api/variations/:id                  -> supprimer une variante
// =============================================================

import { Router } from "express";
import {
  getVariations,
  createVariation,
  deleteVariation,
} from "../controllers/variation";

const router = Router();

// Recuperer toutes les variantes d'un produit
// Exemple : GET /api/products/65abc123/variations
router.get("/products/:productId/variations", getVariations);

// Creer une variante pour un produit
// Body : { color: "Dore", size: "M", stock: 5 }
router.post("/products/:productId/variations", createVariation);

// Supprimer une variante par son ID
// Exemple : DELETE /api/variations/65xyz789
router.delete("/variations/:id", deleteVariation);

export default router;
