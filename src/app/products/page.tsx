import { pageMetadata } from "@/lib/seo";
import { PageHero, ContactBand } from "@/components/ui";
import { Catalog } from "@/components/catalog";
export const metadata = pageMetadata("Product portfolio", "Explore EonTera’s four waterproofing product categories: polymer membranes, basement and foundation protection, roofs and wet areas, and manufactured membrane sheets.", "/products/");
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="THE EONTERA PORTFOLIO"
        title={
          <>
            Protection starts
            <br />
            with the <em>right layer.</em>
          </>
        }
        text="Explore polymer-based membranes and manufactured membrane sheets, organised around the way you build."
      />
      <Catalog />
      <section className="container portfolio-note">
        <p>
          Explore our product categories, then contact the team for current
          product availability, approved specifications and application
          guidance.
        </p>
      </section>
      <ContactBand />
    </>
  );
}
