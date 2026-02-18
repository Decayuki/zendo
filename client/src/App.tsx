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

// --- Pages Auth ---
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import RecoveryScreen from "./pages/Auth/RecoveryScreen";

// --- Pages Contenu ---
import Home from "./pages/Home";
import Search from "./pages/Search";
import Profil from "./pages/Profil";
import Favoris from "./pages/Favoris";
import Shop from "./pages/Shop";
import ProductList from "./pages/ProductList";

// --- Composants ---
import Navbar from "./components/Navbar/Navbar";

/**
 * Composant interne pour gérer la logique d'affichage (Navbar)
 * On utilise useLocation() ici car il doit être à l'intérieur de <BrowserRouter>
 */
function AppContent() {
  const location = useLocation();

  // Liste des chemins où la Navbar ne doit pas apparaître
  const authRoutes = ["/login", "/signup", "/recovery", "/log"];
  const hideNavbar = authRoutes.includes(location.pathname);

  return (
    <>
      {/* On affiche la Navbar seulement si on est PAS sur une page d'auth */}
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* --- Navigation principale --- */}
        <Route path="/home" element={<Home />} />
        <Route path="/recherche" element={<Search />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/boutique" element={<Shop />} />
        <Route path="/profil" element={<Profil />} />

        {/* --- Routes Dynamiques (ProductList) --- */}
        {/* Important : Ces routes doivent être après les routes fixes comme /favoris 
            pour éviter que "favoris" soit considéré comme un nom de "family" */}
        <Route path="/:family" element={<ProductList />} />
        <Route path="/:family/:category" element={<ProductList />} />

        {/* --- Authentification --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/recovery" element={<RecoveryScreen />} />
        
        {/* --- Redirections --- */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </>
  );
}

/**
 * Composant racine du projet
 */
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;