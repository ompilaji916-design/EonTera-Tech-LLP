import { ShieldCheck } from "lucide-react";

export function VerificationGrid({ items }: { items: Array<{ title: string }> }) {
  return <div className="verification-grid">
    {items.map((item, i) => <article className="verification-card reveal" key={item.title}>
      <span className="verification-index">0{i + 1}</span>
      <ShieldCheck size={24}/>
      <h3>{item.title}</h3>
      <p>Approved EonTera documentation and claims for this topic will be published only after verification.</p>
      <span className="verification-status">Awaiting approved data</span>
    </article>)}
  </div>;
}
