"use client";

import React, { useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { TopNav } from "@/components/network/TopNav";
import ContactEnquiryForm from "@/components/standex-ai/Contact/ContactEnquiryForm";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Sparkles, Rocket,
  GraduationCap, Layers, Bot, Database, Zap, 
  BarChart3, ShieldCheck, CreditCard, ChevronRight
} from "lucide-react";
import Link from "next/link";

/* ── AI ENGINEERING TRACK DATA ── */

const T = {
  nextjs: { name: "Next.js", src: "/images/nextjslogo.png" },
  openai: { name: "OpenAI", src: "/images/openai logo.svg" },
  claude: { name: "Claude", src: "/images/claude logo.svg" },
  google: { name: "Google", src: "/images/google logo.png" },
  vercel: { name: "Vercel", src: "/images/vercel logo.svg" },
  react: { name: "React", src: "/images/react logo.png" },
  github: { name: "GitHub", src: "/images/github logo.png" },
  azure: { name: "Azure", src: "/images/azure logo.png" },
  stripe: { name: "Stripe", src: "/images/stripe logo.png" },
  neon: { name: "Neon", src: "/images/neon logo.webp" },
  cursor: { name: "Cursor", src: "/images/cursor logo.png" },
};

const aiWeeks = [
  {
    week: 1, title: "Foundations & Modern LLMs",
    subtitle: "Evolution, Architecture & Prompting",
    description: "Master the internals of modern LLMs. Understand how GPT-4o, Claude, and Gemini actually process tokens and how to architect systems around them using advanced prompting and structured outputs.",
    tools: [T.nextjs, T.openai, T.vercel, T.github],
    fullCurriculum: [
      {
        session: "Session 1 — Modern AI System Internals",
        topics: [
          "Evolution of LLMs: From transformers to GPT-4o, Claude 3.5, and Gemini 1.5 Pro",
          "How LLMs actually work: tokenisation, temperature, sampling, top-p, stop sequences",
          "Context windows explained: what goes in, what gets lost (lost-in-the-middle phenomena)",
          "Comparing model capabilities: benchmarks vs real-world production performance",
          "AI system design patterns: direct API, wrapper service, and gateway proxies",
          "Latency budgets and cost modelling: calculating TCO per token across providers",
          "Theoretical Audit: Reading AI vendor documentation like a senior engineer",
        ],
      },
      {
        session: "Session 2 — Advanced Prompting & Structured Logic",
        topics: [
          "Prompt engineering fundamentals: role prompting, few-shot examples, and chain-of-thought",
          "System prompts vs User prompts: defining 'unbreakable' personality and constraints",
          "Structured JSON outputs: response_format, strict mode, and Zod schema validation",
          "Prompt chaining: breaking complex tasks into reliable, sequential AI steps",
          "Common failure modes: hallucination, context stuffing, and prompt injection security",
          "Hands-on: building a reliable schema generator for unstructured data",
        ],
      },
    ],
  },
  {
    week: 2, title: "Shipping AI-Powered Interfaces",
    subtitle: "Next.js, UX & Token Streaming",
    description: "Build production-grade AI interfaces that feel instant. Master token streaming, server-side AI orchestration, and the unique UX challenges of conversational software.",
    tools: [T.nextjs, T.openai, T.react, T.vercel, T.cursor],
    fullCurriculum: [
      {
        session: "Session 1 — Next.js: The AI Application Framework",
        topics: [
          "Next.js App Router: Server Components vs Client Components for AI rendering",
          "Server Actions: triggering AI completions without complex API state management",
          "Architecture: Building streaming API routes with Vercel AI SDK",
          "Token streaming: implementing SSE (Server-Sent Events) for real-time output",
          "ReadableStreams: how to handle and pipe AI chunks from the LLM to the client",
        ],
      },
      {
        session: "Session 2 — Interactive AI UX & State",
        topics: [
          "Designing world-class chat interfaces: message history, auto-scrolling, and loading states",
          "Managing conversation state: client-side optimistic updates and persistent history",
          "Streaming UI patterns: rendering markdown, code blocks, and adaptive UI components",
          "Cursor AI workflow: writing production AI code with AI assistance and prompt-to-code",
          "UX Best Practices: handling 'AI thinking' states and graceful error recovery",
        ],
      },
    ],
  },
  {
    week: 3, title: "Data, Memory & Retrieval (RAG)",
    subtitle: "Postgres, Vector Stores & pgvector",
    description: "Give your AI product long-term memory. Implement a complete RAG (Retrieval-Augmented Generation) pipeline using Neon Postgres and advanced vector search.",
    tools: [T.neon, T.openai, T.nextjs, T.github, T.react],
    fullCurriculum: [
      {
        session: "Session 1 — Postgres & the Vector Pipeline",
        topics: [
          "Introduction to Neon: serverless Postgres for high-velocity AI apps",
          "Schema design for AI: storing conversation logs, user metadata, and vector IDs",
          "Vector Embeddings: text-embedding-3-small vs large — quality vs cost tradeoffs",
          "pgvector on Neon: implementing IVFFLAT vs HNSW indexes for sub-100ms search",
          "Vector distance metrics: choosing between Cosine Similarity, Dot Product, and L2",
        ],
      },
      {
        session: "Session 2 — The RAG Pipeline From Scratch",
        topics: [
          "Chunking strategies: fixed-size, recursive character, and semantic chunking explained",
          "The full RAG loop: ingestion → embedding → storage → retrieval → generation",
          "Hybrid search: combining BM25 keyword search with vector semantic search",
          "Handling hallucinations: confidence scoring and 'Grounding' with source citations",
          "Building a production RAG route in Next.js with multi-document support",
        ],
      },
    ],
  },
  {
    week: 4, title: "Advanced Agents & Multi-Model",
    subtitle: "Orchestration, Automation & Tool Use",
    description: "Build autonomous agents that can take actions. Orchestrate multiple models (GPT + Claude + Gemini) to handle complex engineering tasks without human intervention.",
    tools: [T.claude, T.openai, T.google, T.neon, T.vercel],
    fullCurriculum: [
      {
        session: "Session 1 — Multi-Model Orchestration",
        topics: [
          "Routing strategies: when to use Claude 3.5 for reasoning vs GPT-4o for speed",
          "Using Gemini 1.5 Pro for mass long-context summarisation and analysis",
          "Model fallbacks: building resilient systems that switch providers on failure",
          "ROI Optimization: choosing models based on cost, speed, and intelligence requirements",
        ],
      },
      {
        session: "Session 2 — Autonomous AI Agents",
        topics: [
          "Agent action loops: ReAct (Reason + Act) and reflection patterns explained",
          "Tool Use / Function Calling: defining schemas that allow AI to call external APIs",
          "Multi-agent orchestration: supervisor/worker patterns vs autonomous swarms",
          "Scheduling with Cron: using Vercel Cron to launch autonomous agent tasks",
          "Webhooks: triggering agent runs from external events (GitHub, Slack, etc.)",
        ],
      },
    ],
  },
  {
    week: 5, title: "Production, Scaling & Observability",
    subtitle: "Infrastructure, CI/CD & Analytics",
    description: "Scale your AI app to thousands of users. Master production deployment, automated pipelines, and deep observability across your model interactions.",
    tools: [T.nextjs, T.azure, T.vercel, T.github],
    fullCurriculum: [
      {
        session: "Session 1 — Scaling & Containerisation",
        topics: [
          "Vercel Edge performance: deploying AI logic to 100+ global regions",
          "Dockerising AI apps: building efficient multi-stage containers for Azure",
          "Azure Container Apps: scaling to zero and handling high-concurrency inference",
          "Infrastructure-as-Code: managing AI environment variables and secrets safely",
        ],
      },
      {
        session: "Session 2 — Observability & Analytics",
        topics: [
          "CI/CD with GitHub Actions: automated testing and deployment for AI pipelines",
          "Model Observability: implementing trace IDs and step-level telemetry with OpenTelemetry",
          "Production Monitoring: tracking token spend per user and model latency in real-time",
          "**Google Analytics integration**: tracking AI UX success and user journey metrics",
          "Error boundaries: catching and logging model failures in production",
        ],
      },
    ],
  },
  {
    week: 6, title: "Monetization & Capstone Launch",
    subtitle: "Stripe, Business Models & Final Ship",
    description: "Turn your engineering skills into revenue. Master complex Stripe integrations and finalize your capstone AI product for live launch.",
    tools: [T.stripe, T.nextjs, T.neon, T.vercel],
    fullCurriculum: [
      {
        session: "Session 1 — Payments & Revenue Strategy",
        topics: [
          "Integrating Stripe: from checkout sessions to subscription lifecycle management",
          "**Usage-based billing**: metering AI API calls and charging per-token in real-time",
          "Subscription logic: tiering features and model access (GPT-3.5 vs GPT-4o tiers)",
          "Webhook security: handling Stripe events (payment_succeeded, subscription_deleted)",
        ],
      },
      {
        session: "Session 2 — Capstone Sprint & Portfolio",
        topics: [
          "Capstone Build: final refinement of your core AI feature (chat, agent, or automation)",
          "Deployment Strategy: final go-live on production domain",
          "Growth & Iteration: collecting user feedback and planning v2 development",
          "Portfolio Day: documenting your technical build for LinkedIn and GitHub",
          "Graduation: peer review and verified certificate issuance for Cohort 04",
        ],
      },
    ],
  },
];

