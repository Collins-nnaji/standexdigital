export type Offering = {
  title: string;
  blurb: string;
  details: string;
  includes: string[];
  outcome: string;
  timeline: string;
  /** Which tab of the full-page view to open first. */
  part?: number;
};

export type SolutionGroup = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  summary: string;
  metric: string;
  tone: "violet" | "amber" | "emerald" | "sky" | "rose";
  offerings: Offering[];
};

export const SOLUTION_GROUPS: SolutionGroup[] = [
  {
    id: "artificial-intelligence",
    number: "01",
    title: "Artificial Intelligence",
    tagline: "Agents that do the work",
    summary: "Copilot Studio assistants and autonomous agents that triage leads, answer questions from your data and run workflows around the clock.",
    metric: "+44% lead velocity",
    tone: "violet",
    offerings: [
      {
        title: "Copilot Studio Agents",
        blurb: "Frontline assistants for staff and customers.",
        details: "Custom copilots grounded in your own documents and systems, published to Teams, your website or Microsoft 365 Copilot.",
        includes: ["Use-case scoping and guardrails", "Knowledge grounding on SharePoint and files", "Teams and web channel deployment", "Analytics and continuous tuning"],
        outcome: "Answers in seconds instead of inbox queues",
        timeline: "3-6 weeks",
      },
      {
        title: "Autonomous Agent Workflows",
        part: 1,
        blurb: "Multi-step work completed without hand-holding.",
        details: "Agents that qualify leads, chase approvals, update records and escalate exceptions to a human when it matters.",
        includes: ["Lead triage and routing", "Tool and API orchestration", "Human-in-the-loop approvals", "Audit trail for every action"],
        outcome: "24/7 execution with full oversight",
        timeline: "4-8 weeks",
      },
      {
        title: "Document Intelligence & RAG",
        part: 1,
        blurb: "Search and extraction across your knowledge.",
        details: "Turn contracts, policies, invoices and archives into a private, searchable knowledge layer with cited answers.",
        includes: ["Ingestion and indexing pipeline", "Cited, permission-aware answers", "Invoice and form extraction", "Evaluation against real questions"],
        outcome: "Hours of searching become one question",
        timeline: "4-6 weeks",
      },
      {
        title: "Private LLM Integration",
        part: 1,
        blurb: "Azure OpenAI inside your tenant.",
        details: "Secure model deployments connected to your systems, with governance, cost control and data that never leaves your boundary.",
        includes: ["Azure OpenAI architecture", "Prompt and evaluation framework", "Security and access review", "Cost and usage monitoring"],
        outcome: "Enterprise AI without data-leak risk",
        timeline: "3-5 weeks",
      },
    ],
  },
  {
    id: "power-bi",
    number: "02",
    title: "Power BI & Fabric",
    tagline: "One version of the truth",
    summary: "Unified semantic models and live dashboards that show leadership pipeline, margin and operations daily instead of fortnightly.",
    metric: "Daily data vs 14-day lag",
    tone: "amber",
    offerings: [
      {
        title: "Executive Dashboards",
        blurb: "Board-ready KPIs, always current.",
        details: "Clear, fast Power BI reports designed around the decisions leaders actually make.",
        includes: ["KPI definition workshops", "Interactive drill-through reports", "Mobile layouts", "Row-level security"],
        outcome: "Decisions from live numbers, not stale decks",
        timeline: "2-5 weeks",
      },
      {
        title: "Microsoft Fabric & OneLake",
        blurb: "A modern data platform in one place.",
        details: "Lakehouse, pipelines and warehousing on Fabric so every team draws from the same governed data.",
        includes: ["OneLake architecture", "Data pipelines and dataflows", "Capacity sizing", "Governance and lineage"],
        outcome: "One platform, lower integration cost",
        timeline: "4-10 weeks",
      },
      {
        title: "Semantic Models",
        blurb: "Trusted definitions for every metric.",
        details: "Reusable models so revenue, margin and churn mean the same thing in every report.",
        includes: ["Star-schema modelling", "Certified datasets", "DAX measure library", "Performance tuning"],
        outcome: "End of conflicting spreadsheets",
        timeline: "3-6 weeks",
      },
      {
        title: "Fabric Data Agents",
        blurb: "Ask your data in plain English.",
        details: "Natural-language agents over your models so non-analysts can get answers instantly.",
        includes: ["Agent grounding on semantic models", "Curated example questions", "Copilot integration", "Usage review"],
        outcome: "Self-serve answers for every team",
        timeline: "2-4 weeks",
      },
    ],
  },
  {
    id: "power-apps",
    number: "03",
    title: "Power Apps & Automate",
    tagline: "Replace spreadsheets for good",
    summary: "Secure business apps, portals and automated workflows that remove manual re-keying and stuck approvals.",
    metric: "-82% manual hours",
    tone: "emerald",
    offerings: [
      {
        title: "Canvas & Mobile Apps",
        blurb: "Task-focused apps for field and frontline.",
        details: "Fast, offline-capable apps that replace paper forms and spreadsheet trackers.",
        includes: ["Process discovery", "Interactive prototype", "Offline sync", "Training and handover"],
        outcome: "Data captured once, at the source",
        timeline: "4-8 weeks",
      },
      {
        title: "Model-driven Apps on Dataverse",
        blurb: "Case management and back-office systems.",
        details: "Data-rich applications with relational data, business rules, auditing and role-based security built in.",
        includes: ["Dataverse data model", "Security roles", "Business rules and views", "Managed solution deployment"],
        outcome: "A proper system of record",
        timeline: "6-12 weeks",
      },
      {
        title: "Power Automate Workflows",
        part: 1,
        blurb: "Approvals and integrations that never stall.",
        details: "Cloud and desktop flows that connect your systems and route approvals in Teams and Outlook.",
        includes: ["Opportunity assessment", "Approval workflows", "Desktop RPA for legacy tools", "Monitoring and alerts"],
        outcome: "Hours of admin handed back weekly",
        timeline: "2-6 weeks",
      },
      {
        title: "Power Pages Portals",
        blurb: "Secure sites for customers and partners.",
        details: "External portals where people submit and track information, wired straight into your data.",
        includes: ["Authenticated portals", "Forms and document upload", "Dataverse integration", "Branded design"],
        outcome: "Self-service that reduces inbound email",
        timeline: "4-8 weeks",
      },
    ],
  },
  {
    id: "salesforce",
    number: "04",
    title: "Salesforce CRM",
    tagline: "A pipeline you can trust",
    summary: "Salesforce set up to capture leads fast, automate follow-up and sync cleanly with Microsoft 365 and Power BI.",
    metric: "Sub-minute lead intake",
    tone: "sky",
    offerings: [
      {
        title: "Sales & Service Cloud",
        blurb: "Implementation built around your process.",
        details: "Configuration, objects, page layouts and automation designed for how your team really sells and supports.",
        includes: ["Requirements workshops", "Configuration and flows", "User training", "Hypercare support"],
        outcome: "Adoption that sticks",
        timeline: "6-12 weeks",
      },
      {
        title: "Pipeline Automation",
        blurb: "Faster lead-to-opportunity movement.",
        details: "Assignment, scoring, reminders and approvals so nothing sits unattended.",
        includes: ["Lead routing rules", "Scoring and alerts", "Quote approvals", "Forecast reporting"],
        outcome: "Higher conversion velocity",
        timeline: "3-6 weeks",
      },
      {
        title: "Microsoft Integration",
        blurb: "Salesforce talking to your wider stack.",
        details: "Two-way sync with Microsoft 365, Dataverse, Power BI and your ERP.",
        includes: ["Integration architecture", "Outlook and Teams links", "Power BI reporting", "Error handling"],
        outcome: "One connected customer view",
        timeline: "3-8 weeks",
      },
      {
        title: "Data Cleanup & Migration",
        blurb: "Start clean, stay clean.",
        details: "De-duplication, mapping and migration from legacy CRMs and spreadsheets.",
        includes: ["Data audit", "Deduplication rules", "Migration and validation", "Ongoing quality checks"],
        outcome: "Data your team believes",
        timeline: "2-5 weeks",
      },
    ],
  },
  {
    id: "digital-growth",
    number: "05",
    title: "Digital Marketing & Growth",
    tagline: "One accountable growth team",
    summary: "Paid search, social, SEO, email and analytics managed as a single system aimed at qualified pipeline.",
    metric: "Transparent ROAS",
    tone: "rose",
    offerings: [
      {
        title: "Google Ads",
        blurb: "High-intent search acquisition.",
        details: "Account builds and management focused on qualified enquiries and cost per acquisition.",
        includes: ["Account audit and rebuild", "Keyword and creative strategy", "Conversion tracking", "Monthly optimisation"],
        outcome: "More qualified leads per pound",
        timeline: "Ongoing",
      },
      {
        title: "Paid Social",
        part: 2,
        blurb: "Meta and LinkedIn campaigns.",
        details: "Audience, creative and funnel testing that finds the channels worth scaling.",
        includes: ["Audience modelling", "Creative testing", "Retargeting", "Lead-form integration"],
        outcome: "Predictable top-of-funnel",
        timeline: "Ongoing",
      },
      {
        title: "SEO & AI-Search Visibility",
        part: 4,
        blurb: "Be found by search and by AI assistants.",
        details: "Technical fixes and content that earns rankings and citations.",
        includes: ["Technical SEO audit", "Content roadmap", "Schema markup", "AI-answer visibility tracking"],
        outcome: "Compounding organic demand",
        timeline: "3-6 months",
      },
      {
        title: "Email & Lifecycle Automation",
        part: 3,
        blurb: "Journeys that nurture and convert.",
        details: "Automated sequences connected to your CRM so every lead gets timely follow-up.",
        includes: ["Journey design", "CRM-triggered flows", "Template system", "Deliverability setup"],
        outcome: "Revenue from the list you already own",
        timeline: "3-6 weeks",
      },
      {
        title: "GA4 Analytics & Attribution",
        part: 1,
        blurb: "Know what is really working.",
        details: "Clean tracking and dashboards that tie spend to pipeline.",
        includes: ["GA4 and tag setup", "Attribution model", "Live dashboards", "Monthly insight report"],
        outcome: "Budget moved to proven channels",
        timeline: "2-4 weeks",
      },
    ],
  },
];
