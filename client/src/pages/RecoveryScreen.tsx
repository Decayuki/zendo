import { useState } from "react";
import "../styles/Auth.css";
import Button from "../components/Button/Button";
import { Input } from "../components/Input/Input";

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
      fetch(`http://localhost:3000/recovery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail: mail,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Email envoyé") {
            alert("Email envoyé");
          } else {
            setError(data.result);
          }
        });
    } else {
      setError("Mauvais format");
    }
  };

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
