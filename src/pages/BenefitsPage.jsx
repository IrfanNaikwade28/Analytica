import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Events from '../components/Events.jsx'

export default function BenefitsPage(){
  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      {/* Benefits section lives inside Events.jsx. Render Events and jump to #benefits on mount. */}
      <Events />
      <Footer />
    </div>
  )
}
