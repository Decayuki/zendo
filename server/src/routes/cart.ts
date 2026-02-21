// =============================================================
// ROUTES CART - Aiguillage pour le panier utilisateur
// Permet d'ajouter, supprimer et consulter le panier d'un user
//
// GET    /api/user/:id/cart              -> contenu du panier
// POST   /api/user/:id/cart/:productId   -> ajouter au panier
// DELETE /api/user/:id/cart/:productId   -> retirer du panier
// =============================================================

import { Router } from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cart";

const router = Router();

// Recuperer le contenu du panier d'un utilisateur
// Exemple : GET /api/user/65abc123/cart
router.get("/:id/cart", getCart);

// Ajouter un produit au panier
// Exemple : POST /api/user/65abc123/cart/65xyz789
router.post("/:id/cart/:productId", addToCart);

// Retirer un produit du panier
// Exemple : DELETE /api/user/65abc123/cart/65xyz789
router.delete("/:id/cart/:productId", removeFromCart);

export default router;
