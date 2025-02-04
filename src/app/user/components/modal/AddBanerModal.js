import { useState } from 'react'
import styles from '../../styles/Page.module.css'

const BannersModal = ({ isBannerOpen, closeBanner }) => {
  if (!isBannerOpen) return null;

  const [preview, setPreview] = useState(null)
  const [bannerData, setBannerData] = useState({
      title: '',
      mediaType: 'image',
      mediaFile: null,
      link: '',
      description: ''
    })
  
    const bannerSubmit = (e) => {
      e.preventDefault()
      console.log(bannerData)
      setBannerData({
        title: '',
        mediaType: 'image',
        mediaFile: null,
        link: '',
        description: ''
      })
      setPreview(null)
    }
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
  
      if (file) {
  
        // Check if media type is image and file is an image
        if (bannerData.mediaType === 'image') {
          if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            e.target.value = ''; // Clear the file input
            return;
          }
        }
  
        setBannerData({ ...bannerData, mediaFile: file });
  
        // Only create preview for images
        if (bannerData.mediaType === 'image') {
          const url = URL.createObjectURL(file);
          setPreview(url);
        } else {
          setPreview(null);
        }
      }
    };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2>Add New Banner</h2>
          <button onClick={closeBanner} className={styles.closeButton}>×</button>
        </div>

        <form onSubmit={bannerSubmit} className={styles.modalForm}>
            <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                value={bannerData.title}
                onChange={(e) => setBannerData({ ...bannerData, title: e.target.value })}
                required
            />
            </div>

            <div className={styles.formGroup}>
            <label>Media Type</label>
            <div className={styles.radioGroup}>
                <label>
                <input
                    type="radio"
                    name="mediaType"
                    value="image"
                    checked={bannerData.mediaType === 'image'}
                    onChange={(e) => setBannerData({ ...bannerData, mediaType: e.target.value })}
                />
                Image
                </label>
                {/* <label>
                <input
                    type="radio"
                    name="mediaType"
                    value="video"
                    checked={bannerData.mediaType === 'video'}
                    onChange={(e) => setBannerData({ ...bannerData, mediaType: e.target.value })}
                />
                Video
                </label> */}
            </div>
            </div>

            <div className={styles.formGroup}>
            <label>Upload Media</label>
            <div className={styles.mediaUpload}>
                <input
                type="file"
                accept={bannerData.mediaType === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileChange}
                />
                {preview && bannerData.mediaType === 'image' && (
                <img src={preview} alt="Preview" className={styles.mediaPreview} />
                )}
            </div>
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="link">Link</label>
            <input
                type="url"
                id="link"
                placeholder="Enter full URL (e.g., https://website.com)"
                value={bannerData.link}
                onChange={(e) => setBannerData({ ...bannerData, link: e.target.value })}
                required
            />
            </div>

            <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                placeholder="Add a link description"
                value={bannerData.description}
                onChange={(e) => setBannerData({ ...bannerData, description: e.target.value })}
                rows={4}
            />
            </div>

            <div className={styles.modalActions}>
            <button
                type="button"
                onClick={closeBanner}
                className={styles.cancelButton}
            >
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

export default BannersModal;
