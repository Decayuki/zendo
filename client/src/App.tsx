// =============================================================
// APP Routeur principal de l'application
// Definit quelle URL affiche quelle page (+ affichage conditionnel)
// Ici on definit les routes (quelle URL affiche quelle page)
// =============================================================

import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

// --- Pages ---
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import RecoveryScreen from "./pages/Auth/RecoveryScreen";

// --- Composants ---
import Navbar from "./components/Navbar/Navbar";

function AppContent() {
  // useLocation() necessaire pour cacher la Navbar sur les pages d'auth
  const location = useLocation();

  // On cache la navbar sur les pages d'auth
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/recovery";
import Log from "./pages/Auth/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profil from "./pages/Profil";
import Favoris from "./pages/Favoris";
import Shop from "./pages/Shop";

function App() {
  return (
    <>
    // BrowserRouter : active le systeme de routing (navigation entre pages)
    // Grace à lui on remplace le composant appelé sans reload
    <BrowserRouter>
      {/* ICI on ajoutera la <Navbar />  via le composant Navbar.tsx à faire donc*/}
       <Navbar />
      <Routes>
        {/* --- Pages d'authentification (sans navbar) --- */}
        {/* Définition des chemins correspondants aux 'to' de Navbar */}
        <Route path="/home" element={<Home />} />
        <Route path="/recherche" element={<Search />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/boutique" element={<Shop/>} />
        <Route path="/profil" element={<Profil />} />
        {/* Redirection par défaut si l'utilisateur arrive sur le site */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        {/* Si l'URL est /login, on affiche la page Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/log" element={<Log />} />

        {/* Si l'URL est /signup, on affiche la page Signup */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/recovery" element={<RecoveryScreen />} />

        {/* --- Route par defaut : redirige vers login --- */}
        {/* Plus tard on pourra rediriger vers /accueil si l'utilisateur est connecte */}
        {/* Pour toute autre URL, on redirige vers /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* On affiche la Navbar seulement si on est PAS sur une page d'auth */}
      {!hideNavbar && <Navbar />}
    </>
  );
}

function App() {
  return (
    // BrowserRouter : active le systeme de routing (navigation entre pages)
    // Grace a lui on remplace le composant appelé sans reload
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}


// On exporte pour l'utiliser dans main.tsx
export default App;
