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

/* ── AI AT WORK TRACK DATA ── */

const T = {
  chatgpt: { name: "ChatGPT", src: "/images/tools/chatgpt.svg" },
  claude: { name: "Claude", src: "/images/tools/claude.svg" },
  gemini: { name: "Gemini", src: "/images/tools/gemini.svg" },
  copilot: { name: "Copilot", src: "/images/tools/copilot.svg" },
  perplexity: { name: "Perplexity", src: "/images/tools/perplexity.svg" },
  notion: { name: "Notion", src: "/images/tools/notion.svg" },
  outlook: { name: "Outlook", src: "/images/tools/outlook.svg" },
  gmail: { name: "Gmail", src: "/images/tools/gmail.svg" },
  word: { name: "Word", src: "/images/tools/word.svg" },
  powerpoint: { name: "PowerPoint", src: "/images/tools/powerpoint.svg" },
  excel: { name: "Excel", src: "/images/tools/excel.svg" },
  sheets: { name: "Google Sheets", src: "/images/tools/googlesheets.svg" },
  canva: { name: "Canva", src: "/images/tools/canva.svg" },
  zapier: { name: "Zapier", src: "/images/tools/zapier.svg" },
  make: { name: "Make", src: "/images/tools/make.svg" },
  n8n: { name: "n8n", src: "/images/tools/n8n.svg" },
  slack: { name: "Slack", src: "/images/tools/slack.svg" },
  teams: { name: "Teams", src: "/images/tools/teams.svg" },
  drive: { name: "Google Drive", src: "/images/tools/googledrive.svg" },
  sharepoint: { name: "SharePoint", src: "/images/tools/sharepoint.svg" },
  powerautomate: { name: "Power Automate", src: "/PowerAutomate.svg" },
  copilotstudio: { name: "Copilot Studio", src: "/CopilotStudio.svg" },
};

