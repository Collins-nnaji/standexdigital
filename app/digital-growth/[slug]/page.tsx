import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { DigitalServiceIcon } from "@/components/digital-growth/DigitalServiceIcon";
import { GrowthProof } from "@/components/digital-growth/GrowthProof";
import { Breadcrumbs, ButtonLink, CTABand, CheckList, Container, Eyebrow, FAQSection, HeroBackdrop, ProcessSteps, Section, SectionHeading } from "@/components/site/ui";
import { digitalGrowthServices, getDigitalGrowthService } from "@/lib/digital-growth-services";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return digitalGrowthServices.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getDigitalGrowthService(slug);
  if (!service) return {};
  return { title: `${service.title} | Standex Digital`, description: service.description };
}

export default async function DigitalServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getDigitalGrowthService(slug);
  if (!service) notFound();
  const related = digitalGrowthServices.filter((item) => item.slug !== slug);

  return (
    <div data-site className="min-h-screen bg-white text-zinc-950">
      <TopNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
          <HeroBackdrop />
          <Container className="relative">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/digital-growth", label: "Digital Growth" }, { label: service.title }]} />
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                    <DigitalServiceIcon name={service.icon} className="h-6 w-6" />
                  </span>
                  <Eyebrow>{service.eyebrow}</Eyebrow>
                </div>
                <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{service.title}</h1>
                <p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-600">{service.promise}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/Contact">Book a consultation</ButtonLink>
                  <ButtonLink href="#included" variant="outline">What&apos;s included</ButtonLink>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 shadow-[0_40px_80px_-40px_rgba(16,24,40,0.45)]">
                  <Image src={service.image} alt={`${service.title} services`} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
                <div className="absolute -bottom-6 left-4 right-4 grid grid-cols-2 gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl sm:left-8 sm:right-8">
                  {service.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <p className="text-lg font-bold text-emerald-700">{m.value}</p>
                      <p className="text-xs font-medium text-zinc-600">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Challenges */}
        <Section tone="muted">
          <SectionHeading eyebrow="The challenge" title="Common problems we're brought in to fix." intro={service.description} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {service.challenges.map((c) => (
              <article key={c.title} className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                  <AlertTriangle className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-zinc-950">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-600">{c.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Approach + outcomes */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <SectionHeading eyebrow="Our approach" title="Commercially focused from day one." intro={service.intro} />
              <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">Ideal for</p>
                <CheckList items={service.idealFor} className="mt-4" />
              </div>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 sm:p-9">
              <h3 className="text-xl font-semibold">What you can expect</h3>
              <p className="mt-2 text-sm text-zinc-500">The outcomes we design every {service.shortTitle.toLowerCase()} engagement around.</p>
              <CheckList items={service.outcomes} className="mt-7" />
            </div>
          </div>
        </Section>

        {/* Deliverables */}
        <Section id="included" tone="mint">
          <SectionHeading eyebrow="What's included" title="The work behind the result." intro="A complete, senior-led service. We tailor the mix to your goals, but these are the building blocks." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.deliverables.map((d, i) => (
              <article key={d.title} className="rounded-2xl border border-emerald-100 bg-white p-6">
                <span className="text-xs font-bold text-emerald-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold text-zinc-950">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{d.text}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Process */}
        <Section>
          <SectionHeading eyebrow="How it runs" title="A clear plan for the first 90 days and beyond." />
          <div className="mt-12">
            <ProcessSteps steps={service.process} />
          </div>
          <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:flex-row md:items-center">
            <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">Platforms & tools</p>
            <div className="flex flex-wrap gap-2">
              {service.tools.map((t) => (
                <span key={t} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">{t}</span>
              ))}
            </div>
          </div>
        </Section>

        <GrowthProof serviceTitle={service.title} />

        <FAQSection faqs={service.faqs} title={`${service.title}: your questions answered`} />

        {/* Related */}
        <Section>
          <SectionHeading eyebrow="Connected capabilities" title="Build the wider growth system." intro="Each service is stronger alongside the others. Here's how the rest of the practice fits together." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <Link key={item.slug} href={`/digital-growth/${item.slug}`} className="group rounded-2xl border border-zinc-200 p-6 transition hover:border-emerald-300 hover:shadow-lg">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <DigitalServiceIcon name={item.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  View service <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Section>

        <CTABand
          eyebrow={service.title}
          title="Let's see where the biggest opportunity is."
          text={`Book a free consultation and we'll review your current ${service.shortTitle.toLowerCase()} activity and tell you what we'd change first.`}
          secondary={{ href: "/digital-growth", label: "All growth services" }}
        />
      </main>
      <Footer />
    </div>
  );
}
