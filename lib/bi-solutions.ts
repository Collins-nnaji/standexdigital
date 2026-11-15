import type { ServiceChallenge, ServiceFaq, ServiceStep } from "./digital-growth-services";

export type BISolution = {
  slug: "power-apps" | "power-automate" | "power-bi" | "copilot-studio" | "salesforce";
  href: string;
  title: string;
  /** Longer name used in the page heading and metadata. Defaults to title. */
  displayName?: string;
  /** Platform vendor shown before the name in headings. Defaults to "Microsoft". */
  vendor?: string;
  /** Intro for the integrations band. */
  integrationsIntro?: string;
  /** Optional product grid, e.g. the Salesforce clouds we work with. */
  products?: { eyebrow: string; title: string; intro: string; items: { name: string; summary: string; points: string[] }[] };
  /** Optional illustrated diagram section. */
  diagram?: { eyebrow: string; title: string; intro: string; src: string; alt: string; points: string[] };
  /** Optional engagement models. */
  engagements?: { name: string; tag: string; text: string; items: string[]; featured?: boolean }[];
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
  /** Optional feature section highlighted on the product page. */
  spotlight?: {
    eyebrow: string;
    title: string;
    intro: string;
    items: { title: string; text: string; tag?: string }[];
    note?: string;
    cta?: string;
  };
  faqs: ServiceFaq[];
};

