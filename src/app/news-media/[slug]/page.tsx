import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import Link from "next/link";
import { NEWS_RECORDS } from "@/lib/data/platform";
import { PageHero, ContactBand } from "@/components/ui";
export const dynamicParams=false;
export function generateStaticParams(){return NEWS_RECORDS.map((item)=>({slug:item.slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=NEWS_RECORDS.find((x)=>x.slug===slug);return pageMetadata(item?.title||"News item not found",item?.excerpt||"The requested EonTera newsroom item was not found.",`/news-media/${slug}/`)}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=NEWS_RECORDS.find((x)=>x.slug===slug);if(!item)notFound();return <><div className="container breadcrumb"><Link href="/news-media/">News & Media</Link><span>/</span><span>{item.type}</span></div><PageHero eyebrow={`${item.type} / ${item.publishedAt}`} title={<>{item.title}<em>.</em></>} text={item.excerpt}/><section className="section"><div className="container editorial-article"><p>{item.excerpt}</p>{item.href&&<a className="button" href={item.href}>Open source</a>}</div></section><ContactBand/></>}
