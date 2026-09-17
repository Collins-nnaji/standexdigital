import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Compass, LineChart, Repeat2 } from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { DigitalServiceIcon } from "@/components/digital-growth/DigitalServiceIcon";
import { GrowthProof } from "@/components/digital-growth/GrowthProof";
import { digitalGrowthServices } from "@/lib/digital-growth-services";

export const metadata: Metadata = {
  title: "Digital Strategy & Growth | Standex Digital",
  description: "Digital growth strategy, Google Ads, analytics, paid social, email marketing, SEO and conversion managed as one commercial system.",
};

const model = [
  { icon: Compass, title: "Set the direction", text: "Translate commercial goals into audiences, priorities, channels and a measurable roadmap." },
  { icon: LineChart, title: "Build the engine", text: "Connect campaigns, content, landing pages, analytics and follow-up into one acquisition system." },
  { icon: Repeat2, title: "Improve every month", text: "Use evidence to refine creative, conversion, channel mix and where the next pound should go." },
];

export default function DigitalGrowthPage() {
  return <div className="min-h-screen bg-white text-zinc-950">
    <TopNav />
    <main>
      <section className="relative overflow-hidden bg-zinc-950 px-4 pb-24 pt-36 text-white sm:px-6 sm:pt-40 lg:px-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,.18),transparent_36%),radial-gradient(circle_at_85%_70%,rgba(124,92,252,.17),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div><p className="text-xs font-bold uppercase tracking-[.28em] text-emerald-400">Digital Strategy & Growth</p><h1 className="mt-6 text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl lg:text-7xl">A complete digital growth function, without building one in-house.</h1><p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-zinc-300 sm:text-xl">Strategy, acquisition, analytics, conversion and customer journeys—managed together around profitable growth.</p><div className="mt-9 flex flex-col gap-4 sm:flex-row"><Link href="/Contact" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-7 text-sm font-bold text-white hover:bg-emerald-600">Book a Growth Consultation <ArrowRight className="h-4 w-4" /></Link><Link href="#services" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 px-7 text-sm font-bold text-white hover:bg-white/10">Explore capabilities</Link></div></div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-white/10"><Image src="/Woman-consulting.webp" alt="Digital marketing analytics and performance dashboard" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-zinc-950/75 p-5 backdrop-blur"><p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-400">One connected system</p><p className="mt-2 font-semibold text-white">Demand → conversion → measurement → improvement</p></div></div>
        </div>
      </section>

      <section id="services" className="scroll-mt-24 px-4 py-20 sm:px-6 sm:py-28 lg:px-12"><div className="mx-auto max-w-7xl"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-emerald-700">Digital capabilities</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Everything needed to plan, win and measure demand.</h2><p className="mt-5 text-lg font-medium leading-relaxed text-zinc-600">Choose a capability to see the full service. In an ongoing partnership, we combine only the parts your growth plan needs.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{digitalGrowthServices.map((service) => <Link key={service.slug} href={`/digital-growth/${service.slug}`} className="group rounded-[28px] border border-zinc-200 bg-zinc-50 p-7 transition hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700"><DigitalServiceIcon name={service.icon} /></div><p className="mt-8 text-xs font-bold uppercase tracking-[.2em] text-zinc-500">{service.eyebrow}</p><h3 className="mt-3 text-2xl font-bold text-zinc-950">{service.title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-zinc-600">{service.description}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">View service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>

      <section className="bg-zinc-950 px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-violet-400">How the partnership works</p><h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Strategy and delivery stay in the same room.</h2><div className="mt-12 grid gap-5 md:grid-cols-3">{model.map(({icon: Icon,title,text}, i) => <article key={title} className="rounded-[28px] border border-white/10 bg-white/[.04] p-7"><div className="flex items-center justify-between"><Icon className="h-7 w-7 text-emerald-400" /><span className="text-xs font-bold text-zinc-600">0{i+1}</span></div><h3 className="mt-8 text-xl font-bold text-white">{title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-zinc-400">{text}</p></article>)}</div></div></section>

      <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-12"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><div className="relative aspect-[16/10] overflow-hidden rounded-[32px]"><Image src="/HomeAboutPic.webp" alt="Marketing specialist reviewing business performance data" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" /></div><div><p className="text-xs font-bold uppercase tracking-[.25em] text-violet-700">Designed for established SMEs</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Senior thinking. Practical execution. Clear accountability.</h2><div className="mt-7 space-y-4">{["One roadmap across your digital channels", "Monthly priorities and transparent reporting", "Specialist capability without multiple disconnected agencies", "Technology and automation support when growth needs it"].map(item => <p key={item} className="flex gap-3 font-semibold text-zinc-700"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{item}</p>)}</div><Link href="/Contact" className="mt-9 inline-flex items-center gap-2 rounded-2xl bg-zinc-950 px-7 py-4 text-sm font-bold text-white">Discuss your growth plan <ArrowRight className="h-4 w-4" /></Link></div></div></section>
      <GrowthProof />
    </main><Footer />
  </div>;
}
