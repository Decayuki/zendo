// =============================================================
// CONTROLLER CART - Logique metier pour le panier
// Un utilisateur peut ajouter/supprimer des produits dans son panier
// Le panier est stocke dans le champ "cart" du User (tableau d'IDs produit)
// =============================================================

import { Request, Response } from "express";
import User from "../models/User";
import Product from "../models/Product";

// ---------------------------------------------------------
// ADD TO CART
// Route : POST /api/user/:id/cart/:productId
// ---------------------------------------------------------
async function addToCart(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer les IDs depuis l'URL
    const userId = req.params.id;
    const productId = req.params.productId;

    // Etape 2 : vérifications User
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res
        .status(404)
        .json({ message: "Utilisateur ou produit non trouve" });
    }

    // Etape 3 : verifier que le produit n'est pas deja dans le panier
    // Conversion ObjectIds en strings pour comparaison
    const cartIds = (user.cart || []).map(function (id: any) {
      return id.toString();
    });
    if (cartIds.includes(productId)) {
      return res.status(400).json({ message: "Article deja dans le panier" });
    }

    // Etape 4 : ajouter le productId dans le tableau cart du user
    await User.updateOne({ _id: userId }, { $push: { cart: productId } });

    // Etape 5 : confirmer l'ajout
    return res.status(200).json({
      message: "Article ajoute au panier",
    });
  } catch (error) {
    console.error("Erreur addToCart:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// REMOVE FROM CART - Retirer un produit du panier d'un utilisateur
// Route : DELETE /api/user/:id/cart/:productId
// ---------------------------------------------------------
async function removeFromCart(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer les IDs depuis l'URL
    const userId = req.params.id;
    const productId = req.params.productId;

    // Etape 2 : verifier que le user existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouve" });
    }

    // Etape 3 : retirer le productId du tableau cart du user
    await User.updateOne({ _id: userId }, { $pull: { cart: productId } });

    // Etape 4 : confirmer la suppression
    return res.status(200).json({
      message: "Article retire du panier",
    });
  } catch (error) {
    console.error("Erreur removeFromCart:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// GET CART - Recuperer le contenu du panier d'un utilisateur
// Route : GET /api/user/:id/cart
// Retourne : { cart: [...], count: 2 }
// ---------------------------------------------------------
async function getCart(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer l'ID du user depuis l'URL
    const userId = req.params.id;

    // Etape 2 : chercher le user dans la base
    const user = await User.findById(userId);

    // Etape 3 : si le user n'existe pas
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouve" });
    }

    // Etape 4 : recuperer les produits correspondant aux IDs dans le tableau cart
    const cart = await Product.find({ _id: { $in: user.cart || [] } });

    // Etape 5 : renvoyer le panier
    return res.status(200).json({
      message: "Panier recupere",
      cart: cart,
      count: cart.length,
    });
  } catch (error) {
    console.error("Erreur getCart:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export { addToCart, removeFromCart, getCart };
