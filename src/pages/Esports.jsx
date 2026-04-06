import { useEffect } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import freeFireImage from "../assets/images/esports/image1.jpg";
import eFootballImage from "../assets/images/esports/image2.jpg";
import heroImage from "../assets/images/esports/hero.png";

const GAMES = [
  {
    id: "freefire",
    title: "Free Fire",
    description: "Fast-paced battle royale showdown",
    image: freeFireImage,
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLSeW7KjqHpdPKJq-HGxH2FAmgVTsZWU2u7PgqYhNRJ4ZyaQDkA/viewform",
    gradient: "from-accent to-secondary"
  },
  {
    id: "efootball",
    title: "eFootball",
    description: "Strategic football competition",
    image: eFootballImage,
    registerLink: "https://docs.google.com/forms/d/e/1FAIpQLScJFUf6b1oUnQi17pjVFQi6_EmXajhEOOED13IgTb3E_kwFyg/viewform",
    gradient: "from-secondary to-highlight"
  }
];

const EVENT_FORMAT = [
  {
    step: "01",
    title: "Match-Based Rounds",
    description: "Compete in structured matches against other teams",
    icon: "fa-solid fa-gamepad"
  },
  {
    step: "02",
    title: "Elimination Progression",
    description: "Top performers advance through knockout stages",
    icon: "fa-solid fa-ranking-star"
  },
  {
    step: "03",
    title: "Finals Stage",
    description: "Battle for the championship and ultimate glory",
    icon: "fa-solid fa-trophy"
  }
];

const RULES = [
  {
    category: "Fair Play",
    icon: "fa-solid fa-shield-halved",
    rules: [
      "No cheating, hacking, or exploits allowed",
      "Respect opponents and officials",
      "Follow game-specific tournament rules"
    ]
  },
  {
    category: "Requirements",
    icon: "fa-solid fa-mobile-screen",
    rules: [
      "Own device with game installed",
      "Stable internet connection required",
      "Minimum device specifications met"
    ]
  },
  {
    category: "Participation",
    icon: "fa-solid fa-clock",
    rules: [
      "Report 15 minutes before match time",
      "Valid student ID required",
      "Team roster locked after registration"
    ]
  }
];

