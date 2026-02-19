// =============================================================
// MODELE PRODUCT - Represente un produit dans la base de donnees
// Chaque produit appartient a un vendeur et a une categorie
// Les images sont stockees sous forme d'URLs (pas les fichiers eux-memes)
// =============================================================

import mongoose from "mongoose";

// --- ENUMS ---
// Les valeurs possibles pour certains champs
// Ca empeche de mettre n'importe quoi dans la base

// Familles de produits (qui porte/utilise le produit)
const FAMILIES = [
  "Femme",
  "Homme",
  "Garcon",
  "Fille",
  "Bebe_fille",
  "Bebe_garcon",
  "Jouet",
  "Maison",
];

// Categories de produits (type de produit)
const CATEGORIES = [
  "Vetements",
  "Bijoux",
  "Chaussures",
  "Sacs",
  "Accessoires",
  "Sport",
  "Beaute",
  "Luminaire",
  "Tapis",
  "Decoration",
  "Art_de_la_table",
];

const ProductSchema = new mongoose.Schema(
  {
    // Nom du produit (ex: "Bracelet en cuir tresse")
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Description du produit
    description: {
      type: String,
      default: "",
    },

    // Images du produit : tableau d'URLs
    // Exemple : ["https://exemple.com/img1.jpg", "https://exemple.com/img2.jpg"]
    // On stocke les URLs, pas les fichiers
    images: {
      type: [String],
      default: [],
    },

    // Prix du produit en euros
    // Plus tard ce prix pourra etre dans un modele Variation (couleur/taille)
    price: {
      type: Number,
      required: true,
    },

    // Famille du produit (Femme, Homme, Enfant, Maison...)
    family: {
      type: String,
      enum: FAMILIES,
      required: true,
    },

    // Categorie du produit (Vetements, Bijoux, Chaussures...)
    category: {
      type: String,
      enum: CATEGORIES,
      required: true,
    },

    // Materiaux utilises (tableau car un produit peut avoir plusieurs materiaux)
    material: {
      type: [String],
      default: [],
    },

    // Fabrique en France (oui/non)
    madeInFrance: {
      type: Boolean,
      default: false,
    },

    // Reference interne du produit (code vendeur)
    reference: {
      type: String,
      default: "",
    },

    // Statut du produit : actif (visible) ou inactif (cache)
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // ID du vendeur qui a cree ce produit
    // Plus tard on liera ca au modele Seller
    // Pour l'instant on stocke juste l'ID du User qui vend
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    // Ajoute automatiquement createdAt et updatedAt
    timestamps: true,
  },
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
