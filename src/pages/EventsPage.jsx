import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import Events from '../components/Events.jsx'

export default function EventsPage(){
  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <Events />
      <Footer />
    </div>
  )
}
