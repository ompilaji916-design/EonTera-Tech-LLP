import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui";
import { ActionEnquiryForm } from "@/components/action-enquiry-form";
export const metadata = pageMetadata("Talk to an Expert", "Send EonTera a structured technical enquiry about a waterproofing application or project problem.", "/talk-to-expert/");
export default function Page(){return <><PageHero eyebrow="TALK TO AN EXPERT" title={<>Bring the problem.<br/><em>Start with context.</em></>} text="A dedicated technical-enquiry path for location, project type, application, problem and preferred contact method."/><section className="section"><div className="container narrow-form"><ActionEnquiryForm mode="expert"/></div></section></>}
