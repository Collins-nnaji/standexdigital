import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Bot, BarChart3, Layers3, Cloud, Megaphone, GraduationCap, FileText, ClipboardList, Receipt, KeyRound } from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { HeroFlipCard } from "@/components/site/HeroFlipCard";
import { PlatformMarquee } from "@/components/site/PlatformMarquee";
import { WhyAnimated } from "@/components/site/WhyAnimated";
import { Reveal } from "@/components/site/Reveal";
import { SolutionsCarousel } from "@/components/site/SolutionsCarousel";
import {
  ButtonLink,
  CTABand,
  CheckList,
  Container,
  Eyebrow,
  FAQSection,
  HeroBackdrop,
  IconCard,
  ProcessSteps,
  Section,
  SectionHeading,
} from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Standex Digital | AI, Data, Apps and Marketing",
  description:
    "Enterprise AI, Power BI, Power Apps, Salesforce and digital marketing solutions designed to eliminate manual bottlenecks, capture leads, and accelerate company growth.",
};

const contractTerms = [
  {
    icon: FileText,
    title: "Paperwork on request",
    text: "Mutual NDA, Statement of Work and a UK GDPR Data Processing Agreement, ready to review before we start. English law, Standex Digital Limited as the contracting party.",
  },
  {
    icon: ClipboardList,
    title: "Agreed scope first",
    text: "Every project has a written SOW: deliverables, what is out of scope, milestones and acceptance criteria. Changes are agreed in writing before any extra work.",
  },
  {
    icon: Receipt,
    title: "Milestone billing",
    text: "Fixed price or an agreed day rate. Fixed-price work is invoiced in stages: a deposit on signature, the balance as milestones are accepted.",
  },
  {
    icon: KeyRound,
    title: "You own what we build",
    text: "Work is built in your own tenant. Rights in custom deliverables pass to you on payment, and each deliverable comes with a defect-fix warranty period.",
  },
] as const;

const faqs = [
  {
    q: "How do your solutions drive tangible company growth?",
    a: "We remove the friction between a lead arriving and a deal closing: better lead capture and follow-up, apps and workflows that replace spreadsheets, reporting leadership can rely on, and marketing that brings in the right enquiries.",
  },
  {
    q: "Do we have to use all five solutions?",
    a: "No. Most clients start with one immediate priority—often automating lead intake, replacing a painful spreadsheet with a Power App, or unifying reporting in Power BI. Because our solutions share a connected architecture, future capabilities plug in effortlessly.",
  },
  {
    q: "Who owns the applications, data, and IP?",
    a: "You do. Everything is engineered directly inside your own Microsoft 365, Azure, or Salesforce tenant. You keep ownership of your data, intellectual property and administrative control, with no proprietary lock-in.",
  },
  {
    q: "How does an engagement typically start?",
    a: "With a short conversation about what you are trying to fix. We review your current setup, recommend the simplest approach and send a clear, costed plan.",
  },
];

