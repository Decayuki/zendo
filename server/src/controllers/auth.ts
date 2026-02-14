// =============================================================
// CONTROLLER AUTH - Contient la logique pour signup et login
// C'est ici qu'on gere ce qui se passe quand un utilisateur
// veut creer un compte ou se connecter
// =============================================================

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { sendMail } from "../services/email-services";

// ---------------------------------------------------------
// SIGNUP
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

    // Etape 3 : check si  compte avec cet email existe deja
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({
        message: "Cet email est deja utilisé",
      });
    }

    // Etape 4 : hashe le mot de passe avant de le stocker
    // Le "salt" = caracteres aleatoires > hash unique
    // 10 = nombre de "tours" de chiffrement
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Etape 5 : creer l'utilisateur en DB
    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword, // on stocke le hash
    });

    // Etape 6 : generer un token JWT (JSON Web Token)
    // Sorte de "badge d'acces"
    // Check a chaque requete pour prouver qu'il est connecté
    const token = jwt.sign(
      {
        id: newUser._id, // on met l'id du user dans le token
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET as string, // cle secrete pour signer le token (dans le .env)
      { expiresIn: "7d" }, // le token expire apres 7 jours
    );

    // Etape 7 : renvoyer une reponse au frontend
    // Code 201 = "created"
    // On renvoie le token + les infos du user (sans le mot de passe)
    return res.status(201).json({
      message: "Compte créé avec succés",
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
    // Si  erreur :
    console.error("Erreur signup:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// LOGIN
// Route : POST /api/auth/login
// Body attendu : { email, password }
// ---------------------------------------------------------
async function login(req: Request, res: Response) {
  try {
    // Etape 1 : recupere email et mot de passe
    const email = req.body.email;
    const password = req.body.password;

    // Etape 2 : vérification input
    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe requis",
      });
    }

    // Etape 3 : check user par son email
    const user = await User.findOne({ email: email });

    // Si aucun utilisateur trouvé = erreur
    if (!user) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect",
      });
    }

    // Etape 4 : compare le mot de passe envoyé avec le hash en base
    // bcrypt.compare pour la comparaison
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
      // définition du temps de validité
      { expiresIn: "7d" },
    );

    // Etape 6 : renvoyer le token et les infos user
    // Code 200 = "OK"
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

// Recovery password

const EMAIL_REGEX: RegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

async function recovery(req: Request, res: Response) {
  try {
    // Etape 1 : recupere email et mot de passe
    const email = req.body.email;

    // Etape 2 : vérification input
    if (!email) {
      return res.status(400).json({
        message: "Email requis",
      });
    }

    // Etape 3 : vérification du format du mail
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        message: "Format invalide",
      });
    }

    // Etape 4 : si format ok, recherche du user avec son adresse mail
    // utilisation await : je veux que le résultat de user.findOne soit intégrer à ma const user (= .then(data))

    const user = await User.findOne({ email: email });
    // Si aucun utilisateur trouvé = erreur
    if (!user) {
      return res.status(400).json({
        message: "Utilisateur non reconnu",
      });
    } // Etape 5 : si user trouvé, envoi du mail de récupération
    else {
      sendMail(email);
      return res.status(200);
    }
  } catch (error) {
    console.error("Erreur recovery:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
// export  pour les utiliser dans les routes

export { signup, login, recovery };
