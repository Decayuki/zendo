import "../../styles/Auth.css";

const AuthFooter = () => {
  return (
    <div className="auth-links">
      <a href="/recovery" className="auth-link-forgot">
        Mot de passe oublie ?
      </a>
      <p className="auth-link-switch">
        Pas encore de compte ? <a href="/signup">Creer un compte</a>
      </p>
    </div>
  );
};

export default AuthFooter;
