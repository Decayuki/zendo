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
            index: true, // pour optimiser les recherches par email
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

        // !!!JC!!! possible de recuperer l'avatar de google mais l'utilisateur peut uploader un lui meme
        avatar: {
            type: String,
        },

        // !!!JC!!! si l'utilisateur s'est inscrit avec google, on stocke son googleId pour pouvoir le reconnaitre et lui permettre de se connecter avec google
        googleId: {
            type: String,
        },

        // !!!JC!!! stripeCustomerId pour stocker l'id du client dans Stripe et pouvoir faire le lien entre notre utilisateur et le client dans Stripe pour les paiements et abonnements
        stripeCustomerId: {
            type: String,
        },

        // !!!JC!!! pour les utilisateurs qui s'inscrivent avec google, on peut considerer que leur email est deja verifie mais pour les autres on peut ajouter un systeme de verification par email
        emailVerified: {
            type: Boolean,
            default: false,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        // Pour ajouter les champs createdAt et updatedAt
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

export default User;
