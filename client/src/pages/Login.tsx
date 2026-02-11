// =============================================================
// LOGIN
// L'utilisateur entre son email et mot de passe pour se connecter
// =============================================================

import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

function Login() {
  // --- STATES ---
  // useState permet de stocker des valeurs qui peuvent changer dans le composant
  // Quand un state change, React re-affiche le composant automatiquement

  // Contenu du champ email (vide au depart)
  // rappel email = valeur setEmail = fonction pour la modifier
  const [email, setEmail] = useState("");

  // Contenu du champ mot de passe (vide au depart)
  const [password, setPassword] = useState("");

  // Message d'erreur a afficher (vide = pas d'erreur)
  const [error, setError] = useState("");

  // --- FONCTION DE SOUMISSION DU FORMULAIRE ---
  // quand l'utilisateur clique sur "Se connecter"
  // au sujet de "e" = l'event qui vient de se passer ici le submit
  // au sujet de React.FormEvent : TS "e" sera un event de formulaire = étiquette de typage
  // rappel : TS = précision sur le type (ici e = event formulaire)
  async function handleSubmit(e: React.FormEvent) {
    // Empecher le rechargement de la page (comportement par defaut d'un formulaire HTML)
    e.preventDefault();

    // Remettre le message d'erreur a vide
    setError("");

    // A LIRE
    //
    //
    // Ici on passe la requete POST au back avec email et mdp
    // axios.post(url, donnees) envoie les donnees en JSON au serveur
    // AXIOS :
    // lib qui remplace (facilite) la syntaxe :
    // AU lieu d'écrire
    // fetch("http://localhost:5000/api/auth/login", {
    // method: "POST",
    // headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ email: email, password: password })
    //})
    //.then(function(res) { return res.json(); })
    //.then(function(data) { console.log(data); })
    // Résultat carrément plus simple !
    //
    //
    // TRY : on test un truc qui peut rater
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: email,
          password: password,
        },
      );
      // Si on arrive ici, connexion = ok
      // On save le token et les infos user dans localStorage
      // Rappel : localStorage garde les donnees meme si on ferme le browser
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Afficher un message de succes
      alert("Connexion reussie !");

      // TODO: plus tard, rediriger vers la page d'accueil au lieu d'un alert
    } catch (err: any) {
      // Si le serveur a renvoye une erreur (mauvais email, mauvais mdp...)
      if (err.response) {
        // Afficher le message d'erreur du serveur
        setError(err.response.data.message);
      } else {
        // Si le serveur ne repond pas du tout
        setError("Erreur de connexion au serveur");
      }
    }
  }

  // --- AFFICHAGE (JSX) ---
  // C'est ce que React va afficher a l'ecran
  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* --- EN-TETE : logo + titre --- */}
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-text">Z</span>
          </div>
          <h1 className="auth-title">ZENDO</h1>
          <p className="auth-subtitle">L'artisanat en tout simplicité</p>
        </div>

        {/* --- FORMULAIRE --- */}
        {/* onSubmit : quand le formulaire est soumis, on appelle handleSubmit */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Si error n'est pas vide, on affiche le message d'erreur en rouge */}
          {error && <p className="auth-error">{error}</p>}

          {/* Champ email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="johndoe@example.com"
              value={email}
              onChange={function (e) {
                setEmail(e.target.value);
              }}
              required
            />
          </div>

          {/* Champ mot de passe */}
          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={function (e) {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          {/* Bouton de soumission */}
          <button type="submit" className="auth-button">
            Se connecter
          </button>
        </form>

        {/* --- LIENS EN BAS --- */}
        <div className="auth-links">
          <a href="/forgot-password" className="auth-link-forgot">
            Mot de passe oublie ?
          </a>
          <p className="auth-link-switch">
            Pas encore de compte ? <a href="/signup">Creer un compte</a>
          </p>
        </div>
      </div>
    </div>
  );
}

// On exporte le composant pour l'utiliser dans App.tsx
export default Login;
