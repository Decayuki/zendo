// =============================================================
// APP Routeur principal de l'application
// Definit quelle URL affiche quelle page (+ affichage conditionnel)
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
import RecoveryScreen from "./pages/Auth/RecoveryScreen";
import ResetScreen from "./pages/Auth/ResetScreen";
import ProductDetail from "./pages/Buyer/ProductDetail";

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
        <Route path="/recovery" element={<RecoveryScreen />} />
        <Route path="/reset" element={<ResetScreen />} />
        {/* --- Route par defaut : redirige vers login --- */}
        {/* Plus tard on pourra rediriger vers /accueil si l'utilisateur est connecte */}
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
    // Grace a lui on remplace le composant appelé sans reload
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

// On exporte pour l'utiliser dans main.tsx
export default App;
