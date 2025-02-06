'use client'
import { useState } from 'react'
import styles from '../../styles/ModalSettings.module.css'
import { updatePassword } from '../../../api/settings_api/changePassword'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

export default function ChangePasswordModal({ onClose }) {
  const router = useRouter();

  const [loadingPassword, setLoadingPassword] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");

  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirmation: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoadingPassword(true);
    setErrorPassword("");

    // if (passwords.currentPassword.length < 8) {
    //   setErrorPassword("Password saat ini harus minimal 8 karakter.");
    //   return;
    // }

    // if (passwords.newPassword.length < 8) {
    //   setErrorPassword("Password baru harus minimal 8 karakter.");
    //   return;
    // }

    // if (passwords.newPassword !== passwords.newPasswordConfirmation) {
    //   setErrorPassword("Konfirmasi password tidak cocok.");
    //   return;
    // }

    try {
      const response = await updatePassword(
        passwords.currentPassword,
        passwords.newPassword,
        passwords.newPasswordConfirmation
      );

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
        const errorMessage = response?.message || "Password gagal diubah. Silakan coba lagi.";
        // const errorMessage = "Password gagal diubah. Silakan coba lagi.";

        // if (response?.errors) {
        //   const errorDetails = Object.values(response.errors)[0]; // Ambil error pertama dari array
        //   errorMessage = errorDetails?.[0] || errorMessage;  // Ambil pesan error pertama
        // }

        // console.log(response);
        Swal.fire({
          icon: "error",
          title: "Verifikasi Gagal",
          text: errorMessage,
        });
        setErrorPassword(errorMessage);
      }
    } catch (err) {

      console.error("Axios Error:", err);
      if (err.response) {
        console.error("Response Data:", err.response.data);
        console.error("Status Code:", err.response.status);
        setErrorPassword(`Error ${err.response.status}: ${err.response.data.message}`);
      } else if (err.request) {
        console.error("No response received:", err.request);
        setErrorPassword("Tidak ada respons dari server. Periksa koneksi.");
      } else {
        console.error("Error:", err.message);
        setErrorPassword("Terjadi kesalahan tak terduga.");
      }

      // setErrorPassword("An error occurred while updating the password.");
      // Swal.fire({
      //   icon: "error",
      //   title: "Terjadi Kesalahan",
      //   text: "Terjadi kesalahan saat mengupdate password.",
      // });
    }

    setLoadingPassword(false);
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
              value={passwords.currentPassword || ""}
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
              value={passwords.newPassword || ""}
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
              value={passwords.newPasswordConfirmation || ""}
              onChange={(e) => setPasswords({
                ...passwords,
                newPasswordConfirmation: e.target.value
              })}
              className={styles.input}
              placeholder="Confirm new password"
              required
            />
          </div>

          {errorPassword && <p className={styles.errorText}>{errorPassword}</p>}

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
              {loadingPassword ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}