import React, { useState, useEffect } from 'react';
import styles from '../../styles/EditLinkModal.module.css';
import { updateAffiliateUrl } from '../../../api/affiliate/AffiliateUrl';

const CustomizeUrl = ({ isOpen, onClose, formData, setFormData, userId, refreshAffiliate }) => {
  const baseUrl = "http://localhost:3000/user/bara-link-aggregation/";

  const handleChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith(baseUrl)) {
      return;
    }

    // Ambil bagian nama yang bisa diedit
    const updatedName = value.replace(baseUrl, "");

    setFormData({
      ...formData,
      affiliate_name: updatedName,
      // affiliate_url: `${baseUrl}${updatedName}`
    });
  }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      affiliate_name: formData.affiliate_name,
    }

    const response = await updateAffiliateUrl(userId, updatedData, refreshAffiliate);
    if (response) {
      onClose();
    }

  }

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
              value={`${baseUrl}${formData.affiliate_name}`}
              // onChange={(e) => setFormData({ ...formData, affiliate_url: e.target.value })}
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

export default CustomizeUrl;