import { useEffect } from "react";
import logo from "../assets/logo.png"
export default function About() {
  useEffect(() => {
    // simple reveal + stat counter
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          if(entry.target.querySelector('.stats-row')){
            animateStats();
          }
          observer.unobserve(entry.target);
        }
      });
    }, {threshold: 0.1});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

    function animateStats(){
      document.querySelectorAll('.stat-number[data-target]').forEach((stat, idx)=>{
        const target = parseInt(stat.getAttribute('data-target')) || 0;
        const duration = 1500; let current = 0;
        const step = target / (duration/16);
        const tick = ()=>{
          current += step;
          if(current < target){
            stat.textContent = Math.floor(current).toString();
            requestAnimationFrame(tick);
          } else {
            stat.textContent = target.toString();
            stat.classList.add('counting');
          }
        };
        setTimeout(tick, idx*200);
      });
    }
  }, []);

  return (
    <section id="about" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-1.5 h-6 bg-highlight rounded-full"></span>
            <span className="uppercase tracking-widest text-sm text-white/60">About Analytica</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">A community where learning meets opportunity</h2>
          <p className="text-white/80 text-lg mb-8 leading-relaxed">
            Analytica – Department of Data Science Student Association (DSSA) fosters practical skills, research thinking, and industry readiness, bridging the gap between academics and real-world data-driven practice.
          </p>
          <div className="stats-row grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="stat-box text-center">
              <div className="stat-number text-2xl font-bold text-highlight mb-1" data-target="2000">2000</div>
              <div className="stat-label text-white/60 text-sm">Founded</div>
            </div>
            <div className="stat-box text-center">
              <div className="stat-number text-2xl font-bold text-highlight mb-1" data-target="2130">2130</div>
              <div className="stat-label text-white/60 text-sm">Members</div>
            </div>
            <div className="stat-box text-center">
              <div className="stat-number text-2xl font-bold text-highlight mb-1" data-target="25">25</div>
              <div className="stat-label text-white/60 text-sm">Core Members</div>
            </div>
            <div className="stat-box text-center">
              <div className="stat-number text-2xl font-bold text-highlight mb-1" data-target="6">6</div>
              <div className="stat-label text-white/60 text-sm">Events/Year</div>
            </div>
          </div>
          <div className="mission-box glass p-6 rounded-2xl border-l-4 border-highlight">
            <h3 className="text-lg font-semibold text-white mb-3">Our Mission</h3>
            <p className="text-white/70">Empower students with applied data skills, toolchains, and innovation mindsets that translate into impactful careers.</p>
          </div>
        </div>
        <div className="reveal">
          <div className="about-visual glass px-8 rounded-3xl relative">
            <div className="mb-6 flex flex-col items-center w-full">
              <img src={logo} alt="Analytica" className="w-64 object-contain mb-4 mx-auto absolute -z-10 opacity-20 top-5" />
            </div>
            <div className="highlights space-y-4">
              <div className="highlight-item flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="highlight-icon w-12 h-12 rounded-full bg-gradient-to-r from-highlight to-accent flex items-center justify-center">
                  <i className="fa-solid fa-code text-ink"></i>
                </div>
                <div>
                  <div className="text-white font-medium">Technical Excellence</div>
                  <div className="text-white/60 text-sm">Workshops, hackathons, and hands-on projects</div>
                </div>
              </div>
              <div className="highlight-item flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="highlight-icon w-12 h-12 rounded-full bg-gradient-to-r from-accent to-secondary flex items-center justify-center">
                  <i className="fa-solid fa-users text-white"></i>
                </div>
                <div>
                  <div className="text-white font-medium">Community Support</div>
                  <div className="text-white/60 text-sm">Peer learning and alumni mentorship</div>
                </div>
              </div>
              <div className="highlight-item flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                <div className="highlight-icon w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center">
                  <i className="fa-solid fa-briefcase text-white"></i>
                </div>
                <div>
                  <div className="text-white font-medium">Career Growth</div>
                  <div className="text-white/60 text-sm">Industry connections and job placement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
