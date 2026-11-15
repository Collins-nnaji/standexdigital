import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Cpu,
  Database,
  Factory,
  FileSpreadsheet,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers3,
  Lock,
  Megaphone,
  Repeat2,
  ShieldCheck,
  ShoppingBag,
  TrendingUp,
  Truck,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { GrowthTrendsVisual } from "@/components/site/GrowthTrendsVisual";
import { HeroFlipCard } from "@/components/site/HeroFlipCard";
import { PlatformMarquee } from "@/components/site/PlatformMarquee";
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
  title: "Standex Digital | Enterprise Solutions & Company Growth",
  description:
    "Enterprise AI, Power BI, Power Apps, Salesforce and digital marketing solutions designed to eliminate manual bottlenecks, capture leads, and accelerate company growth.",
};

const growthPoints = [
  {
    icon: Zap,
    stat: "< 60s",
    title: "Lead Intake Velocity",
    desc: "Intelligent intake forms & AI triage qualify enquiries instantly so zero deals go cold.",
  },
  {
    icon: Layers3,
    stat: "3x–5x",
    title: "Operational Capacity",
    desc: "Power Apps & Automate eliminate spreadsheet drudgery so your team handles 3x volume without hiring.",
  },
  {
    icon: BarChart3,
    stat: "Daily",
    title: "Real-Time BI Clarity",
    desc: "Reconciled Fabric & Power BI models spot margin leaks and growth opportunities daily.",
  },
  {
    icon: Bot,
    stat: "24/7",
    title: "Autonomous AI Execution",
    desc: "AI agents query data and resolve complex workflows safely inside your tenant round the clock.",
  },
];

const industries = [
  { icon: Building2, label: "Professional Services" },
  { icon: ShoppingBag, label: "Retail & E-commerce" },
  { icon: Factory, label: "Manufacturing & Engineering" },
  { icon: Truck, label: "Logistics & Supply Chain" },
  { icon: HeartPulse, label: "Healthcare & Care" },
  { icon: GraduationCap, label: "Education & Training" },
  { icon: Landmark, label: "Financial Services" },
  { icon: Wrench, label: "Construction & Trades" },
];

const faqs = [
  {
    q: "How do your solutions drive tangible company growth?",
    a: "We eliminate friction from your growth engine. We deploy intelligent lead intake forms and AI qualification so you never lose high-value prospects, automate repetitive spreadsheet workflows with Power Apps so your team handles 3x volume, and deliver real-time Power BI data so leadership acts with speed.",
  },
  {
    q: "Do we have to implement all four solutions at once?",
    a: "No. Most clients start with one immediate priority—often automating lead intake, replacing a painful spreadsheet with a Power App, or unifying reporting in Power BI. Because our solutions share a connected architecture, future capabilities plug in effortlessly.",
  },
  {
    q: "Who owns the applications, data, and IP?",
    a: "You do. Everything is engineered directly inside your own Microsoft 365, Azure, or Salesforce tenant. You maintain 100% data sovereignty, intellectual property, and administrative control. There is zero proprietary lock-in.",
  },
  {
    q: "How does an engagement typically start?",
    a: "With our free AI & BI Growth Diagnostic (using the interactive intake form above). We analyze your current bottlenecks, recommend the simplest high-ROI architecture, and provide a clear, costed roadmap within 24 hours.",
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
            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
              <div>
                <Reveal>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 shadow-sm">
                    
                    Enterprise Solutions & Growth Engineering
                  </span>
                </Reveal>

                <Reveal delay={0.08}>
                  <h1 className="mt-6 text-5xl font-black leading-[1.02] tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
                    Drive Company Growth with{" "}
                    <span className="site-gradient-text bg-gradient-to-r from-emerald-600 via-teal-500 to-violet-500 bg-clip-text text-transparent">
                      Intelligent Systems.
                    </span>
                  </h1>
                </Reveal>

                <Reveal delay={0.16}>
                  <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-zinc-700 sm:text-xl">
                    We build AI agents, Power Platform apps, Power BI analytics and Salesforce integrations, then
                    pair them with digital marketing (Google Ads, paid social, SEO and email) that fills your pipeline.
                    One partner to capture every lead, remove manual work and scale your margins.</p>
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
                  <p className="mt-4 text-xs font-semibold text-zinc-500">
                    ⚡ 1 business day response · 100% tenant ownership · Senior Architects only
                  </p>
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
            title="Five Solutions. One Connected Engine."
            intro="Swipe through the capabilities, or connect them into a single growth engine."
          />
          <div className="mt-10">
            <SolutionsCarousel />
          </div>
        </Section>

        {/* WHY STANDEX + COMMERCIAL VELOCITY (merged) */}
        <section id="growth-system" className="relative scroll-mt-24 overflow-hidden bg-zinc-950 py-20 text-white sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
          <div className="site-blob pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-emerald-500/25 blur-3xl" />
          <div className="site-blob pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-3xl [animation-delay:-8s]" />

          <Container className="relative">
            <SectionHeading
              dark
              oneLine
              eyebrow="Why Standex Digital"
              title="Senior Engineering That Drives Rapid Growth."
              intro="We don't build software for the sake of it. Every system is engineered to convert more leads, expand margins and remove administrative drag, built by senior architects inside your own tenant."
            />

            <div className="mt-14 grid items-stretch gap-8 lg:grid-cols-[1fr_1.1fr]">
              {/* Left: photo + proof points */}
              <Reveal>
                <div className="relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-white/10">
                  <Image
                    src="/Innovative.webp"
                    alt="Standex Digital senior engineering team collaborating with client"
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                    <CheckList
                      dark
                      items={[
                        "Senior architects do the engineering, never junior handoffs",
                        "Milestone delivery with regular production demos",
                        "100% built inside your Microsoft 365, Azure or Salesforce tenant",
                        "Full documentation and training. Zero lock-in",
                      ]}
                    />
                  </div>
                </div>
              </Reveal>

              {/* Right: animated metric tiles */}
              <div className="grid gap-4 sm:grid-cols-2">
                {growthPoints.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <Reveal key={item.title} delay={i * 0.08} className="h-full">
                      <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-white/[0.07]">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-400/20 transition group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </span>
                        <p className="mt-5 bg-gradient-to-r from-emerald-300 to-teal-200 bg-clip-text text-4xl font-black tracking-tight text-transparent">
                          {item.stat}
                        </p>
                        <h3 className="mt-2 text-base font-bold text-white">{item.title}</h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-zinc-400">{item.desc}</p>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <Reveal className="mt-8">
              <GrowthTrendsVisual />
            </Reveal>

            <Reveal className="mt-12">
              <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Sectors we support
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                {industries.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-emerald-400/50 hover:text-white"
                  >
                    <Icon className="h-4 w-4 text-emerald-400" />
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>

        {/* ========================================================= */}
        {/* FAQS                                                      */}
        {/* ========================================================= */}
        <FAQSection faqs={faqs} />

        {/* ========================================================= */}
        {/* BOTTOM CTA BAND                                           */}
        {/* ========================================================= */}
        <CTABand
          eyebrow="Next Step"
          title="Ready to accelerate your company with intelligent systems?"
          text="Complete the 60-second diagnostic intake above or book a consultation. A Senior Solutions Architect will map your architecture options with zero sales pressure."
          primary={{ href: "/contact", label: "Book a consultation" }}
          secondary={{ href: "/solutions", label: "Explore Solutions" }}
        />
      </main>

      <Footer />
    </div>
  );
}
