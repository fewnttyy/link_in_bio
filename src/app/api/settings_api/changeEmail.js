import apiClient from "../apiClient";
import Swal from "sweetalert2";

// Fungsi untuk menampilkan pesan dengan SweetAlert
const showAlert = (status, message) => {
    Swal.fire({
        icon: status ? "success" : "error",
        title: status ? "success" : "error",
        text: message,
    });
};

export const updateEmail = async (new_email) => {
    try {
        const response = await apiClient.put('/change/email/secure', new_email);
        showAlert(response.data.status, response.data.message);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        showAlert(false, error.response?.data?.error || error.response?.data?.message || "Failed to update email");
        return null;
    }
};

export const verifyOtpEmail = async (new_email, email_verification_token) => {
    try {
        const response = await apiClient.post('/change/email/secure/verify', {
            new_email: new_email,
            email_verification_token: email_verification_token,
        });
        // showAlert(response.data.status, response.data.message);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log(error);
        showAlert(false, error.response?.data?.error || error.response?.data?.message || "Verifikasi gagal");
        return null;
    }
}