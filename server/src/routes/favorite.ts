// =============================================================
// Ici c'est "l'aiguillage" :
// Si quelqu'un appelle POST /signup ça envoie vers la fonction signup du controller
// Juste un intermédiaire entre l'URL et la logique
// ROUTES AUTH - Definit les URLs pour l'authentification
// Quand le frontend appelle /api/auth/signup ou /api/auth/login
// =============================================================

import { Router } from "express";
import { addFavori, deleteFavori, getFavori } from "../controllers/favorite";

// On cree un "routeur" Express
const router = Router();

// Quand on recoit un POST sur /favoris/:id, on appelle la fonction favori du controller
router.post("/:productId", addFavori);

// Quand on recoit un DELETE sur /favoris/:id, on appelle la fonction favori du controller
router.delete("/:productId", deleteFavori);

// Quand on recoit un GET sur /favoris, on appelle la fonction favori du controller
router.get("/", getFavori);

// On exporte le routeur pour l'utiliser dans index.ts
export default router;
