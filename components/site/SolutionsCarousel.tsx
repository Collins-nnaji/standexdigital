"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight, TrendingUp } from "lucide-react";
import { AIArt, AppsArt, BIArt, CRMArt, GrowthArt } from "./SolutionArt";

const SOLUTIONS = [
  {
    href: "/solutions#artificial-intelligence",
    number: "01",
    title: "Artificial Intelligence",
    tagline: "Agents & Copilot Studio",
    summary: "Custom AI agents and Copilot Studio assistants that triage leads in seconds and run workflows 24/7.",
    metric: "+44% lead velocity",
    tags: ["Autonomous Agents", "Copilot Studio", "RAG"],
    Art: AIArt,
    bg: "from-violet-100 via-violet-50 to-white",
    accent: "text-violet-700",
    chip: "bg-violet-50 text-violet-700",
  },
  {
    href: "/solutions#power-bi",
    number: "02",
    title: "Power BI & Fabric",
    tagline: "Real-time analytics",
    summary: "Unified semantic models that give leadership live visibility into pipeline, margin and operations.",
    metric: "Daily data vs 14-day lag",
    tags: ["Microsoft Fabric", "Semantic Models", "OneLake"],
    Art: BIArt,
    bg: "from-amber-100 via-amber-50 to-white",
    accent: "text-amber-700",
    chip: "bg-amber-50 text-amber-700",
  },
  {
    href: "/solutions#power-apps",
    number: "03",
    title: "Power Apps & Automate",
    tagline: "Apps & automation",
    summary: "Replace fragile spreadsheets and email approvals with secure apps and automated workflows.",
    metric: "-82% manual hours",
    tags: ["Power Apps", "Power Automate", "Dataverse"],
    Art: AppsArt,
    bg: "from-emerald-100 via-emerald-50 to-white",
    accent: "text-emerald-700",
    chip: "bg-emerald-50 text-emerald-700",
  },
  {
    href: "/solutions#salesforce",
    number: "04",
    title: "Salesforce CRM",
    tagline: "Connected pipeline",
    summary: "Modernise Salesforce to capture leads faster and sync cleanly with Microsoft 365 and Power BI.",
    metric: "Sub-minute lead intake",
    tags: ["Sales Cloud", "Service Cloud", "Integration"],
    Art: CRMArt,
    bg: "from-sky-100 via-sky-50 to-white",
    accent: "text-sky-700",
    chip: "bg-sky-50 text-sky-700",
  },
  {
    href: "/solutions#digital-growth",
    number: "05",
    title: "Digital Marketing & Growth",
    tagline: "Demand engine",
    summary: "Google Ads, paid social, SEO and lifecycle email run as one measurable acquisition system.",
    metric: "Multi-channel demand",
    tags: ["Google Ads", "Paid Social", "SEO", "GA4"],
    Art: GrowthArt,
    bg: "from-rose-100 via-rose-50 to-white",
    accent: "text-rose-700",
    chip: "bg-rose-50 text-rose-700",
  },
];

export function SolutionsCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const step = card.offsetWidth + 20;
    setActive(Math.min(SOLUTIONS.length - 1, Math.round(el.scrollLeft / step)));
  }, []);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  const go = (dir: 1 | -1) => {
    const el = scroller.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2" aria-hidden="true">
          {SOLUTIONS.map((s, i) => (
            <span
              key={s.number}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-emerald-600" : "w-1.5 bg-zinc-300"}`}
            />
          ))}
          <span className="ml-3 text-xs font-semibold text-zinc-500 sm:hidden">Swipe →</span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={active === 0}
            aria-label="Previous solution"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-800 transition hover:border-emerald-500 hover:text-emerald-700 disabled:opacity-35"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            disabled={active === SOLUTIONS.length - 1}
            aria-label="Next solution"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950 text-white transition hover:bg-emerald-600 disabled:opacity-35"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={onScroll}
        className="site-hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-6 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
      >
        {SOLUTIONS.map(({ Art, ...s }, i) => (
          <motion.article
            key={s.href}
            data-card
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-shadow duration-300 hover:shadow-[0_30px_60px_-30px_rgba(16,24,40,0.35)] sm:w-[400px]"
          >
            <div className={`relative aspect-[300/200] bg-gradient-to-br ${s.bg} p-5`}>
              <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-zinc-800 shadow-sm">
                {s.number} · {s.tagline}
              </span>
              <div className="h-full w-full pt-4 transition-transform duration-500 group-hover:scale-105">
                <Art />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-xl font-bold tracking-tight text-zinc-950">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.chip}`}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-5 mt-6">
                <span className={`flex items-center gap-1.5 text-xs font-bold ${s.accent}`}>
                  <TrendingUp className="h-3.5 w-3.5" />
                  {s.metric}
                </span>
                <Link href={s.href} className="inline-flex items-center gap-0.5 text-xs font-bold uppercase tracking-wider text-zinc-900 transition-colors hover:text-emerald-700">
                  Explore <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
