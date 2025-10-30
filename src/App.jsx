import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Events from './components/Events.jsx'
import Leadership from './components/Leadership.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
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