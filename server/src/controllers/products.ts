// =============================================================
// CONTROLLER PRODUCTS - Logique pour gérer les produits
// =============================================================

import { Request, Response } from "express";
import Product from "../models/Products";

// ---------------------------------------------------------
// GET PRODUCTS
// Route : GET /api/products
// Query possible : family, category, sellerId, status
// ---------------------------------------------------------
async function getProducts(req: Request, res: Response) {
  try {
    const filters: Record<string, unknown> = {};

    const family = req.query.family as string | undefined;
    const category = req.query.category as string | undefined;
    const sellerId = req.query.sellerId as string | undefined;
    const status = req.query.status as string | undefined;

    if (family) {
      filters.family = family;
    }
    if (category) {
      filters.category = category;
    }
    if (sellerId) {
      filters.sellerId = sellerId;
    }
    if (status !== undefined) {
      // on accepte "true"/"false" ou booléen direct
      if (status === "true" || status === "false") {
        filters.status = status === "true";
      } else {
        filters.status = status;
      }
    }

    const products = await Product.find(filters).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Liste des produits récupérée avec succès",
      products: products,
    });
  } catch (error) {
    console.error("Erreur getProducts:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// CREATE PRODUCT
// Route : POST /api/products
// Body attendu :
// { name, description?, images?, family, category, material?, madeInFrance?,
//   reference, status?, sellerId }
// ---------------------------------------------------------
async function createProduct(req: Request, res: Response) {
  try {
    const {
      name,
      description,
      images,
      family,
      category,
      material,
      madeInFrance,
      reference,
      status,
      sellerId,
    } = req.body;

    // Champs obligatoires côté modèle
    if (!name || !family || !category || !reference || !sellerId) {
      return res.status(400).json({
        message:
          "Les champs name, family, category, reference et sellerId sont obligatoires",
      });
    }

    const product = await Product.create({
      name,
      description,
      images,
      family,
      category,
      material,
      madeInFrance,
      reference,
      status,
      sellerId,
    });

    return res.status(201).json({
      message: "Produit créé avec succès",
      product: product,
    });
  } catch (error) {
    console.error("Erreur createProduct:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// DELETE PRODUCT
// Route : DELETE /api/products/:id
// ---------------------------------------------------------
async function deleteProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID du produit manquant" });
    }

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    return res
      .status(200)
      .json({ message: "Produit supprimé avec succès", product: deleted });
  } catch (error) {
    console.error("Erreur deleteProduct:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// export des fonctions pour les routes
export { getProducts, createProduct, deleteProduct };

