// =============================================================
// CONFIG VITE - Outil de build pour le frontend React
// Vite compile le TypeScript et lance le serveur de dev
// On lance avec : npm run dev
// =============================================================

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // le frontend tourne sur http://localhost:3000
  },
});
