import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const NAV_ITEMS = [
  { label: 'home',    href: '#home'    },
  { label: 'about',   href: '#about'   },
  { label: 'resume',  href: '#resume'  },
  { label: 'contact', href: '#contact' },
]

const SECTION_IDS = ['home', 'about', 'resume', 'contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  // Scroll backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const observers = []
    const visibleMap = {}

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          visibleMap[id] = entry.isIntersecting
          // Pick the first visible section in document order
          const active = SECTION_IDS.find((s) => visibleMap[s])
          if (active) setActiveSection(active)
        },
        { threshold: 0.35 }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`navbar${scrolled ? ' scrolled' : ''}`}
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
    >
      <a
        className="nav-brand"
        href="#home"
        onClick={(e) => handleNavClick(e, '#home')}
      >
        ericy
      </a>

      <nav className="nav-links">
        {NAV_ITEMS.map((item) => {
          const sectionId = item.href.replace('#', '')
          return (
            <a
              key={item.label}
              className={`nav-link${activeSection === sectionId ? ' active' : ''}`}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          )
        })}
      </nav>

      <button
        className={`nav-hamburger${mobileOpen ? ' open' : ''}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="nav-mobile-drawer open"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {NAV_ITEMS.map((item, i) => {
              const sectionId = item.href.replace('#', '')
              return (
                <motion.a
                  key={item.label}
                  className={`nav-link${activeSection === sectionId ? ' active' : ''}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {item.label}
                </motion.a>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
