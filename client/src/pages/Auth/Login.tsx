import React, { useState } from "react";
import axios from "axios";
import "../../styles/Auth.css";
import Button from "../../components/Button/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { Input } from "../../components/Input/Input";
import AuthHeader from "./AuthHeader";
import { Message } from "../../components/Message/Message";
import AuthFooter from "./AuthFooter";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            alert("Connexion reussie !");

            // TODO: plus tard, rediriger vers la page d'accueil au lieu d'un alert
        } catch (err: any) {
            setError(
                err.response.data.message || "Erreur de connexion au serveur"
            );
        }
    };

    const handleGoogle = () => {
        // fetch connection google
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                {/* --- EN-TETE : logo + titre --- */}
                <AuthHeader />
                <Message message={error} variant="error" />
                {/* --- FORMULAIRE --- */}
                {/* onSubmit : quand le formulaire est soumis, on appelle handleSubmit */}
                <form onSubmit={handleSubmit} className="auth-form">
                    {/* Champ email */}
                    <Input
                        label="Email"
                        type="email"
                        placeholder="johndoe@example.com"
                        value={email}
                        onValueChange={setEmail}
                        required
                    />
                    {/* Champ mot de passe */}
                    <Input
                        label="Mot de passe"
                        type="password"
                        placeholder="********"
                        value={password}
                        onValueChange={setPassword}
                        required
                    />
                    {/* Bouton de soumission */}
                    <Button type="submit">Se connecter</Button>
                    <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                         className="auth-button"
                        leftIcon={<GoogleIcon />}
                        onChange={handleGoogle}
                    >
                        oogle
                    </Button>
                </form>
                {/* --- LIENS EN BAS --- */}
                <AuthFooter />
            </div>
        </div>
    );
};

export default Login;
