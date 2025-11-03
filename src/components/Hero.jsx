import { useEffect, useRef } from "react";
import slide1 from "../assets/images/slide1.jpg";
import slide2 from "../assets/images/slide2.jpg";
import slide3 from "../assets/images/slide3.jpg";
export default function Hero() {
  const slideshowRef = useRef(null);

  useEffect(() => {
    const imagePaths = [
      slide1,slide2,slide3
    ];
    const container = slideshowRef.current;
    if (!container) return;
    container.innerHTML = imagePaths
      .map((src, i) =>
        `<img src="${src}" class="slide absolute inset-0 w-full h-full object-cover transition-opacity duration-700" style="opacity: ${i===0?1:0};" />`
      ).join("");
    const slides = container.querySelectorAll('.slide');
    let current = 0;
    const id = setInterval(()=>{
      slides[current].style.opacity = 0;
      current = (current + 1) % slides.length;
      slides[current].style.opacity = 1;
    }, 3000);
    return ()=>clearInterval(id);
  }, []);

  return (
    <section id="home" className="min-h-[99vh] bg-hero relative flex items-center pt-24 px-4 sm:px-6 lg:px-8">
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-accent/25 blur-3xl animate-float sm:w-80 sm:h-80" />
      <div className="absolute top-1/4 -right-16 w-72 h-72 rounded-full bg-secondary/25 blur-3xl animate-float sm:w-96 sm:h-96" style={{animationDelay:'0.8s'}} />

      <div className="container mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center max-w-7xl">
        <div className="reveal max-w-full">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 glass border border-white/10 mb-6 max-w-xs">
            <span className="w-2 h-2 rounded-full bg-highlight animate-pulse-soft" />
            <span className="text-sm text-white/80 whitespace-nowrap">New semester, new opportunities</span>
          </div>
          <div className="reveal max-w-full flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-8 rounded bg-highlight block" />
              <span className="text-base sm:text-lg md:text-m font-semibold text-white uppercase tracking-wide">
                Building the next generation of data leaders
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-snug max-w-full uppercase">
              Analytica   <br /><span className="text-gradient">Data Science</span> <br />Student Association
            </h1>
            <p className="mt-5 text-white/80 text-base sm:text-lg md:text-xl max-w-xl">
              Workshops, hackathons, mentorship, and real projects—crafted to turn curiosity into capability.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4 max-w-full">
            <a href="#join" className="btn-magnetic relative inline-flex items-center gap-2 bg-highlight text-ink font-bold px-6 py-3 rounded-xl whitespace-nowrap">
              Join Analytica
              <i className="fa-solid fa-arrow-right"></i>
              <span className="absolute inset-0 opacity-30 shimmer" />
            </a>
            <a href="#events" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass hover:scale-[1.02] transition whitespace-nowrap">
              Explore Events
              <i className="fa-solid fa-calendar-days"></i>
            </a>
          </div>
          <div className="mt-10 overflow-hidden max-w-full">
            <div className="track flex items-center gap-10 animate-marquee select-none" aria-hidden="true">
              <i className="fa-brands fa-aws text-white/40 text-3xl"></i>
              <i className="fa-brands fa-github text-white/40 text-3xl"></i>
              <i className="fa-brands fa-docker text-white/40 text-3xl"></i>
              <i className="fa-brands fa-python text-white/40 text-3xl"></i>
              <i className="fa-brands fa-figma text-white/40 text-3xl"></i>
              <i className="fa-brands fa-node text-white/40 text-3xl"></i>
              <i className="fa-brands fa-react text-white/40 text-3xl"></i>
              <i className="fa-brands fa-aws text-white/40 text-3xl"></i>
              <i className="fa-brands fa-github text-white/40 text-3xl"></i>
              <i className="fa-brands fa-docker text-white/40 text-3xl"></i>
              <i className="fa-brands fa-python text-white/40 text-3xl"></i>
            </div>
          </div>
        </div>
        <div className="reveal relative max-w-full">
          <div className="glass p-3 rounded-2xl shadow-soft max-w-full overflow-hidden">
            <div ref={slideshowRef} id="hero-slideshow" className="hero-slideshow relative w-full h-[260px] sm:h-[320px] md:h-[360px] rounded-xl overflow-hidden"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
