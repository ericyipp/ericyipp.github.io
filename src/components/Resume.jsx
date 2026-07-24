import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import './Resume.css'

const TABS = ['experience', 'education', 'projects']

const EXPERIENCE = [
  {
    role: 'Data Engineer Intern (Incoming)',
    company: 'Shopify - New York, NY',
    date: 'Sep 2026 - Dec 2026',
    desc: 'Incoming Data Engineer at Shopify, starting September 2026.',
    tags: ['Data Engineering'],
    details: '',
  },
  {
    role: 'Data Scientist Intern',
    company: 'DoorDash - San Francisco, CA',
    date: 'Jun 2025 - Aug 2025',
    desc: 'Built and deployed an ML model end-to-end, from feature engineering across multiple operational datasets to a production UI used by ops teams, automating 90% of manual data collection workflows.',
    tags: ['Python', 'SQL', 'Sigma', 'A/B Testing'],
    details: 'Collaborated with product and operations teams to define model requirements, success metrics, and rollout criteria, documenting findings to keep stakeholders aligned across review cycles. Designed and executed A/B tests in Sigma to evaluate model performance and validate operational impact across production workflows. Wrote SQL queries to extract and clean large-scale datasets, and used Python for feature engineering and exploratory analysis throughout the model development lifecycle.',
  },
  {
    role: 'Data Analyst Intern',
    company: 'U4U Teen - Berkeley SkyDeck Pad-13 Accelerator',
    date: 'Sep 2024 - Dec 2024',
    desc: 'Analyzed user sign-up rates, task completion, and retention metrics using Python, Pandas, and Matplotlib, summarizing findings in weekly reports shared with the founding team.',
    tags: ['Python', 'Pandas', 'Matplotlib', 'Google Analytics'],
    details: 'Built data visualizations to surface user engagement trends and presented them to investors and stakeholders during funding discussions. Developed an impact report using Google Analytics and Python that tracked key behavioral metrics and helped the team assess readiness for public launch.',
  },
]

const EDUCATION = [
  {
    role: 'B.A. in Data Science',
    company: 'University of California, Berkeley',
    date: 'Aug 2022 - May 2026',
    desc: 'Bachelor of Arts in Data Science, graduated May 2026.',
    tags: ['Data Structures & Algorithms', 'Machine Learning', 'Data Engineering'],
    details: 'Relevant coursework: Data Structures & Algorithms, Principles & Techniques of Data Science, Concepts of Probability, Data Engineering, Data Mining, and Machine Learning & Data Analytics.',
  },
]

const PROJECTS = [
  {
    role: 'UC Berkeley Chinese Student Association Website',
    company: 'React, TypeScript, Node.js, GitHub',
    date: 'Aug 2025 - May 2026',
    desc: 'Built a responsive web application serving 1,600+ members with event listings, cultural resources, and a team directory using React and TypeScript.',
    tags: ['React', 'TypeScript', 'Node.js', 'GitHub'],
    details: 'Implemented an admin dashboard with a content management system, reducing event posting time by 75% and enabling real-time content updates.',
  },
]

const DATA_MAP = { experience: EXPERIENCE, education: EDUCATION, projects: PROJECTS }

/* ────────────────────────────────────────────────────────────
   Responsive helper — desktop shows full details inline,
   mobile keeps the tap-to-expand "more/less" behavior
   ──────────────────────────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth <= breakpoint
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}

/* ────────────────────────────────────────────────────────────
   Timeline Card
   ──────────────────────────────────────────────────────────── */
function TimelineCard({ item, index }) {
  const [expanded, setExpanded] = useState(false)
  const isMobile = useIsMobile()

  return (
    <ScrollReveal delay={index * 0.1}>
      <motion.div
        className={`timeline-card timeline-card--c${index % 5}`}
        onClick={() => isMobile && setExpanded(!expanded)}
        layout
      >
        <div className="timeline-card-header">
          <div>
            <div className="timeline-card-role">{item.role}</div>
            <div className="timeline-card-company">{item.company}</div>
          </div>
          <span className="timeline-card-date">{item.date}</span>
        </div>

        <div className="timeline-card-desc">{item.desc}</div>

        {item.details && (
          isMobile ? (
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  className="timeline-card-desc"
                  initial={{ height: 0, opacity: 0, marginTop: 0 }}
                  animate={{ height: 'auto', opacity: 1, marginTop: 12 }}
                  exit={{ height: 0, opacity: 0, marginTop: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  {item.details}
                </motion.div>
              )}
            </AnimatePresence>
          ) : (
            <div className="timeline-card-desc" style={{ marginTop: 12 }}>
              {item.details}
            </div>
          )
        )}

        <div className="timeline-card-tags">
          {item.tags.map((t) => (
            <span className="timeline-tag" key={t}>{t}</span>
          ))}
        </div>

        {isMobile && (
          <div className="timeline-card-expand">
            {expanded ? 'less' : 'more'}
            <span className={`timeline-card-expand-arrow${expanded ? ' open' : ''}`}>
              ↓
            </span>
          </div>
        )}
      </motion.div>
    </ScrollReveal>
  )
}

/* ────────────────────────────────────────────────────────────
   Resume Section
   ──────────────────────────────────────────────────────────── */
export default function Resume() {
  const [activeTab, setActiveTab] = useState('experience')

  const items = DATA_MAP[activeTab] || []

  return (
    <section className="resume" id="resume">
      <ScrollReveal>
        <h2 className="resume-heading">
          resume
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div className="resume-tabs-container">
          <div className="resume-tabs">
            {TABS.map((tab) => (
              <button
                key={tab}
                className={`resume-tab${activeTab === tab ? ' active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="resumeTabIndicator"
                    className="resume-tab-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          className="resume-timeline"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {items.map((item, i) => (
            <TimelineCard key={`${activeTab}-${i}`} item={item} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>

      <ScrollReveal delay={0.2}>
        <a
          className="resume-download"
          href="/eric_m26.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="resume-download-label underline-cta">download resume (pdf)</span>
          <span className="resume-download-arrow">↓</span>
        </a>
      </ScrollReveal>
    </section>
  )
}
