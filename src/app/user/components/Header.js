'use client'
import api from "../../api";
import React, { useState, useRef, useEffect } from 'react'
import styles from '../styles/Header.module.css'
import { Poppins } from 'next/font/google';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import logoutUser from "../../api/auth/logout";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Header({ toggleSidebar }) {
  const router = useRouter();

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, []);

  const handleLogout = async () => {
    const token = Cookies.get("token");

    if (!token) {
      console.error("Token tidak ditemukan. Pastikan sudah login.");
      toast.error("Anda belum login!");
      return;
    }

    try {
      const response = await logoutUser();

      if (response.success) {
        // Hapus token dari cookie atau localStorage
        Cookies.remove("role");
        Cookies.remove("token");
        Cookies.remove("XSRF-TOKEN");

        toast.success("Logout berhasil!");

        // Redirect ke halaman login
        router.push("/login");
      } else {
        toast.error(response.message || "Terjadi kesalahan saat logout.");
      }

    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal logout. Silakan coba lagi.");
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <button className={styles.hamburger} onClick={toggleSidebar}>
          ☰
        </button>
        {/* <h2>Dashboard</h2> */}
        <div className={styles.headerActions}>
          <div className={styles.profileContainer} ref={dropdownRef}>
            <img
              src="/images/avatar.jpg"
              alt="Profile"
              className={styles.avatar}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            {isProfileOpen && (
              <div className={styles.profileDropdown}>
                <div className={styles.profileHeader}>
                  <div className={styles.profileInfo}>
                    <p className={styles.profileName}>Fenty Solihah</p>
                    <p className={styles.profileEmail}>fenttyyaa@gmail.com</p>
                  </div>
                </div>
                <ul>
                  <li>
                    <button onClick={handleLogout} className={styles.dropdownItem}>
                      <span>🚪</span> Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
