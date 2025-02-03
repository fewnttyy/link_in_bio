import apiClient from "../apiClient";
import Swal from "sweetalert2";

export const fetchCategories = async (setCategories, setLoading, setError) => {
  // try {
  //   setLoading(true);

  //   const token = Cookies.get("token");
  //   console.log(token);
  //   if (!token) {
  //     setError("Token tidak ditemukan. Harap login ulang.");
  //     setLoading(false);
  //     return;
  //   }

  //   const response = await apiClient.get("/categories", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });

  //   console.log(response.data);
  //   if (response.data.status) {
  //     setCategories(response.data.categories);
  //   } else {
  //     setError(response.data.message);
  //   }
  // } catch (err) {
  //   setError("Failed to fetch category data.");
  //   console.error(err);
  // } finally {
  //   setLoading(false);
  // }

  try {
    setLoading(true);
    const response = await apiClient.get("/categories");

    // console.log("Response Data:", response.data); 

    if (response.data.status) {
      setCategories(response.data.categories);
    } else {
      setError(response.data.message);
    }
  } catch (err) {
    console.error("Axios Error:", err);
    if (err.response) {
      console.error("Response Data:", err.response.data);
      console.error("Status Code:", err.response.status);
      setError(`Error ${err.response.status}: ${err.response.data.message}`);
    } else if (err.request) {
      console.error("No response received:", err.request);
      setError("Tidak ada respons dari server. Periksa koneksi.");
    } else {
      console.error("Error:", err.message);
      setError("Terjadi kesalahan tak terduga.");
    }
  } finally {
    setLoading(false);
  }
};

export const addCategory = async (categoryName, refreshCategories) => {
  if (!categoryName.trim()) {
    Swal.fire("Oops!", "Please enter a category name", "warning");
    return;
  }

  try {
    const response = await apiClient.post("/categories/add", {
      category_name: categoryName,
    });

    if (response.data.status) {
      Swal.fire("Success!", "Category added successfully!", "success");
      refreshCategories();
    } else {
      Swal.fire("Error!", response.data.message || "Failed to add category!", "error");
    }

  } catch (error) {
    Swal.fire("Error!", "Failed to add category!", "error");
    console.error(error);
  }
};

export const editCategory = async (formData, refreshCategories, closeModal) => {
  try {
    const response = await apiClient.put(`/categories/update/${formData.id}`, {
      category_name: formData.category_name,
    });

    if (response.data.status) {
      Swal.fire("Success!", "Category updated successfully!", "success");
      refreshCategories();
      closeModal();
    } else {
      Swal.fire("Error!", response.data.message || "Failed to update category!", "error");
    }

  } catch (error) {
    Swal.fire("Error!", "Failed to update category!", "error");
    console.error(error);
  }
};

export const deleteCategory = async (id, refreshCategories) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await apiClient.delete(`/categories/delete/${id}`);
        Swal.fire("Deleted!", "Category has been deleted.", "success");
        refreshCategories();

      } catch (error) {
        Swal.fire("Error!", "Failed to delete category!", "error");
        console.error(error);
      }
    }
  });
};  