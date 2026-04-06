import { useEffect } from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import heroImage from "../assets/images/hack_7Nov.png";

function Stat({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 text-white/80">
      <i className={`${icon} text-highlight`}></i>
      <span className="text-sm">
        {label}: <span className="text-white font-semibold">{value}</span>
      </span>
    </div>
  );
}

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

  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <main className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start min-h-[calc(100vh-6rem)] w-full pt-6">
            <div className="reveal">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Esports Tournament
              </h1>
              <p className="mt-3 text-white/80 max-w-xl">
                Competitive Gaming Tournament - Battle it out in popular esports titles. Show your skills, strategies, and teamwork in intense competitive matches.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Stat
                  icon="fa-regular fa-calendar-days"
                  label="Date"
                  value="TBA"
                />
                <Stat
                  icon="fa-solid fa-location-dot"
                  label="Venue"
                  value="Data Science Dept, DYPCET"
                />
                <Stat
                  icon="fa-regular fa-hourglass-half"
                  label="Registration Deadline"
                  value="TBA"
                />
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="/contact"
                  className="btn-magnetic w-full sm:w-auto px-6 py-3 rounded-xl bg-highlight text-ink font-bold hover:scale-105 transition text-sm sm:text-base text-center"
                >
                  Register Now
                </a>
                <a
                  href="/technotsav"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl glass hover:scale-[1.02] transition text-sm sm:text-base text-center"
                >
                  Back to Events
                </a>
              </div>
            </div>
            <div className="reveal flex items-center justify-center h-full">
              <div className="overflow-hidden rounded-2xl flex items-center justify-center h-64 sm:h-full">
                <img
                  src={heroImage}
                  alt="Esports Tournament"
                  className="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            </div>
          </section>

          {/* Event Details Section */}
          <section className="mt-16">
            <div className="reveal">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Event <span className="text-gradient">Details</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="glass p-6 rounded-xl reveal card-3d">
                <i className="fa-solid fa-trophy text-highlight text-2xl mb-3" />
                <h3 className="text-lg font-semibold mb-2">Tournament Format</h3>
                <p className="text-white/70 text-sm">
                  Single or double elimination tournament format depending on the game title. Matches will be best-of-3 for regular rounds and best-of-5 for finals.
                </p>
              </div>

              <div className="glass p-6 rounded-xl reveal card-3d">
                <i className="fa-solid fa-users text-highlight text-2xl mb-3" />
                <h3 className="text-lg font-semibold mb-2">Eligibility</h3>
                <p className="text-white/70 text-sm">
                  Open to all students. Team size varies by game (solo, duo, or 5v5). Multiple game titles will be featured - choose your battlefield!
                </p>
              </div>

              <div className="glass p-6 rounded-xl reveal card-3d">
                <i className="fa-solid fa-gamepad text-highlight text-2xl mb-3" />
                <h3 className="text-lg font-semibold mb-2">Featured Games</h3>
                <p className="text-white/70 text-sm">
                  Popular titles including VALORANT, CS2, Mobile Legends, BGMI, and more. Final game list will be announced closer to the event date.
                </p>
              </div>

              <div className="glass p-6 rounded-xl reveal card-3d">
                <i className="fa-solid fa-award text-highlight text-2xl mb-3" />
                <h3 className="text-lg font-semibold mb-2">Prizes & Recognition</h3>
                <p className="text-white/70 text-sm">
                  Cash prizes for top teams, gaming merchandise, certificates, and bragging rights! Champions will be crowned in each game category.
                </p>
              </div>
            </div>
          </section>

          {/* Rules & Guidelines Section */}
          <section className="mt-16">
            <div className="reveal">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                Rules & <span className="text-gradient">Guidelines</span>
              </h2>
            </div>

            <div className="glass p-8 rounded-2xl reveal mt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Registration</h4>
                    <p className="text-white/70 text-sm">
                      Teams must register with complete roster before the deadline. Include player IGNs, IDs, and ranks for skill-based seeding.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Equipment</h4>
                    <p className="text-white/70 text-sm">
                      Players must bring their own peripherals (mouse, keyboard, headset). PCs/consoles will be provided, or BYOD if specified.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Game Settings</h4>
                    <p className="text-white/70 text-sm">
                      All matches will be played on official tournament settings. Server/region will be announced. No custom mods or unauthorized software allowed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Fair Play</h4>
                    <p className="text-white/70 text-sm">
                      Zero tolerance for cheating, hacking, or exploiting bugs. All players must maintain sportsmanship and respect towards opponents and officials.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Punctuality</h4>
                    <p className="text-white/70 text-sm">
                      Teams must be ready 15 minutes before scheduled match time. Delays beyond grace period may result in forfeit.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Substitutions</h4>
                    <p className="text-white/70 text-sm">
                      Limited substitutions allowed from registered roster only. Stand-ins must be approved by tournament officials before match start.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Disputes</h4>
                    <p className="text-white/70 text-sm">
                      All disputes must be raised immediately to match officials. Final decisions rest with tournament organizers and are binding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="mt-16">
            <div className="glass p-8 rounded-2xl reveal text-center">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Ready to Compete?
              </h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Join the battle and prove your gaming prowess! For questions about game-specific rules or tournament updates, contact us.
              </p>
              <a
                href="/contact"
                className="btn-magnetic inline-block px-6 py-3 rounded-xl bg-highlight text-ink font-bold hover:scale-105 transition"
              >
                Contact Us
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