/* ── POWER PLATFORM TRACK DATA ── */

const PP = {
  powerapps: { name: "Power Apps", src: "/PowerApps.svg" },
  powerautomate: { name: "Power Automate", src: "/PowerAutomate.svg" },
  powerbi: { name: "Power BI", src: "/PowerBi.svg" },
  powerpages: { name: "Power Pages", src: "/PowerPages.svg" },
  powerplatform: { name: "Power Platform", src: "/PowerPlatform.svg" },
  azure: { name: "Azure", src: "/images/azure logo.png" },
};

const ppWeeks = [
  {
    week: 1, title: "Power Platform & Data Foundations",
    subtitle: "Ecosystem, Architecture & SQL",
    description: "Master the Microsoft Power Platform ecosystem and build a rock-solid data foundation. Understand environments, licensing, Dataverse architecture, and write production-grade SQL from day one.",
    tools: [PP.powerplatform, PP.powerapps, PP.powerbi, PP.azure],
    fullCurriculum: [
      {
        session: "Session 1 — Power Platform Ecosystem & Architecture",
        topics: [
          "Power Platform ecosystem: M365, Azure, and Power Platform integration landscape",
          "Roles of Power Apps, Power Automate, Power BI, and Copilot Studio in enterprise solutions",
          "Architecture patterns: environments, solutions, licensing, and governance",
          "General data concepts: transactional vs analytical, OLTP vs OLAP",
          "Data quality, integrity, governance, and normalisation vs denormalisation",
        ],
      },
      {
        session: "Session 2 — SQL Fundamentals & Dataverse",
        topics: [
          "SQL fundamentals: relational schemas, primary/foreign keys, constraints",
          "Core SQL: SELECT, WHERE, JOIN, GROUP BY, subqueries, and CTEs",
          "Window functions, indexing, and performance optimisation basics",
          "Dataverse fundamentals: table design, relationships, and business rules",
          "When to use Dataverse vs SQL vs SharePoint — choosing the right data layer",
          "Connecting SQL to Power Apps and Power BI: security and compliance basics",
        ],
      },
    ],
  },
  {
    week: 2, title: "Power Apps — Canvas & Model-Driven",
    subtitle: "Design, Architecture & Power Fx",
    description: "Build data-driven business applications from scratch. Master canvas app design, model-driven app architecture, and the Power Fx formula language for production-grade enterprise apps.",
    tools: [PP.powerapps, PP.powerplatform, PP.powerbi, PP.powerpages],
    fullCurriculum: [
      {
        session: "Session 1 — Canvas App Mastery",
        topics: [
          "Canvas app architecture: screens, forms, galleries, components, and containers",
          "Power Fx deep dive: Patch, Collect, LookUp, Filter, ForAll, and delegation patterns",
          "Handling delegation limits and large dataset performance optimisation",
          "Responsive design: building apps that work across mobile, tablet, and desktop",
          "Security roles and data-level access control in canvas apps",
        ],
      },
      {
        session: "Session 2 — Model-Driven Apps & Custom Components",
        topics: [
          "Model-driven app configuration: forms, views, dashboards, and business process flows",
          "Custom business logic: JavaScript web resources and plug-in architecture",
          "Component framework (PCF): building custom controls for advanced scenarios",
          "Offline capabilities and publishing strategies",
          "ALM and solution management for enterprise-grade deployments",
        ],
      },
    ],
  },
  {
    week: 3, title: "Power Automate — Workflows & RPA",
    subtitle: "Cloud Flows, Desktop Flows & Integration",
    description: "Automate every business process. Build automated, instant, and scheduled cloud flows, integrate with hundreds of connectors, and deploy robotic process automation for legacy systems.",
    tools: [PP.powerautomate, PP.powerapps, PP.powerplatform, PP.azure],
    fullCurriculum: [
      {
        session: "Session 1 — Cloud Automation Mastery",
        topics: [
          "Flow types: automated, instant, scheduled, and business process flows",
          "Using SQL and Dataverse as triggers and actions within flows",
          "Approval patterns: multi-stage, parallel, and conditional approval workflows",
          "Error handling: scopes, retries, exception patterns, and dead-letter strategies",
          "App-to-flow integration: triggering automations from Power Apps",
        ],
      },
      {
        session: "Session 2 — RPA & Advanced Integration",
        topics: [
          "Power Automate Desktop: automating legacy desktop applications and web scraping",
          "Data validation, transaction handling, and concurrency control",
          "Performance tuning with large datasets and premium connectors",
          "Governance: DLP policies, environment strategies, and ALM for automations",
          "Building end-to-end automated business processes across the platform",
        ],
      },
    ],
  },
  {
    week: 4, title: "Power BI — Data Modelling & DAX",
    subtitle: "Star Schema, Visualisation & Analytics",
    description: "Transform raw data into executive-level intelligence. Master star schema modelling, DAX calculations, and Power BI report design to deliver insights that drive business decisions.",
    tools: [PP.powerbi, PP.powerplatform, PP.azure, PP.powerapps],
    fullCurriculum: [
      {
        session: "Session 1 — Data Modelling & Architecture",
        topics: [
          "BI fundamentals: KPIs, metrics, dimensions, measures, and reporting strategy",
          "Star schema and dimensional modelling: fact tables, dimension tables, and relationships",
          "Import vs DirectQuery vs Composite models — choosing the right strategy",
          "Using SQL views for analytics and model performance optimisation",
          "Power Query ETL: advanced data transformation and M language patterns",
        ],
      },
      {
        session: "Session 2 — DAX & Visualisation Mastery",
        topics: [
          "DAX fundamentals: calculated columns, measures, and evaluation context",
          "Time intelligence patterns: YTD, MTD, same-period comparisons, and moving averages",
          "Advanced DAX: CALCULATE, iterators, and context transition",
          "Report design: best practices for executive dashboards and drill-through reports",
          "Performance optimisation: DAX Studio, Performance Analyzer, and best practices",
        ],
      },
    ],
  },
  {
    week: 5, title: "Copilot Studio & Integration",
    subtitle: "AI Assistants, Pages & Enterprise Security",
    description: "Build intelligent AI-powered copilots and publish secure external portals. Master Copilot Studio for custom AI assistants and Power Pages for client-facing business solutions.",
    tools: [PP.powerplatform, PP.powerpages, PP.powerapps, PP.powerbi],
    fullCurriculum: [
      {
        session: "Session 1 — Copilot Studio & AI Assistants",
        topics: [
          "Copilot Studio fundamentals: topics, entities, and conversational AI design",
          "Integrating Copilot with Dataverse, SharePoint, and custom APIs",
          "Generative AI in Copilot: grounding responses with enterprise knowledge bases",
          "Publishing copilots across Teams, websites, and mobile applications",
          "Testing, analytics, and continuous improvement for AI assistants",
        ],
      },
      {
        session: "Session 2 — Power Pages & Enterprise Integration",
        topics: [
          "Power Pages architecture: site design, templates, and content management",
          "Dataverse integration: forms, lists, and data display for external users",
          "Row-Level Security (RLS) in Power BI: implementing data access governance",
          "Embedding Power BI in Power Apps and Microsoft Teams",
          "Cross-platform integration: connecting Power Platform with Azure services",
        ],
      },
    ],
  },
  {
    week: 6, title: "Capstone & Certification",
    subtitle: "Enterprise Solution & Portfolio Delivery",
    description: "Deliver a production-grade enterprise solution that demonstrates mastery across the full Power Platform stack. Graduate with a verified Standex certification and a portfolio-ready case study.",
    tools: [PP.powerapps, PP.powerautomate, PP.powerbi, PP.powerpages],
    fullCurriculum: [
      {
        session: "Session 1 — Capstone Architecture & Build",
        topics: [
          "Capstone project design: SQL + Dataverse backend architecture",
          "Building the Power App front-end with enterprise UX patterns",
          "Implementing Power Automate workflows for business process automation",
          "Power BI analytics dashboard: real-time KPIs and executive reporting",
          "End-to-end governance: security, ALM, and deployment strategy",
        ],
      },
      {
        session: "Session 2 — Presentation & Graduation",
        topics: [
          "Capstone documentation: technical architecture and business case study",
          "Live demonstration and peer review of completed solutions",
          "Growth and iteration: collecting stakeholder feedback for v2 planning",
          "Portfolio Day: documenting your build for LinkedIn and professional profiles",
          "Graduation: verified certificate issuance — Standex Certified Power Platform Developer",
        ],
      },
    ],
  },
];

