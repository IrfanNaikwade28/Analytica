import { useEffect, useMemo, useRef, useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import heroImage from '../assets/images/hack_7Nov.jpg'
import problems from '../assets/Data/problemStatements.json'
import { useForm } from 'react-hook-form'
import { supabase } from '../lib/supabaseClient.js'
import { sendRegistrationConfirmationEmail } from '../lib/sendEmail.js'

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
  // success UI handled via toasts only
  const [toasts, setToasts] = useState([])
  const [loading, setLoading] = useState(false)

  // Map PDFs from src/assets to served URLs so links work in Vite dev/build
  // This avoids relying on public/ for PDFs and handles spaces in folder names.
  const pdfMap = useMemo(() => {
    // Eagerly import all PDFs as URLs
    const modules = import.meta.glob('../assets/Industry Problems/*.pdf', {
      eager: true,
      as: 'url',
    })
    const map = {}
    Object.entries(modules).forEach(([key, url]) => {
      const filename = key.split('/').pop()
      map[filename] = url
    })
    return map
  }, [])

  const pushToast = ({ type = 'info', title, message, duration = 4500 }) => {
    const id = Date.now() + Math.random()
    const toast = { id, type, title, message, duration }
    setToasts((prev) => [...prev, toast])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, duration)
  }
  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id))

  // sharing helpers removed with new success flow (toast only)

  const onRegisterClick = () => {
    registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Ensure we land at the top (hero) when navigating to /industryx
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    const els = document.querySelectorAll('.reveal')
    els.forEach((el) => observer.observe(el))

    setTimeout(() => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const inView = rect.top < window.innerHeight && rect.bottom > 0
        if (inView) el.classList.add('in')
      })
    }, 0)

    return () => observer.disconnect()
  }, [])

  const { register, handleSubmit, watch, setValue, setError, reset, formState: { errors } } = useForm({
    defaultValues: {
      teamName: '',
      leaderName: '',
      leaderEmail: '',
      leaderPhone: '',
      year: '',
      division: '',
      problem1_id: '',
      problem1_title: '',
      problem2_id: '',
      problem2_title: '',
      problem3_id: '',
      problem3_title: '',
      member1_name: '',
      member1_email: '',
      member2_name: '',
      member2_email: '',
      member3_name: '',
      member3_email: '',
      member4_name: '',
      member4_email: '',
    }
  })
  const p1 = watch('problem1_id')
  const p2 = watch('problem2_id')
  const p3 = watch('problem3_id')
  const p1Obj = useMemo(() => problems.find(p => String(p.id) === String(p1)), [p1])
  const p2Obj = useMemo(() => problems.find(p => String(p.id) === String(p2)), [p2])
  const p3Obj = useMemo(() => problems.find(p => String(p.id) === String(p3)), [p3])

  useEffect(() => {
    setValue('problem1_title', p1Obj?.title || '', { shouldValidate: true })
  }, [p1Obj, setValue])
  useEffect(() => {
    setValue('problem2_title', p2Obj?.title || '', { shouldValidate: true })
  }, [p2Obj, setValue])
  useEffect(() => {
    setValue('problem3_title', p3Obj?.title || '', { shouldValidate: true })
  }, [p3Obj, setValue])

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      // Normalize team name and check uniqueness before insert
      const teamName = data.teamName.trim()
      const leaderEmail = data.leaderEmail.trim().toLowerCase()
      const { data: existing, error: checkError } = await supabase
        .from('teams')
        .select('id')
        .eq('team_name', teamName)
        .maybeSingle()

      if (checkError) throw checkError
      if (existing) {
        setError('teamName', { type: 'manual', message: 'This team name is already taken. Please choose a different name.' })
        pushToast({ type: 'error', title: 'Duplicate team name', message: 'This team name is already taken. Please choose a different name.' })
        registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      // Optional: Check duplicate leader email if constrained in DB
      const { data: existingEmail, error: emailCheckError } = await supabase
        .from('teams')
        .select('id')
        .eq('leader_email', leaderEmail)
        .maybeSingle()
      if (emailCheckError) throw emailCheckError
      if (existingEmail) {
        setError('leaderEmail', { type: 'manual', message: 'An entry with this leader email already exists.' })
        pushToast({ type: 'error', title: 'Duplicate email', message: 'An entry with this leader email already exists.' })
        registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      // Validate three unique problems client-side
      if (!p1 || !p2 || !p3) {
        pushToast({ type: 'error', title: 'Select 3 problems', message: 'Please select Problem 1, Problem 2 and Problem 3.' })
        return
      }
      if (p1 === p2 || p1 === p3 || p2 === p3) {
        pushToast({ type: 'error', title: 'Duplicate problems', message: 'Each problem choice must be different.' })
        return
      }

      const { error } = await supabase.from('teams').insert([
        {
          team_name: teamName,
          leader_name: data.leaderName,
          leader_email: leaderEmail,
          leader_phone: data.leaderPhone,
          year_of_study: data.year,
          division: data.division,
          problem1_id: Number(data.problem1_id),
          problem1_title: data.problem1_title,
          problem2_id: Number(data.problem2_id),
          problem2_title: data.problem2_title,
          problem3_id: Number(data.problem3_id),
          problem3_title: data.problem3_title,
          member1_name: data.member1_name,
          member1_email: data.member1_email,
          member2_name: data.member2_name,
          member2_email: data.member2_email,
          member3_name: data.member3_name,
          member3_email: data.member3_email,
          member4_name: data.member4_name || null,
          member4_email: data.member4_email || null,
        },
      ])
      if (error) {
        // Handle race condition where another team claimed the name just now
        if ((error.code === '23505') || (error.message && error.message.toLowerCase().includes('duplicate key'))) {
          const isEmail = error.message && error.message.includes('leader_email')
          if (isEmail) {
            setError('leaderEmail', { type: 'manual', message: 'An entry with this leader email already exists.' })
            pushToast({ type: 'error', title: 'Duplicate email', message: 'An entry with this leader email already exists.' })
          } else {
            setError('teamName', { type: 'manual', message: 'This team name is already taken. Please choose a different name.' })
            pushToast({ type: 'error', title: 'Duplicate team name', message: 'This team name is already taken. Please choose a different name.' })
          }
          registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        throw error
      }
      // Fire-and-forget email; don't block UI (works in prod and with vercel dev, falls back to SMTP if configured)
      setTimeout(() => {
        sendRegistrationConfirmationEmail({
          leader_name: data.leaderName,
          leader_email: leaderEmail,
          team_name: teamName,
          leader_phone: data.leaderPhone,
          division: data.division,
          year_of_study: data.year,
          problem1_title: data.problem1_title,
          problem2_title: data.problem2_title,
          problem3_title: data.problem3_title,
        })
      }, 0)

      pushToast({ type: 'success', title: 'Registration successful! Confirmation email sent to leader.' })
      setTimeout(() => registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
      reset()
    } catch (err) {
      console.error(err)
      pushToast({ type: 'error', title: 'Submission failed', message: err?.message || 'Network or unknown error.' })
    } finally {
      setLoading(false)
    }
  }
  const onInvalid = () => {
    pushToast({ type: 'error', title: 'Fix required fields', message: 'Please fill all required fields correctly.' })
    registerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  // removed dynamic member add/remove; fixed 4 member blocks (1-3 required, 4 optional)

  return (
    <div className="selection:bg-accent/30 selection:text-white">
      <Header />
      <main className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start min-h-[calc(100vh-6rem)] w-full pt-6">
            <div className="reveal">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">IndustryX</h1>
              <p className="mt-3 text-white/80 max-w-xl">Solve real time industry problems with your team. Build, validate, and present your solution with guidance from mentors.</p>
              <div className="mt-4 flex flex-col gap-2">
                <Stat icon="fa-regular fa-calendar-days" label="Date" value="7th Nov 2025" />
                <Stat icon="fa-solid fa-location-dot" label="Venue" value="Data Science Dept, DYPCET" />
                <Stat icon="fa-regular fa-hourglass-half" label="Registration Deadline" value="5th Nov 2025, 11:59 PM" />
              </div>
              <div className="mt-6 flex gap-3">
                <button onClick={onRegisterClick} className="btn-magnetic px-6 py-3 rounded-xl bg-highlight text-ink font-bold hover:scale-105 transition max-sm:text-sm">Register Now</button>
                <a href="/assets/industryx/guide.pdf" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl  glass hover:scale-105 transition max-sm:text-sm text-center">Rules and Regulation</a>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl flex items-start gap-3">
                  <i className="fa-solid fa-users text-highlight mt-1" />
                  <div>
                    <div className="font-semibold">Eligibility</div>
                    <p className="text-white/70 text-sm">Open to SY/TY Students.</p>
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
                <img src={heroImage} alt="IndustryX Hero" className="w-full h-64 sm:h-80 object-cover" />
              </div>
            </div>
          </section>

          <section className="mt-16">
            <div className="reveal flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">Problem Statements</h2>
                <p className="text-white/70">Select your top 3 distinct problems and then register your team.</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems.map((p) => (
                <div
                  key={p.id}
                  className="glass rounded-2xl p-5 card-3d reveal hover:translate-y-[-4px] hover:shadow-glow transition h-full flex flex-col min-h-[300px]"
                >
                  <div className="text-sm text-white/60">Problem {p.id}</div>
                  <h3 className="text-lg font-semibold mt-1 line-clamp-3 min-h-[72px]">{p.title}</h3>
                  <div className="mt-2 text-white/70 text-sm space-y-1">
                    <div>Industry Mentor: <span className="text-white">{p.industry_mentor}</span></div>
                    <div>Faculty Mentor: <span className="text-white">{p.faculty_mentor}</span></div>
                    <div>Company: <span className="text-white">{p.company}</span></div>
                  </div>
                  <div className="pt-4 mt-auto">
                    {(() => {
                      const filename = (p.pdf && typeof p.pdf === 'string') ? p.pdf.split('/').pop() : ''
                      const resolvedUrl = filename ? (pdfMap[filename] || p.pdf) : p.pdf
                      return (
                        <a
                          href={resolvedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass hover:scale-[1.02] transition"
                        >
                          View PDF <i className="fa-solid fa-arrow-up-right-from-square" />
                        </a>
                      )
                    })()}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-20" ref={registerRef}>
            <div className="reveal">
              <h2 className="text-2xl sm:text-3xl font-bold">Register Your Team</h2>
              <p className="text-white/70">Minimum 4 team members including leader. Maximum 5 including leader. Please pick 3 distinct problems.</p>
            </div>

            <form className={`mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 ${loading ? 'opacity-60 pointer-events-none' : ''}`} onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
              <div className="lg:col-span-1 glass p-6 rounded-2xl">
                <label className="text-white/70 text-sm">Problem Choices</label>
                {/* Problem 1 */}
                <div className="mt-2">
                  <label className="text-white/60 text-xs">Problem 1</label>
                  <select className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2"
                    {...register('problem1_id', {
                      required: 'Select Problem 1',
                      validate: (v) => (v !== watch('problem2_id') && v !== watch('problem3_id')) || 'Problems must be different'
                    })}
                  >
                    <option value="">Select Problem 1</option>
                    {problems.map(p => (
                      <option key={p.id} value={p.id}>Problem {p.id} — {p.title.slice(0,40)}{p.title.length>40?'…':''}</option>
                    ))}
                  </select>
                  {errors.problem1_id && <p className="text-red-400 text-sm mt-1">{errors.problem1_id.message}</p>}
                  <input disabled value={p1Obj?.title || ''} className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none" />
                </div>
                {/* Problem 2 */}
                <div className="mt-4">
                  <label className="text-white/60 text-xs">Problem 2</label>
                  <select className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2"
                    {...register('problem2_id', {
                      required: 'Select Problem 2',
                      validate: (v) => (v !== watch('problem1_id') && v !== watch('problem3_id')) || 'Problems must be different'
                    })}
                  >
                    <option value="">Select Problem 2</option>
                    {problems.map(p => (
                      <option key={p.id} value={p.id}>Problem {p.id} — {p.title.slice(0,40)}{p.title.length>40?'…':''}</option>
                    ))}
                  </select>
                  {errors.problem2_id && <p className="text-red-400 text-sm mt-1">{errors.problem2_id.message}</p>}
                  <input disabled value={p2Obj?.title || ''} className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none" />
                </div>
                {/* Problem 3 */}
                <div className="mt-4">
                  <label className="text-white/60 text-xs">Problem 3</label>
                  <select className="mt-1 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2"
                    {...register('problem3_id', {
                      required: 'Select Problem 3',
                      validate: (v) => (v !== watch('problem1_id') && v !== watch('problem2_id')) || 'Problems must be different'
                    })}
                  >
                    <option value="">Select Problem 3</option>
                    {problems.map(p => (
                      <option key={p.id} value={p.id}>Problem {p.id} — {p.title.slice(0,40)}{p.title.length>40?'…':''}</option>
                    ))}
                  </select>
                  {errors.problem3_id && <p className="text-red-400 text-sm mt-1">{errors.problem3_id.message}</p>}
                  <input disabled value={p3Obj?.title || ''} className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none" />
                </div>
              </div>

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
                  <label className="text-white/70 text-sm">Year</label>
                  <select className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register('year', { required: 'Year is required' })}>
                    <option value="">Select Year</option>
                    <option value="FY_DS">FY_DS</option>
                    <option value="SY_DS">SY_DS</option>
                    <option value="TY_DS">TY_DS</option>
                  </select>
                  {errors.year && <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>}
                </div>

                <div className="glass p-6 rounded-2xl">
                  <label className="text-white/70 text-sm">Division</label>
                  <input placeholder="e.g., A" className="mt-2 w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2" {...register('division', { required: 'Division is required' })} />
                  {errors.division && <p className="text-red-400 text-sm mt-1">{errors.division.message}</p>}
                </div>

                <div className="md:col-span-2 glass p-6 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <label className="text-white/70 text-sm">Members (excluding leader)</label>
                    <div className="text-white/60 text-xs">Member 1–3 required, 4 optional</div>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="glass p-4 rounded-xl border border-white/10">
                        <div>
                          <label className="text-white/70 text-xs">Member {i} Name{i<4?' *':''}</label>
                          <input className="mt-2 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2"
                            {...register(`member${i}_name`, { required: i<4 ? 'Name required' : false })}
                          />
                          {errors[`member${i}_name`] && <p className="text-red-400 text-xs mt-1">{errors[`member${i}_name`].message}</p>}
                        </div>
                        <div className="mt-3">
                          <label className="text-white/70 text-xs">Member {i} Email{i<4?' *':''}</label>
                          <input type="email" className="mt-2 w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2"
                            {...register(`member${i}_email`, {
                              required: i<4 ? 'Email required' : false,
                              validate: (v) => {
                                if (!v) return i===4 ? true : 'Email required'
                                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email'
                              }
                            })}
                          />
                          {errors[`member${i}_email`] && <p className="text-red-400 text-xs mt-1">{errors[`member${i}_email`].message}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={loading} className="btn-magnetic w-full sm:w-auto px-8 py-3 rounded-xl bg-highlight text-ink font-bold hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed">
                    {loading ? (<><i className="fa-solid fa-circle-notch fa-spin mr-2"/> Submitting...</>) : 'Submit Registration'}
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
          {/* Toasts */}
          <div className="fixed top-24 right-4 z-[1000] space-y-3">
            {toasts.map((t) => (
              <div
                key={t.id}
                className={`glass rounded-xl p-4 w-[320px] shadow-lg border transition-all duration-300 ${
                  t.type === 'success' ? 'border-yellow-400/40' : t.type === 'error' ? 'border-red-400/40' : 'border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-white">{t.title}</div>
                    <div className="text-white/70 text-sm mt-1">{t.message}</div>
                  </div>
                  <button className="px-2 py-1 rounded-lg hover:bg-white/10" onClick={() => dismissToast(t.id)} aria-label="Close">
                    <i className="fa-solid fa-xmark" />
                  </button>
                </div>
              </div>
            ))}
          </div>
      <Footer />
    </div>
  )
}
