'use client'
import { useState } from 'react'
import Layout from './layout'
import styles from '../app/user/styles/Home.module.css'

export default function Page() {
  const [currentPage, setCurrentPage] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigation = (page, e) => {
    e.preventDefault()
    setCurrentPage(page)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <Layout>
      <div className={styles.container}>
        {/* Header & Navigation */}
        <header className={styles.header}>
          <div className={styles.logo}>Baralynk.id</div>

          {/* Hamburger Menu Button */}
          <button className={styles.hamburger} onClick={toggleMenu}>
            <span className={`${styles.hamburgerLine} ${isMenuOpen ? styles.open : ''}`}></span>
          </button>

          {/* Navigation Menu */}
          <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
            <a href="#home" onClick={(e) => handleNavigation('home', e)}>Home</a>
            <a href="#info" onClick={(e) => handleNavigation('info', e)}>Info</a>
            <a href="/login">Login</a>
          </nav>
        </header>

        {/* Page Content */}
        <div className={styles.contentWrapper}>
          <div className={`${styles.pageSlider} ${currentPage === 'info' ? styles.slideLeft : ''}`}>
            {/* Home Page */}
            <main className={styles.main}>
              <div className={styles.content}>
                <h1 className={styles.title}>Maximize Your Link</h1>
                <p className={styles.description}>
                  Combine all your important links in one simple, easy-to-share link. Fast, efficient, and effortless with Baralynk.id.
                </p>
                <button className={styles.button}>Get Started</button>
              </div>
              <div className={styles.illustration}>
                <img src="/images/social_media.png" alt="Customer Service Illustration" />
              </div>
            </main>

            {/* Info Page */}
            <div className={styles.main}>
              <div className={styles.whatWeDo}>
                <h2 className={styles.sectionTitle}>What We Do</h2>
                <p className={styles.sectionSubtitle}>
                  Baralynk helps you unify all your important links in one place, making it easy for your audience to connect with you.
                </p>

                <div className={styles.services}>
                  <div className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>
                      <img src="/images/unique-design.jpg" alt="Unique Design" />
                    </div>
                    <h3>Unique Design</h3>
                    <p>Customize your page with stylish themes and layouts that match your brand.</p>
                  </div>

                  <div className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>
                      <img src="/images/link-management.jpg" alt="Link Management" />
                    </div>
                    <h3>Link Management</h3>
                    <p>Add, edit, and rearrange your links anytime to keep your content fresh and relevant.</p>
                  </div>

                  <div className={styles.serviceCard}>
                    <div className={styles.serviceIcon}>
                      <img src="/images/advanced-analytics.jpg" alt="Advanced Analytics" />
                    </div>
                    <h3>Advanced Analytics</h3>
                    <p>Track clicks and engagement in real-time to optimize your strategy and maximize impact.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
