"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X, ArrowUpRight } from "lucide-react";
import { SEARCH_INDEX, SearchKind } from "@/lib/data/platform";
import { track } from "@/lib/analytics";

const KINDS: Array<"All" | SearchKind> = ["All", "Product", "Solution", "Industry", "Project", "Resource", "FAQ", "News", "Media", "Page"];

export function GlobalSearch() {
  const [query, setQuery] = useState("");
  useEffect(() => { const q = new URLSearchParams(window.location.search).get("q"); if (q) setQuery(q.slice(0, 160)); }, []);
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const normalized = query.trim().toLowerCase();
  const results = useMemo(() => SEARCH_INDEX.filter((item) => {
    if (kind !== "All" && item.kind !== kind) return false;
    if (!normalized) return true;
    return `${item.title} ${item.text} ${item.kind}`.toLowerCase().includes(normalized);
  }), [kind, normalized]);

  function logSearch(value: string) {
    const q = value.trim();
    if (q.length >= 2) track("search_usage", { query: q, results: results.length, kind });
  }

  return <div className="global-search-shell">
    <div className="global-search-bar">
      <Search size={20} />
      <label className="sr-only" htmlFor="global-search-input">Search the EonTera website</label>
      <input id="global-search-input" value={query} onChange={(e) => setQuery(e.target.value)} onBlur={(e) => logSearch(e.target.value)} placeholder="Search products, solutions, resources, FAQs, news…" autoFocus />
      {query && <button type="button" aria-label="Clear search" onClick={() => setQuery("")}><X size={18} /></button>}
    </div>
    <div className="search-kinds" aria-label="Search content type">
      {KINDS.map((value) => <button key={value} type="button" className={kind === value ? "selected" : ""} onClick={() => setKind(value)}>{value}</button>)}
    </div>
    <p className="catalog-count" role="status">{results.length} result{results.length === 1 ? "" : "s"}</p>
    <div className="search-results">
      {results.map((item, i) => <Link className="search-result" href={item.href} key={`${item.href}-${item.title}-${i}`}>
        <span>{item.kind}</span>
        <div><h2>{item.title}</h2><p>{item.text.slice(0, 180)}{item.text.length > 180 ? "…" : ""}</p></div>
        <ArrowUpRight size={20} />
      </Link>)}
      {!results.length && <div className="empty-state"><h2>No matching content.</h2><p>Try a broader term or another content type.</p></div>}
    </div>
  </div>;
}
