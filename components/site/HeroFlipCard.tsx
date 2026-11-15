"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WORDS: { t: string; s: number; c: string }[] = [
  { t: "AI Agents", s: 30, c: "text-violet-600" },
  { t: "Power BI", s: 26, c: "text-amber-600" },
  { t: "Lead Intake", s: 20, c: "text-emerald-600" },
  { t: "Copilot Studio", s: 22, c: "text-violet-500" },
  { t: "Salesforce", s: 28, c: "text-sky-600" },
  { t: "Google Ads", s: 24, c: "text-rose-600" },
  { t: "Automation", s: 32, c: "text-emerald-700" },
  { t: "Fabric", s: 18, c: "text-amber-500" },
  { t: "SEO", s: 26, c: "text-rose-500" },
  { t: "Dataverse", s: 17, c: "text-emerald-600" },
  { t: "Power Apps", s: 24, c: "text-emerald-600" },
  { t: "GA4", s: 18, c: "text-rose-500" },
  { t: "Dashboards", s: 21, c: "text-amber-600" },
  { t: "CRM", s: 27, c: "text-sky-600" },
  { t: "Paid Social", s: 19, c: "text-rose-600" },
  { t: "Workflows", s: 22, c: "text-emerald-700" },
  { t: "RAG", s: 18, c: "text-violet-500" },
  { t: "Email", s: 20, c: "text-rose-500" },
  { t: "Analytics", s: 24, c: "text-amber-600" },
  { t: "Growth", s: 34, c: "text-zinc-900" },
];

/** Hero card that flips between a pipeline chart and a capability word cloud. */
export function HeroFlipCard() {
  const [side, setSide] = useState<0 | 1>(0);
  const [paused, setPaused] = useState(false);
  const [count, setCount] = useState(0);

  // Count the headline figure up each time the chart face comes into view.
  useEffect(() => {
    if (side !== 0) return;
    setCount(0);
    let n = 0;
    const id = setInterval(() => {
      n += 2;
      setCount(Math.min(n, 44));
      if (n >= 44) clearInterval(id);
    }, 35);
    return () => clearInterval(id);
  }, [side]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setSide((s) => (s === 0 ? 1 : 0)), 5500);
    return () => clearInterval(id);
  }, [paused]);

  const face = "absolute inset-0 rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_40px_80px_-40px_rgba(16,24,40,0.35)] [backface-visibility:hidden]";

  return (
    <div className="mx-auto w-full max-w-xl" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative h-[28rem] [perspective:1400px] sm:h-[29rem]">
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: side * 180 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Front: pipeline chart */}
          <div className={`${face} flex flex-col`} aria-hidden={side === 1}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Qualified Pipeline</p>
                <div className="mt-1 flex items-end gap-2">
                  <p className="text-5xl font-black leading-none tracking-tight text-zinc-950">+{count}%</p>
                  <p className="pb-1 text-xs font-semibold text-zinc-500">vs. before automation</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Live
              </span>
            </div>

            <svg viewBox="0 0 400 170" className="mt-4 min-h-0 w-full flex-1" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="hero-flip-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity=".32" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[30, 70, 110, 150].map((y) => (
                <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#eef2f1" />
              ))}
              {/* baseline (before) */}
              <path d="M0 140 C80 138, 160 136, 240 134 S350 130, 400 128" fill="none" stroke="#cbd5d1" strokeWidth="2" strokeDasharray="5 5" />
              <motion.path
                key={`area-${side}`}
                d="M0 142 C60 134, 110 120, 160 96 S250 62, 300 40 S360 18, 400 10 L400 170 L0 170 Z"
                fill="url(#hero-flip-area)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              />
              <motion.path
                key={`line-${side}`}
                d="M0 142 C60 134, 110 120, 160 96 S250 62, 300 40 S360 18, 400 10"
                fill="none"
                stroke="#059669"
                strokeWidth="3.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.5, duration: 1.4, ease: "easeInOut" }}
              />
              {[[0, 142, "Start"], [160, 96, "+18%"], [300, 40, "+32%"]].map(([x, y, l]) => (
                <g key={String(l)}>
                  <circle cx={Number(x) || 4} cy={y as number} r="5" fill="#fff" stroke="#059669" strokeWidth="2.5" />
                </g>
              ))}
              <circle cx="396" cy="10" r="6" fill="#059669" />
              <circle cx="396" cy="10" r="6" fill="#10b981" className="site-ring" />
            </svg>
            <div className="flex justify-between px-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              <span>Week 0</span><span>Week 4</span><span>Week 8</span><span>Week 12</span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ["< 60s", "Lead response"],
                ["+32%", "Conversion"],
                ["-28%", "Cost per lead"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-zinc-50 px-3 py-2.5">
                  <p className="text-lg font-black leading-none text-zinc-950">{v}</p>
                  <p className="mt-1 text-[11px] font-semibold text-zinc-500">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Back: word cloud */}
          <div className={`${face} [transform:rotateY(180deg)]`} aria-hidden={side === 0}>
            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">What we build</p>
            <div className="mt-3 flex h-[calc(100%-1.75rem)] flex-wrap content-center items-center justify-center gap-x-4 gap-y-1.5">
              {WORDS.map((w, i) => (
                <motion.span
                  key={w.t}
                  className={`font-black leading-tight tracking-tight ${w.c}`}
                  style={{ fontSize: w.s }}
                  animate={{ y: [0, i % 2 ? -4 : 4, 0] }}
                  transition={{ duration: 3 + (i % 5) * 0.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  {w.t}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {["Pipeline", "Capabilities"].map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setSide(i as 0 | 1)}
            aria-label={`Show ${label}`}
            className={`h-2 rounded-full transition-all ${side === i ? "w-8 bg-emerald-600" : "w-2 bg-zinc-300 hover:bg-zinc-400"}`}
          />
        ))}
      </div>
    </div>
  );
}
