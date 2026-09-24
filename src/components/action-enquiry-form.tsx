"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Paperclip } from "lucide-react";
import { COMPANY } from "@/lib/data/content";
import { track } from "@/lib/analytics";

type Mode = "quote" | "expert" | "career";

const config = {
  quote: {
    title: "Request a quote",
    intro: "Share the project context needed for a commercial discussion. Review the generated email before sending it.",
    subject: "Request a Quote",
    event: "quote_request" as const,
  },
  expert: {
    title: "Talk to an expert",
    intro: "Describe the application or problem so the EonTera team can prepare for a technical conversation.",
    subject: "Talk to an Expert",
    event: "expert_enquiry" as const,
  },
  career: {
    title: "Career enquiry",
    intro: "Use this route for a general career or internship enquiry. Published openings are listed separately when approved.",
    subject: "Career Enquiry",
    event: "contact_click" as const,
  },
};

function value(f: FormData, key: string) { return String(f.get(key) || "").trim(); }

export function ActionEnquiryForm({ mode }: { mode: Mode }) {
  const [product, setProduct] = useState("");
  useEffect(() => { const p = new URLSearchParams(window.location.search).get("product"); if (p) setProduct(p.slice(0, 180)); }, []);
  const [draft, setDraft] = useState<{ subject: string; body: string; mailto: string } | null>(null);
  const [error, setError] = useState("");
  const c = config[mode];
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = value(f, "name"), email = value(f, "email"), phone = value(f, "phone"), location = value(f, "location"), requirement = value(f, "requirement");
    if (!name || !email.includes("@") || !phone || !location || requirement.length < 10) {
      setError("Please complete the required fields and add at least 10 characters of requirement detail.");
      return;
    }
    const attachment = f.get("attachment") as File | null;
    const subject = `${c.subject} — ${value(f, "company") || name}`.replace(/[\r\n]+/g, " ").slice(0, 180);
    const lines = [
      `Hello EonTera team,`, "", requirement, "",
      `Name: ${name}`,
      `Company: ${value(f, "company") || "Not provided"}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Location: ${location}`,
      `Product / solution: ${value(f, "product") || "Not provided"}`,
      `Project type: ${value(f, "projectType") || "Not provided"}`,
      `Quantity: ${value(f, "quantity") || "Not provided"}`,
      `Preferred contact method: ${value(f, "contactMethod") || "Not provided"}`,
      `Application / problem: ${value(f, "problem") || "Not provided"}`,
      `Attachment selected: ${attachment?.name || "None"}`,
      "",
      attachment?.name ? "Please note: this static website cannot attach files to an email draft. I will attach the selected file manually before sending." : "",
    ].filter(Boolean);
    const body = lines.join("\n");
    setError("");
    setDraft({ subject, body, mailto: `mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` });
    track(c.event, { mode, project_type: value(f, "projectType"), location });
  }
  return <form className="enquiry-form action-enquiry" onSubmit={submit} onChange={() => draft && setDraft(null)}>
    <h2>{c.title}</h2><p>{c.intro} Fields marked * are required.</p>
    <div className="form-grid">
      <label className="field"><span>Name *</span><input name="name" required maxLength={120} autoComplete="name" /></label>
      <label className="field"><span>Company</span><input name="company" maxLength={160} autoComplete="organization" /></label>
      <label className="field"><span>Email *</span><input name="email" type="email" required maxLength={200} autoComplete="email" /></label>
      <label className="field"><span>Phone *</span><input name="phone" type="tel" required maxLength={40} autoComplete="tel" /></label>
      <label className="field"><span>Location *</span><input name="location" required maxLength={160} autoComplete="address-level2" /></label>
      {mode !== "career" && <label className="field"><span>Product / solution</span><input name="product" maxLength={180} value={product} onChange={(e) => setProduct(e.target.value)} /></label>}
      {mode !== "career" && <label className="field"><span>Project type</span><select name="projectType" defaultValue=""><option value="">Select</option>{["Residential","Commercial","Infrastructure","Industrial","Institutional","Other"].map((x) => <option key={x}>{x}</option>)}</select></label>}
      {mode === "quote" && <label className="field"><span>Quantity / project scale</span><input name="quantity" maxLength={120} placeholder="If known" /></label>}
      {mode === "expert" && <label className="field"><span>Preferred contact method</span><select name="contactMethod" defaultValue="Phone"><option>Phone</option><option>Email</option></select></label>}
      {mode === "expert" && <label className="field field-full"><span>Problem / application</span><input name="problem" maxLength={240} placeholder="e.g. basement seepage, terrace protection" /></label>}
      <label className="field field-full"><span>{mode === "career" ? "Career / internship requirement" : "Requirement"} *</span><textarea name="requirement" required minLength={10} maxLength={1800} /></label>
      {mode === "quote" && <label className="field field-full file-field"><span><Paperclip size={14}/> Optional project attachment</span><input name="attachment" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"/><small>The selected filename is added to the draft. Attach the file manually in your email app; the static site does not upload it.</small></label>}
    </div>
    <label className="consent"><input type="checkbox" required/><span>I agree to share these details with EonTera for this enquiry. Read the <Link href="/privacy-policy/">privacy notice</Link>.</span></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button" type="submit">Prepare enquiry <ArrowUpRight size={17}/></button>
    {draft && <div className="enquiry-result" tabIndex={-1}><h3>Your email draft is ready.</h3><p>Review it, then send it from your email app.</p><a className="button" href={draft.mailto}>Open email app <ArrowUpRight size={16}/></a><details><summary className="text-button">Review draft</summary><pre>{draft.body}</pre></details></div>}
  </form>;
}
