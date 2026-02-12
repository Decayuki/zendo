import { useState } from "react";
import "../styles/Auth.css";

function RecoveryScreen({ navigation }: any) {
  // Grabbed from emailregex.com
  const EMAIL_REGEX: RegExp =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //
  const [error, setError] = useState("");
  const [mail, setMail] = useState("");
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
            navigation.navigate("LoginPage", { screen: "Login" });
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
          Récupérer mon mot de passe
        </button>
      </div>
    </div>
  );
}
export default RecoveryScreen;
