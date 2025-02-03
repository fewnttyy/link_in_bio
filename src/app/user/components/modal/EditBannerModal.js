import React, { useState, useEffect } from 'react';
import styles from '../../styles/EditLinkModal.module.css';

const EditBannerModal = ({ isOpen, onClose, formData, setFormData, onSave }) => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, mediaFile: file });
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave();
    setFormData({
      title: '',
      mediaType: 'image',
      mediaFile: null,
      link: '',
      description: '',
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
          <h2>Edit Banner</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          {/* Title Input */}
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Media Type */}
          <div className={styles.formGroup}>
            <label>Media Type</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="mediaType"
                  value="image"
                  checked={formData.mediaType === 'image'}
                  onChange={(e) => setFormData({ ...formData, mediaType: e.target.value })}
                />
                Image
              </label>
            </div>
          </div>

          {/* Upload Media */}
          <div className={styles.formGroup}>
            <label>Upload Media</label>
            <div className={styles.mediaUpload}>
              <input
                type="file"
                accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileChange}
              />
              {preview && formData.mediaType === 'image' && (
                <img src={preview} alt="Preview" className={styles.mediaPreview} />
              )}
            </div>
          </div>

          {/* Link Input */}
          <div className={styles.formGroup}>
            <label htmlFor="link">Link</label>
            <input
              type="url"
              id="link"
              placeholder="Enter full URL (e.g., https://website.com)"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              required
            />
          </div>

          {/* Description Input */}
          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Add a link description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
            />
          </div>

          {/* Actions */}
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

export default EditBannerModal;
