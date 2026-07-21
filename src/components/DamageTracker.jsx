import { useEffect, useRef, useState } from 'react'
import './DamageTracker.css'

export default function DamageTracker({ total, visible }) {
  const [pulsing, setPulsing] = useState(false)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setPulsing(true)
    const t = setTimeout(() => setPulsing(false), 260)
    return () => clearTimeout(t)
  }, [total])

  if (!visible) return null

  return (
    <div className={`damage-tracker${pulsing ? ' damage-tracker-pulse' : ''}`} aria-hidden="true">
      <span className="damage-tracker-value">{total.toLocaleString()}</span>
    </div>
  )
}
