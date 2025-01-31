import apiClient from "../apiClient";

export const login = async (email, password) => {
    try {
        await apiClient.get("/sanctum/csrf-cookie");

        const response = await apiClient.post("login", {
            email: email,
            password: password,
        }, {
            withCredentials: true,
        });

        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}