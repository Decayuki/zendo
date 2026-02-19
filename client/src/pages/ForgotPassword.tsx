// =============================================================
// PAGE MOT DE PASSE OUBLIE - Formulaire de reinitialisation
// L'utilisateur entre son email pour recevoir un lien de reset
// Meme structure que Login.tsx : un formulaire, un handleSubmit, un appel axios
// =============================================================

import React, { useState } from "react";
import axios from "axios";
import "../styles/Auth.css";

function ForgotPassword() {
  // --- STATES ---

  // Contenu du champ email
  const [email, setEmail] = useState("");

  // Message d'erreur (vide = pas d'erreur)
  const [error, setError] = useState("");

  // Message de succes (vide = pas encore envoye)
  const [success, setSuccess] = useState("");

  // --- FONCTION DE SOUMISSION ---
  // Quand l'utilisateur clique sur "Envoyer"
  async function handleSubmit(e: React.FormEvent) {
    // Empecher le rechargement de la page
    e.preventDefault();

    // Remettre les messages a vide
    setError("");
    setSuccess("");

    try {
      // Envoyer l'email au backend pour declencher l'envoi du mail de reset
      // Le backend va :
      // 1. Verifier que l'email existe en base
      // 2. Generer un token temporaire
      // 3. Envoyer un email avec un lien de reinitialisation
      const response = await axios.post(
        "http://localhost:5001/api/auth/recovery",
        {
          email: email,
        },
      );

      // Si on arrive ici, l'email a ete envoye
      setSuccess(response.data.message);
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Erreur de connexion au serveur");
      }
    }
  }

  // --- AFFICHAGE ---
  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* --- EN-TETE --- */}
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-text">Z</span>
          </div>
          <h1 className="auth-title">ZENDO</h1>
          <p className="auth-subtitle">Reinitialiser votre mot de passe</p>
        </div>

        {/* --- FORMULAIRE --- */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Message d'erreur */}
          {error && <p className="auth-error">{error}</p>}

          {/* Message de succes */}
          {success && <p className="auth-success">{success}</p>}

          {/* Champ email */}
          <div className="form-group">
            <label htmlFor="email">Votre adresse email</label>
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

          {/* Bouton d'envoi */}
          <button type="submit" className="auth-button">
            Envoyer le lien
          </button>
        </form>

        {/* --- LIEN RETOUR --- */}
        <div className="auth-links">
          <p className="auth-link-switch">
            <a href="/login">Retour a la connexion</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
