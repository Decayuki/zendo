// =============================================================
// INDEX.TS - Point d'entree du serveur backend
// C'est ce fichier qui demarre Express et connecte MongoDB
// On lance le serveur avec : npm run dev
// =============================================================

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

// Charger les variables d'environnement depuis le fichier .env
// (MONGO_URI, JWT_SECRET, PORT)
dotenv.config();

// Creer l'application Express
const app = express();

// Recuperer le port depuis le .env, ou utiliser 5000 par defaut
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARES ---
// Les middlewares sont des fonctions qui s'executent avant chaque requete

// cors() : autorise le frontend (qui tourne sur un autre port) a communiquer avec le backend
app.use(cors());

// express.json() : permet de lire le JSON envoye dans le body des requetes POST
app.use(express.json());

// --- ROUTES ---

// Toutes les routes qui commencent par /api/auth sont gerees par authRoutes
// Exemple : POST /api/auth/signup, POST /api/auth/login
app.use("/api/auth", authRoutes);

// Route de test pour verifier que le serveur fonctionne
// Si tu vas sur http://localhost:5000 dans le navigateur, tu verras ce message
app.get("/", function (req, res) {
  res.json({ message: "API Zendo fonctionne" });
});

// --- CONNEXION A MONGODB ---
// On se connecte d'abord a la base de donnees,
// puis on demarre le serveur seulement si la connexion reussit
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(function () {
    console.log("Connecte a MongoDB");

    // Une fois connecte a MongoDB, on demarre le serveur Express
    app.listen(PORT, function () {
      console.log("Serveur demarre sur http://localhost:" + PORT);
    });
  })
  .catch(function (error) {
    // Si la connexion a MongoDB echoue, on affiche l'erreur
    console.error("Erreur de connexion MongoDB:", error);
  });
