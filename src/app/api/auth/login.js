import apiClient from "../apiClient";

const loginUser = async (email, password) => {
    try {
        await apiClient.get("/sanctum/csrf-cookie"); // Ambil CSRF token dulu

        const response = await apiClient.post("/login", {
            email: email,
            password: password,
        }, {
            withCredentials: true, // Penting untuk CSRF
        });

        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

export default loginUser;