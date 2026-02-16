// =============================================================
// PAGE RECOVERY - Formulaire de recuperation de mot de passe
// L'utilisateur entre son email pour recevoir un lien de reinitialisation
// =============================================================

import { useState } from "react";
import "../../styles/Auth.css";

function RecoveryScreen() {
  // Regex pour valider le format email
  const EMAIL_REGEX: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [error, setError] = useState("");
  const [mail, setMail] = useState("");

  function handleSubmit() {
    setError("");
    if (EMAIL_REGEX.test(mail)) {
      fetch("http://localhost:5001/api/auth/recovery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mail,
        }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.message === "Email envoye") {
            alert("Email envoye !");
            // TODO: rediriger vers /login
          } else {
            setError(data.message);
          }
        });
    } else {
      setError("Mauvais format");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* --- EN-TETE : logo + titre --- */}
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-text">Z</span>
          </div>
          <h1 className="auth-title">ZENDO</h1>
          <p className="auth-subtitle">L'artisanat en tout simplicite</p>
        </div>
        {error && <p className="auth-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            value={mail}
            onChange={function (e) {
              setMail(e.target.value);
            }}
            required
          />
        </div>

        <button className="auth-button" onClick={handleSubmit}>
          Recuperer mon mot de passe
        </button>
      </div>
    </div>
  );
}

export default RecoveryScreen;
