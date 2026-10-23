"use client";

import { useState } from "react";
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
} from "lucide-react";

const heroImage =
  "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=85";
const driverImage =
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=85";
const fleetImage =
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d8?auto=format&fit=crop&w=1200&q=85";
const individualImage =
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=85";

function Brand() {
  return (
    <a href="#top" className="brand" aria-label="Astrateq Gadgets home">
      <span className="brand-mark">A</span>
      <span>
        <strong>ASTRATEQ</strong>
        <small>GADGETS</small>
      </span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Brand />
        <nav
          className={open ? "nav-links open" : "nav-links"}
          aria-label="Primary navigation"
        >
          <a href="#product" onClick={close}>
            Product
          </a>
          <a href="#approach" onClick={close}>
            Our Approach
          </a>
          <a href="#faq" onClick={close}>
            FAQs
          </a>
          <a className="nav-cta" href="#early-access" onClick={close}>
            Join Early Access <ArrowRight size={15} />
          </a>
        </nav>
        <button
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Button({
  children,
  href,
  secondary = false,
}: {
  children: React.ReactNode;
  href: string;
  secondary?: boolean;
}) {
  return (
    <a href={href} className={secondary ? "button button-secondary" : "button"}>
      {children}
      <ArrowRight size={16} />
    </a>
  );
}

function VisionCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Eye;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="vision-card">
      <div className="icon-disc">
        <Icon size={22} aria-hidden="true" />
      </div>
      <h3>{title}</h3>
      <p>{children}</p>
    </article>
  );
}

function InterestForm({
  audience,
  setAudience,
}: {
  audience: string;
  setAudience: (value: string) => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("firstName") || "").trim())
      next.firstName = "Please enter your first name.";
    if (!/^\S+@\S+\.\S+$/.test(String(data.get("email") || "").trim()))
      next.email = "Enter a valid email address.";
    if (!data.get("consent"))
      next.consent = "Please confirm your consent to continue.";
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  }
  return (
    <div className="form-card">
      <form onSubmit={submit} noValidate aria-describedby="form-demo-note">
        <div className="form-grid">
          <label htmlFor="firstName">
            First name *
            <input
              id="firstName"
              name="firstName"
              required
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <span id="firstName-error" className="error" role="alert">
                {errors.firstName}
              </span>
            )}
          </label>
          <label htmlFor="email">
            Email address *
            <input
              id="email"
              name="email"
              type="email"
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="you@example.com"
            />
            {errors.email && (
              <span id="email-error" className="error" role="alert">
                {errors.email}
              </span>
            )}
          </label>
        </div>
        <fieldset>
          <legend>Audience type *</legend>
          <div className="radio-row">
            <label>
              <input
                type="radio"
                name="audience"
                value="fleet"
                checked={audience === "fleet"}
                onChange={(e) => setAudience(e.target.value)}
              />{" "}
              Fleet / Delivery Business
            </label>
            <label>
              <input
                type="radio"
                name="audience"
                value="individual"
                checked={audience === "individual"}
                onChange={(e) => setAudience(e.target.value)}
              />{" "}
              Individual Driver
            </label>
          </div>
        </fieldset>
        <label htmlFor="message">
          What would you most like from a driver-awareness product?
          <textarea
            id="message"
            name="message"
            placeholder="Share your thoughts (optional)"
            rows={4}
          />
        </label>
        <label className="consent" htmlFor="consent">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            required
            aria-invalid={!!errors.consent}
          />{" "}
          <span>
            I&apos;d like to receive Astrateq pre-launch updates and related
            product research communications. I understand this is a pre-launch
            product and I can withdraw my consent at any time.
          </span>
        </label>
        {errors.consent && (
          <span className="error" role="alert">
            {errors.consent}
          </span>
        )}
        <button type="submit" className="submit-button">
          Submit (Demo Only) <ArrowRight size={16} />
        </button>
        {submitted && (
          <div className="demo-note" role="status">
            <Check size={15} /> Demo validation complete. Nothing was
            transmitted or stored.
          </div>
        )}
        <p className="form-footnote" id="form-demo-note">
          This is a demo form. No information is transmitted or stored.
        </p>
      </form>
    </div>
  );
}

const faqs = [
  [
    "What is Astrateq Gadgets?",
    "A driver-awareness and fleet-intelligence product in development, starting with an iOS experience.",
  ],
  [
    "Is the app available now?",
    "Astrateq Gadgets is in development. Public availability has not yet been announced.",
  ],
  [
    "Does it guarantee safer driving?",
    "No. The product is being explored and developed. No guarantee of safer driving or specific safety outcomes is made.",
  ],
  [
    "Can businesses participate in product discovery?",
    "Yes. Small fleet and delivery businesses can express interest and share the challenges they would like future development to address.",
  ],
  [
    "How will my information be handled?",
    "Do not submit sensitive information. The demo form does not transmit or store submissions.",
  ],
] as const;

