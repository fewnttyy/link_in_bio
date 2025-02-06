"use client";
import { useState, useEffect } from "react";
import styles from '../../styles/EditLinkModal.module.css';
import { fetchCategories } from "../../../api/category/Category";
import { updateLink } from '../../../api/links/Links'; // Sesuaikan path dengan struktur folder Anda

const EditLinkModal = ({ isOpen, onClose, formData, setFormData, refreshLinks, refreshLinksActive }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories(setCategories, setLoading, setError);
  }, []);

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
      const url = URL.createObjectURL(file);
      setFormData({ ...formData, mediaFile: file });
      setPreview(url); // ✅ Preview untuk semua media (gambar/video)
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
  
  const saveEdit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat submit form
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id_affiliate', formData.id_affiliate);
      formDataToSend.append('title', formData.title);
  
      // Hanya append id_category kalau ada isinya
      if (formData.category) {
        formDataToSend.append('id_category', formData.category);
      }
      
      formDataToSend.append('links_url', formData.links_url);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('mediaType', formData.mediaType);
  
      // Jika mediaType adalah image atau video dan ada file yang diupload, append file-nya
      if (formData.mediaType === 'image' && formData.mediaFile) {
        formDataToSend.append('image_url', formData.mediaFile);
      } else if (formData.mediaType === 'video' && formData.mediaFile) {
        formDataToSend.append('video_url', formData.mediaFile);
      }
      // Jangan append field image_url dan video_url untuk "noMedia"
  
      console.log('FormData to be sent:', [...formDataToSend.entries()]);
      await updateLink(formData.id, formDataToSend);
  
      onClose(); // Tutup modal setelah berhasil update
      refreshLinks();
      refreshLinksActive();
    } catch (error) {
      console.error('Error saving link:', error);
      // Pesan error sudah di-handle di fungsi updateLink
    }
  };    
  
  if (!isVisible) return null;

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.fadeIn : styles.fadeOut}`}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Edit Link</h2>
          <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
        <form onSubmit={saveEdit} className={styles.modalForm}>
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
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              
            >
              <option value="">No Category</option>
              {loading ? (
                <option disabled>Loading...</option>
              ) : error ? (
                <option disabled>{error}</option>
              ) : (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))
              )}
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
                No Media
              </label>
            </div>
          </div>

          {formData.mediaType !== 'noMedia' && (
            <div className={styles.formGroup}>
              <label>Upload Media</label>
              <div className={styles.mediaUpload}>
                {/* Input file tersembunyi */}
                <input
                  type="file"
                  accept={formData.mediaType === 'image' ? 'image/*' : 'video/*'}
                  onChange={handleFileChange}
                  style={{ display: 'none' }} // Sembunyikan input file
                  id="mediaUploadInput"
                />
            
                {/* Tampilkan media yang bisa diklik untuk upload */}
                {formData.image_url && !preview && formData.mediaType === 'image' && (
                  <img
                    src={`http://127.0.0.1:8000/storage/${formData.image_url}`}
                    alt="Existing Media"
                    className={styles.mediaPreview}
                    onClick={() => document.getElementById('mediaUploadInput').click()} // Trigger klik input file
                  />
                )}
            
                {formData.video_url && !preview && formData.mediaType === 'video' && (
                  <video
                    controls
                    className={styles.mediaPreview}
                    onClick={() => document.getElementById('mediaUploadInput').click()}
                  >
                    <source src={`http://127.0.0.1:8000/storage/${formData.video_url}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
            
                {/* Preview untuk media baru yang diunggah */}
                {preview && formData.mediaType === 'image' && (
                  <img
                    src={preview}
                    alt="New Preview"
                    className={styles.mediaPreview}
                    onClick={() => document.getElementById('mediaUploadInput').click()}
                  />
                )}
            
                {preview && formData.mediaType === 'video' && (
                  <video
                    controls
                    className={styles.mediaPreview}
                    onClick={() => document.getElementById('mediaUploadInput').click()}
                  >
                    <source src={preview} type="video/mp4" />
                  </video>
                )}
            
                {/* Placeholder jika tidak ada media */}
                {!formData.mediaUrl && !preview && (
                  <div
                    className={styles.placeholder}
                    onClick={() => document.getElementById('mediaUploadInput').click()}
                  >
                    Click to upload media
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
              id="links_url"
              placeholder="Enter full URL (e.g., https://website.com)"
              value={formData.links_url}
              onChange={(e) => setFormData({ ...formData, links_url: e.target.value })}
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

          <div className={styles.formGroup}>
            <label htmlFor="click_count">Click Count</label>
            <input
              type="text"
              id="click_count"
              value={formData.click_count}
              onChange={(e) => setFormData({ ...formData, click_count: e.target.value })}
              required
              readOnly
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
