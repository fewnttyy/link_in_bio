import React, { useState, useEffect } from 'react';
import styles from '@/app/user/styles/EditLinkModal.module.css';

const CustomizeUrl = ({ isOpen, onClose, formData, setFormData, onSave }) => {
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
      affiliate_url: ''
    });
    setPreview(null);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.fadeIn : styles.fadeOut}`}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Customize Your Link</h2>
          <button onClick={onClose} className={styles.closeButton}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="affiliate_url">Your Link</label>
            <input
              type="text"
              id="affiliate_url"
              name="affiliate_url"
              value={formData.affiliate_url}
              onChange={(e) => setFormData({ ...formData, affiliate_url: e.target.value })}
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

export default CustomizeUrl;