import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Gauge, LineChart, Rocket, Repeat2, Search as SearchIcon, ShieldCheck, Users } from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { DigitalServiceIcon } from "@/components/digital-growth/DigitalServiceIcon";
import { GrowthProof } from "@/components/digital-growth/GrowthProof";
import { ButtonLink, CTABand, CheckList, Container, Eyebrow, FAQSection, HeroBackdrop, IconCard, ProcessSteps, Section, SectionHeading } from "@/components/site/ui";
import { digitalGrowthServices } from "@/lib/digital-growth-services";

export const metadata: Metadata = {
  title: "Digital Strategy & Growth | Standex Digital",
  description: "Digital growth strategy, Google Ads, analytics, paid social, email marketing, SEO and conversion managed as one commercial system.",
};

const symptoms = [
  { icon: Users, title: "Too many disconnected suppliers", text: "An ads agency, an SEO freelancer, a web developer and an internal marketer—each optimising their own piece, nobody owning the whole." },
  { icon: LineChart, title: "Activity without clear return", text: "Reports are full of clicks, impressions and open rates, but it's hard to connect any of it to pipeline and revenue." },
  { icon: SearchIcon, title: "Growth has plateaued", text: "The channels that worked two years ago are more expensive now, and there's no structured way to find the next one." },
  { icon: Gauge, title: "No time to think strategically", text: "Your team is busy executing, so planning, testing and improvement keep slipping to next quarter." },
];

const model = [
  { icon: Compass, title: "Set the direction", text: "Translate commercial goals into audiences, offers, channel priorities and a measurable 90-day roadmap." },
  { icon: Rocket, title: "Build the engine", text: "Connect campaigns, content, landing pages, tracking and follow-up into one acquisition system." },
  { icon: Repeat2, title: "Improve every month", text: "Use evidence to refine creative, conversion, channel mix and where the next pound should go." },
];

const engagements = [
  {
    name: "Growth Audit",
    tag: "Fixed scope · 2–3 weeks",
    text: "A deep review of your channels, tracking, website conversion and competitors, ending in a prioritised growth plan.",
    items: ["Channel & account audits", "Tracking and data-quality review", "Competitor and search landscape", "90-day prioritised roadmap", "Presentation to your leadership team"],
  },
  {
    name: "Managed Growth",
    tag: "Monthly partnership",
    featured: true,
    text: "Your outsourced growth team. Strategy and delivery across the channels your plan needs, with one roadmap and monthly reviews.",
    items: ["Dedicated growth lead", "Multi-channel campaign management", "Creative and landing-page testing", "Live dashboard and monthly review", "Quarterly strategy reset"],
  },
  {
    name: "Specialist Project",
    tag: "Defined deliverable",
    text: "Focused support for one job: a Google Ads rebuild, a GA4 implementation, an email automation programme or an SEO migration.",
    items: ["Clear scope and timeline", "Senior specialist delivery", "Full documentation", "Handover and training", "Optional ongoing support"],
  },
];

const ninetyDays = [
  { title: "Audit & baseline", text: "Review every channel, fix tracking gaps and agree the commercial targets we'll be measured against.", duration: "Days 1–30" },
  { title: "Fix & launch", text: "Repair the foundations, restructure what's underperforming and launch the first planned tests.", duration: "Days 31–60" },
  { title: "Optimise & scale", text: "Move budget to proven activity, expand what works and present the next quarter's plan.", duration: "Days 61–90" },
];

const faqs = [
  { q: "Do we need all five services?", a: "No. We recommend only what your growth plan needs. Many clients start with one or two channels—often Google Ads and analytics—and add others as results justify it." },
  { q: "How is this different from hiring an agency for each channel?", a: "One team owns the whole system. Strategy, channels and measurement share one roadmap and one reporting rhythm, so there's no finger-pointing and no gaps between suppliers." },
  { q: "Will we work with the same people?", a: "Yes. You'll have a named growth lead supported by channel specialists, and you'll meet the people doing the work." },
  { q: "What do you need from us?", a: "Access to your ad, analytics and CRM accounts, a commercial contact who can share targets and margins, and around an hour a month for the performance review." },
  { q: "Is there a minimum contract term?", a: "Audits and projects are fixed scope. For managed growth we suggest an initial three-month term to allow for meaningful testing, then rolling monthly." },
];

