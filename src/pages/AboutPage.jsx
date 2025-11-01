import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import About from '../components/About.jsx'

export default function AboutPage(){
  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <About />
      <Footer />
    </div>
  )
}
