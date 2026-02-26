// =============================================================
// MODELE USER
// =============================================================

import mongoose from "mongoose";
import { CartItemSchema } from "./CartItemSchema";

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
            required: function () {
                return !this.googleId;
            }, // !!! JC !!! obligatoire seulement si l'utilisateur ne s'est pas inscrit avec google (pas de googleId) sinon on peut considerer que la connexion se fait via google et donc pas besoin de mot de passe
        },

        // Role de l'utilisateur : acheteur par defaut
        // Peut etre "buyer" (acheteur), "seller" (vendeur) ou "admin"
        // !!! JC !!! on peut envisager d'avoir plusieurs roles pour un meme utilisateur (ex: un utilisateur peut etre a la fois acheteur et vendeur) d'ou le type tableau et le default ["buyer"] pour que par defaut un nouvel utilisateur soit un acheteur
        roles: {
            type: [String],
            enum: ["buyer", "seller", "admin"],
            default: ["buyer"], // si on ne precise pas, c'est "buyer"
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
            index: true, // !!! JC !!! pour optimiser les recherches par stripeCustomerId (ex: lors du paiement on peut recevoir le stripeCustomerId et on veut trouver l'utilisateur correspondant dans notre base de données)
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

        // Liste des produits favoris de l'utilisateur (references aux produits)
        favoris: [
            {
                type: [mongoose.Schema.Types.ObjectId], // !!! JC !!! un utilisateur peut avoir plusieurs favoris, d'ou le type tableau
                ref: "Product",
                required: false, // un utilisateur peut ne pas avoir de favoris
                default: [], // par defaut c'est un tableau vide
            },
        ],
        cart: {
            type: [CartItemSchema],
            default: [], // par defaut c'est un tableau vide
        },
    },
    {
        // Pour ajouter les champs createdAt et updatedAt
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

export default User;