/* ── TRACK CONFIGURATION ── */

type Track = "ai" | "pp";

const trackConfig = {
  ai: {
    label: "AI Engineering",
    tag: "Engineering Curriculum 2026",
    weeks: aiWeeks,
    price: "$1800",
    oldPrice: "$3500",
    cohort: "Cohort 04 — Active Enrollment",
    cohortDate: "May 5",
    duration: "6 Weeks",
    sessions: "2h 30m / session",
    enrollLink: "https://buy.stripe.com/28E4gB0JK6Z8dDi697fnO0j",
    certTitle: "Applied AI Engineer",
    certTag: "SXAI-V26-04",
    deckLink: "/ai-deck",
    cohortLabel: "Applied Cohort 04",
    color: "#049DCB",
    mastery: [
      "Multi-Agent Orchestration",
      "Vector-driven Memory (RAG)",
      "Stripe Token-Billing",
      "Azure/Vercel Auto-Scaling",
      "Observability & Analytics",
      "Production README & Case Study"
    ],
  },
  pp: {
    label: "Power Platform Developer",
    tag: "Developer Curriculum 2026",
    weeks: ppWeeks,
    price: "$1500",
    oldPrice: "$3000",
    cohort: "Cohort 04 — Now Enrolling",
    cohortDate: "Jun 2",
    duration: "6 Weeks",
    sessions: "2h 30m / session",
    enrollLink: "https://buy.stripe.com/dRmeVfdwwcjsdDigNLfnO0k",
    certTitle: "Certified Power Platform Developer",
    certTag: "SXPP-V26-04",
    deckLink: "/pp-deck",
    cohortLabel: "Power Platform Cohort 04",
    color: "#049DCB",
    mastery: [
      "Canvas & Model-Driven Apps",
      "Cloud & Desktop Automation",
      "Star Schema BI Modelling",
      "DAX & Power Query Mastery",
      "Copilot Studio Integration",
      "Enterprise ALM & Governance"
    ],
  },
};

