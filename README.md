# EonTera Tech LLP — static website

A static EonTera website in the supplied deck’s forest-green, warm-ivory and orange theme. The updated layout makes the Pidilite reference visible through a two-level header, image-led industry navigation, a circular hero statement, broad curved imagery and an overlapping coloured panel. Typography, media and interactions are hosted locally.

## Run the source

Use a Node version supported by the full development toolchain: Node **22.22.2+ within the 22.x line**, **24.15.0+ within the 24.x line**, or **26+**. The prebuilt website itself needs no Node server.

```sh
npm ci
npm run dev
```

Build and preview the static output:

```sh
npm run build
npm start
```

Open `http://localhost:4173` for the static preview. To use a different port, set the `PORT` environment variable. `npm run dev` uses port 3000 by default.

## Host the finished website

Upload the **contents** of `out/` (or the delivery ZIP’s `site/` folder) to the root of an ordinary static web host. Keep `_next/`, `media/`, `downloads/` and every page folder together. The site expects the root of a domain or subdomain, not a nested subdirectory.

No database, PHP, server functions, Next.js runtime or admin account is needed. Do not use `next start` for the static output. Use HTTP/HTTPS to preview; double-clicking individual HTML files does not resolve the site’s root-relative assets.

The included `_headers` file configures security and cache headers on hosts that support that format, such as Netlify and Cloudflare Pages. On other hosts, configure equivalent headers in the hosting dashboard. The files themselves cannot force HTTP response headers.

## Optional final-domain metadata

The supplied documents do not confirm a final public domain. The build intentionally avoids inventing one. Before your domain-specific release, copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin, then rebuild. This populates the sitemap URL entries and absolute social-sharing metadata. Without it, the site still works, `robots.txt` permits indexing, and no unverified origin is advertised.

## What runs in the browser

- Accessible desktop and mobile navigation, with Escape dismissal and focus handling.
- Interactive building protection hotspots and expandable application descriptions.
- Searchable, filterable four-category product catalogue.
- Three-question solution finder, back navigation and shareable enquiry context.
- Email enquiry draft builder with validation, explicit sharing consent, review, copy and text-download options.
- A swipeable product showcase with keyboard arrows, previous/next buttons and direct category navigation.
- Staggered, finite scroll reveals using the browser’s Web Animations API; a reading-progress line; small desktop image-depth movement; and smooth, accessible expanding panels. Content is never hidden while waiting for an animation. Reduced-motion changes take effect immediately.
- The supplied architectural film now fills the hero. Its visible Gemini sparkle is excluded with a tighter 16:9 crop. A silent, approximately 20-second forward/reverse loop avoids a hard reset, with a 640 × 360 mobile variant. The full 10-second edit is available in a modal viewer with chapter controls, native playback controls and a download link; its audio is retained. Background playback is muted.
- The existing membrane camera-motion film remains unchanged. Both backgrounds retain poster fallbacks, delay loading until visible, respect reduced-motion and supported data-saving settings, and pause offscreen, in hidden tabs and while the full film is open.
- A global Motion switch pauses decorative effects and background playback. Pointer depth and light follow a mouse without altering touch scrolling. Ambient circles animate only while visible.
- Five keyboard-accessible industry tabs change the imagery and application copy. The previous image remains visible while the selected preview loads, with an announced recovery state on failure.

## Enquiries and resources

The website prepares an email draft. A visitor reviews it and sends it from their own email application. The website does not send mail, store enquiries in a database or claim successful submission. Copy and download are available when an email application is unavailable. JavaScript-disabled visitors can use the direct email and telephone links.

Three real downloadable PDFs are included: company overview, project enquiry checklist and general protection-planning guide. Technical datasheets and certificates are requested from the company rather than fabricated or linked to missing uploads.

## Update content

| Change | File |
| --- | --- |
| Company details, team, services and portfolio categories | `src/lib/data/content.ts` |
| Product imagery, application areas, FAQs and legacy route mappings | `src/lib/data/catalog.ts` |
| Solution-finder rules | `src/lib/data/solutionRules.ts` |
| Base colours, typography and layout | `src/app/globals.css` |
| Updated reference-inspired layout, responsive rules and CSS motion | `src/app/refinement.css` |
| Interactive styling, film viewer and motion preference overrides | `src/app/experience.css` |
| Global motion preference | `src/components/motion-preference.tsx` |
| Pointer-responsive image surfaces | `src/components/interactive-surface.tsx` |
| Industry image tabs | `src/components/industry-explorer.tsx` |
| Full film player and chapter timings | `src/components/film-viewer.tsx` |
| Scroll-motion lifecycle and video controls | `src/components/motion.tsx` |
| Animated disclosures and FAQs | `src/components/disclosure.tsx` |
| Product showcase | `src/components/portfolio-showcase.tsx` |
| Homepage sections | `src/components/home.tsx` |
| Enquiry fields and behaviour | `src/components/enquiry-form.tsx` |
| Enquiry validation and email composition | `src/lib/validation/enquiry.ts` |
| Images and video loops | `public/media/` |
| Downloadable documents | `public/downloads/` |
| Website information notices | `src/components/legal.tsx` |