export default function HomePage() {
  return (
    <div data-site className="min-h-screen bg-white text-zinc-950 antialiased selection:bg-emerald-500 selection:text-white">
      <TopNav />

      <main>
        {/* HERO: left copy, right image */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 lg:pb-24">
          <HeroBackdrop />
          <div className="site-blob pointer-events-none absolute left-1/3 top-10 h-72 w-72 rounded-full bg-violet-200/40 blur-3xl" />
          <div className="site-blob pointer-events-none absolute bottom-0 right-1/4 h-80 w-80 rounded-full bg-teal-200/40 blur-3xl [animation-delay:-6s]" />

          <Container className="relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1.35fr_1fr] xl:gap-16">
              <div>

                <Reveal delay={0.08}>
                  <h1 className="text-6xl font-black leading-[1] tracking-tight text-zinc-950 sm:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
                    <span className="block">Think Digital.</span>
                    <span className="site-gradient-text block whitespace-nowrap pb-[0.12em] bg-gradient-to-r from-emerald-600 via-teal-500 to-violet-500 bg-clip-text text-transparent">
                      Grow Bigger.
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={0.16}>
                  <ul className="mt-8 grid max-w-xl grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {[
                      [Bot, "AI agents & Copilot Studio", "bg-violet-100 text-violet-700"],
                      [BarChart3, "Power BI & Fabric reporting", "bg-amber-100 text-amber-700"],
                      [Layers3, "Power Apps & Automate", "bg-emerald-100 text-emerald-700"],
                      [Cloud, "Salesforce CRM", "bg-sky-100 text-sky-700"],
                      [Megaphone, "Google Ads, SEO & email", "bg-rose-100 text-rose-700"],
                      [GraduationCap, "Training for your team", "bg-indigo-100 text-indigo-700"],
                    ].map(([Icon, label, tone]) => {
                      const I = Icon as typeof Bot;
                      return (
                        <li key={label as string} className="flex items-center gap-3 text-[15px] font-semibold text-zinc-800">
                          <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tone as string}`}>
                            <I className="h-4 w-4" />
                          </span>
                          {label as string}
                        </li>
                      );
                    })}
                  </ul>
                </Reveal>

                <Reveal delay={0.24}>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <ButtonLink href="/contact" variant="primary">
                      Contact Us
                    </ButtonLink>
                    <ButtonLink href="#solutions" variant="outline">
                      Explore Solutions
                    </ButtonLink>
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.2} y={40}>
                <HeroFlipCard />
              </Reveal>
            </div>
          </Container>
        </section>

        <PlatformMarquee />

        <Section id="solutions" className="overflow-hidden">
          <SectionHeading
            oneLine
            eyebrow="Core Offerings"
            title="Six Services. One Connected Team."
            intro="Swipe through what we offer, or combine services into one plan."
          />
          <div className="mt-10">
            <SolutionsCarousel />
          </div>
        </Section>

        {/* WHY STANDEX */}
        <section id="growth-system" className="relative scroll-mt-24 overflow-hidden bg-zinc-50 py-20 sm:py-24">
          <Image
            src="/Innovative.webp"
            alt=""
            fill
            sizes="100vw"
            className="pointer-events-none object-cover opacity-[0.28]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-50/90 via-zinc-50/30 to-zinc-50/90" />
          <Container className="relative">
            <Reveal>
              <SectionHeading
                oneLine
                eyebrow="Why Standex Digital"
                title="Senior people. Clear scope. You own the result."
                intro="A small team of experienced architects and marketers, working inside your own Microsoft 365, Azure or Salesforce setup."
              />
            </Reveal>

            <div className="mt-10">
              <WhyAnimated />
            </div>

            <Reveal className="mt-8">
              <div className="grid gap-x-8 gap-y-3 rounded-3xl border border-zinc-200 bg-white p-6 sm:grid-cols-2 sm:p-8">
                {[
                  "Senior architects do the work, not junior handoffs",
                  "Milestone delivery with regular demos",
                  "Built in your own tenant, so you keep full ownership",
                  "Documentation and training included",
                ].map((t) => (
                  <p key={t} className="flex items-start gap-3 text-sm font-medium text-zinc-800">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    {t}
                  </p>
                ))}
              </div>
            </Reveal>

          </Container>
        </section>

        {/* HOW WE CONTRACT */}
        <Section id="how-we-contract">
          <SectionHeading
            eyebrow="How We Contract"
            title="Clear terms before any work starts."
            intro="What your procurement or legal team can expect when working with us."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contractTerms.map((t) => (
              <IconCard key={t.title} icon={t.icon} title={t.title} text={t.text} />
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-600">
              <span className="font-semibold text-zinc-900">Standex Digital Limited</span>, registered in England and Wales,
              company no. 15642053.
            </p>
            <ButtonLink href="mailto:support@standexdigital.com?subject=Contract%20documents%20request" variant="outline">
              Request our documents
            </ButtonLink>
          </div>
        </Section>

        {/* ========================================================= */}
        {/* FAQS                                                      */}
        {/* ========================================================= */}
        <FAQSection faqs={faqs} />

        {/* ========================================================= */}
        {/* BOTTOM CTA BAND                                           */}
        {/* ========================================================= */}
        <CTABand
          eyebrow="Next Step"
          title="Ready to talk about your next project?"
          text="Tell us what is slowing you down. A senior architect will reply within one business day with a suggested starting point."
          primary={{ href: "/contact", label: "Book a consultation" }}
          secondary={{ href: "/solutions", label: "Explore Solutions" }}
        />
      </main>

      <Footer />
    </div>
  );
}
