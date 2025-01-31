import apiClient from "../apiClient";

export const register = async (username, email, password, phone, password_confirmation) => {
    try {
        await apiClient.get("/sanctum/csrf-cookie");

        const response = await apiClient.post("register", {
            username,
            email,
            password,
            phone,
            password_confirmation
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}