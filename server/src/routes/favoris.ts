// =============================================================
// ROUTES FAVORIS - Aiguillage pour les favoris utilisateur
// Permet d'ajouter, supprimer et lister les favoris d'un user
//
// GET    /api/user/:id/favoris              -> liste des favoris
// POST   /api/user/:id/favoris/:productId   -> ajouter un favori
// DELETE /api/user/:id/favoris/:productId   -> retirer un favori
// =============================================================

import { Router } from "express";
import { getFavoris, addFavori, deleteFavori } from "../controllers/favoris";

const router = Router();

// Recuperer tous les favoris d'un utilisateur
// Exemple : GET /api/user/65abc123/favoris
router.get("/:id/favoris", getFavoris);

// Ajouter un produit aux favoris
// Exemple : POST /api/user/65abc123/favoris/65xyz789
router.post("/:id/favoris/:productId", addFavori);

// Retirer un produit des favoris
// Exemple : DELETE /api/user/65abc123/favoris/65xyz789
router.delete("/:id/favoris/:productId", deleteFavori);

export default router;
