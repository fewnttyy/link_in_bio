'use client'
import { useEffect, useState } from 'react';
import styles from '../../styles/ModalSettings.module.css';
import VerificationCodeModal from '../modal/VerificationModal';
import { updateEmail } from '../../../api/settings_api/changeEmail'

export default function ChangeEmailModal({ onClose, currentEmail }) {
  const [showVerification, setShowVerification] = useState(false);
  const [email, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");

  useEffect(() => {
    setCurrentEmail(currentEmail);
  }, [currentEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEmail) {
      setErrorEmail("New email cannot be empty!");
      return;
    }


    setLoadingEmail(true);
    setErrorEmail("");

    try {
      const response = await updateEmail({ new_email: newEmail });

      if (response) {
        setShowVerification(true);
      } else {
        setErrorEmail("Failed to update email");
      }

    } catch (error) {
      setError("An error occurred while updating the email.");
    }

    setLoadingEmail(false);

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
              defaultValue={email}
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

          {errorEmail && <p className={styles.errorText}>{errorEmail}</p>}

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
              disabled={loadingEmail}
            >
              {loadingEmail ? "Changing..." : "Change Email"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}