'use client'
import { useState } from 'react';
import styles from '../styles/Settings.module.css'
import ChangeEmailModal from '../components/ChangeEmailModal'
import ChangePasswordModal from '../components/ChangePasswordModal'
import DeleteAccountModal from '../components/DeleteAccountModal'

export default function PersonalInfo() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className={styles.container}>
      {/* <h2 className={styles.title}>Personal Information & Security</h2> */}
      
      <div className={styles.infoSection}>
        {/* <div className={styles.infoRow}>
          <div className={styles.labelSection}>
            <label>Name</label>
            <span className={styles.value}>Fenty</span>
          </div>
          <button className={styles.actionButton}>Edit</button>
        </div> */}

        <div className={styles.infoRow}>
          <div className={styles.labelSection}>
            <label>Email</label>
            <span className={styles.value}>fentygitlab@gmail.com</span>
          </div>
          <button 
            className={styles.actionButton}
            onClick={() => setShowEmailModal(true)}
          >
            Change
          </button>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.labelSection}>
            <label>Change Password</label>
          </div>
          <button 
            className={styles.actionButton}
            onClick={() => setShowPasswordModal(true)}
          >
            Change
          </button>
        </div>

        <div className={styles.infoRow}>
          <div className={styles.labelSection}>
            <label>Leave Baralynk.id</label>
            <span className={styles.value} style={{ color: 'red' }}>Deleting your account will remove all your data</span>
          </div>
          <button 
            className={styles.actionButton}
            onClick={() => setShowDeleteModal(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      {showEmailModal && (
        <ChangeEmailModal 
          onClose={() => setShowEmailModal(false)}
          currentEmail="fentygitlab@gmail.com"
        />
      )}

      {showPasswordModal && (
        <ChangePasswordModal 
          onClose={() => setShowPasswordModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteAccountModal
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
}