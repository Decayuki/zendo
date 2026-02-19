// =============================================================
// SERVICE API - Instance Axios centralisee
// Au lieu de repeter l'URL du backend partout,
// on cree une seule instance configuree ici
// Usage : import api from "../services/api";
//         api.get("/products") → GET http://localhost:5001/api/products
// =============================================================

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  timeout: 5000,
});

export default api;
