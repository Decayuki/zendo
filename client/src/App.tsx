// =============================================================
// APP.TSX - Composant principal de l'application React
// C'est ici qu'on definit les routes (quelle URL affiche quelle page)
// =============================================================

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    // BrowserRouter : active le systeme de routing (navigation entre pages)
    <BrowserRouter>
      <Routes>
        {/* Si l'URL est /login, on affiche la page Login */}
        <Route path="/login" element={<Login />} />

        {/* Si l'URL est /signup, on affiche la page Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Pour toute autre URL, on redirige vers /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

// On exporte App pour l'utiliser dans main.tsx (point d'entree React)
export default App;
