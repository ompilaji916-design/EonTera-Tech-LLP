# EonTera production security deployment checklist

The source is a static Next.js export. Some security controls are delivered in the website files; infrastructure controls must be enabled at the hosting/CDN layer.

## Included in this package

- Security headers in `public/_headers` and Apache equivalents in `public/.htaccess`.
- HSTS for HTTPS deployments.
- CSP, clickjacking protection, MIME-sniffing protection, referrer policy, permissions policy, COOP and DNS-prefetch policy.
- `/.well-known/security.txt` using the verified company contact email.
- Client-side form validation plus explicit consent. Current enquiry flows generate mail drafts; they do not pretend to submit to a server.
- No embedded secret keys, admin accounts or database credentials.

## Hosting / Cloudflare work still required

These cannot be achieved by adding files to a ZIP and must be configured after the final domain and host are known:

1. Force HTTPS and redirect HTTP to HTTPS before enabling HSTS permanently.
2. Put the site behind Cloudflare or an equivalent CDN.
3. Enable managed WAF rules and DDoS protection.
4. Configure rate limiting for any future API/form endpoint; the present static mail-draft flow has no server endpoint to rate-limit.
5. Enable bot/spam controls on any future server-side enquiry endpoint.
6. Keep dependency scanning active (`npm audit`) and schedule framework/package updates.
7. Enable hosting/CDN security and availability monitoring.
8. Review CSP whenever third-party analytics, maps, chat or embedded media are introduced; do not weaken it globally just to make an integration work.

## Backend introduction

If a backend is later added for CMS, file uploads, enquiries or analytics ingestion, use server-side schema validation, CSRF protection where cookies are used, upload type/size controls, malware scanning for attachments, request-rate limits, audit logging, secret management and least-privilege storage credentials.
