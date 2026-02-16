// =============================================================
// Ici on definit les routes (quelle URL affiche quelle page)
// =============================================================

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Log from "./pages/Auth/Login";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profil from "./pages/Profil";
import Favoris from "./pages/Favoris";
import Shop from "./pages/Shop";

function App() {
  return (
    // BrowserRouter : active le systeme de routing (navigation entre pages)
    // Grace à lui on remplace le composant appelé sans reload
    <BrowserRouter>
      {/* ICI on ajoutera la <Navbar />  via le composant Navbar.tsx à faire donc*/}
       <Navbar />
      <Routes>
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

        {/* Pour toute autre URL, on redirige vers /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

// On exporte pour l'utiliser dans main.tsx
export default App;
