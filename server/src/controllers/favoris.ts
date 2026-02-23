// =============================================================
// CONTROLLER FAVORIS - Logique metier pour les favoris
// Un utilisateur peut ajouter/supprimer des produits en favoris
// Les favoris sont stockes dans le champ "favoris" du User (tableau d'IDs produit)
// =============================================================

import { Request, Response } from "express";
import User from "../models/User";
import Product from "../models/Product";

// ---------------------------------------------------------
// GET FAVORIS - Recuperer la liste des favoris d'un utilisateur
// Route : GET /api/user/:id/favoris
// Retourne : { favoris: [...], count: 3 }
// ---------------------------------------------------------
async function getFavoris(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer l'ID du user depuis l'URL
    const userId = req.params.id;

    // Etape 2 : chercher le user dans la base
    const user = await User.findById(userId);

    // Etape 3 : si le user n'existe pas
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouve" });
    }

    // Etape 4 : recuperer les produits correspondant aux IDs dans le tableau favoris
    const favoris = await Product.find({ _id: { $in: user.favoris || [] } });

    // Etape 5 : renvoyer les favoris
    return res.status(200).json({
      message: "Favoris recuperes",
      favoris: favoris,
      count: favoris.length,
    });
  } catch (error) {
    console.error("Erreur getFavoris:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// ADD FAVORI - Ajouter un produit aux favoris d'un utilisateur
// Route : POST /api/user/:id/favoris/:productId
// ---------------------------------------------------------
async function addFavori(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer les IDs depuis l'URL
    const userId = req.params.id;
    const productId = req.params.productId;

    // Etape 2 : verifier que le user et le produit existent
    const user = await User.findById(userId);
    const product = await Product.findById(productId);

    if (!user || !product) {
      return res
        .status(404)
        .json({ message: "Utilisateur ou produit non trouve" });
    }

    // Etape 3 : verifier que le produit n'est pas deja dans les favoris
    // On convertit les ObjectIds en strings pour pouvoir comparer
    const favorisIds = (user.favoris || []).map(function (id: any) { return id.toString(); });
    if (favorisIds.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Article deja dans les favoris" });
    }

    // Etape 4 : ajouter le productId dans le tableau favoris du user
    await User.updateOne(
      { _id: userId },
      { $push: { favoris: productId } },
    );

    // Etape 5 : confirmer l'ajout
    return res.status(200).json({
      message: "Article ajoute aux favoris",
    });
  } catch (error) {
    console.error("Erreur addFavori:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// DELETE FAVORI - Retirer un produit des favoris d'un utilisateur
// Route : DELETE /api/user/:id/favoris/:productId
// ---------------------------------------------------------
async function deleteFavori(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer les IDs depuis l'URL
    const userId = req.params.id;
    const productId = req.params.productId;

    // Etape 2 : verifier que le user existe
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouve" });
    }

    // Etape 3 : retirer le productId du tableau favoris du user
    await User.updateOne(
      { _id: userId },
      { $pull: { favoris: productId } },
    );

    // Etape 4 : confirmer la suppression
    return res.status(200).json({
      message: "Article retire des favoris",
    });
  } catch (error) {
    console.error("Erreur deleteFavori:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

export { getFavoris, addFavori, deleteFavori };
