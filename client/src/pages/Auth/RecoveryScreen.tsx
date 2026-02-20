// =============================================================
// PAGE RECOVERY - Formulaire de recuperation de mot de passe
// L'utilisateur entre son email pour recevoir un lien de reinitialisation
// =============================================================

import { useState } from "react";
import "../../styles/Auth.css";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function RecoveryScreen({ navigation }: any) {
  // Grabbed from emailregex.com
  const EMAIL_REGEX: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // STATES
  const [error, setError] = useState("");
  const [mail, setMail] = useState("");

  // Fonction de soumission du formulaire
  const handleSubmit = () => {
    setError("");
    if (EMAIL_REGEX.test(mail)) {
      fetch(`http://localhost:5001/api/auth/recovery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: mail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Email envoyé") {
            alert("Email envoyé");
          } else {
            console.log(data.message);
            setError(data.message);
          }
        });
    } else {
      setError("Mauvais format");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-return">
          <Link to="/login" className="link">
            <FontAwesomeIcon icon={faArrowLeft} size="lg" color="#3b4553" />
          </Link>
        </div>

        {/* --- EN-TETE : logo + titre --- */}
        <div className="auth-header">
          <div className="auth-logo">
            <span className="logo-text">Z</span>
          </div>
          <h1 className="auth-title">ZENDO</h1>
          <p className="auth-subtitle">L'artisanat en tout simplicité</p>
        </div>
        {error && <p className="auth-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@example.com"
            value={mail}
            onChange={function (e) {
              setMail(e.target.value);
            }}
            required
          />
          <Button onClick={handleSubmit}>Récupérer mon mot de passe</Button>
        </div>
      </div>
    </div>
  );
}
export default RecoveryScreen;
