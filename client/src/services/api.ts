// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // L'URL de ton backend Node/Express
  timeout: 5000,
});

export default api;