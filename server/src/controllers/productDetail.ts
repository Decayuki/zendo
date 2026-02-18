// =============================================================
// CONTROLLER BUYER - Contient la logique pour les pages d'achat
// =============================================================

import { Request, Response } from "express";
import Product from "../models/Products";
import Variation from "../models/Variation";
import User from "../models/User";

// ---------------------------------------------------------
// DETAIL PRODUCT
// Route : GET /api/buyer/product/:id
// Body attendu : { id, name, description, images, madeInFrance, sellerId }
// ---------------------------------------------------------
async function getProduct(req: Request, res: Response) {
  try {
    // Etape 1 : recupere l'id du produit dans les params de l'URL
    const productId = req.params.id;

    // Etape 2 : check produit par son id et recupere aussi les variations de ce produit
    const product = await Product.findOne({ _id: productId });
    const productVariations = await Variation.find({ productId: productId });

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

// ---------------------------------------------------------
// AJOUT FAVORIS
// Route : POST /api/user/:id/favoris/:productId
// Body attendu : { id, name, description, images, madeInFrance, sellerId }
// ---------------------------------------------------------

async function addFavori(req: Request, res: Response) {
  try {
    // Etape 1 : recupere l'id du produit et le user id dans les params de l'URL
    const userId = req.params.id;
    const productId = req.params.productId;

    // Etape 2 : check user par son id et check produit par son id et recupere aussi les variations de ce produit
    const user = await User.findOne({ _id: userId });
    const product = await Product.findOne({ _id: productId });

    // Etape 3 : verifier que user et produit existent
    if (!user || !product) {
      return res
        .status(404)
        .json({ message: "Utilisateur ou produit non trouvé" });
    }

    // Etape 4 : verifier que le productId n'est pas déjà dans les favoris
    if (user.favoris && user.favoris.includes(productId)) {
      return res.status(400).json({ message: "Article déjà dans les favoris" });
    }

    // Etape 5 : met à jour le user en ajoutant le produit à sa liste de favoris (champ favoris dans la collection User)
    const addFavori = await User.updateOne(
      { _id: userId },
      { $push: { favoris: productId } },
    );

    // Code 200 = "OK"
    return res.status(200).json({
      message: "Article ajouté aux favoris",
      addFavori: addFavori,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
// ---------------------------------------------------------
// DELETE FAVORIS
// Route : DELETE /api/user/:id/favoris/:productId
// Body attendu : { id, name, description, images, madeInFrance, sellerId }
// ---------------------------------------------------------

async function deleteFavori(req: Request, res: Response) {
  try {
    // Etape 1 : recupere l'id du produit et le user id dans les params de l'URL
    const userId = req.params.id;
    const productId = req.params.productId;

    // Etape 2 : check user par son id et check produit par son id et recupere aussi les variations de ce produit
    const user = await User.findOne({ _id: userId });
    const product = await Product.findOne({ _id: productId });

    // Etape 3 : met à jour le user en supprimant le produit de sa liste de favoris (champ favoris dans la collection User)

    const deleteFavori = await User.updateOne(
      { _id: userId },
      { $pull: { favoris: productId } },
    );

    // Code 200 = "OK"
    return res.status(200).json({
      message: "Article supprimé des favoris",
      deleteFavori: deleteFavori,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// AJOUT PANIER
// Route : POST /api/user/:id/favoris/:productId
// Body attendu : { id, name, description, images, madeInFrance, sellerId }
// ---------------------------------------------------------

async function addProductToCart(req: Request, res: Response) {
  try {
    // Etape 1 : recupere l'id du produit et le user id dans les params de l'URL
    const userId = req.params.id;
    const productId = req.params.productId;

    // Etape 2 : check user par son id et check produit par son id et recupere aussi les variations de ce produit
    const user = await User.findOne({ _id: userId });
    const product = await Product.findOne({ _id: productId });

    // Etape 3 : met à jour le user en ajoutant le produit à sa liste de favoris (champ favoris dans la collection User)

    const addProductToCart = await User.updateOne(
      { _id: userId },
      { $push: { cart: productId } },
    );

    // Code 200 = "OK"
    return res.status(200).json({
      message: "Article ajouté au panier",
      addProductToCart: addProductToCart,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
// ---------------------------------------------------------
// GET FAVORIS
// Route : GET /api/user/:id/favoris/:productId
// Body attendu : { id, name, description, images, madeInFrance, sellerId }
// ---------------------------------------------------------

async function getFavori(req: Request, res: Response) {
  try {
    // Etape 1 : recupere l'id du produit dans les params de l'URL
    const productId = req.params.id;

    // Etape 2 : check produit par son id et recupere aussi les variations de ce produit
    const product = await Product.findOne({ _id: productId });
    const productVariations = await Variation.find({ productId: productId });

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

export { getProduct, addFavori, deleteFavori, addProductToCart, getFavori };
