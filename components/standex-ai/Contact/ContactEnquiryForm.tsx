"use client";

import React, { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  Send,
  CheckCircle2,
  Bot,
  BarChart3,
  AppWindow,
  Cloud,
  TrendingUp,
  Layers,
  ShieldCheck,
  Clock,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { ENQUIRY_TYPES } from "@/lib/enquiry-types";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all";

const SOLUTION_GOALS = [
  {
    id: "ai",
    title: "Artificial Intelligence",
    subtitle: "Agents, Copilots & Knowledge RAG",
    icon: Bot,
    enquiryType: "AI & Agentic Systems",
  },
  {
    id: "power-bi",
    title: "Power BI & Fabric",
    subtitle: "Enterprise telemetry & dashboards",
    icon: BarChart3,
    enquiryType: "Power BI & Microsoft Fabric",
  },
  {
    id: "power-apps",
    title: "Power Apps & Automate",
    subtitle: "Custom workflow apps & automation",
    icon: AppWindow,
    enquiryType: "Power Platform (Power Apps & Automate)",
  },
  {
    id: "salesforce",
    title: "Salesforce CRM",
    subtitle: "Pipeline acceleration & integration",
    icon: Cloud,
    enquiryType: "Salesforce CRM & Integration",
  },
  {
    id: "growth",
    title: "Digital Growth",
    subtitle: "Demand gen & acquisition systems",
    icon: TrendingUp,
    enquiryType: "Digital Growth Management",
  },
  {
    id: "audit",
    title: "Full Systems Audit",
    subtitle: "Multi-solution architecture review",
    icon: Layers,
    enquiryType: "Data Readiness & AI Audit",
  },
];

const TECH_STACK_OPTIONS = [
  "Microsoft 365 / Azure",
  "Power BI / Fabric",
  "Power Apps / Dataverse",
  "Salesforce",
  "Spreadsheets / Excel",
  "SQL Server / Postgres",
  "Google Ads / Analytics",
  "Custom / Legacy ERP",
];

const TIMELINE_OPTIONS = [
  "Immediate (< 30 days)",
  "Next 1–3 months",
  "Exploring / Roadmapping",
];

const TEAM_SIZE_OPTIONS = [
  "1–20",
  "21–100",
  "101–500",
  "500+",
];

type ContactEnquiryFormProps = {
  defaultEnquiryType?: string;
  eyebrow?: string;
  heading?: string;
};

const ContactEnquiryForm = ({
  defaultEnquiryType,
  eyebrow = "Contact Us",
  heading = "Design your custom enterprise architecture.",
}: ContactEnquiryFormProps) => {
  const [selectedGoal, setSelectedGoal] = useState<string>(() => {
    if (defaultEnquiryType?.includes("Power BI")) return "power-bi";
    if (defaultEnquiryType?.includes("Power Apps") || defaultEnquiryType?.includes("Platform")) return "power-apps";
    if (defaultEnquiryType?.includes("Salesforce")) return "salesforce";
    if (defaultEnquiryType?.includes("Digital") || defaultEnquiryType?.includes("Growth")) return "growth";
    return "ai";
  });

  const [selectedStack, setSelectedStack] = useState<string[]>([
    "Microsoft 365 / Azure",
    "Power BI / Fabric",
  ]);
  const [timeline, setTimeline] = useState<string>("Immediate (< 30 days)");
  const [teamSize, setTeamSize] = useState<string>("21–100");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const toggleStack = (tech: string) => {
    setSelectedStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const matchedGoal = SOLUTION_GOALS.find((g) => g.id === selectedGoal);
    const resolvedEnquiryType = matchedGoal?.enquiryType || "General Growth Consultation";

    // Format rich metadata into message body
    const formattedMessage = [
      `--- GROWTH BLUEPRINT INTAKE ---`,
      `Primary Goal: ${matchedGoal?.title} (${matchedGoal?.subtitle})`,
      `Company: ${company || "Not specified"}`,
      `Team Size: ${teamSize}`,
      `Timeline: ${timeline}`,
      `Current Tech Stack: ${selectedStack.length > 0 ? selectedStack.join(", ") : "None specified"}`,
      `\n--- PROJECT REQUIREMENTS & BOTTLENECKS ---`,
      message,
    ].join("\n");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          enquiryType: resolvedEnquiryType,
          message: formattedMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setCompany("");
      setMessage("");
    } catch {
      setError("Unable to submit. Please try again or message us on WhatsApp.");
    } finally {
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-emerald-200 bg-white p-8 sm:p-10 text-center shadow-2xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent pointer-events-none" />
        <div className="relative">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-8 w-8" />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 ring-1 ring-emerald-200">
            
            Blueprint Request Logged
          </span>

          <h3 className="text-2xl sm:text-3xl font-bold text-zinc-950 mt-3 mb-2">
            We&apos;re preparing your growth blueprint.
          </h3>
          <p className="text-sm font-medium text-zinc-600 max-w-md mx-auto mb-8 leading-relaxed">
            A Senior Solutions Architect will analyze your stack and deliver an indicative architecture diagram, timeline, and licensing plan within 24 hours.
          </p>

          <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-5 max-w-md mx-auto text-left mb-8 space-y-2.5">
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Fast Escalation Available</p>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Need immediate input on an active RFP or deployment deadline? Message our lead architects directly on WhatsApp for same-day triage.
            </p>
            <a
              href="https://wa.me/447918262629"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-700 transition-all"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp (+44 7918 262629)
            </a>
          </div>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-xs font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      onSubmit={submit}
      className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 space-y-6 shadow-[0_30px_70px_-35px_rgba(16,24,40,0.35)] relative"
    >
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-800 ring-1 ring-emerald-200 mb-2">
          
          {eyebrow}
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
          {heading}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500">
          Select your primary focus area and systems to tailor your architecture roadmap.
        </p>
      </div>

      {/* Step 1: Solution Goal Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700 mb-2.5">
          1. What is your primary objective?
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {SOLUTION_GOALS.map((goal) => {
            const isSelected = selectedGoal === goal.id;
            const Icon = goal.icon;
            return (
              <button
                type="button"
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`flex flex-col items-start p-3 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "border-emerald-600 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm"
                    : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50"
                }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl mb-2 ${
                    isSelected ? "bg-emerald-600 text-white" : "bg-zinc-100 text-zinc-600"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <p className="text-xs font-bold text-zinc-900 leading-tight">{goal.title}</p>
                <p className="text-[10px] text-zinc-500 mt-1 line-clamp-1">{goal.subtitle}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Current Tech Stack Chips */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-zinc-700">
            2. Current Systems & Stack
          </label>
          <span className="text-[11px] text-zinc-400">Select all that apply</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK_OPTIONS.map((tech) => {
            const active = selectedStack.includes(tech);
            return (
              <button
                type="button"
                key={tech}
                onClick={() => toggleStack(tech)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                  active
                    ? "bg-zinc-900 text-white shadow-sm"
                    : "border border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-zinc-300 hover:bg-white"
                }`}
              >
                {active && <span className="mr-1.5 text-emerald-400">✓</span>}
                {tech}
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Contact & Company Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="blueprint-name" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Full name *
          </label>
          <input
            id="blueprint-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="e.g. Alex Morgan"
          />
        </div>
        <div>
          <label htmlFor="blueprint-email" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Work email *
          </label>
          <input
            id="blueprint-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="alex@company.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="blueprint-company" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Company or Organization
          </label>
          <input
            id="blueprint-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className={inputClass}
            placeholder="Acme Enterprises Ltd"
          />
        </div>
        <div>
          <label htmlFor="blueprint-timeline" className="block text-xs font-semibold text-zinc-700 mb-1.5">
            Target Timeline
          </label>
          <select
            id="blueprint-timeline"
            value={timeline}
            onChange={(e) => setTimeline(e.target.value)}
            className={inputClass}
          >
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Step 4: Bottleneck or Goals */}
      <div>
        <label htmlFor="blueprint-message" className="block text-xs font-semibold text-zinc-700 mb-1.5">
          Process Bottlenecks & Desired Outcomes *
        </label>
        <textarea
          id="blueprint-message"
          required
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Describe your current manual processes, reporting bottlenecks, or specific goals (e.g. automate monthly reconciliation across SAP and Fabric; build an autonomous agent for contract triage)..."
        />
      </div>

      {error && (
        <p className="text-xs font-semibold text-red-600 bg-red-50 p-3 rounded-xl border border-red-200" role="alert">
          {error}
        </p>
      )}

      {/* Trust & Guarantees */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-500 border-t border-zinc-100 pt-3">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-emerald-600" />
          1-Day Turnaround
        </span>
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          NDA Confidential
        </span>
        <span className="flex items-center gap-1.5">
          
          No Obligation
        </span>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-bold text-white transition-all hover:bg-emerald-700 disabled:opacity-60 shadow-lg shadow-emerald-600/20 active:scale-[0.99]"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Generating Roadmap Request...
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </motion.form>
  );
};

export default ContactEnquiryForm;
