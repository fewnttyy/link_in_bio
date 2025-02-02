import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Menyisipkan token ke setiap request jika tersedia
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
