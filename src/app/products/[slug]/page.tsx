import { notFound } from "next/navigation";
import Link from "next/link";
import { CATALOG, LEGACY_PRODUCT_ROUTES, FAQS } from "@/lib/data/catalog";
import { PageHero, Button, ContactBand, SectionHead, Faq } from "@/components/ui";
import { Check, ArrowUpRight, FileText, ShieldCheck, PackageOpen, Wrench } from "lucide-react";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/structured-data";
export const dynamicParams=false;
export function generateStaticParams(){return [...CATALOG.map(p=>({slug:p.slug})),...Object.keys(LEGACY_PRODUCT_ROUTES).map(slug=>({slug}))]}
function find(slug:string){return CATALOG.find(p=>p.slug===(LEGACY_PRODUCT_ROUTES[slug]||slug))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=find(slug);if(!p)return pageMetadata("Product not found","The requested EonTera product category was not found.",`/products/${slug}/`);const canonicalSlug=LEGACY_PRODUCT_ROUTES[slug]||slug;return {...pageMetadata(p.shortTitle,p.body,`/products/${canonicalSlug}/`),...(LEGACY_PRODUCT_ROUTES[slug]?{robots:{index:false,follow:true}}:{})}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=find(slug);if(!p)notFound();const origin=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,"");const crumbs={"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"Products",...(origin?{item:`${origin}/products/`}:{})},{"@type":"ListItem",position:2,name:p.shortTitle,...(origin?{item:`${origin}/products/${p.slug}/`}:{})}]};return <>
  <JsonLd data={crumbs}/>
  <div data-product-view={p.slug}>
    <div className="container breadcrumb"><Link href="/products/">Product portfolio</Link><span>/</span><span>{p.shortTitle}</span></div>
    <PageHero eyebrow={`CATEGORY ${p.number} / PROTECTION PORTFOLIO`} title={<>{p.shortTitle}<em>.</em></>} text={p.body} image={p.image} imageAlt={p.imageAlt}>
      <div className="button-row"><Button href={`/request-quote/?product=${encodeURIComponent(p.shortTitle)}`}>Request quote</Button><Button href={`/talk-to-expert/?product=${encodeURIComponent(p.shortTitle)}`} variant="outline">Talk to an expert</Button></div>
    </PageHero>
    <section className="section"><div className="container detail-layout"><SectionHead eyebrow="COMMERCIAL PRODUCT STRUCTURE" title={<>Known data first.<br/>Technical values <em>only when approved.</em></>}/><div className="detail-copy product-spec-stack">
      <div className="spec-block"><h3>Benefits / portfolio focus</h3><ul className="check-list">{p.bullets.map(b=><li key={b}><Check size={18}/>{b}</li>)}</ul></div>
      <div className="spec-block"><h3>Applications</h3><div className="tags">{p.applications.map(a=><span key={a}>{a}</span>)}</div></div>
      <div className="spec-block"><h3>Solutions</h3><div className="tags">{p.solutions.map(a=><span key={a}>{a}</span>)}</div></div>
      <div className="spec-data-grid">
        <article><ShieldCheck size={21}/><span>Suitable surfaces</span><p>Confirm substrate compatibility in the current approved technical datasheet.</p></article>
        <article><FileText size={21}/><span>Technical information</span><p>Coverage, thickness and performance properties require approved product-level data.</p></article>
        <article><Wrench size={21}/><span>Application method</span><p>Request the current installation or application instructions before specification.</p></article>
        <article><PackageOpen size={21}/><span>Packaging</span><p>Current commercial packaging information is not present in the supplied source package.</p></article>
      </div>
      <div className="technical-note"><h3>Documents</h3><p>Technical datasheets, product brochures, certificates, test reports and SDS/MSDS are linked here only when EonTera supplies approved files.</p><Link className="text-link" href={`/contact/?interest=${encodeURIComponent("Technical information: "+p.shortTitle)}`}>Request approved documents <ArrowUpRight size={17}/></Link></div>
    </div></div></section>
    <section className="section collection-section"><div className="container faq-layout"><SectionHead eyebrow="PRODUCT QUESTIONS" title={<>Before you<br/><em>specify.</em></>}/><Faq items={FAQS.slice(1,5)}/></div></section>
    <section className="section"><div className="container"><SectionHead eyebrow="RELATED PRODUCTS" title={<>Explore the<br/><em>connected portfolio.</em></>}/><div className="related-grid">{CATALOG.filter(c=>c.slug!==p.slug).map(c=><Link className="related-card reveal" key={c.slug} href={`/products/${c.slug}/`}><img src={`/media/${c.image}.webp?v=20260922b`} alt={c.imageAlt} width="700" height="480" loading="lazy"/><h3>{c.shortTitle}<ArrowUpRight size={20}/></h3></Link>)}</div></div></section>
  </div><ContactBand/>
</>}
