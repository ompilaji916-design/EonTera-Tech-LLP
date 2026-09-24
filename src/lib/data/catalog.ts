import { PRODUCT_CATEGORIES } from "./content";

export const CATALOG = PRODUCT_CATEGORIES.map((category, index) => ({
  ...category,
  shortTitle: [
    "Polymer membranes",
    "Basement & foundation",
    "Roof, terrace & wet areas",
    "Manufactured membrane sheets",
  ][index],
  image: [
    "membrane",
    "aerial-foundation-membrane",
    "rooftop-membrane-terrace",
    "product-membrane-roll",
  ][index],
  imageAlt: [
    "Illustration of a polymer membrane roll with water droplets",
    "Illustration of foundation walls protected by a green membrane",
    "Illustration of a waterproofed roof terrace",
    "Illustration of manufactured green membrane rolls",
  ][index],
  applications: [
    ["Surface protection", "Moisture control", "Project-specific applications"],
    ["Basements", "Foundations", "Below-ground structural areas"],
    ["Exposed roofs", "Terraces", "Bathrooms and wet areas"],
    [
      "Membrane manufacturing",
      "Application-specific variants",
      "Private-label partnerships",
    ],
  ][index],
  productType: ["Polymer membrane", "Below-ground waterproofing system", "Above-ground waterproofing system", "Manufactured membrane sheet"][index],
  solutions: [
    ["Surface protection", "Moisture control"],
    ["Basement protection", "Foundation protection"],
    ["Roof protection", "Terrace protection", "Wet-area protection"],
    ["Membrane manufacturing", "Private-label supply"],
  ][index],
}));

// Keep incoming links from the supplied website working without presenting invented SKUs.
export const LEGACY_PRODUCT_ROUTES: Record<string, string> = {
  "flexcoat-liquid-membrane": "polymer-membranes",
  "polyshield-elastomeric": "polymer-membranes",
  "basegrip-foundation-system": "basement-foundation",
  "deepguard-basement-membrane": "basement-foundation",
  "terraseal-roof-system": "roof-terrace-wet-area",
  "terraflex-terrace-protection": "roof-terrace-wet-area",
  "wetcore-wet-area-system": "roof-terrace-wet-area",
  "sheetform-membrane-sheet": "membrane-sheet-manufacturing",
};

export const AREAS = [
  {
    id: "basement",
    number: "01",
    title: "Basement",
    image: "panel-01-basement-parking",
    description:
      "Protection begins below the surface. Plan moisture control for underground spaces exposed to soil moisture and groundwater.",
    category: "basement-foundation",
    point: [54, 82],
  },
  {
    id: "foundation",
    number: "02",
    title: "Foundation",
    image: "aerial-foundation-membrane",
    description:
      "Build protection into the first layer. Explore membrane systems for foundations and below-ground structural areas.",
    category: "basement-foundation",
    point: [77, 74],
  },
  {
    id: "wet-area",
    number: "03",
    title: "Wet areas",
    image: "panel-03-building-interior",
    description:
      "Give water-intensive spaces the attention they need. Coordinate waterproofing around floors, junctions and service penetrations.",
    category: "roof-terrace-wet-area",
    point: [71, 50],
  },
  {
    id: "roof",
    number: "04",
    title: "Roof & terrace",
    image: "panel-04-rooftop-terrace",
    description:
      "Complete the envelope at the top. Explore membrane protection for exposed roofs, terraces and changing weather conditions.",
    category: "roof-terrace-wet-area",
    point: [66, 29],
  },
];

export const FAQS = [
  [
    "What does EonTera Tech do?",
    "EonTera Tech LLP develops polymer-based waterproofing membranes and manufactured membrane sheets, with a portfolio focused on protection from basement to terrace.",
  ],
  [
    "How do I choose a waterproofing system?",
    "Start with the application area, current surface condition and project type. Our solution finder helps you explore a relevant category; the team can then discuss your project before a product is specified.",
  ],
  [
    "Can you support contractors and applicators?",
    "The company’s service approach includes project assessment, product selection, surface-preparation guidance and contractor coordination. Contact the team with your location and requirements.",
  ],
  [
    "Are private-label partnerships available?",
    "EonTera welcomes enquiries about manufacturing, private-label supply, distribution and joint-venture partnerships. Scope and availability are discussed directly with the team.",
  ],
  [
    "Where can I get technical datasheets?",
    "Request the current approved datasheet for your application directly from the team. Coverage, thickness, installation method and performance data must be confirmed for the selected product.",
  ],
];
