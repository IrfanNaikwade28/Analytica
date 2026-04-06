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
      <main className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start min-h-[calc(100vh-6rem)] w-full pt-6">
            <div className="reveal">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                Power BI Competition
              </h1>
              <p className="mt-3 text-white/80 max-w-xl">
                Showcase your data visualization and analytics skills using Microsoft Power BI. Transform raw data into compelling insights and interactive dashboards.
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
                  alt="Power BI Competition"
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
                <h3 className="text-lg font-semibold mb-2">Competition Format</h3>
                <p className="text-white/70 text-sm">
                  Participants will be given a dataset and must create comprehensive Power BI dashboards within the time limit. Judges will evaluate based on visualization quality, insights, and presentation.
                </p>
              </div>

              <div className="glass p-6 rounded-xl reveal card-3d">
                <i className="fa-solid fa-users text-highlight text-2xl mb-3" />
                <h3 className="text-lg font-semibold mb-2">Eligibility</h3>
                <p className="text-white/70 text-sm">
                  Open to all students. Participants can compete individually or in teams of up to 2 members. Basic knowledge of Power BI is recommended.
                </p>
              </div>

              <div className="glass p-6 rounded-xl reveal card-3d">
                <i className="fa-solid fa-clock text-highlight text-2xl mb-3" />
                <h3 className="text-lg font-semibold mb-2">Duration</h3>
                <p className="text-white/70 text-sm">
                  The competition will run for 3-4 hours, including data analysis, dashboard creation, and final presentation to judges.
                </p>
              </div>

              <div className="glass p-6 rounded-xl reveal card-3d">
                <i className="fa-solid fa-award text-highlight text-2xl mb-3" />
                <h3 className="text-lg font-semibold mb-2">Prizes & Recognition</h3>
                <p className="text-white/70 text-sm">
                  Winners will receive certificates, prizes, and recognition. Top dashboards will be showcased on the Analytica platform.
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
                      All participants must register before the deadline. Late registrations will not be accepted.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Dataset</h4>
                    <p className="text-white/70 text-sm">
                      The dataset will be provided at the start of the competition. No external data sources are allowed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Tools</h4>
                    <p className="text-white/70 text-sm">
                      Only Power BI Desktop will be allowed. Pre-installed templates and custom visuals are permitted.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Evaluation Criteria</h4>
                    <p className="text-white/70 text-sm">
                      Dashboards will be judged on: Data insights (40%), Visual design (30%), Interactivity (20%), and Presentation (10%).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold">Code of Conduct</h4>
                    <p className="text-white/70 text-sm">
                      Maintain professionalism and integrity. Plagiarism or copying will result in immediate disqualification.
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
                Have Questions?
              </h3>
              <p className="text-white/70 mb-6 max-w-2xl mx-auto">
                Reach out to us via the contact page or join our community for updates and announcements.
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
