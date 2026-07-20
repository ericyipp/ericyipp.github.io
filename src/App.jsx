import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Resume from './components/Resume'
import Contact from './components/Contact'
import CustomCursor from './components/CustomCursor'
import CursorTrail from './components/CursorTrail'
import ClickEffect from './components/ClickEffect'

export default function App() {
  return (
    <>
      <CustomCursor />
      <CursorTrail />
      <ClickEffect />
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
