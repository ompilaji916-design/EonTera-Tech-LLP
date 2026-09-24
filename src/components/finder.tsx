"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import {
  PROTECTION_AREAS,
  SITUATIONS,
  PROJECT_TYPES,
  getRecommendation,
  type ProtectionArea,
  type SituationType,
  type ProjectType,
} from "@/lib/data/solutionRules";
import { Button } from "./ui";
export function Finder() {
  const [step, setStep] = useState(0);
  const [area, setArea] = useState<ProtectionArea | null>(null);
  const [situation, setSituation] = useState<SituationType | null>(null);
  const [project, setProject] = useState<ProjectType | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const mounted = useRef(false);
  useEffect(() => {
    if (mounted.current) heading.current?.focus();
    mounted.current = true;
  }, [step]);
  const options =
    step === 0 ? PROTECTION_AREAS : step === 1 ? SITUATIONS : PROJECT_TYPES;
  const rec =
    area && situation && project
      ? getRecommendation(area, situation, project)
      : null;
  function choose(value: string) {
    if (step === 0) setArea(value as ProtectionArea);
    if (step === 1) setSituation(value as SituationType);
    if (step === 2) setProject(value as ProjectType);
    setStep(step + 1);
  }
  function reset() {
    setArea(null);
    setSituation(null);
    setProject(null);
    setStep(0);
  }
  return (
    <section className="finder-section">
      <div className="finder-shell">
        <div className="finder-progress" aria-label={`Step ${step + 1} of 4`}>
          {[0, 1, 2, 3].map((n) => (
            <span className={n <= step ? "done" : ""} key={n} />
          ))}
        </div>
        {step < 3 ? (
          <div className="finder-step" key={step}>
            <p className="eyebrow">0{step + 1} / A LITTLE ABOUT YOUR PROJECT</p>
            <h2 ref={heading} tabIndex={-1}>
              {
                [
                  "What do you need to protect?",
                  "What is the current situation?",
                  "What are you building?",
                ][step]
              }
            </h2>
            <div className="finder-options">
              {options.map((o, i) => (
                <button
                  onClick={() => choose(o.value)}
                  key={o.value}
                  aria-pressed={
                    o.value ===
                    (step === 0 ? area : step === 1 ? situation : project)
                  }
                >
                  <span>0{i + 1}</span>
                  {o.label}
                  <ArrowUpRight size={19} />
                </button>
              ))}
            </div>
            {step > 0 && (
              <button className="finder-back" onClick={() => setStep(step - 1)}>
                <ArrowLeft
                  size={13}
                  style={{ display: "inline", marginRight: 10 }}
                />
                Previous question
              </button>
            )}
          </div>
        ) : (
          rec && (
            <div className="finder-step finder-result">
              <p className="eyebrow">YOUR STARTING POINT</p>
              <h2 ref={heading} tabIndex={-1}>
                {rec.solutionTitle}
              </h2>
              <p>{rec.categoryTitle}</p>
              <div className="tags">
                <span>
                  {PROTECTION_AREAS.find((a) => a.value === area)?.label}
                </span>
                <span>
                  {SITUATIONS.find((a) => a.value === situation)?.label}
                </span>
                <span>
                  {PROJECT_TYPES.find((a) => a.value === project)?.label}
                </span>
              </div>
              <p className="situation-note">{rec.situationNote}</p>
              <div className="button-row">
                <Button href={rec.solutionHref}>Explore solution</Button>
                <Button
                  variant="outline"
                  href={`/contact/?interest=${encodeURIComponent(`${rec.solutionTitle} · ${situation} · ${project}`)}`}
                >
                  Discuss my project
                </Button>
              </div>
              <button className="finder-back" onClick={() => setStep(2)}>
                ← Edit project type
              </button>
              <button
                className="finder-back"
                style={{ marginLeft: 25 }}
                onClick={reset}
              >
                Start again
              </button>
            </div>
          )
        )}
        <p className="finder-disclaimer">
          This guide helps you explore a product category. Final product
          selection and application details depend on a project assessment with
          the EonTera team.
        </p>
        <noscript>
          <p className="noscript-note">
            The interactive finder requires JavaScript. You can explore all
            application areas on our <a href="/solutions/">solutions page</a>.
          </p>
        </noscript>
      </div>
    </section>
  );
}
