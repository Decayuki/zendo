import { useState } from "react";
import "../styles/Auth.css";

function RecoveryScreen({ navigation }: any) {
  // Grabbed from emailregex.com
  const EMAIL_REGEX: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // STATES
  const [error, setError] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  // Fonction de soumission du formulaire
  const handleSubmit = () => {
    setError("");
    if (password === password2 && password.length >= 6) {
      fetch(`http://localhost:3000/user/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result === "Mot de passe mis à jour") {
            navigation.navigate("Login", {
              screen: "Login",
            });
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
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            id="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={function (e) {
              setPassword(e.target.value);
            }}
            required
          />
          <label htmlFor="password2">Confirmation mot de passe</label>
          <input
            id="password2"
            type="password"
            placeholder="Mot de passe"
            value={password2}
            onChange={function (e) {
              setPassword2(e.target.value);
            }}
            required
          />
        </div>

        <button className="auth-button" onClick={handleSubmit}>
          Récupérer mon mot de passe
        </button>
      </div>
    </div>
  );
}
export default RecoveryScreen;
