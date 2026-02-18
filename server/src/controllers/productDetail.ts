// =============================================================
// CONTROLLER BUYER - Contient la logique pour les pages d'achat
// =============================================================

import { Request, Response } from "express";
import Product from "../models/Products";
import Variation from "../models/Variation";

// ---------------------------------------------------------
// DETAIL PRODUCT
// Route : GET /api/buyer/article/:id
// Body attendu : { id, name, description, images, madeInFrance, sellerId }
// ---------------------------------------------------------
async function getProduct(req: Request, res: Response) {
  try {
    // Etape 1 : recupere l'id du produit dans les params de l'URL
    const id = req.params.id;

    // Etape 2 : check user par son email
    const product = await Product.findOne({ _id: id });
    const productVariations = await Variation.find({ productId: id });

    // Etape 3 : renvoyer le produit trouvé

    // Code 200 = "OK"
    return res.status(200).json({
      message: "Produit trouvé",
      product: product,
      productVariations: productVariations,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
export { getProduct };
