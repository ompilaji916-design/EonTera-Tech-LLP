# Production SEO checklist

The source now includes:

- unique titles and meta descriptions for core and newly added routes
- conditional canonical URLs and page-specific Open Graph/Twitter metadata via `src/lib/seo.ts`
- XML sitemap entries for all public sections, product categories and verified project case studies
- `robots.txt`
- Organization structured data with verified EonTera contact/address information
- WebSite + SearchAction structured data when the final site URL is configured
- FAQPage structured data in the Resource Centre
- BreadcrumbList structured data on product and project detail pages
- product/category SEO titles and descriptions
- local address data in Organization schema

## Required before production indexing

Set the final HTTPS origin before building:

```bash
NEXT_PUBLIC_SITE_URL=https://www.example.com
```

Use the real EonTera domain; do not use the example value above in production. The environment variable enables absolute canonical URLs, sitemap URLs, Open Graph URLs and WebSite search structured data.

## Search Console

Google Search Console cannot be truthfully preconfigured without access to the final domain/property. After deployment:

1. Add the production domain/property in Search Console.
2. Complete DNS or HTML verification using the token Google provides.
3. Submit `/sitemap.xml`.
4. Inspect representative Home, Products, Product detail, Resources, Contact, Quality and News pages.
5. Monitor indexing, Core Web Vitals and structured-data reports.

Do not add a fabricated Search Console verification token to the source.
