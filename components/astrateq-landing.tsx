'use client'

import { useState } from 'react'
import {
  ArrowRight,
  CarFront,
  Check,
  ChevronDown,
  Eye,
  Menu,
  Radar,
  Smartphone,
  Truck,
  UserRound,
  X,
} from 'lucide-react'

const heroImage = 'https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=85'
const driverImage = 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85'
const fleetImage = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?auto=format&fit=crop&w=1200&q=85'
const individualImage = 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=85'

function Brand() {
  return <a href="#top" className="brand" aria-label="Astrateq Gadgets home"><span className="brand-mark">A</span><span><strong>ASTRATEQ</strong><small>GADGETS</small></span></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return <header className="site-header"><div className="container nav-wrap"><Brand /><nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation"><a href="#product" onClick={close}>Product</a><a href="#approach" onClick={close}>Our Approach</a><a href="#early-access" onClick={close}>Early Access</a><a className="nav-cta" href="#early-access" onClick={close}>Join Early Access <ArrowRight size={15} /></a></nav><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></header>
}

function Button({ children, href, secondary = false, onClick }: { children: React.ReactNode; href?: string; secondary?: boolean; onClick?: () => void }) {
  return <a href={href} onClick={onClick} className={secondary ? 'button button-secondary' : 'button'}>{children}<ArrowRight size={16} /></a>
}

function VisionCard({ icon: Icon, title, children }: { icon: typeof Eye; title: string; children: React.ReactNode }) {
  return <article className="vision-card"><div className="icon-disc"><Icon size={22} /></div><h3>{title}</h3><p>{children}</p></article>
}

function InterestForm() {
  const [audience, setAudience] = useState('fleet')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const next: Record<string, string> = {}
    if (!String(data.get('firstName') || '').trim()) next.firstName = 'Please enter your first name.'
    if (!/^\S+@\S+\.\S+$/.test(String(data.get('email') || ''))) next.email = 'Enter a valid email address.'
    if (!data.get('consent')) next.consent = 'Please confirm your consent to continue.'
    setErrors(next)
    setSubmitted(Object.keys(next).length === 0)
  }
  return <div className="form-card"><form onSubmit={submit} noValidate><div className="form-grid"><label>First name *<input name="firstName" aria-invalid={!!errors.firstName} placeholder="Enter your first name" />{errors.firstName && <span className="error">{errors.firstName}</span>}</label><label>Email address *<input name="email" type="email" aria-invalid={!!errors.email} placeholder="you@example.com" />{errors.email && <span className="error">{errors.email}</span>}</label></div><fieldset><legend>Audience type *</legend><div className="radio-row"><label><input type="radio" name="audience" value="fleet" checked={audience === 'fleet'} onChange={(e) => setAudience(e.target.value)} /> Fleet / Delivery Business</label><label><input type="radio" name="audience" value="individual" checked={audience === 'individual'} onChange={(e) => setAudience(e.target.value)} /> Individual Driver</label></div></fieldset><label>What would you most like from a driver-awareness product?<textarea name="message" placeholder="Share your thoughts (optional)" rows={4} /></label><label className="consent"><input name="consent" type="checkbox" /> <span>I&apos;d like to receive Astrateq pre-launch updates and related product research communications. I understand this is a pre-launch product and I can withdraw my consent at any time.</span></label>{errors.consent && <span className="error">{errors.consent}</span>}<button type="submit" className="submit-button">Submit (Demo Only) <ArrowRight size={16} /></button>{submitted && <div className="demo-note" role="status"><Check size={15} /> Demo validation complete. Nothing was transmitted or stored.</div>}<p className="form-footnote">This is a demo form. No information is transmitted or stored.</p></form></div>
}

const faqs = [
  ['What is Astrateq Gadgets?', 'A driver-awareness and fleet-intelligence product in development, starting with an iOS experience.'],
  ['Is the app available now?', 'Astrateq Gadgets is in development. Public availability has not yet been announced.'],
  ['Does it guarantee safer driving?', 'No. The product is being explored and developed. No guarantee of safer driving or specific safety outcomes is made.'],
  ['Can businesses participate in product discovery?', 'Yes. Small fleet and delivery businesses can express interest and share the challenges they would like future development to address.'],
  ['How will my information be handled?', 'Do not submit sensitive information. Until a real registration service and privacy process are configured, the demo form does not transmit or store submissions.'],
]
function FAQ() { const [active, setActive] = useState<number | null>(null); return <div className="faq-list">{faqs.map(([question, answer], index) => <div className="faq-item" key={question}><button aria-expanded={active === index} onClick={() => setActive(active === index ? null : index)}><span>{question}</span><ChevronDown className={active === index ? 'rotate' : ''} size={17} /></button>{active === index && <p>{answer}</p>}</div>)}</div> }

