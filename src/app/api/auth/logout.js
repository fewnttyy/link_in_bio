import apiClient from "../apiClient";

export const logout = async () => {
    try {
        const response = await apiClient.post("logout");
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
}