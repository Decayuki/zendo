import express from "express";
import { createVariation } from "../controllers/variation"; // Import de la fonction exportée

const router = express.Router();

// Route pour ajouter une déclinaison (taille, couleur, stock) à un produit
// URL : POST http://localhost:5001/api/variations
router.post("/", createVariation);

export default router;