import { useCallback, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Resume from './components/Resume'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import CursorTrail from './components/CursorTrail'
import ClickEffect from './components/ClickEffect'
import DamageTracker from './components/DamageTracker'

export default function App() {
  const [totalDamage, setTotalDamage] = useState(0)
  const [hasClicked, setHasClicked] = useState(false)

  const handleHit = useCallback((dmg) => {
    setHasClicked(true)
    setTotalDamage((t) => t + dmg)
  }, [])

  return (
    <>
      <CustomCursor />
      <CursorTrail />
      <ClickEffect onHit={handleHit} />
      <DamageTracker total={totalDamage} visible={hasClicked} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Resume />
        <Contact />
      </main>
    </>
  )
}
