import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { EVENT_RECORDS } from "@/lib/data/platform";
import { PageHero, ContactBand, SectionHead } from "@/components/ui";
export const dynamicParams=false;
export function generateStaticParams(){return EVENT_RECORDS.map((item)=>({slug:item.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=EVENT_RECORDS.find((x)=>x.slug===slug);return pageMetadata(item?.title||"Event not found",item?.summary||"The requested EonTera event was not found.",`/events/${slug}/`)}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=EVENT_RECORDS.find((x)=>x.slug===slug);if(!item)notFound();return <><div className="container breadcrumb"><Link href="/events/">Events</Link><span>/</span><span>{item.kind}</span></div><PageHero eyebrow={`${item.kind} / ${item.startDate}`} title={<>{item.title}<em>.</em></>} text={item.summary}/><section className="section"><div className="container detail-layout"><SectionHead eyebrow="EVENT DETAILS" title={<>Where and<br/><em>when.</em></>}/><div className="detail-copy"><h3>{item.location}</h3><p>{item.summary}</p></div></div></section>{item.gallery&&item.gallery.length>0&&<section className="section collection-section"><div className="container"><SectionHead eyebrow="EVENT GALLERY" title={<>A look back at<br/><em>the event.</em></>}/><div className="case-media">{item.gallery.map((src)=><img src={src} alt="" key={src}/>)}</div></div></section>}<ContactBand/></>}
