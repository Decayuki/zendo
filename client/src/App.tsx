// =============================================================
// APP.TSX - Routeur principal de l'application
// Definit quelle URL affiche quelle page
// Gere aussi l'affichage conditionnel de la Navbar
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
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favoris from "./pages/Favoris";
import Profil from "./pages/Profil";
import Shop from "./pages/Shop";
import ProductList from "./pages/ProductList";

// --- Composants ---
import Navbar from "./components/Navbar/Navbar";

function AppContent() {
  // useLocation() necessaire pour cacher la Navbar sur les pages d'auth
  const location = useLocation();

  // On cache la navbar sur les pages d'auth
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/recovery" ||
    location.pathname === "/reset";

  return (
    <>
      <Routes>
        {/* --- Pages d'authentification (sans navbar) --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* --- Pages principales (avec navbar) --- */}
        <Route path="/home" element={<Home />} />
        <Route path="/recherche" element={<Search />} />
        <Route path="/favoris" element={<Favoris />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/boutique" element={<Shop />} />

        {/* --- Routes dynamiques (ProductList par famille/categorie) --- */}
        {/* IMPORTANT : ces routes doivent etre APRES les routes fixes
            sinon "favoris" serait interprete comme un nom de famille */}
        <Route path="/:family" element={<ProductList />} />
        <Route path="/:family/:category" element={<ProductList />} />

        {/* --- Route par defaut : redirige vers login --- */}
        {/* Plus tard on pourra rediriger vers /accueil si l'utilisateur est connecte */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/detailProduct/:id" element={<ProductDetail />} />
      </Routes>

      {/* On affiche la Navbar seulement si on est PAS sur une page d'auth */}
      {!hideNavbar && <Navbar />}
    </>
  );
}

function App() {
  return (
    // BrowserRouter : active le systeme de routing (navigation entre pages)
    // Grace a lui on remplace le composant appele sans reload
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// On exporte pour l'utiliser dans main.tsx
export default App;
