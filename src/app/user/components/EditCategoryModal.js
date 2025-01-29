import React, { useState, useEffect } from 'react';
import styles from '@/app/user/styles/EditLinkModal.module.css';

const EditCategoryModal = ({ isOpen, onClose, formData, setFormData, onSave }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timeout = setTimeout(() => setIsVisible(false), 500); // Tunggu animasi selesai
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
    setFormData({
      category_name: ''
    });
    setPreview(null);
    onClose();
  };

  // const saveEdit = async () => {
  //   try {
  //     // Kirim data yang telah diedit ke server melalui API
  //     await fetch(`/api/links/${editFormData.id}`, {
  //       method: 'PUT', // Gunakan PUT atau PATCH sesuai kebutuhan
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(editFormData),
  //     });

  //     // Perbarui daftar link di UI setelah berhasil disimpan
  //     fetchLinks();
  //     closeEditModal();
  //   } catch (error) {
  //     console.error('Error saving link:', error);
  //   }
  // };
  
  // Ambil data link dari API saat komponen dimuat
  // useEffect(() => {
  //   fetchLinks();
  // }, []);

  // const fetchLinks = async () => {
  //   try {
  //     const response = await fetch('/api/links'); // Ganti endpoint sesuai API Anda
  //     const data = await response.json();
  //     setLinks(data); // Data yang diterima harus berupa array
  //   } catch (error) {
  //     console.error('Error fetching links:', error);
  //   }
  // };

  if (!isVisible) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.fadeIn : styles.fadeOut}`}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Edit Category</h2>
          <button onClick={onClose} className={styles.closeButton}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="category_name">Category Name</label>
            <input
              type="text"
              id="category_name"
              name="category_name"
              value={formData.category_name}
              onChange={(e) => setFormData({ ...formData, category_name: e.target.value })}
              required
            />
          </div>
          
          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;