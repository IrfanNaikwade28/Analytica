import { useState } from "react";

export default function Contact(){
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [message,setMessage] = useState("");
  const [errors,setErrors] = useState({});
  const [status,setStatus] = useState(null); // {type:'success'|'error', text}
  const [loading,setLoading] = useState(false);

  const validate = ()=>{
    const e = {};
    if(!name.trim()) e.name = "Name is required.";
    if(!email.trim()) e.email = "Email is required.";
    else if(!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email.";
    if(!message.trim()) e.message = "Message is required.";
    else if(message.trim().length < 10) e.message = "Message must be at least 10 characters.";
    setErrors(e);
    return Object.keys(e).length===0;
  };

  const submit = async (ev)=>{
    ev.preventDefault();
    setStatus(null);
    if(!validate()) return;
    setLoading(true);
    try{
      const res = await fetch("https://acses-backend.onrender.com/api/contact/submit", {
        method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,message})
      });
      const data = await res.json();
      if(res.ok){
        setStatus({type:'success', text: data.message || 'Message sent successfully!'});
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus({type:'error', text: data.message || 'Something went wrong.'});
      }
    } catch(err){
      console.error(err);
      setStatus({type:'error', text:'Network error. Please try again.'});
    } finally {
      setLoading(false);
    }
  };

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
                <p className="text-white/70 max-w-full">Analytica – Department of Data Science & Statistical Analysis (DSSA)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl glass grid place-items-center"><i className="fa-solid fa-envelope text-highlight"></i></div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="text-white/70 max-w-full">analytica.dssa@example.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl glass grid place-items-center"><i className="fa-solid fa-phone text-highlight"></i></div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="text-white/70 max-w-full">+91 1234567890</p>
              </div>
            </div>
          </div>
        </div>
        <div className="reveal glass p-8 max-w-full">
          <form onSubmit={submit} noValidate className="grid gap-5 max-w-full">
            <div>
              <label className="text-white/70 text-sm">Your Name</label>
              <input value={name} onChange={e=>setName(e.target.value)} type="text" className={`mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.name? 'border-red-400':'border-white/10'} focus:outline-none focus:ring-2`} />
              {errors.name && <p className="field-error">{errors.name}</p>}
            </div>
            <div>
              <label className="text-white/70 text-sm">Your Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className={`mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.email? 'border-red-400':'border-white/10'} focus:outline-none focus:ring-2`} />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
            <div>
              <label className="text-white/70 text-sm">Message</label>
              <textarea value={message} onChange={e=>setMessage(e.target.value)} rows="4" className={`mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border ${errors.message? 'border-red-400':'border-white/10'} focus:outline-none focus:ring-2`} />
              {errors.message && <p className="field-error">{errors.message}</p>}
            </div>
            <button type="submit" disabled={loading} className="btn-magnetic relative w-full px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-secondary font-bold text-white">
              {loading? 'Sending…' : 'Send Message'}
              <span className="absolute inset-0 opacity-15 shimmer"></span>
            </button>
          </form>
          {status && (
            <div className={`contact-message ${status.type==='success'? 'success':'error'}`} style={{display:'block'}}>
              <i className={`fa-solid ${status.type==='success'?'fa-check-circle':'fa-exclamation-triangle'}`}></i> {status.text}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
