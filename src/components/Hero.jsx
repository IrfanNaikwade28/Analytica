import GridScan from "./GridScan";

export default function Hero() {
  return (
    <section id="home" className="min-h-[99vh] bg-hero relative flex items-center justify-center pt-24 px-4 sm:px-6 lg:px-8">
      {/* GridScan Background */}
      <div className="absolute inset-0 w-full h-full">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>

      {/* Accent blobs */}
      <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-accent/25 blur-3xl animate-float sm:w-80 sm:h-80" />
      <div className="absolute top-1/4 -right-16 w-72 h-72 rounded-full bg-secondary/25 blur-3xl animate-float sm:w-96 sm:h-96" style={{animationDelay:'0.8s'}} />

      {/* Centered Content */}
      <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center max-w-5xl">
        <div className="reveal max-w-full">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 glass border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-highlight animate-pulse-soft" />
            <span className="text-sm text-white/80 whitespace-nowrap">New semester, new opportunities</span>
          </div>
          
          <div className="reveal max-w-full flex flex-col items-center">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <span className="w-2 h-8 rounded bg-highlight block" />
              <span className="text-base sm:text-lg md:text-xl font-semibold text-white uppercase tracking-wide">
                Building the next generation of data leaders
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-extrabold leading-snug max-w-full uppercase">
              Analytica <br /><span className="text-gradient">Data Science</span> <br />Student Association
            </h1>
            <p className="mt-5 text-white/80 text-base sm:text-lg md:text-xl max-w-3xl">
              Workshops, hackathons, mentorship, and real projects—crafted to turn curiosity into capability.
            </p>
          </div>
          
          <div className="mt-4 mb-4 flex flex-wrap items-center justify-center gap-2 max-w-full">
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
        </div>
      </div>
    </section>
  );
}
