import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import gamecraftImage from "../assets/images/Gamecraft/gamecraft1.png";
import biDashBattleImage from "../assets/images/bi_dash_battle/image2.jpg";
import esportsImage from "../assets/images/esports/hero.png";

const EVENTS = [
  {
    title: "BI DashBattle 2K26",
    category: "Data Analytics Challenge",
    description: "Turn raw data into powerful insights through interactive Power BI dashboards",
    image: biDashBattleImage,
    href: "/technotsav/powerbi",
    icon: "fa-solid fa-chart-line"
  },
  {
    title: "GameCraft",
    category: "Game Development Challenge",
    description: "Build innovative games from scratch in this intensive development challenge",
    image: gamecraftImage,
    href: "/technotsav/gamecraft",
    icon: "fa-solid fa-gamepad"
  },
  {
    title: "Esports Arena",
    category: "Esports Tournament",
    description: "Battle in Free Fire and eFootball tournaments. Compete, dominate, and rise to the top",
    image: esportsImage,
    href: "/technotsav/esports",
    icon: "fa-solid fa-trophy"
  },
];

const BENEFITS = [
  {
    icon: "fa-solid fa-brain",
    title: "Skill Development",
    description: "Enhance your technical abilities through hands-on challenges and real-world problem solving"
  },
  {
    icon: "fa-solid fa-award",
    title: "Prizes & Recognition",
    description: "Win exciting prizes, certificates, and recognition for your achievements"
  },
  {
    icon: "fa-solid fa-users",
    title: "Networking",
    description: "Connect with like-minded peers, mentors, and industry professionals"
  },
  {
    icon: "fa-solid fa-graduation-cap",
    title: "Learning Experience",
    description: "Gain valuable experience and insights from workshops, competitions, and expert guidance"
  },
];

