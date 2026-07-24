import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import './Hero.css'

// Orchestrate stagger timing for children
const heroContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

// Directional slide up out of overflow mask (Studio Karo style)
const lineSlideVariants = {
  hidden: {
    y: '110%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Secondary elements fade & slight rise
const childFadeVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

function TiltPhotoCard() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const tiltSpring = { stiffness: 220, damping: 20, mass: 0.6 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), tiltSpring)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), tiltSpring)

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="hero-photo-card"
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <img src="/pictures/headshot.png" alt="eric yip" className="hero-avatar" />
    </motion.div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <motion.div
          className="hero-content"
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Dot-matrix name graphic */}
          <div className="hero-heading-wrapper">
            <h1 className="hero-name-mask">
              <motion.img
                src="/pictures/herosvg.svg"
                alt="eric yip"
                className="hero-name-svg"
                variants={lineSlideVariants}
              />
            </h1>
          </div>

          <motion.div className="hero-bottom-meta" variants={childFadeVariants}>
            <p className="hero-bio">
              Hello and welcome to my portfolio! I'm a recent graduate from UC Berkeley with a degree in Data Science. I love working and unlocking opportunities with data. Feel free to explore my resume and projects. I also love connecting with new people so{' '}
              <a className="hero-bio-link" href="#contact">
                feel free to reach out
              </a>!
            </p>
          </motion.div>
        </motion.div>

        {/* Floating Photo Card */}
        <motion.div
          className="hero-visual-wrapper"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ perspective: 1000 }}
        >
          <TiltPhotoCard />
        </motion.div>
      </div>

      {/* Scroll-to-resume indicator, bottom-center of the section */}
      <div className="hero-scroll-cta-wrap">
        <motion.a
          href="#resume"
          className="hero-scroll-cta"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ y: -2 }}
        >
          <span className="hero-scroll-cta-label underline-cta">view resume</span>
          <motion.span
            className="hero-scroll-cta-arrow"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
        </motion.a>
      </div>
    </section>
  )
}


