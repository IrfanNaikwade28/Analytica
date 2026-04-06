import { useEffect } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import gamecraftHero from "../assets/images/Gamecraft/gamecraft1.png";
import gamecraft2 from "../assets/images/Gamecraft/gamecraft2.jpg";
import gamecraft3 from "../assets/images/Gamecraft/gamecraft3.png";

const OBJECTIVES = [
  {
    icon: "fa-solid fa-microchip",
    title: "Practical AI Application",
    description: "Apply AI tools effectively in real-world game development scenarios"
  },
  {
    icon: "fa-solid fa-palette",
    title: "Creative Game Design",
    description: "Design engaging gameplay mechanics and innovative game concepts"
  },
  {
    icon: "fa-solid fa-brain",
    title: "Smart AI Usage",
    description: "Demonstrate strategic use of AI as an assistant, not a replacement"
  },
  {
    icon: "fa-solid fa-lightbulb",
    title: "Problem-Solving",
    description: "Tackle development challenges under time and resource constraints"
  },
  {
    icon: "fa-solid fa-balance-scale",
    title: "Fair Competition",
    description: "Maintain integrity through transparent and ethical AI usage"
  },
];

const TIMELINE = [
  {
    round: "Round 1",
    title: "Rapid Quiz",
    duration: "20-30 minutes",
    description: "Multiple-choice questions testing game development and AI knowledge. Top performers advance to Round 2.",
    icon: "fa-solid fa-clipboard-question"
  },
  {
    round: "Round 2",
    title: "Game Development",
    duration: "3 hours",
    description: "Build a playable game using AI assistance. Focus on functionality, creativity, and smart AI integration.",
    icon: "fa-solid fa-code"
  },
  {
    round: "Round 3",
    title: "Testing & Judging",
    duration: "Demo + Q&A",
    description: "Present your game, demonstrate gameplay, explain your development process, and answer judges' questions.",
    icon: "fa-solid fa-trophy"
  },
];

const JUDGING_CRITERIA = [
  { category: "Gameplay & UX", percentage: 40, color: "from-accent to-secondary" },
  { category: "Functionality", percentage: 20, color: "from-secondary to-accent" },
  { category: "Creativity", percentage: 15, color: "from-accent to-highlight" },
  { category: "AI Usage", percentage: 15, color: "from-highlight to-accent" },
  { category: "Presentation", percentage: 10, color: "from-secondary to-highlight" },
];

const RULES = {
  participation: [
    "Teams must consist of 2-3 members",
    "All team members must be registered before the deadline",
    "Teams cannot change members after registration closes"
  ],
  development: [
    "Games must be built during the competition period",
    "Pre-made assets (sprites, sounds) are allowed with proper attribution",
    "Games must be playable and demonstrable at submission time"
  ],
  aiUsage: [
    "AI can be used for code assistance, debugging, and logic suggestions",
    "AI should assist your development, not automate entire features",
    "Teams must be able to explain all AI-generated code",
    "Excessive or unethical AI reliance will result in penalties"
  ],
  submission: [
    "Submit game build, playable demo, and brief documentation",
    "Include instructions on how to run/play your game",
    "Be prepared to present and defend your work in Round 3"
  ]
};

