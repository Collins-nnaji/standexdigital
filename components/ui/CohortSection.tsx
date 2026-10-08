"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Calendar, Clock, ShieldCheck, ArrowRight, Zap, CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const weeks = [
  { week: 1, title: "Understand the Stack, Make Better Decisions", milestone: "You've audited a real AI integration", color: "#3B82F6" },
  { week: 2, title: "Build Your First AI-Powered Feature", milestone: "Working agent integrated into a real app", color: "#7C5CFC", highlight: true },
  { week: 3, title: "Give Your App a Memory", milestone: "Custom knowledge assistant over your own data", color: "#10B981" },
  { week: 4, title: "Chain Agents Together", milestone: "Multi-agent pipeline running autonomously", color: "#F59E0B" },
  { week: 5, title: "Take It to Production", milestone: "Production system with monitoring & evals", color: "#EC4899" },
  { week: 6, title: "Capstone: Build Something That Matters", milestone: "Shipped AI system + verified certificate", color: "#7C5CFC" },
];

const details = [
  { label: "Format", value: "Live Cohort", sub: "3 sessions / week", icon: Calendar },
  { label: "Commitment", value: "8–10 hrs", sub: "Per week", icon: Clock },
  { label: "Certificate", value: "Verified", sub: "On completion", icon: ShieldCheck },
  { label: "Next Cohort", value: "May 5", sub: "Q2 — Enrolling Now", icon: Zap },
];

function WeekRow({ item, index }: { item: typeof weeks[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="group flex items-center justify-between py-4 px-3 rounded-2xl hover:bg-zinc-50 transition-colors cursor-default"
    >
      <div className="flex items-center gap-4">
        {/* Animated week dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.07 + 0.2, type: "spring", stiffness: 300 }}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[11px] font-black text-white"
          style={{ backgroundColor: item.color }}
        >
          {String(item.week).padStart(2, "0")}
        </motion.div>
        <div>
          <p className="text-xs sm:text-sm font-black text-zinc-900 tracking-tight">
            {item.title}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <CheckCircle2 className="h-3 w-3 text-emerald-500/80 shrink-0" />
            <span className="text-[10px] font-bold text-zinc-400">{item.milestone}</span>
          </div>
        </div>
      </div>
      {item.highlight && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: index * 0.07 + 0.3 }}
          className="shrink-0 flex items-center gap-1.5 rounded-full border border-[#7C5CFC]/20 bg-[#7C5CFC]/8 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-[#7C5CFC]"
        >
          <div className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC] animate-pulse" />
          Live
        </motion.div>
      )}
    </motion.div>
  );
}

export function CohortSection() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const cardRef = useRef(null);
  const cardInView = useInView(cardRef, { once: true, margin: "-60px" });

  return (
    <section className="relative py-16 lg:py-24 px-4 sm:px-6 w-full bg-white border-b border-zinc-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC] animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.25em] text-zinc-500">
                Q2 Learn · Rolling Intake
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-syne text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 tracking-tight"
            >
              Build production{" "}
              <span className="text-[#7C5CFC]">AI systems.</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={headerInView ? { scaleX: 1, opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 h-px w-32 origin-left bg-gradient-to-r from-[#7C5CFC]/80 via-[#7C5CFC]/30 to-transparent"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="mt-2 max-w-xl text-sm font-medium text-zinc-500"
            >
              Six weeks. One shipped system each week. A portfolio that proves
              you can build in production, not just follow tutorials.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25 }}
          >
            <Link
              href="/Training"
              className="shrink-0 inline-flex items-center gap-2 rounded-2xl border-2 border-zinc-900 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-900 hover:bg-zinc-900 hover:text-white transition-all active:scale-95"
            >
              View Curriculum <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Week timeline */}
          <div className="flex-1 divide-y divide-zinc-100 lg:pr-4">
            {weeks.map((item, i) => (
              <WeekRow key={item.week} item={item} index={i} />
            ))}
          </div>

          {/* Info card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 24 }}
            animate={cardInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-[320px] shrink-0 lg:-translate-y-6"
          >
            <div className="group relative rounded-[32px] border-2 border-zinc-100 bg-zinc-50 p-6 sticky top-24 overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="landing-gloss-sweep" />
              </div>
              <div className="grid grid-cols-2 gap-5 mb-6">
                {details.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={cardInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="relative z-10 space-y-0.5"
                  >
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                      {d.label}
                    </p>
                    <p className="text-sm font-black text-zinc-900">{d.value}</p>
                    <p className="text-[10px] font-medium text-zinc-400">{d.sub}</p>
                  </motion.div>
                ))}
              </div>

              <Link
                href="/Training"
                className="relative z-10 flex items-center justify-center gap-2 h-12 w-full rounded-2xl bg-[#7C5CFC] text-[10px] font-black uppercase tracking-widest text-white hover:bg-[#6042db] transition-colors shadow-lg shadow-[#7C5CFC]/20 overflow-hidden"
              >
                Learn <ArrowRight className="h-3.5 w-3.5" />
                <span aria-hidden className="landing-gloss-sweep opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <p className="mt-3 text-center text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Spots limited · Rolling intake
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