export default function AstrateqLanding() {
  return <main id="top"><Header /><section className="hero"><img src={heroImage} alt="Driver viewing a city skyline through a car windshield at dusk" /><div className="hero-overlay" /><div className="container hero-content"><span className="eyebrow">PRE-LAUNCH</span><h1>Driver awareness,<br /><em>thoughtfully connected.</em></h1><p>Explore a new approach to driver awareness and fleet intelligence. Astrateq Gadgets is being developed to bring driver-focused insights into a connected driving experience.</p><div className="hero-actions"><Button href="#early-access">Join Early Access</Button><Button href="#product" secondary>Explore the Vision</Button></div></div></section><section id="product" className="section vision"><div className="container"><div className="section-intro"><div><h2>Designed around the <em>driver.</em></h2><p>Astrateq Gadgets is exploring a smarter approach to driver awareness and fleet intelligence, with a focus on driver-centered insights and connected experiences.</p></div><img src={driverImage} alt="Driver wearing glasses behind the wheel" /></div><div className="vision-grid"><VisionCard icon={Eye} title="Driver Awareness">Exploring technology that can support driver-focused awareness workflows.</VisionCard><VisionCard icon={Smartphone} title="Connected Experience">A developing iOS experience designed around accessibility, driver-focused interactions, and a thoughtful user experience.</VisionCard><VisionCard icon={Truck} title="Fleet Intelligence Vision">Investigating how driver-focused insights could fit into the needs of small fleet operators.</VisionCard></div></div></section><section id="approach" className="section approach"><div className="container"><div className="section-copy"><h2>How it could fit into your workflow.</h2><p>A simple three-step journey to help shape the product.</p></div><div className="steps">{[['1','Explore','Learn about the developing Astrateq experience.'],['2','Understand','Share the challenges and priorities that matter to you.'],['3','Shape','Help inform future product development through voluntary feedback.']].map(([number,title,copy]) => <div className="step" key={number}><div className="step-number">{number}</div><div><h3>{title}</h3><p>{copy}</p></div></div>)}</div></div></section><section className="section audience"><div className="container"><div className="section-copy"><h2>Who we&apos;re building for.</h2></div><div className="audience-grid"><article className="audience-card"><img src={fleetImage} alt="Delivery trucks parked at a depot" /><div><Truck className="accent-icon" /><h3>Small Fleets and<br />Delivery Businesses</h3><p>Astrateq is investigating the needs of smaller operators exploring driver-awareness technology.</p><Button href="#early-access" onClick={() => setAudienceIntent('fleet')}>Discuss Your Fleet Needs</Button></div></article><article className="audience-card"><img src={individualImage} alt="Driver looking ahead from inside a car" /><div><UserRound className="accent-icon" /><h3>Individual Drivers</h3><p>Follow the product&apos;s development and share your feedback.</p><Button href="#early-access" secondary>Register Your Interest</Button></div></article></div></div></section><section id="early-access" className="section access"><div className="container access-grid"><div className="access-copy"><span className="eyebrow">EARLY ACCESS</span><h2>Join Early Access</h2><p>Be part of the journey. Tell us a bit about yourself and what you&apos;d like to see from a driver-awareness product.</p><Radar className="radar" size={90} strokeWidth={1} /></div><InterestForm /></div></section><section id="faq" className="section faq"><div className="container narrow"><div className="section-copy"><h2>Frequently asked questions.</h2><p>Here are some common questions about Astrateq Gadgets.</p></div><FAQ /></div></section><footer><div className="container footer-grid"><div><Brand /><p>A driver-awareness and fleet-intelligence product in development.</p></div><div><h4>Explore</h4><a href="#product">Product</a><a href="#approach">Our Approach</a><a href="#early-access">Early Access</a></div><div><h4>Questions?</h4><a href="#faq">FAQ</a><span>Pre-launch product in development.</span></div></div><div className="container copyright">© 2026 Astrateq Gadgets. All rights reserved.</div></footer></main>
}

function setAudienceIntent(_value: string) { /* reserved for future endpoint wiring */ }
