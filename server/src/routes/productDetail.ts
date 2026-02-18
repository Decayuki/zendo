// =============================================================
// Ici c'est "l'aiguillage" :
// Si quelqu'un appelle POST /signup ça envoie vers la fonction signup du controller
// Juste un intermédiaire entre l'URL et la logique
// ROUTES AUTH - Definit les URLs pour l'authentification
// Quand le frontend appelle /api/auth/signup ou /api/auth/login
// =============================================================

import { Router } from "express";
import { getProduct } from "../controllers/productDetail";

// On cree un "routeur" Express
const router = Router();

// Quand on recoit un GET sur /article/:id, on appelle la fonction detailProduct du controller
router.get("/article/:id", getProduct);

// On exporte le routeur pour l'utiliser dans index.ts
export default router;
