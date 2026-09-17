import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { DigitalServiceIcon } from "@/components/digital-growth/DigitalServiceIcon";
import { GrowthProof } from "@/components/digital-growth/GrowthProof";
import { digitalGrowthServices } from "@/lib/digital-growth-services";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return digitalGrowthServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = digitalGrowthServices.find((item) => item.slug === slug);
  if (!service) return {};
  return { title: `${service.title} | Standex Digital`, description: service.description };
}

export default async function DigitalServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = digitalGrowthServices.find((item) => item.slug === slug);
  if (!service) notFound();
  const related = digitalGrowthServices.filter((item) => item.slug !== slug).slice(0, 3);

  return <div className="min-h-screen bg-white text-zinc-950"><TopNav /><main>
    <section className="relative overflow-hidden bg-zinc-950 px-4 pb-24 pt-36 text-white sm:px-6 sm:pt-40 lg:px-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(16,185,129,.2),transparent_32%),radial-gradient(circle_at_15%_80%,rgba(124,92,252,.16),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl"><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-bold text-zinc-400"><Link href="/digital-growth" className="hover:text-white">Digital Strategy & Growth</Link><ChevronRight className="h-3.5 w-3.5" /><span className="text-emerald-400">{service.title}</span></nav><div className="mt-12 grid items-end gap-12 lg:grid-cols-[1.15fr_.85fr]"><div><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-400"><DigitalServiceIcon name={service.icon} className="h-7 w-7" /></div><p className="mt-8 text-xs font-bold uppercase tracking-[.25em] text-emerald-400">{service.eyebrow}</p><h1 className="mt-4 text-5xl font-bold leading-[.98] tracking-tight sm:text-6xl lg:text-7xl">{service.title}</h1><p className="mt-7 max-w-3xl text-xl font-medium leading-relaxed text-zinc-300">{service.promise}</p><Link href="/Contact" className="mt-9 inline-flex min-h-14 items-center gap-3 rounded-2xl bg-emerald-500 px-7 text-sm font-bold text-white hover:bg-emerald-600">Book a Growth Consultation <ArrowRight className="h-4 w-4" /></Link></div><div className="relative aspect-[4/3] overflow-hidden rounded-[30px] border border-white/10"><Image src="/Woman-consulting.webp" alt="Digital marketing performance and analytics" fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" /><div className="absolute inset-0 bg-zinc-950/20" /></div></div></div>
    </section>

    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-12"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-violet-700">The approach</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Commercially focused from the start.</h2><p className="mt-6 text-lg font-medium leading-relaxed text-zinc-600">{service.intro}</p></div><div className="rounded-[30px] border border-zinc-200 bg-zinc-50 p-7 sm:p-9"><h3 className="text-xl font-bold">What this creates</h3><div className="mt-7 grid gap-5 sm:grid-cols-2">{service.outcomes.map(item => <div key={item} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check className="h-3.5 w-3.5" /></span><p className="text-sm font-semibold leading-relaxed text-zinc-700">{item}</p></div>)}</div></div></div></section>

    <section className="bg-zinc-950 px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-12"><div className="mx-auto max-w-7xl"><div className="grid gap-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-emerald-400">What we manage</p><h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">The work behind the result.</h2></div><div className="grid gap-px overflow-hidden rounded-[28px] border border-zinc-800 bg-zinc-800 sm:grid-cols-2">{service.deliverables.map((item, index) => <div key={item} className="bg-zinc-950 p-6"><span className="text-xs font-bold text-emerald-500">0{index + 1}</span><p className="mt-4 font-bold text-white">{item}</p></div>)}</div></div></div></section>

    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-12"><div className="mx-auto max-w-7xl"><p className="text-xs font-bold uppercase tracking-[.25em] text-zinc-500">Connected capabilities</p><h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Build the wider growth system.</h2><div className="mt-10 grid gap-5 md:grid-cols-3">{related.map(item => <Link key={item.slug} href={`/digital-growth/${item.slug}`} className="group rounded-[26px] border border-zinc-200 p-6 hover:border-emerald-300 hover:shadow-lg"><DigitalServiceIcon name={item.icon} className="h-6 w-6 text-emerald-700" /><h3 className="mt-6 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-zinc-600">{item.description}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700">View service <ArrowRight className="h-4 w-4 group-hover:translate-x-1" /></span></Link>)}</div></div></section>

    <section className="bg-emerald-500 px-4 py-16 sm:px-6 lg:px-12"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-emerald-950/60">Start with the right question</p><h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Where can digital make the biggest commercial difference?</h2></div><Link href="/Contact" className="inline-flex min-h-14 shrink-0 items-center gap-3 rounded-2xl bg-zinc-950 px-7 text-sm font-bold text-white">Discuss your growth plan <ArrowRight className="h-4 w-4" /></Link></div></section>
    <GrowthProof serviceTitle={service.title} />
  </main><Footer /></div>;
}
