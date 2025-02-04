import apiClient from "../apiClient";

export const getUser = async () => {
    try {
        await apiClient.get("/sanctum/csrf-cookie");

        const response = await apiClient.get("/user", {
            withCredentials: true,
        });
        console.log('userdata', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}