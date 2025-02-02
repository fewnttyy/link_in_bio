import api from "../../api";
import Swal from "sweetalert2";

export const fetchCategories = async (setCategories, setLoading, setError) => {
  try {
    const response = await api.get("/categories");
    if (response.data.status) {
      setCategories(response.data.categories);
    } else {
      setError(response.data.message);
    }
  } catch (err) {
    setError("Failed to fetch category data.");
    console.error(err);
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
    const userString = localStorage.getItem("user");
    if (!userString) {
      Swal.fire("Oops!", "Please login first", "warning");
      return;
    }

    const user = JSON.parse(userString);
    if (!user || !user.id) {
      Swal.fire("Error!", "User data is invalid", "error");
      return;
    }

    const response = await api.post("/categories/add", {
      category_name: categoryName,
      id_user: user.id,
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
    const response = await api.put(`/categories/update/${formData.id}`, {
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
          await api.delete(`/categories/delete/${id}`);
          Swal.fire("Deleted!", "Category has been deleted.", "success");
          refreshCategories(); // 🔥 Pastikan fetchCategories() dipanggil setelah delete
        } catch (error) {
          Swal.fire("Error!", "Failed to delete category!", "error");
          console.error(error);
        }
      }
    });
  };  