import { Link } from "react-router-dom";
import hackImage from "../assets/images/hack_7Nov.png";
const EVENTS = [
  {
    title: "Realtime Industrial Problems Solving Competition",
    description: "Code for the Real World",
    date: "11-Nov-2025",
    image: `${hackImage}`,
    badge: "Done",
    badgeColor: "bg-green-500",
    href: "/industryx"
  },
];
export default function Events(){

  return (
    <section id="events" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="reveal flex flex-wrap items-end justify-between gap-4 max-w-full">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-full"><span className="text-gradient">Events</span> & Experiences</h2>
            <p className="mt-2 text-white/70 max-w-full">From hackathons to career fairs—discover what's next.</p>
          </div>
          <a href="#join" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl glass hover:scale-[1.02] transition whitespace-nowrap">Get Involved <i className="fa-solid fa-arrow-right"></i></a>
        </div>

        <div className="mt-10 max-w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full">
            {EVENTS.map((event,idx)=> (
              <div key={event.title} className="relative overflow-hidden rounded-3xl glass card-3d reveal border-2 border-gradient shadow-[0_0_30px_rgba(255,159,252,0.3)]" style={{transitionDelay: `${idx*80}ms`, borderImage: 'linear-gradient(135deg, rgba(255,159,252,0.6), rgba(57,46,78,0.6)) 1'}}>
                <Link to={event.href}>
                  <div className="relative">
                    <img className="w-full h-52 sm:h-56 md:h-60 object-cover" src={event.image} alt={event.title} />
                    {event.badge && (<div className={`absolute top-4 left-4 px-4 py-1.5 text-xs rounded-full ${event.badgeColor} text-white font-bold shadow-lg`}>{event.badge}</div>)}
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold">{event.title}</h4>
                    <p className="text-white/70 mt-1">{event.description}</p>
                    <div className="mt-3 text-white/60 text-sm"><i className="fa-regular fa-calendar-days mr-2"></i>{event.date}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits section to preserve anchors */}
        <section id="benefits" className="pt-24">
          <div className="reveal text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold max-w-full">Why Join <span className="text-gradient uppercase">Analytica</span>?</h2>
            <p className="mt-2 text-white/70 max-w-full">Learn faster, build stronger, and grow together—with support at every step.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full">
            {[
              {icon:'fa-solid fa-laptop-code', title:'Technical Workshops', text:'Hands-on learning with experts across AI, Cloud, Security, and more.'},
              {icon:'fa-solid fa-people-group', title:'Mentorship & Peers', text:'Alumni mentors and peer guilds accelerate learning curves.'},
              {icon:'fa-solid fa-briefcase', title:'Career Pathways', text:'Resume clinics, mock interviews, and internship pipelines.'},
              {icon:'fa-solid fa-ranking-star', title:'Competitions', text:'Hackathons and contests with recognition and rewards.'},
              {icon:'fa-solid fa-diagram-project', title:'Real Projects', text:'Build a portfolio with end‑to‑end projects and demos.'},
              {icon:'fa-solid fa-certificate', title:'Certificates', text:'Validated proof of participation and achievement.'},
            ].map((b)=> (
              <div key={b.title} className="glass p-6 rounded-2xl card-3d reveal benefit-card">
                <i className={`${b.icon} text-2xl text-highlight`}></i>
                <h4 className="mt-4 font-semibold text-lg">{b.title}</h4>
                <p className="text-white/70 mt-1">{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Join section to preserve anchors */}
        <section id="join" className="pt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="glass p-8 rounded-2xl reveal max-w-full text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Join <span className="text-gradient uppercase">Analytica</span></h2>
              <p className="mt-2 text-white/70 mb-8">Become a member of our student community by filling our official registration form.</p>
              <a href="#contact" className="btn-magnetic relative inline-block w-full sm:w-auto py-3 px-8 rounded-xl bg-highlight text-ink font-bold text-lg hover:scale-105 transition" style={{textAlign:'center'}}>
                Join here
                <span className="absolute inset-0 opacity-20 shimmer"></span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
