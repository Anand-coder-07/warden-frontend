import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { ArrowRight, Check, Eye, Lock, Pause, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Logo from './components/Logo'

const features = [
  { icon: Eye, title: 'Agent Registry', text: 'Know who owns each agent and exactly what it can do.' },
  { icon: Check, title: 'Approval Checkpoints', text: 'Give people a say before high-impact actions happen.' },
  { icon: ShieldCheck, title: 'Activity Trail', text: 'Keep a tamper-evident record of every action.' },
  { icon: Pause, title: 'Pause and Restrict', text: 'Stop or limit any agent in one click.' },
]

const steps = ['Register your agents', 'Set your rules', 'Every action is checked', 'Everything is recorded']

function Reveal({ children, className = '', delay = 0 }) {
  const ref = React.useRef(null)
  const visible = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 16 }} animate={visible ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-inner">
        <Link to="/" className="logo-link" aria-label="WARDEN home"><Logo height={28} /></Link>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="/#about">Why WARDEN</a><a href="/#product">Product</a><a href="/#how-it-works">How it works</a><a href="/#security">Security</a>
        </nav>
        <div className="nav-actions"><Link to="/login" className="nav-login-button">Log in</Link><Link to="/signup" className="button button-small">Sign up</Link></div>
      </div>
    </header>
  )
}

function FlowAnimation() {
  return (
    <div className="flow-card" aria-label="Example WARDEN approval flow">
      <div className="flow-top"><span className="eyebrow">LIVE CONTROL ROOM</span><span className="status-dot">Monitoring</span></div>
      <div className="request-row"><div className="request-icon">AR</div><div><strong>Account Recovery Agent</strong><span>Request: reset customer account</span></div></div>
      <div className="flow-divider" />
      <div className="approval-state"><span className="state-label">Approval status</span><span className="approval-pill"><span className="pill-pending">Pending</span><span className="pill-approved">Approved by manager</span></span></div>
      <div className="audit-row"><span className="audit-check">✓</span><div><strong>Action added to audit trail</strong><span>manager@acme.co · just now</span></div></div>
      <div className="flow-footer"><span>Policy: Customer data access</span><span>•••</span></div>
    </div>
  )
}

function Hero() {
  return <section className="hero container"><div className="hero-copy"><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}><span className="kicker">The accountability layer for AI</span></motion.div><motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .08 }}>Every AI agent.<br /><span>Under your control.</span></motion.h1><motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6, delay: .16 }}>WARDEN helps teams use AI agents safely. Set clear boundaries, ask a human before high-impact actions, and keep a record of what happened.</motion.p><motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5, delay: .24 }}><Link to="/signup" className="button">Get started <ArrowRight size={16} /></Link><a href="#how-it-works" className="button button-outline">See how it works</a></motion.div><motion.div className="hero-note" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .42 }}><span className="note-mark">✓</span><span>Made for teams that need people to stay accountable.</span></motion.div></div><motion.div className="hero-visual" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .7, delay: .14 }}><FlowAnimation /></motion.div></section>
}

function About() {
  return <section id="about" className="section about-section"><div className="container about-grid"><Reveal><span className="section-label">Why WARDEN</span></Reveal><Reveal delay={.08}><h2>AI is becoming part of every team.<br /><span>Accountability should be too.</span></h2><p>Companies are replacing manual work with AI agents. WARDEN makes sure security and accountability are never compromised as they do.</p></Reveal></div></section>
}

function Features() {
  return <section id="product" className="section"><div className="container"><Reveal><span className="section-label">One clear view</span><h2 className="section-heading">Control without slowing down.</h2></Reveal><div className="feature-grid">{features.map(({ icon: Icon, title, text }, index) => <Reveal key={title} delay={index * .06}><article className="feature-card"><Icon size={20} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></article></Reveal>)}</div></div></section>
}

function HowItWorks() {
  return <section id="how-it-works" className="section how-section"><div className="container"><Reveal><span className="section-label">How it works</span><h2 className="section-heading">A simple path to safer agents.</h2></Reveal><div className="steps">{steps.map((step, index) => <Reveal key={step} delay={index * .08}><div className="step"><span className="step-number">0{index + 1}</span><h3>{step}</h3>{index < steps.length - 1 && <span className="step-line" />}</div></Reveal>)}</div></div></section>
}

function Security() {
  const promises = ['Your data stays with you', 'Agents see only what they need', 'Customers only ever see their own information', 'Company internal information is never shared']
  return <section id="security" className="section security-section"><div className="container security-grid"><Reveal><span className="section-label">Security promise</span><h2>Built for trust.<br /><span>Designed for control.</span></h2></Reveal><Reveal delay={.08}><div className="promise-list">{promises.map(text => <div className="promise" key={text}><Lock size={16} /><span>{text}</span></div>)}</div></Reveal></div></section>
}

