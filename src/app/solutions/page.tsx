import { pageMetadata } from "@/lib/seo";
import { PageHero, ContactBand, TextLink, Button } from "@/components/ui";
import { AREAS } from "@/lib/data/catalog";
export const metadata = pageMetadata("Waterproofing solutions", "Explore waterproofing for basements, foundations, roofs, terraces, wet areas and the complete building envelope.", "/solutions/");
const solutions = [
  ...AREAS.slice(0, 3),
  {
    ...AREAS[3],
    title: "Roof",
    description:
      "Exposed roofs meet sun, rain and changing weather. Plan protection around the substrate, drainage, junctions and project conditions.",
  },
  {
    id: "terrace",
    number: "05",
    title: "Terrace",
    image: "rooftop-membrane-terrace",
    description:
      "An open space deserves a considered protection system. Discuss membrane selection, surface preparation and detailing for your terrace.",
    category: "roof-terrace-wet-area",
  },
  {
    id: "complete",
    number: "06",
    title: "Complete building protection",
    image: "architecture",
    description:
      "Think of the structure as one connected envelope. Coordinate protection for the foundation, basement, wet areas, roof and terrace from the planning stage.",
    category: "polymer-membranes",
  },
];
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS FOR EVERY LAYER"
        title={
          <>
            Follow the structure.
            <br />
            <em>Find the protection.</em>
          </>
        }
        text="Every application area has its own exposure, demands and details. Explore the layers that matter to your project."
        image="architecture"
        imageAlt="Conceptual protected structure showing a basement-to-terrace membrane envelope"
      >
        <div className="button-row">
          <Button href="/solution-finder/">Help me choose</Button>
        </div>
      </PageHero>
      <nav className="solution-nav" aria-label="Application areas">
        <div className="container">
          {solutions.map((s) => (
            <a href={`#${s.id}`} key={s.id}>
              {s.title}
            </a>
          ))}
        </div>
      </nav>
      <div className="container">
        {solutions.map((s) => (
          <section id={s.id} key={s.id} className="editorial-row reveal">
            <div className="editorial-image">
              <img
                src={`/media/${s.image}.webp?v=20260922b`}
                width="850"
                height="650"
                loading="lazy"
                alt={`Conceptual illustration of ${s.title.toLowerCase()}`}
              />
            </div>
            <div className="editorial-copy">
              <p className="eyebrow">
                <span />
                LAYER {s.number}
              </p>
              <h2>
                {s.title}
                <em>.</em>
              </h2>
              <p>{s.description}</p>
              <TextLink href={`/products/${s.category}/`}>
                Explore the product category
              </TextLink>
              <br />
              <TextLink
                href={`/contact/?interest=${encodeURIComponent(s.title + " protection")}`}
              >
                Discuss your application
              </TextLink>
            </div>
          </section>
        ))}
      </div>
      <div style={{ height: 60 }} />
      <ContactBand />
    </>
  );
}
