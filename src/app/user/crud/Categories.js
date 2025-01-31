import React, { useState, useEffect } from "react";
import api from "@/app/api";
import styles from '@/app/user/styles/Page.module.css'
import EditCategoryModal from '@/app/user/components/EditCategoryModal'

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  const [isEditCategoryOpen, setIsEditCategoryOpen] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState({
    id: null,
    category_name: ""
  });

//   const getUserId = () => {
//     // Adjust this according to how you store the user ID
//     const user = JSON.parse(localStorage.getItem('user'));
//     return user?.id;
//   };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    
    if (!newCategoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      // Tambahkan pengecekan user
      const userString = localStorage.getItem('user');
      if (!userString) {
        alert("Please login first");
        return;
      }

      const user = JSON.parse(userString);
      if (!user || !user.id) {
        alert("User data is invalid");
        return;
      }

      const response = await api.post("/categories/add", {
        category_name: newCategoryName,
        id_user: user.id
      });

      if (response.data.status) {
        setNewCategoryName(""); // Clear input
        fetchCategories(); // Refresh list
        alert("Category added successfully!");
      } else {
        alert(response.data.message || "Failed to add category!");
      }
    } catch (error) {
      alert("Failed to add category!");
      console.error(error);
    }
  };

  const openEditCategory = (category) => {
    setEditCategoryData({
      id: category.id,
      category_name: category.category_name
    });
    setIsEditCategoryOpen(true);
  };

  const closeEditCategory = () => {
    setIsEditCategoryOpen(false);
    setEditCategoryData({ id: null, category_name: "" });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      if (response.data.status) {
        setCategories(response.data.categories);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError("Gagal mengambil data kategori");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCategory = async (formData) => {
    try {
      const response = await api.put(`/categories/update/${formData.id}`, {
        category_name: formData.category_name
      });
      
      if (response.data.status) {
        alert("Kategori berhasil diperbarui!");
        fetchCategories(); // Refresh the categories list
        closeEditCategory();
      } else {
        alert(response.data.message || "Gagal memperbarui kategori!");
      }
    } catch (error) {
      alert("Gagal memperbarui kategori!");
      console.error(error);
    }
  };
  
  const deleteCategory = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kategori ini?")) return;
  
    try {
      await api.delete(`/categories/delete/${id}`);
      alert("Kategori berhasil dihapus!");
      fetchCategories(); // Refresh daftar kategori
    } catch (error) {
      alert("Gagal menghapus kategori!");
      console.error(error);
    }
  };  

  return (
    <div className={styles.linkInputSection}>
        <div className={styles.linkInputContainer}>
            <div className={styles.linkInput}>
                <img src="/images/logo-fix.jpg" alt="Health" className={styles.linkTypeIcon} />
                <input
                    type="text"
                    placeholder="Create new category"
                    className={styles.urlInput}
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
            </div>
            <button className={styles.addLinkButton} onClick={handleAddCategory}>
                + Add New Category
            </button>
        </div>

        <br></br>
        <h2 className={styles.sectionTitle}>Categories</h2>

        <div className={styles.searchContainer}>
            <div className={styles.search}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                type="text"
                placeholder="Search"
                className={styles.urlInput}
                />
            </div>
            <button className={styles.searchButton}>
                Search
            </button>
        </div>

        {/* Categories Item */}
        {loading ? (
        <p>Loading...</p>
        ) : error ? (
        <p style={{ color: "red", marginTop: "20px" }}>{error}</p>
        ) : (
        <div>
            {categories.length === 0 ? (
            <p>Tidak ada kategori.</p>
            ) : (
            categories.map((category) => (
                <div key={category.id} className={styles.linkItem}>
                <div className={styles.linkItemLeft}>
                    <span className={styles.menuIcon}>⋮</span>
                    <div className={styles.linkIcon}>📦</div>
                    <div className={styles.linkDetails}>
                    <span className={styles.linkTitle}>{category.category_name}</span>
                    </div>
                </div>
                <div className={styles.linkToggle}>
                    <div className={styles.blockActions}>
                    <button onClick={() => openEditCategory(category)}>✏️</button>
                    <button onClick={() => deleteCategory(category.id)}>🗑️</button>
                    </div>
                </div>
                </div>
            ))
            )}
        </div>
        )}
        {isEditCategoryOpen && (
            <EditCategoryModal
            isOpen={isEditCategoryOpen}
            onClose={closeEditCategory}
            formData={editCategoryData}
            setFormData={setEditCategoryData}
            onSave={handleEditCategory}
            />
        )}
    </div>
  );
};

export default Categories;