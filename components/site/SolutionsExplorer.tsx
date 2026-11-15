"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Plus, TrendingUp } from "lucide-react";
import { SOLUTION_GROUPS, type Offering, type SolutionGroup } from "@/lib/offerings";
import { TONES } from "./tones";
import { SolutionPage } from "./SolutionPage";
import { AIArt, AppsArt, BIArt, CRMArt, GrowthArt } from "./SolutionArt";

const ART = {
  "artificial-intelligence": AIArt,
  "power-bi": BIArt,
  "power-apps": AppsArt,
  salesforce: CRMArt,
  "digital-growth": GrowthArt,
} as const;


type Open = { group: SolutionGroup; offering?: Offering } | null;

export function SolutionsExplorer() {
  const [open, setOpen] = useState<Open>(null);
  const [current, setCurrent] = useState(SOLUTION_GROUPS[0].id);

  // Highlight the chip of the section currently in view.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    SOLUTION_GROUPS.forEach((g) => {
      const el = document.getElementById(g.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Sticky, swipeable section nav */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 py-3 sm:px-6 lg:px-8">
          {SOLUTION_GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition ${
                current === g.id ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"
              }`}
            >
              {g.title}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-20 px-4 py-14 sm:px-6 lg:px-8">
        {SOLUTION_GROUPS.map((g, gi) => {
          const t = TONES[g.tone];
          const Art = ART[g.id as keyof typeof ART];
          return (
            <section key={g.id} id={g.id} className="scroll-mt-24">
              <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6 }}
                  className=""
                >
                  <div className={`relative aspect-[300/200] overflow-hidden rounded-3xl bg-gradient-to-br ${t.bg} p-6`}>
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-zinc-800 shadow-sm">
                      {g.number} · {g.tagline}
                    </span>
                    <div className="h-full w-full pt-5"><Art /></div>
                  </div>
                  <h2 className="mt-6 text-3xl font-bold tracking-tight text-zinc-950">{g.title}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-zinc-600">{g.summary}</p>
                  <p className={`mt-4 inline-flex items-center gap-2 text-sm font-bold ${t.text}`}>
                    <TrendingUp className="h-4 w-4" /> {g.metric}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpen({ group: g })}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-semibold text-white transition hover:bg-emerald-600"
                  >
                    View full details <ArrowRight className="h-4 w-4" />
                  </button>
                </motion.div>

                <div className={`grid gap-4 ${g.offerings.length === 3 ? "sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3" : "sm:grid-cols-2"} content-start`}>
                  {g.offerings.map((o, oi) => (
                    <motion.button
                      key={o.title}
                      type="button"
                      onClick={() => setOpen({ group: g, offering: o })}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: oi * 0.07 }}
                      className={`group flex flex-col items-start rounded-2xl border border-zinc-200 bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(16,24,40,0.4)] ${t.ring}`}
                    >
                      <span className="flex w-full items-center justify-between">
                        <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${t.chip}`}>
                          {String(gi + 1).padStart(2, "0")}.{oi + 1}
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 transition group-hover:rotate-90 group-hover:bg-zinc-950 group-hover:text-white">
                          <Plus className="h-4 w-4" />
                        </span>
                      </span>
                      <span className="mt-5 text-lg font-bold leading-snug text-zinc-950">{o.title}</span>
                      <span className="mt-1.5 text-sm leading-relaxed text-zinc-600">{o.blurb}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <AnimatePresence>
        {open && (
          <SolutionPage
            key={open.group.id}
            group={open.group}
            offering={open.offering}
            partIndex={open.offering ? open.offering.part ?? 0 : 0}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
