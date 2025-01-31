import axios from "axios";
import { config } from "process";

const API_URL = "http://127.0.0.1:8000/api";

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});



export default apiClient;