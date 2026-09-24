import { pageMetadata } from "@/lib/seo";
import { PageHero, ContactBand, SectionHead } from "@/components/ui";
import { TEAM, SERVICES } from "@/lib/data/content";
import { TRUST_CATEGORIES } from "@/lib/data/platform";
export const metadata = pageMetadata("About EonTera", "Meet EonTera Tech LLP, the Mumbai-based company developing a connected portfolio of polymer waterproofing membranes and membrane sheets.", "/about/");
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="THIS IS EONTERA"
        title={
          <>
            A stronger future.
            <br />
            <em>Layer by layer.</em>
          </>
        }
        text="EonTera Tech LLP brings a focused approach to polymer-based waterproofing membranes and membrane sheet manufacturing — connecting material development with the practical needs of a building."
        image="hero-membrane-wall-construction"
        imageAlt="Conceptual foundation membrane installation in an urban construction setting"
      />
      <section className="section">
        <div className="container detail-layout">
          <SectionHead
            eyebrow="OUR PURPOSE"
            title={
              <>
                Protection should be
                <br />
                <em>part of the plan.</em>
              </>
            }
          />
          <div className="detail-copy">
            <h3>From basement to terrace.</h3>
            <p style={{ fontSize: 14, lineHeight: 1.9 }}>
              Water ingress, moisture and seepage can affect every layer of a
              structure. Complex application, inconsistent execution and
              repeated repair make the challenge greater.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.9, marginTop: 22 }}>
              Our focus is a connected waterproofing portfolio: lightweight
              polymer membranes, below-ground systems, protection for roofs and
              wet areas, and manufactured membrane sheets. Alongside the
              material, we place value on product selection, application
              guidance and project coordination.
            </p>
          </div>
        </div>
      </section>
      <section className="quote-band">
        <div className="container">
          <p className="eyebrow">
            <span />
            THE EONTERA PERSPECTIVE
          </p>
          <h2>
            Consider the whole structure.
            <br />
            Care about the smallest detail.
            <br />
            <em>Protect every layer.</em>
          </h2>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="BEYOND THE MATERIAL"
            title={
              <>
                The support behind
                <br />
                <em>the system.</em>
              </>
            }
          />
          <div className="feature-grid">
            {SERVICES.map((s, i) => (
              <article className="feature-card reveal" key={s.title}>
                <span>0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section collection-section">
        <div className="container">
          <SectionHead
            eyebrow="THE PEOPLE BEHIND EONTERA"
            title={
              <>
                Shared purpose.
                <br />
                <em>Complementary perspectives.</em>
              </>
            }
          />
          <div className="team-grid">
            {TEAM.map((m) => (
              <article className="team-card reveal" key={m.name}>
                <h3>{m.name}</h3>
                <p className="eyebrow">{m.role}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section trust-section">
        <div className="container detail-layout">
          <SectionHead eyebrow="TRUST / CREDIBILITY" title={<>Claims should come with<br/><em>evidence.</em></>} />
          <div>
            <p style={{ fontSize: 14, lineHeight: 1.9 }}>This website is ready to publish certifications, awards, memberships, quality standards, major projects, client logos, testimonials, years of experience and manufacturing-facility information only when EonTera supplies verified source material.</p>
            <div className="tags trust-tags">{TRUST_CATEGORIES.map((x) => <span key={x}>{x}</span>)}</div>
            <p className="verification-status trust-status">No unverified credibility claims are published.</p>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
