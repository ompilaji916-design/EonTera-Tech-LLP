import { pageMetadata } from "@/lib/seo";
import { PageHero, ContactBand, SectionHead } from "@/components/ui";
import { ProjectListing } from "@/components/project-listing";
export const metadata = pageMetadata("Projects & case studies", "Verified EonTera project case studies with challenge, solution, products used, application process, results and related content.", "/projects/");
export default function Page(){return <><PageHero eyebrow="PROJECTS / CASE STUDIES" title={<>Proof belongs<br/><em>in the details.</em></>} text="The project system is built for real EonTera work only: challenge, solution, products used, application process, images or video, results and related technical content."/><section className="section"><div className="container"><SectionHead eyebrow="PROJECT LIBRARY" title={<>Filter. Explore.<br/><em>Verify.</em></>} text="Only company-approved project records can populate this library."/><ProjectListing/></div></section><ContactBand/></>}
