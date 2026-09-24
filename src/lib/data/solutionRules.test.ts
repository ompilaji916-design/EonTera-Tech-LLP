import { describe, it, expect } from "vitest";
import { getRecommendation } from "./solutionRules";

describe("getRecommendation", () => {
  it("maps basement to the Basement & Foundation category", () => {
    const rec = getRecommendation(
      "basement",
      "existing-structure",
      "residential",
    );
    expect(rec.categorySlug).toBe("basement-foundation");
    expect(rec.solutionTitle).toBe("Basement Protection");
  });

  it("maps roof to the Roof/Terrace/Wet-Area category", () => {
    const rec = getRecommendation("roof", "new-construction", "commercial");
    expect(rec.categorySlug).toBe("roof-terrace-wet-area");
    expect(rec.solutionTitle).toBe("Roof Protection");
  });

  it("maps terrace to the Roof/Terrace/Wet-Area category, Terrace solution", () => {
    const rec = getRecommendation("terrace", "leakage", "residential");
    expect(rec.solutionTitle).toBe("Terrace Protection");
  });

  it("maps wet-area to the Wet-Area solution", () => {
    const rec = getRecommendation("wet-area", "dampness", "residential");
    expect(rec.solutionTitle).toBe("Wet-Area Protection");
  });

  it("maps entire-structure to Complete Building Protection", () => {
    const rec = getRecommendation(
      "entire-structure",
      "preventive",
      "institutional",
    );
    expect(rec.solutionTitle).toBe("Complete Building Protection");
    expect(rec.solutionHref).toBe("/solutions#complete");
  });

  it("always includes a situation note and reasoning bullets", () => {
    const rec = getRecommendation("foundation", "crack-seepage", "industrial");
    expect(rec.situationNote).toBeTruthy();
    expect(rec.reasoning.length).toBeGreaterThan(0);
  });
});
