import { useState } from 'react';
import styles from '@/app/user/styles/ModalSettings.module.css';
import VerificationCodeModal from '@/app/user/components/VerificationModal';

export default function ChangeEmailModal({ onClose, currentEmail }) {
  const [showVerification, setShowVerification] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowVerification(true);
  };

  if (showVerification) {
    return <VerificationCodeModal onClose={onClose} newEmail={newEmail} />;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Change Email</h3>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Email</label>
            <input 
              type="email"
              defaultValue={currentEmail}
              className={styles.input}
              readOnly
            />
          </div>

          <div className={styles.formGroup}>
            <label>New Email</label>
            <input 
              type="email"
              placeholder="Enter Email"
              className={styles.input}
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
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
              Change Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}