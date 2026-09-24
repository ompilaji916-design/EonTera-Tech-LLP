import { PageHero } from "./ui";
import { COMPANY } from "@/lib/data/content";
type LegalSection = { title: string; body: string };
const pages: Record<
  string,
  { title: string; intro: string; sections: LegalSection[] }
> = {
  privacy: {
    title: "Privacy notice",
    intro: "How this website handles information you choose to share.",
    sections: [
      {
        title: "Information in your enquiry",
        body: "The enquiry form helps prepare an email using the details you enter. The website does not submit those details to a website database. They are shared with EonTera only when you send the prepared message through your email app.",
      },
      {
        title: "How your message is used",
        body: "Information you send by email or share by phone is intended to help EonTera respond to your project, product or partnership enquiry. Do not include sensitive personal information that is unrelated to that enquiry.",
      },
      {
        title: "Website storage and services",
        body: "This website does not include advertising trackers or analytics scripts. It does not intentionally store your enquiry in browser storage. Your hosting provider may maintain routine access logs. Your email provider handles email messages under its own policies.",
      },
      {
        title: "Questions about information you have shared",
        body: "Contact EonTera using the details below if you have a question about a message you sent, or want to request a correction or deletion. The team can discuss what is applicable to your request.",
      },
    ],
  },
  terms: {
    title: "Website terms",
    intro: "Information to help you use the EonTera website.",
    sections: [
      {
        title: "General information",
        body: "This website introduces EonTera Tech LLP, its product categories and its service approach. Website descriptions, illustrations and planning resources are general information and do not form a quotation, contract or product warranty.",
      },
      {
        title: "Product and application decisions",
        body: "Confirm product availability, technical specifications, compatibility and installation requirements directly with EonTera before making a specification or purchase decision. The solution finder points to an application category and does not replace a project assessment.",
      },
      {
        title: "Materials and intellectual property",
        body: "Company content and visual materials are provided for browsing and project discussions. Downloadable planning documents may be used to prepare an enquiry. Contact the company about other reproduction or commercial reuse.",
      },
      {
        title: "Contacting the company",
        body: "An enquiry drafted on the website is not sent until you send it through your email application. A discussion, order or agreement may be subject to separate written terms confirmed by the company.",
      },
    ],
  },
  cookies: {
    title: "Cookies & local storage",
    intro: "A straightforward approach to your visit.",
    sections: [
      {
        title: "No optional tracking cookies",
        body: "The supplied website does not include analytics, advertising pixels or optional tracking cookies. Its navigation, product filters and solution finder run in your browser without storing a profile of your activity.",
      },
      {
        title: "Form and animation preferences",
        body: "Enquiry details remain in the current form while you use it and are not intentionally saved to local storage. Visual animations respect your device’s reduced-motion preference. Video playback also considers supported data-saving preferences.",
      },
      {
        title: "Hosting and external applications",
        body: "A hosting provider may add its own infrastructure behaviour. Opening an email or phone link uses an application outside this website; that application’s own settings and policies apply.",
      },
    ],
  },
  disclaimer: {
    title: "Information disclaimer",
    intro: "The scope of the information and visuals on this website.",
    sections: [
      {
        title: "Portfolio descriptions",
        body: "Product pages describe categories within EonTera’s waterproofing portfolio. Current commercial products, availability, specifications, coverage, packaging and performance information should be requested directly from the team.",
      },
      {
        title: "Illustrative visuals",
        body: "Architectural images, material studies and animated visual loops are conceptual illustrations. They do not represent verified completed EonTera projects, product test results or a specified installation detail.",
      },
      {
        title: "Planning guidance",
        body: "Resources and solution-finder results help structure an initial conversation. They are not technical installation instructions, structural engineering advice or a guarantee of suitability. Ask the project’s qualified professionals and the EonTera team to confirm the appropriate system.",
      },
    ],
  },
};
export function Legal({ type }: { type: string }) {
  const p = pages[type];
  return (
    <>
      <PageHero
        eyebrow="EONTERA / WEBSITE INFORMATION"
        title={p.title}
        text={p.intro}
      />
      <section className="section">
        <div className="container legal-copy">
          <p className="legal-status">Website information — September 2026</p>
          {p.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p style={{ fontSize: 13, lineHeight: 1.95, marginTop: 17 }}>
                {s.body}
              </p>
            </section>
          ))}
          <h2>Get in touch</h2>
          <p>
            {COMPANY.name}
            <br />
            {COMPANY.address}
            <br />
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <br />
            <a href="tel:+919867342253">{COMPANY.phone}</a>
          </p>
        </div>
      </section>
    </>
  );
}