function FAQ() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="faq-list">
      {faqs.map(([question, answer], index) => {
        const answerId = `faq-answer-${index}`;
        return (
          <div className="faq-item" key={question}>
            <button
              id={`faq-question-${index}`}
              aria-expanded={active === index}
              aria-controls={answerId}
              onClick={() => setActive(active === index ? null : index)}
            >
              <span>{question}</span>
              <ChevronDown
                className={active === index ? "rotate" : ""}
                size={17}
                aria-hidden="true"
              />
            </button>
            {active === index && (
              <p
                id={answerId}
                role="region"
                aria-labelledby={`faq-question-${index}`}
              >
                {answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function AstrateqLanding() {
  const year = new Date().getFullYear();
  const [audience, setAudience] = useState("fleet");
  const selectAudience = (value: string) => {
    setAudience(value);
    document
      .getElementById("early-access")
      ?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <main id="top">
      <Header />
      <section className="hero">
        <img
          src={heroImage}
          alt="Driver viewing a city skyline through a car windshield at dusk"
        />
        <div className="hero-overlay" />
        <div className="container hero-content">
          <span className="eyebrow">PRE-LAUNCH</span>
          <h1>
            Driver awareness,
            <br />
            <em>thoughtfully connected.</em>
          </h1>
          <p>
            Explore a new approach to driver awareness and fleet intelligence.
            Astrateq Gadgets is being developed to bring driver-focused insights
            into a connected driving experience.
          </p>
          <div className="hero-actions">
            <Button href="#early-access">Join Early Access</Button>
            <Button href="#product" secondary>
              Explore the Vision
            </Button>
          </div>
        </div>
      </section>
      <section id="product" className="section vision">
        <div className="container">
          <div className="section-intro">
            <div>
              <h2>
                Designed around the <em>driver.</em>
              </h2>
              <p>
                Astrateq Gadgets is exploring a smarter approach to driver
                awareness and fleet intelligence, with a focus on
                driver-centered insights and connected experiences.
              </p>
            </div>
            <img
              src={driverImage}
              alt="Driver wearing glasses behind the wheel"
            />
          </div>
          <div className="vision-grid">
            <VisionCard icon={Eye} title="Driver Awareness">
              Exploring technology that can support driver-focused awareness
              workflows.
            </VisionCard>
            <VisionCard icon={Smartphone} title="Connected Experience">
              A developing iOS experience designed around accessibility,
              driver-focused interactions, and a thoughtful user experience.
            </VisionCard>
            <VisionCard icon={Truck} title="Fleet Intelligence Vision">
              Investigating how driver-focused insights could fit into the needs
              of small fleet operators.
            </VisionCard>
          </div>
        </div>
      </section>
      <section id="approach" className="section approach">
        <div className="container">
          <div className="section-copy">
            <h2>How it could fit into your workflow.</h2>
            <p>A simple three-step journey to help shape the product.</p>
          </div>
          <div className="steps">
            {[
              [
                "1",
                "Explore",
                "Learn about the developing Astrateq experience.",
              ],
              [
                "2",
                "Understand",
                "Share the challenges and priorities that matter to you.",
              ],
              [
                "3",
                "Shape",
                "Help inform a thoughtful driver-focused product direction.",
              ],
            ].map(([number, title, copy]) => (
              <article className="step" key={number}>
                <span className="step-number">{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section audiences">
        <div className="container">
          <div className="section-copy">
            <h2>
              Built for real-world <em>perspectives.</em>
            </h2>
            <p>
              Early discovery is informed by the people and workflows a
              connected driving product should serve.
            </p>
          </div>
          <div className="audience-grid">
            <article className="audience-card">
              <img src={fleetImage} alt="Delivery trucks on a road" />
              <div>
                <Truck className="accent-icon" aria-hidden="true" />
                <h3>Fleet &amp; Delivery Businesses</h3>
                <p>
                  Explore the challenges of supporting drivers, vehicles, and
                  daily operations.
                </p>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => selectAudience("fleet")}
                >
                  Discuss Your Fleet Needs <ArrowRight size={16} />
                </button>
              </div>
            </article>
            <article className="audience-card">
              <img src={individualImage} alt="Individual driver in a car" />
              <div>
                <UserRound className="accent-icon" aria-hidden="true" />
                <h3>Individual Drivers</h3>
                <p>
                  Share what driver awareness could look like in a more
                  connected experience.
                </p>
                <button
                  type="button"
                  className="button button-secondary"
                  onClick={() => selectAudience("individual")}
                >
                  For Individual Drivers <ArrowRight size={16} />
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>
      <section id="early-access" className="section access">
        <div className="container access-grid">
          <div className="access-copy">
            <span className="eyebrow">EARLY ACCESS</span>
            <h2>
              Help shape what comes <em>next.</em>
            </h2>
            <p>
              Join the early-access conversation and share the perspective that
              can help guide product discovery.
            </p>
            <Radar className="radar" size={130} aria-hidden="true" />
          </div>
          <InterestForm audience={audience} setAudience={setAudience} />
        </div>
      </section>
      <section id="faq" className="section faq">
        <div className="container narrow">
          <span className="eyebrow">FAQ</span>
          <h2>Questions, answered.</h2>
          <FAQ />
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div>
              <Brand />
              <p className="footer-tagline">
                Driver awareness. Thoughtfully connected.
              </p>
              <p>
                Exploring driver-focused insights and connected experiences for
                individual drivers and fleet operators.
              </p>
              <p className="footer-status">
                Pre-launch — product in development.
              </p>
            </div>
            <div>
              <h4>Explore</h4>
              <a href="#product">Product</a>
              <a href="#approach">Our Approach</a>
              <a href="#faq">Frequently Asked Questions</a>
              <a href="#early-access">Join Early Access</a>
            </div>
            <div>
              <h4>Built for the GTA</h4>
              <p>Designed with the Greater Toronto Area in mind.</p>
              <p>
                Considering regional context across Toronto, North York,
                Mississauga, Brampton, Markham, and Vaughan.
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              Demo notice: the early-access form does not transmit or store
              information.
            </span>
            <span>© {year} Astrateq Gadgets</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
