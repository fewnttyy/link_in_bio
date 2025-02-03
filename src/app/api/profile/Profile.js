import api from "../../api";
import Swal from "sweetalert2";

// Fungsi untuk menampilkan pesan dengan SweetAlert
const showAlert = (status, message) => {
  Swal.fire({
    icon: status ? "success" : "error",
    title: status ? "success" : "error",
    text: message,
  });
};

// Fungsi untuk mengambil data profile user yang sedang login
export const getProfile = async () => {
  try {
    const response = await api.get("/profiles");
    if (response.data.status) {
      return response.data;
    } else {
      showAlert(false, response.data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching profile:", error);
    showAlert(false, error.response?.data?.message || "Failed to fetching profile data");
    return null;
  }
};

// Fungsi untuk memperbarui data profile user
export const updateProfile = async (id, formData) => {
  try {
    const response = await api.post(`/profiles/update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Untuk menangani file upload
      },
    });
    showAlert(response.data.status, response.data.message);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    showAlert(false, error.response?.data?.error || error.response?.data?.message || "Failed to update profile");
    return null;
  }
};
