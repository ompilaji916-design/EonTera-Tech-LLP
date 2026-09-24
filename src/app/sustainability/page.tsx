import { pageMetadata } from "@/lib/seo";
import { PageHero, ContactBand, SectionHead } from "@/components/ui";
import { VerificationGrid } from "@/components/verification-grid";
import { SUSTAINABILITY_AREAS } from "@/lib/data/platform";
export const metadata = pageMetadata("Sustainability", "EonTera sustainability disclosure framework covering environment, products, manufacturing, waste, energy, water and community initiatives.", "/sustainability/");
export default function Page(){ return <><PageHero eyebrow="SUSTAINABILITY / VERIFIED DISCLOSURE" title={<>Progress should be<br/><em>measurable.</em></>} text="EonTera’s sustainability area is designed to publish specific, supportable information rather than generic environmental claims."/><section className="section"><div className="container"><SectionHead eyebrow="DISCLOSURE AREAS" title={<>From operations to<br/><em>community.</em></>} text="Metrics, programmes and product claims appear here only after company approval and supporting evidence are available."/><VerificationGrid items={SUSTAINABILITY_AREAS}/></div></section><ContactBand/></> }
