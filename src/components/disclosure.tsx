"use client";
import { useId, useState, type ReactNode } from "react";

/** Closed panels leave the keyboard and accessibility tree immediately. */
export function Collapse({ open, id, children }: { open: boolean; id: string; children: ReactNode }) {
  // React 18 serializes this standard boolean HTML attribute as an empty string.
  const inactive: Record<string, string> = open ? {} : { inert: "" };
  return (
    <div id={id} className={`disclosure-panel ${open ? "is-open" : ""}`} aria-hidden={!open} {...inactive}>
      <div className="disclosure-clip">{children}</div>
    </div>
  );
}

export function Faq({ items }: { items: string[][] }) {
  const prefix = useId();
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  return (
    <div className="faq-list">
      {items.map(([question, answer], index) => {
        const open = expanded.has(index);
        const id = `${prefix}-faq-${index}`;
        return (
          <div className="faq-item reveal" key={question}>
            <h3>
              <button className="faq-trigger" aria-expanded={open} aria-controls={id} onClick={() => setExpanded(previous => {
                const next = new Set(previous);
                if (next.has(index)) next.delete(index); else next.add(index);
                return next;
              })}>
                <span className="faq-number">0{index + 1}</span>
                {question}
                <span className="faq-plus" aria-hidden="true">+</span>
              </button>
            </h3>
            <Collapse open={open} id={id}><p className="faq-answer">{answer}</p></Collapse>
          </div>
        );
      })}
    </div>
  );
}
