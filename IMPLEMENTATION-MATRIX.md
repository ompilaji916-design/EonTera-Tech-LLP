# EonTera website expansion — implementation matrix

## Added

| Requirement | Implementation |
| --- | --- |
| Quality | `/quality/`, verification-first topic grid for QC, process, laboratory, raw/finished testing, standards, compliance, certifications |
| Sustainability | `/sustainability/`, environment/products/manufacturing/waste/energy/water/community disclosure structure |
| News & Media | `/news-media/` + CMS-shaped `NEWS_RECORDS` + detail-route template |
| Events | `/events/` + `EVENT_RECORDS` + detail route and gallery schema |
| Careers | `/careers/` + `/careers/apply/` + `CAREER_OPENINGS` model |
| Global search | `/search/`, indexes products, solutions, industries, resources, FAQs, projects and newsroom records |
| Analytics | dataLayer/custom-event bridge for page/product views, downloads, contact/phone/email clicks, quote/expert enquiries and search usage |
| Trust / credibility | verification-first About-page section covering certifications, awards, memberships, quality standards, projects, clients, testimonials, experience and facilities |
| Product comparison | `/products/compare/`, up to three published portfolio categories side by side |

## Upgraded

| Requirement | Implementation |
| --- | --- |
| Project case studies | filterable `/projects/`, `PROJECT_CASE_STUDIES` schema, complete `/projects/[slug]/` template |
| Contact enquiries | six enquiry types: General, Sales, Technical Support, Distributor, Career, Project |
| Request a Quote | `/request-quote/`, structured commercial brief + optional attachment handoff |
| Talk to an Expert | `/talk-to-expert/`, dedicated technical-enquiry flow |
| Product filtering | category, application, solution and product-type filters; industry relationship is not fabricated and activates only when approved mapping exists |
| Commercial product database | richer category detail pages with benefits/applications/solutions and controlled placeholders for product-level data that is not verified |
| Resource Centre | search + document-type/product/industry/solution filters and CMS-shaped resource records |
| Security hardening | CSP/HSTS/security headers/security.txt plus deployment checklist for CDN/WAF/DDoS/rate-limit work |
| SEO | unique metadata, conditional canonicals, OG/Twitter, sitemap/robots, Organization/WebSite/FAQ/Breadcrumb structured data, Search Console deployment steps |
| Distributor locator | `/distributors/`, state → city → verified distributor data model |

## Deliberately not fabricated

The supplied source does **not** verify commercial SKUs, certifications, awards, memberships, completed projects, client logos, testimonials, facilities, business hours, official social accounts, distributor records, events, news coverage or career openings. Those collections remain empty or clearly marked as awaiting approved data.

## Infrastructure boundary

This is a static Next.js export architecture. Cloudflare/CDN, WAF, DDoS protection, server rate limits, server-side form validation, spam filtering, CMS write APIs, file-upload storage and Search Console ownership verification require the final hosting/domain/backend environment and are documented rather than falsely represented as completed by frontend files.
