import Image from "next/image";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Info, Lock } from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { Breadcrumbs, ButtonLink, CTABand, CheckList, Container, Eyebrow, FAQSection, HeroBackdrop, ProcessSteps, Section, SectionHeading } from "@/components/site/ui";
import { biSolutions, type BISolution } from "@/lib/bi-solutions";

export function BISolutionPage({ solution }: { solution: BISolution }) {
  const others = biSolutions.filter((s) => s.slug !== solution.slug);
  const a = solution.accent;
  const name = solution.displayName ?? solution.title;

  return (
    <div data-site className="min-h-screen bg-white text-zinc-950">
      <TopNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-28 sm:pt-32">
          <HeroBackdrop />
          <Container className="relative">
            <Breadcrumbs items={[{ href: "/", label: "Home" }, { href: "/data-solutions", label: "BI Solutions" }, { label: name }]} />
            <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 shadow-sm">
                    <Image src={solution.logo} alt="" width={32} height={32} className="h-8 w-8" />
                  </span>
                  <Eyebrow>{solution.eyebrow}</Eyebrow>
                </div>
                <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
                  Microsoft {name} <span className="text-emerald-600">consulting & delivery</span>
                </h1>
                <p className="mt-6 max-w-2xl text-xl leading-relaxed text-zinc-600">{solution.promise}</p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/Contact">Discuss your project</ButtonLink>
                  <ButtonLink href="#use-cases" variant="outline">See use cases</ButtonLink>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-[0_40px_80px_-40px_rgba(16,24,40,0.45)]">
                  <Image src={solution.image} alt={`${name} solution example`} fill priority sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
                <div className="absolute -bottom-6 left-4 right-4 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl sm:left-8 sm:right-auto">
                  <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
                  <p className="text-sm font-semibold text-zinc-900">{solution.role}</p>
                  <span className="hidden text-xs text-zinc-500 sm:inline">· part of a connected BI system</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Challenges */}
        <Section tone="muted">
          <SectionHeading eyebrow="The challenge" title="Problems we solve every week." intro={solution.description} />
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {solution.challenges.map((c) => (
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

        {/* Approach */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <SectionHeading eyebrow="Our approach" title={`${name}, designed around how your business works.`} intro={solution.intro} />
            <div className="rounded-2xl border border-zinc-200 bg-white p-7 sm:p-9">
              <h3 className="text-xl font-semibold">What you can expect</h3>
              <CheckList items={solution.outcomes} className="mt-6" />
            </div>
          </div>
        </Section>

        {/* Capabilities */}
        <Section tone="mint">
          <SectionHeading eyebrow="Capabilities" title={`What we build with ${solution.title}.`} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solution.capabilities.map((c) => (
              <article key={c.title} className="rounded-2xl border border-emerald-100 bg-white p-6">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${a.bg} ${a.text} ring-1 ${a.ring}`}>{solution.title}</span>
                <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{c.text}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Spotlight (e.g. Microsoft Fabric & data agents) */}
        {solution.spotlight && (
          <Section id="spotlight">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <SectionHeading eyebrow={solution.spotlight.eyebrow} title={solution.spotlight.title} intro={solution.spotlight.intro} />
                {solution.spotlight.note && (
                  <div className="mt-8 flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
                    <p className="text-sm leading-relaxed text-zinc-700">{solution.spotlight.note}</p>
                  </div>
                )}
                <ButtonLink href="/Contact" className="mt-8">Discuss your data platform</ButtonLink>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {solution.spotlight.items.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-emerald-200 hover:shadow-[0_12px_40px_-20px_rgba(16,24,40,0.25)]">
                    {item.tag && (
                      <span className={item.tag === "Data agents" ? "inline-flex rounded-full bg-zinc-950 px-2.5 py-1 text-[11px] font-semibold text-white" : "inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 ring-1 ring-emerald-100"}>{item.tag}</span>
                    )}
                    <h3 className="mt-4 font-semibold text-zinc-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Section>
        )}

        {/* Use cases */}
        <Section id="use-cases">
          <SectionHeading eyebrow="Use cases" title="Practical solutions for every department." intro={`A selection of the ${solution.title} solutions organisations ask us for most often.`} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solution.useCases.map((u) => (
              <article key={u.team} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <h3 className="text-base font-semibold text-zinc-950">{u.team}</h3>
                <ul className="mt-4 space-y-2">
                  {u.examples.map((e) => (
                    <li key={e} className="flex items-center gap-2.5 text-sm text-zinc-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {e}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        {/* Deliverables */}
        <Section tone="muted">
          <SectionHeading eyebrow="What's included" title="End-to-end delivery, not just a build." intro="We handle the analysis, design, build and adoption work that makes a Power Platform solution succeed." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solution.deliverables.map((d, i) => (
              <article key={d.title} className="rounded-2xl border border-zinc-200 bg-white p-6">
                <span className="text-xs font-bold text-emerald-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{d.text}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Process */}
        <Section>
          <SectionHeading eyebrow="Delivery approach" title="Short cycles. Visible progress. No surprises." intro="Indicative timelines—we'll confirm a precise plan once we understand your scope." />
          <div className="mt-12">
            <ProcessSteps steps={solution.process} />
          </div>
        </Section>

        {/* Integrations + governance (dark band) */}
        <Section tone="dark">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading dark eyebrow="Integrations" title="Works with the systems you already run." intro={`${solution.title} connects natively across Microsoft 365 and to hundreds of other platforms.`} />
              <div className="mt-8 flex flex-wrap gap-2">
                {solution.integrations.map((i) => (
                  <span key={i} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200">{i}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400"><Lock className="h-5 w-5" /></span>
                <h3 className="text-lg font-semibold text-white">Governance & security built in</h3>
              </div>
              <CheckList dark items={solution.governance} className="mt-6" />
            </div>
          </div>
        </Section>

        {/* Connected system */}
        <Section>
          <SectionHeading eyebrow="Better together" title="Part of one connected BI system." intro="Power Apps captures the data, Power Automate moves it, Power BI and Fabric turn it into decisions, and Copilot Studio lets people ask and act. Most clients combine several." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={o.href} className="group flex flex-col items-start gap-5 rounded-2xl border border-zinc-200 p-6 transition hover:border-emerald-300 hover:shadow-lg">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2">
                  <Image src={o.logo} alt="" width={32} height={32} className="h-8 w-8" />
                </span>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${o.accent.text}`}>{o.role}</p>
                  <h3 className="mt-1 text-lg font-semibold">{o.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{o.description}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                    Explore {o.title} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <FAQSection faqs={solution.faqs} title={`${name}: your questions answered`} />

        <CTABand
          eyebrow={`Microsoft ${name}`}
          title="Let's scope your solution."
          text="Tell us about the process or reporting challenge. We'll suggest an approach, an indicative timeline and the licensing you'll need."
          primary={{ href: "/Contact", label: "Discuss your project" }}
          secondary={{ href: "/data-solutions", label: "All BI solutions" }}
        />
      </main>
      <Footer />
    </div>
  );
}
