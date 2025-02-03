import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";
axios.defaults.withCredentials = true;

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// export const getCsrfCookie = async () => {
//     await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie");
// }

export default apiClient;