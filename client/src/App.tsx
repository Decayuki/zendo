// =============================================================
// Ici on definit les routes (quelle URL affiche quelle page)
// =============================================================

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecoveryScreen from "./pages/RecoveryScreen";
import Log from "./pages/Auth/Login";

function App() {
  return (
    // BrowserRouter : active le systeme de routing (navigation entre pages)
    // Grace à lui on remplace le composant appelé sans reload
    <BrowserRouter>
      {/* ICI on ajoutera la <Navbar />  via le composant Navbar.tsx à faire donc*/}
      <Routes>
        {/* Si l'URL est /login, on affiche la page Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/log" element={<Log />} />

        {/* Si l'URL est /signup, on affiche la page Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Pour toute autre URL, on redirige vers /login */}
        <Route path="*" element={<Navigate to="/login" />} />

        {/* Pour toute autre URL, on redirige vers /login */}
        <Route path="/recovery" element={<RecoveryScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

// On exporte pour l'utiliser dans main.tsx
export default App;
