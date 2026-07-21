import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

export default function Hero() {
  const displacementRef = useRef(null)
  const turbulenceRef = useRef(null)
  const requestRef = useRef(null)
  const isHovered = useRef(false)
  const currentScale = useRef(0)
  const targetScale = useRef(0)
  const time = useRef(0)

  // High-performance requestAnimationFrame loop to animate the SVG filter
  useEffect(() => {
    const updateFilter = () => {
      // Interpolate current scale toward target scale
      const diff = targetScale.current - currentScale.current
      currentScale.current += diff * 0.12 // Smooth easing

      if (displacementRef.current) {
        displacementRef.current.setAttribute('scale', currentScale.current.toFixed(2))
      }

      // Shimmer effect while hovered
      if (isHovered.current) {
        time.current += 0.04
        if (turbulenceRef.current) {
          const xFreq = 0.01 + Math.sin(time.current) * 0.003
          const yFreq = 0.04 + Math.cos(time.current * 0.7) * 0.008
          turbulenceRef.current.setAttribute('baseFrequency', `${xFreq} ${yFreq}`)
        }
      }

      requestRef.current = requestAnimationFrame(updateFilter)
    }

    requestRef.current = requestAnimationFrame(updateFilter)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    isHovered.current = true
    targetScale.current = 26 // Target distortion strength
  }

  const handleMouseLeave = () => {
    isHovered.current = false
    targetScale.current = 0 // Return to crisp vector text
  }

  // Stagger children for entrance reveals
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  }
  const child = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="hero" id="home">
      {/* Hidden SVG Filter for Liquid Distortion */}
      <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
        <defs>
          <filter id="liquid-distortion">
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.01 0.04"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="hero-inner">
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-heading-wrapper" variants={child}>
            <p className="hero-greeting">
              hey there! 👋 i'm
            </p>

            <h1
              className="hero-name"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Eric <span className="thin">Yip</span>
            </h1>
          </motion.div>

          <motion.div className="hero-bottom-meta" variants={child}>
            <p className="hero-bio">
              A data science student at UC Berkeley graduating in May 2026.
              I thrive at the intersection of machine learning, scalable data pipelines,
              and building clean, interactive interfaces.
            </p>

            <div className="hero-ctas">
              <a className="hero-btn hero-btn-primary" href="#resume">
                view resume ↓
              </a>
              <a className="hero-btn hero-btn-ghost" href="#contact">
                get in touch
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Photo Card */}
        <motion.div
          className="hero-visual-wrapper"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-photo-card">
            <img src="/pictures/headshot.png" alt="Eric Yip" className="hero-avatar" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
