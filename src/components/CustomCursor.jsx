import { useState, useEffect, useRef } from 'react'
import { loadAniFrames } from '../utils/parseAni'

const CURSOR_DEFAULT   = '/cursors/aero_arrow.cur' // idle / floating
const CURSOR_DRAG      = '/cursors/aero_move.cur'  // held down + moved
const CURSOR_CLICK_ANI = '/cursors/aero_link.ani'  // aero_arrow's click state — frame 0 matches the idle arrow, frame 1 is the pressed pose

const DRAG_THRESHOLD = 6 // px of movement while held down before it counts as a drag

// Kick off fetch + parse as soon as this module loads, and preload the
// "pressed" frame so the swap on click is instant instead of waiting on
// first decode. The ani's first frame is identical to the idle arrow, so
// we treat this as a static two-state toggle rather than a timed animation.
const clickFramePromise = loadAniFrames(CURSOR_CLICK_ANI).then((frames) => {
  const pressed = frames[frames.length - 1]?.url
  if (pressed) new Image().src = pressed
  return pressed
})

export default function CustomCursor() {
  const imgRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [src, setSrc] = useState(CURSOR_DEFAULT)

  const downPos = useRef(null)
  const dragging = useRef(false)
  const clickFrame = useRef(null)

  useEffect(() => {
    let cancelled = false
    clickFramePromise
      .then((url) => { if (!cancelled) clickFrame.current = url })
      .catch((err) => console.error('Failed to load cursor animation:', err))
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const onMove = (e) => {
      if (!visible) setVisible(true)
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      if (downPos.current && !dragging.current) {
        const dx = e.clientX - downPos.current.x
        const dy = e.clientY - downPos.current.y
        if (Math.hypot(dx, dy) > DRAG_THRESHOLD) {
          dragging.current = true
          setSrc(CURSOR_DRAG)
        }
      }
    }

    const onDown = (e) => {
      downPos.current = { x: e.clientX, y: e.clientY }
      dragging.current = false
      if (clickFrame.current) setSrc(clickFrame.current)
    }

    const onUp = () => {
      downPos.current = null
      dragging.current = false
      setSrc(CURSOR_DEFAULT)
    }

    const onEnter = () => setVisible(true)
    const onLeave = () => setVisible(false)

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [visible])

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt=""
        draggable={false}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99999,
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.2s',
          imageRendering: 'pixelated',
        }}
      />
      <style>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  )
}
