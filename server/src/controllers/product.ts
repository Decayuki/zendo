// =============================================================
// CONTROLLER PRODUCT - Logique metier pour les produits
// GET (liste + detail), POST (creation), DELETE (suppression)
// =============================================================

import { Request, Response } from "express";
import Product from "../models/Product";

// ---------------------------------------------------------
// GET PRODUCTS - Recuperer la liste des produits
// Route : GET /api/products
// Query params optionnels :
//   ?family=Femme       → filtrer par famille
//   ?category=Bijoux    → filtrer par categorie
//   ?madeInFrance=true  → filtrer produits francais
//   ?limit=10           → nombre max de produits
//   ?sort=recent        → tri (recent, ancien, popular)
// ---------------------------------------------------------
async function getProducts(req: Request, res: Response) {
  try {
    // Etape 1 : construire le filtre
    // Par defaut on n'affiche que les produits actifs (status = "active" dans le model)
    const filter: any = { status: "active" };

    // Filtre par famille
    if (req.query.family) {
      filter.family = req.query.family;
    }

    // Filtre par categorie
    if (req.query.category) {
      filter.category = req.query.category;
    }

    // Filtre Made in France
    if (req.query.madeInFrance === "true") {
      filter.madeInFrance = true;
    }

    // Filtre par vendeur
    if (req.query.sellerId) {
      filter.sellerId = req.query.sellerId;
    }

    // Etape 2 : nombre max de resultats
    const limit = Number(req.query.limit) || 20;

    // Etape 3 : definir le tri
    // Par defaut on trie par les plus recents (createdAt descendant)
    let sortOption: any = { createdAt: -1 };

    if (req.query.sort === "ancien") {
      sortOption = { createdAt: 1 };
    }

    // Tri par popularité : pour l'instant on utilise le prix decroissant
    // A faire : ajouter un champ viewCount au modele Product
    if (req.query.sort === "popular") {
      sortOption = { price: -1 };
    }

    // Etape 4 : chercher les produits dans la base
    const products = await Product.find(filter).sort(sortOption).limit(limit);

    // Etape 5 : renvoyer les produits au frontend
    return res.status(200).json({
      message: "Produits recuperes",
      products: products,
      count: products.length,
    });
  } catch (error) {
    console.error("Erreur getProducts:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// GET PRODUCT BY ID - Recuperer un seul produit par son ID
// Route : GET /api/products/:id
// Utile pour la page fiche produit
// ---------------------------------------------------------
async function getProductById(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer l'ID depuis l'URL
    const productId = req.params.id;

    // Etape 2 : chercher le produit dans la base
    const product = await Product.findById(productId);

    // Etape 3 : si le produit n'existe pas
    if (!product) {
      return res.status(404).json({
        message: "Produit non trouve",
      });
    }

    // Etape 4 : renvoyer le produit
    return res.status(200).json({
      product: product,
    });
  } catch (error) {
    console.error("Erreur getProductById:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// CREATE PRODUCT - Creer un nouveau produit
// Route : POST /api/products
// Body attendu : { name, family, category, reference, sellerId, ... }
// ---------------------------------------------------------
async function createProduct(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer les donnees du body
    const name = req.body.name;
    const description = req.body.description;
    const images = req.body.images;
    const price = req.body.price;
    const family = req.body.family;
    const category = req.body.category;
    const material = req.body.material;
    const madeInFrance = req.body.madeInFrance;
    const reference = req.body.reference;
    const status = req.body.status;
    const sellerId = req.body.sellerId;

    // Etape 2 : verifier les champs obligatoires
    if (!name || !price || !family || !category) {
      return res.status(400).json({
        message: "Les champs name, price, family et category sont obligatoires",
      });
    }

    // Etape 3 : creer le produit dans la base
    const product = await Product.create({
      name: name,
      description: description,
      images: images,
      price: price,
      family: family,
      category: category,
      material: material,
      madeInFrance: madeInFrance,
      reference: reference,
      status: status,
      sellerId: sellerId,
    });

    // Etape 4 : renvoyer le produit cree
    return res.status(201).json({
      message: "Produit cree avec succes",
      product: product,
    });
  } catch (error) {
    console.error("Erreur createProduct:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// DELETE PRODUCT - Supprimer un produit par son ID
// Route : DELETE /api/products/:id
// ---------------------------------------------------------
async function deleteProduct(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer l'ID depuis l'URL
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: "ID du produit manquant" });
    }

    // Etape 2 : supprimer le produit de la base
    const deleted = await Product.findByIdAndDelete(productId);

    // Etape 3 : si le produit n'existe pas
    if (!deleted) {
      return res.status(404).json({ message: "Produit non trouve" });
    }

    // Etape 4 : confirmer la suppression
    return res.status(200).json({
      message: "Produit supprime avec succes",
      product: deleted,
    });
  } catch (error) {
    console.error("Erreur deleteProduct:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export { getProducts, getProductById, createProduct, deleteProduct };
