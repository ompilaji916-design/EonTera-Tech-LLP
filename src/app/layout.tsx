import type { Metadata } from "next";
import "@fontsource/dm-serif-display/400.css";
import "@fontsource/dm-serif-display/400-italic.css";
import "@fontsource-variable/manrope";
import "./globals.css";
import "./refinement.css";
import "./experience.css";
import "./platform.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionManager } from "@/components/motion";
import { MotionProvider } from "@/components/motion-preference";
import { AnalyticsBridge } from "@/components/analytics";
import { COMPANY } from "@/lib/data/content";
const url = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  ...(url ? { metadataBase: new URL(url) } : {}),
  title: {
    default: "EonTera Tech LLP — Protecting Every Layer",
    template: "%s | EonTera Tech LLP",
  },
  description:
    "Polymer-based waterproofing membranes and manufactured membrane sheets. Discover EonTera’s protection solutions, from basement to terrace.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "EonTera Tech LLP — Protecting Every Layer",
    description: "Waterproofing solutions. From basement to terrace.",
    type: "website",
    ...(url
      ? {
          images: [
            { url: "/media/architecture.webp?v=20260922b", width: 1672, height: 941 },
          ],
        }
      : {}),
  },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY.name,
    ...(url ? { url } : {}),
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shop No. 9, East Bharatkunj CHS, Vile Parle (East)",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400057",
      addressCountry: "IN",
    },
  };
  const website = url ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: COMPANY.name,
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url.replace(/\/$/, "")}/search/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  } : null;
  return (
    <html lang="en">
      <body id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
        {website && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />}
        <MotionProvider>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionManager />
        <AnalyticsBridge />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
