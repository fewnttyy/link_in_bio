import React, { useState, useEffect } from 'react';
import styles from '../styles/EditLinkModal.module.css';

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
    onSave(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.fadeIn : styles.fadeOut}`}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Edit Category</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="category_name">Category Name</label>
            <input
              type="text"
              id="category_name"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
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