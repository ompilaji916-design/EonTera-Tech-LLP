import { pageMetadata } from "@/lib/seo";
import { PageHero, ContactBand, SectionHead } from "@/components/ui";
import { DistributorLocator } from "@/components/distributor-locator";
export const metadata = pageMetadata("Find a Distributor", "Find verified EonTera distributors by state and city when approved distributor records are available.", "/distributors/");
export default function Page(){return <><PageHero eyebrow="DISTRIBUTOR LOCATOR" title={<>Find the right<br/><em>local connection.</em></>} text="Search by state and city. Only verified EonTera distributor records are eligible to appear in this locator."/><section className="section"><div className="container"><SectionHead eyebrow="STATE → CITY → DISTRIBUTOR" title={<>A locator built for<br/><em>verified contacts.</em></>}/><DistributorLocator/></div></section><ContactBand/></>}
