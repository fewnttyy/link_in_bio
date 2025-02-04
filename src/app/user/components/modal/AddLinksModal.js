"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "../../styles/Page.module.css";
import { addLink } from "../../../api/links/Links";
import { fetchCategories } from "../../../api/category/Category";
import swal from "sweetalert2";

const AddLinksModal = ({ isModalOpen, closeModal, refreshLinks }) => {
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
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validasi jenis file
    if (
      (formData.mediaType === "image" && !file.type.startsWith("image/")) ||
      (formData.mediaType === "video" && !file.type.startsWith("video/"))
    ) {
      swal.fire("Invalid File", "Please upload a valid media file", "error");
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({ ...prev, mediaFile: file }));

    // Hapus preview sebelumnya untuk menghindari memory leak
    if (preview) URL.revokeObjectURL(preview);
    
    // Tampilkan preview hanya jika media adalah gambar
    if (formData.mediaType === "image") {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  }, [formData.mediaType, preview]);

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
              {["image", "video", "noMedia"].map((type) => (
                <label key={type}>
                  <input
                    type="radio"
                    name="mediaType"
                    value={type}
                    checked={formData.mediaType === type}
                    onChange={handleMediaTypeChange}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {formData.mediaType !== "noMedia" && (
            <div className={styles.formGroup}>
              <label>Upload Media</label>
              <div className={styles.mediaUpload}>
                <input
                  type="file"
                  accept={formData.mediaType === "image" ? "image/*" : "video/*"}
                  onChange={handleFileChange}
                />
                {preview && formData.mediaType === "image" && (
                  <img src={preview} alt="Preview" className={styles.mediaPreview} />
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
