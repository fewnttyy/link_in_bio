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

export const getAffiliateUrl = async (setLoadingAffiliate) => {
    try {
        setLoadingAffiliate(true);
        const response = await apiClient.get("/affiliate");

        if (response.data.status) {
            console.log(response.data);
            return response.data;
        } else {
            showAlert(false, response.data.message);
            return null;
        }

    } catch (error) {
        console.error("Error fetching affiliate url:", error);
        showAlert(false, error.response?.data?.message || "Failed to fetching affiliate url data");
        return null;
    } finally {
        setLoadingAffiliate(false);
    }
}

export const updateAffiliateUrl = async (id, formData, refreshAffiliate) => {
    try {
        const response = await apiClient.put(`/affiliate/update/${id}`, formData);

        if (response.data.status) {
            showAlert(response.data.status, response.data.message);
            refreshAffiliate();
            return response.data;
        } else {
            // console.log(response);
            showAlert(false, response.data.message);
            return null;
        }
    } catch (error) {
        console.error("Error updating affiliate URL:", error);
        showAlert(false, error.response?.data?.message || "Failed to update affiliate URL");
        return null;
    }
}