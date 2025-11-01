import { useEffect, useMemo, useRef, useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import heroFallback from '../assets/images/hack_7Nov.jpg'
import problems from './IndustryX/problemStatements.json'
import { useForm, useFieldArray } from 'react-hook-form'

function Stat({ icon, label, value }){
  return (
    <div className="flex items-center gap-3 text-white/80">
      <i className={`${icon} text-highlight`}></i>
      <span className="text-sm">{label}: <span className="text-white font-semibold">{value}</span></span>
    </div>
  )
}

export default function IndustryX(){
  const registerRef = useRef(null)
  const [submitted, setSubmitted] = useState(null)

  const onRegisterClick = () => {
    registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const heroImage = useMemo(() => '/assets/industryx/hero.png', [])

  // Reveal-on-scroll animations (match pattern used in other sections)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    // Observe all .reveal elements in this page
    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))

    // In case first paint happens already in view, nudge observer
    setTimeout(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0
        if (inView) el.classList.add('in')
      })
    }, 0)

    return () => observer.disconnect()
  }, [])

  // Form setup
  const { register, control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      teamName: '',
      leaderName: '',
      leaderEmail: '',
      leaderPhone: '',
      department: '',
      year: '',
      division: '',
      members: [
        { name: '', email: '' },
        { name: '', email: '' }
      ],
      problemId: '',
      problemTitle: ''
    }
  })
  const { fields, append, remove } = useFieldArray({ control, name: 'members' })

  const selectedProblemId = watch('problemId')
  const selectedProblem = useMemo(() => problems.find(p => String(p.id) === String(selectedProblemId)), [selectedProblemId])

  // keep problem title in sync when selection changes
  useEffect(() => {
    if (selectedProblem) setValue('problemTitle', selectedProblem.title, { shouldValidate: true, shouldDirty: true })
    else setValue('problemTitle', '', { shouldValidate: true, shouldDirty: true })
  }, [selectedProblem, setValue])

  const onSubmit = (data) => {
    setSubmitted(data)
    // scroll to summary
    setTimeout(() => registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  const remainingAdds = 5 - fields.length // up to 5 optional members (leader is outside)

  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <main className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start min-h-[calc(100vh-6rem)] w-full pt-6">
            <div className="reveal">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">IndustryX</h1>
              <p className="mt-3 text-white/80 max-w-xl">Solve real industry problems with your team. Build, validate, and present your solution with guidance from mentors.</p>
              <div className="mt-4 flex flex-col gap-2">
                <Stat icon="fa-regular fa-calendar-days" label="Date" value="07 Oct 2K25" />
                <Stat icon="fa-solid fa-location-dot" label="Venue" value="Data Science Dept., Campus Hall" />
                <Stat icon="fa-regular fa-hourglass-half" label="Registration Deadline" value="30 Sep 2K25, 11:59 PM" />
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={onRegisterClick} className="btn-magnetic px-6 py-3 rounded-xl bg-highlight text-ink font-bold hover:scale-105 transition">Register Now</button>
                <a href="/assets/industryx/guide.pdf" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl glass hover:scale-105 transition">Guide PDF</a>
              </div>
              {/* Extra quick info to better fill the space and answer FAQs at a glance */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl flex items-start gap-3">
                  <i className="fa-solid fa-users text-highlight mt-1" />
                  <div>
                    <div className="font-semibold">Eligibility</div>
                    <p className="text-white/70 text-sm">Open to FE/SE/TE/BE; cross-branch teams welcome.</p>
                  </div>
                </div>
                <div className="glass p-4 rounded-xl flex items-start gap-3">
                  <i className="fa-solid fa-coins text-highlight mt-1" />
                  <div>
                    <div className="font-semibold">Prizes & Swag</div>
                    <p className="text-white/70 text-sm">Goodies and certificates for top teams.</p>
                  </div>
                </div>
                <div className="glass p-4 rounded-xl flex items-start gap-3">
                  <i className="fa-solid fa-chalkboard-user text-highlight mt-1" />
                  <div>
                    <div className="font-semibold">Mentor Sessions</div>
                    <p className="text-white/70 text-sm">Industry mentors will guide you throughout.</p>
                  </div>
                </div>
                <div className="glass p-4 rounded-xl flex items-start gap-3">
                  <i className="fa-regular fa-clock text-highlight mt-1" />
                  <div>
                    <div className="font-semibold">Timeline</div>
                    <p className="text-white/70 text-sm">Problem brief → build sprint → final pitch.</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-white/60 text-sm">Questions? Reach out via the <a href="/contact" className="text-highlight underline-offset-2 hover:underline">Contact page</a>.</p>
            </div>
            <div className="reveal flex items-center justify-center h-full">
              <div className="overflow-hidden rounded-2xl flex items-center justify-center h-64 sm:h-full">
                <img src={heroImage} onError={(e)=>{e.currentTarget.src = heroFallback}} alt="IndustryX Hero" className="w-full h-64 sm:h-80 object-cover" />
              </div>
            </div>
          </section>

          {/* Problem Statements */}
          <section className="mt-16">
            <div className="reveal flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Problem Statements</h2>
                <p className="text-white/70">Pick one problem and register your team against it.</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems.map((p) => (
                <div key={p.id} className="glass rounded-2xl p-5 card-3d reveal hover:translate-y-[-4px] hover:shadow-glow transition">
                  <div className="text-sm text-white/60">Problem {p.id}</div>
                  <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
                  <div className="mt-2 text-white/70 text-sm">Mentor: <span className="text-white">{p.mentor}</span></div>
                  <div className="text-white/70 text-sm">Company: <span className="text-white">{p.company}</span></div>
                  <a href={p.pdf} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg glass hover:scale-[1.02] transition">
                    View PDF <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Registration Form */}
          <section className="mt-16" ref={registerRef}>
            <div className="reveal">
              <h2 className="text-2xl sm:text-3xl font-bold">Register Your Team</h2>
              <p className="text-white/70">All fields are required. Minimum 3 members including leader. Maximum 6.</p>
            </div>

            {!submitted && (
            <form className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="lg:col-span-1 glass p-6 rounded-2xl">
                <label className="text-white/70 text-sm">Problem Statement</label>
                <select
                  className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2"
                  {...register('problemId', { required: 'Please select a problem' })}
                >
                  <option value="">Select Problem</option>
                  {problems.map(p => (
                    <option key={p.id} value={p.id}>Problem {p.id} — {p.title.slice(0,40)}{p.title.length>40?'…':''}</option>
                  ))}
                </select>
                {errors.problemId && <p className="text-red-400 text-sm mt-1">{errors.problemId.message}</p>}

                <div className="mt-4">
                  <label className="text-white/70 text-sm">Problem Title</label>
                  <input disabled value={selectedProblem?.title || ''} className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none" />
                </div>
              </div>

              {/* Right: Team details */}
              <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass p-6 rounded-2xl">
                  <label className="text-white/70 text-sm">Team Name</label>
                  <input className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register('teamName', { required: 'Team name is required' })} />
                  {errors.teamName && <p className="text-red-400 text-sm mt-1">{errors.teamName.message}</p>}
                </div>

                <div className="glass p-6 rounded-2xl">
                  <label className="text-white/70 text-sm">Leader Name</label>
                  <input className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register('leaderName', { required: 'Leader name is required' })} />
                  {errors.leaderName && <p className="text-red-400 text-sm mt-1">{errors.leaderName.message}</p>}
                </div>

                <div className="glass p-6 rounded-2xl">
                  <label className="text-white/70 text-sm">Leader Email</label>
                  <input type="email" className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register('leaderEmail', {
                    required: 'Leader email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
                  })} />
                  {errors.leaderEmail && <p className="text-red-400 text-sm mt-1">{errors.leaderEmail.message}</p>}
                </div>

                <div className="glass p-6 rounded-2xl">
                  <label className="text-white/70 text-sm">Leader Phone Number</label>
                  <input type="tel" className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register('leaderPhone', {
                    required: 'Leader phone is required',
                    pattern: { value: /^[0-9]{7,15}$/, message: '7–15 digits' }
                  })} />
                  {errors.leaderPhone && <p className="text-red-400 text-sm mt-1">{errors.leaderPhone.message}</p>}
                </div>

                <div className="glass p-6 rounded-2xl">
                  <label className="text-white/70 text-sm">Department</label>
                  <input placeholder="e.g., SY_DS" className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register('department', { required: 'Department is required' })} />
                  {errors.department && <p className="text-red-400 text-sm mt-1">{errors.department.message}</p>}
                </div>

                <div className="glass p-6 rounded-2xl">
                  <label className="text-white/70 text-sm">Year</label>
                  <select className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register('year', { required: 'Year is required' })}>
                    <option value="">Select Year</option>
                    <option value="FE">FE</option>
                    <option value="SE">SE</option>
                    <option value="TE">TE</option>
                    <option value="BE">BE</option>
                  </select>
                  {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>}
                </div>

                <div className="glass p-6 rounded-2xl">
                  <label className="text-white/70 text-sm">Division</label>
                  <input placeholder="e.g., A" className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register('division', { required: 'Division is required' })} />
                  {errors.division && <p className="text-red-400 text-sm mt-1">{errors.division.message}</p>}
                </div>

                {/* Members */}
                <div className="md:col-span-2 glass p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="text-white/70 text-sm">Members (excluding leader)</label>
                    <div className="text-white/60 text-xs">Min 2, Max 5</div>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fields.map((field, index) => (
                      <div key={field.id} className="glass p-4 rounded-xl border border-white/10">
                        <div>
                          <label className="text-white/70 text-xs">Member Name</label>
                          <input className="mt-2 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register(`members.${index}.name`, { required: 'Name required' })} />
                          {errors.members?.[index]?.name && <p className="text-red-400 text-xs mt-1">{errors.members[index].name.message}</p>}
                        </div>
                        <div className="mt-3">
                          <label className="text-white/70 text-xs">Member Email</label>
                          <input type="email" className="mt-2 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register(`members.${index}.email`, {
                            required: 'Email required',
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' }
                          })} />
                          {errors.members?.[index]?.email && <p className="text-red-400 text-xs mt-1">{errors.members[index].email.message}</p>}
                        </div>
                        {fields.length > 2 && (
                          <div className="mt-3 text-right">
                            <button type="button" onClick={() => remove(index)} className="px-3 py-2 rounded-lg glass hover:scale-[1.02] transition">Remove</button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-white/60 text-xs">You can add {Math.max(0, remainingAdds)} more</div>
                    <button type="button" disabled={remainingAdds <= 0} onClick={() => append({ name: '', email: '' })} className="px-4 py-2 rounded-lg glass hover:scale-[1.02] transition disabled:opacity-50">Add Member</button>
                  </div>
                </div>

                {/* Hidden synced problem title field for submission integrity */}
                <input type="hidden" {...register('problemTitle', { required: true })} />

                {/* Submit */}
                <div className="md:col-span-2">
                  <button type="submit" className="btn-magnetic w-full sm:w-auto px-8 py-3 rounded-xl bg-highlight text-ink font-bold hover:scale-105 transition">Submit Registration</button>
                </div>
              </div>
            </form>
            )}

            {submitted && (
              <div className="mt-6 glass p-6 rounded-2xl reveal">
                <h3 className="text-xl font-bold text-green-400">Registration Successful</h3>
                <p className="text-white/70">Thanks, your team is registered. Summary below:</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div><span className="text-white">Team:</span> {submitted.teamName}</div>
                  <div><span className="text-white">Leader:</span> {submitted.leaderName} ({submitted.leaderEmail})</div>
                  <div><span className="text-white">Phone:</span> {submitted.leaderPhone}</div>
                  <div><span className="text-white">Dept/Year/Div:</span> {submitted.department} / {submitted.year} / {submitted.division}</div>
                  <div className="md:col-span-2"><span className="text-white">Problem:</span> {submitted.problemId} — {submitted.problemTitle}</div>
                  <div className="md:col-span-2"><span className="text-white">Members:</span> {submitted.members.map(m=>m.name).join(', ')}</div>
                </div>
                <div className="mt-4 flex gap-3">
                  <button className="px-5 py-2 rounded-xl glass" onClick={()=>setSubmitted(null)}>Edit Response</button>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