const aiWeeks = [
  {
    week: 1, title: "AI Foundations for Real Work",
    subtitle: "Tools, Prompting & Safe Use",
    description: "Get confident with the AI tools your colleagues are already using. Learn what ChatGPT, Claude, Gemini and Copilot are each best at, how to prompt them for reliable results, and how to use them without leaking company data.",
    tools: [T.chatgpt, T.claude, T.gemini, T.copilot],
    fullCurriculum: [
      {
        session: "Session 1 — Choosing the Right AI Tool",
        topics: [
          "What today's AI assistants can and can't do — and why they sometimes make things up",
          "ChatGPT vs Claude vs Gemini vs Microsoft Copilot: strengths, pricing and when to use each",
          "Free vs paid plans, and what your company licence (M365 / Google Workspace) already includes",
          "Uploading files, images and spreadsheets — getting answers from your own documents",
          "Data privacy at work: what never to paste into a public AI tool",
          "Hands-on: audit your week and list 10 tasks AI could speed up",
        ],
      },
      {
        session: "Session 2 — Prompting That Actually Works",
        topics: [
          "A simple prompt framework: role, task, context, format, and examples",
          "Getting consistent output: templates, tone of voice and reusable instructions",
          "Iterating instead of starting over — refining drafts in conversation",
          "Checking AI answers: spotting errors, asking for sources and verifying facts",
          "Building your personal prompt library for repeat tasks",
          "Hands-on: turn three of your real tasks into reusable prompts",
        ],
      },
    ],
  },
  {
    week: 2, title: "Writing, Email & Documents",
    subtitle: "Inbox, Reports, Proposals & Slides",
    description: "Cut the hours spent writing. Use AI to clear your inbox, draft reports and proposals, summarise long documents and meetings, and turn rough notes into polished slide decks.",
    tools: [T.outlook, T.gmail, T.word, T.powerpoint, T.notion, T.canva],
    fullCurriculum: [
      {
        session: "Session 1 — Inbox & Everyday Writing",
        topics: [
          "Drafting and replying to emails in Outlook and Gmail with Copilot and Gemini",
          "Summarising long email threads and pulling out action items",
          "Writing in your organisation's tone: style guides as AI instructions",
          "Meeting notes: turning Teams / Meet transcripts into summaries and follow-ups",
          "Rewriting for different audiences — executives, clients and non-experts",
        ],
      },
      {
        session: "Session 2 — Reports, Proposals & Presentations",
        topics: [
          "From outline to first draft: reports, policies and SOPs in Word and Notion",
          "Summarising 50-page documents and comparing contracts or tenders",
          "Building slide decks from a brief with Copilot in PowerPoint and Canva",
          "Creating visuals, social posts and simple graphics with AI image tools",
          "Hands-on: produce a real proposal or report from your own job, start to finish",
        ],
      },
    ],
  },
  {
    week: 3, title: "Research, Data & Spreadsheets",
    subtitle: "Excel, Sheets & AI Analysis",
    description: "Make faster, better-informed decisions. Use AI for desk research with sources, clean and analyse spreadsheets, write formulas you'd never remember, and turn numbers into clear charts and insights.",
    tools: [T.perplexity, T.excel, T.sheets, T.chatgpt, T.copilot],
    fullCurriculum: [
      {
        session: "Session 1 — AI-Powered Research",
        topics: [
          "Research with citations: Perplexity, ChatGPT search and Gemini Deep Research",
          "Competitor, market and supplier research in a fraction of the time",
          "Summarising industry reports, regulations and long PDFs",
          "Fact-checking and judging source quality before you share findings",
          "Hands-on: produce a one-page research brief for a real decision at work",
        ],
      },
      {
        session: "Session 2 — Spreadsheets & Data Analysis",
        topics: [
          "Copilot in Excel and Gemini in Sheets: asking questions of your data in plain English",
          "Writing and explaining formulas — XLOOKUP, IFs, SUMIFS and text cleanup",
          "Cleaning messy exports: duplicates, dates, inconsistent names",
          "Uploading data to ChatGPT for analysis, charts and trend spotting",
          "Turning analysis into a short summary your manager will actually read",
        ],
      },
    ],
  },
  {
    week: 4, title: "Automate Repetitive Workflows",
    subtitle: "Zapier, Make, n8n & Power Automate",
    description: "Stop doing the same task twice. Connect your apps and add AI steps to build automations that sort email, capture leads, update spreadsheets and send reports while you work on what matters.",
    tools: [T.zapier, T.make, T.n8n, T.powerautomate, T.slack, T.teams],
    fullCurriculum: [
      {
        session: "Session 1 — Automation Basics",
        topics: [
          "How automations work: triggers, actions, filters and schedules",
          "Choosing a platform: Zapier, Make, n8n or Power Automate for your company's stack",
          "Your first automation: form submission → spreadsheet → Slack / Teams alert",
          "Adding AI steps: classify, summarise or draft replies inside a workflow",
          "Hands-on: automate one recurring task from your own week",
        ],
      },
      {
        session: "Session 2 — Real Business Workflows",
        topics: [
          "Email triage: auto-label, summarise and route incoming requests",
          "Lead and customer flows: capture, enrich, and update your CRM",
          "Scheduled reports: weekly numbers pulled, summarised and emailed automatically",
          "Approvals and handoffs across Outlook, Teams and SharePoint",
          "Error handling, testing, and keeping automations maintainable",
        ],
      },
    ],
  },
  {
    week: 5, title: "AI Assistants for Your Team",
    subtitle: "Custom GPTs, Projects & Copilot Studio",
    description: "Build assistants that know your business. Create custom GPTs, Claude Projects and Gemini Gems trained on your documents, and deploy a team assistant in Teams or Slack that answers questions from your knowledge base.",
    tools: [T.chatgpt, T.claude, T.gemini, T.copilotstudio, T.sharepoint, T.drive],
    fullCurriculum: [
      {
        session: "Session 1 — Personal & Team Assistants",
        topics: [
          "Custom GPTs, Claude Projects and Gemini Gems: what they are and when to use them",
          "Writing assistant instructions that keep answers on-brand and accurate",
          "Grounding assistants in your files — policies, product docs, FAQs",
          "Sharing assistants with your team and managing access",
          "Hands-on: build an onboarding or HR-policy assistant",
        ],
      },
      {
        session: "Session 2 — Agents & Knowledge Bases",
        topics: [
          "AI agents explained: assistants that take actions, not just answer questions",
          "Copilot Studio: a company Q&A bot over SharePoint, published to Teams",
          "Connecting Google Drive and SharePoint as knowledge sources",
          "Customer-facing assistants: support FAQs and website chat, with human handoff",
          "Testing, feedback loops and measuring whether the assistant helps",
        ],
      },
    ],
  },
  {
    week: 6, title: "Responsible AI & Capstone",
    subtitle: "Policy, ROI & Your Workflow Project",
    description: "Lead AI adoption with confidence. Learn the governance, risk and ROI basics employers expect, then deliver a capstone: a real workflow from your job, rebuilt with AI and measured in hours saved.",
    tools: [T.copilot, T.chatgpt, T.zapier, T.notion],
    fullCurriculum: [
      {
        session: "Session 1 — Using AI Responsibly at Work",
        topics: [
          "Company AI policies: acceptable use, approved tools and data classification",
          "Bias, accuracy and accountability — keeping a human in the loop",
          "Copyright, confidentiality and regulation basics (GDPR, EU AI Act)",
          "Measuring ROI: time saved, quality gained, and the cost of tools",
          "Rolling AI out to a team: training, champions and change management",
        ],
      },
      {
        session: "Session 2 — Capstone & Certification",
        topics: [
          "Capstone: redesign a real workflow from your job using AI and automation",
          "Before/after metrics: documenting hours saved and output quality",
          "Presenting your project to the cohort and getting peer feedback",
          "Portfolio and LinkedIn: showing employers your AI skills",
          "Graduation: verified Standex certificate issued",
        ],
      },
    ],
  },
];

