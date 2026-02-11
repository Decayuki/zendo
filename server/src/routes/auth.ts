// =============================================================
// ROUTES AUTH - Definit les URLs pour l'authentification
// Quand le frontend appelle /api/auth/signup ou /api/auth/login,
// c'est ce fichier qui redirige vers la bonne fonction du controller
// =============================================================

import { Router } from "express";
import { signup, login } from "../controllers/auth";

// On cree un "routeur" Express (un mini-groupe de routes)
const router = Router();

// Quand on recoit un POST sur /signup, on appelle la fonction signup du controller
router.post("/signup", signup);

// Quand on recoit un POST sur /login, on appelle la fonction login du controller
router.post("/login", login);

// On exporte le routeur pour l'utiliser dans index.ts
export default router;