function CTA() {
  return <section className="section cta-section"><div className="container cta-inner"><Reveal><h2>Bring your agents<br />under control.</h2><p>Start with a clear view of every action.</p><div className="hero-actions"><Link to="/signup" className="button">Sign up <ArrowRight size={16} /></Link><Link to="/login" className="button button-outline">Log in</Link></div></Reveal></div></section>
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><div className="footer-brand"><Link to="/" className="logo-link" aria-label="WARDEN home"><Logo height={24} /></Link><span>Built by team HIDE &amp; SEEK</span></div><div className="footer-links"><a href="/#product">Product</a><a href="/#security">Security</a><a href="/privacy">Privacy Policy</a><a href="/terms">Terms</a><Link to="/login">Log in</Link></div><span>© 2026 WARDEN. All rights reserved.</span></div></footer>
}

function LandingPage() {
  return <><div className="ambient-background" aria-hidden="true"><span className="ambient-ring ring-one" /><span className="ambient-ring ring-two" /><span className="ambient-dot dot-one" /><span className="ambient-dot dot-two" /><span className="ambient-line line-one" /><span className="ambient-line line-two" /></div><Navbar /><main><Hero /><About /><Features /><HowItWorks /><Security /><CTA /></main><Footer /></>
}

function Field({ label, type = 'text', ...props }) {
  return <label className="field"><span>{label}</span><input type={type} {...props} /></label>
}

function SelectField({ label, options, ...props }) {
  return <label className="field"><span>{label}</span><select defaultValue="" {...props}><option value="" disabled>Select {label.toLowerCase()}</option>{options.map(option => <option value={option} key={option}>{option}</option>)}</select></label>
}

function AuthShell({ children, title, subtitle }) {
  return <main className="auth-page"><Link to="/" className="auth-logo-link" aria-label="WARDEN home"><Logo height={32} /></Link><motion.div className="auth-card" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45 }}><div className="auth-heading"><h1>{title}</h1><p>{subtitle}</p></div>{children}</motion.div><Link to="/" className="back-link">Back to home</Link></main>
}

function LoginForm() {
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const submit = (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); if (!String(data.get('email')).includes('@')) setError('Enter a valid work email.'); else if (String(data.get('password')).length < 8) setError('Password must be at least 8 characters.'); else setError('') }
  return <AuthShell title="Welcome back" subtitle="Log in to your WARDEN workspace."><form onSubmit={submit} className="auth-form"><Field label="Work email" name="email" type="email" placeholder="you@company.com" autoComplete="email" /><label className="field"><span>Password</span><div className="password-wrap"><input name="password" type={show ? 'text' : 'password'} placeholder="Enter your password" autoComplete="current-password" /><button type="button" onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button></div></label>{error && <p className="form-error">{error}</p>}<button className="button button-full" type="submit">Log in</button><p className="auth-switch">New here? <Link to="/signup">Sign up</Link></p></form></AuthShell>
}

function SignupForm() {
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  if (done) return <AuthShell title="Your WARDEN workspace is ready" subtitle="Your account is set up. You can now start bringing your agents under control."><Link to="/" className="button button-full">Go to dashboard <ArrowRight size={16} /></Link></AuthShell>
  return <AuthShell title="Create your workspace" subtitle="Start with the basics. You can change these later."><div className="progress"><span className={step >= 1 ? 'active' : ''}>01 Company</span><i /><span className={step >= 2 ? 'active' : ''}>02 Manager account</span></div><AnimatePresence mode="wait"><motion.form key={step} className="auth-form" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: .25 }} onSubmit={e => { e.preventDefault(); step === 1 ? setStep(2) : setDone(true) }}>{step === 1 ? <><Field label="Company name" name="company" placeholder="Acme Inc." required /><SelectField label="Industry" name="industry" options={['Technology', 'Financial services', 'Healthcare', 'Other']} required /><SelectField label="Company size" name="size" options={['1–50', '51–250', '251–1,000', '1,000+']} required /><Field label="Country" name="country" placeholder="India" required /></> : <><Field label="Full name" name="name" placeholder="Alex Morgan" required /><Field label="Work email" name="email" type="email" placeholder="you@company.com" required /><SelectField label="Role" name="role" options={['Manager', 'Admin', 'Compliance']} required /><Field label="Password" name="password" type="password" placeholder="At least 8 characters" minLength="8" required /></>}<button className="button button-full" type="submit">{step === 1 ? 'Continue' : 'Create workspace'} <ArrowRight size={16} /></button></motion.form></AnimatePresence><p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p></AuthShell>
}

function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])
  return <AnimatePresence mode="wait"><motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .25 }}><Routes location={location}><Route path="/" element={<LandingPage />} /><Route path="/login" element={<LoginForm />} /><Route path="/signup" element={<SignupForm />} /><Route path="*" element={<LandingPage />} /></Routes></motion.div></AnimatePresence>
}

export default App
