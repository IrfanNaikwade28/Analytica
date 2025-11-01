import { useEffect } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Events from './components/Events.jsx'
import Leadership from './components/Leadership.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash?.replace('#', '')
      if (!hash) return
      const el = document.getElementById(hash)
      if (el) {
        // small timeout to ensure sections are laid out
        setTimeout(() => {
          window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
        }, 0)
      }
    }
    // Scroll on initial mount and when hash changes
    scrollToHash()
    const onHashChange = () => scrollToHash()
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <Hero />
      <About />
      <Leadership />
      <Events />
      <Contact />
      <Footer />
    </div>
  )
}