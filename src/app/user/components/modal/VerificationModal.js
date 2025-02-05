import { useState } from 'react';
import styles from '../../styles/ModalSettings.module.css';
import { verifyOtpEmail } from '../../../api/settings_api/changeEmail';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function VerificationCodeModal({ onClose, newEmail }) {
  const router = useRouter();

  const [codeOtp, setCodeOtp] = useState('');
  // const [newEmail, setNewEmail] = useState('');
  const [loadingCodeOtp, setLoadingCodeOtp] = useState(false);
  const [errorCodeOtp, setErrorCodeOtp] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingCodeOtp(true);

    try {
      const response = await verifyOtpEmail(newEmail, codeOtp);
      if (response && response.status) {
        // Tampilkan SweetAlert jika OTP berhasil diverifikasi
        Swal.fire({
          icon: "success",
          title: "Verifikasi Berhasil",
          text: "Anda akan dialihkan ke halaman login dalam 5 detik.",
          timer: 5000,
          timerProgressBar: true,
          showConfirmButton: false,
          willOpen: () => {
            const progressBar = document.querySelector(".swal2-timer-progress-bar");
            if (progressBar) {
              progressBar.style.backgroundColor = "#BEDAFF";
              progressBar.style.height = "8px";
              progressBar.style.borderRadius = "4px";
            }
          },
          // customClass: {
          //   popup: 'custom-swal-verify',
          //   timerProgressBar: 'custom-progress-verify'
          // }
        });

        setTimeout(() => {
          onClose();
          router.push("/login");
        }, 5000);

      } else {
        Swal.fire({
          icon: "error",
          title: "Verifikasi Gagal",
          text: "Kode OTP tidak valid. Silakan coba lagi.",
        });
        setErrorCodeOtp("Invalid OTP. Please try again.");
      }

    } catch (error) {
      setErrorCodeOtp("An error occurred while updating the email.");
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Terjadi kesalahan saat memverifikasi email.",
      });
    }

    setLoadingCodeOtp(false);
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
                onChange={(e) => setCodeOtp(e.target.value)}
                required
              />
            </div>
          </div>

          {errorCodeOtp && <p className={styles.errorText}>{errorCodeOtp}</p>}

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
              disabled={loadingCodeOtp}
            >
              {loadingCodeOtp ? "Verifying..." : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}