"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { PROJECT_CASE_STUDIES } from "@/lib/data/platform";
import { ArrowUpRight } from "lucide-react";

export function ProjectListing(){
  const industries=["All",...Array.from(new Set(PROJECT_CASE_STUDIES.map(x=>x.industry)))];
  const locations=["All",...Array.from(new Set(PROJECT_CASE_STUDIES.map(x=>x.location)))];
  const [industry,setIndustry]=useState("All"),[location,setLocation]=useState("All");
  const rows=useMemo(()=>PROJECT_CASE_STUDIES.filter(x=>(industry==="All"||x.industry===industry)&&(location==="All"||x.location===location)),[industry,location]);
  return <div className="project-system">
    <div className="project-filters"><label className="field"><span>Industry</span><select value={industry} onChange={e=>setIndustry(e.target.value)} disabled={industries.length===1}>{industries.map(x=><option key={x}>{x}</option>)}</select></label><label className="field"><span>Location</span><select value={location} onChange={e=>setLocation(e.target.value)} disabled={locations.length===1}>{locations.map(x=><option key={x}>{x}</option>)}</select></label></div>
    {rows.length?<div className="project-list-grid">{rows.map(p=><Link href={`/projects/${p.slug}/`} className="project-list-card" key={p.slug}><p className="eyebrow">{p.industry}</p><h3>{p.title}</h3><p>{p.location}</p><span>Read case study <ArrowUpRight size={16}/></span></Link>)}</div>:<div className="empty-state editorial-empty"><h2>No verified EonTera case studies are published yet.</h2><p>The case-study model is ready for challenge, solution, products used, application process, media, results and related content. Conceptual website imagery is not being presented as project evidence.</p><Link className="button" href="/contact/?interest=Project%20Enquiry">Project enquiry</Link></div>}
  </div>
}
