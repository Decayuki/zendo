// =============================================================
// CONTROLLER AUTH - Contient la logique pour signup et login
// C'est ici qu'on gere ce qui se passe quand un utilisateur
// veut creer un compte ou se connecter
// =============================================================

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

// ---------------------------------------------------------
// SIGNUP : creer un nouveau compte utilisateur
// Route : POST /api/auth/signup
// Body attendu : { firstName, lastName, email, password }
// ---------------------------------------------------------
async function signup(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer les donnees envoyees par le formulaire
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    // Etape 2 : verifier que tous les champs sont remplis
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "Tous les champs sont requis",
      });
    }

    // Etape 3 : verifier si un compte avec cet email existe deja
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "Cet email est deja utilise",
      });
    }

    // Etape 4 : hasher (chiffrer) le mot de passe avant de le stocker
    // On ne stocke JAMAIS un mot de passe en clair dans la base de donnees
    // Le "salt" ajoute des caracteres aleatoires pour rendre le hash unique
    // Le nombre 10 = nombre de "tours" de chiffrement (plus c'est haut, plus c'est securise mais lent)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Etape 5 : creer l'utilisateur dans la base de donnees
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword, // on stocke le hash, pas le mot de passe en clair
    });

    // Etape 6 : generer un token JWT (JSON Web Token)
    // C'est comme un "badge d'acces" qu'on donne a l'utilisateur
    // Il le renverra a chaque requete pour prouver qu'il est connecte
    const token = jwt.sign(
      {
        id: newUser._id, // on met l'id du user dans le token
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET as string, // cle secrete pour signer le token (dans le .env)
      { expiresIn: "7d" } // le token expire apres 7 jours
    );

    // Etape 7 : renvoyer une reponse au frontend
    // Code 201 = "created" (ressource creee avec succes)
    // On renvoie le token + les infos du user (SANS le mot de passe)
    return res.status(201).json({
      message: "Compte cree avec succes",
      token: token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    // Si une erreur inattendue se produit, on renvoie une erreur 500 (erreur serveur)
    console.error("Erreur signup:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// LOGIN : connecter un utilisateur existant
// Route : POST /api/auth/login
// Body attendu : { email, password }
// ---------------------------------------------------------
async function login(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer email et mot de passe du formulaire
    const email = req.body.email;
    const password = req.body.password;

    // Etape 2 : verifier que les champs sont remplis
    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe requis",
      });
    }

    // Etape 3 : chercher l'utilisateur par son email dans la base
    const user = await User.findOne({ email: email });

    // Si aucun utilisateur trouve, on renvoie une erreur
    // On ne precise pas si c'est l'email ou le mdp qui est faux (pour la securite)
    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // Etape 4 : comparer le mot de passe envoye avec le hash en base
    // bcrypt.compare fait la comparaison de maniere securisee
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // Etape 5 : generer un token JWT (meme logique que dans signup)
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    // Etape 6 : renvoyer le token et les infos utilisateur
    // Code 200 = "OK" (requete reussie)
    return res.status(200).json({
      message: "Connexion reussie",
      token: token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Erreur login:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// On exporte les deux fonctions pour les utiliser dans les routes
export { signup, login };
