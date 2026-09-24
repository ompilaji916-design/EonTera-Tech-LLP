// Rules-based Solution Finder logic.
//
// This intentionally only maps to the 4 real product categories and 6
// solution pages that exist in the deck/plan — it does not recommend
// specific products or invent technical justifications. Replace
// RECOMMENDATION_COPY with EonTera-approved guidance before this drives
// real customer decisions (see plan: "no automated system should make
// unsupported structural or engineering claims").

export type ProtectionArea =
  | "basement"
  | "foundation"
  | "roof"
  | "terrace"
  | "wet-area"
  | "entire-structure";

export type SituationType =
  | "new-construction"
  | "existing-structure"
  | "leakage"
  | "dampness"
  | "crack-seepage"
  | "preventive";

export type ProjectType =
  | "residential"
  | "commercial"
  | "industrial"
  | "infrastructure"
  | "institutional";

export const PROTECTION_AREAS: { value: ProtectionArea; label: string }[] = [
  { value: "basement", label: "Basement" },
  { value: "foundation", label: "Foundation" },
  { value: "roof", label: "Roof" },
  { value: "terrace", label: "Terrace" },
  { value: "wet-area", label: "Wet Area" },
  { value: "entire-structure", label: "Entire Structure" },
];

export const SITUATIONS: { value: SituationType; label: string }[] = [
  { value: "new-construction", label: "New construction" },
  { value: "existing-structure", label: "Existing structure" },
  { value: "leakage", label: "Active leakage" },
  { value: "dampness", label: "Dampness" },
  { value: "crack-seepage", label: "Crack / seepage" },
  { value: "preventive", label: "Preventive protection" },
];

export const PROJECT_TYPES: { value: ProjectType; label: string }[] = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "institutional", label: "Institutional" },
];

interface Recommendation {
  categorySlug: string;
  categoryTitle: string;
  solutionHref: string;
  solutionTitle: string;
  reasoning: string[];
}

const AREA_TO_RECOMMENDATION: Record<ProtectionArea, Recommendation> = {
  basement: {
    categorySlug: "basement-foundation",
    categoryTitle: "Basement & Foundation Waterproofing",
    solutionHref: "/solutions#basement",
    solutionTitle: "Basement Protection",
    reasoning: [
      "Below-ground protection against soil moisture and groundwater",
      "Suitable for the application area you selected",
    ],
  },
  foundation: {
    categorySlug: "basement-foundation",
    categoryTitle: "Basement & Foundation Waterproofing",
    solutionHref: "/solutions#foundation",
    solutionTitle: "Foundation Protection",
    reasoning: [
      "Durable protection for underground structural areas",
      "Suitable for the application area you selected",
    ],
  },
  roof: {
    categorySlug: "roof-terrace-wet-area",
    categoryTitle: "Roof, Terrace & Wet-Area Protection",
    solutionHref: "/solutions#roof",
    solutionTitle: "Roof Protection",
    reasoning: [
      "Weather-resistant protection for exposed roof surfaces",
      "Suitable for the application area you selected",
    ],
  },
  terrace: {
    categorySlug: "roof-terrace-wet-area",
    categoryTitle: "Roof, Terrace & Wet-Area Protection",
    solutionHref: "/solutions#terrace",
    solutionTitle: "Terrace Protection",
    reasoning: [
      "Application-efficient system to prevent recurring terrace leakage",
      "Suitable for the application area you selected",
    ],
  },
  "wet-area": {
    categorySlug: "roof-terrace-wet-area",
    categoryTitle: "Roof, Terrace & Wet-Area Protection",
    solutionHref: "/solutions#wet-area",
    solutionTitle: "Wet-Area Protection",
    reasoning: [
      "Waterproofing for consistently wet interior areas",
      "Suitable for the application area you selected",
    ],
  },
  "entire-structure": {
    categorySlug: "polymer-membranes",
    categoryTitle: "All four EonTera product categories",
    solutionHref: "/solutions#complete",
    solutionTitle: "Complete Building Protection",
    reasoning: [
      "An integrated system covering every structural layer, foundation to terrace",
      "Combines multiple product categories rather than one",
    ],
  },
};

const SITUATION_NOTE: Record<SituationType, string> = {
  "new-construction":
    "Since this is new construction, application can be planned in at the build stage rather than retrofitted.",
  "existing-structure":
    "Since this is an existing structure, look at retrofit-suitable systems and surface diagnosis first.",
  leakage:
    "Active leakage should be assessed before product selection — surface diagnosis matters more than product choice here.",
  dampness:
    "Persistent dampness often points to a moisture-control system rather than a one-time patch.",
  "crack-seepage":
    "Crack or seepage issues typically need surface/crack treatment as part of the application method, not just a coating.",
  preventive:
    "Preventive protection gives more flexibility on system choice since there's no active damage to work around.",
};

export function getRecommendation(
  area: ProtectionArea,
  situation: SituationType,
  projectType: ProjectType,
) {
  const base = AREA_TO_RECOMMENDATION[area];
  return {
    ...base,
    situationNote: SITUATION_NOTE[situation],
    projectType,
  };
}
