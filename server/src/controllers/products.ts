// =============================================================
// CONTROLLER PRODUCTS - Logique pour gérer les produits
// =============================================================

import { Request, Response } from "express";
import Product from "../models/Products";
import Variation from "../models/Variation";

// ---------------------------------------------------------
// GET PRODUCTS
// Route : GET /api/products
// Query possible : family, category, sellerId, status
// ---------------------------------------------------------
async function getProducts(req: Request, res: Response) {
  try {
    //  créer un objet de filtres pour la requête : si on clique dur "Femme", elle ajoute {family: "Femme"}
    // Record<string, unknown> est une manière sécurisée de définir un objet dont on ne connaît pas encore toutes les clés.
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

    // Récupérer les variations pour chaque produit
    const productsWithVariations = await Promise.all(
      products.map(async (product) => {
        const variations = await Variation.find({ productId: product._id });
        return {
          ...product.toObject(),
          variations: variations,
        };
      }),
    );

    return res.status(200).json({
      message: "Liste des produits récupérée avec succès",
      products: productsWithVariations,
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
//   reference, status?, sellerId, variations?: [{ color?, size, stock, price }] }
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
      variations, // Array attendu: [{ color, size, stock, price }]
    } = req.body;

    // 1. Validation
    if (!name || !family || !category || !reference || !sellerId) {
      return res.status(400).json({
        message:
          "Les champs name, family, category, reference et sellerId sont obligatoires",
      });
    }

    // 2. Création du Produit (On ne passe PAS variations ici car absent du schéma Product)
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
    console.log("Variations reçues :", variations);
    if (variations && Array.isArray(variations)) {
      console.log("Nombre de variations à créer :", variations.length);
    } else {
      console.log("Le champ variations est absent ou n'est pas un tableau");
    }
    // 3. Création des Variations liées par productId
    let createdVariations: any[] = [];
    console.log("Variations reçues :", variations);
    if (variations && Array.isArray(variations) && variations.length > 0) {
      createdVariations = await Promise.all(
        variations.map(async (v) => {
          return await Variation.create({
            productId: product._id, // Lien crucial vers le produit créé ci-dessus
            color: v.color,
            size: v.size,
            stock: v.stock ?? 0,
            price: v.price,
          });
        }),
      );

      // 4. Calcul du stock total pour mettre à jour le statut si nécessaire
      const totalStock = createdVariations.reduce(
        (sum, v) => sum + (v.stock ?? 0),
        0,
      );
      if (totalStock < 1) {
        product.status = false;
        await product.save();
      }
    }

    return res.status(201).json({
      message: "Produit et variations créés avec succès",
      product: {
        ...product.toObject(),
        variations: createdVariations,
      },
    });
  } catch (error) {
    console.error("Erreur createProduct:", error);
    return res.status(500).json({ message: "Erreur serveur", error });
  }
}

// ---------------------------------------------------------
// UPDATE PRODUCT
// Route : PUT /api/products/:id
// Body attendu : tous les champs modifiables (name, description, images,
//   family, category, material, madeInFrance, reference, status, variations?)
// Note : sellerId ne peut pas être modifié pour éviter le changement de propriétaire
// ---------------------------------------------------------
async function updateProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ message: "ID du produit manquant" });
    }

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
      variations,
    } = req.body;

    // Vérifier que le produit existe
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Construire l'objet de mise à jour avec seulement les champs fournis
    const updateData: Record<string, unknown> = {};

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (images !== undefined) updateData.images = images;
    if (family !== undefined) updateData.family = family;
    if (category !== undefined) updateData.category = category;
    if (material !== undefined) updateData.material = material;
    if (madeInFrance !== undefined) updateData.madeInFrance = madeInFrance;
    if (reference !== undefined) updateData.reference = reference;
    if (status !== undefined) updateData.status = status;

    // Mettre à jour le produit
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    // Gérer les variations si fournies
    let updatedVariations: any[] = [];
    if (variations !== undefined) {
      // Supprimer toutes les variations existantes
      await Variation.deleteMany({ productId: id });

      // Créer les nouvelles variations si fournies
      if (Array.isArray(variations) && variations.length > 0) {
        updatedVariations = await Promise.all(
          variations.map((variation: any) =>
            Variation.create({
              productId: id,
              color: variation.color,
              size: variation.size,
              stock: variation.stock ?? 0,
              price: variation.price,
            }),
          ),
        );

        // Calculer le stock total
        const totalStock = updatedVariations.reduce(
          (sum, v) => sum + (v.stock ?? 0),
          0,
        );

        // Mettre à jour le status du produit : false si stock total < 1
        if (totalStock < 1 && updatedProduct) {
          updatedProduct.status = false;
          await updatedProduct.save();
        }
      }
    } else {
      // Si variations n'est pas fourni, récupérer les variations existantes
      updatedVariations = await Variation.find({ productId: id });
    }

    // Calculer le stock total pour vérifier le status
    const allVariations =
      updatedVariations.length > 0
        ? updatedVariations
        : await Variation.find({ productId: id });
    const totalStock = allVariations.reduce(
      (sum, v) => sum + (v.stock ?? 0),
      0,
    );

    // Mettre à jour le status si nécessaire (si stock < 1, status = false)
    if (totalStock < 1 && updatedProduct) {
      updatedProduct.status = false;
      await updatedProduct.save();
    }

    // Récupérer le produit final avec ses variations
    const finalVariations = await Variation.find({ productId: id });
    const productWithVariations = {
      ...updatedProduct?.toObject(),
      variations: finalVariations,
    };

    return res.status(200).json({
      message: "Produit modifié avec succès",
      product: productWithVariations,
    });
  } catch (error) {
    console.error("Erreur updateProduct:", error);
    // Si erreur de validation (ex: enum invalide)
    if ((error as any).name === "ValidationError") {
      return res.status(400).json({
        message: "Données invalides",
        error: (error as any).message,
      });
    }
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

    // Supprimer aussi toutes les variations associées
    await Variation.deleteMany({ productId: id });

    return res
      .status(200)
      .json({ message: "Produit supprimé avec succès", product: deleted });
  } catch (error) {
    console.error("Erreur deleteProduct:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// export des fonctions pour les routes
export { getProducts, createProduct, updateProduct, deleteProduct };
