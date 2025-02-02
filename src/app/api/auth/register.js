import apiClient from "../apiClient";

const registerUser = async (username, email, phone, password, passwordConfirmation) => {
    try {
        await apiClient.get("/sanctum/csrf-cookie");

        const response = await apiClient.post("/register", {
            username,
            email,
            password,
            phone,
            password_confirmation: passwordConfirmation,
        });

        // console.log('Ini adalah respon dari register.js', response);
        return response.data;

    } catch (error) {
        throw error.response ? error.response.data : error;

    }
}

export default registerUser;