/* ── SHARED UI COMPONENTS ── */

const floatingNodes = [
  { top: "15%", left: "20%", size: 4, delay: 0, moveX: 30, moveY: -40 },
  { top: "25%", left: "75%", size: 6, delay: 2, moveX: -20, moveY: 50 },
  { top: "60%", left: "10%", size: 3, delay: 5, moveX: 40, moveY: 20 },
  { top: "80%", left: "80%", size: 5, delay: 1, moveX: -30, moveY: -30 },
  { top: "40%", left: "40%", size: 8, delay: 3, moveX: 20, moveY: -20 },
];

function AIBackground({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hero-panning {
          0% { transform: translateY(0) translateX(0); }
          100% { transform: translateY(-60px) translateX(-60px); }
        }
        @keyframes hero-scanner {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
      `}} />
      <div 
        className="absolute w-[150%] h-[150%] top-0 left-0"
        style={{ 
          backgroundImage: `linear-gradient(to right, ${color}10 1px, transparent 1px), linear-gradient(to bottom, ${color}10 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
          animationName: "hero-panning",
          animationDuration: "40s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite"
        }}
      />
      <div 
        className="absolute w-full h-[2px]"
        style={{ 
          backgroundImage: `linear-gradient(to right, transparent, ${color}33, transparent)`,
          animationName: "hero-scanner",
          animationDuration: "10s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite"
        }}
      />
      {floatingNodes.map((node, i) => (
        <motion.div
           key={i}
           className="absolute rounded-full shadow-[0_0_8px_rgba(124,92,252,0.4)]"
           style={{ top: node.top, left: node.left, width: node.size, height: node.size, backgroundColor: color }}
           animate={{ y: [0, node.moveY, 0], x: [0, node.moveX, 0], opacity: [0.1, 0.4, 0.1] }}
           transition={{ duration: 15 + i*3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MagneticLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex w-full">
      <Link href={href} className={className}>
        {children}
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>
    </div>
  );
}

/* ── MAIN PAGE COMPONENT ── */

export default function TrainingPage() {
  const [activeTrack, setActiveTrack] = useState<Track>("ai");
  const [activeWeek, setActiveWeek] = useState(1);
  const [showCertificate, setShowCertificate] = useState(false);

  const cfg = trackConfig[activeTrack];
  const weeks = cfg.weeks;
  const w = weeks.find(wk => wk.week === activeWeek) || weeks[0];

  const stats = [
    { label: "Duration", value: cfg.duration, id: "duration" },
    { label: "Next Cohort", value: cfg.cohortDate, id: "cohort" },
    { label: "Sessions", value: cfg.sessions, id: "sessions" },
  ];

  const handleTrackSwitch = (track: Track) => {
    setActiveTrack(track);
    setActiveWeek(1);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] selection:bg-[#7C5CFC]/15 font-sans pb-24 overflow-x-hidden">
      <Script id="training-page-conversion" strategy="afterInteractive">
        {`gtag('event', 'conversion', {'send_to': 'AW-17962581203/ZfLnCM-w_vobENP5nPVC'});`}
      </Script>
      <TopNav forceDark />

      {/* ── PREMIUM BACKGROUND ARCHITECTURE ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AIBackground color={cfg.color} />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] blur-[120px]" style={{ background: `radial-gradient(circle at center, ${cfg.color}0D 0%, transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] blur-[100px]" style={{ background: `radial-gradient(circle at center, ${cfg.color}08 0%, transparent 70%)` }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="relative z-10 pt-32">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

          {/* ── TRACK TOGGLE ── */}
          <div className="flex justify-center mb-16">
            <div className="bg-white/80 backdrop-blur-md border border-zinc-200/60 rounded-[20px] p-1.5 flex gap-1 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.03)]">
              {(["ai", "pp"] as Track[]).map((track) => (
                <button
                  key={track}
                  onClick={() => handleTrackSwitch(track)}
                  className={`relative px-6 py-3.5 rounded-[16px] text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${
                    activeTrack === track
                      ? "text-white"
                      : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
                  }`}
                >
                  {activeTrack === track && (
                    <motion.div
                      layoutId="active-track-tab"
                      className="absolute inset-0 shadow-[0_8px_20px_-4px_rgba(124,92,252,0.4)]"
                      style={{ backgroundColor: trackConfig[track].color }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {track === "ai" ? <Bot className="h-4 w-4" /> : <Image src="/PowerPlatform.svg" width={16} height={16} alt="PP" className="h-4 w-4" />}
                    {trackConfig[track].label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            
            {/* LEFT COLUMN: CURRICULUM CONSOLE */}
            <div className="flex-1 w-full min-w-0">
              
              {/* CONSOLE HEADER & RAIL */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-8">
                  <span className="h-[1px] w-12 bg-zinc-200" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: cfg.color }}>
                    {cfg.tag}
                  </span>
                </div>

                {/* CONSOLE-STYLE NAVIGATION RAIL */}
                <div className="bg-white/80 backdrop-blur-md border border-zinc-200/60 rounded-[24px] p-2 flex gap-1 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.03)] overflow-x-auto no-scrollbar">
                  {weeks.map((weekData) => (
                    <button
                      key={weekData.week}
                      onClick={() => setActiveWeek(weekData.week)}
                      className={`relative px-4 py-4 rounded-[18px] text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden flex-1 ${
                        activeWeek === weekData.week
                          ? "text-white"
                          : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      {activeWeek === weekData.week && (
                        <motion.div
                          layoutId="active-week-tab"
                          className="absolute inset-0 shadow-[0_8px_20px_-4px_rgba(124,92,252,0.4)]"
                          style={{ backgroundColor: cfg.color }}
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">Week {weekData.week < 10 ? `0${weekData.week}` : weekData.week}</span>
                    </button>
                  ))}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTrack}-${activeWeek}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* HERO SECTION FOR ACTIVE WEEK */}
                  <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-950 tracking-tight leading-[0.95] mb-8 italic">
                      {w.title}
                    </h2>
                    
                    <p className="text-xl md:text-2xl text-zinc-500 font-medium leading-[1.4] max-w-4xl mb-12">
                      {w.description}
                    </p>
                  </div>

                  {/* MASTERCLASS SYLLABUS CARDS */}
                  <div className="space-y-10">
                    <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.3em] text-zinc-400 mb-6">
                      <Layers className="h-4 w-4" /> Syllabus Architecture
                    </div>
                    
                    <div className="grid grid-cols-1 gap-12 lg:gap-16">
                      {w.fullCurriculum.map((group, gi) => (
                        <div key={gi} className="group relative">
                          <div className="absolute -inset-x-8 -inset-y-6 bg-transparent group-hover:bg-violet-50/50 rounded-[40px] transition-colors duration-500 -z-10" />
                          
                          <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="flex flex-col items-center shrink-0">
                               <div 
                                 className="h-12 w-12 rounded-2xl flex items-center justify-center text-lg font-bold text-white shadow-[0_8px_20px_rgba(0,0,0,0.1)] transition-colors duration-500"
                                 style={{ backgroundColor: activeTrack === "ai" ? "#18181b" : "#049DCB" }}
                               >
                                 {gi + 1}
                               </div>
                               <div className="w-[2px] h-full flex-1 bg-zinc-100 group-last:hidden mt-4" />
                            </div>
                            
                            <div className="flex-1 pt-1">
                               <div className="flex items-center gap-3 mb-4">
                                 <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: cfg.color }}>Session 0{gi + 1} Intensive</span>
                                 <span className="h-1 w-1 rounded-full bg-zinc-300" />
                                 <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 underline decoration-violet-200 underline-offset-4">Live Lab</span>
                               </div>
                               <h3 className="text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight leading-tight mb-8">
                                 {group.session}
                               </h3>
                               
                               <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                  {group.topics.map((topic, ti) => (
                                     <li key={ti} className="flex items-start gap-4 text-base font-semibold text-zinc-600 leading-relaxed hover:text-zinc-900 transition-all transform hover:translate-x-1">
                                       <div className="mt-2.5 h-1.5 w-1.5 rounded-full shrink-0 transition-colors" style={{ backgroundColor: `${cfg.color}4D` }} />
                                       {topic}
                                     </li>
                                  ))}
                               </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* RIGHT COLUMN: FLOATING GLASS SIDEBAR */}
            <div className="lg:w-[460px] shrink-0 sticky top-12 flex flex-col gap-6 w-full">
              
              {/* TECH STACK CARD */}
              <div className="bg-zinc-50/50 backdrop-blur-xl rounded-[32px] border border-zinc-200/50 p-6 flex flex-col gap-6">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em]" style={{ color: cfg.color }}>Module Toolchain</p>
                <div className="grid grid-cols-2 gap-4">
                   {w.tools.map((tool, ti) => (
                      <div key={ti} className="flex items-center gap-3 bg-white/80 p-3 rounded-2xl border border-zinc-100 shadow-sm transition-all hover:border-zinc-300 group">
                         <div className="h-10 w-10 shrink-0 relative p-1">
                            <Image src={tool.src} alt={tool.name} fill className="object-contain" unoptimized />
                         </div>
                         <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-950 truncate">{tool.name}</span>
                      </div>
                   ))}
                </div>
              </div>

              {/* PRICE & STATS CARD */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative group p-[1px] rounded-[32px] bg-gradient-to-b from-white/20 to-zinc-200/20"
              >
                <div className="flex flex-col bg-white/80 backdrop-blur-3xl rounded-[31px] border border-zinc-200 shadow-[0_32px_80px_-20px_rgba(0,0,0,0.06)] p-8 overflow-hidden relative">
                  
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: cfg.color }}>
                        {cfg.cohort}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 mb-8">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Early Access Pricing</span>
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-5xl font-bold tracking-tight text-zinc-950 leading-none">
                        {cfg.price}
                      </h3>
                      <span className="text-base font-bold text-zinc-400 uppercase tracking-widest line-through decoration-zinc-950/20">{cfg.oldPrice}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-1 mb-8 bg-zinc-50/50 rounded-2xl p-2">
                    {stats.map(s => (
                      <div key={s.id} className="flex items-center justify-between py-3 border-b border-zinc-100 last:border-0 hover:translate-x-1 transition-transform px-3">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70" style={{ color: cfg.color }}>{s.label}</span>
                        <span className="text-xs font-bold text-zinc-950 uppercase tracking-tight">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <MagneticLink 
                    href={cfg.enrollLink} 
                    className="group relative w-full inline-flex items-center justify-center gap-4 rounded-[20px] px-8 py-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] transition-all duration-500 active:scale-95 mb-4 z-20"
                  >
                    <span 
                      className="absolute inset-0 rounded-[20px] transition-all duration-500 hover:opacity-90"
                      style={{ backgroundColor: cfg.color }}
                    />
                    <span className="relative z-30 text-[13px] font-bold uppercase tracking-[0.2em] text-white">Enroll Now</span> 
                    <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-2 transition-transform relative z-30" />
                  </MagneticLink>

                  <div className="flex items-center justify-center gap-2 pt-2">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 italic">
                      Verified {cfg.cohortLabel} Graduation Path
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* ENQUIRE BUTTON — scrolls to enquiry form below */}
              <button
                type="button"
                onClick={() =>
                  document.getElementById("training-enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="w-full inline-flex items-center justify-center gap-3 rounded-2xl border-2 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-70 active:scale-95"
                style={{ borderColor: cfg.color, color: cfg.color }}
              >
                Enquire Now
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Graduate Trust Segment */}
              <div className="px-10 py-6 bg-zinc-50/50 rounded-[32px] border border-zinc-100 flex flex-col gap-4">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                   {activeTrack === "ai" ? "Trusted by Engineering Teams" : "Microsoft Learning Partner"}
                 </p>
                 <div className="flex gap-4 opacity-30 grayscale saturate-0">
                    {activeTrack === "ai" ? (
                      <>
                        <div className="h-5 w-5 border-2 border-zinc-950 rounded-sm" />
                        <div className="h-5 w-5 border-2 border-zinc-950 rounded-full" />
                        <div className="h-5 w-12 border-2 border-zinc-950 rounded-full" />
                      </>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23" width="40" height="40">
                        <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                        <rect x="12" y="1" width="10" height="10" fill="#7FBA00" />
                        <rect x="1" y="12" width="10" height="10" fill="#00A4EF" />
                        <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
                      </svg>
                    )}
                 </div>
              </div>

            </div>

          </div>

          {/* CAPSTONE MASTERY SECTION */}
          <section className="mt-32 pt-20 border-t border-zinc-100 mb-20">
             <div className="flex flex-col items-center text-center mb-16">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 mb-4">
                   <Sparkles className="h-3.5 w-3.5 text-violet-500" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">Verification Phase</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.03em] text-zinc-950 mb-4 italic uppercase">Capstone Graduation Mastery</h2>
                <p className="text-zinc-500 font-medium max-w-2xl px-4">Demonstrate your engineering expertise to the world.</p>
             </div>

             <div className="max-w-4xl mx-auto">
                <div className="group relative p-[1px] rounded-[40px] bg-gradient-to-br from-violet-200/50 via-zinc-200/50 to-violet-200/50">
                   <div className="bg-white/90 backdrop-blur-3xl rounded-[39px] p-10 lg:p-16 border border-white shadow-xl overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                         <GraduationCap className="h-64 w-64 text-violet-950" />
                      </div>

                      <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                         <div className="flex-1">
                            <h3 className="text-3xl font-bold text-zinc-950 uppercase italic tracking-tight mb-6">Mastery Requirements</h3>
                            <p className="text-lg font-semibold text-zinc-600 leading-relaxed mb-10">
                               {activeTrack === "ai" 
                                 ? "The capstone requirement is a **full AI product** with all the features taught in the course—autonomous agents, RAG, usage-based billing, and deep observability. Every project is **personally tested by our team** for production-grade reliability and architectural integrity."
                                 : "The capstone requirement is a **full enterprise Power Platform solution** spanning Power Apps, Power Automate, Power BI analytics, and Copilot integration. Every solution is **personally assessed** for governance, data architecture, and real-world business impact."
                               }
                            </p>
                            
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-10">
                               {cfg.mastery.map((feat, fi) => (
                                 <div key={fi} className="flex items-center gap-3">
                                    <div className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{feat}</span>
                                 </div>
                               ))}
                            </div>

                            <button 
                               onClick={() => setShowCertificate(true)}
                               className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-violet-50 border border-violet-100 text-[11px] font-bold uppercase tracking-[0.2em] text-violet-600 hover:bg-violet-100 transition-all group"
                            >
                               View Digital Mastery Badge <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                            </button>
                         </div>

                         <div className="w-full md:w-80 shrink-0">
                            <motion.div 
                               whileHover={{ scale: 1.05, rotate: -2 }}
                               onClick={() => setShowCertificate(true)}
                               className="cursor-pointer relative group"
                            >
                               <div className="absolute -inset-4 bg-violet-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                               <div className="relative aspect-[1/1] rounded-24 overflow-hidden border-8 border-white shadow-2xl p-6 flex flex-col justify-between" style={{ backgroundColor: activeTrack === "ai" ? "#18181b" : "#002642" }}>
                                  <div className="flex justify-between items-start">
                                     <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                                        <div className="h-4 w-4 rounded-full animate-pulse" style={{ backgroundColor: cfg.color }} />
                                     </div>
                                     <span className="text-[8px] font-bold text-white/40 uppercase tracking-[0.3em]">{cfg.certTag}</span>
                                  </div>
                                  <div className="space-y-2">
                                     <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: cfg.color }}>
                                       {activeTrack === "ai" ? "Mastery Level 04" : "Mastery Level 01"}
                                     </p>
                                     <p className="text-sm font-bold text-white uppercase italic tracking-tighter">{cfg.certTitle}</p>
                                  </div>
                                  <div className="h-1 w-full" style={{ background: `linear-gradient(to right, ${cfg.color}, rgba(255,255,255,0.2), transparent)` }} />
                               </div>
                            </motion.div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* TRAINING ENQUIRY SECTION */}
          <section
            id="training-enquiry"
            className="mt-4 mb-20 scroll-mt-24 rounded-[40px] bg-zinc-950 px-6 py-16 sm:px-12 lg:px-16"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 mb-4">
                  <GraduationCap className="h-3.5 w-3.5 text-violet-400" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">Cohort Enquiry</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">Have questions about this track?</h2>
                <p className="text-zinc-400 font-medium">Tell us what you&apos;re looking to build and we&apos;ll get back to you shortly.</p>
              </div>
              <ContactEnquiryForm
                defaultEnquiryType="Training & Academy"
                eyebrow="Training Enquiry"
                heading="Reserve your seat or ask a question."
              />
            </div>
          </section>

        </div>
      </div>

      {/* CERTIFICATE LIGHTBOX MODAL */}
      <AnimatePresence>
        {showCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCertificate(false)}
            className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-zinc-950/95 backdrop-blur-xl cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, rotateX: 10 }}
              animate={{ scale: 1, rotateX: 0 }}
              exit={{ scale: 0.8, rotateX: 10 }}
              className="relative max-w-[900px] w-full aspect-square md:aspect-[1.414/1] rounded-sm overflow-hidden shadow-[0_32px_120px_-20px_rgba(0,0,0,0.3)] bg-white p-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full relative border-[12px] border-double border-zinc-100 p-8 lg:p-12 flex flex-col justify-between items-center text-zinc-950">
                 <div className="absolute inset-4 border border-zinc-200 pointer-events-none" />
                 
                 <div className="flex flex-col items-center gap-2 relative z-10 w-full mb-2">
                    <div className="relative h-20 w-56">
                       <Image 
                          src="/standexailogo.png" 
                          alt="Standex Digital Logo" 
                          fill 
                          className="object-contain"
                          unoptimized 
                       />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                       <span className="text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: cfg.color }}>
                        {activeTrack === "ai" ? "Applied AI Engineering Hub" : "Power Platform Development Hub"}
                       </span>
                       <div className="h-[1px] w-32 bg-zinc-200 mt-1" />
                    </div>
                 </div>

                 <div className="flex flex-col items-center text-center gap-6 relative z-10 w-full">
                    <div className="space-y-2">
                       <p className="text-[12px] font-medium uppercase tracking-[0.3em] text-zinc-400">This is to certify that</p>
                       <h2 className="text-5xl md:text-7xl font-bold text-zinc-950 uppercase tracking-tighter leading-none font-serif pt-2 pb-6 border-b-2 border-zinc-100 px-12 min-w-[450px]">
                          John Doe
                       </h2>
                    </div>

                    <div className="flex flex-col items-center gap-4 max-w-2xl px-12">
                       <p className="text-[14px] font-bold text-zinc-900 uppercase tracking-[0.4em]">{cfg.certTitle}</p>
                       <p className="text-zinc-500 font-medium text-base leading-relaxed">
                         {activeTrack === "ai"
                           ? "Awarded for mastering Multi-Agent Orchestration, production-grade RAG architectures, and the deployment of scalable AI systems."
                           : "Awarded for mastering the Microsoft Power Platform stack, enterprise data modelling, and the delivery of production-grade business solutions."
                         }
                       </p>
                    </div>
                 </div>

                 <div className="w-full flex justify-between items-end relative z-10 px-8 pt-4">
                    <div className="flex flex-col items-center gap-1">
                       <div className="h-[1px] w-40 bg-zinc-300" />
                       <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-950">Issuance Date</p>
                       <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">October 24, 2026</p>
                    </div>

                    <div className="relative group">
                       <div className="h-20 w-20 rounded-full border-4 border-double border-violet-100 flex items-center justify-center bg-violet-50/30 transform rotate-12 transition-transform group-hover:rotate-0">
                          <ShieldCheck className="h-8 w-8 text-violet-600/30" />
                          <div className="absolute inset-0 flex items-center justify-center">
                             <span className="text-[5px] font-bold text-violet-600/20 uppercase tracking-tighter leading-none transform -rotate-45">Certified SXAI Engineer</span>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                       <div className="h-[1px] w-40 bg-zinc-300" />
                       <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-950">Verification</p>
                       <code className="text-[8px] font-mono text-violet-500/50 font-bold tracking-tighter">
                          {cfg.certTag}
                       </code>
                    </div>
                 </div>
              </div>

              <button 
                onClick={() => setShowCertificate(false)}
                className="absolute top-6 right-6 h-10 w-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors z-30"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
