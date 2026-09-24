import type { MetadataRoute } from "next";
import { CATALOG } from "@/lib/data/catalog";
import { PROJECT_CASE_STUDIES } from "@/lib/data/platform";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (!origin) return [];
  return [
    "",
    "about",
    "solutions",
    "technology",
    "industries",
    "partners",
    "projects",
    "resources",
    "products",
    "products/compare",
    "quality",
    "sustainability",
    "news-media",
    "events",
    "careers",
    "careers/apply",
    "search",
    "request-quote",
    "talk-to-expert",
    "distributors",
    "solution-finder",
    "contact",
    "privacy-policy",
    "terms",
    "cookie-policy",
    "disclaimer",
    ...CATALOG.map((p) => `products/${p.slug}`),
    ...PROJECT_CASE_STUDIES.map((p) => `projects/${p.slug}`),
  ].map((path) => ({
    url: `${origin}/${path ? path + "/" : ""}`,
    changeFrequency: path.startsWith("news-media") || path.startsWith("events") ? "weekly" as const : "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("products") ? 0.8 : 0.6,
  }));
}
