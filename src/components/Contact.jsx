export default function Contact(){

  return (
    <section id="contact" className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="reveal max-w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Contact Us</h2>
          <p className="mt-2 text-white/70 max-w-full">Have questions or suggestions? We’d love to hear from you.</p>
          <div className="mt-6 space-y-4 max-w-full">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl glass grid place-items-center"><i className="fa-solid fa-location-dot text-highlight"></i></div>
              <div>
                <h4 className="font-semibold">Address</h4>
                <p className="text-white/70 max-w-full">Analytica - Department of Data Science, DYPCET</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl glass grid place-items-center"><i className="fa-solid fa-envelope text-highlight"></i></div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-white/70 max-w-full">analytica.dssa@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl glass grid place-items-center"><i className="fa-solid fa-user-group text-highlight"></i></div>
              <div>
                <h4 className="font-semibold">Reach Out to Us</h4>
                <p className="text-white/70 max-w-full">Have inquiries or collaboration ideas? Our faculty would be glad to connect with you.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="reveal glass p-8 max-w-full">
          <form className="grid gap-5 max-w-full" aria-disabled="true">
            <div>
              <label className="text-white/70 text-sm">Your Name</label>
              <input
                type="text"
                placeholder="Your Name"
                disabled
                readOnly
                className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 opacity-60 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-white/70 text-sm">Your Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                disabled
                readOnly
                className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 opacity-60 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="text-white/70 text-sm">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                disabled
                readOnly
                className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 opacity-60 cursor-not-allowed"
              />
            </div>
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="btn-magnetic relative w-full px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-secondary font-bold text-white opacity-60 cursor-not-allowed"
            >
              Send Message
              <span className="absolute inset-0 opacity-15 shimmer"></span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
