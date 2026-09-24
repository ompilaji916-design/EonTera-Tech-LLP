"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { DISTRIBUTORS } from "@/lib/data/platform";

export function DistributorLocator() {
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const states = Array.from(new Set(DISTRIBUTORS.map((x) => x.state))).sort();
  const cities = Array.from(new Set(DISTRIBUTORS.filter((x) => !state || x.state === state).map((x) => x.city))).sort();
  const matches = useMemo(() => DISTRIBUTORS.filter((x) => (!state || x.state === state) && (!city || x.city === city)), [state, city]);
  return <div className="locator-shell">
    <div className="locator-controls">
      <label className="field"><span>State</span><select value={state} onChange={(e) => { setState(e.target.value); setCity(""); }} disabled={!states.length}><option value="">{states.length ? "All states" : "No verified locations yet"}</option>{states.map((x) => <option key={x}>{x}</option>)}</select></label>
      <label className="field"><span>City</span><select value={city} onChange={(e) => setCity(e.target.value)} disabled={!cities.length}><option value="">{cities.length ? "All cities" : "No verified cities yet"}</option>{cities.map((x) => <option key={x}>{x}</option>)}</select></label>
    </div>
    {matches.length ? <div className="locator-results">{matches.map((d) => <article key={`${d.name}-${d.city}`}><h3>{d.name}</h3><p>{d.city}, {d.state}</p>{d.phone && <a href={`tel:${d.phone}`}>{d.phone}</a>}{d.email && <a href={`mailto:${d.email}`}>{d.email}</a>}</article>)}</div> : <div className="empty-state"><h2>No verified distributor records are published yet.</h2><p>Distributor names and contacts will appear here only after EonTera approval.</p><Link className="button" href="/contact/?interest=Distributor%20Enquiry">Distributor enquiry</Link></div>}
  </div>;
}
