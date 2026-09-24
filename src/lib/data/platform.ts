import { CATALOG, FAQS } from "./catalog";

export type VerificationState = "verified" | "awaiting-approved-data";

export const QUALITY_AREAS = [
  "Quality control",
  "Quality process",
  "Laboratory",
  "Raw-material testing",
  "Finished-product testing",
  "Manufacturing standards",
  "Compliance",
  "Certifications",
].map((title) => ({ title, status: "awaiting-approved-data" as VerificationState }));

export const SUSTAINABILITY_AREAS = [
  "Environment",
  "Sustainable products",
  "Responsible manufacturing",
  "Waste management",
  "Energy",
  "Water",
  "Community initiatives",
].map((title) => ({ title, status: "awaiting-approved-data" as VerificationState }));

export type NewsType =
  | "Company news"
  | "Product launch"
  | "Announcement"
  | "Event news"
  | "Press coverage"
  | "Publication"
  | "Media mention"
  | "Video";

export interface NewsRecord {
  slug: string;
  title: string;
  type: NewsType;
  publishedAt: string;
  excerpt: string;
  href?: string;
}

// Publish only approved company records here. Intentionally empty: the source
// package contains no verified news, press or media-mention records.
export const NEWS_RECORDS: NewsRecord[] = [];

export interface EventRecord {
  slug: string;
  title: string;
  kind: "Exhibition" | "Conference" | "Trade show" | "Other";
  startDate: string;
  endDate?: string;
  location: string;
  status: "upcoming" | "past";
  summary: string;
  gallery?: string[];
}

// Intentionally empty until EonTera supplies approved event details.
export const EVENT_RECORDS: EventRecord[] = [];

export interface CareerOpening {
  slug: string;
  title: string;
  location: string;
  type: string;
  summary: string;
}

export const CAREER_OPENINGS: CareerOpening[] = [];

export interface DistributorRecord {
  name: string;
  state: string;
  city: string;
  phone?: string;
  email?: string;
}

export const DISTRIBUTORS: DistributorRecord[] = [];

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  location: string;
  industry: string;
  challenge: string;
  solution: string;
  productsUsed: string[];
  applicationProcess: string[];
  media: string[];
  results: string[];
  relatedProductSlugs: string[];
  relatedSolutionSlugs: string[];
}

// Do not add conceptual images or sample projects here. Only completed,
// company-approved EonTera project records belong in this collection.
export const PROJECT_CASE_STUDIES: ProjectCaseStudy[] = [];

export type ResourceType =
  | "Product datasheet"
  | "Technical datasheet"
  | "Brochure"
  | "Product catalogue"
  | "Application guide"
  | "Installation guide"
  | "Certificate"
  | "Test report"
  | "SDS / MSDS"
  | "FAQ"
  | "Video"
  | "Other download";

export interface ResourceRecord {
  id: string;
  title: string;
  summary: string;
  type: ResourceType;
  href: string;
  download?: boolean;
  product?: string;
  industry?: string;
  solution?: string;
}

export const RESOURCE_RECORDS: ResourceRecord[] = [
  {
    id: "company-overview",
    title: "Company overview",
    summary: "EonTera portfolio, service approach and contact information.",
    type: "Brochure",
    href: "/downloads/eontera-company-overview.pdf",
    download: true,
  },
  {
    id: "project-checklist",
    title: "Project enquiry checklist",
    summary: "Site details to gather before a product or application discussion.",
    type: "Application guide",
    href: "/downloads/eontera-project-checklist.pdf",
    download: true,
  },
  {
    id: "protection-guide",
    title: "The protection conversation",
    summary: "A general planning guide for structure, exposure and next steps.",
    type: "Other download",
    href: "/downloads/eontera-protection-guide.pdf",
    download: true,
  },
  {
    id: "faq",
    title: "Frequently asked questions",
    summary: "Answers about EonTera, solution selection, support and documentation.",
    type: "FAQ",
    href: "/resources/#faqs",
  },
];

