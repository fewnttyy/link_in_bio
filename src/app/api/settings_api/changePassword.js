import apiClient from "../apiClient";
import Swal from "sweetalert2";

const showSweetAlert = (status, message) => {
    Swal.fire({
        icon: status ? "success" : "error",
        title: status ? "success" : "error",
        text: message,
    });
};

export const updatePassword = async (currentPassword, newPassword, newPasswordConfirmation) => {
    try {
        const response = await apiClient.post('/change/password/secure', {
            current_password: currentPassword,
            new_password: newPassword,
            new_password_confirmation: newPasswordConfirmation
        });

        showSweetAlert(response.data.status, "Password berhasil diubah");
        console.log(response);
        return response.data;

    } catch (error) {
        console.log(error);

        if (error.response && error.response.data) {
            showSweetAlert(false, error.response.data.message || "Gagal mengubah password");
            return { status: false, message: error.response.data.message, errors: error.response.data.data };
        }

        showSweetAlert(false, "Terjadi kesalahan server");
        return { status: false, message: "Terjadi kesalahan server" };
    }
}