import apiClient from "../apiClient";

const loginUser = async (email, password) => {
    try {
        await apiClient.get("/sanctum/csrf-cookie");

        const response = await apiClient.post("/login", {
            email: email,
            password: password,
        });

        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}

export default loginUser;