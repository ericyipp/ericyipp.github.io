import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import './Hero.css'

const TITLES = [
  'Prev. Data Science Intern @ DoorDash',
  'Data Engineering Intern @ Shopify',
  'Prev. Data Analytics @ U4U',
  'Data Science @ UC Berkeley',
]

const TYPE_SPEED  = 70
const DELETE_SPEED = 40
const HOLD_MS     = 2200
const PAUSE_MS    = 400

export default function Hero() {
  const [display, setDisplay] = useState('')
  const [titleIdx, setTitleIdx] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | hold | deleting | pause

  const currentTitle = TITLES[titleIdx]

  const tick = useCallback(() => {
    switch (phase) {
      case 'typing':
        if (display.length < currentTitle.length) {
          setDisplay(currentTitle.slice(0, display.length + 1))
        } else {
          setPhase('hold')
        }
        break
      case 'deleting':
        if (display.length > 0) {
          setDisplay(display.slice(0, -1))
        } else {
          setPhase('pause')
        }
        break
      default:
        break
    }
  }, [display, phase, currentTitle])

  useEffect(() => {
    let delay
    switch (phase) {
      case 'typing':   delay = TYPE_SPEED;   break
      case 'deleting': delay = DELETE_SPEED;  break
      case 'hold':     delay = HOLD_MS;       break
      case 'pause':    delay = PAUSE_MS;      break
      default:         delay = TYPE_SPEED
    }

    const timer = setTimeout(() => {
      if (phase === 'hold') {
        setPhase('deleting')
      } else if (phase === 'pause') {
        setTitleIdx((prev) => (prev + 1) % TITLES.length)
        setPhase('typing')
      } else {
        tick()
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [display, phase, tick])

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
          Eric <span className="hero-name-accent">Yip</span>
        </motion.h1>

        <motion.div className="hero-typer" variants={child}>
          {display}
          <span className="hero-typer-cursor" />
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

      <motion.div
        className="hero-scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <span className="hero-scroll-line" />
        scroll
      </motion.div>
    </section>
  )
}
