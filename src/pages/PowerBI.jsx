import { useEffect } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import biDashBattleImage from "../assets/images/bi_dash_battle/image2.jpg";

const OBJECTIVES = [
  {
    icon: "fa-solid fa-chart-line",
    title: "BI Skills Development",
    description: "Master Power BI tools and dashboard creation techniques"
  },
  {
    icon: "fa-solid fa-chart-pie",
    title: "Data Visualization",
    description: "Transform raw data into compelling visual stories"
  },
  {
    icon: "fa-solid fa-database",
    title: "Real-World Experience",
    description: "Work with industry-standard datasets and scenarios"
  },
  {
    icon: "fa-solid fa-brain",
    title: "Analytical Thinking",
    description: "Develop critical data interpretation skills"
  },
  {
    icon: "fa-solid fa-users",
    title: "Team Collaboration",
    description: "Collaborate effectively on data projects"
  },
  {
    icon: "fa-solid fa-lightbulb",
    title: "Innovation",
    description: "Create unique insights from complex datasets"
  },
];

const EVENT_STEPS = [
  {
    step: "01",
    title: "Data Cleaning & Dashboard Development",
    duration: "3 hours",
    description: "Clean and prepare the provided dataset, then build an interactive dashboard with meaningful visualizations and insights.",
    icon: "fa-solid fa-table"
  },
  {
    step: "02",
    title: "Presentation & Demonstration",
    duration: "5 minutes",
    description: "Present your dashboard to the judges, highlighting key insights, design choices, and analytical approach.",
    icon: "fa-solid fa-presentation-screen"
  },
  {
    step: "03",
    title: "Q&A with Judges",
    duration: "Varies",
    description: "Answer questions about your methodology, data cleaning process, visualization decisions, and insights discovered.",
    icon: "fa-solid fa-comments"
  },
];

const JUDGING_CRITERIA = [
  { category: "Data Cleaning & Accuracy", percentage: 25, color: "from-accent to-secondary" },
  { category: "Insights & Analysis", percentage: 30, color: "from-secondary to-accent" },
  { category: "Visualization & Design", percentage: 20, color: "from-accent to-highlight" },
  { category: "Problem Coverage", percentage: 15, color: "from-highlight to-accent" },
  { category: "Presentation", percentage: 10, color: "from-secondary to-highlight" },
];

const RULES = {
  participation: [
    "Teams must consist of 1-2 members",
    "All team members must be registered students",
    "Registration must be completed before the deadline"
  ],
  development: [
    "Only Power BI Desktop is allowed for dashboard creation",
    "Dataset will be provided at the start of the competition",
    "No external data sources or pre-built templates allowed",
    "Teams must work independently without outside assistance"
  ],
  submission: [
    "Submit your .pbix file and a brief methodology document",
    "Dashboard must be functional and error-free",
    "Be prepared to demonstrate and explain your work"
  ]
};

