import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import IndustryX from './pages/IndustryX.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LeadershipPage from './pages/LeadershipPage.jsx'
import EventsPage from './pages/EventsPage.jsx'
import BenefitsPage from './pages/BenefitsPage.jsx'
import JoinPage from './pages/JoinPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import IndustryXResult from './pages/IndustryXResult.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/leadership" element={<LeadershipPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/benefits" element={<BenefitsPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/industryx" element={<IndustryX />} />
        <Route path="/industryx-result" element={<IndustryXResult />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

export function ScrollToTop(){
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])
  return null
}
