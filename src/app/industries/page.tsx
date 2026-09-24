import { pageMetadata } from "@/lib/seo";
import { PageHero, ContactBand, TextLink } from "@/components/ui";
export const metadata = pageMetadata("Industries we serve", "Waterproofing discussions for residential, commercial, infrastructure, industrial and institutional building projects.", "/industries/");
const items = [
  [
    "residential",
    "Residential",
    "panel-04-rooftop-terrace",
    "From the first foundation to the shared terrace, residential structures bring together many different waterproofing needs. Plan a connected approach for living spaces, basements and wet areas.",
    "Builders · Developers · Homeowners",
  ],
  [
    "commercial",
    "Commercial",
    "panel-03-building-interior",
    "Office buildings, retail spaces and commercial developments depend on carefully coordinated building systems. Discuss protection across below-ground areas, service zones and exposed surfaces.",
    "Developers · Architects · Project consultants",
  ],
  [
    "infrastructure",
    "Infrastructure",
    "aerial-foundation-membrane",
    "Large structural works demand early coordination around exposure, application and sequencing. Start a conversation about the membrane requirements within your project scope.",
    "EPC companies · Infrastructure contractors",
  ],
  [
    "industrial",
    "Industrial",
    "panel-02-foundation-structure",
    "Industrial developments require an application-specific assessment of floors, foundations, roofs and moisture exposure. Share the site conditions and operational context with our team.",
    "Industrial developers · Civil consultants",
  ],
  [
    "institutional",
    "Institutional",
    "panel-01-basement-parking",
    "Institutional buildings bring long-term planning and varied spaces together. Coordinate waterproofing requirements with the project team from the earliest stages.",
    "Institutional owners · Engineers · Project managers",
  ],
];
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="THE SPACES YOU BUILD"
        title={
          <>
            Different demands.
            <br />
            <em>A considered response.</em>
          </>
        }
        text="We welcome conversations across five building sectors, supporting the people responsible for planning, specifying and applying waterproofing solutions."
      />
      <nav className="solution-nav" aria-label="Industry sectors">
        <div className="container">
          {items.map(([id, title]) => (
            <a key={id} href={`#${id}`}>
              {title}
            </a>
          ))}
        </div>
      </nav>
      <div className="container">
        {items.map(([id, title, image, copy, audience], i) => (
          <section className="editorial-row reveal" id={id} key={id}>
            <div className="editorial-image">
              <img
                src={`/media/${image}.webp?v=20260922b`}
                alt={`Conceptual ${title.toLowerCase()} building application`}
                width="850"
                height="650"
                loading="lazy"
              />
            </div>
            <div className="editorial-copy">
              <p className="eyebrow">
                <span />
                SECTOR 0{i + 1}
              </p>
              <h2>
                {title}
                <em>.</em>
              </h2>
              <p>{copy}</p>
              <div className="tags">
                <span>{audience}</span>
              </div>
              <TextLink
                href={`/contact/?interest=${encodeURIComponent(title + " project")}`}
              >
                Discuss your project
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
