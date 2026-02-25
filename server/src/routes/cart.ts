// =============================================================
// Ici c'est "l'aiguillage" :
// Si quelqu'un appelle POST /cart ça envoie vers la fonction cart du controller
// Juste un intermédiaire entre l'URL et la logique
// ROUTES cart - Definit les URLs pour les cart
// Quand le frontend appelle /api/cart ou /api/cart/:productId
// =============================================================

import { Router } from "express";
import {
  addCartItem,
  deleteCartItem,
  updateCartItem,
  getCartItems,
} from "../controllers/cart";

// On cree un "routeur" Express
const router = Router();

// Quand on recoit un POST sur /cart/:id, on appelle la fonction cart du controller
router.post("/:productId", addCartItem);

// Quand on recoit un DELETE sur /cart/:id, on appelle la fonction cart du controller
router.delete("/:productId", deleteCartItem);

// Quand on recoit un DELETE sur /cart/:id, on appelle la fonction cart du controller
router.patch("/:productId", updateCartItem);

// Quand on recoit un GET sur /cart, on appelle la fonction cart du controller
router.get("/", getCartItems);

// On exporte le routeur pour l'utiliser dans index.ts
export default router;
