'use client'
import styles from '@/app/user/styles/Preview.module.css'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import DetailModal from '@/app/user/components/DetailModal'

export default function PreviewPage() {
  const pathname = usePathname()

  const [showDetailModal, setShowDetailModal] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
    
    // Sample banner data - replace with your actual banner data
    const banners = [
      { id: 1, image: "/images/avatar-fix.jpg", alt: "Banner 1" },
      { id: 2, image: "/images/banner-bg-fix.jpg", alt: "Banner 2" },
      // Add more banners as needed
    ];
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    };

    // Auto-slide effect every 3 seconds
    useEffect(() => {
      const slideInterval = setInterval(() => {
        nextSlide();
      }, 3000);

      return () => clearInterval(slideInterval); // Clear interval on component unmount
    }, [banners.length]);

  return (
    <div className={styles.phoneWrapper}>
      <center><div className={styles.phone}>
        <div className={styles.phoneContent}>
          <div className={styles.previewBanner}>
            <img src="/images/avatar.jpg" alt="Profile" className={styles.previewAvatar} />
          </div>
          <div className={styles.previewProfile}>
            <h3>Fenty Solihah</h3>
            <p>Backend Developer | fenttyyaa@gmail.com</p>
          </div>

          {/* Banner Slider */}
          <div className={styles.bannerSlider}>
            <button
              className={styles.sliderButton}
              onClick={prevSlide}
              style={{ left: '10px' }} // Jarak tombol dari sisi kiri
            >
              ←
            </button>
            <div className={styles.bannerContainer}>
              <img
                src={banners[currentSlide].image}
                alt={banners[currentSlide].alt}
                className={styles.bannerImage}
              />
            </div>
            <button
              className={styles.sliderButton}
              onClick={nextSlide}
              style={{ right: '10px' }} // Jarak tombol dari sisi kanan
            >
              →
            </button>
          </div>

          <div className={styles.previewLinks} style={{marginTop: '-15px'}}>
            <div className={styles.selectContainer}>
              <div className={styles.search}>
                <span className={styles.searchIcon}>📦</span>
                <select className={styles.urlInput}>
                  <option value="">Select a category</option>
                  <option value="option1">Social Media</option>
                  <option value="option2">Fashion</option>
                  <option value="option3">Beauty</option>
                </select>
              </div>
            </div>
            <div className={styles.searchContainerPreview}>
              <div className={styles.search}>
                <span className={styles.searchIcon}>🔍</span>
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.urlInput}
                />
              </div>
            </div>
            <div className={styles.previewLink}>
              <div className={styles.previewLinkIcon} style={{ backgroundColor: '#FFB800' }}>🔗</div>
              <span>My website</span>
              <span className={styles.previewArrow} onClick={() => setShowDetailModal(true)}>ⓘ</span>
            </div>
            <div className={styles.previewLink}>
              <div className={styles.previewLinkIcon} style={{ backgroundColor: '#86A788' }}>🔗</div>
              <span>My Instagram</span>
              <span className={styles.previewArrow}>ⓘ</span>
            </div>
            <div className={styles.previewLink}>
              <div className={styles.previewLinkIcon} style={{ backgroundColor: '#FFB800' }}>🔗</div>
              <span>My Twitter</span>
              <span className={styles.previewArrow}>ⓘ</span>
            </div>
            <div className={styles.previewLink}>
              <div className={styles.previewLinkIcon} style={{ backgroundColor: '#FFB800' }}>🔗</div>
              <span>My website</span>
              <span className={styles.previewArrow}>ⓘ</span>
            </div>
            <div className={styles.previewLink}>
              <div className={styles.previewLinkIcon} style={{ backgroundColor: '#86A788' }}>🔗</div>
              <span>My Instagram</span>
              <span className={styles.previewArrow}>ⓘ</span>
            </div>
            <div className={styles.previewLink}>
              <div className={styles.previewLinkIcon} style={{ backgroundColor: '#FFB800' }}>🔗</div>
              <span>My Twitter</span>
              <span className={styles.previewArrow}>ⓘ</span>
            </div>
          </div>
          
        </div>
      </div>
      </center>
      <div className={styles.fixedLoginButton}>
        <button className={styles.loginButton}>baralynk.is/yourpage →</button>
      </div>

      {showDetailModal && (
        <DetailModal 
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  )
}
