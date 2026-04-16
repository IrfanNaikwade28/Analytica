import { useEffect } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const WINNERS = [
  {
    position: "1st Place",
    badge: "Winner",
    team: "Pixel Pioneers",
    leader: "Aarav Patil",
    glow: "from-yellow-400/35 to-amber-300/15",
    border: "border-yellow-300/50",
  },
  {
    position: "2nd Place",
    badge: "Runner-up",
    team: "Neural Ninjas",
    leader: "Siya Kulkarni",
    glow: "from-purple-400/35 to-fuchsia-300/15",
    border: "border-purple-300/45",
  },
  {
    position: "3rd Place",
    badge: "Third Place",
    team: "Quantum Quest",
    leader: "Rohan Naik",
    glow: "from-cyan-400/30 to-blue-300/15",
    border: "border-cyan-300/45",
  },
];

const PRIZES = [
  {
    label: "Winner Prize",
    src: "https://github.com/user-attachments/assets/156538db-8a67-4c34-baca-94539af71352",
  },
  {
    label: "Runner-up Prize",
    src: "https://github.com/user-attachments/assets/1ba5016e-5aa1-45e1-b3a1-fff3ee2e4e5b",
  },
  {
    label: "3rd Place Prize",
    src: "https://github.com/user-attachments/assets/857bb249-dd6d-440c-87c0-b762fe1c354a",
  },
];

export default function GameCraft() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <main className="pt-20">
        <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-r from-indigo-600/25 via-purple-600/20 to-fuchsia-600/15 blur-[120px] rounded-full" />
          </div>

          <div className="relative z-10 container mx-auto max-w-5xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-300/10 px-4 py-2 text-sm font-medium text-emerald-100">
              <i className="fa-solid fa-circle-check" /> Event Successfully Completed
            </span>
            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              GameCraft <span className="text-gradient">– AI Game Development Challenge</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-white/75 max-w-3xl mx-auto leading-relaxed">
              An exciting 3-hour game development challenge where creativity met innovation.
            </p>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold">Results & <span className="text-gradient">Winners</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {WINNERS.map((winner) => (
                <article
                  key={winner.position}
                  className={`relative overflow-hidden rounded-2xl glass p-6 border ${winner.border} transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${winner.glow} pointer-events-none`} />
                  <div className="relative z-10">
                    <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
                      {winner.badge}
                    </span>
                    <h3 className="mt-4 text-xl font-bold text-white">{winner.position}</h3>
                    <p className="mt-2 text-white/80">
                      Team: <span className="font-semibold text-white">{winner.team}</span>
                    </p>
                    <p className="mt-1 text-white/70 text-sm">Leader: {winner.leader}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 bg-white/[0.02]">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold">Prize <span className="text-gradient">Showcase</span></h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PRIZES.map((prize) => (
                <figure
                  key={prize.label}
                  className="group glass rounded-2xl p-3 border border-white/10 overflow-hidden"
                >
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={prize.src}
                      alt={prize.label}
                      loading="lazy"
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <figcaption className="mt-3 text-sm text-white/75">{prize.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="container mx-auto max-w-4xl">
            <div className="glass rounded-3xl border border-white/10 p-8 sm:p-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Event <span className="text-gradient">Highlights</span></h2>
              <p className="text-white/75 leading-relaxed">
                GameCraft was conducted smoothly with high participation from enthusiastic teams.
                The challenge delivered creative game ideas, engaging competition, and strong collaboration throughout the 3-hour session.
                Thanks to the organizers and mentors, the event execution remained structured, energetic, and impactful from start to finish.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <div className="container mx-auto max-w-4xl">
            <div className="rounded-2xl border border-emerald-300/35 bg-emerald-300/10 p-6 sm:p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Participation Appreciation</h2>
              <p className="text-emerald-100/90 text-base sm:text-lg">
                We thank all participants for their enthusiasm and efforts.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">
              Event <span className="text-gradient">Gallery</span>
            </h2>
            <div className="rounded-3xl border border-dashed border-white/25 bg-white/[0.03] p-10 text-center">
              <i className="fa-solid fa-images text-4xl text-white/60" />
              <p className="mt-4 text-white/70">
                Placeholder for event photos and gameplay screenshots.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
