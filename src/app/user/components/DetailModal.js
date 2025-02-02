'use client'
import styles from '../styles/ModalSettings.module.css'

export default function DetailModal({ onClose }) {
  // Sample media type - in real implementation this would come from props
  const mediaType = "image"; // or "video"
  
  return (
    <div className={styles.modalOverlay} style={{padding: '20px'}}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Link Information</h3>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>Title</label>
            <input 
              type="text"
              className={styles.input}
              placeholder="Link title"
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label>Category</label>
            <input 
              type="text"
              className={styles.input}
              placeholder="Link category"
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label>Media</label>
            <div className={styles.mediaContainer}>
              {mediaType === "image" ? (
                <img 
                  src="/path-to-image.jpg"
                  alt="Media content"
                  className={styles.mediaContent}
                  style={{
                    pointerEvents: 'none', // Prevent drag and interaction
                    userSelect: 'none' // Prevent selection
                  }}
                />
              ) : (
                <video 
                  className={styles.mediaContent}
                  controls={false} // Remove video controls
                  style={{
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  <source src="/path-to-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Link</label>
            <input 
              type="text"
              className={styles.input}
              placeholder="URL"
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label>Description</label>
            <input 
              type="text"
              className={styles.input}
              placeholder="Link description"
              readOnly
            />
          </div>

          <div className={styles.buttonGroup}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}