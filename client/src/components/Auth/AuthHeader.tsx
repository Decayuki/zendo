import "../../styles/Auth.css";
import Logo from "../Logo/Logo";

const AuthHeader = () => {
    return (
        <div className="auth-header">
            <Logo width={80} height={80} />
            <h1 className="auth-title">ZENDO</h1>
            <p className="auth-subtitle">L'artisanat en tout simplicité</p>
        </div>
    );
};

export default AuthHeader;
