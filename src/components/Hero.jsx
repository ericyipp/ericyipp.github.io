import { motion } from 'framer-motion'
import './Hero.css'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}
const childVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-heading-wrapper" variants={childVariants}>
            <h1 className="hero-name">
              Eric Yip
            </h1>
          </motion.div>

          <motion.div className="hero-bottom-meta" variants={childVariants}>
            <p className="hero-bio">
              Hello and welcome to my portfolio! I'm a recent graduate from UC Berkeley with a degree in Data Science. I love working and unlocking opportunities with data. Feel free to explore my resume and projects. I also love connecting with new people so{' '}
              <a className="hero-bio-link" href="#contact">
                feel free to reach out
              </a>!
            </p>

            <div className="hero-ctas">
              <a className="hero-btn hero-btn-primary" href="#resume">
                view resume ↓
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
