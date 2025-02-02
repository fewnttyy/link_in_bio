import styles from '../styles/ModalSettings.module.css';

export default function VerificationCodeModal({ onClose, newEmail }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle verification code submission
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Verify Email</h3>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.warningBox}>
          <span className={styles.warningIcon}>✉</span>
          <p>We have sent a verification code to your new email</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Verification Code</label>
            <div className={styles.codeInputContainer}>
              <input
                type="text"
                maxLength="6"
                className={styles.codeInput}
                placeholder="Enter 6-digit code"
                required
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button 
              type="button" 
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className={styles.submitButton}
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}