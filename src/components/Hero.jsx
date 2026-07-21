import { motion } from 'framer-motion'
import './Hero.css'

const TITLES = [
  'Prev. Data Science Intern @ DoorDash',
  'Data Engineering Intern @ Shopify',
  'Prev. Data Analytics @ U4U',
  'Data Science @ UC Berkeley',
]

export default function Hero() {
  // Stagger children
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
  }
  const child = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="hero" id="home">
      <motion.div
        className="hero-content"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero-greeting" variants={child}>
          hey there! 👋 i'm
        </motion.p>

        <motion.h1 className="hero-name" variants={child}>
          Eric Yip
        </motion.h1>

        <motion.div className="hero-marquee" variants={child}>
          <div className="hero-marquee-track">
            {[...TITLES, ...TITLES].map((title, i) => (
              <span className="hero-marquee-item" key={i}>
                {title}
                <span className="hero-marquee-dot">•</span>
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div className="hero-ctas" variants={child}>
          <a className="hero-btn hero-btn-primary" href="#resume">
            view resume ↓
          </a>
          <a className="hero-btn hero-btn-ghost" href="#contact">
            get in touch
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
