// =============================================================
// MAIN.TSX - Point d'entree de l'application React
// C'est ce fichier qui "accroche" React au HTML (dans la div #root)
// =============================================================

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// On recupere la div avec l'id "root" dans index.html
// et on demande a React d'afficher le composant App dedans
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