Rebuild after source changes, then replace the hosted static files with the new `out/` contents. Use approved product data when adding commercial SKUs, specifications, warranties or test claims. The existing product detail pages describe the company’s actual portfolio categories. Eight old sample-product URLs remain available as compatible category pages and are marked noindex.

## Verification

```sh
npm test
npm run typecheck
npm run build
npm run check:export
npm audit
```

The test suite covers solution mapping, consent validation, email encoding, catalogue filtering, navigation dismissal, finder/enquiry interactions, video loading and error recovery, reduced-motion/data-saving behaviour, global pause, industry image handoffs and the film modal lifecycle. Native browser focus trapping is not simulated by jsdom. The export checker validates HTML structure, local links, asset references, anchor targets and absence of server-only routes. Both `npm run build` and `npm run check:export` fully decode every raster image using Sharp, so an existing but corrupted file cannot silently pass verification. Run `npm run check:media` to check the source images separately.

The public PDFs can be regenerated with `python3 scripts/create-resources.py` after installing Python’s `reportlab` and `Pillow`. Their embedded fonts are in `assets/fonts/`.

## Latest requested changes — revision 2.2

The user-supplied film replaces the previous architectural camera-motion animation. The visible logo was removed using `crop=1120:630:0:16` on the original 1280 × 720 footage; the full edit remains 24 fps and 10 seconds. The source upload is untouched. New hero loops have no audio; the full edit retains its audio and starts muted in the viewer. Video files are H.264/yuv420p with fast-start metadata. The full film is about 3.46 MB, desktop loop 4.53 MB and mobile loop 1.59 MB.

Four corrupted WebP assets were restored from their original images: the building cutaway, foundation membrane wall, foundation structure and membrane roll poster. Image requests carry an explicit revision query to refresh previously cached copies. The About page lists each partner’s name and the title “Designated Partner” only. The existing `membrane-motion.mp4` is unchanged. The old `architecture-motion.mp4` is no longer deployed.

For another video replacement, update `public/media/eontera-film.mp4`, both `eontera-journey` loop variants and `eontera-film-poster.webp`; adjust chapter timings in `film-viewer.tsx` if needed, then rebuild. Version the video URL or clear the host’s media cache when publishing replacement footage.

## Original project

The delivery’s `reference/original-project.zip` preserves the uploaded website unchanged. It includes the original server/admin implementation and is a reference archive, **not the deployable website**. The active source removes that runtime to satisfy the static-site requirement. See `AUDIT-AND-CHANGES.md` in the delivery for the findings and validation limits.

Architectural images and films are conceptual visuals, not documentary footage of completed EonTera projects. Font licences and image provenance are documented in the delivery’s `ASSET-CREDITS.md` and `source/assets/licenses/`.

## Revision 3 — website platform expansion

This source now includes the requested expansion without rebuilding the established Home/About/Products/Solutions/Industries/FAQ visual foundation:

- verification-first Quality and Sustainability sections
- CMS-shaped News & Media and Events collections with detail-route templates
- Careers and general application flow
- website-wide global search separate from product search
- analytics event bridge for page/product views, downloads, contact actions, quotes, expert enquiries and search usage
- trust/credibility disclosure framework that refuses unverified claims
- product comparison
- project case-study system and future detail template
- six contact enquiry types
- dedicated Request a Quote and Talk to an Expert workflows
- advanced product catalogue filters based only on currently supported data
- richer commercial product/category page structure
- searchable/filterable Resource Centre
- security header hardening and security.txt
- SEO canonicals (when final domain is configured), OG/Twitter metadata, sitemap, robots and structured data
- state/city distributor-locator architecture

See `IMPLEMENTATION-MATRIX.md`, `CONTENT-OPERATIONS.md`, `DEPLOYMENT-SECURITY.md`, `SEO-DEPLOYMENT.md` and `ANALYTICS-INTEGRATION.md`.

### Verification note for this delivery

The editing environment used for this revision cannot resolve the npm registry, and its installed Node version is 22.16.0 while this project requires Node 22.22.2+ (or the other versions declared in `package.json`). Therefore the revised source was syntax/transpile-checked but a fresh `next build` could not be executed here. Run the normal verification commands on Node 22.22.2+ before deployment.
