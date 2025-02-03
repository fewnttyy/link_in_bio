'use client'
import { useState } from 'react'
import styles from '../../styles/ModalSettings.module.css'

export default function ChangePasswordModal({ onClose }) {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password change submitted', passwords);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Change Password</h3>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Current Password</label>
            <input 
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords({
                ...passwords,
                currentPassword: e.target.value
              })}
              className={styles.input}
              placeholder="Enter current password"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>New Password</label>
            <input 
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({
                ...passwords,
                newPassword: e.target.value
              })}
              className={styles.input}
              placeholder="Enter new password"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Confirm New Password</label>
            <input 
              type="password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({
                ...passwords,
                confirmPassword: e.target.value
              })}
              className={styles.input}
              placeholder="Confirm new password"
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
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}