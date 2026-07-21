import { useEffect, useRef } from 'react'

// Throttle interval between spawning new particles (ms)
const SPAWN_INTERVAL_MS = 28
// Hard cap on simultaneous live particles
const MAX_PARTICLES = 80
// Symbol pool — mix of sparkle/star Unicode glyphs for variety
const SYMBOLS = ['✦', '✧', '✦', '✦', '★']

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Only activate on fine-pointer (mouse) devices
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let particles = []
    let rafId = null
    let lastSpawn = 0

    // Keep canvas sized to the full viewport
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const now = Date.now()
      if (now - lastSpawn >= SPAWN_INTERVAL_MS && particles.length < MAX_PARTICLES) {
        lastSpawn = now
        // Hue shifts between warm gold (35) and orange-gold (60)
        const hue = 35 + Math.random() * 25
        particles.push({
          x: e.clientX,
          y: e.clientY,
          // Gentle horizontal drift
          vx: (Math.random() - 0.5) * 1.4,
          // Start slightly upward, gravity pulls down
          vy: -(Math.random() * 0.8 + 0.1),
          size: Math.random() * 9 + 7,
          life: 1,
          // Faster-decaying particles feel snappier
          decay: 0.022 + Math.random() * 0.014,
          hue,
          symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        })
      }
    }

    // Small radial pop of the same sparkles at the click point
    const onDown = (e) => {
      const count = 7
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) break
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5
        const speed = 1.2 + Math.random() * 1.4
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.6, // slight upward bias against gravity
          size: Math.random() * 6 + 5,       // a touch smaller than trail sparkles
          life: 1,
          decay: 0.03 + Math.random() * 0.018, // fades faster — subtle pop
          hue: 35 + Math.random() * 25,
          symbol: SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Remove dead particles
      particles = particles.filter((p) => p.life > 0)

      for (const p of particles) {
        // Physics
        p.x += p.vx
        p.vy += 0.045 // gentle gravity
        p.y += p.vy
        p.life -= p.decay

        // Draw — shrink slightly as life drains for a natural sparkle feel
        const currentSize = p.size * (0.4 + p.life * 0.6)
        ctx.globalAlpha = Math.max(0, p.life * p.life) // ease-out fade
        ctx.fillStyle = `hsl(${p.hue}, 100%, 62%)`
        ctx.font = `${currentSize}px serif`
        ctx.textBaseline = 'middle'
        ctx.textAlign = 'center'
        ctx.fillText(p.symbol, p.x, p.y)
      }

      ctx.globalAlpha = 1
      rafId = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mousedown', onDown)
    rafId = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('resize', resize)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Skip on touch-only devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 99998, // just below the cursor (99999)
      }}
    />
  )
}
