import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Contact from '../components/Contact.jsx'

export default function ContactPage(){
  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <Contact />
      <Footer />
    </div>
  )
}
