"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Bot, Layers3, Zap } from "lucide-react";
import { AIArt, AppsArt, BIArt, CRMArt } from "./SolutionArt";
import { TONES } from "./tones";

const ITEMS = [
  { icon: Zap, title: "Quick lead follow-up", text: "Enquiries are captured, qualified and routed the moment they arrive, so none go cold.", Art: CRMArt, tone: "sky" },
  { icon: Layers3, title: "Less manual work", text: "Apps and workflows replace spreadsheets, re-keying and email approvals.", Art: AppsArt, tone: "emerald" },
  { icon: BarChart3, title: "Reporting you can trust", text: "One set of numbers for sales, margin and operations, kept up to date.", Art: BIArt, tone: "amber" },
  { icon: Bot, title: "AI with oversight", text: "Agents handle routine tasks inside your own tenant, with approvals where they matter.", Art: AIArt, tone: "violet" },
] as const;

const DURATION = 5000;

/** Auto-advancing showcase: a list on the left, a matching animated visual on the right. */
export function WhyAnimated() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % ITEMS.length), DURATION);
    return () => clearTimeout(id);
  }, [active, paused]);

  const item = ITEMS[active];
  const t = TONES[item.tone];

  return (
    <div
      className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <ul className="space-y-1">
        {ITEMS.map((it, i) => {
          const Icon = it.icon;
          const on = i === active;
          return (
            <li key={it.title}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full rounded-2xl px-4 py-4 text-left transition-colors hover:bg-white/70"
                aria-current={on}
              >
                <span className="flex items-center gap-4">
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-colors ${on ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-600"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`text-lg font-bold transition-colors sm:text-xl ${on ? "text-zinc-950" : "text-zinc-500 group-hover:text-zinc-800"}`}>{it.title}</span>
                </span>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="block overflow-hidden"
                    >
                      <span className="block pb-1 pl-[60px] pt-3 text-[15px] leading-relaxed text-zinc-600">{it.text}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
                {/* progress line */}
                <span className="absolute inset-x-4 bottom-0 h-px bg-zinc-200" />
                {on && (
                  <motion.span
                    key={`${active}-${paused}`}
                    className="absolute bottom-0 left-4 h-0.5 rounded-full bg-emerald-500"
                    initial={{ width: 0 }}
                    animate={{ width: paused ? 0 : "calc(100% - 2rem)" }}
                    transition={{ duration: DURATION / 1000, ease: "linear" }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div className="relative flex min-h-[22rem] items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ duration: 0.45 }}
            className={`w-full rounded-[2rem] bg-gradient-to-br ${t.bg} p-6 shadow-[0_40px_80px_-40px_rgba(16,24,40,0.35)] ring-1 ring-black/5 sm:p-8`}
          >
            <div className="flex items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${t.chip}`}>0{active + 1}</span>
              <p className="text-sm font-bold text-zinc-900">{item.title}</p>
            </div>
            <div className="mx-auto mt-4 h-56 w-full max-w-md sm:h-64">
              <item.Art />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
