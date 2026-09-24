import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/structured-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PROJECT_CASE_STUDIES } from "@/lib/data/platform";
import { CATALOG } from "@/lib/data/catalog";
import { PageHero, ContactBand, SectionHead, Button } from "@/components/ui";
import { ArrowUpRight, Check } from "lucide-react";

export const dynamicParams = false;
export function generateStaticParams(){ return PROJECT_CASE_STUDIES.map((project) => ({ slug: project.slug })); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=PROJECT_CASE_STUDIES.find((x)=>x.slug===slug);return pageMetadata(project?.title||"Project not found",project?.challenge||"The requested EonTera project was not found.",`/projects/${slug}/`);}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const project=PROJECT_CASE_STUDIES.find((x)=>x.slug===slug); if(!project) notFound();
  const origin=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,"");
  const crumbs={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Projects",...(origin?{item:`${origin}/projects/`}:{})},{"@type":"ListItem",position:2,name:project.title,...(origin?{item:`${origin}/projects/${project.slug}/`}:{})}]};
  const relatedProducts=CATALOG.filter((p)=>project.relatedProductSlugs.includes(p.slug));
  return <><JsonLd data={crumbs}/><div className="container breadcrumb"><Link href="/projects/">Projects</Link><span>/</span><span>{project.title}</span></div><PageHero eyebrow={`${project.industry} / ${project.location}`} title={<>{project.title}<em>.</em></>} text={project.challenge}/>
  <section className="section"><div className="container case-study-layout"><aside className="case-study-nav"><a href="#challenge">Challenge</a><a href="#solution">Solution</a><a href="#products">Products used</a><a href="#application">Application process</a><a href="#results">Results</a></aside><div className="case-study-body">
    <section id="challenge"><SectionHead eyebrow="CHALLENGE" title={<>The project<br/><em>context.</em></>}/><p>{project.challenge}</p></section>
    <section id="solution"><SectionHead eyebrow="SOLUTION" title={<>The EonTera<br/><em>response.</em></>}/><p>{project.solution}</p></section>
    <section id="products"><SectionHead eyebrow="PRODUCTS USED" title={<>Specified for<br/><em>the application.</em></>}/><div className="related-grid">{relatedProducts.map((p)=><Link className="related-card" href={`/products/${p.slug}/`} key={p.slug}><h3>{p.shortTitle}<ArrowUpRight size={18}/></h3></Link>)}</div></section>
    <section id="application"><SectionHead eyebrow="APPLICATION PROCESS" title={<>From preparation<br/><em>to protection.</em></>}/><ol className="case-steps">{project.applicationProcess.map((step)=><li key={step}>{step}</li>)}</ol></section>
    {project.media.length>0&&<section><SectionHead eyebrow="PROJECT MEDIA" title={<>See the<br/><em>work.</em></>}/><div className="case-media">{project.media.map((src)=><img src={src} alt="" key={src}/>)}</div></section>}
    <section id="results"><SectionHead eyebrow="RESULTS" title={<>What the project<br/><em>delivered.</em></>}/><ul className="check-list">{project.results.map((r)=><li key={r}><Check size={18}/>{r}</li>)}</ul></section>
    <Button href="/request-quote/">Discuss a similar requirement</Button>
  </div></div></section><ContactBand/></>;
}
