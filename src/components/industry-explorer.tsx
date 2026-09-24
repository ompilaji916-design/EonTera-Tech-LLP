"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InteractiveSurface } from "./interactive-surface";
import { useMotionPreference } from "./motion-preference";

const industries = [
  { name: "Residential", image: "panel-04-rooftop-terrace", title: "Spaces to call home.", text: "Membrane solutions for residential foundations, terraces and wet areas.", alt: "Conceptual residential rooftop and terrace" },
  { name: "Commercial", image: "panel-03-building-interior", title: "Built for the everyday.", text: "Plan protection around the shared spaces and structural areas of commercial buildings.", alt: "Conceptual commercial building interior" },
  { name: "Infrastructure", image: "aerial-foundation-membrane", title: "Start with the foundations.", text: "Explore below-ground waterproofing for infrastructure project requirements.", alt: "Conceptual infrastructure foundation protected with membrane" },
  { name: "Industrial", image: "hero-membrane-wall-construction", title: "Protection with purpose.", text: "Discuss membranes and manufactured sheets for industrial structures.", alt: "Conceptual membrane installation on an industrial foundation wall" },
  { name: "Institutional", image: "panel-02-foundation-structure", title: "Consider every shared space.", text: "Coordinate waterproofing around institutional buildings, foundations and occupied spaces.", alt: "Conceptual concrete structure and institutional basement" },
];

export function IndustryExplorer() {
  const [selected, setSelected] = useState(1);
  const [pending, setPending] = useState<number | null>(null);
  const [failedName, setFailedName] = useState("");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const { enabled } = useMotionPreference();
  function select(index: number) {
    setFailedName("");
    setPending(index);
    // Images share the same lazy-loaded figure. Keep the current image visible
    // until its replacement has loaded, including on a slow connection.
    const image = document.getElementById(`industry-image-${index}`) as HTMLImageElement | null;
    if (image?.complete && image.naturalWidth > 0) { setSelected(index); setPending(null); }
    else if (image?.complete) { setPending(null); setFailedName(industries[index].name); }
  }
  function keys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % industries.length;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + industries.length - 1) % industries.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = industries.length - 1;
    else return;
    event.preventDefault(); tabs.current[next]?.focus(); select(next);
  }
  const current = pending ?? selected;
  return (
    <div className="industry-explorer reveal">
      <InteractiveSurface className="industry-stage">
        {industries.map((industry, index) => <img id={`industry-image-${index}`} key={industry.name}
          className={selected === index ? "industry-frame is-current" : "industry-frame"}
          src={`/media/${industry.image}.webp?v=20260922b`} width="1600" height="1000" loading="lazy" decoding="async"
          alt={selected === index ? industry.alt : ""} aria-hidden={selected !== index}
          onLoad={() => { if (pending === index) { setSelected(index); setPending(null); } }}
          onError={() => { if (pending === index) { setPending(null); setFailedName(industry.name); } }} />)}
        <div className="industry-image-shade" />
        <div className="industry-image-caption" key={selected} data-animate={enabled}>
          <span>0{selected + 1} / {industries[selected].name.toUpperCase()}</span>
          <p>{industries[selected].title}</p>
        </div>
      </InteractiveSurface>
      <div className="industry-selector">
        <p className="eyebrow">CHOOSE YOUR WORLD</p>
        <div className="industry-tabs" role="tablist" aria-label="Explore industries" aria-orientation="vertical">
          {industries.map((industry, index) => <button type="button" key={industry.name} id={`industry-tab-${index}`} role="tab"
            aria-selected={current === index} aria-controls="industry-detail" tabIndex={current === index ? 0 : -1}
            ref={node => { tabs.current[index] = node; }} onClick={() => select(index)} onKeyDown={event => keys(event, index)}>
            <span>0{index + 1}</span>{industry.name}<ArrowUpRight size={19} />
          </button>)}
        </div>
        <div className="industry-detail" id="industry-detail" role="tabpanel" aria-labelledby={`industry-tab-${current}`} tabIndex={0}>
          {failedName && <p role="status" className="preview-error">The {failedName.toLowerCase()} image could not load. The previous preview is still available.</p>}
          <p key={current} data-animate={enabled}>{industries[current].text}</p>
          <Link className="text-link" href={`/industries/#${industries[current].name.toLowerCase()}`}>Explore {industries[current].name.toLowerCase()}<ArrowUpRight size={17} /></Link>
        </div>
      </div>
    </div>
  );
}
