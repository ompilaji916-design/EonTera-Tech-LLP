"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CATALOG } from "@/lib/data/catalog";
import { SectionHead, TextLink } from "./ui";
import { InteractiveSurface } from "./interactive-surface";
import { useMotionPreference } from "./motion-preference";

export function PortfolioShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const { enabled } = useMotionPreference();
  function move(next: number) {
    const node = track.current;
    if (!node) return;
    const cards = [...node.children] as HTMLElement[];
    const target = Math.max(0, Math.min(cards.length - 1, next));
    node.scrollTo({ left: cards[target].offsetLeft - cards[0].offsetLeft, behavior: enabled && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto" });
  }
  function updatePosition() {
    const node = track.current;
    if (!node) return;
    const cards = [...node.children] as HTMLElement[];
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    const last = node.scrollWidth - node.clientWidth;
    setIndex(last > 0 && node.scrollLeft >= last - 4 ? cards.length - 1 : Math.max(0, Math.min(cards.length - 1, Math.round(node.scrollLeft / (step || 1)))));
  }
  return (
    <section className="section portfolio-section" aria-label="Product portfolio">
      <div className="container">
        <div className="section-topline">
          <SectionHead eyebrow="SOLUTIONS FOR EVERY LAYER" title={<>One portfolio.<br /><em>A world of protection.</em></>} />
          <TextLink href="/products/">View all products</TextLink>
        </div>
        <div className="portfolio-track" ref={track} onScroll={updatePosition} tabIndex={0} aria-label="Product categories. Use left and right arrow keys to browse." onKeyDown={event => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(index + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}>
          {CATALOG.map((product, position) => (
            <article className="portfolio-slide" key={product.slug} aria-label={`${position + 1} of ${CATALOG.length}: ${product.shortTitle}`}>
              <div className="portfolio-copy">
                <span className="portfolio-number">{product.number} / EONTERA SOLUTIONS</span>
                <h3>{product.shortTitle}</h3>
                <p>{product.body}</p>
                <Link className="button" href={`/products/${product.slug}/`}>Explore this solution <ArrowUpRight size={18} /></Link>
              </div>
              <InteractiveSurface className="portfolio-art">
                <img src={`/media/${product.image}.webp?v=20260922b`} alt={product.imageAlt} width="960" height="800" loading="lazy" decoding="async" />
                <span className="portfolio-orb" aria-hidden="true" />
              </InteractiveSurface>
            </article>
          ))}
        </div>
        <div className="portfolio-controls">
          <div className="portfolio-dots" aria-label="Choose a product category">
            {CATALOG.map((product, position) => <button key={product.slug} aria-label={`Show ${product.shortTitle}`} aria-current={position === index ? "true" : undefined} onClick={() => move(position)} />)}
          </div>
          <span className="portfolio-position" aria-live="polite" aria-atomic="true">0{index + 1} <span>/ 04</span></span>
          <div className="carousel-arrows">
            <button aria-label="Previous product category" disabled={index === 0} onClick={() => move(index - 1)}><ArrowLeft size={20} /></button>
            <button aria-label="Next product category" disabled={index === CATALOG.length - 1} onClick={() => move(index + 1)}><ArrowRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
