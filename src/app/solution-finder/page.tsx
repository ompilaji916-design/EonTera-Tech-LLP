import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui";
import { Finder } from "@/components/finder";
export const metadata = pageMetadata("Find your waterproofing solution", "Answer three questions about your structure to explore a relevant EonTera waterproofing category.", "/solution-finder/");
export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="THE SOLUTION FINDER"
        title={
          <>
            A clearer path
            <br />
            to <em>protection.</em>
          </>
        }
        text="Your structure is the starting point. Tell us a little about it, and explore the right conversation to have next."
      />
      <Finder />
    </>
  );
}
