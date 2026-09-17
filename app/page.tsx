import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Database, Megaphone, Workflow } from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";

export const metadata: Metadata = {
  title: "Standex Digital | Digital Growth & BI Solutions",
  description: "Two connected practices: digital strategy and growth, plus Power Apps, Power Automate and Power BI solutions for ambitious organisations.",
};

const houses = [
  {
    href: "/digital-growth",
    eyebrow: "01 / Grow demand",
    title: "Digital Strategy & Growth",
    text: "Strategy, Google Ads, analytics, paid social, email marketing, SEO and conversion—managed as one growth system.",
    image: "/Woman-consulting.webp",
    accent: "emerald",
    icons: [BarChart3, Megaphone],
    items: ["Digital growth strategy", "Paid acquisition", "Analytics & conversion", "Lifecycle marketing"],
  },
  {
    href: "/data-solutions",
    eyebrow: "02 / Build capability",
    title: "BI Solutions",
    text: "Power Apps, Power Automate and Power BI combined into complete systems for operational data, workflows and decision-making.",
    image: "/HEROPIC2.jpg",
    accent: "violet",
    icons: [Database, Workflow, BarChart3],
    items: ["Power Apps", "Power Automate", "Power BI", "Analysis & implementation"],
  },
] as const;

export default function HomePage() {
  return <div className="min-h-screen bg-zinc-950 text-white"><TopNav /><main>
    <section className="relative overflow-hidden px-4 pb-16 pt-36 sm:px-6 sm:pt-40 lg:px-12"><div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(16,185,129,.16),transparent_32%),radial-gradient(circle_at_75%_35%,rgba(124,92,252,.2),transparent_34%)]" /><div className="relative mx-auto max-w-7xl text-center"><p className="text-xs font-bold uppercase tracking-[.3em] text-zinc-400">One company. Two specialist practices.</p><h1 className="mx-auto mt-6 max-w-5xl text-5xl font-bold leading-[.96] tracking-tight sm:text-6xl lg:text-8xl">Grow the business. <span className="text-emerald-400">Strengthen the systems.</span></h1><p className="mx-auto mt-7 max-w-3xl text-lg font-medium leading-relaxed text-zinc-300 sm:text-xl">Standex Digital brings commercial growth and technical delivery together. Enter the practice that matches the problem you need to solve.</p></div></section>

    <section className="px-4 pb-24 sm:px-6 lg:px-12"><div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">{houses.map((house) => <article key={house.href} className="group overflow-hidden rounded-[34px] border border-white/10 bg-zinc-900"><div className="relative aspect-[16/9] overflow-hidden"><Image src={house.image} alt={house.title} fill priority sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/15 to-transparent" /></div><div className="p-7 sm:p-9"><div className="flex items-center justify-between"><p className={house.accent === "emerald" ? "text-xs font-bold uppercase tracking-[.25em] text-emerald-400" : "text-xs font-bold uppercase tracking-[.25em] text-violet-400"}>{house.eyebrow}</p><div className="flex gap-2">{house.icons.map((Icon, i) => <span key={i} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-zinc-300"><Icon className="h-4 w-4" /></span>)}</div></div><h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{house.title}</h2><p className="mt-4 text-base font-medium leading-relaxed text-zinc-300">{house.text}</p><div className="mt-7 grid grid-cols-2 gap-3">{house.items.map(item => <div key={item} className="rounded-xl border border-white/10 bg-white/[.03] px-3 py-3 text-xs font-semibold text-zinc-300">{item}</div>)}</div><Link href={house.href} className={house.accent === "emerald" ? "mt-8 inline-flex min-h-13 items-center gap-3 rounded-2xl bg-emerald-500 px-6 text-sm font-bold text-white hover:bg-emerald-600" : "mt-8 inline-flex min-h-13 items-center gap-3 rounded-2xl bg-violet-600 px-6 text-sm font-bold text-white hover:bg-violet-700"}>Enter {house.title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></Link></div></article>)}</div></section>

    <section className="border-y border-white/10 bg-white/[.03] px-4 py-20 sm:px-6 lg:px-12"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-emerald-400">Why the two practices connect</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Growth needs good data. Good systems need a commercial purpose.</h2></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-white/10 bg-zinc-950 p-7"><BarChart3 className="h-7 w-7 text-emerald-400" /><h3 className="mt-6 text-xl font-bold">A clearer growth engine</h3><p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400">Marketing decisions become stronger when measurement, reporting and customer data are designed properly.</p></div><div className="rounded-3xl border border-white/10 bg-zinc-950 p-7"><Database className="h-7 w-7 text-violet-400" /><h3 className="mt-6 text-xl font-bold">Technology tied to outcomes</h3><p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400">Data and automation investments create more value when they serve a defined business and customer need.</p></div></div></div></section>

    <section className="bg-white px-4 py-16 text-zinc-950 sm:px-6 sm:py-20 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-zinc-500">Not sure where to start?</p><h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Tell us the outcome. We&apos;ll map the right path.</h2></div><Link href="/Contact" className="inline-flex min-h-14 items-center gap-3 rounded-2xl bg-zinc-950 px-7 text-sm font-bold text-white">Book a Consultation <ArrowRight className="h-4 w-4" /></Link></div></section>
  </main><Footer /></div>;
}
