import { useEffect } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

// Results page following existing theme: dark background, glass cards, highlight color, gradients, and container widths.
export default function IndustryXResult() {
  // Static data for now; can be wired to Supabase later
  const rows = [
    { statement: "Material Name Detection Through Actual Material Scanning", team: "Team Data Sphere" },
    { statement: "To Develop Zanvar Group Chatbot", team: "Team ChatNex" },
    { statement: "Correct QR Code Sticker Pasting to Right Part", team: "Team Nivaran" },
    { statement: "Automatic Sand Temperature and Moisture Control System Using Smart Water Sprinklers", team: "Team Tech4" },
    { statement: "Auto Mold Hardness Checking", team: "Team Dominators" },
    { statement: "Image Analyzer-Based Auto Detection of Laser Marking Program", team: "Team Codex" },
  ];

  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <main className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-5xl">
          {/* Reveal-on-scroll activation (same pattern used across site) */}
          <RevealOnScrollOnce />
          <section className="reveal text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="w-2 h-8 bg-highlight rounded-full" />
              <span className="text-sm uppercase tracking-widest text-white/60">IndustryX Results</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Hearty congratulations to all the winners!
            </h1>
            <p className="text-white/70 mt-3 max-w-2xl mx-auto">
              Thank you to every participant for your hard work and creativity. Here are the winning teams by problem.
            </p>
          </section>

          <section className="mt-10 reveal">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-white/80 text-sm uppercase tracking-wider">Problem Statement</th>
                      <th className="px-6 py-4 text-white/80 text-sm uppercase tracking-wider">Team Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? "bg-transparent" : "bg-white/5"}>
                        <td className="px-6 py-4"><span className="block line-clamp-2 text-white/90">{r.statement}</span></td>
                        <td className="px-6 py-4">{r.team}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Optional: could add a CTA back to events or home */}
          <div className="mt-10 flex justify-center">
            <a href="/industryx" className="px-6 py-3 rounded-xl glass hover:scale-105 transition text-sm sm:text-base">
              Back to Events
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Small helper to apply 'in' class to .reveal elements when they enter viewport
function RevealOnScrollOnce() {
  useEffect(() => {
    // ensure we start at top on navigation
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

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

    // Immediately mark those already in view
    setTimeout(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) el.classList.add("in");
      });
    }, 0);

    return () => observer.disconnect();
  }, []);
  return null;
}
