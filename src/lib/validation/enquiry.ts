import { z } from "zod";
import { COMPANY } from "@/lib/data/content";
const text = (max: number) => z.string().trim().max(max).transform((s) => s.replace(/[\r\n]+/g, " "));
export const enquirySchema = z.object({
  enquiryType: text(80).refine((s) => s.length > 0, "Please select an enquiry type."),
  name: text(120).refine((s) => s.length > 0, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address.").max(200),
  company: text(160), phone: text(40), role: text(100), projectType: text(100), location: text(160), interest: text(180),
  requirement: z.string().trim().min(10,"Please add a little more detail about your project (at least 10 characters).").max(1500,"Please keep your project details under 1,500 characters."),
  consent: z.literal(true,{ errorMap:()=>({message:"Please confirm you want to share these details with EonTera."}) }),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export function composeEnquiry(data: Enquiry) {
  const subject = `${data.enquiryType} — ${data.interest || data.projectType || "EonTera website"}`;
  const lines = ["Hello EonTera team,","",data.requirement,"",`Enquiry type: ${data.enquiryType}`,`Name: ${data.name}`,`Email: ${data.email}`,`Phone: ${data.phone || "Not provided"}`,`Company: ${data.company || "Not provided"}`,`Role: ${data.role || "Not provided"}`,`Project type: ${data.projectType || "Not provided"}`,`Location: ${data.location || "Not provided"}`,`Interest: ${data.interest || "General enquiry"}`,"","I agree to share these details with EonTera to respond to this enquiry."];
  const body=lines.join("\n");
  return { subject, body, mailto:`mailto:${COMPANY.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}` };
}