export default function PowerBI() {
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
        {/* Hero Section - Centered Minimal Design */}
        <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Minimal Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
            {/* Subtle Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-accent/10 via-accent/5 to-transparent rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 container mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-accent/30 mb-8 animate-fadeUp">
              <i className="fa-solid fa-chart-simple text-highlight text-sm"></i>
              <span className="text-sm text-white/80 font-medium">Data Analytics Challenge</span>
            </div>

            {/* Title */}
            <h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-fadeUp"
              style={{ 
                animationDelay: '0.1s',
                textShadow: '0 0 80px rgba(177, 59, 255, 0.3)'
              }}
            >
              <span className="text-gradient">BI DashBattle</span>
              <div className="text-4xl sm:text-5xl md:text-6xl mt-2 text-white/90">2K26</div>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed animate-fadeUp" style={{ animationDelay: '0.2s' }}>
              Turn data into insights through powerful dashboards
            </p>

            {/* CTA Button */}
            <div className="animate-fadeUp" style={{ animationDelay: '0.3s' }}>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc0SKuloQCFtQWNtPuYZTGajlFub9E858fzkEVKk0rmku86Yw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-highlight text-ink font-bold hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,211,78,0.3)] hover:shadow-[0_0_60px_rgba(255,211,78,0.5)]"
              >
                Register Now
                <i className="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </a>
            </div>

            {/* Dashboard Image */}
            <div className="mt-16 animate-fadeUp" style={{ animationDelay: '0.4s' }}>
              <div className="relative max-w-4xl mx-auto">
                <div className="rounded-2xl overflow-hidden glass border border-white/10 shadow-[0_8px_32px_rgba(177,59,255,0.3)]">
                  <img
                    src={biDashBattleImage}
                    alt="BI Dashboard"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Event Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Event <span className="text-gradient">Overview</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                BI DashBattle is a professional data analytics competition where participants transform raw datasets into compelling business intelligence dashboards. This challenge tests your ability to clean data, uncover insights, and present findings through clear visualizations using Power BI. Compete against peers and showcase your analytical skills in a real-world business context.
              </p>
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
              <p className="text-white/60 max-w-2xl mx-auto">
                Develop essential skills for modern data analytics and business intelligence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {OBJECTIVES.map((obj, idx) => (
                <div
                  key={obj.title}
                  className="reveal glass rounded-xl p-6 border border-white/10 hover:border-accent/30 transition-all duration-300 hover:shadow-[0_8px_32px_rgba(177,59,255,0.15)]"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/30 flex items-center justify-center mb-4">
                    <i className={`${obj.icon} text-highlight text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{obj.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{obj.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Event Structure - Steps Layout */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-5xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Event <span className="text-gradient">Structure</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                A streamlined three-step process from data to insights
              </p>
            </div>

            <div className="space-y-6">
              {EVENT_STEPS.map((step, idx) => (
                <div
                  key={step.step}
                  className="reveal glass rounded-2xl p-6 sm:p-8 border border-white/10 hover:border-accent/20 transition-all duration-300"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex flex-col sm:flex-row gap-6 items-start">
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                        <span className="text-2xl font-black text-white">{step.step}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                          <i className={`${step.icon} text-highlight`}></i>
                          {step.title}
                        </h3>
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-highlight/10 border border-highlight/30 text-highlight text-sm font-semibold w-fit">
                          <i className="fa-solid fa-clock text-xs"></i>
                          {step.duration}
                        </span>
                      </div>
                      <p className="text-white/70 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Structure */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal glass rounded-2xl p-8 sm:p-12 border border-white/10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-secondary mb-6">
                <i className="fa-solid fa-user-group text-2xl text-white"></i>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Team <span className="text-gradient">Structure</span>
              </h2>
              <p className="text-white/70 text-lg mb-6">
                Compete individually or as a team
              </p>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/[0.03] border border-accent/30">
                <i className="fa-solid fa-users text-highlight text-xl"></i>
                <span className="text-2xl font-bold text-gradient">1–2</span>
                <span className="text-white/70">members per team</span>
              </div>
            </div>
          </div>
        </section>

        {/* Judging Criteria */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-5xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Judging <span className="text-gradient">Criteria</span>
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto">
                Your dashboard will be evaluated across five key dimensions
              </p>
            </div>

            <div className="reveal glass rounded-2xl p-8 sm:p-12 border border-white/10">
              <div className="space-y-8">
                {JUDGING_CRITERIA.map((criteria, idx) => (
                  <div key={criteria.category} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">{criteria.category}</h3>
                      <span className="text-2xl font-bold text-highlight">{criteria.percentage}%</span>
                    </div>
                    <div className="relative h-3 bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${criteria.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ 
                          width: `${criteria.percentage}%`,
                          transitionDelay: `${idx * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rules & Regulations */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-5xl">
            <div className="reveal text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Rules & <span className="text-gradient">Regulations</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Participation Rules */}
              <div className="reveal glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/30 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-user-check text-highlight"></i>
                  </div>
                  <h3 className="text-lg font-bold">Participation</h3>
                </div>
                <ul className="space-y-3">
                  {RULES.participation.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                      <i className="fa-solid fa-circle text-[6px] text-accent mt-1.5 flex-shrink-0"></i>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Development Rules */}
              <div className="reveal glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20 border border-secondary/30 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-code text-highlight"></i>
                  </div>
                  <h3 className="text-lg font-bold">Development</h3>
                </div>
                <ul className="space-y-3">
                  {RULES.development.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                      <i className="fa-solid fa-circle text-[6px] text-secondary mt-1.5 flex-shrink-0"></i>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submission Rules */}
              <div className="reveal glass rounded-2xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-highlight/20 to-accent/20 border border-highlight/30 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-paper-plane text-highlight"></i>
                  </div>
                  <h3 className="text-lg font-bold">Submission</h3>
                </div>
                <ul className="space-y-3">
                  {RULES.submission.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-white/70 text-sm">
                      <i className="fa-solid fa-circle text-[6px] text-highlight mt-1.5 flex-shrink-0"></i>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/[0.02]">
          <div className="container mx-auto max-w-4xl">
            <div className="reveal text-center glass rounded-3xl p-12 border border-white/10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-secondary mb-6 shadow-[0_0_40px_rgba(177,59,255,0.3)]">
                <i className="fa-solid fa-chart-line text-3xl text-white"></i>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Ready to <span className="text-gradient">Compete?</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Transform data into insights and showcase your business intelligence skills. Register now and claim your spot in BI DashBattle 2K26!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSc0SKuloQCFtQWNtPuYZTGajlFub9E858fzkEVKk0rmku86Yw/viewform"
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
