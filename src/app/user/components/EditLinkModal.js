import React, { useState, useEffect } from 'react';
import styles from '../styles/EditLinkModal.module.css';

const EditLinkModal = ({ isOpen, onClose, formData, setFormData, onSave }) => {
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
      // Check if media type is video and file is a video
      if (formData.mediaType === 'video') {
        if (!file.type.startsWith('video/')) {
          alert('Please upload a video file');
          e.target.value = ''; // Clear the file input
          return;
        }
      }
      
      // Check if media type is image and file is an image
      if (formData.mediaType === 'image') {
        if (!file.type.startsWith('image/')) {
          alert('Please upload an image file');
          e.target.value = ''; // Clear the file input
          return;
        }
      }
      
      setFormData({ ...formData, mediaFile: file });
      
      // Only create preview for images
      if (formData.mediaType === 'image') {
        const url = URL.createObjectURL(file);
        setPreview(url);
      } else {
        setPreview(null);
      }
    }
  };

  const handleMediaTypeChange = (e) => {
    const newMediaType = e.target.value
    
    // If "No Media" is selected, clear the media file and preview
    if (newMediaType === 'noMedia') {
      setFormData({
        ...formData,
        mediaType: newMediaType,
        mediaFile: null
      })
      // Clear the preview and revoke the object URL to prevent memory leaks
      if (preview) {
        URL.revokeObjectURL(preview)
        setPreview(null)
      }
    } else {
      setFormData({
        ...formData,
        mediaType: newMediaType
      })
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    setIsModalOpen(false)
    setFormData({
      title: '',
      mediaType: 'image',
      mediaFile: null,
      link: '',
      description: ''
    })
    // Clean up preview URL when form is submitted
    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }
  }

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
          <h2>Edit Link</h2>
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

          {/* Category Select */}
          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              <option value="Education">Education</option>
              <option value="Technology">Technology</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Health">Health</option>
            </select>
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
                  onChange={handleMediaTypeChange}
                />
                Image
              </label>
              <label>
                <input
                  type="radio"
                  name="mediaType"
                  value="video"
                  checked={formData.mediaType === 'video'}
                  onChange={handleMediaTypeChange}
                />
                Video
              </label>
              <label>
                <input
                  type="radio"
                  name="mediaType"
                  value="noMedia"
                  checked={formData.mediaType === 'noMedia'}
                  onChange={handleMediaTypeChange}
                />
                Delete Media
              </label>
            </div>
          </div>

          {formData.mediaType !== 'noMedia' && (
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
                {formData.mediaType === 'video' && formData.mediaFile && (
                  <div className={styles.videoInfo}>
                    <p>Video selected: {formData.mediaFile.name}</p>
                    <p>Size: {(formData.mediaFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                )}
              </div>
            </div>
          )}

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

export default EditLinkModal;
