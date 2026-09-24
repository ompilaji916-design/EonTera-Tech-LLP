# Analytics integration

`src/components/analytics.tsx` and `src/lib/analytics.ts` emit privacy-neutral website events into `window.dataLayer` and as `eontera:analytics` browser events. No third-party analytics provider is hard-coded.

Events included:

- `eontera_page_view`
- `eontera_product_view`
- `eontera_download`
- `eontera_resource_download`
- `eontera_contact_click`
- `eontera_phone_click`
- `eontera_email_click`
- `eontera_quote_request`
- `eontera_expert_enquiry`
- `eontera_search_usage`

Connect GTM/GA4, Matomo or another approved analytics platform at deployment time. Visitor counts should be computed by that platform under the company’s consent/privacy configuration rather than by inventing a client identifier in the site code.
