// =============================================================
// MAIN.TSX - Point d'entree de l'app
// Fait le lien entre React et HTML (dans la div #root)
// =============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// On recupere la div avec l'id "root" de index.html
// on demande a react d'afficher le composant App dedans
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
