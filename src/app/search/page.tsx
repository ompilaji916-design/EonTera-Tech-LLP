import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui";
import { GlobalSearch } from "@/components/global-search";
export const metadata = pageMetadata("Search", "Search across EonTera products, solutions, industries, projects, resources, FAQs, news and media.", "/search/");
export default function Page(){return <><PageHero eyebrow="GLOBAL SEARCH" title={<>Find it across<br/><em>the whole site.</em></>} text="This website-wide search is separate from the product catalogue search and indexes all published content types."/><section className="section"><div className="container"><GlobalSearch/></div></section></>}
