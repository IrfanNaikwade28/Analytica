import { useEffect, useRef, useState } from "react";
import hackImage from "../assets/images/hack_7Nov.jpg";
const UPCOMING = [
  {
    title: "Realtime Industrial Problems Solving Hackathon",
    description: "fun + challenge 🚀",
    date: "07-OCT-2k25",
    image: `${hackImage}`,
    isHighlighted: true,
    href: "#join"
  },
];

const PAST = [
  {
    id: 'Technoutsav-2024',
    title: "Technoutsav 2K24",
    description: "A National level event",
    date: "Aug 20, 2024",
    coverImage: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1400&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80",
    ],
    fullDescription: "Techno Utsav is a thrilling national-level technical competition designed to challenge intellect, speed, and innovation.",
    highlights: ["National-Level Technical Event","Aptitude Quest – Round 1","Tech Challenge – Round 2"]
  },
];

export default function Events(){
  const [modalEvent, setModalEvent] = useState(null);
  const [slide, setSlide] = useState(0);
  const slidesTrackRef = useRef(null);

  useEffect(()=>{
    if(modalEvent){ setSlide(0); }
  },[modalEvent]);

  useEffect(()=>{
    if(slidesTrackRef.current){
      slidesTrackRef.current.style.transform = `translateX(-${slide*100}%)`;
    }
  },[slide]);

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
          <h3 className="text-lg sm:text-xl font-semibold text-white/80 mb-4 max-w-full">Upcoming</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-full">
            {UPCOMING.map((event,idx)=> (
              <div key={event.title} className={`relative overflow-hidden rounded-2xl glass card-3d reveal upcoming-card ${event.isHighlighted? 'ring-2 ring-highlight/60 shadow-glow':''}`} style={{transitionDelay: `${idx*80}ms`}}>
                <div className="relative">
                  <img className="w-full h-52 sm:h-56 md:h-60 object-cover" src={event.image} alt={event.title} />
                  {event.isHighlighted && (<div className="absolute top-4 left-4 px-3 py-1 text-xs rounded-full bg-highlight text-ink font-bold">Next Event</div>)}
                </div>
                <a href={event.href}>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold">{event.title}</h4>
                    <p className="text-white/70 mt-1">{event.description}</p>
                    <div className="mt-3 text-white/60 text-sm"><i className="fa-regular fa-calendar-days mr-2"></i>{event.date}</div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 max-w-full">
          <h3 className="text-lg sm:text-xl font-semibold text-white/80 mb-4 max-w-full">Past Highlights</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full">
            {PAST.map((e,idx)=> (
              <div key={e.id} className="overflow-hidden rounded-2xl glass card-3d reveal past-card" style={{transitionDelay: `${idx*80}ms`}} onClick={()=>setModalEvent(e)}>
                <div className="relative group">
                  <img className="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-105" src={e.coverImage} alt={e.title} />
                </div>
                <div className="p-5">
                  <h4 className="font-semibold">{e.title}</h4>
                  <p className="text-white/70 text-sm mt-1">{e.description}</p>
                  <div className="mt-2 text-white/60 text-xs"><i className="fa-regular fa-calendar mr-2"></i>{e.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits section to preserve anchors */}
        <section id="benefits" className="pt-24">
          <div className="reveal text-center max-w-2xl mx-auto max-w-full">
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

      {/* Event Modal */}
      <div id="event-modal" className={`event-modal ${modalEvent? 'active':''} ${modalEvent? '':'hidden'}`}>
        <div className="modal-overlay" onClick={()=>setModalEvent(null)} />
        <div className="modal-card">
          <button className="modal-close" onClick={()=>setModalEvent(null)}><i className="fa-solid fa-times" /></button>
          {modalEvent && (
            <div className="modal-content">
              <div className="slideshow-container">
                <div className="slideshow-wrapper">
                  <div className="slides-track" ref={slidesTrackRef}>
                    {modalEvent.gallery.map((src,i)=> (
                      <div className="slide" key={src}><img src={src} alt={`Event image ${i+1}`} /></div>
                    ))}
                  </div>
                </div>
                <button className="slide-nav slide-prev" onClick={()=>setSlide(s=>Math.max(0,s-1))} disabled={slide===0}><i className="fa-solid fa-chevron-left" /></button>
                <button className="slide-nav slide-next" onClick={()=>setSlide(s=>Math.min((modalEvent?.gallery?.length||1)-1, s+1))} disabled={slide===(modalEvent?.gallery?.length||1)-1}><i className="fa-solid fa-chevron-right" /></button>
                <div className="slide-indicators">
                  {modalEvent.gallery.map((_,i)=> (
                    <button key={i} className={`slide-indicator ${i===slide? 'active':''}`} onClick={()=>setSlide(i)} />
                  ))}
                </div>
              </div>
              <div className="modal-details">
                <h2 className="modal-title">{modalEvent.title}</h2>
                <div className="modal-date"><i className="fa-regular fa-calendar"/> {modalEvent.date}</div>
                <div className="modal-description">{modalEvent.fullDescription}</div>
                <div className="modal-highlights">
                  <h4>Event Highlights:</h4>
                  <ul>
                    {modalEvent.highlights.map(h=> (<li key={h}>{h}</li>))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
