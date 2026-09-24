"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Copy, Download } from "lucide-react";
import { composeEnquiry, enquirySchema } from "@/lib/validation/enquiry";
import { CONTACT_INTEREST_OPTIONS } from "@/lib/data/content";
import { track } from "@/lib/analytics";
export function EnquiryForm() {
  const [interest, setInterest] = useState("");
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<ReturnType<typeof composeEnquiry> | null>(
    null,
  );
  const [copied, setCopied] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    setInterest(
      new URLSearchParams(window.location.search)
        .get("interest")
        ?.slice(0, 180) || "",
    );
  }, []);
  useEffect(() => {
    if (draft) result.current?.focus();
  }, [draft]);
  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCopied("");
    const f = new FormData(e.currentTarget);
    const parsed = enquirySchema.safeParse({
      ...Object.fromEntries(f),
      consent: f.get("consent") === "on",
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      setDraft(null);
      return;
    }
    setError("");
    setDraft(composeEnquiry(parsed.data));
    track("contact_click", { enquiry_type: parsed.data.enquiryType, interest: parsed.data.interest });
  }
  async function copy() {
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(
        `Subject: ${draft.subject}\n\n${draft.body}`,
      );
      setCopied("Copied. Paste the draft into your preferred email app.");
    } catch {
      setCopied("Please select and copy the draft text below.");
    }
  }
  function download() {
    if (!draft) return;
    const url = URL.createObjectURL(
      new Blob(
        [
          `To: doshijesika73@gmail.com\nSubject: ${draft.subject}\n\n${draft.body}`,
        ],
        { type: "text/plain;charset=utf-8" },
      ),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "EonTera-project-enquiry.txt";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <form
      className="enquiry-form"
      onSubmit={submit}
      onChange={() => {
        if (draft) setDraft(null);
      }}
    >
      <h2>Tell us about your project.</h2>
      <p>
        Prepare an enquiry, review it, then send it through your email app.
        Fields marked * are required.
      </p>
      <div className="form-grid">
        <label className="field field-full">
          <span>Enquiry type *</span>
          <select name="enquiryType" defaultValue="General Enquiry" required>
            {["General Enquiry","Sales Enquiry","Technical Support","Distributor Enquiry","Career Enquiry","Project Enquiry"].map((x) => <option key={x}>{x}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Full name *</span>
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Your name"
          />
        </label>
        <label className="field">
          <span>Email address *</span>
          <input
            name="email"
            autoComplete="email"
            type="email"
            required
            maxLength={200}
            placeholder="you@company.com"
          />
        </label>
        <label className="field">
          <span>Phone number</span>
          <input
            name="phone"
            autoComplete="tel"
            type="tel"
            maxLength={40}
            placeholder="+91"
          />
        </label>
        <label className="field">
          <span>Company</span>
          <input
            name="company"
            autoComplete="organization"
            maxLength={160}
            placeholder="Company name"
          />
        </label>
        <label className="field">
          <span>I am a</span>
          <select name="role" defaultValue="">
            <option value="">Select your role</option>
            {CONTACT_INTEREST_OPTIONS.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Project type</span>
          <select name="projectType" defaultValue="">
            <option value="">Select project type</option>
            {[
              "Residential",
              "Commercial",
              "Infrastructure",
              "Industrial",
              "Institutional",
              "Other",
            ].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Project location</span>
          <input
            name="location"
            autoComplete="address-level2"
            maxLength={160}
            placeholder="City / region"
          />
        </label>
        <label className="field">
          <span>Interested in</span>
          <input
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            maxLength={180}
            placeholder="e.g. Basement protection"
          />
        </label>
        <label className="field field-full">
          <span>Project details *</span>
          <textarea
            name="requirement"
            required
            minLength={10}
            maxLength={1500}
            placeholder="Application area, current condition, approximate size and timeline…"
          />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to share these details with EonTera so the team can respond to
          my enquiry. Read the{" "}
          <Link href="/privacy-policy/">privacy notice</Link>.
        </span>
      </label>
      {error && (
        <p className="form-error" role="alert" ref={errorRef} tabIndex={-1}>
          {error}
        </p>
      )}
      <button type="submit" className="button">
        Prepare enquiry
        <ArrowUpRight size={17} />
      </button>
      {draft && (
        <div className="enquiry-result" ref={result} tabIndex={-1}>
          <h3>Your email draft is ready.</h3>
          <p>
            Review the details below. Your enquiry is sent only when you send it
            from your email app.
          </p>
          <a href={draft.mailto} className="button">
            Open email app
            <ArrowUpRight size={16} />
          </a>
          <details>
            <summary className="text-button">Review your draft</summary>
            <pre>{draft.body}</pre>
          </details>
          <button className="text-button" type="button" onClick={copy}>
            <Copy size={12} style={{ display: "inline", marginRight: 7 }} />
            Copy enquiry
          </button>
          <button className="text-button" type="button" onClick={download}>
            <Download size={12} style={{ display: "inline", marginRight: 7 }} />
            Download enquiry
          </button>
          <p role="status">{copied}</p>
        </div>
      )}
      <noscript>
        <style>{`.enquiry-form .form-grid,.enquiry-form .consent,.enquiry-form>button{display:none}`}</style>
        <p className="noscript-note">
          To make an enquiry, email{" "}
          <a href="mailto:doshijesika73@gmail.com">doshijesika73@gmail.com</a>{" "}
          or call +91 98673 42253. The draft builder requires JavaScript.
        </p>
      </noscript>
    </form>
  );
}
