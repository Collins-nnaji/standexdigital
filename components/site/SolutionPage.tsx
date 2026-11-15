"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, ChevronDown, Clock, Plus, ShieldCheck, TrendingUp, X } from "lucide-react";
import type { Offering, SolutionGroup } from "@/lib/offerings";
import { SOLUTION_DETAILS, type Part } from "@/lib/solution-details";
import { TONES } from "./tones";

type Tone = (typeof TONES)[keyof typeof TONES];

function Block({ eyebrow, title, intro, children, tone }: { eyebrow: string; title: string; intro?: string; children: React.ReactNode; tone: Tone }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      data-sec={eyebrow}
      className="mx-auto max-w-[88rem] scroll-mt-32 px-4 py-12 sm:px-8 sm:py-16"
    >
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${tone.text}`}>{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl text-balance text-2xl font-bold tracking-tight text-zinc-950 sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600">{intro}</p>}
      <div className="mt-8">{children}</div>
    </motion.section>
  );
}

function PartBody({ part, tone }: { part: Part; tone: Tone }) {
  return (
    <>
      {part.intro && (
        <div className="mx-auto max-w-[88rem] px-4 pt-12 sm:px-8">
          <p className="max-w-3xl text-lg leading-relaxed text-zinc-700 sm:text-xl">{part.intro}</p>
        </div>
      )}

      {part.challenges && part.challenges.length > 0 && (
        <Block tone={tone} eyebrow="The challenge" title={part.challengesTitle ?? "Problems we solve every week."}>
          <div className="grid gap-4 md:grid-cols-2">
            {part.challenges.map((c) => (
              <article key={c.title} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-6">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${tone.chip}`}>
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-950">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{c.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Block>
      )}

      {part.capabilities && part.capabilities.length > 0 && (
        <Block tone={tone} eyebrow="What we build" title={part.capabilitiesTitle ?? "Capabilities"}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {part.capabilities.map((c, i) => (
              <article key={c.title} className="group rounded-2xl border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-[0_24px_50px_-28px_rgba(16,24,40,0.4)]">
                <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 text-xs font-bold ${tone.chip}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-semibold text-zinc-950">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{c.text}</p>
              </article>
            ))}
          </div>
        </Block>
      )}

      {part.spotlight && (
        <Block tone={tone} eyebrow={part.spotlight.eyebrow} title={part.spotlight.title} intro={part.spotlight.intro}>
          <div className="grid gap-4 md:grid-cols-2">
            {part.spotlight.items.map((it) => (
              <article key={it.title} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
                {it.tag && <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${tone.chip}`}>{it.tag}</span>}
                <h3 className="mt-3 font-semibold text-zinc-950">{it.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{it.text}</p>
              </article>
            ))}
          </div>
          {part.spotlight.note && <p className="mt-5 text-sm text-zinc-500">{part.spotlight.note}</p>}
        </Block>
      )}

      {part.products && (
        <Block tone={tone} eyebrow={part.products.eyebrow} title={part.products.title} intro={part.products.intro}>
          <div className="grid gap-4 md:grid-cols-3">
            {part.products.items.map((p) => (
              <article key={p.name} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <h3 className="text-lg font-bold text-zinc-950">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{p.summary}</p>
                <ul className="mt-4 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-sm text-zinc-700">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone.text}`} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Block>
      )}

      {part.useCases && part.useCases.length > 0 && (
        <Block tone={tone} eyebrow="Use cases" title="Where teams put it to work.">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {part.useCases.map((u) => (
              <article key={u.team} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <h3 className="font-semibold text-zinc-950">{u.team}</h3>
                <ul className="mt-3 space-y-2">
                  {u.examples.map((e) => (
                    <li key={e} className="flex gap-2 text-sm leading-relaxed text-zinc-600">
                      <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${tone.dot}`} />
                      {e}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Block>
      )}

      {((part.outcomes && part.outcomes.length > 0) || (part.metrics && part.metrics.length > 0)) && (
        <section data-sec="Outcomes" className={`mx-4 my-6 scroll-mt-32 rounded-3xl bg-gradient-to-br ${tone.dark} py-12 text-white sm:mx-8 sm:py-16`}>
          <div className="mx-auto max-w-[88rem] px-4 sm:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">Outcomes</p>
            <h2 className="mt-3 text-2xl font-bold text-white sm:text-4xl">What you can expect.</h2>
            {part.metrics && part.metrics.length > 0 && (
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {part.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 backdrop-blur">
                    <p className="text-4xl font-black tracking-tight text-white">{m.value}</p>
                    <p className="mt-2 font-semibold text-white">{m.label}</p>
                    <p className="mt-1 text-sm text-white/60">{m.note}</p>
                  </div>
                ))}
              </div>
            )}
            {part.outcomes && (
              <ul className="mt-8 grid gap-3 md:grid-cols-2">
                {part.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-relaxed text-white/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15"><Check className="h-3 w-3" strokeWidth={3} /></span>
                    {o}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {part.deliverables && part.deliverables.length > 0 && (
        <Block tone={tone} eyebrow="Deliverables" title="What is included.">
          <div className="grid gap-3 md:grid-cols-2">
            {part.deliverables.map((d) => (
              <div key={d.title} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5">
                <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${tone.chip}`}><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                <div>
                  <h3 className="font-semibold text-zinc-950">{d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Block>
      )}

      {part.process && part.process.length > 0 && (
        <Block tone={tone} eyebrow="How we deliver" title="From first conversation to live.">
          <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {part.process.map((s, i) => (
              <li key={s.title} className="relative rounded-2xl border border-zinc-200 bg-white p-6">
                <div className="flex items-center justify-between">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">{i + 1}</span>
                  {s.duration && <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone.chip}`}>{s.duration}</span>}
                </div>
                <h3 className="mt-4 font-semibold text-zinc-950">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </Block>
      )}

      {part.engagements && part.engagements.length > 0 && (
        <Block tone={tone} eyebrow="Ways to work with us" title="Choose how we engage.">
          <div className="grid gap-4 lg:grid-cols-3">
            {part.engagements.map((e) => (
              <article key={e.name} className={`rounded-3xl border p-7 ${e.featured ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white"}`}>
                <p className={`text-xs font-semibold ${e.featured ? "text-white/60" : "text-zinc-500"}`}>{e.tag}</p>
                <h3 className="mt-1 text-xl font-bold">{e.name}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${e.featured ? "text-white/80" : "text-zinc-600"}`}>{e.text}</p>
                <ul className="mt-5 space-y-2">
                  {e.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${e.featured ? "text-emerald-300" : tone.text}`} />
                      {it}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Block>
      )}

      {((part.integrations && part.integrations.length > 0) || (part.governance && part.governance.length > 0) || (part.idealFor && part.idealFor.length > 0) || (part.tools && part.tools.length > 0)) && (
        <Block tone={tone} eyebrow="Fit & control" title="Integrations, governance and who it suits.">
          <div className="grid gap-6 lg:grid-cols-2">
            {part.integrations && part.integrations.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-zinc-950">Connects with</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {part.integrations.map((i) => <span key={i} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">{i}</span>)}
                </div>
              </div>
            )}
            {part.tools && part.tools.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-zinc-950">Tools we use</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {part.tools.map((i) => <span key={i} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">{i}</span>)}
                </div>
              </div>
            )}
            {part.idealFor && part.idealFor.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-zinc-950">Ideal for</p>
                <ul className="mt-3 space-y-2">
                  {part.idealFor.map((i) => <li key={i} className="flex gap-2 text-sm text-zinc-600"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone.text}`} />{i}</li>)}
                </ul>
              </div>
            )}
            {part.governance && part.governance.length > 0 && (
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold text-zinc-950"><ShieldCheck className={`h-4 w-4 ${tone.text}`} /> Governance & security</p>
                <ul className="mt-3 space-y-2">
                  {part.governance.map((i) => <li key={i} className="flex gap-2 text-sm text-zinc-600"><Check className={`mt-0.5 h-4 w-4 shrink-0 ${tone.text}`} />{i}</li>)}
                </ul>
              </div>
            )}
          </div>
        </Block>
      )}

      {part.faqs && part.faqs.length > 0 && (
        <Block tone={tone} eyebrow="FAQs" title="Questions we hear most.">
          <div className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white">
            {part.faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-zinc-950">
                  {f.q}
                  <ChevronDown className="h-4 w-4 shrink-0 transition group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{f.a}</p>
              </details>
            ))}
          </div>
        </Block>
      )}
    </>
  );
}

export function SolutionPage({
  group,
  offering,
  partIndex = 0,
  onClose,
}: {
  group: SolutionGroup;
  offering?: Offering;
  partIndex?: number;
  onClose: () => void;
}) {
  const tone = TONES[group.tone];
  const detail = SOLUTION_DETAILS.find((d) => d.id === group.id)!;
  const [idx, setIdx] = useState(Math.min(partIndex, detail.parts.length - 1));
  const part = detail.parts[idx];
  const scroller = useRef<HTMLDivElement>(null);
  const [sections, setSections] = useState<string[]>([]);
  const [activeSec, setActiveSec] = useState("");

  // Build the in-page section nav for the current tab and track the section in view.
  useEffect(() => {
    const root = scroller.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-sec]"));
    setSections(els.map((e) => e.dataset.sec!));
    setActiveSec(els[0]?.dataset.sec ?? "");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActiveSec((e.target as HTMLElement).dataset.sec!)),
      { root, rootMargin: "-25% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [idx]);

  const jump = (label: string) => {
    const el = Array.from(scroller.current?.querySelectorAll<HTMLElement>("[data-sec]") ?? []).find((e) => e.dataset.sec === label);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const pick = (i: number) => {
    setIdx(i);
    scroller.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      ref={scroller}
      role="dialog"
      aria-modal="true"
      aria-label={group.title}
      className="fixed inset-0 z-[100] overflow-y-auto bg-white"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 60 }}
      transition={{ type: "spring", damping: 30, stiffness: 260 }}
    >
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-zinc-200 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[88rem] items-center gap-3 px-4 py-3 sm:px-8">
          <button type="button" onClick={onClose} className="flex shrink-0 items-center gap-2 rounded-full border border-zinc-300 px-3.5 py-2 text-sm font-semibold text-zinc-800 transition hover:border-zinc-950">
            <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">All solutions</span>
          </button>
          <p className="hidden truncate text-sm font-bold text-zinc-950 md:block">{group.title}</p>
          <div className="site-hide-scrollbar ml-auto flex min-w-0 gap-1.5 overflow-x-auto">
            {detail.parts.length > 1 &&
              detail.parts.map((p, i) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => pick(i)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${i === idx ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"}`}
                >
                  {p.name}
                </button>
              ))}
          </div>
          <Link href="/contact" className="hidden shrink-0 items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:inline-flex">
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
          <button type="button" onClick={onClose} aria-label="Close" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 transition hover:bg-zinc-200">
            <X className="h-4 w-4" />
          </button>
        </div>
        {sections.length > 1 && (
          <div className="border-t border-zinc-100 lg:hidden">
            <div className="site-hide-scrollbar mx-auto flex max-w-[88rem] gap-1 overflow-x-auto px-4 py-2 sm:px-8">
              {sections.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => jump(label)}
                  className={`shrink-0 border-b-2 px-3 py-1.5 text-xs font-semibold transition ${activeSec === label ? `border-zinc-950 text-zinc-950` : "border-transparent text-zinc-500 hover:text-zinc-800"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${tone.dark} text-white`}>
        <div className={`site-blob pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full ${tone.glow} blur-3xl`} />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]" />
        <div className="relative mx-auto grid max-w-[88rem] items-center gap-10 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider">
               {group.number} · {part.eyebrow ?? group.tagline}
            </span>
            <h1 className="mt-6 text-4xl font-black text-white leading-[1.05] tracking-tight sm:text-6xl">
              {group.title}
              {detail.parts.length > 1 && <span className="block text-white/60">{part.name}</span>}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl">{part.promise}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-50">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80"><TrendingUp className="h-4 w-4" /> {group.metric}</span>
            </div>
          </div>
          {part.image && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/15 shadow-2xl">
              <Image src={part.image} alt={`${group.title} example`} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
            </div>
          )}
        </div>
      </section>

      {/* The offering the visitor tapped */}
      {offering && (
        <div className="mx-auto -mt-8 max-w-[88rem] px-4 sm:px-8">
          <div className="relative z-10 rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_30px_60px_-30px_rgba(16,24,40,0.35)] sm:p-8">
            <p className={`flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] ${tone.text}`}><Plus className="h-3.5 w-3.5" /> You opened</p>
            <h2 className="mt-2 text-2xl font-bold text-zinc-950">{offering.title}</h2>
            <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-zinc-600">{offering.details}</p>
            <div className="mt-5 grid gap-6 md:grid-cols-[1.3fr_1fr]">
              <ul className="grid gap-2 sm:grid-cols-2">
                {offering.includes.map((i) => (
                  <li key={i} className="flex gap-2.5 text-sm font-medium text-zinc-800">
                    <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone.chip}`}><Check className="h-3 w-3" strokeWidth={3} /></span>
                    {i}
                  </li>
                ))}
              </ul>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                <div className="rounded-2xl bg-zinc-50 p-4"><p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500"><TrendingUp className="h-3.5 w-3.5" /> Outcome</p><p className="mt-1 text-sm font-semibold text-zinc-900">{offering.outcome}</p></div>
                <div className="rounded-2xl bg-zinc-50 p-4"><p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-500"><Clock className="h-3.5 w-3.5" /> Timeline</p><p className="mt-1 text-sm font-semibold text-zinc-900">{offering.timeline}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-[88rem] gap-2 lg:flex lg:px-4">
        {sections.length > 1 && (
          <aside className="hidden w-56 shrink-0 lg:block">
            <nav aria-label="Sections" className="sticky top-24 py-12">
              <p className="px-3 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">On this page</p>
              <ul className="relative mt-3 border-l border-zinc-200">
                {sections.map((label) => {
                  const on = activeSec === label;
                  return (
                    <li key={label} className="relative">
                      {on && <motion.span layoutId="detail-rail" className={`absolute -left-px top-1 bottom-1 w-0.5 rounded-full bg-gradient-to-b ${tone.grad}`} />}
                      <button
                        type="button"
                        onClick={() => jump(label)}
                        className={`block w-full py-2 pl-4 pr-2 text-left text-sm transition ${on ? "font-bold text-zinc-950" : "font-medium text-zinc-500 hover:text-zinc-800"}`}
                      >
                        {label}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <Link href="/contact" className={`mt-6 flex min-h-11 items-center justify-between rounded-2xl bg-gradient-to-r ${tone.grad} px-4 text-sm font-semibold text-white`}>
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </aside>
        )}
        <div className="min-w-0 flex-1">
          <PartBody part={part} tone={tone} />
        </div>
      </div>

      <section className="mx-auto max-w-[88rem] px-4 pb-16 sm:px-8">
        <div className={`flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-br ${tone.dark} p-8 text-white sm:flex-row sm:items-center sm:p-12`}>
          <div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Talk to a senior architect about {group.title}.</h2>
            <p className="mt-2 text-white/70">Reply within one business day. No sales pressure.</p>
          </div>
          <Link href="/contact" className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-zinc-950 transition hover:bg-emerald-50">
            Contact Us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </motion.div>
  );
}