export const biSolutions: BISolution[] = [
  {
    slug: "power-apps",
    href: "/solutions#power-apps",
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
    href: "/solutions#power-apps",
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
    href: "/solutions#power-bi",
    title: "Power BI & Fabric",
    displayName: "Power BI & Microsoft Fabric",
    role: "Analyse & decide",
    eyebrow: "BI, Microsoft Fabric & data agents",
    description: "Trusted data models and dashboards—scaled on Microsoft Fabric and made conversational with Fabric data agents.",
    promise: "Turn scattered data into trusted dashboards—then let people ask questions of it in plain English with Fabric data agents.",
    intro:
      "A good dashboard is the visible part of a lot of careful work underneath: connecting sources, cleaning data, agreeing definitions and modelling it properly. We do all of it—so your Power BI reports are fast, accurate and trusted, and the conversation in meetings moves from \"which number is right?\" to \"what should we do?\". As your data grows, we build on Microsoft Fabric—one platform for data engineering, warehousing, real-time data and Power BI—and add Fabric data agents so people can get answers without building a report.",
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
      { title: "Dashboard & report design", text: "Clear, role-specific reports designed around the decisions each audience makes." },
      { title: "Microsoft Fabric platform", text: "OneLake, lakehouses, warehouses and pipelines that bring all your data into one governed foundation." },
      { title: "Fabric data agents", text: "Conversational agents that answer business questions in plain English over your lakehouse, warehouse and semantic models." },
      { title: "Semantic modelling", text: "Star-schema models and well-structured DAX measures that are fast, accurate and reusable." },
      { title: "Data integration", text: "Connect ERP, CRM, finance, Excel, SQL and cloud sources into a single model." },
      { title: "Direct Lake models", text: "Semantic models that read straight from OneLake for import-level speed without heavy refresh schedules." },
      { title: "Copilot in Power BI", text: "Generate report pages, summaries and DAX with Copilot—grounded in a well-prepared semantic model." },
      { title: "Row-level security", text: "Everyone sees exactly the data they're entitled to—from one report or agent." },
      { title: "Embedded analytics", text: "Power BI reports embedded in Teams, SharePoint, portals or your own applications." },
    ],
    useCases: [
      { team: "Leadership", examples: ["Executive KPI scorecards", "Board packs", "Ask-your-data agents for executives"] },
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
      "A scalable Microsoft Fabric foundation ready for AI and advanced analytics",
      "Plain-English answers from your data through Fabric data agents",
    ],
    deliverables: [
      { title: "Reporting discovery", text: "Stakeholder interviews to define the decisions, KPIs and audiences." },
      { title: "Data platform & Fabric assessment", text: "Profile source systems and data quality, and assess whether—and how—Microsoft Fabric fits." },
      { title: "KPI definitions", text: "Agreed, documented metric definitions everyone signs up to." },
      { title: "Fabric lakehouse & pipelines", text: "OneLake, lakehouse or warehouse design with Data Factory pipelines and Dataflows Gen2." },
      { title: "Data model & DAX", text: "Optimised semantic models—including Direct Lake—built for performance and reuse." },
      { title: "Report & dashboard design", text: "Wireframes, then polished reports to a consistent design standard." },
      { title: "Fabric data agents & Copilot", text: "Configure data agents with the right sources, instructions and example questions, and prepare models for Copilot." },
      { title: "Deployment, security & governance", text: "Workspaces, refresh, deployment pipelines, row-level security and sensitivity labels." },
      { title: "Training & adoption", text: "Training for report users and self-service authors, plus adoption tracking." },
    ],
    process: [
      { title: "Discover", text: "Clarify decisions, KPIs, users and the source data behind them.", duration: "1–2 weeks" },
      { title: "Model", text: "Clean, integrate and model the data; agree measure definitions.", duration: "2–4 weeks" },
      { title: "Visualise", text: "Design and build reports iteratively with stakeholder feedback.", duration: "2–4 weeks" },
      { title: "Adopt", text: "Deploy, secure, train and measure usage to embed the reports.", duration: "2 weeks+" },
    ],
    integrations: ["Excel & SharePoint", "SQL Server & Azure SQL", "Dynamics 365", "Salesforce", "Xero & Sage", "Google Analytics 4", "Dataverse", "Microsoft Fabric & OneLake", "OneLake shortcuts (Azure, AWS S3, Google Cloud)", "Copilot Studio", "Microsoft Teams", "REST APIs"],
    governance: [
      "Certified, reusable semantic models",
      "Row-level and object-level security",
      "Dev, test and production deployment pipelines",
      "Documented KPI definitions and data lineage",
      "Fabric capacity monitoring and cost control",
      "Data agents limited to approved, governed data sources",
    ],
    spotlight: {
      eyebrow: "Microsoft Fabric & Fabric data agents",
      title: "From dashboards to a complete data platform—and a data agent anyone can ask.",
      intro: "Microsoft Fabric brings data engineering, warehousing, real-time analytics and Power BI together on one platform, with OneLake as a single copy of your data. Fabric data agents then let people ask questions of that data in plain English and get answers grounded in your governed models.",
      items: [
        { tag: "Fabric", title: "OneLake as one source of truth", text: "Land data once and use it everywhere. Shortcuts connect Azure, AWS S3 and Google Cloud data without copying it." },
        { tag: "Fabric", title: "Lakehouse & warehouse", text: "Store and model data at scale using the lakehouse or SQL warehouse pattern that suits your team's skills." },
        { tag: "Fabric", title: "Data Factory pipelines", text: "Orchestrated pipelines and Dataflows Gen2 replace fragile manual extracts and overnight spreadsheets." },
        { tag: "Fabric", title: "Real-Time Intelligence", text: "Stream operational, IoT or event data into live dashboards and alerts when timing matters." },
        { tag: "Data agents", title: "Ask your data in plain English", text: "\"What were sales by region last quarter versus target?\" Fabric data agents generate the query and return the answer." },
        { tag: "Data agents", title: "Grounded in governed data", text: "Agents use your lakehouses, warehouses and semantic models, respect existing permissions, and follow instructions and example queries we configure." },
        { tag: "Data agents", title: "Available where people work", text: "Publish data agents for use in Microsoft Teams and Microsoft 365 Copilot, or connect them to agents built in Copilot Studio." },
        { tag: "Platform", title: "Capacity & cost governance", text: "Right-size Fabric capacity, monitor usage and keep spend predictable as adoption grows." },
      ],
      note: "Not every organisation needs Fabric on day one. We'll tell you honestly whether Power BI Pro is enough today and design a path that scales when you are ready.",
    },
    faqs: [
      { q: "What licences do we need for Power BI?", a: "Report authors and viewers typically need Power BI Pro, or Premium Per User for advanced features. Larger organisations may benefit from Fabric capacity. We'll model the options so you only pay for what you need." },
      { q: "Can you improve our existing Power BI reports?", a: "Yes. We often take over existing reports to fix performance, rebuild data models, standardise design and consolidate duplicated datasets." },
      { q: "How long does a Power BI project take?", a: "A focused departmental dashboard is often delivered in four to six weeks. Organisation-wide reporting is delivered in phases, starting with the highest-value area." },
      { q: "Will reports update automatically?", a: "Yes. We set up scheduled refresh—through a data gateway for on-premises sources—so reports stay current without manual exports." },
      { q: "What is Microsoft Fabric, and do we need it?", a: "Fabric is Microsoft's unified data platform, combining data engineering, data warehousing, real-time analytics and Power BI on a single copy of data in OneLake. It's a strong fit when you have many data sources, large volumes or a need for a proper data platform. Smaller reporting needs are often well served by Power BI alone—we'll recommend what fits." },
      { q: "What are Fabric data agents?", a: "Fabric data agents are conversational AI agents you configure over your Fabric data—lakehouses, warehouses, semantic models and KQL databases. Users ask questions in plain English and the agent generates the query, returns the answer and respects existing data permissions. They require a paid Fabric capacity; we'll confirm current requirements for your tenant." },
      { q: "Can data agents be used in Teams or with Copilot Studio?", a: "Yes. Fabric data agents can be published for use in Microsoft 365 Copilot and Teams, and connected to agents built in Microsoft Copilot Studio—so a single assistant can answer data questions and also take actions." },
      { q: "Can our team build their own reports afterwards?", a: "Absolutely. A well-designed, certified data model makes safe self-service possible, and we provide training to help your analysts build on it." },
    ],
  },
  {
    slug: "copilot-studio",
    href: "/solutions#artificial-intelligence",
    title: "Copilot Studio",
    displayName: "Copilot Studio",
    role: "Ask & act",
    eyebrow: "AI agents for your business",
    description: "Custom AI agents that answer questions from your knowledge and data, and take action through your systems and workflows.",
    promise: "Build secure AI agents that answer questions, handle requests and take action—inside Teams, Microsoft 365 Copilot and your website.",
    intro:
      "Microsoft Copilot Studio lets organisations build their own AI agents—grounded in their policies, documents and data, and connected to the systems where work gets done. We design agents around specific, valuable jobs, connect them to trusted knowledge, Power Automate flows and Fabric data agents, and put the guardrails, testing and analytics in place so they can be used with confidence.",
    logo: "/CopilotStudio.svg",
    image: "/Copilot.webp",
    accent: { text: "text-indigo-700", bg: "bg-indigo-50", ring: "ring-indigo-100", dot: "bg-indigo-500" },
    challenges: [
      { title: "The same questions, every day", text: "HR, IT and customer teams spend hours answering repeat questions that are already documented somewhere." },
      { title: "Knowledge is hard to find", text: "Policies, procedures and product information are scattered across SharePoint, websites and inboxes." },
      { title: "Generic AI isn't trusted", text: "Public chatbots don't know your business, can't access your systems and raise data-protection concerns." },
      { title: "Requests still need manual handling", text: "Even simple tasks—booking, logging a ticket, checking an order—need someone to pick them up." },
    ],
    capabilities: [
      { title: "Knowledge agents", text: "Answer questions from SharePoint, websites, files and Dataverse—with citations back to the source." },
      { title: "Generative orchestration", text: "Agents that understand intent and choose the right knowledge, topic or action to respond." },
      { title: "Actions & connectors", text: "Take action in Microsoft 365, Dynamics 365 and 1,000+ systems via connectors and Power Automate flows." },
      { title: "Autonomous agents", text: "Agents triggered by events—a new email, form or record—that carry out multi-step work without being asked." },
      { title: "Fabric data agent integration", text: "Connect a Fabric data agent so your Copilot can answer data questions from governed business data." },
      { title: "Multi-channel deployment", text: "Publish to Microsoft Teams, Microsoft 365 Copilot, your website and other channels from one build." },
    ],
    useCases: [
      { team: "HR & People", examples: ["Policy and benefits Q&A", "Onboarding assistant", "Leave and absence requests"] },
      { team: "IT", examples: ["Service desk triage", "Password and access requests", "How-to guidance"] },
      { team: "Customer Service", examples: ["Website customer assistant", "Order and case status", "Hand-off to a live agent"] },
      { team: "Sales", examples: ["Product and pricing Q&A", "Proposal and RFP support", "CRM updates by chat"] },
      { team: "Finance & Operations", examples: ["Expense and procurement queries", "Supplier questions", "Ask-your-data via Fabric agents"] },
      { team: "Leadership", examples: ["Performance Q&A over Power BI and Fabric", "Meeting and report summaries", "Policy look-ups"] },
    ],
    outcomes: [
      "Fast, accurate answers grounded in your own content",
      "Repeat requests handled automatically, around the clock",
      "Agents available inside Teams and Microsoft 365 Copilot",
      "Actions completed through secure, approved connections",
      "Clear guardrails, testing and human hand-off",
      "Analytics showing usage, resolution and gaps in knowledge",
    ],
    deliverables: [
      { title: "Use-case discovery", text: "Identify and prioritise the agent scenarios with the clearest value and lowest risk." },
      { title: "Knowledge preparation", text: "Organise and tidy the SharePoint content, documents and sites the agent will rely on." },
      { title: "Agent design", text: "Scope, instructions, tone, topics and escalation paths agreed before build." },
      { title: "Agent build", text: "Copilot Studio agent with knowledge sources, topics and generative orchestration." },
      { title: "Actions & integrations", text: "Power Automate flows, connectors and Fabric data agents so the agent can act and answer data questions." },
      { title: "Testing & guardrails", text: "Structured test sets, content moderation, authentication and data-loss-prevention policies." },
      { title: "Deployment", text: "Publish to Teams, Microsoft 365 Copilot or your website with the right access controls." },
      { title: "Analytics & improvement", text: "Monitor conversations and resolution rates, and improve knowledge and topics over time." },
    ],
    process: [
      { title: "Discover", text: "Choose the first use case, define success and review the knowledge available.", duration: "1–2 weeks" },
      { title: "Prototype", text: "A working agent prototype tested with a small group of real users.", duration: "1–2 weeks" },
      { title: "Build & secure", text: "Add actions, integrations, guardrails and authentication; test thoroughly.", duration: "2–6 weeks" },
      { title: "Launch & improve", text: "Roll out, monitor analytics and expand to new scenarios.", duration: "Ongoing" },
    ],
    integrations: ["Microsoft Teams", "Microsoft 365 Copilot", "SharePoint", "Dataverse", "Power Automate", "Fabric data agents", "Dynamics 365", "ServiceNow", "Salesforce", "Websites & custom channels"],
    governance: [
      "Agents run inside your Microsoft tenant and Power Platform environments",
      "Authentication through Microsoft Entra ID",
      "Data loss prevention and connector policies enforced",
      "Conversation analytics, audit and human hand-off",
    ],
    faqs: [
      { q: "What's the difference between Microsoft 365 Copilot and Copilot Studio?", a: "Microsoft 365 Copilot is a general assistant across Word, Outlook, Teams and more. Copilot Studio is where you build your own agents for specific jobs, with your knowledge, data and actions—and those agents can be used inside Microsoft 365 Copilot and Teams." },
      { q: "How is Copilot Studio licensed?", a: "Copilot Studio is licensed on capacity—Copilot Credits bought as prepaid packs or pay-as-you-go—and some agent usage is covered for Microsoft 365 Copilot users. We'll estimate expected usage and recommend the most cost-effective option." },
      { q: "Will the agent make things up?", a: "We ground agents in your approved knowledge, require citations, configure instructions and content moderation, and test against real questions before launch. Agents can also hand off to a person when they're not confident." },
      { q: "Can an agent answer questions from our Power BI or Fabric data?", a: "Yes. By connecting a Fabric data agent, your Copilot Studio agent can answer questions from governed lakehouse, warehouse and semantic-model data while respecting existing permissions." },
      { q: "Is our data safe?", a: "Agents run within your Microsoft tenant, use Entra ID authentication and respect your data-loss-prevention policies. We design access so the agent only uses sources approved for its audience." },
    ],
  },
  {
    slug: "salesforce",
    href: "/solutions#salesforce",
    title: "Salesforce",
    displayName: "Salesforce CRM & Analytics",
    vendor: "",
    role: "Sell & serve",
    eyebrow: "CRM implementation, integration & analytics",
    description: "Salesforce implementations, optimisation and integrations that give sales, service and marketing one trusted view of every customer—and feed reliable data into Power BI and Fabric.",
    promise: "Make Salesforce the CRM your teams actually rely on—clean data, simple processes and reporting leadership trusts.",
    intro:
      "Salesforce is the world's most widely used CRM, but its value depends entirely on how it's set up. Many organisations pay for licences their teams barely use: records are incomplete, processes live outside the system and reports don't match finance. We implement, rescue and extend Salesforce around how you actually sell and serve customers—then connect it to the rest of your business, including Microsoft 365, ERP and Power BI, so CRM data drives real decisions.",
    logo: "/salesforce/crm-icon.svg",
    image: "/salesforce/crm-dashboard.svg",
    accent: { text: "text-cyan-700", bg: "bg-cyan-50", ring: "ring-cyan-100", dot: "bg-cyan-500" },
    challenges: [
      { title: "Low user adoption", text: "Sales teams keep notes in spreadsheets and inboxes because Salesforce feels slow, cluttered or irrelevant to their day." },
      { title: "Dirty, duplicated data", text: "Duplicate accounts, missing fields and inconsistent stages make pipeline reports unreliable." },
      { title: "An org that grew without a plan", text: "Years of custom fields, overlapping automations and old Process Builder flows make every change risky." },
      { title: "CRM disconnected from the business", text: "Orders, invoices and support data live in other systems, so nobody sees the full customer picture." },
      { title: "Reporting nobody trusts", text: "Forecasts in Salesforce don't match finance, and leaders still ask for numbers in Excel." },
      { title: "Unclear AI roadmap", text: "Agentforce and Einstein promise a lot, but without clean data and clear use cases it's hard to know where to start." },
    ],
    capabilities: [
      { title: "Implementation & configuration", text: "Objects, page layouts, record types, validation rules and permission sets designed around your sales and service process." },
      { title: "Org health check & rescue", text: "A structured review of an existing org with a prioritised plan to simplify, fix and modernise." },
      { title: "Flow automation", text: "Lead routing, approvals, reminders and record updates built in Salesforce Flow—replacing legacy Workflow Rules and Process Builder." },
      { title: "Data migration & quality", text: "Migration from spreadsheets, legacy CRMs or Dynamics, with de-duplication, matching rules and ongoing data-quality controls." },
      { title: "Integration", text: "Connect Salesforce with ERP, finance, e-commerce, Microsoft 365 and Teams through APIs, MuleSoft or Power Automate." },
      { title: "Reports & dashboards", text: "Native Salesforce reports and dashboards for day-to-day management, with consistent definitions across teams." },
      { title: "Salesforce to Power BI & Fabric", text: "Bring Salesforce data into Power BI and Microsoft Fabric to combine CRM with finance, operations and marketing." },
      { title: "Agentforce & Einstein AI", text: "Identify, configure and govern AI agents and predictive features once the data foundation is ready." },
      { title: "Custom development", text: "Lightning Web Components and Apex where configuration isn't enough—built, tested and documented properly." },
    ],
    products: {
      eyebrow: "Salesforce clouds",
      title: "The Salesforce products we implement and support.",
      intro: "We focus on the clouds most mid-sized organisations rely on, and design them to work together rather than as separate projects.",
      items: [
        { name: "Sales Cloud", summary: "Lead-to-cash for B2B and B2C sales teams.", points: ["Lead management & routing", "Opportunity stages & forecasting", "Quotes & products", "Territory and team selling"] },
        { name: "Service Cloud", summary: "Case management and customer support at scale.", points: ["Omni-channel case routing", "Entitlements & SLAs", "Knowledge base", "Customer service console"] },
        { name: "Marketing Cloud & Account Engagement", summary: "B2C journeys and B2B marketing automation.", points: ["Email & journey automation", "Lead scoring & grading", "Campaign attribution", "Sales & marketing alignment"] },
        { name: "Experience Cloud", summary: "Branded portals for customers, partners and members.", points: ["Self-service help centres", "Partner deal registration", "Secure document sharing", "Single sign-on"] },
        { name: "Data Cloud", summary: "Unified customer profiles across systems.", points: ["Identity resolution", "Real-time segments", "Calculated insights", "Foundation for AI"] },
        { name: "Agentforce", summary: "AI agents that work alongside your teams.", points: ["Sales & service agents", "Grounded in CRM data", "Guardrails & trust layer", "Human hand-off"] },
      ],
    },
    diagram: {
      eyebrow: "How it connects",
      title: "Salesforce at the centre of a connected customer data platform.",
      intro: "CRM data is most valuable when it flows. We design the integration layer so Salesforce stays in sync with operations and finance, and so its history lands in Power BI and Fabric for analysis alongside everything else.",
      src: "/salesforce/integration-architecture.svg",
      alt: "Diagram showing Salesforce clouds connected through APIs, MuleSoft, Power Automate and Fabric pipelines to Power BI, Microsoft Fabric, Teams and ERP systems",
      points: [
        "Two-way sync with ERP and finance for orders, invoices and customers",
        "Salesforce history in Fabric's OneLake for trend and cohort analysis",
        "Power BI dashboards combining pipeline with revenue and margin",
        "Teams and Outlook notifications and approvals for deals and cases",
      ],
    },
    spotlight: {
      eyebrow: "Salesforce + Microsoft",
      title: "Use Salesforce for CRM and Microsoft for everything else—seamlessly.",
      intro: "Most organisations running Salesforce also run Microsoft 365, Teams and Power BI. Because we work across both ecosystems, we can make them work as one instead of two islands.",
      items: [
        { tag: "Power BI", title: "CRM analytics in Power BI", text: "Pipeline, win rates and service KPIs modelled in Power BI using the Salesforce connectors—combined with finance and operations data." },
        { tag: "Fabric", title: "Salesforce in Microsoft Fabric", text: "Land Salesforce objects in OneLake with Fabric pipelines or Dataflows Gen2 to keep full history and power Fabric data agents." },
        { tag: "Automation", title: "Power Automate connectors", text: "Trigger flows from Salesforce records to update SharePoint, generate documents or sync with other Microsoft systems." },
        { tag: "Collaboration", title: "Teams & Outlook integration", text: "Bring Salesforce records into Teams and Outlook so sellers can update CRM without leaving the tools they live in." },
        { tag: "AI", title: "Copilot Studio & Agentforce", text: "Connect Copilot Studio agents to Salesforce data, or use Agentforce inside Salesforce—we'll help you choose the right fit." },
        { tag: "Governance", title: "One identity, one set of rules", text: "Single sign-on with Microsoft Entra ID and consistent data-protection policies across both platforms." },
      ],
      note: "Already decided between Salesforce and Dynamics 365? We'll work with what you have. Still deciding? We'll give you an impartial view based on your processes and existing Microsoft investment.",
      cta: "Discuss your Salesforce setup",
    },
    useCases: [
      { team: "Sales", examples: ["Lead capture, scoring and routing", "Pipeline management & forecasting", "Quotes and approval workflows"] },
      { team: "Customer Service", examples: ["Case management with SLAs", "Self-service help centre", "Customer satisfaction tracking"] },
      { team: "Marketing", examples: ["Campaign attribution to revenue", "Nurture journeys for new leads", "Event and webinar management"] },
      { team: "Account Management", examples: ["Renewals and upsell tracking", "Customer health scores", "Key account plans"] },
      { team: "Partners & Channels", examples: ["Partner portal & deal registration", "Channel performance reporting", "Shared enablement content"] },
      { team: "Leadership & Finance", examples: ["Revenue forecasting in Power BI", "Bookings vs billing reconciliation", "Board-ready customer KPIs"] },
    ],
    outcomes: [
      "A Salesforce org your teams find quick and useful",
      "Clean, de-duplicated customer and pipeline data",
      "Automated lead routing, approvals and follow-up",
      "Salesforce connected to ERP, finance and Microsoft 365",
      "Forecasts and dashboards leadership trusts",
      "A clear, governed roadmap for Agentforce and AI",
    ],
    deliverables: [
      { title: "Discovery & process mapping", text: "Workshops with sales, service, marketing and finance to map how customers are won and served." },
      { title: "Solution design", text: "Data model, security model, automation design and integration architecture documented before build." },
      { title: "Configuration & build", text: "Objects, layouts, Lightning pages, Flows and permission sets configured to best practice." },
      { title: "Data migration", text: "Cleansing, de-duplication and migration of accounts, contacts, opportunities and history." },
      { title: "Integrations", text: "APIs, MuleSoft or Power Automate connections to ERP, finance, website and Microsoft 365." },
      { title: "Reporting & Power BI", text: "Salesforce dashboards for daily use, plus Power BI models for cross-business analysis." },
      { title: "Testing, training & go-live", text: "Structured UAT, role-based training and a managed cut-over plan." },
      { title: "Post-launch optimisation", text: "Adoption tracking, release management and a backlog of improvements." },
    ],
    process: [
      { title: "Discover & design", text: "Map processes, audit data and agree the target design and roadmap.", duration: "2–4 weeks" },
      { title: "Build in sprints", text: "Configure, automate and integrate with fortnightly demos and feedback.", duration: "4–12 weeks" },
      { title: "Migrate & test", text: "Clean and load data, run UAT and prepare users with training.", duration: "2–4 weeks" },
      { title: "Launch & optimise", text: "Go live, support adoption and keep improving each release.", duration: "Ongoing" },
    ],
    engagements: [
      { name: "Salesforce Health Check", tag: "Fixed scope · 2–3 weeks", text: "An independent review of your org's configuration, data quality, automation, security and adoption—with a prioritised improvement plan.", items: ["Org & technical-debt review", "Data quality assessment", "Security & sharing review", "User adoption interviews", "Prioritised roadmap"] },
      { name: "Implementation & Rescue", tag: "Project · 8–20 weeks", featured: true, text: "A new Salesforce implementation, or a structured rebuild of an org that isn't working—designed around your processes.", items: ["Discovery & solution design", "Configuration & automation", "Data migration", "Integrations & Power BI", "Training & go-live support"] },
      { name: "Managed Salesforce Support", tag: "Monthly retainer", text: "Ongoing admin, enhancements and release management from a team that knows your org and your business.", items: ["Admin & user support", "Enhancement backlog", "Seasonal release reviews", "Data-quality monitoring", "Quarterly roadmap reviews"] },
    ],
    integrations: ["Microsoft Teams & Outlook", "Power BI", "Microsoft Fabric", "Power Automate", "Copilot Studio", "MuleSoft", "SAP & NetSuite", "Xero & Sage", "Dynamics 365 Business Central", "Shopify & e-commerce", "DocuSign & Adobe Sign", "Google Workspace"],
    integrationsIntro: "Salesforce connects to almost anything through its APIs. We design integrations that are reliable, monitored and documented—not point-to-point scripts that break quietly.",
    governance: [
      "Profiles, permission sets and sharing rules based on least privilege",
      "Sandbox-based development with tested, versioned deployments",
      "Data-quality rules, duplicate management and field history tracking",
      "Single sign-on and MFA, with Agentforce guardrails configured",
    ],
    faqs: [
      { q: "Do you only work with Microsoft, or with Salesforce too?", a: "Both. Many of our clients run Salesforce for CRM alongside Microsoft 365, Teams and Power BI. Working across both lets us connect them properly rather than treating them as separate worlds." },
      { q: "Can you fix our existing Salesforce org rather than starting again?", a: "Usually, yes. A Health Check shows what to keep, what to simplify and what to rebuild. Most organisations get the biggest gains from tidying data, simplifying page layouts and replacing legacy automation—without a full re-implementation." },
      { q: "How long does a Salesforce implementation take?", a: "A focused Sales Cloud implementation is often live in 8–12 weeks. Multi-cloud programmes with complex integrations are delivered in phases, with the first release typically within three months." },
      { q: "Can Salesforce data go into Power BI?", a: "Yes. Power BI includes Salesforce connectors, and for larger volumes or longer history we land Salesforce data in Microsoft Fabric. Either way, CRM data can sit alongside finance and operations in one model." },
      { q: "Should we use Agentforce?", a: "Agentforce can be powerful for sales and service, but it relies on clean, well-structured data and clear use cases. We help you get the foundation right first, then pilot agents where the value is clearest." },
      { q: "Do you help with licensing?", a: "We'll review which Salesforce editions and add-ons you actually need and identify unused licences, so you only pay for what delivers value. Licences are purchased directly from Salesforce." },
    ],
  },
];

export function getBISolution(slug: string) {
  return biSolutions.find((solution) => solution.slug === slug);
}
