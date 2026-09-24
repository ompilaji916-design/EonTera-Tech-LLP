"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, X, SlidersHorizontal } from "lucide-react";
import { CATALOG } from "@/lib/data/catalog";
export function Catalog(){
  const [query,setQuery]=useState(""),[category,setCategory]=useState("all"),[application,setApplication]=useState("all"),[solution,setSolution]=useState("all"),[type,setType]=useState("all");
  const apps=Array.from(new Set(CATALOG.flatMap(p=>p.applications))).sort();
  const solutions=Array.from(new Set(CATALOG.flatMap(p=>p.solutions))).sort();
  const types=Array.from(new Set(CATALOG.map(p=>p.productType))).sort();
  const products=useMemo(()=>CATALOG.filter(p=>{
    const text=`${p.title} ${p.body} ${p.applications.join(" ")} ${p.solutions.join(" ")} ${p.productType}`.toLowerCase();
    return (category==="all"||p.slug===category)&&(application==="all"||p.applications.includes(application))&&(solution==="all"||p.solutions.includes(solution))&&(type==="all"||p.productType===type)&&text.includes(query.trim().toLowerCase());
  }),[query,category,application,solution,type]);
  const reset=()=>{setQuery("");setCategory("all");setApplication("all");setSolution("all");setType("all")};
  return <div className="container catalog">
    <div className="advanced-filter-head"><div><SlidersHorizontal size={18}/><b>Advanced filters</b></div><Link className="text-link" href="/products/compare/">Compare products <ArrowUpRight size={15}/></Link></div>
    <div className="catalog-controls advanced-catalog-controls">
      <label className="search-field"><Search size={17}/><span className="sr-only">Search products</span><input placeholder="Search applications…" value={query} onChange={e=>setQuery(e.target.value)}/>{query&&<button type="button" onClick={()=>setQuery("")} aria-label="Clear search"><X size={15}/></button>}</label>
      <label className="field compact-field"><span>Product category</span><select value={category} onChange={e=>setCategory(e.target.value)}><option value="all">All categories</option>{CATALOG.map(p=><option key={p.slug} value={p.slug}>{p.shortTitle}</option>)}</select></label>
      <label className="field compact-field"><span>Application</span><select value={application} onChange={e=>setApplication(e.target.value)}><option value="all">All applications</option>{apps.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="field compact-field"><span>Solution</span><select value={solution} onChange={e=>setSolution(e.target.value)}><option value="all">All solutions</option>{solutions.map(x=><option key={x}>{x}</option>)}</select></label>
      <label className="field compact-field"><span>Product type</span><select value={type} onChange={e=>setType(e.target.value)}><option value="all">All product types</option>{types.map(x=><option key={x}>{x}</option>)}</select></label>
      <div className="filter-status"><b>Industry</b><span>Product mapping pending verification</span></div>
    </div>
    <div className="catalog-result-row"><p className="catalog-count" role="status">{products.length} product {products.length===1?"category":"categories"}</p><button type="button" className="text-button" onClick={reset}>Reset filters</button></div>
    <div className="catalog-grid">{products.map(p=><article className="catalog-card" key={p.slug} id={p.slug}><Link href={`/products/${p.slug}/`}><div className="product-image"><img src={`/media/${p.image}.webp?v=20260922b`} width="1000" height="650" alt={p.imageAlt} loading="lazy"/><span className="product-index">{p.number} / EONTERA</span><span className="card-arrow"><ArrowUpRight size={25}/></span></div><div className="catalog-card-copy"><p className="eyebrow">PROTECTION PORTFOLIO</p><h2>{p.shortTitle}</h2><p>{p.body}</p><div className="tags">{p.applications.map(a=><span key={a}>{a}</span>)}</div></div></Link></article>)}</div>
    {!products.length&&<div className="empty-state"><h2>No matching categories.</h2><p>Change one or more filters.</p><button className="button" onClick={reset}>Reset filters</button></div>}
  </div>
}