export type SearchKind =
  | "Product"
  | "Solution"
  | "Industry"
  | "Project"
  | "Resource"
  | "FAQ"
  | "News"
  | "Media"
  | "Page";

export interface SearchRecord {
  title: string;
  kind: SearchKind;
  href: string;
  text: string;
}

const solutionRecords: SearchRecord[] = [
  ["Basement protection", "basement"], ["Foundation protection", "foundation"], ["Roof protection", "roof"], ["Terrace protection", "terrace"], ["Wet-area protection", "wet-area"], ["Complete building protection", "complete"],
].map(([title, anchor]) => ({ title, kind: "Solution" as const, href: `/solutions/#${anchor}`, text: `${title} waterproofing solution application protection` }));

const industryRecords: SearchRecord[] = ["Residential", "Commercial", "Infrastructure", "Industrial", "Institutional"].map((title) => ({ title, kind: "Industry" as const, href: `/industries/#${title.toLowerCase()}`, text: `${title} buildings projects waterproofing industry` }));

const staticPages: SearchRecord[] = [
  { title: "About EonTera", kind: "Page", href: "/about/", text: "company team approach EonTera Tech LLP" },
  { title: "Quality", kind: "Page", href: "/quality/", text: "quality control process laboratory raw material finished product testing manufacturing standards compliance certifications" },
  { title: "Sustainability", kind: "Page", href: "/sustainability/", text: "environment sustainable products responsible manufacturing waste energy water community" },
  { title: "News & Media", kind: "News", href: "/news-media/", text: "company news launches announcements events press publications media mentions videos" },
  { title: "Events", kind: "Page", href: "/events/", text: "upcoming exhibitions conferences trade shows past events gallery" },
  { title: "Careers", kind: "Page", href: "/careers/", text: "careers jobs internships open positions life culture apply" },
  { title: "Projects", kind: "Project", href: "/projects/", text: "project case studies challenge solution application process results" },
  { title: "Resource centre", kind: "Resource", href: "/resources/", text: "datasheets brochures guides certificates test reports sds msds downloads" },
  { title: "Find a distributor", kind: "Page", href: "/distributors/", text: "dealer distributor state city contact" },
  { title: "Request a quote", kind: "Page", href: "/request-quote/", text: "quote product solution project quantity requirement" },
  { title: "Talk to an expert", kind: "Page", href: "/talk-to-expert/", text: "technical expert application project problem requirement" },
  { title: "Product comparison", kind: "Product", href: "/products/compare/", text: "compare application surface benefits coverage packaging technical properties" },
];

export const SEARCH_INDEX: SearchRecord[] = [
  ...staticPages,
  ...solutionRecords,
  ...industryRecords,
  ...CATALOG.map((p) => ({
    title: p.shortTitle,
    kind: "Product" as const,
    href: `/products/${p.slug}/`,
    text: `${p.title} ${p.body} ${p.bullets.join(" ")} ${p.applications.join(" ")}`,
  })),
  ...FAQS.map(([question, answer]) => ({
    title: question,
    kind: "FAQ" as const,
    href: "/resources/#faqs",
    text: `${question} ${answer}`,
  })),
  ...RESOURCE_RECORDS.map((r) => ({
    title: r.title,
    kind: "Resource" as const,
    href: r.href,
    text: `${r.summary} ${r.type} ${r.product || ""} ${r.industry || ""} ${r.solution || ""}`,
  })),
  ...NEWS_RECORDS.map((n) => ({
    title: n.title,
    kind: (n.type === "Video" || n.type === "Media mention" ? "Media" : "News") as SearchKind,
    href: n.href || "/news-media/",
    text: `${n.type} ${n.excerpt}`,
  })),
];

export const TRUST_CATEGORIES = [
  "Certifications",
  "Awards",
  "Industry memberships",
  "Quality standards",
  "Major projects",
  "Client logos",
  "Testimonials",
  "Years of experience",
  "Manufacturing facilities",
];
