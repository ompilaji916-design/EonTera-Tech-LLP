"use client";
import { useMemo, useState } from "react";
import { Search, ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { RESOURCE_RECORDS } from "@/lib/data/platform";
import { track } from "@/lib/analytics";

export function ResourceCentre() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [product, setProduct] = useState("All");
  const [industry, setIndustry] = useState("All");
  const [solution, setSolution] = useState("All");
  const types = ["All", ...Array.from(new Set(RESOURCE_RECORDS.map((x) => x.type)))];
  const products = ["All", ...Array.from(new Set(RESOURCE_RECORDS.map((x) => x.product).filter((x): x is string => Boolean(x))))];
  const industries = ["All", ...Array.from(new Set(RESOURCE_RECORDS.map((x) => x.industry).filter((x): x is string => Boolean(x))))];
  const solutions = ["All", ...Array.from(new Set(RESOURCE_RECORDS.map((x) => x.solution).filter((x): x is string => Boolean(x))))];
  const records = useMemo(() => RESOURCE_RECORDS.filter((r) => {
    const q = query.trim().toLowerCase();
    return (type === "All" || r.type === type)
      && (product === "All" || r.product === product)
      && (industry === "All" || r.industry === industry)
      && (solution === "All" || r.solution === solution)
      && (!q || `${r.title} ${r.summary} ${r.type} ${r.product || ""} ${r.industry || ""} ${r.solution || ""}`.toLowerCase().includes(q));
  }), [query, type, product, industry, solution]);

  const Filter = ({ label, value, setValue, options }: { label: string; value: string; setValue: (value: string) => void; options: string[] }) => (
    <label className="field compact-field"><span>{label}</span><select value={value} onChange={(e) => setValue(e.target.value)} disabled={options.length === 1}><option value="All">{options.length === 1 ? "No approved metadata" : `All ${label.toLowerCase()}s`}</option>{options.slice(1).map((x) => <option key={x}>{x}</option>)}</select></label>
  );

  return <>
    <div className="resource-controls">
      <label className="search-field"><Search size={17}/><span className="sr-only">Search resources</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search resources…"/></label>
      <Filter label="Document type" value={type} setValue={setType} options={types}/>
      <Filter label="Product" value={product} setValue={setProduct} options={products}/>
      <Filter label="Industry" value={industry} setValue={setIndustry} options={industries}/>
      <Filter label="Solution" value={solution} setValue={setSolution} options={solutions}/>
    </div>
    <div className="resources-grid resource-centre-grid">
      {records.map((r) => <article className="resource-card reveal" key={r.id}>
        <p className="eyebrow">{r.type.toUpperCase()}</p><h3>{r.title}</h3><p>{r.summary}</p>
        <a className="text-link" href={r.href} download={r.download || undefined} onClick={() => r.download && track("resource_download", { resource: r.id, href: r.href })}>
          {r.download ? "Download" : "Open resource"}{r.download ? <ArrowDownToLine size={16}/> : <ArrowUpRight size={16}/>} 
        </a>
      </article>)}
      {!records.length && <div className="empty-state"><h2>No matching resources.</h2><p>Try a broader search or reset one of the filters.</p></div>}
    </div>
  </>;
}
