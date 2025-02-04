import apiClient from '../apiClient';
import Swal from 'sweetalert2';

// 🚀 Function to show success message
const showSuccess = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message,
    timer: 2000,
    showConfirmButton: false
  });
};

// 🚨 Function to show error message
const showError = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error!',
    text: message,
    confirmButtonText: 'Close'
  });
};

// ✅ Fetch all links
export const getLinks = async () => {
  try {
    const response = await apiClient.get("/links");
    return response.data.links;
  } catch (error) {
    console.error('Failed to fetch links:', error);
    showError('Failed to fetch links!');
    return [];
  }
};

// ✅ Create a new link
export const addLink = async (linkData) => {
    try {
      const response = await apiClient.post(`/links/add/`, linkData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      Swal.fire("Success!", "Link added successfully!", "success");
      
      return response.data.data; // Pastikan sesuai dengan respons backend
    } catch (error) {
      console.error("Failed to create link:", error);
  
      // Tampilkan error dari backend jika ada
      const errorMessage = error.response?.data?.message || "Failed to add the link!";
      Swal.fire("Error!", errorMessage, "error");
  
      throw error;
    }
  };

// ✅ Update an existing link
export const updateLink = async (id, linkData) => {
  try {
    const response = await apiClient.post(`/links/update/${id}`, linkData);
    showSuccess('Link updated successfully!');
    return response.data.links;
  } catch (error) {
    console.error('Failed to update link:', error);
    showError('Failed to update the link!');
    throw error;
  }
};

// ✅ Delete a link
export const deleteLink = async (id) => {
  try {
    await apiClient.delete(`/links/delete/${id}`);
    showSuccess('Link deleted successfully!');
    return true;
  } catch (error) {
    console.error('Failed to delete link:', error);
    showError('Failed to delete the link!');
    return false;
  }
};

// ✅ Update status of a link
export const updateLinkStatus = async (id, currentStatus) => {
    try {
      const response = await apiClient.post(`/links/status/${id}`, {
        is_active: currentStatus, // Kirim nilai saat ini
      });
  
      showSuccess("Link status updated successfully!");
      return response.data.link;
    } catch (error) {
      console.error("Failed to update link status:", error);
  
      const errorMessage =
        error.response?.data?.message || "Failed to update the link status!";
      showError(errorMessage);
  
      throw error;
    }
  };
  