"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "../../styles/Page.module.css";
import { addLink } from "../../../api/links/Links";
import { fetchCategories } from "../../../api/category/Category";
import swal from "sweetalert2";

const AddLinksModal = ({ isModalOpen, closeModal, refreshLinks, refreshLinksActive }) => {
  if (!isModalOpen) return null;

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    id_category: "",
    mediaType: "image",
    mediaFile: null,
    links_url: "",
    description: "",
  });

  // Mengatur preview file yang diunggah
  const handleFileChange = (e) => {
    const file = e.target.files[0];
  
    if (file) {
      if (formData.mediaType === "video" && file.type.startsWith("video/")) {
        const url = URL.createObjectURL(file);
        setPreview(url); // Untuk video preview
        setFormData({ ...formData, mediaFile: file });
      } else if (formData.mediaType === "image" && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreview(url); // Untuk image preview
        setFormData({ ...formData, mediaFile: file });
      } else {
        alert("Please upload the correct file type!");
        e.target.value = ""; // Clear input jika file tidak sesuai
      }
    }
  };  

  // Mengubah jenis media
  const handleMediaTypeChange = (e) => {
    const newMediaType = e.target.value;

    if (newMediaType === "noMedia") {
      setFormData({
        ...formData,
        mediaType: newMediaType,
        mediaFile: null,
      });

      if (preview) {
        URL.revokeObjectURL(preview);
        setPreview(null);
      }
    } else {
      setFormData({ ...formData, mediaType: newMediaType });
    }
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const linkData = new FormData();
    linkData.append("title", formData.title);
    linkData.append("id_category", formData.id_category);
    linkData.append("links_url", formData.links_url);
    linkData.append("description", formData.description);

    if (formData.mediaType === "image" && formData.mediaFile) {
      linkData.append("image_url", formData.mediaFile);
    }
    if (formData.mediaType === "video" && formData.mediaFile) {
      linkData.append("video_url", formData.mediaFile);
    }

    try {
      await addLink(linkData);
      closeModal(); // Tutup modal setelah berhasil
      refreshLinks(); // Refresh daftar link
      refreshLinksActive();
    } catch (error) {
      console.error("Failed to add link:", error);
    }
  };

  useEffect(() => {
    fetchCategories(setCategories, setLoading, setError);
  }, []);

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add New Link</h2>
          <button onClick={closeModal} className={styles.closeButton}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select
              id="id_category"
              name="id_category"
              value={formData.id_category}
              className={styles.urlInput}
              onChange={(e) =>
                setFormData({ ...formData, id_category: e.target.value })
              }
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

          {formData.mediaType !== "noMedia" && (
            <div className={styles.formGroup}>
            <label>Upload Media</label>
            <div
              className={styles.mediaUpload}
              onClick={() => document.getElementById("mediaUploadInput").click()} // Trigger klik input file saat div diklik
            >
              <input
                type="file"
                accept={formData.mediaType === "image" ? "image/*" : "video/*"}
                onChange={handleFileChange}
                style={{ display: "none" }} // Sembunyikan input file
                id="mediaUploadInput"
              />
          
              {/* Preview Gambar */}
              {preview && formData.mediaType === "image" && (
                <img src={preview} alt="Preview" className={styles.mediaPreview} />
              )}
          
              {/* Preview Video */}
              {preview && formData.mediaType === "video" && (
                <video
                  src={preview}
                  controls
                  className={styles.mediaPreview}
                  onClick={(e) => e.stopPropagation()}
                >
                  Your browser does not support the video tag.
                </video>
              )}
          
              {/* Placeholder Jika Belum Ada Media */}
              {!preview && (
                <div className={styles.placeholder}>
                  Click to upload media
                </div>
              )}
            </div>
          </div>                   
          )}

        <div className={styles.formGroup}>
            <label htmlFor="link">Link</label>
            <input
                type="url"
                id="links_url"
                name="links_url"
                placeholder="Enter full URL (e.g., https://website.com)"
                value={formData.links_url}
                onChange={(e) => setFormData({ ...formData, links_url: e.target.value })}
                required
            />
        </div>

        <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                placeholder="Add a link description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
            />
        </div>

          <div className={styles.modalActions}>
            <button type="button" onClick={closeModal} className={styles.cancelButton}>
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

export default AddLinksModal;
