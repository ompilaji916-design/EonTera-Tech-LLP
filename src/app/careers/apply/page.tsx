import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui";
import { ActionEnquiryForm } from "@/components/action-enquiry-form";
export const metadata = pageMetadata("Apply / Career enquiry", "Submit a career or internship enquiry to EonTera Tech LLP.", "/careers/apply/");
export default function Page(){return <><PageHero eyebrow="CAREERS / APPLY" title={<>Start a career<br/><em>conversation.</em></>} text="Use this route for a general career or internship enquiry. If a role is published, mention its title in your message."/><section className="section"><div className="container narrow-form"><ActionEnquiryForm mode="career"/></div></section></>}