export default function GameCraft() {
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
        {/* Hero Section with Split Layout */}
        <section className="relative min-h-[calc(100vh-5rem)] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden py-12">
          {/* Minimal Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-accent/15 via-accent/5 to-transparent rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-accent/30 mb-8 animate-fadeUp">
                  <i className="fa-solid fa-robot text-highlight text-sm"></i>
                  <span className="text-sm text-white/80 font-medium">AI-Powered Game Development Challenge</span>
                </div>

                {/* Title */}
                <h1 
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fadeUp"
                  style={{ 
                    animationDelay: '0.1s',
                    textShadow: '0 0 80px rgba(177, 59, 255, 0.4)'
                  }}
                >
                  <span className="text-gradient">GameCraft</span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fadeUp" style={{ animationDelay: '0.2s' }}>
                  Design, build, and refine a playable game using controlled AI assistance
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 animate-fadeUp" style={{ animationDelay: '0.3s' }}>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfqB6giCyfKgmd8FxFov-VN-cDsjD0YwFInO-hI3W2zTwamWA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-highlight text-ink font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,211,78,0.3)] hover:shadow-[0_0_60px_rgba(255,211,78,0.5)]"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Register Now
                      <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </span>
                  </a>
                  <a
                    href="#overview"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector('#overview')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="group w-full sm:w-auto px-8 py-4 rounded-xl glass border border-white/10 hover:border-accent/50 font-semibold hover:scale-[1.02] transition-all duration-300"
                  >
                    <span className="flex items-center justify-center gap-2">
                      View Details
                      <i className="fa-solid fa-chevron-down group-hover:translate-y-1 transition-transform"></i>
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Side - Image Grid */}
              <div className="relative animate-fadeUp" style={{ animationDelay: '0.4s' }}>
                <div className="relative">
                  {/* Main Large Image */}
                  <div className="relative rounded-2xl overflow-hidden glass border border-white/10 shadow-[0_8px_32px_rgba(177,59,255,0.3)]">
                    <img
                      src={gamecraftHero}
                      alt="GameCraft Challenge"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  {/* Floating Small Images */}
                  <div className="hidden lg:block absolute -bottom-6 -left-6 w-48 rounded-xl overflow-hidden glass border border-white/10 shadow-[0_8px_24px_rgba(177,59,255,0.2)] animate-float" style={{ animationDuration: '4s' }}>
                    <img
                      src={gamecraft2}
                      alt="Game Development"
                      className="w-full h-auto object-cover"
                    />
                  </div>

                  <div className="hidden lg:block absolute -top-6 -right-6 w-40 rounded-xl overflow-hidden glass border border-white/10 shadow-[0_8px_24px_rgba(255,211,78,0.2)] animate-float" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                    <img
                      src={gamecraft3}
                      alt="AI Assistance"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Overview */}
        <section id="overview" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Event <span className="text-gradient">Overview</span>
              </h2>
              <div className="text-white/70 text-lg leading-relaxed">
                <p>
                  GameCraft is an innovative game development competition exploring the intersection of creativity and AI. Participants design and build playable games using AI tools strategically as assistants for code generation, debugging, and problem-solving. This challenge emphasizes practical AI application while maintaining human creativity at the core. Compete through multiple rounds and demonstrate how AI enhances rather than replaces the development process.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Competition <span className="text-gradient">Objectives</span>
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                What you'll achieve through this challenge
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {OBJECTIVES.map((obj, idx) => (
                <div
                  key={obj.title}
                  className="reveal glass rounded-2xl p-6 border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-[1.02]"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-4">
                    <i className={`${obj.icon} text-white text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{obj.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Structure / Timeline */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-5xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Event <span className="text-gradient">Structure</span>
              </h2>
              <p className="text-white/70 text-lg">
                Three rounds from quiz to final presentation
              </p>
            </div>

            <div className="space-y-6">
              {TIMELINE.map((round, idx) => (
                <div
                  key={round.round}
                  className="reveal glass rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-accent/30 transition-all duration-300"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Icon */}
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0">
                      <i className={`${round.icon} text-white text-2xl`}></i>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-lg bg-accent/20 border border-accent/30 text-sm font-semibold text-highlight">
                          {round.round}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold">{round.title}</h3>
                        <span className="text-white/60 text-sm">• {round.duration}</span>
                      </div>
                      <p className="text-white/70 leading-relaxed">
                        {round.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Usage Policy */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                AI Usage <span className="text-gradient">Policy</span>
              </h2>
              <p className="text-white/70 text-lg">
                Clear guidelines for ethical and effective AI use
              </p>
            </div>

            <div className="reveal glass rounded-2xl p-8 border border-white/10">
              <div className="space-y-8">
                {/* Allowed Usage */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <i className="fa-solid fa-check text-green-400"></i>
                    </div>
                    <h3 className="text-xl font-bold">Allowed AI Usage</h3>
                  </div>
                  <ul className="space-y-2 ml-13">
                    <li className="flex items-start gap-3 text-white/70">
                      <i className="fa-solid fa-circle text-[6px] mt-2 text-green-400"></i>
                      <span>Code assistance and suggestions for specific functions</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/70">
                      <i className="fa-solid fa-circle text-[6px] mt-2 text-green-400"></i>
                      <span>Debugging help and error resolution</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/70">
                      <i className="fa-solid fa-circle text-[6px] mt-2 text-green-400"></i>
                      <span>Logic suggestions and algorithm optimization</span>
                    </li>
                    <li className="flex items-start gap-3 text-white/70">
                      <i className="fa-solid fa-circle text-[6px] mt-2 text-green-400"></i>
                      <span>Documentation and code explanation generation</span>
                    </li>
                  </ul>
                </div>

                {/* Key Rule */}
                <div className="p-6 rounded-xl bg-highlight/10 border border-highlight/30">
                  <div className="flex items-start gap-4">
                    <i className="fa-solid fa-exclamation-triangle text-highlight text-2xl mt-1"></i>
                    <div>
                      <h4 className="text-lg font-bold mb-2 text-highlight">Golden Rule</h4>
                      <p className="text-white/80 leading-relaxed">
                        AI should <strong>assist</strong> your development process, not <strong>automate</strong> it. You must understand, modify, and take ownership of all code in your submission. Teams must be able to explain their implementation during judging.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Rules */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Team & <span className="text-gradient">Rules</span>
              </h2>
              <p className="text-white/70 text-lg">
                Important guidelines for all participants
              </p>
            </div>

            {/* Team Size */}
            <div className="reveal text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl glass border border-accent/30">
                <i className="fa-solid fa-users text-highlight text-xl"></i>
                <span className="font-bold text-lg">Team Size: <span className="text-gradient">2-3 Members</span></span>
              </div>
            </div>

            {/* Rules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Participation */}
              <div className="reveal glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-user-check text-highlight"></i>
                  Participation
                </h3>
                <ul className="space-y-3">
                  {RULES.participation.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/70 text-sm">
                      <i className="fa-solid fa-check text-accent mt-1"></i>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Development */}
              <div className="reveal glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-code text-highlight"></i>
                  Development
                </h3>
                <ul className="space-y-3">
                  {RULES.development.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/70 text-sm">
                      <i className="fa-solid fa-check text-accent mt-1"></i>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AI Usage */}
              <div className="reveal glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-robot text-highlight"></i>
                  AI Usage
                </h3>
                <ul className="space-y-3">
                  {RULES.aiUsage.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/70 text-sm">
                      <i className="fa-solid fa-check text-accent mt-1"></i>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submission */}
              <div className="reveal glass rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <i className="fa-solid fa-paper-plane text-highlight"></i>
                  Submission
                </h3>
                <ul className="space-y-3">
                  {RULES.submission.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-white/70 text-sm">
                      <i className="fa-solid fa-check text-accent mt-1"></i>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Judging Criteria */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Judging <span className="text-gradient">Criteria</span>
              </h2>
              <p className="text-white/70 text-lg">
                How your game will be evaluated
              </p>
            </div>

            <div className="reveal glass rounded-2xl p-8 border border-white/10">
              <div className="space-y-6">
                {JUDGING_CRITERIA.map((criterion, idx) => (
                  <div key={criterion.category} className="space-y-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{criterion.category}</h3>
                      <span className="text-2xl font-bold text-gradient">{criterion.percentage}%</span>
                    </div>
                    <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${criterion.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${criterion.percentage}%`,
                          animationDelay: `${idx * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal text-center glass rounded-3xl p-12 border border-white/10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Ready to <span className="text-gradient">Build?</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Join GameCraft and showcase your game development skills enhanced by AI. Register now to secure your spot!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfqB6giCyfKgmd8FxFov-VN-cDsjD0YwFInO-hI3W2zTwamWA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto px-8 py-4 rounded-xl bg-highlight text-ink font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,211,78,0.3)]"
                >
                  <span className="flex items-center justify-center gap-2">
                    Register Now
                    <i className="fa-solid fa-rocket group-hover:translate-x-1 transition-transform"></i>
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
