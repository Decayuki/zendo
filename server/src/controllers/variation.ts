import { Request, Response } from "express";
import Variation from "../models/Variation";

// ---------------------------------------------------------
// CREATE VARIATION - Enregistrer une variation pour un produit
// Route : POST /api/variations
// ---------------------------------------------------------
export async function createVariation(req: Request, res: Response) {
  try {
    const { productId, color, size, stock, price } = req.body;

    // Validation
    if (!productId) {
      return res.status(400).json({
        message: "Le productId est obligatoire pour créer une variation",
      });
    }

    const variation = await Variation.create({
      productId,
      color,
      size,
      stock: stock ?? 0,
      price
    });

    return res.status(201).json({
      message: "Variation créée avec succès",
      variation,
    });
  } catch (error) {
    console.error("Erreur createVariation:", error);
    return res.status(500).json({ message: "Erreur serveur lors de la création de la variation" });
  }
}