import { describe, it, expect } from "vitest";
import { enquirySchema, composeEnquiry } from "./enquiry";
const valid = {
  enquiryType: "Project Enquiry",
  name: "Test Visitor",
  email: "visitor@example.com",
  company: "",
  phone: "",
  role: "",
  projectType: "Residential",
  location: "Mumbai",
  interest: "Roof & terrace",
  requirement: "Please discuss the roof protection options for this project.",
  consent: true as const,
};
describe("static enquiry flow", () => {
  it("rejects false and string consent rather than coercing it", () => {
    for (const consent of [false, "false", "true", undefined])
      expect(enquirySchema.safeParse({ ...valid, consent }).success).toBe(
        false,
      );
  });
  it("requires a real email and useful project detail", () => {
    expect(enquirySchema.safeParse({ ...valid, email: "bad" }).success).toBe(
      false,
    );
    expect(
      enquirySchema.safeParse({ ...valid, requirement: "roof" }).success,
    ).toBe(false);
  });
  it("keeps optional contact fields optional", () => {
    expect(enquirySchema.safeParse(valid).success).toBe(true);
  });
  it("encodes special characters in an email draft without adding headers", () => {
    const data = enquirySchema.parse({
      ...valid,
      name: "A & B",
      interest: "Roof\nBcc: someone@example.com",
    });
    const draft = composeEnquiry(data);
    const url = new URL(draft.mailto);
    expect(url.searchParams.get("subject")).not.toContain("\n");
    expect(url.searchParams.has("bcc")).toBe(false);
    expect(url.searchParams.get("body")).toContain("A & B");
  });
  it("includes selected project context in the draft", () => {
    const draft = composeEnquiry(enquirySchema.parse(valid));
    expect(draft.body).toContain("Project type: Residential");
    expect(draft.body).toContain("Location: Mumbai");
    expect(draft.body).toContain(valid.requirement);
  });
  it("limits oversized fields", () => {
    expect(
      enquirySchema.safeParse({ ...valid, requirement: "a".repeat(1501) })
        .success,
    ).toBe(false);
  });
});
