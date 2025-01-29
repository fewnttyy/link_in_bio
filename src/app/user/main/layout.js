'use client'

import '@/app/user/styles/globals.css'
import Sidebar from '@/app/user/components/Sidebar'
import Header from '@/app/user/components/Header'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function RootLayout({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true) // Sidebar default visible
  const [isMobile, setIsMobile] = useState(false) // State for mobile screens
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true) // Enable mobile layout
        setIsSidebarVisible(false) // Sidebar hidden by default on mobile
      } else {
        setIsMobile(false) // Desktop layout
        setIsSidebarVisible(true) // Sidebar visible by default
      }
    }

    // Initial check on mount
    handleResize()

    // Add event listener for resize
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize) // Cleanup
  }, [])

  return (
    <html lang="en">
      <body>
        <div
          className={`app-container ${
            isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'
          }`}
        >
          <Sidebar isVisible={isSidebarVisible} />
          <main className="main-content">
            <Header toggleSidebar={toggleSidebar} />
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </body>
    </html>
  )
}
