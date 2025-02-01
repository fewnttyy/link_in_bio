'use client'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'
import styles from '../styles/Sidebar.module.css'

export default function Sidebar({ isVisible }) {
  const router = useRouter()
  const pathname = usePathname()

  const navigateToPage = (path) => {
    router.push(path)
  }

  return (
    <aside className={`${styles.sidebar} ${isVisible ? styles.visible : styles.hidden}`}>
      <div className={styles.logo}>
        <img src="/images/logo-fix.jpg" alt="Lynku.id" />
        <span>Baralynk.id</span>
      </div>

      <nav className={styles.navigation}>
        <div className={styles.section}>
          <h3>Main</h3>
          <ul>
            <li>
              <a
                href="#"
                onClick={() => navigateToPage('/user/main/dashboard')}
                className={`${styles.menuItem} ${pathname === '/user/main/dashboard' ? styles.active : ''}`}
              >
                <span className={styles.icon}>🏠</span>
                Dashboard
              </a>
            </li>
            {/* <li>
              <a
                href="#"
                onClick={() => navigateToPage('/user/main/analytics')}
                className={`${styles.menuItem} ${pathname === '/user/main/analytics' ? styles.active : ''}`}
              >
                <span className={styles.icon}>📈</span>
                Analytics
              </a>
            </li> */}
          </ul>
        </div>

        <div className={styles.section}>
          <h3>Links</h3>
          <ul>
            <li>
              <a
                href="#"
                onClick={() => navigateToPage('/user/links/link-in-bio')}
                className={`${styles.menuItem} ${pathname === '/user/links/link-in-bio' ? styles.active : ''}`}
              >
                <span className={styles.icon}>🔗</span>
                Link In Bio
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Setup</h3>
          <ul>
            <li>
              <a
                href="#"
                onClick={() => navigateToPage('/user/settings')}
                className={`${styles.menuItem} ${pathname === '/user/settings' ? styles.active : ''}`}
              >
                <span className={styles.icon}>⚙️</span>
                Settings
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.section}>
          <h3>Inbox</h3>
          <ul>
            <li>
              <a
                href="#"
                onClick={() => navigateToPage('/user/messages')}
                className={`${styles.menuItem} ${pathname === '/user/messages' ? styles.active : ''}`}
              >
                <span className={styles.icon}>💌</span>
                Messages
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}
