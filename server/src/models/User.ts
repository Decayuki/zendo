// =============================================================
// MODELE USER - Represente un utilisateur dans la base de donnees
// Ce fichier definit la "forme" d'un utilisateur dans MongoDB
// =============================================================

import mongoose from "mongoose";

// On cree le schema : c'est la structure des donnees qu'on veut stocker
// Chaque champ a un type (String, Boolean...) et des regles de validation
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
      lowercase: true, // convertit en minuscules automatiquement
      trim: true,
    },

    // Mot de passe (sera stocke en version hashee, jamais en clair)
    password: {
      type: String,
      required: true,
    },

    // Role de l'utilisateur : acheteur par defaut
    // Peut etre "buyer" (acheteur), "seller" (vendeur) ou "admin"
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"], // seulement ces 3 valeurs sont acceptees
      default: "buyer", // si on ne precise pas, c'est "buyer"
    },
  },
  {
    // Cette option ajoute automatiquement les champs createdAt et updatedAt
    timestamps: true,
  }
);

// On cree le modele a partir du schema
// "User" sera le nom de la collection dans MongoDB (en minuscules + pluriel = "users")
const User = mongoose.model("User", UserSchema);

// On exporte le modele pour l'utiliser dans d'autres fichiers
export default User;
