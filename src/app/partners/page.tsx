import { pageMetadata } from "@/lib/seo";
import {
  PageHero,
  ContactBand,
  SectionHead,
  Button,
  TextLink,
} from "@/components/ui";
import { TARGET_SEGMENTS } from "@/lib/data/content";
export const metadata = pageMetadata("Build a partnership", "Explore contractor, distributor, private-label, manufacturing and project partnerships with EonTera Tech LLP.", "/partners/");
const paths = [
  [
    "Project & application partners",
    "For builders, contractors, applicators, EPC teams and consultants. Connect your project needs with product selection and application guidance.",
    "Project partnership",
  ],
  [
    "Distribution & supply",
    "For regional distributors, construction-material dealers and retail waterproofing networks. Discuss your territory, customer base and supply requirements.",
    "Distribution partnership",
  ],
  [
    "Manufacturing & private label",
    "For private-label companies and joint-venture partners. Explore manufacturing, product development and supply discussions around your business needs.",
    "Private-label partnership",
  ],
];
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="GROW WITH EONTERA"
        title={
          <>
            Shared ambition.
            <br />
            <em>Stronger foundations.</em>
          </>
        }
        text="Good partnerships connect expertise with opportunity. We’re building relationships across the people, businesses and projects that shape better structures."
        image="hero-membrane-wall-construction"
        imageAlt="Conceptual membrane installation across a large construction site"
      >
        <div className="button-row">
          <Button href="/contact/?interest=Partnership%20enquiry">
            Become a partner
          </Button>
        </div>
      </PageHero>
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="THREE WAYS TO CONNECT"
            title={
              <>
                Find your place
                <br />
                in the <em>next layer.</em>
              </>
            }
          />
          <div className="resources-grid">
            {paths.map(([title, copy, interest], i) => (
              <article className="resource-card reveal" key={title}>
                <p className="eyebrow">0{i + 1} / PARTNERSHIP</p>
                <h3>{title}</h3>
                <p>{copy}</p>
                <TextLink
                  href={`/contact/?interest=${encodeURIComponent(interest)}`}
                >
                  Start a discussion
                </TextLink>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section collection-section">
        <div className="container detail-layout">
          <SectionHead
            eyebrow="A CONNECTED INDUSTRY"
            title={
              <>
                Built with people
                <br />
                who <em>build.</em>
              </>
            }
          />
          <div>
            <p style={{ fontSize: 13, lineHeight: 1.9 }}>
              Our partnership approach brings together the whole construction
              ecosystem. Tell us about your expertise, geography and the kind of
              relationship you want to build.
            </p>
            <div className="tags">
              {TARGET_SEGMENTS.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