/* ── POWER BI & AUTOMATION TRACK DATA ── */

const PP = {
  excel: { name: "Excel", src: "/images/tools/excel.svg" },
  sql: { name: "SQL", src: "/images/tools/sql.svg" },
  powerbi: { name: "Power BI", src: "/PowerBi.svg" },
  powerautomate: { name: "Power Automate", src: "/PowerAutomate.svg" },
  powerapps: { name: "Power Apps", src: "/PowerApps.svg" },
  copilot: { name: "Copilot", src: "/images/tools/copilot.svg" },
  fabric: { name: "Fabric", src: "/images/tools/fabric.svg" },
  teams: { name: "Teams", src: "/images/tools/teams.svg" },
  sharepoint: { name: "SharePoint", src: "/images/tools/sharepoint.svg" },
  outlook: { name: "Outlook", src: "/images/tools/outlook.svg" },
};

const ppWeeks = [
  {
    week: 1, title: "Excel to Analyst Foundations",
    subtitle: "Cleaning Data, Pivots & KPIs",
    description: "Start where most business data lives. Level up from basic spreadsheets to analyst-grade Excel: clean messy exports with Power Query, summarise with PivotTables, and define the KPIs that matter to the business.",
    tools: [PP.excel, PP.copilot, PP.sharepoint, PP.powerbi],
    fullCurriculum: [
      {
        session: "Session 1 — How Analysts Think",
        topics: [
          "What a data analyst actually does day to day — and what employers hire for",
          "Defining good KPIs: revenue, margin, churn, conversion and operational metrics",
          "Where business data comes from: ERP, CRM, finance exports and SharePoint lists",
          "Data quality: duplicates, blanks, inconsistent dates and naming",
          "Hands-on: scope a reporting problem from a real business brief",
        ],
      },
      {
        session: "Session 2 — Analyst-Grade Excel",
        topics: [
          "Power Query in Excel: repeatable cleaning instead of manual fixes",
          "XLOOKUP, SUMIFS, dynamic arrays and tables",
          "PivotTables and PivotCharts for fast summaries",
          "Copilot in Excel: asking questions and generating formulas in plain English",
          "Hands-on: clean and summarise a real sales dataset",
        ],
      },
    ],
  },
  {
    week: 2, title: "SQL for Business Analysts",
    subtitle: "Querying Real Company Data",
    description: "Pull your own data instead of waiting for IT. Learn the SQL analysts use every day to filter, join and summarise data from company databases — the skill that appears in almost every analyst job ad.",
    tools: [PP.sql, PP.fabric, PP.excel, PP.copilot],
    fullCurriculum: [
      {
        session: "Session 1 — SQL Essentials",
        topics: [
          "Databases explained: tables, keys and how business systems store data",
          "SELECT, WHERE, ORDER BY — answering everyday business questions",
          "GROUP BY and aggregates: totals, averages and counts by region, product, month",
          "JOINs: combining customers, orders and products",
          "Hands-on: answer 15 real questions from a sample sales database",
        ],
      },
      {
        session: "Session 2 — Analyst SQL Patterns",
        topics: [
          "CTEs and subqueries for readable, multi-step analysis",
          "Window functions: running totals, rankings and month-over-month change",
          "Building clean views to feed Power BI reports",
          "Using AI to write, explain and debug SQL — and checking its work",
          "Hands-on: build the dataset behind a monthly performance report",
        ],
      },
    ],
  },
  {
    week: 3, title: "Power BI — Data Modelling",
    subtitle: "Power Query, Star Schema & Relationships",
    description: "Build the foundation every reliable dashboard needs. Connect to Excel, SQL and SharePoint, shape data in Power Query, and design star-schema models that keep reports fast and numbers correct.",
    tools: [PP.powerbi, PP.excel, PP.sql, PP.sharepoint],
    fullCurriculum: [
      {
        session: "Session 1 — Getting Data In",
        topics: [
          "Power BI Desktop tour: data, model and report views",
          "Connecting to Excel, SQL databases, SharePoint and web sources",
          "Power Query transformations: merging, appending, unpivoting and data types",
          "Import vs DirectQuery: choosing the right approach",
          "Hands-on: load and clean a multi-source sales dataset",
        ],
      },
      {
        session: "Session 2 — Modelling That Scales",
        topics: [
          "Star schema: fact and dimension tables explained simply",
          "Relationships, cardinality and filter direction",
          "Building a date table for time-based reporting",
          "Common modelling mistakes that produce wrong totals — and how to fix them",
          "Hands-on: model a company's sales, products and customers",
        ],
      },
    ],
  },
  {
    week: 4, title: "DAX & Dashboard Design",
    subtitle: "Measures, Time Intelligence & Storytelling",
    description: "Turn models into dashboards leaders use. Write the DAX measures every business asks for, design clean executive reports, and use Copilot in Power BI to speed up building and explaining insights.",
    tools: [PP.powerbi, PP.copilot, PP.excel, PP.teams],
    fullCurriculum: [
      {
        session: "Session 1 — DAX for Real Reports",
        topics: [
          "Measures vs calculated columns — when to use each",
          "CALCULATE and filter context, explained with business examples",
          "Time intelligence: YTD, MTD, last year comparisons and growth %",
          "Ranking, targets vs actuals and variance measures",
          "Copilot in Power BI: generating and explaining DAX",
        ],
      },
      {
        session: "Session 2 — Dashboards People Use",
        topics: [
          "Designing for the audience: executive summary vs operational detail",
          "Choosing the right visual — and avoiding chart clutter",
          "Drill-through, tooltips, bookmarks and slicers",
          "Data storytelling: turning a dashboard into a decision",
          "Hands-on: build an executive sales dashboard end to end",
        ],
      },
    ],
  },
  {
    week: 5, title: "Automate Reporting & Workflows",
    subtitle: "Power Automate, Alerts & Simple Apps",
    description: "Stop rebuilding the same report every Monday. Automate refreshes, alerts and report distribution with Power Automate, and build a simple Power App so teams can capture clean data at the source.",
    tools: [PP.powerautomate, PP.powerapps, PP.outlook, PP.teams, PP.sharepoint],
    fullCurriculum: [
      {
        session: "Session 1 — Automated Reporting",
        topics: [
          "Publishing to the Power BI service and scheduled refresh",
          "Data alerts: get notified when a KPI crosses a threshold",
          "Power Automate: emailing report snapshots and posting to Teams",
          "Approval flows for requests, expenses and sign-offs",
          "Hands-on: automate a weekly performance email",
        ],
      },
      {
        session: "Session 2 — Clean Data at the Source",
        topics: [
          "Why bad reports start with bad data entry",
          "Building a simple Power App on a SharePoint list",
          "Forms, validation and dropdowns that keep data consistent",
          "Connecting the app to Power BI for live reporting",
          "Hands-on: replace a shared spreadsheet with an app and dashboard",
        ],
      },
    ],
  },
  {
    week: 6, title: "Sharing, Security & Capstone",
    subtitle: "Workspaces, Fabric & PL-300 Prep",
    description: "Ship your work like a professional. Share securely with workspaces and row-level security, see where Microsoft Fabric fits, prepare for the PL-300 Power BI Data Analyst exam, and present a portfolio-ready capstone.",
    tools: [PP.powerbi, PP.fabric, PP.powerautomate, PP.teams],
    fullCurriculum: [
      {
        session: "Session 1 — Sharing & Governance",
        topics: [
          "Workspaces, apps and sharing reports with the right people",
          "Row-level security: each manager sees only their region",
          "Microsoft Fabric overview: where it fits for growing data teams",
          "PL-300 exam: what's covered and a study plan",
          "Embedding reports in Teams and SharePoint",
        ],
      },
      {
        session: "Session 2 — Capstone & Career",
        topics: [
          "Capstone: an end-to-end reporting solution on a real business dataset",
          "Presenting insights and recommendations to a stakeholder panel",
          "Portfolio: publishing your dashboard and case study",
          "CV, LinkedIn and interview prep for analyst roles",
          "Graduation: verified Standex certificate issued",
        ],
      },
    ],
  },
];

