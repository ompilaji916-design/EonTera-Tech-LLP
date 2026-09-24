"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X, Phone, MapPin, Search } from "lucide-react";
import { Logo } from "./ui";
import { COMPANY } from "@/lib/data/content";
import { MotionToggle } from "./motion-preference";
const links = [
  ["Solutions", "/solutions/"],
  ["Products", "/products/"],
  ["Technology", "/technology/"],
  ["Resources", "/resources/"],
];
const company = [
  ["About EonTera", "/about/"],
  ["Industries", "/industries/"],
  ["Projects", "/projects/"],
  ["Become a partner", "/partners/"],
  ["Quality", "/quality/"],
  ["Sustainability", "/sustainability/"],
  ["News & Media", "/news-media/"],
  ["Events", "/events/"],
  ["Careers", "/careers/"],
  ["Find a Distributor", "/distributors/"],
];
const industryLinks = [
  ["Residential", "panel-04-rooftop-terrace"],
  ["Commercial", "panel-03-building-interior"],
  ["Infrastructure", "aerial-foundation-membrane"],
  ["Industrial", "hero-membrane-wall-construction"],
  ["Institutional", "panel-02-foundation-structure"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [industries, setIndustries] = useState(false);
  const path = usePathname();
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const companyButton = useRef<HTMLButtonElement>(null);
  const industryButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
    setDrop(false);
    setIndustries(false);
  }, [path]);
  useEffect(() => {
    const media = matchMedia("(min-width: 961px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", resize);
    return () => media.removeEventListener("change", resize);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  useEffect(() => {
    const outside = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setDrop(false);
        setIndustries(false);
      }
    };
    document.addEventListener("pointerdown", outside);
    return () => document.removeEventListener("pointerdown", outside);
  }, []);
  function keys(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      if (industries) {
        setIndustries(false);
        industryButton.current?.focus();
      } else if (drop) {
        setDrop(false);
        companyButton.current?.focus();
      } else if (open) {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    if (open && e.key === "Tab") {
      const els = [
        ...ref.current!.querySelectorAll<HTMLElement>("a, button"),
      ].filter((el) => el.offsetParent !== null);
      const first = els[0],
        last = els.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
  return (
    <header
      className={`site-header ${open ? "menu-open" : ""}`}
      ref={ref}
      onKeyDown={keys}
    >
      <div className="utility-bar">
        <div className="container utility-inner">
          <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}><Phone size={12} />{COMPANY.phone}</a>
          <div className="utility-links">
            <MotionToggle />
            <span><MapPin size={12} /> Mumbai, India</span>
            <Link href="/about/">EonTera Tech LLP <ArrowUpRight size={12} /></Link>
          </div>
        </div>
      </div>
      <div className="header-inner">
        <div className="brand-lockup">
          <Logo />
          <span className="brand-division">WATERPROOFING<span>SOLUTIONS</span></span>
        </div>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => { setOpen(!open); setIndustries(false); setDrop(false); }}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          className={open ? "main-nav is-open" : "main-nav"}
          id="main-navigation"
          aria-label="Main navigation"
        >
          <div className="nav-industries" onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIndustries(false);
          }}>
            <button ref={industryButton} aria-expanded={industries} aria-controls="industry-navigation" onClick={() => { setIndustries(!industries); setDrop(false); }}>
              Industries <ChevronDown size={13} />
            </button>
            <div id="industry-navigation" className="industry-menu" hidden={!industries}>
              <div className="container industry-menu-inner">
                <div className="industry-menu-intro">
                  <p className="eyebrow">YOUR INDUSTRY. OUR FOCUS.</p>
                  <h2>Protection for<br />every structure.</h2>
                  <Link href="/industries/">Explore all industries <ArrowUpRight size={16} /></Link>
                </div>
                <div className="industry-menu-grid">
                  {industryLinks.map(([name, image]) => (
                    <Link href={`/industries/#${name.toLowerCase()}`} key={name}>
                      <img src={`/media/${image}.webp?v=20260922b`} width="220" height="150" loading="lazy" alt="" />
                      <span>{name}<ArrowUpRight size={14} /></span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {links.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={path.startsWith(href.slice(0, -1)) ? "active" : ""}
              aria-current={
                path.startsWith(href.slice(0, -1)) ? "page" : undefined
              }
            >
              {label}
            </Link>
          ))}
          <div
            className="nav-company"
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setDrop(false);
            }}
          >
            <button
              ref={companyButton}
              aria-expanded={drop}
              aria-controls="company-navigation"
              onClick={() => { setDrop(!drop); setIndustries(false); }}
            >
              Company
              <ChevronDown size={13} />
            </button>
            <div
              id="company-navigation"
              className="company-dropdown"
              hidden={!drop}
            >
              {company.map(([label, href]) => (
                <Link href={href} key={href}>
                  {label}
                  <ArrowUpRight size={14} />
                </Link>
              ))}
            </div>
          </div>
          <Link href="/search/" className="nav-search" aria-label="Search the EonTera website"><Search size={16} /></Link>
          <Link href="/request-quote/" className="header-cta">
            Request quote
            <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}
