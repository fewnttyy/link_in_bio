import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://127.0.0.1:8000/api";
axios.defaults.withCredentials = true;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Middleware untuk menambahkan token ke setiap request
apiClient.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") { // ✅ Cegah error saat di server-side (Next.js)
            const token = Cookies.get("token"); // ✅ Ambil token dari Cookies hanya di client-side
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Middleware untuk menambahkan token ke setiap request
// apiClient.interceptors.request.use((config) => {
//     const token = Cookies.get("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export const getCsrfCookie = async () => {
//     await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
// }

export default apiClient;