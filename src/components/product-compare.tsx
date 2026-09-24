"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, ArrowUpRight } from "lucide-react";
import { CATALOG } from "@/lib/data/catalog";

export function ProductCompare() {
  const [selected, setSelected] = useState<string[]>(CATALOG.slice(0, 2).map((x) => x.slug));
  const products = useMemo(() => CATALOG.filter((p) => selected.includes(p.slug)), [selected]);
  function toggle(slug: string) {
    setSelected((current) => current.includes(slug) ? current.filter((x) => x !== slug) : current.length < 3 ? [...current, slug] : current);
  }
  return <div className="compare-shell">
    <div className="compare-picker">
      {CATALOG.map((p) => <button key={p.slug} type="button" className={selected.includes(p.slug) ? "selected" : ""} aria-pressed={selected.includes(p.slug)} onClick={() => toggle(p.slug)}>
        <span className="compare-check">{selected.includes(p.slug) && <Check size={14}/>}</span>{p.shortTitle}
      </button>)}
    </div>
    <p className="compare-note">Choose up to 3 portfolio categories. Commercial coverage, packaging and technical-property values are shown only after EonTera supplies approved product data.</p>
    <div className="compare-table-wrap">
      <table className="compare-table"><thead><tr><th>Criteria</th>{products.map((p) => <th key={p.slug}>{p.shortTitle}</th>)}</tr></thead>
      <tbody>
        <tr><th>Application</th>{products.map((p) => <td key={p.slug}>{p.applications.join(", ")}</td>)}</tr>
        <tr><th>Surface</th>{products.map((p) => <td key={p.slug}>Confirm substrate compatibility from the approved technical datasheet.</td>)}</tr>
        <tr><th>Benefits / portfolio focus</th>{products.map((p) => <td key={p.slug}><ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul></td>)}</tr>
        <tr><th>Coverage</th>{products.map((p) => <td key={p.slug}>Approved product value required</td>)}</tr>
        <tr><th>Packaging</th>{products.map((p) => <td key={p.slug}>Approved product value required</td>)}</tr>
        <tr><th>Technical properties</th>{products.map((p) => <td key={p.slug}>Request the current technical datasheet.</td>)}</tr>
        <tr><th>Details</th>{products.map((p) => <td key={p.slug}><Link className="text-link" href={`/products/${p.slug}/`}>View category <ArrowUpRight size={15}/></Link></td>)}</tr>
      </tbody></table>
    </div>
  </div>;
}