export default function Technotsav() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => observer.observe(el));

    setTimeout(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) el.classList.add("in");
      });
    }, 0);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Minimal Background - Soft Radial Glow */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Main glow behind heading */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 container mx-auto max-w-5xl text-center">
            {/* Top Badge */}
            <div 
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-white/10 mb-12 animate-fadeUp"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              <span className="text-xs uppercase tracking-wider text-white/60 font-semibold">Analytica Club Presents</span>
            </div>

            {/* Main Heading with Two Levels */}
            <div className="mb-8 space-y-4">
              {/* Primary Heading - Technotsav */}
              <h1 
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none animate-fadeUp"
                style={{ 
                  animationDelay: '0.2s', 
                  animationFillMode: 'both',
                  textShadow: '0 0 80px rgba(177, 59, 255, 0.4), 0 0 40px rgba(177, 59, 255, 0.3)'
                }}
              >
                <span className="text-gradient inline-block">Technotsav</span>
              </h1>

              {/* Secondary Heading - 2K26 */}
              <div 
                className="flex items-center justify-center gap-3 animate-fadeUp"
                style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
              >
                <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
                <div className="relative inline-block px-6 py-2 rounded-xl glass border border-accent/30 backdrop-blur-xl">
                  <span 
                    className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.3em] text-white/90"
                    style={{ textShadow: '0 0 30px rgba(255, 211, 78, 0.5)' }}
                  >
                    2K26
                  </span>
                </div>
                <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent"></div>
              </div>
            </div>

            {/* Floating Tags */}
            <div 
              className="flex flex-wrap items-center justify-center gap-3 mb-10 animate-fadeUp"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              {['Game dev', 'Esports', 'Analytics'].map((tag, idx) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-xs font-semibold text-white/70 rounded-lg glass border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-105 animate-float"
                  style={{ 
                    animationDuration: `${3 + idx}s`,
                    animationDelay: `${idx * 0.5}s`
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Subtitle - Limited Width */}
            <p 
              className="text-base sm:text-lg md:text-xl text-white/70 mb-14 max-w-xl mx-auto leading-relaxed animate-fadeUp"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              Compete, Learn, and Excel in Analytica's Premier Technical Festival
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeUp"
              style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
            >
              {/* Primary - Glowing Button */}
              <a
                href="#events"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative w-full sm:w-auto px-8 py-4 rounded-xl bg-highlight text-ink font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden shadow-[0_0_40px_rgba(255,211,78,0.3)] hover:shadow-[0_0_60px_rgba(255,211,78,0.5)]"
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 shimmer opacity-30"></span>
                <span className="relative flex items-center justify-center gap-2">
                  Explore Events
                  <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </span>
              </a>

              {/* Secondary - Glass Button */}
              <a
                href="/contact"
                className="group w-full sm:w-auto px-8 py-4 rounded-xl glass border border-white/10 hover:border-accent/50 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 hover:shadow-[0_0_30px_rgba(177,59,255,0.2)]"
              >
                <span className="flex items-center justify-center gap-2">
                  Get Updates
                  <i className="fa-solid fa-bell group-hover:rotate-12 transition-transform"></i>
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
              <div className="reveal text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <i className="fa-solid fa-calendar-days text-2xl text-highlight"></i>
                  <div className="text-4xl sm:text-5xl font-bold text-gradient">3+</div>
                </div>
                <div className="text-white/60 font-medium">Events</div>
              </div>
              <div className="reveal text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <i className="fa-solid fa-users text-2xl text-highlight"></i>
                  <div className="text-4xl sm:text-5xl font-bold text-gradient">100+</div>
                </div>
                <div className="text-white/60 font-medium">Participants</div>
              </div>
              <div className="reveal text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <i className="fa-solid fa-gift text-2xl text-highlight"></i>
                  <div className="text-4xl sm:text-5xl font-bold text-gradient">Prizes</div>
                </div>
                <div className="text-white/60 font-medium">& Certificates</div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="reveal text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Our <span className="text-gradient">Events</span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Choose your challenge and showcase your skills across multiple technical domains
              </p>
            </div>

            {/* Event Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EVENTS.map((event, idx) => (
                <Link
                  key={event.title}
                  to={event.href}
                  className="reveal group glass rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(177,59,255,0.2)]"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full glass border border-white/20 text-xs font-semibold backdrop-blur-xl">
                      {event.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0">
                        <i className={`${event.icon} text-white`}></i>
                      </div>
                      <h3 className="text-xl font-bold flex-1">{event.title}</h3>
                    </div>
                    <p className="text-white/70 text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-2 text-highlight text-sm font-semibold">
                      Register Now
                      <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Why Participate Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            {/* Section Header */}
            <div className="reveal text-center mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Why <span className="text-gradient">Participate?</span>
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Join Technotsav and unlock opportunities for growth, learning, and recognition
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((benefit, idx) => (
                <div
                  key={benefit.title}
                  className="reveal glass rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-[1.02]"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-4">
                    <i className={`${benefit.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Event Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="reveal glass rounded-3xl overflow-hidden border border-white/10 shadow-[0_8px_48px_rgba(177,59,255,0.15)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Image Side */}
                <div className="h-64 lg:h-96 overflow-hidden">
                  <img
                    src={gamecraftImage}
                    alt="GameCraft Featured Event"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content Side */}
                <div className="p-8 lg:p-12">
                  <div className="inline-block px-3 py-1 rounded-full glass border border-accent/30 text-xs font-semibold text-highlight mb-4">
                    Featured Event
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                    GameCraft <span className="text-gradient">2026</span>
                  </h2>
                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    Join our flagship game development competition. Build innovative games in 48 hours, learn from industry experts, and compete for amazing prizes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/technotsav/gamecraft"
                      className="group px-6 py-3 rounded-xl bg-highlight text-ink font-bold hover:scale-[1.02] transition-all duration-300 text-center"
                    >
                      <span className="flex items-center justify-center gap-2">
                        View Details
                        <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                      </span>
                    </Link>
                    <a
                      href="/contact"
                      className="px-6 py-3 rounded-xl glass border border-white/10 hover:border-accent/50 font-semibold hover:scale-[1.02] transition-all duration-300 text-center"
                    >
                      Register Interest
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal text-center glass rounded-3xl p-12 border border-white/10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Ready to <span className="text-gradient">Compete?</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Don't miss out on this incredible opportunity. Register now or get in touch for more information about Technotsav 2026.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/contact"
                  className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-highlight text-ink font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_24px_rgba(255,211,78,0.25)]"
                >
                  <span className="flex items-center justify-center gap-2">
                    Contact Us
                    <i className="fa-solid fa-paper-plane group-hover:translate-x-1 transition-transform"></i>
                  </span>
                </a>
                <a
                  href="#events"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#events')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl glass border border-white/10 hover:border-accent/50 font-semibold hover:scale-[1.02] transition-all duration-300"
                >
                  View All Events
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
