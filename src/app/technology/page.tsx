import { pageMetadata } from "@/lib/seo";
import { PageHero, ContactBand, SectionHead, TextLink } from "@/components/ui";
import { Film } from "@/components/motion";
import { USPS } from "@/lib/data/content";
export const metadata = pageMetadata("Polymer membrane technology", "Explore EonTera’s approach to polymer membranes, application efficiency and connected waterproofing protection.", "/technology/");
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="THE SCIENCE OF PROTECTION"
        title={
          <>
            Engineered thinking.
            <br />
            <em>In every layer.</em>
          </>
        }
        text="Our portfolio centres on polymer-based membranes and manufactured sheets, with a development focus on moisture resistance, application efficiency and structural protection."
        image="membrane"
        imageAlt="Conceptual close-up of a green polymer membrane roll with water droplets"
      />
      <section className="section">
        <div className="container detail-layout">
          <SectionHead
            eyebrow="MATERIALS. METHODS. DETAILS."
            title={
              <>
                A membrane is part
                <br />
                of a <em>bigger system.</em>
              </>
            }
          />
          <div className="detail-copy">
            <h3>Look beyond the surface.</h3>
            <p style={{ fontSize: 14, lineHeight: 1.9 }}>
              Waterproofing performance depends on the selected material,
              substrate condition, junction details and installation. We connect
              product discussions with the realities of each application.
            </p>
            <div className="technical-note">
              <h3>Specification starts with evidence.</h3>
              <p>
                Request the approved datasheet and current application guidance
                for the product being considered. Confirm coverage, thickness,
                curing, compatibility and performance requirements with the
                team.
              </p>
              <TextLink href="/contact/?interest=Technical%20datasheets">
                Request technical information
              </TextLink>
            </div>
          </div>
        </div>
      </section>
      <section className="material-section">
        <Film
          name="membrane-motion"
          poster="membrane"
          label="Animated conceptual material study of a polymer waterproofing membrane"
          className="material-film"
        />
        <div className="material-shade" />
        <div className="container material-content">
          <p className="eyebrow">
            <span />A CLOSER LOOK
          </p>
          <h2>
            Purpose in
            <br />
            <em>the polymer.</em>
          </h2>
          <p>
            Material development with one clear direction: helping protect the
            structures that matter.
          </p>
        </div>
        <span className="material-caption">ILLUSTRATIVE MATERIAL STUDY</span>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="OUR DEVELOPMENT PRIORITIES"
            title={
              <>
                Thoughtfully considered.
                <br />
                <em>From the start.</em>
              </>
            }
          />
          <div className="feature-grid">
            {USPS.map((s) => (
              <article className="feature-card reveal" key={s.number}>
                <span>{s.number}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
          <p className="portfolio-note" style={{ padding: "25px 0 0" }}>
            These priorities describe the portfolio’s intended approach.
            Product-specific performance and suitability must be confirmed
            through approved technical information.
          </p>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
