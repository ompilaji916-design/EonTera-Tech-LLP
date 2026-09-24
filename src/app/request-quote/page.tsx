import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/ui";
import { ActionEnquiryForm } from "@/components/action-enquiry-form";
export const metadata = pageMetadata("Request a Quote", "Request a commercial quote from EonTera with project, product, quantity and location details.", "/request-quote/");
export default function Page(){return <><PageHero eyebrow="REQUEST A QUOTE" title={<>Turn a requirement<br/><em>into a brief.</em></>} text="A dedicated quote workflow for product, solution, project type, quantity and optional project-file context."/><section className="section"><div className="container narrow-form"><ActionEnquiryForm mode="quote"/></div></section></>}
