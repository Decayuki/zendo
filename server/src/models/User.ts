// =============================================================
// MODELE USER
// =============================================================

import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    // Prenom de l'utilisateur
    firstName: {
      type: String,
      required: true, // obligatoire
      trim: true, // enleve les espaces avant/apres
    },

    // Nom de famille
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    // Adresse email (doit etre unique, pas deux comptes avec le meme email)
    email: {
      type: String,
      required: true,
      unique: true, // empeche les doublons
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Role de l'utilisateur : acheteur par defaut
    // Peut etre "buyer" (acheteur), "seller" (vendeur) ou "admin"
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer", // si on ne precise pas, c'est "buyer"
    },
  },
  {
    // Pour ajouter les champs createdAt et updatedAt
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

export default User;
