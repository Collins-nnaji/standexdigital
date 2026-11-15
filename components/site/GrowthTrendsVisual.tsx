"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  Clock,
  Zap,
  BarChart3,
  Bot,
  Layers3,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

type TrendKey = "leads" | "efficiency" | "insights";

interface TrendData {
  title: string;
  badge: string;
  kpiNumber: string;
  kpiLabel: string;
  summary: string;
  pathD: string;
  points: { cx: number; cy: number; val: string }[];
}

const TRENDS: Record<TrendKey, TrendData> = {
  leads: {
    title: "Lead Velocity & Conversion",
    badge: "+44% qualified pipeline",
    kpiNumber: "< 60s",
    kpiLabel: "Average AI qualification speed",
    summary:
      "Automated lead intake forms and AI triage qualify prospects instantly, eliminating dropped enquiries.",
    pathD: "M 0 110 C 60 100, 120 85, 180 88 C 240 90, 300 55, 360 40 C 420 30, 480 15, 540 10 L 540 140 L 0 140 Z",
    points: [
      { cx: 0, cy: 110, val: "Start" },
      { cx: 180, cy: 88, val: "+18%" },
      { cx: 360, cy: 40, val: "+32%" },
      { cx: 540, cy: 10, val: "+44%" },
    ],
  },
  efficiency: {
    title: "Spreadsheet Workload Reduction",
    badge: "-82% manual hours",
    kpiNumber: "18.5 hrs",
    kpiLabel: "Saved per team member / week",
    summary:
      "Custom Power Apps and automated flows replace manual copy-pasting and email approvals.",
    pathD: "M 0 20 C 60 25, 120 40, 180 45 C 240 50, 300 90, 360 100 C 420 110, 480 125, 540 130 L 540 140 L 0 140 Z",
    points: [
      { cx: 0, cy: 20, val: "22h manual" },
      { cx: 180, cy: 45, val: "14h" },
      { cx: 360, cy: 100, val: "6h" },
      { cx: 540, cy: 130, val: "3.5h automated" },
    ],
  },
  insights: {
    title: "Executive Decision Latency",
    badge: "Real-time vs 14 days",
    kpiNumber: "Real-time",
    kpiLabel: "Daily Power BI refreshed models",
    summary:
      "Reconciled semantic data models in Microsoft Fabric give leaders instant visibility into margins and churn.",
    pathD: "M 0 120 C 60 110, 140 90, 200 80 C 270 70, 340 30, 420 20 C 480 12, 510 8, 540 5 L 540 140 L 0 140 Z",
    points: [
      { cx: 0, cy: 120, val: "Day 14" },
      { cx: 200, cy: 80, val: "Day 3" },
      { cx: 420, cy: 20, val: "Same-Day" },
      { cx: 540, cy: 5, val: "Live Stream" },
    ],
  },
};

export function GrowthTrendsVisual() {
  const [activeTab, setActiveTab] = useState<TrendKey>("leads");
  const data = TRENDS[activeTab];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-xl">
      {/* Top Header / Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
            Live Performance Metrics
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950 mt-0.5">
            Measured Client Growth Trends
          </h3>
        </div>

        {/* Tab Pills */}
        <div className="flex rounded-full bg-zinc-100 p-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab("leads")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === "leads"
                ? "bg-white text-zinc-950 shadow-sm"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Lead Velocity
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("efficiency")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === "efficiency"
                ? "bg-white text-zinc-950 shadow-sm"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Hours Saved
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("insights")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
              activeTab === "insights"
                ? "bg-white text-zinc-950 shadow-sm"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Decision Speed
          </button>
        </div>
      </div>

      {/* Metric Highlight & Summary */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4 items-center">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-extrabold text-emerald-800">
              {data.badge}
            </span>
            <span className="text-xs font-medium text-zinc-500">Across 6-month deployment</span>
          </div>
          <p className="mt-2 text-sm text-zinc-600 leading-relaxed max-w-xl">{data.summary}</p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 min-w-[160px] text-left sm:text-right">
          <p className="text-2xl sm:text-3xl font-black text-zinc-950 tracking-tight">
            {data.kpiNumber}
          </p>
          <p className="text-[11px] font-semibold text-zinc-500 mt-0.5">{data.kpiLabel}</p>
        </div>
      </div>

      {/* SVG Interactive Chart Canvas */}
      <div className="relative mt-6 rounded-2xl border border-zinc-100 bg-gradient-to-b from-zinc-50/50 to-white p-4">
        <svg
          viewBox="0 0 540 140"
          className="h-36 sm:h-44 w-full overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="trend-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="trend-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="35" x2="540" y2="35" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="0" y1="70" x2="540" y2="70" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="0" y1="105" x2="540" y2="105" stroke="#f1f5f9" strokeDasharray="3 3" />

          {/* Animated Area Fill */}
          <motion.path
            key={`fill-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            d={data.pathD}
            fill="url(#trend-gradient)"
          />

          {/* Smooth Stroke Line */}
          <motion.path
            key={`line-${activeTab}`}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            d={data.pathD.replace(/ L 540 140 L 0 140 Z$/, "")}
            fill="none"
            stroke="url(#trend-line)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Data Points */}
          {data.points.map((pt, i) => (
            <g key={pt.val}>
              <circle cx={pt.cx} cy={pt.cy} r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
              <text
                x={pt.cx}
                y={pt.cy > 30 ? pt.cy - 10 : pt.cy + 18}
                textAnchor={i === 0 ? "start" : i === data.points.length - 1 ? "end" : "middle"}
                className="text-[10px] font-bold fill-zinc-700"
              >
                {pt.val}
              </text>
            </g>
          ))}
        </svg>

        <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-zinc-600 border-t border-zinc-100 pt-2">
          <span>Baseline (Pre-Engineering)</span>
          <span>Week 4 (Initial Deployment)</span>
          <span>Week 8 (Full Adoption)</span>
          <span className="font-bold text-emerald-800">Target Result</span>
        </div>
      </div>

      {/* SVG System Architecture Flow Diagram */}
      <div className="mt-6 rounded-2xl bg-zinc-950 p-5 text-white">
        <div className="flex items-center justify-between gap-2 mb-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Connected Growth Pipeline
          </p>
          <span className="text-[10px] text-zinc-400">End-to-End System Flow</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 mb-2">
              <Zap className="h-4 w-4" />
            </span>
            <p className="text-xs font-bold text-white">01. Lead Intake</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Structured forms & triage</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 mb-2">
              <Bot className="h-4 w-4" />
            </span>
            <p className="text-xs font-bold text-white">02. AI Agents</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Qualify & auto-respond</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-fuchsia-500/20 text-fuchsia-400 mb-2">
              <Layers3 className="h-4 w-4" />
            </span>
            <p className="text-xs font-bold text-white">03. Power Apps</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Automated operations</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 mb-2">
              <BarChart3 className="h-4 w-4" />
            </span>
            <p className="text-xs font-bold text-white">04. Power BI</p>
            <p className="text-[10px] text-zinc-400 mt-0.5">Real-time revenue view</p>
          </div>
        </div>
      </div>
    </div>
  );
}
