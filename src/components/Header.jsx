import { useEffect, useState } from "react";

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

  const handleAnchor = (e, id) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav id="navbar" className={`transition-colors duration-300 ${scrolled ? "scrolled" : ""}`}>
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" onClick={(e)=>handleAnchor(e,'home')} className="flex items-center gap-3">
            <span className="analytica-logo">Analytica</span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <a key={l.id} href={`#${l.id}`} onClick={(e)=>handleAnchor(e,l.id)} className={`js-nav-link nav-link ${active===l.id? 'active-nav':''}`}>{l.label}</a>
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
          <nav className="menu-navigation">
            {navLinks.map((l,idx)=> (
              <a key={l.id}
                 href={`#${l.id}`}
                 className="menu-link"
                 style={{transitionDelay: `${0.1* (idx+1)}s`}}
                 onClick={(e)=>handleAnchor(e,l.id)}>
                <span className="menu-link-icon"><i className="fa-solid fa-circle" /></span>
                <span className="menu-link-text">{l.label}</span>
                <span className="menu-link-arrow"><i className="fa-solid fa-arrow-right" /></span>
              </a>
            ))}
          </nav>
          <p className="menu-tagline">Empowering data-driven tech leaders</p>
        </div>
      </div>
    </header>
  );
}
