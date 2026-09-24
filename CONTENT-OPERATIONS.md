# Content operations: verification-first publishing

The expanded website deliberately separates **capability** from **claims**. The following collections are ready but intentionally empty because the supplied source package does not verify entries:

- News/media: `src/lib/data/platform.ts` → `NEWS_RECORDS`
- Events: `EVENT_RECORDS`
- Careers/openings: `CAREER_OPENINGS`
- Distributors: `DISTRIBUTORS`
- Project case studies: `PROJECT_CASE_STUDIES`

Quality, sustainability and trust/credibility sections also avoid claiming certifications, laboratories, test programmes, awards, memberships, major projects, clients, testimonials, years of experience or facilities without approved source material.

## Commercial product data

The current source confirms four portfolio categories, not a verified SKU catalogue. Product/category pages therefore render the known description, applications and portfolio focus while explicitly requesting approved values for surface compatibility, coverage, packaging, technical properties and application methods.

When verified product records become available, add fields for:

- product name and approved product image
- description and benefits
- applications and suitable surfaces
- technical information and application method
- packaging and coverage
- technical datasheet / brochure
- certificates and test reports
- SDS/MSDS where applicable
- product FAQs and related products

## CMS migration

The data interfaces in `src/lib/data/platform.ts` are intentionally CMS-shaped. They can be moved to a headless CMS later without changing the page information architecture. Preserve the same verification rule: a record should not become public merely because a field exists in the CMS.