export default function DigitalGrowthPage() {
  return (
    <div data-site className="min-h-screen bg-white text-zinc-950">
      <TopNav />
      <main>
        <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
          <HeroBackdrop />
          <Container className="relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <Eyebrow>Digital Strategy & Growth</Eyebrow>
                <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">A complete digital growth function—without building one in-house.</h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
                  Strategy, paid acquisition, analytics, email and SEO managed together around one goal: more qualified customers at a cost that makes commercial sense.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/Contact">Book a growth consultation</ButtonLink>
                  <ButtonLink href="#services" variant="outline">Explore services</ButtonLink>
                </div>
                <div className="mt-10 flex flex-wrap gap-2">
                  {digitalGrowthServices.map((s) => (
                    <Link key={s.slug} href={`/digital-growth/${s.slug}`} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:border-emerald-300 hover:text-emerald-800">
                      <DigitalServiceIcon name={s.icon} className="h-3.5 w-3.5 text-emerald-600" />
                      {s.shortTitle}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 shadow-[0_40px_80px_-40px_rgba(16,24,40,0.45)]">
                  <Image src="/Woman-consulting.webp" alt="Growth consultant reviewing marketing performance" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                </div>
                <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl sm:left-8 sm:right-auto sm:w-80">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">One connected system</p>
                  <div className="mt-3 flex items-center justify-between gap-1 text-xs font-semibold text-zinc-800">
                    {["Demand", "Conversion", "Measurement", "Improvement"].map((s, i) => (
                      <span key={s} className="flex items-center gap-1">
                        {i > 0 && <ArrowRight className="h-3 w-3 text-zinc-300" />}
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <Section tone="muted">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              eyebrow="Sound familiar?"
              title="Digital marketing shouldn't feel like a cost you can't control."
              intro="Most established businesses don't need more marketing activity—they need the activity they already pay for to work together and be measured properly."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {symptoms.map((s) => <IconCard key={s.title} {...s} />)}
            </div>
          </div>
        </Section>

        <Section id="services">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Our capabilities" title="Everything needed to plan, win and measure demand." intro="Select a service for the full detail—what's included, how we deliver it and how success is measured." />
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {digitalGrowthServices.map((service) => (
              <Link key={service.slug} href={`/digital-growth/${service.slug}`} className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-7 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_24px_50px_-28px_rgba(16,24,40,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <DigitalServiceIcon name={service.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400">{service.eyebrow}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{service.description}</p>
                <ul className="mt-5 space-y-1.5 border-t border-zinc-100 pt-5">
                  {service.deliverables.slice(0, 4).map((d) => (
                    <li key={d.title} className="flex items-center gap-2 text-sm text-zinc-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {d.title}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-emerald-700">
                  View service <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
            <div className="flex flex-col justify-between rounded-2xl bg-zinc-950 p-7 text-white">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-400">Not sure which you need?</p>
                <h3 className="mt-4 text-xl font-semibold">Start with a Growth Audit.</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">We&apos;ll review every channel and give you a prioritised plan—whether or not you continue with us.</p>
              </div>
              <ButtonLink href="/Contact" className="mt-8 self-start">Request an audit</ButtonLink>
            </div>
          </div>
        </Section>

        <Section tone="mint">
          <SectionHeading eyebrow="How the partnership works" title="Strategy and delivery stay in the same room." align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {model.map(({ icon: Icon, title, text }, i) => (
              <article key={title} className="rounded-2xl border border-emerald-100 bg-white p-7">
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-white"><Icon className="h-5 w-5" /></span>
                  <span className="text-sm font-bold text-zinc-300">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-14">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Your first 90 days</p>
            <div className="mt-6">
              <ProcessSteps steps={ninetyDays} />
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeading eyebrow="Ways to work with us" title="Start small or hand us the whole growth function." intro="Three engagement models, each with a clear scope and transparent fees agreed before work begins." />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {engagements.map((e) => (
              <article key={e.name} className={e.featured ? "relative flex flex-col rounded-2xl border-2 border-emerald-500 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(5,150,105,0.5)]" : "flex flex-col rounded-2xl border border-zinc-200 bg-white p-7"}>
                {e.featured && <span className="absolute -top-3 left-7 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white">Recommended</span>}
                <p className="text-xs font-semibold text-emerald-700">{e.tag}</p>
                <h3 className="mt-2 text-2xl font-bold">{e.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{e.text}</p>
                <CheckList items={e.items} className="mt-6 border-t border-zinc-100 pt-6" />
                <ButtonLink href="/Contact" variant={e.featured ? "primary" : "outline"} className="mt-auto self-start">Discuss this option</ButtonLink>
              </article>
            ))}
          </div>
        </Section>

        <GrowthProof />

        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[16/11] overflow-hidden rounded-3xl">
              <Image src="/HomeAboutPic.webp" alt="Marketing specialist reviewing business performance data" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div>
              <Eyebrow>Designed for established businesses</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Senior thinking. Practical execution. Clear accountability.</h2>
              <CheckList
                className="mt-7"
                items={[
                  "One roadmap across all your digital channels",
                  "Monthly priorities and transparent reporting",
                  "Specialist capability without multiple disconnected agencies",
                  "Every account and asset stays in your ownership",
                  "Technology and automation support from our BI practice when growth needs it",
                ]}
              />
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <ShieldCheck className="h-8 w-8 shrink-0 text-emerald-600" />
                <p className="text-sm text-zinc-700">
                  Need dashboards that combine marketing with sales and finance data?{" "}
                  <Link href="/data-solutions" className="font-semibold text-emerald-700 underline-offset-2 hover:underline">See our BI Solutions</Link>.
                </p>
              </div>
            </div>
          </div>
        </Section>

        <FAQSection faqs={faqs} />

        <CTABand
          eyebrow="Start with the right question"
          title="Where can digital make the biggest commercial difference for you?"
          text="Book a free 30-minute consultation. We'll look at your current channels and tell you honestly where we'd focus first."
          primary={{ href: "/Contact", label: "Book a growth consultation" }}
        />
      </main>
      <Footer />
    </div>
  );
}
