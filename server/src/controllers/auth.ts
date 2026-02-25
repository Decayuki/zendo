// =============================================================
// CONTROLLER AUTH - Contient la logique pour signup, login & recovery
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

// ---------------------------------------------------------
// RECOVERY : envoyer un email de reinitialisation de mot de passe
// Route : POST /api/auth/recovery
// Body attendu : { email }
// ---------------------------------------------------------
const EMAIL_REGEX: RegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

async function recovery(req: Request, res: Response) {
  try {
    // Etape 1 : recupere email
    const email = req.body.email;

    // Etape 2 : verification input
    if (!email) {
      console.log("Email requis");
      return res.status(400).json({
        message: "Email requis",
      });
    }

    // Etape 3 : verification du format du mail
    if (!EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        message: "Format invalide",
      });
    }

    // Etape 4 : recherche du user avec son adresse mail
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(200).json({
        message:
          "Si cet email existe, un lien a été envoyé pour réinitialiser votre mot de passe",
      });
    }
    // Etape 5 : si user trouvé, envoi du mail de récupération
    else {
      // création d'un token avec user id + email + role (pour pouvoir l'utiliser dans la route de reset)
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET as string,
        // définition du temps de validité
        { expiresIn: "15m" },
      );
      sendMail(email, token);
      return res.status(200).json({
        message:
          "Si cet email existe, un lien a été envoyé pour réinitialiser votre mot de passe",
      });
    }
  } catch (error) {
    console.error("Erreur recovery:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}

// ---------------------------------------------------------
// RESET PASSWORD
// Route : POST /api/auth/reset?token=xxx
// Body attendu : { password }
// ---------------------------------------------------------
// Route : POST /api/auth/reset
// Body attendu : { firstName, lastName, email, password }
// ---------------------------------------------------------
async function reset(req: Request, res: Response) {
  try {
    // Etape 1 : recuperer les donnees envoyees par le formulaire
    /* Recuperer le token dans les headers qui arrive du frontend (dans la requete)
    sous le format Authorization: Bearer {token}*/
    // ici on recupere le token et on enleve "Bearer " pour ne garder que le token
    const token = req.header("authorization")?.replace("Bearer ", "");
    const password = req.body.password;

    // Etape 2 : récuperer les infos du token pour savoir de quel user il s'agit
    // jwt.verify pour decoder le token
    const decodedToken = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string,
    );
    // on recupere l'id du user à partir du token décodé
    const userId = (decodedToken as { id: string }).id;
    if (!password) {
      return res.status(400).json({
        message: "Tous les champs sont requis",
      });
    }

    // Etape 4 : hashe le mot de passe avant de le stocker
    // Le "salt" = caracteres aleatoires > hash unique
    // 10 = nombre de "tours" de chiffrement
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Etape 5 : creer l'utilisateur en DB
    const newUser = await User.updateOne(
      { _id: userId },
      {
        $set: {
          password: hashedPassword, // on stocke le hash
        },
      },
    );

    // Etape 6 : renvoyer une reponse au frontend
    // Code 201 = "created"
    // On affiche un message de succès
    return res.status(201).json({
      message: "Mot de passe mis à jour",
    });
  } catch (error) {
    // Si  erreur :
    console.error("Erreur signup:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
}
// export  pour les utiliser dans les routes

export { signup, login, recovery, reset };
