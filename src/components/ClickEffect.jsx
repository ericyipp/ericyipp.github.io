import { useState, useEffect, useCallback } from 'react'

let _id = 0

// Damage number colors matching MapleStory conventions
const TYPE_STYLES = {
  normal: { color: '#FFD700', fontSize: '10px' },
  crit:   { color: '#FF4444', fontSize: '13px' },
  miss:   { color: '#BBBBBB', fontSize: '10px' },
}

function rollDamage() {
  const roll = Math.random()
  if (roll < 0.06) return { text: 'MISS', type: 'miss' }
  if (roll < 0.22) return { text: (Math.floor(Math.random() * 4999) + 5000).toString(), type: 'crit' }
  return { text: (Math.floor(Math.random() * 899) + 100).toString(), type: 'normal' }
}

// ── Styles injected once ──────────────────────────────────────────────────────
const CSS = `
  @keyframes ms-damage-float {
    0%   { transform: translate(-50%, 0px)   scale(1.5); opacity: 1; }
    15%  { transform: translate(-50%, -10px) scale(1);   opacity: 1; }
    70%  { opacity: 1; }
    100% { transform: translate(-50%, -70px) scale(0.85); opacity: 0; }
  }
  @keyframes ms-star-radiate {
    0%   { opacity: 1;   transform: translate(0, 0) scale(1); }
    100% { opacity: 0;   transform: translate(var(--ms-dx), var(--ms-dy)) scale(0.2); }
  }
  .ms-dmg-number {
    position: fixed;
    pointer-events: none;
    z-index: 99997;
    font-family: 'Press Start 2P', monospace;
    line-height: 1;
    white-space: nowrap;
    animation: ms-damage-float 1.05s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    user-select: none;
    /* Classic MapleStory outline effect */
    -webkit-text-stroke: 2px rgba(0, 0, 0, 0.85);
    paint-order: stroke fill;
    filter:
      drop-shadow(0 0 4px rgba(0, 0, 0, 0.5));
  }
  .ms-crit-label {
    display: block;
    font-size: 7px;
    color: #FF8800;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.85);
    margin-bottom: 4px;
    letter-spacing: 1px;
  }
  .ms-spark {
    position: fixed;
    pointer-events: none;
    z-index: 99997;
    width: 7px;
    height: 7px;
    border-radius: 1px;
    animation: ms-star-radiate 0.55s ease-out forwards;
  }
`

// ─────────────────────────────────────────────────────────────────────────────

export default function ClickEffect() {
  const [effects, setEffects] = useState([])

  const spawn = useCallback((x, y) => {
    const id = _id++
    const { text, type } = rollDamage()

    // Slight horizontal jitter so repeated clicks don't perfectly stack
    const jitterX = (Math.random() - 0.5) * 24

    // 7 sparks spread evenly in a circle with randomised distance
    const sparks = Array.from({ length: 7 }, (_, i) => ({
      angle: (i / 7) * Math.PI * 2 + Math.random() * 0.35,
      dist:  32 + Math.random() * 24,
    }))

    setEffects((prev) => [...prev, { id, x: x + jitterX, y, text, type, sparks }])

    // Clean up after animation finishes
    setTimeout(() => setEffects((prev) => prev.filter((e) => e.id !== id)), 1200)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    if (!mq.matches) return
    const onDown = (e) => spawn(e.clientX, e.clientY)
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [spawn])

  return (
    <>
      <style>{CSS}</style>

      {effects.map((e) => {
        const { color, fontSize } = TYPE_STYLES[e.type]
        return (
          <div key={e.id} aria-hidden="true">
            {/* Damage / MISS number */}
            <div
              className="ms-dmg-number"
              style={{ left: e.x, top: e.y, color, fontSize }}
            >
              {e.type === 'crit' && <span className="ms-crit-label">CRITICAL!</span>}
              {e.text}
            </div>

            {/* Spark ring */}
            {e.sparks.map((s, i) => {
              const dx = Math.cos(s.angle) * s.dist
              const dy = Math.sin(s.angle) * s.dist
              return (
                <div
                  key={i}
                  className="ms-spark"
                  style={{
                    left: e.x - 3.5,
                    top:  e.y - 3.5,
                    background: color,
                    '--ms-dx': `${dx}px`,
                    '--ms-dy': `${dy}px`,
                    animationDelay: `${i * 18}ms`,
                  }}
                />
              )
            })}
          </div>
        )
      })}
    </>
  )
}
