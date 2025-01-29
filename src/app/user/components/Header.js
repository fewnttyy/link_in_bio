'use client'
import React, { useState, useRef, useEffect } from 'react'
import styles from '@/app/user/styles/Header.module.css'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function Header({ toggleSidebar }) {
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
  }, [])

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
                    <button onClick={() => alert('Logging out...')} className={styles.dropdownItem}>
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
