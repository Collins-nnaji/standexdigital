import type { ServiceChallenge, ServiceFaq, ServiceStep } from "./digital-growth-services";

export type BISolution = {
  slug: "power-apps" | "power-automate" | "power-bi";
  href: string;
  title: string;
  role: string;
  eyebrow: string;
  description: string;
  promise: string;
  intro: string;
  logo: string;
  image: string;
  accent: { text: string; bg: string; ring: string; dot: string };
  challenges: ServiceChallenge[];
  capabilities: { title: string; text: string }[];
  useCases: { team: string; examples: string[] }[];
  outcomes: string[];
  deliverables: { title: string; text: string }[];
  process: ServiceStep[];
  integrations: string[];
  governance: string[];
  faqs: ServiceFaq[];
};

export const biSolutions: BISolution[] = [
  {
    slug: "power-apps",
    href: "/solutions/power-apps",
    title: "Power Apps",
    role: "Capture & operate",
    eyebrow: "Custom business applications",
    description: "Purpose-built business apps that replace spreadsheets, paper forms and email chains with structured, reliable data.",
    promise: "Replace spreadsheets and paper forms with secure business apps your team actually wants to use.",
    intro:
      "Most reporting problems start at the point of capture. When data lives in personal spreadsheets, paper forms and inboxes, no dashboard can fix it. We design and build Power Apps that make the right way of working the easiest way—on desktop, tablet or phone—with data stored securely in Dataverse or SharePoint and ready for automation and reporting.",
    logo: "/PowerApps.svg",
    image: "/PA-Solutions.webp",
    accent: { text: "text-fuchsia-700", bg: "bg-fuchsia-50", ring: "ring-fuchsia-100", dot: "bg-fuchsia-500" },
    challenges: [
      { title: "Critical processes run on spreadsheets", text: "Version conflicts, broken formulas and files only one person understands put operations at risk." },
      { title: "Paper and PDF forms in the field", text: "Inspections, timesheets and site reports are re-keyed at the office, introducing delay and errors." },
      { title: "Off-the-shelf software doesn't fit", text: "Packaged tools force workarounds, while fully custom development is slow and expensive." },
      { title: "No single source of truth", text: "The same customer, asset or job is recorded differently in several places." },
    ],
    capabilities: [
      { title: "Canvas apps", text: "Pixel-perfect, task-focused apps for mobile and tablet—ideal for field teams and frontline staff." },
      { title: "Model-driven apps", text: "Data-rich applications built on Dataverse for case management, CRM-style processes and back-office operations." },
      { title: "Dataverse data modelling", text: "Secure, relational data with business rules, auditing and role-based access built in." },
      { title: "Offline & mobile", text: "Apps that keep working without signal and sync when connectivity returns." },
      { title: "AI Builder & Copilot", text: "Document processing, image recognition and natural-language assistance inside your apps." },
      { title: "Power Pages portals", text: "Secure external sites for customers, suppliers or partners to submit and view information." },
    ],
    useCases: [
      { team: "Operations", examples: ["Site inspections and audits", "Asset and equipment tracking", "Job scheduling and dispatch"] },
      { team: "Finance", examples: ["Expense and purchase requests", "Budget submissions", "Supplier onboarding"] },
      { team: "HR & People", examples: ["Employee onboarding", "Leave and absence requests", "Training and certification records"] },
      { team: "Sales & Service", examples: ["Lightweight CRM and quoting", "Customer case management", "Field service visit reports"] },
      { team: "Health & Safety", examples: ["Incident and near-miss reporting", "Risk assessments", "Permit-to-work"] },
      { team: "Projects", examples: ["Timesheets", "Resource allocation", "Change and issue logs"] },
    ],
    outcomes: [
      "Data captured once, accurately, at the source",
      "Spreadsheets and paper forms retired for critical processes",
      "Secure role-based access aligned to your Microsoft 365 identities",
      "Apps that work on any device, online or offline",
      "Clean, structured data ready for Power Automate and Power BI",
      "A maintainable solution your IT team can govern and extend",
    ],
    deliverables: [
      { title: "Process discovery workshops", text: "Map how work happens today, who is involved and where data is lost." },
      { title: "Solution & data design", text: "Data model, screens, security roles and integration points agreed before build." },
      { title: "Interactive prototype", text: "A clickable prototype users can try early, so feedback shapes the app." },
      { title: "App build & configuration", text: "Canvas or model-driven apps built to Microsoft best practice and your branding." },
      { title: "Data migration", text: "Clean and import existing spreadsheet or legacy data." },
      { title: "Testing & UAT", text: "Structured testing with real users before go-live." },
      { title: "ALM & environments", text: "Dev, test and production environments with managed solutions and deployment pipelines." },
      { title: "Training & handover", text: "User guides, admin documentation and training sessions." },
    ],
    process: [
      { title: "Discover", text: "Workshops with users and owners to map the process and requirements.", duration: "1–2 weeks" },
      { title: "Design & prototype", text: "Data model, UX and a clickable prototype validated with users.", duration: "1–2 weeks" },
      { title: "Build in sprints", text: "Iterative build with fortnightly demos so you see progress early.", duration: "3–8 weeks" },
      { title: "Launch & support", text: "Testing, training, go-live and post-launch improvements.", duration: "2 weeks+" },
    ],
    integrations: ["Dataverse", "SharePoint", "Microsoft Teams", "Outlook", "Dynamics 365", "SQL Server", "Azure", "Excel", "Custom APIs"],
    governance: [
      "Role-based security aligned to Microsoft Entra ID",
      "Separate development, test and production environments",
      "Data loss prevention (DLP) policies respected and documented",
      "Solutions packaged for controlled deployment and rollback",
    ],
    faqs: [
      { q: "Do we need extra licences for Power Apps?", a: "Many Microsoft 365 plans include Power Apps for use with standard connectors like SharePoint. Premium features such as Dataverse or SQL connectors need Power Apps Premium licences. We'll recommend the most cost-effective licensing during discovery." },
      { q: "How long does it take to build an app?", a: "A focused app for a single process is often delivered in four to eight weeks. Larger, multi-process solutions are delivered in phases so value arrives early." },
      { q: "Can our team maintain the app afterwards?", a: "Yes. We build with maintainability in mind, document everything, and can train your internal makers. Ongoing support is available if you prefer." },
      { q: "Is Power Apps secure enough for sensitive data?", a: "Power Apps inherits Microsoft's enterprise security and compliance, and Dataverse adds row-level security, auditing and encryption. We design security roles around least-privilege access." },
      { q: "Can apps be used by people outside our organisation?", a: "Yes—through Power Pages, which provides secure external portals for customers, suppliers or partners." },
    ],
  },
  {
    slug: "power-automate",
    href: "/solutions/power-automate",
    title: "Power Automate",
    role: "Connect & automate",
    eyebrow: "Workflow & process automation",
    description: "Reliable workflows that move information between teams and systems, route approvals and remove repetitive admin.",
    promise: "Remove repetitive admin and connect your systems with automation you can rely on.",
    intro:
      "Every business has hours lost to copying data between systems, chasing approvals and sending the same emails. We design and build Power Automate workflows that handle this work reliably—with proper error handling, monitoring and documentation—so your people can focus on the work that needs judgement.",
    logo: "/PowerAutomate.svg",
    image: "/Power-Automate.webp",
    accent: { text: "text-sky-700", bg: "bg-sky-50", ring: "ring-sky-100", dot: "bg-sky-500" },
    challenges: [
      { title: "Manual re-keying between systems", text: "The same information is typed into the CRM, finance system and spreadsheets by hand." },
      { title: "Approvals stuck in inboxes", text: "Requests wait days for sign-off with no visibility of where they are or who's holding them." },
      { title: "Fragile, undocumented automations", text: "Flows built by one person fail silently and nobody knows how to fix them." },
      { title: "Legacy systems with no API", text: "Older desktop applications force staff into repetitive clicking and copying." },
    ],
    capabilities: [
      { title: "Cloud flows", text: "Event-driven automation across Microsoft 365 and 1,000+ connected services." },
      { title: "Approval workflows", text: "Multi-stage approvals in Teams and Outlook with escalations, reminders and a full audit trail." },
      { title: "Desktop flows (RPA)", text: "Robotic process automation for legacy and desktop applications without APIs." },
      { title: "Document processing", text: "Extract data from invoices, forms and emails with AI Builder and route it automatically." },
      { title: "System integration", text: "Keep CRM, ERP, finance and line-of-business systems in sync with custom connectors." },
      { title: "Scheduled & data flows", text: "Recurring jobs, data clean-up and report distribution on a reliable schedule." },
    ],
    useCases: [
      { team: "Finance", examples: ["Invoice capture and approval", "Purchase order routing", "Month-end reminders and reconciliations"] },
      { team: "HR & People", examples: ["Joiner, mover and leaver processes", "Contract and document generation", "Holiday approval"] },
      { team: "Sales", examples: ["Lead routing and assignment", "Quote approvals", "CRM data enrichment"] },
      { team: "Operations", examples: ["Order processing", "Stock-level alerts", "Supplier notifications"] },
      { team: "IT", examples: ["Access requests", "Licence management", "Service desk triage"] },
      { team: "Compliance", examples: ["Policy acknowledgements", "Audit evidence collection", "Contract renewal alerts"] },
    ],
    outcomes: [
      "Hours of repetitive admin removed every week",
      "Faster approvals with full visibility and audit trails",
      "Fewer errors from manual data entry",
      "Systems that stay in sync automatically",
      "Automations that are monitored, documented and supportable",
      "A prioritised backlog of further automation opportunities",
    ],
    deliverables: [
      { title: "Automation opportunity assessment", text: "Identify and score processes by effort saved, risk and complexity." },
      { title: "Process mapping", text: "Current and future-state maps agreed with process owners." },
      { title: "Flow design & build", text: "Cloud and desktop flows built with reusable components and naming standards." },
      { title: "Error handling & monitoring", text: "Retry logic, failure alerts and run history so issues never go unnoticed." },
      { title: "Custom connectors", text: "Secure connections to systems without an out-of-the-box connector." },
      { title: "Documentation", text: "Clear runbooks describing what each flow does and how to support it." },
      { title: "Centre of Excellence setup", text: "Governance, environment strategy and visibility of every automation in your tenant." },
      { title: "Training & handover", text: "Enable your team to own, extend and build new automations safely." },
    ],
    process: [
      { title: "Identify", text: "Find and prioritise the processes with the biggest return.", duration: "1 week" },
      { title: "Map & design", text: "Agree the future-state process, exceptions and data flows.", duration: "1–2 weeks" },
      { title: "Build & test", text: "Develop, test with real scenarios and harden for production.", duration: "2–6 weeks" },
      { title: "Monitor & expand", text: "Go live with monitoring, then work through the automation backlog.", duration: "Ongoing" },
    ],
    integrations: ["Outlook & Exchange", "Microsoft Teams", "SharePoint", "Dataverse", "Dynamics 365", "Xero", "Sage", "Salesforce", "Adobe Sign / DocuSign", "SQL & REST APIs"],
    governance: [
      "Flows owned by service accounts, not individuals",
      "Centralised monitoring and failure alerting",
      "Connection and DLP policies aligned to IT standards",
      "Every automation documented and inventoried",
    ],
    faqs: [
      { q: "Is Power Automate included in Microsoft 365?", a: "Standard cloud flows with Microsoft 365 connectors are included in most business plans. Premium connectors, desktop flows (RPA) and AI Builder require additional licences—we'll make clear recommendations." },
      { q: "Can Power Automate work with non-Microsoft systems?", a: "Yes. There are over 1,000 connectors, including Salesforce, Xero, Sage and DocuSign, and we can build custom connectors for systems with an API—or use desktop flows where there isn't one." },
      { q: "What happens when a flow fails?", a: "We build error handling into every flow, with retries for temporary issues and alerts to the right people when something needs attention, plus a clear runbook explaining the fix." },
      { q: "How do we decide what to automate first?", a: "Our opportunity assessment scores processes by time saved, error reduction, risk and complexity, so you start with the quickest, highest-value wins." },
    ],
  },
  {
    slug: "power-bi",
    href: "/solutions/power-bi",
    title: "Power BI",
    role: "Analyse & decide",
    eyebrow: "Business intelligence & reporting",
    description: "Trusted data models, dashboards and reporting that give leaders and teams one shared view of performance.",
    promise: "Turn scattered data into trusted dashboards that leaders and teams act on.",
    intro:
      "A good dashboard is the visible part of a lot of careful work underneath: connecting sources, cleaning data, agreeing definitions and modelling it properly. We do all of it—so your Power BI reports are fast, accurate and trusted, and the conversation in meetings moves from \"which number is right?\" to \"what should we do?\".",
    logo: "/PowerBi.svg",
    image: "/Power-Bi.webp",
    accent: { text: "text-amber-700", bg: "bg-amber-50", ring: "ring-amber-100", dot: "bg-amber-500" },
    challenges: [
      { title: "Monthly reporting takes days", text: "Analysts spend most of their time exporting, copying and fixing spreadsheets rather than analysing." },
      { title: "Different numbers in every meeting", text: "Departments define revenue, margin or customers differently, so trust in reporting is low." },
      { title: "Slow, cluttered dashboards", text: "Existing reports are slow to load, hard to read and rarely opened." },
      { title: "Data locked in separate systems", text: "Finance, CRM, operations and marketing data never come together in one view." },
    ],
    capabilities: [
      { title: "Data integration", text: "Connect ERP, CRM, finance, Excel, SQL and cloud sources into a single model." },
      { title: "Semantic modelling", text: "Star-schema models and well-structured DAX measures that are fast, accurate and reusable." },
      { title: "Dashboard & report design", text: "Clear, role-specific reports designed around the decisions each audience makes." },
      { title: "Microsoft Fabric", text: "Lakehouse, dataflows and pipelines for larger, more complex data estates." },
      { title: "Row-level security", text: "Everyone sees exactly the data they're entitled to—from one report." },
      { title: "Embedded analytics", text: "Power BI reports embedded in Teams, SharePoint, portals or your own applications." },
    ],
    useCases: [
      { team: "Leadership", examples: ["Executive KPI scorecards", "Board packs", "Strategic performance tracking"] },
      { team: "Finance", examples: ["Management accounts", "Budget vs actual", "Cash flow and profitability"] },
      { team: "Sales & Marketing", examples: ["Pipeline and forecast", "Campaign and channel ROI", "Customer segmentation"] },
      { team: "Operations", examples: ["Productivity and utilisation", "Inventory and supply chain", "Service levels and SLAs"] },
      { team: "HR & People", examples: ["Headcount and turnover", "Absence trends", "Recruitment funnel"] },
      { team: "Customer Service", examples: ["Case volumes and resolution", "Customer satisfaction", "Contact-centre performance"] },
    ],
    outcomes: [
      "One trusted version of the truth across departments",
      "Reporting that refreshes automatically—no more manual exports",
      "Fast, intuitive dashboards built around real decisions",
      "Shared KPI definitions documented and governed",
      "Secure access with row-level security",
      "A scalable data foundation ready for AI and advanced analytics",
    ],
    deliverables: [
      { title: "Reporting discovery", text: "Stakeholder interviews to define the decisions, KPIs and audiences." },
      { title: "Data source assessment", text: "Profile source systems, data quality and refresh requirements." },
      { title: "KPI definitions", text: "Agreed, documented metric definitions everyone signs up to." },
      { title: "Data model & DAX", text: "Optimised semantic models and measures built for performance and reuse." },
      { title: "Report & dashboard design", text: "Wireframes, then polished reports to a consistent design standard." },
      { title: "Deployment & refresh", text: "Workspaces, gateways, scheduled refresh and deployment pipelines." },
      { title: "Security & governance", text: "Row-level security, workspace roles and sensitivity labels configured." },
      { title: "Training & adoption", text: "Training for report users and self-service authors, plus adoption tracking." },
    ],
    process: [
      { title: "Discover", text: "Clarify decisions, KPIs, users and the source data behind them.", duration: "1–2 weeks" },
      { title: "Model", text: "Clean, integrate and model the data; agree measure definitions.", duration: "2–4 weeks" },
      { title: "Visualise", text: "Design and build reports iteratively with stakeholder feedback.", duration: "2–4 weeks" },
      { title: "Adopt", text: "Deploy, secure, train and measure usage to embed the reports.", duration: "2 weeks+" },
    ],
    integrations: ["Excel & SharePoint", "SQL Server & Azure SQL", "Dynamics 365", "Salesforce", "Xero & Sage", "Google Analytics 4", "Dataverse", "Microsoft Fabric", "REST APIs"],
    governance: [
      "Certified, reusable semantic models",
      "Row-level and object-level security",
      "Dev, test and production deployment pipelines",
      "Documented KPI definitions and data lineage",
    ],
    faqs: [
      { q: "What licences do we need for Power BI?", a: "Report authors and viewers typically need Power BI Pro, or Premium Per User for advanced features. Larger organisations may benefit from Fabric capacity. We'll model the options so you only pay for what you need." },
      { q: "Can you improve our existing Power BI reports?", a: "Yes. We often take over existing reports to fix performance, rebuild data models, standardise design and consolidate duplicated datasets." },
      { q: "How long does a Power BI project take?", a: "A focused departmental dashboard is often delivered in four to six weeks. Organisation-wide reporting is delivered in phases, starting with the highest-value area." },
      { q: "Will reports update automatically?", a: "Yes. We set up scheduled refresh—through a data gateway for on-premises sources—so reports stay current without manual exports." },
      { q: "Can our team build their own reports afterwards?", a: "Absolutely. A well-designed, certified data model makes safe self-service possible, and we provide training to help your analysts build on it." },
    ],
  },
];

export function getBISolution(slug: string) {
  return biSolutions.find((solution) => solution.slug === slug);
}