/* ── TRACK CONFIGURATION ── */

type Track = "ai" | "pp";

const trackConfig = {
  ai: {
    label: "AI at Work",
    tag: "Applied AI Curriculum 2026",
    weeks: aiWeeks,
    price: "$1800",
    oldPrice: "$3500",
    cohort: "Cohort 05 — Now Enrolling",
    cohortDate: "May 5",
    duration: "6 Weeks",
    sessions: "2h 30m / session",
    enrollLink: "https://buy.stripe.com/28E4gB0JK6Z8dDi697fnO0j",
    certTitle: "Certified AI Workplace Practitioner",
    certTag: "SXAI-W26-05",
    deckLink: "/ai-deck",
    cohortLabel: "AI at Work Cohort 05",
    color: "#049DCB",
    mastery: [
      "Prompting & Tool Selection",
      "AI Writing & Documents",
      "Research & Data Analysis",
      "Workflow Automation",
      "Custom Team Assistants",
      "Responsible AI & ROI"
    ],
  },
  pp: {
    label: "Power BI & Automation",
    tag: "Data Analyst Curriculum 2026",
    weeks: ppWeeks,
    price: "$1500",
    oldPrice: "$3000",
    cohort: "Cohort 05 — Now Enrolling",
    cohortDate: "Jun 2",
    duration: "6 Weeks",
    sessions: "2h 30m / session",
    enrollLink: "https://buy.stripe.com/dRmeVfdwwcjsdDigNLfnO0k",
    certTitle: "Certified Power BI & Automation Analyst",
    certTag: "SXPB-V26-05",
    deckLink: "/pp-deck",
    cohortLabel: "Power BI Cohort 05",
    color: "#049DCB",
    mastery: [
      "Excel & Power Query",
      "SQL for Analysts",
      "Star Schema Modelling",
      "DAX & Dashboard Design",
      "Automated Reporting",
      "PL-300 Exam Readiness"
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
        {`window.dataLayer = window.dataLayer || [];
          window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
          window.gtag('event', 'conversion', {'send_to': 'AW-17962581203/ZfLnCM-w_vobENP5nPVC'});`}
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
                   {activeTrack === "ai" ? "Trusted by Working Professionals" : "Microsoft Learning Partner"}
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
                <p className="text-zinc-500 font-medium max-w-2xl px-4">Prove your skills on a real project from your own work.</p>
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
                                 ? "The capstone is a real workflow from your own job, rebuilt with AI: prompts, documents, automations and a team assistant working together. Every project is personally reviewed by our team and measured on hours saved and quality of output."
                                 : "The capstone is an end-to-end reporting solution on a real business dataset: cleaned data, a star-schema model, an executive Power BI dashboard and automated report delivery. Every solution is personally assessed for accuracy, design and business impact."
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
                        {activeTrack === "ai" ? "Applied AI at Work" : "Power BI & Automation Analytics"}
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
                           ? "Awarded for applying AI tools, workflow automation and custom assistants to deliver measurable productivity gains in a real business workflow."
                           : "Awarded for mastering Excel, SQL, Power BI data modelling, DAX and automated reporting to deliver decision-ready business insights."
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
                             <span className="text-[5px] font-bold text-violet-600/20 uppercase tracking-tighter leading-none transform -rotate-45">Standex Certified</span>
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
