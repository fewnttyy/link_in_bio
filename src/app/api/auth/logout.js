import apiClient from "../apiClient";

const logoutUser = async () => {
    try {
        await apiClient.get("/sanctum/csrf-cookie");

        const response = await apiClient.post("/logout", {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        // throw error.response ? error.response.data : error;
        return {
            success: false,
            message: error.response?.data?.message || "Gagal logout",
        };
    }
}

export default logoutUser;