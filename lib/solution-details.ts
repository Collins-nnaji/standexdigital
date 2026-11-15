import { biSolutions, type BISolution } from "./bi-solutions";
import { digitalGrowthServices, type DigitalGrowthService } from "./digital-growth-services";
import {
  ai_capabilityAreas,
  ai_deliveryStages,
  ai_outcomeCards,
  ai_useCases,
  dg_engagements,
  dg_faqs,
  dg_model,
  dg_ninetyDays,
  dg_symptoms,
} from "./solution-source";

type Pair = { title: string; text: string };

export type Part = {
  name: string;
  eyebrow?: string;
  promise: string;
  intro?: string;
  image?: string;
  challengesTitle?: string;
  challenges?: Pair[];
  capabilitiesTitle?: string;
  capabilities?: Pair[];
  spotlight?: NonNullable<BISolution["spotlight"]>;
  products?: BISolution["products"];
  useCases?: { team: string; examples: string[] }[];
  outcomes?: string[];
  metrics?: { label: string; value: string; note: string }[];
  deliverables?: Pair[];
  process?: { title: string; text: string; duration?: string }[];
  engagements?: { name: string; tag: string; text: string; items: string[]; featured?: boolean }[];
  integrations?: string[];
  governance?: string[];
  idealFor?: string[];
  tools?: string[];
  faqs?: { q: string; a: string }[];
};

export type GroupDetail = { id: string; parts: Part[] };

const bi = (slug: BISolution["slug"], name: string): Part => {
  const s = biSolutions.find((x) => x.slug === slug)!;
  return {
    name,
    eyebrow: s.eyebrow,
    promise: s.promise,
    intro: s.intro,
    image: s.image,
    challenges: s.challenges,
    capabilities: s.capabilities,
    spotlight: s.spotlight,
    products: s.products,
    useCases: s.useCases,
    outcomes: s.outcomes,
    deliverables: s.deliverables,
    process: s.process,
    engagements: s.engagements,
    integrations: s.integrations,
    governance: s.governance,
    faqs: s.faqs,
  };
};

const dg = (s: DigitalGrowthService): Part => ({
  name: s.shortTitle,
  eyebrow: s.eyebrow,
  promise: s.promise,
  intro: s.intro,
  image: s.image,
  challenges: s.challenges,
  outcomes: s.outcomes,
  metrics: s.metrics,
  deliverables: s.deliverables,
  process: s.process,
  idealFor: s.idealFor,
  tools: s.tools,
  faqs: s.faqs,
});

const aiSystems: Part = {
  name: "AI Systems & Agents",
  eyebrow: "Enterprise Artificial Intelligence",
  promise: "Practical AI for organisations that need more than a chatbot: grounded assistants, autonomous workflows and multi-agent orchestration.",
  intro:
    "We design and deploy practical AI systems that fit operational reality, from grounded assistants and autonomous workflows to multi-agent orchestration and secure enterprise integrations.",
  capabilitiesTitle: "Capability areas",
  capabilities: ai_capabilityAreas.map((c) => ({ title: c.title, text: c.description })),
  useCases: [{ team: "Where it is used", examples: ai_useCases }],
  outcomes: ai_outcomeCards,
  process: ai_deliveryStages.map((d) => ({ title: d.title, text: d.description, duration: `Stage ${d.step}` })),
  governance: [
    "Permission-aware design, data boundaries, review checkpoints and model access controls",
    "Evaluation built in: scenario testing, trace inspection, output validation",
    "Enterprise integration across Microsoft, cloud APIs, databases, documents and internal tools",
  ],
  integrations: ["Docs", "SQL", "APIs", "CRM", "ERP", "SharePoint", "Dataverse"],
};

const howWeWork: Part = {
  name: "How we work",
  eyebrow: "Partnership model",
  promise: "One team owns the whole growth system: strategy, channels and measurement on a single roadmap.",
  challengesTitle: "Sound familiar?",
  challenges: dg_symptoms,
  capabilitiesTitle: "The growth model",
  capabilities: dg_model,
  process: dg_ninetyDays,
  engagements: dg_engagements,
  faqs: dg_faqs,
};

export const SOLUTION_DETAILS: GroupDetail[] = [
  { id: "artificial-intelligence", parts: [bi("copilot-studio", "Copilot Studio"), aiSystems] },
  { id: "power-bi", parts: [bi("power-bi", "Power BI & Fabric")] },
  { id: "power-apps", parts: [bi("power-apps", "Power Apps"), bi("power-automate", "Power Automate")] },
  { id: "salesforce", parts: [bi("salesforce", "Salesforce")] },
  { id: "digital-growth", parts: [...digitalGrowthServices.map(dg), howWeWork] },
];
