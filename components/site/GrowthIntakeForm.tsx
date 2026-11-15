"use client";

import React, { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BarChart3,
  CheckCircle2,
  Cloud,
  Layers3,
  Loader2,
  Maximize2,
  Megaphone,
  ShieldCheck,
  X,
  Zap,
} from "lucide-react";

export interface GrowthGoalOption {
  id: string;
  label: string;
  desc: string;
  enquiryType: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const GROWTH_GOALS: GrowthGoalOption[] = [
  {
    id: "ai-agents",
    label: "Artificial Intelligence",
    desc: "Autonomous AI agents, Copilot Studio & swarms",
    enquiryType: "AI & Agentic Systems",
    icon: Bot,
  },
  {
    id: "power-bi",
    label: "Power BI & Fabric",
    desc: "Executive dashboards & real-time analytics",
    enquiryType: "Power BI & Microsoft Fabric",
    icon: BarChart3,
  },
  {
    id: "power-apps",
    label: "Power Apps & Automate",
    desc: "Custom apps & automated workflows",
    enquiryType: "Power Platform (Power Apps & Automate)",
    icon: Layers3,
  },
  {
    id: "salesforce",
    label: "Salesforce & Integration",
    desc: "CRM architecture & data integration",
    enquiryType: "Salesforce CRM & Integration",
    icon: Cloud,
  },
  {
    id: "digital-marketing",
    label: "Digital Marketing & Growth",
    desc: "Google Ads, paid social, SEO & email acquisition",
    enquiryType: "Digital Growth Management",
    icon: Megaphone,
  },
];

const PLATFORM_CHIPS = [
  "Microsoft 365",
  "Power BI",
  "Fabric",
  "Salesforce",
  "Spreadsheets / Excel",
  "SQL / ERP",
  "Custom Stack",
];

interface GrowthIntakeFormProps {
  className?: string;
  autoOpenModal?: boolean;
}

export function GrowthIntakeForm({
  className = "",
  autoOpenModal = false,
}: GrowthIntakeFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(autoOpenModal);
  const [selectedGoal, setSelectedGoal] = useState<GrowthGoalOption>(GROWTH_GOALS[0]);
  const [selectedStack, setSelectedStack] = useState<string[]>(["Microsoft 365"]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Lock body scroll when pop-out modal is open
  useEffect(() => {
    if (isModalOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsModalOpen(false);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = prev;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isModalOpen]);

  const toggleStackChip = (platform: string) => {
    setSelectedStack((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);

    if (!name.trim() || !email.trim()) {
      setError("Please provide your name and work email.");
      setBusy(false);
      return;
    }

    const compiledMessage = [
      company ? `Company / Organisation: ${company.trim()}` : null,
      `Primary Growth Objective: ${selectedGoal.label}`,
      `Current Platform / Stack: ${selectedStack.length > 0 ? selectedStack.join(", ") : "Not specified"}`,
      "",
      "Growth Bottlenecks & Project Context:",
      message.trim() || "Requested an initial AI & BI growth assessment call.",
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          enquiryType: selectedGoal.enquiryType,
          message: compiledMessage,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Unable to submit request. Please try again.");
        return;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setError("Connection error. Please try again or reach us at support@standexdigital.com.");
    } finally {
      setBusy(false);
    }
  };

  const renderFormContent = (isModal = false) => {
    if (submitted) {
      return (
        <div className="text-center py-6 sm:py-8">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800">
            Intake Received
          </span>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-zinc-950">
            Thanks, we have your message.
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 max-w-md mx-auto">
            A Senior Solutions Architect is reviewing your requirements. We will be in touch within
            one business day with a structured architecture roadmap and ROI estimate.
          </p>

          <div className="mt-6 rounded-2xl border border-zinc-100 bg-zinc-50 p-4 text-left text-xs text-zinc-600 max-w-md mx-auto">
            <p className="font-semibold text-zinc-900">What happens next:</p>
            <ul className="mt-2 space-y-1.5 list-disc pl-4 text-zinc-600">
              <li>We analyze your current tech stack and operational bottlenecks.</li>
              <li>We map the highest-ROI solution (AI agents, Power BI, Power Apps, or Salesforce).</li>
              <li>We schedule a 30-minute discovery call with zero sales pitch.</li>
            </ul>
          </div>

          <button
            type="button"
            onClick={() => {
              setSubmitted(false);
              if (isModal) setIsModalOpen(false);
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition"
          >
            {isModal ? "Close assessment" : "Submit another inquiry"}
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Goal Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2">
            1. Select Primary Growth Priority
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {GROWTH_GOALS.map((goal) => {
              const Icon = goal.icon;
              const isSelected = selectedGoal.id === goal.id;
              return (
                <button
                  type="button"
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal)}
                  className={`flex items-start gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20"
                      : "border-zinc-200 bg-zinc-50/60 hover:border-zinc-300 hover:bg-white"
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-zinc-600 border border-zinc-200"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-bold leading-snug ${
                        isSelected ? "text-emerald-950" : "text-zinc-900"
                      }`}
                    >
                      {goal.label}
                    </p>
                    <p className="text-[10px] text-zinc-600 line-clamp-1">{goal.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Tech Stack Chips */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
            2. Current Systems & Platforms
          </label>
          <div className="flex flex-wrap gap-1.5">
            {PLATFORM_CHIPS.map((chip) => {
              const active = selectedStack.includes(chip);
              return (
                <button
                  type="button"
                  key={chip}
                  onClick={() => toggleStackChip(chip)}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                    active
                      ? "bg-zinc-950 text-white shadow-sm"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  {active ? `✓ ${chip}` : `+ ${chip}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Contact & Company Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Your Name <span className="text-emerald-700">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-950 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Work Email <span className="text-emerald-700">*</span>
            </label>
            <input
              type="email"
              required
              placeholder="alex@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-950 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Company / Team
            </label>
            <input
              type="text"
              placeholder="Company name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-950 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-700 mb-1">
              Main Growth Bottleneck
            </label>
            <input
              type="text"
              placeholder="e.g. manual spreadsheets, unassigned leads"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-xs font-medium text-zinc-950 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/25 transition hover:bg-emerald-700 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        >
          {busy ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Preparing your diagnostic request...
            </>
          ) : (
            <>
              Contact Us
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-1">
          <span>⚡ 1 business day response</span>
          <span>🔒 Runs in your tenant & accounts</span>
          <span>💼 Senior architects only</span>
        </div>
      </form>
    );
  };

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* INLINE CARD DISPLAY (WITH CLICK-TO-POPOUT EXPANDER BUTTON)     */}
      {/* ------------------------------------------------------------- */}
      <div
        className={`relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-[0_30px_70px_-25px_rgba(16,24,40,0.25)] sm:p-8 transition-all duration-300 hover:border-emerald-300 ${className}`}
      >
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600" />

        {/* Card Header with Pop-out expander */}
        <div className="mb-4 flex items-center justify-between gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
            
            Contact Us
          </span>

          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-bold text-zinc-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 transition"
            title="Pop out into full screen assessment"
          >
            <span>Pop out</span>
            <Maximize2 className="h-3 w-3 text-zinc-500 group-hover:text-emerald-700" />
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
          Tell us where your business wants to grow.
        </h2>
        <p className="mt-1 text-xs text-zinc-600">
          Select your focus area and current stack. We will deliver a tailored architecture roadmap.
        </p>

        <div className="mt-5">{renderFormContent(false)}</div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* POP-OUT MODAL (DISPAYS WHEN USER CLICKS "POP OUT" OR ACTION)   */}
      {/* ------------------------------------------------------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-zinc-950/70 backdrop-blur-sm transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-6 sm:p-10 shadow-2xl z-10 my-8 max-h-[92vh] overflow-y-auto"
            >
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-t-3xl" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 transition"
                aria-label="Close diagnostic modal"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                  
                  Full Interactive Assessment
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-black tracking-tight text-zinc-950">
                  AI & BI Growth Diagnostic
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-zinc-600">
                  Tell us where your team is losing time or deals. A Senior Solutions Architect will deliver a tailored blueprint within one business day.
                </p>
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-6">
                {renderFormContent(true)}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
