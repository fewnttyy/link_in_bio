'use client'
import React, { useState } from 'react';
import styles from '../../styles/ModalSettings.module.css';

export default function DeleteAccountModal({ onClose }) {
  const [deleteText, setDeleteText] = useState('');
  const [reason, setReason] = useState('');

  const handleDelete = () => {
    if (deleteText.toLowerCase() === 'destroy') {
      // Handle account deletion logic here
      console.log('Account deleted');
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Is it something we said?</h3>
          <button 
            className={styles.closeButton}
            onClick={onClose}
          >
            ×
          </button>
        </div>
        
        <p className={styles.modalText}>
          We're really sad to see you leave, and want you to know that you can come back anytime!
        </p>

        <div className={styles.reasonSection}>
          <label className={styles.radioContainer}>
            <input
              type="radio"
              name="reason"
              value="autopost"
              checked={reason === 'autopost'}
              onChange={(e) => setReason(e.target.value)}
            />
            I don't like that it doesn't post automatically
          </label>

          <label className={styles.radioContainer}>
            <input
              type="radio"
              name="reason"
              value="confusing"
              checked={reason === 'confusing'}
              onChange={(e) => setReason(e.target.value)}
            />
            I find Baralynk to be too confusing/difficult to use
          </label>

          <label className={styles.radioContainer}>
            <input
              type="radio"
              name="reason"
              value="switching"
              checked={reason === 'switching'}
              onChange={(e) => setReason(e.target.value)}
            />
            I am switching to another scheduling platform
          </label>

          <label className={styles.radioContainer}>
            <input
              type="radio"
              name="reason"
              value="other"
              checked={reason === 'other'}
              onChange={(e) => setReason(e.target.value)}
            />
            Other
          </label>
        </div>

        <textarea
          className={styles.feedback}
          placeholder="Is there anything you'd like to tell us?"
          rows={4}
        />

        <div className={styles.warningSection}>
          <p className={styles.warning}>
            <strong>Important:</strong> If you delete your Baralynk account, all uploaded media, scheduled posts, 
            and account data will be removed from Baralynk. Type in the word 'destroy' if you're absolutely sure you want to delete your account.
          </p>

          <input
            type="text"
            className={styles.confirmInput}
            value={deleteText}
            onChange={(e) => setDeleteText(e.target.value)}
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
                onClick={handleDelete}
                disabled={deleteText.toLowerCase() !== 'destroy'}
            >
                Delete your account
            </button>
        </div>
      </div>
    </div>
  );
}