export default function Esports() {
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

  const scrollToGames = (e) => {
    e.preventDefault();
    document.querySelector('#games')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <main className="pt-20">
        {/* Hero Section - Centered Minimal Design */}
        <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 container mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-accent/30 mb-8 animate-fadeUp">
              <i className="fa-solid fa-trophy text-highlight text-sm"></i>
              <span className="text-sm text-white/80 font-medium">Esports Tournament</span>
            </div>

            {/* Title */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fadeUp"
              style={{ 
                animationDelay: '0.1s',
                textShadow: '0 0 80px rgba(177, 59, 255, 0.3)'
              }}
            >
              <span className="text-gradient">Esports Arena</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeUp" style={{ animationDelay: '0.2s' }}>
              Compete. Dominate. Rise to the top.
            </p>

            {/* CTA Button */}
            <div className="animate-fadeUp" style={{ animationDelay: '0.3s' }}>
              <a
                href="#games"
                onClick={scrollToGames}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-highlight text-ink font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,211,78,0.3)] hover:shadow-[0_0_60px_rgba(255,211,78,0.5)]"
              >
                Explore Games
                <i className="fa-solid fa-chevron-down group-hover:translate-y-1 transition-transform"></i>
              </a>
            </div>

            {/* Floating Tags */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-4 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
              <div className="px-4 py-2 rounded-full glass border border-white/10 text-sm text-white/70 hover:border-accent/30 transition-colors">
                <i className="fa-solid fa-fire text-accent mr-2"></i>
                Free Fire
              </div>
              <div className="px-4 py-2 rounded-full glass border border-white/10 text-sm text-white/70 hover:border-accent/30 transition-colors">
                <i className="fa-solid fa-futbol text-highlight mr-2"></i>
                eFootball
              </div>
            </div>

            {/* Hero Image */}
            <div className="mt-16 animate-fadeUp" style={{ animationDelay: '0.5s' }}>
              <div className="relative max-w-4xl mx-auto">
                <div className="rounded-2xl overflow-hidden glass border border-white/10 shadow-[0_8px_32px_rgba(177,59,255,0.3)]">
                  <img
                    src={heroImage}
                    alt="Esports Arena"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Selection Section - Main Highlight */}
        <section id="games" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Choose Your <span className="text-gradient">Battleground</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg">
                Select your game and prove your dominance on the field
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {GAMES.map((game, idx) => (
                <div
                  key={game.id}
                  className="reveal group glass rounded-2xl overflow-hidden border border-white/10 hover:border-accent/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(177,59,255,0.3)]"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  {/* Game Image */}
                  <div className="relative overflow-hidden h-64 sm:h-80 bg-gradient-to-br from-white/[0.03] to-white/[0.01]">
                    <img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent opacity-60"></div>
                  </div>

                  {/* Game Content */}
                  <div className="p-8">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 flex items-center gap-3">
                      <span className={`w-1 h-8 rounded-full bg-gradient-to-b ${game.gradient}`}></span>
                      {game.title}
                    </h3>
                    <p className="text-white/70 text-lg mb-6 leading-relaxed">
                      {game.description}
                    </p>
                    <a
                      href={game.registerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/btn w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r ${game.gradient} text-white font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_24px_rgba(177,59,255,0.3)]`}
                    >
                      Register for {game.title}
                      <i className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                About <span className="text-gradient">Esports Arena</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Esports Arena brings together the best competitive gamers from across campuses to battle in intense tournaments. Whether you're a battle royale specialist or a strategic football player, this is your chance to showcase your skills, compete against top talent, and claim victory. Join us for an adrenaline-fueled competition where only the best rise to the top.
              </p>
            </div>
          </div>
        </section>

        {/* Event Format */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-5xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Event <span className="text-gradient">Format</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                A structured tournament path from qualifiers to champions
              </p>
            </div>

            <div className="space-y-6">
              {EVENT_FORMAT.map((format, idx) => (
                <div
                  key={format.step}
                  className="reveal glass rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-accent/20 transition-all duration-300"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                        <span className="text-2xl font-black text-white">{format.step}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                        <i className={`${format.icon} text-highlight`}></i>
                        {format.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">{format.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rules Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Tournament <span className="text-gradient">Rules</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Essential guidelines for all participants
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RULES.map((ruleGroup, idx) => (
                <div
                  key={ruleGroup.category}
                  className="reveal glass rounded-2xl p-6 border border-white/10"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <i className={`${ruleGroup.icon} text-highlight`}></i>
                    </div>
                    <h3 className="text-lg font-bold">{ruleGroup.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {ruleGroup.rules.map((rule, ruleIdx) => (
                      <li key={ruleIdx} className="flex items-start gap-2 text-white/70 text-sm">
                        <i className="fa-solid fa-circle text-[6px] text-accent mt-1.5 flex-shrink-0"></i>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal text-center glass rounded-3xl p-12 border border-white/10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-secondary mb-6 shadow-[0_0_40px_rgba(177,59,255,0.3)]">
                <i className="fa-solid fa-gamepad text-3xl text-white"></i>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Ready to <span className="text-gradient">Compete?</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Choose your battleground and register now. Prove your skills and dominate the competition!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#games"
                  onClick={scrollToGames}
                  className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-highlight text-ink font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,211,78,0.3)]"
                >
                  <span className="flex items-center justify-center gap-2">
                    Choose Your Game
                    <i className="fa-solid fa-gamepad group-hover:rotate-12 transition-transform"></i>
                  </span>
                </a>
                <a
                  href="/technotsav"
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
