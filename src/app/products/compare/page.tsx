import { pageMetadata } from "@/lib/seo";
import { PageHero, ContactBand } from "@/components/ui";
import { ProductCompare } from "@/components/product-compare";
export const metadata = pageMetadata("Compare Products", "Compare EonTera portfolio categories side by side by applications, benefits and approved technical-information availability.", "/products/compare/");
export default function Page(){return <><PageHero eyebrow="PRODUCT COMPARISON" title={<>Compare the<br/><em>right layers.</em></>} text="Compare the currently published EonTera portfolio categories side by side. Unverified technical values are never guessed."/><section className="section"><div className="container"><ProductCompare/></div></section><ContactBand/></>}
