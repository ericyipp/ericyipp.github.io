import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * Wraps children in a scroll-triggered reveal animation.
 * @param {Object}  props
 * @param {number}  [props.delay=0]      – extra delay in seconds
 * @param {'up'|'left'|'right'} [props.direction='up']
 * @param {number}  [props.distance=40]  – px offset before reveal
 * @param {number}  [props.duration=0.7]
 * @param {React.ReactNode} props.children
 */
export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 40,
  duration = 0.7,
  className = '',
  style = {},
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const offsets = {
    up:    { x: 0, y: distance },
    left:  { x: -distance, y: 0 },
    right: { x: distance, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
