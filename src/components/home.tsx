"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  Plus,
  Layers3,
  ShieldCheck,
  Timer,
  Check,
  Play,
} from "lucide-react";
import { AREAS, FAQS } from "@/lib/data/catalog";
import { PROCESS_STEPS } from "@/lib/data/content";
import { Film } from "./motion";
import { Button, ContactBand, Faq, SectionHead, TextLink } from "./ui";
import { Collapse } from "./disclosure";
import { PortfolioShowcase } from "./portfolio-showcase";
import { InteractiveSurface } from "./interactive-surface";
import { FilmViewer } from "./film-viewer";
import { IndustryExplorer } from "./industry-explorer";

export function Home() {
  const [area, setArea] = useState(0);
  const [step, setStep] = useState(0);
  const [filmOpen, setFilmOpen] = useState(false);
  return (
    <>
      <section className="hero">
        <Film
          name="eontera-journey"
          mobileName="eontera-journey-mobile"
          poster="eontera-film-poster"
          label="Conceptual architectural animation showing protection from foundation to roof"
          className="hero-film"
          priority
          suspended={filmOpen}
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <InteractiveSurface className="hero-message ambient-motion">
          <p className="eyebrow">
            <span />
            WATERPROOFING. REIMAGINED.
          </p>
          <h1>
            <span className="hero-line"><span>Protection,</span></span>
            <span className="hero-line"><span>in every</span></span>
            <span className="hero-line"><em>layer.</em></span>
          </h1>
          <p className="hero-description">
            Advanced polymer membranes.
            <br />
            One connected vision. Basement to terrace.
          </p>
          <div className="button-row">
            <Button href="/solutions/" variant="orange">
              Explore our solutions
            </Button>
            <Link href="/solution-finder/" className="hero-secondary">
              Find your solution
              <ArrowUpRight size={18} />
            </Link>
          </div>
          </InteractiveSurface>
        </div>
        <span className="hero-side-note">DESIGNED AROUND YOUR STRUCTURE</span>
        <a className="hero-scroll" href="#protection">
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown size={15} />
        </a>
        <button className="hero-watch" type="button" onClick={() => setFilmOpen(true)}><span><Play size={15} fill="currentColor" /></span><span>Watch the journey<small>FOUNDATION TO TERRACE</small></span></button>
      </section>
      <div className="proof-strip">
        <div className="container">
          <span>
            <Layers3 size={19} />
            Basement-to-terrace protection
          </span>
          <span>
            <ShieldCheck size={19} />
            Polymer-based technology
          </span>
          <span>
            <Timer size={19} />
            Application-focused design
          </span>
          <Link href="/about/">
            Discover EonTera
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>

      <section className="section company-intro">
        <div className="intro-orbs ambient-motion" aria-hidden="true"><i /><i /><i /></div>
        <div className="container company-intro-grid">
          <div className="intro-copy reveal">
            <p className="eyebrow"><span />WE ARE</p>
            <h2>EonTera<span>.</span></h2>
            <p className="intro-lead">A connected vision for<br />a better-protected world.</p>
            <p>From the foundations beneath us to the terraces above, we bring polymer-based waterproofing membranes and membrane sheets to the spaces you build.</p>
            <TextLink href="/about/">Get to know EonTera</TextLink>
            <div className="intro-facts">
              <div><strong>04</strong><span>Product categories</span></div>
              <div><strong>05</strong><span>Industry sectors</span></div>
              <div><strong>Mumbai</strong><span>Our home. Your partner.</span></div>
            </div>
          </div>
          <div className="intro-collage reveal">
            <div className="intro-main-image" data-depth><img src="/media/rooftop-membrane-terrace.webp?v=20260922b" width="1600" height="893" loading="lazy" decoding="async" alt="Conceptual rooftop membrane installation overlooking an urban skyline" /></div>
            <InteractiveSurface className="intro-detail-image"><img src="/media/membrane.webp?v=20260922b" width="1672" height="941" loading="lazy" decoding="async" alt="Conceptual close-up of a polymer membrane and water droplets" /></InteractiveSurface>
            <span className="intro-image-caption">FROM BASEMENT TO TERRACE.</span>
          </div>
        </div>
      </section>

      <section className="section protection-section" id="protection">
        <div className="container">
          <div className="section-topline">
            <SectionHead
              eyebrow="A COMPLETE PERSPECTIVE"
              title={
                <>
                  One structure.
                  <br />
                  <em>Every layer considered.</em>
                </>
              }
            />
            <p className="side-intro reveal">
              Water finds the smallest way in. We look at the bigger picture —
              connected waterproofing solutions for the spaces you build, above
              and below ground.
            </p>
          </div>
          <div className="protection-layout reveal">
            <div className="protection-visual ambient-motion">
              <img
                src="/media/hero-foundation-to-terrace-cutaway.webp?v=20260922b"
                width="1000"
                height="1000"
                loading="lazy"
                alt="Conceptual cutaway of a building showing its foundation, occupied floors and roof"
              />
              <div className="drawing-caption">
                <span>THE PROTECTION ENVELOPE</span>
                <span>01 — 04</span>
              </div>
              {AREAS.map((a, i) => (
                <button
                  key={a.id}
                  className={`hotspot hotspot-${i} ${area === i ? "selected" : ""}`}
                  onClick={() => setArea(i)}
                  aria-label={`Explore ${a.title}`}
                  aria-pressed={area === i}
                >
                  <span>{a.number}</span>
                  <i />
                </button>
              ))}
              <div className="drawing-axis" aria-hidden="true" />
              <div className="zone-preview" key={area}>
                <img src={`/media/${AREAS[area].image}.webp?v=20260922b`} width="112" height="90" loading="lazy" alt="" />
                <div><span>SELECTED LAYER</span><strong>{AREAS[area].title}</strong></div>
                <span className="zone-preview-dot" aria-hidden="true" />
              </div>
            </div>
            <div className="area-list">
              {AREAS.map((a, i) => (
                <div
                  key={a.id}
                  className={`area-item ${area === i ? "selected" : ""}`}
                >
                  <h3>
                    <button
                      aria-expanded={area === i}
                      aria-controls={`area-${a.id}`}
                      onClick={() => setArea(i)}
                    >
                      <span className="area-number">{a.number}</span>
                      {a.title}
                      <Plus size={19} />
                    </button>
                  </h3>
                  <Collapse
                    id={`area-${a.id}`}
                    open={area === i}
                  >
                    <div className="area-body">
                    <p>{a.description}</p>
                    <TextLink href={`/solutions/#${a.id}`}>
                      Explore this layer
                    </TextLink>
                    </div>
                  </Collapse>
                </div>
              ))}
              <div className="area-footnote">
                <span className="live-dot" />
                Thoughtful protection. From the ground up.
              </div>
            </div>
          </div>
        </div>
      </section>

      <PortfolioShowcase />

      <section className="material-section">
        <Film
          name="membrane-motion"
          suspended={filmOpen}
          poster="membrane"
          label="Conceptual close-up animation of a waterproofing membrane material"
          className="material-film"
        />
        <div className="material-shade" />
        <div className="container material-content reveal">
          <div className="material-copy">
          <p className="eyebrow">
            <span />
            THE SCIENCE BEHIND THE SURFACE
          </p>
          <h2>
            Small details.
            <br />
            <em>Lasting intent.</em>
          </h2>
          <p>
            Lightweight polymer technology. A focus on simpler application.
            Membrane solutions designed around the demands of real structures.
          </p>
          <Button href="/technology/" variant="cream">
            Inside our technology
          </Button>
          </div>
          <div className="material-principles">
            <div><span>01</span><h3>Polymer-based</h3><p>Purposeful material development.</p></div>
            <div><span>02</span><h3>Lightweight</h3><p>A focus on practical handling.</p></div>
            <div><span>03</span><h3>Application-led</h3><p>Considered around your structure.</p></div>
            <div><span>04</span><h3>Connected</h3><p>Protection from basement to terrace.</p></div>
          </div>
        </div>
        <span className="material-caption">
          POLYMER MEMBRANE / MATERIAL STUDY
        </span>
      </section>

      <section className="section process-section">
        <div className="container process-layout">
          <div className="process-heading">
            <SectionHead
              eyebrow="FROM PLAN TO PROTECTION"
              title={
                <>
                  The right approach.
                  <br />
                  <em>At every stage.</em>
                </>
              }
              text="A considered system is more than a material. It’s the thinking, preparation and support around it."
            />
            <Button href="/contact/" variant="outline">
              Plan your project
            </Button>
            <div className="process-visual reveal">
              <img
                src="/media/hero-membrane-wall-construction.webp?v=20260922b"
                width="750"
                height="520"
                loading="lazy"
                alt="Conceptual foundation wall with membrane protection"
              />
              <span>BUILT ON A CLEAR PROCESS</span>
            </div>
          </div>
          <div className="process-steps">
            {PROCESS_STEPS.map((s, i) => (
              <div
                className={`process-step reveal ${step === i ? "selected" : ""}`}
                key={s.number}
              >
                <h3>
                  <button
                    onClick={() => setStep(i)}
                    aria-expanded={step === i}
                    aria-controls={`process-${i}`}
                  >
                    <span>{s.number}</span>
                    {s.title}
                    <ArrowUpRight size={20} />
                  </button>
                </h3>
                <Collapse id={`process-${i}`} open={step === i}>
                  <div className="process-body">
                  <p>{s.body}</p>
                  <span className="process-status">
                    <Check size={12} />A considered next step
                  </span>
                  </div>
                </Collapse>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="finder-banner">
        <div className="container finder-banner-inner">
          <div className="finder-orbit ambient-motion" aria-hidden="true">
            <i />
            <i />
            <i />
            <Layers3 size={42} />
          </div>
          <div>
            <p className="eyebrow">
              <span />
              YOUR PROJECT. YOUR STARTING POINT.
            </p>
            <h2>Not sure where to begin?</h2>
            <p>
              Three simple questions. A clearer direction for your structure.
            </p>
          </div>
          <Button href="/solution-finder/" variant="orange">
            Find your solution
          </Button>
        </div>
      </section>

      <section className="section industries-section">
        <div className="container">
          <div className="section-topline">
            <SectionHead
              eyebrow="BUILT AROUND YOUR WORLD"
              title={
                <>
                  Different structures.
                  <br />
                  <em>The same commitment.</em>
                </>
              }
            />
            <TextLink href="/industries/">Explore industries</TextLink>
          </div>
          <IndustryExplorer />
        </div>
      </section>

      <section className="section faq-section">
        <div className="container faq-layout">
          <SectionHead
            eyebrow="GOOD QUESTIONS. CLEAR ANSWERS."
            title={
              <>
                Let’s talk
                <br />
                <em>waterproofing.</em>
              </>
            }
            text="A little clarity goes a long way. Here are a few useful places to start."
          />
          <Faq items={FAQS} />
        </div>
      </section>
      <section className="partner-note">
        <div className="container">
          <p>Better buildings start with better partnerships.</p>
          <TextLink href="/partners/">Grow with EonTera</TextLink>
        </div>
      </section>
      <ContactBand />
      <FilmViewer open={filmOpen} onClose={() => setFilmOpen(false)} />
    </>
  );
}
