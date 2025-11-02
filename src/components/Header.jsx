import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // Active nav detection
      const sections = Array.from(document.querySelectorAll("section[id]"));
      const scrollY = window.scrollY + 85;
      let current = sections[0]?.id || "home";
      for (const s of sections) {
        if (s.offsetTop <= scrollY) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "leadership", label: "Leadership" },
    { id: "events", label: "Events" },
    { id: "benefits", label: "Benefits" },
    { id: "join", label: "Join" },
    { id: "contact", label: "Contact" },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const handleAnchor = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    // If we're not on home route, route to /#id so App can handle smooth scrolling.
    if (location.pathname !== "/" && location.pathname !== "/home") {
      navigate(`/#${id}`);
      return;
    }
    // Already on home: smooth scroll directly
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav id="navbar" className={`transition-colors duration-300 ${scrolled ? "scrolled" : "md:bg-transparent"}`}>
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <Link to="/" onClick={(e)=>handleAnchor(e,'home')} className="flex items-center gap-3">
            <span className="analytica-logo">Analytica</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <Link key={l.id} to={l.id === 'home' ? '/' : `/${l.id}`} onClick={(e)=>handleAnchor(e,l.id)} className={`js-nav-link nav-link ${active===l.id? 'active-nav':''}`}>{l.label}</Link>
            ))}
          </div>
          <button id="mobile-menu-button" className={`md:hidden relative z-50 hamburger-button ${mobileOpen? 'active':''}`} aria-label="Toggle menu" onClick={()=>setMobileOpen(v=>!v)}>
            <div className="hamburger-box">
              <div className="hamburger-inner" />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div id="mobile-menu-overlay" className={`mobile-menu-overlay ${mobileOpen? 'active':''}`} onClick={(e)=>{ if(e.target===e.currentTarget) setMobileOpen(false); }}>
        <div className="menu-background">
          <div className="gradient-orbs"></div>
          <div className="floating-particles"></div>
          <div className="mesh-pattern"></div>
        </div>
        <div className="menu-content">
          <div className="menu-header">
            <div className="menu-logo">
              <span className="analytica-logo">Analytica</span>
            </div>
          </div>
          {/* Internal close button for overlay */}
          <button
            aria-label="Close menu"
            className="absolute w-10 h-10 rounded-xl glass border border-white/10 text-white flex items-center justify-center hover:scale-105 transition z-50"
            style={{
              top: "calc(env(safe-area-inset-top, 0) + 0.75rem)",
              right: "calc(env(safe-area-inset-right, 0) + 0.75rem)",
            }}
            onClick={() => setMobileOpen(false)}
          >
            <i className="fa-solid fa-xmark text-xl" />
          </button>
          <nav className="menu-navigation">
            {navLinks.map((l,idx)=> (
          <Link key={l.id}
            to={l.id === 'home' ? '/' : `/${l.id}`}
            className="menu-link"
            style={{transitionDelay: `${0.1* (idx+1)}s`}}
            onClick={(e)=>handleAnchor(e,l.id)}>
                <span className="menu-link-icon"><i className="fa-solid fa-circle" /></span>
                <span className="menu-link-text">{l.label}</span>
                <span className="menu-link-arrow"><i className="fa-solid fa-arrow-right" /></span>
          </Link>
            ))}
          </nav>
          <p className="menu-tagline">Empowering data-driven tech leaders</p>
        </div>
      </div>
    </header>
  );
}
