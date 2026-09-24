import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
export { Faq } from "./disclosure";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand ${light ? "brand-light" : ""}`}
      aria-label="EonTera Tech LLP — home"
    >
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="brand-name">
        EonTera<span>TECH LLP</span>
      </span>
    </Link>
  );
}
export function Button({
  href,
  children,
  variant = "",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: string;
  className?: string;
}) {
  return (
    <Link className={`button ${variant} ${className}`} href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children}
      <ArrowUpRight size={18} aria-hidden="true" />
    </Link>
  );
}
export function SectionHead({
  eyebrow,
  title,
  text,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  light?: boolean;
}) {
  return (
    <div className={`section-head reveal ${light ? "light" : ""}`}>
      <p className="eyebrow">
        <span />
        {eyebrow}
      </p>
      <h2>{title}</h2>
      {text && <p className="section-intro">{text}</p>}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt = "",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`page-hero ${image ? "with-image" : ""}`}>
      <div className="container page-hero-grid">
        <div>
          <p className="eyebrow">
            <span />
            {eyebrow}
          </p>
          <h1>{title}</h1>
          <p className="page-intro">{text}</p>
          {children}
        </div>
        {image && (
          <div className="page-hero-image" data-depth>
            <img
              src={`/media/${image}.webp?v=20260922b`}
              alt={imageAlt}
              width="1000"
              height="800"
              fetchPriority="high"
            />
            <span className="image-label">
              EONTERA / PROTECTION IN EVERY LAYER
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="container reveal">
        <p className="eyebrow">
          <span />
          LET’S BUILD BETTER
        </p>
        <div className="contact-band-row">
          <h2>
            Every great structure
            <br />
            starts with <em>protection.</em>
          </h2>
          <Link
            href="/contact/"
            className="round-cta"
            aria-label="Discuss your project"
          >
            <ArrowUpRight size={42} />
          </Link>
        </div>
        <div className="contact-band-bottom">
          <p>
            Tell us what you’re building. We’ll help you plan the next layer.
          </p>
          <TextLink href="/contact/">Start a conversation</TextLink>
        </div>
      </div>
    </section>
  );
}
export function Arrow({ size = 20 }: { size?: number }) {
  return <ArrowRight size={size} aria-hidden="true" />;
}
