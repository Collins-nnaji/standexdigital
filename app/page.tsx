import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Building2,
  ClipboardList,
  Compass,
  Factory,
  FileSpreadsheet,
  GraduationCap,
  HeartPulse,
  Landmark,
  Layers3,
  LineChart,
  Mail,
  Megaphone,
  Repeat2,
  Search,
  ShoppingBag,
  Target,
  Truck,
  Wrench,
  Workflow,
} from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { ButtonLink, CTABand, CheckList, Container, Eyebrow, FAQSection, HeroBackdrop, IconCard, ProcessSteps, Section, SectionHeading } from "@/components/site/ui";

export const metadata: Metadata = {
  title: "Standex Digital | Digital Growth & BI Solutions",
  description:
    "Two connected practices: digital strategy and growth, plus Power Apps, Power Automate and Power BI solutions for established organisations.",
};

const practices = [
  {
    href: "/digital-growth",
    number: "01",
    label: "Grow demand",
    title: "Digital Strategy & Growth",
    text: "A complete digital growth function—strategy, paid acquisition, analytics, email and SEO—planned and managed as one commercial system.",
    image: "/Woman-consulting.webp",
    links: [
      { href: "/digital-growth/google-ads", label: "Google Ads", icon: Target },
      { href: "/digital-growth/analytics", label: "Analytics & Measurement", icon: BarChart3 },
      { href: "/digital-growth/social-media-ads", label: "Social Media Advertising", icon: Megaphone },
      { href: "/digital-growth/email-marketing", label: "Email Marketing", icon: Mail },
      { href: "/digital-growth/seo-content", label: "SEO & Content", icon: Search },
    ],
    cta: "Explore Digital Growth",
  },
  {
    href: "/data-solutions",
    number: "02",
    label: "Build capability",
    title: "Business Intelligence Solutions",
    text: "Power Apps, Power Automate and Power BI combined into connected systems that capture better data, remove manual work and power decisions.",
    image: "/DataIntelligenceLarge.webp",
    links: [
      { href: "/solutions/power-apps", label: "Power Apps", icon: Layers3 },
      { href: "/solutions/power-automate", label: "Power Automate", icon: Workflow },
      { href: "/solutions/power-bi", label: "Power BI", icon: BarChart3 },
    ],
    cta: "Explore BI Solutions",
  },
];

const problems = [
  { icon: LineChart, title: "Marketing spend you can't fully explain", text: "Budgets rise across Google, Meta and LinkedIn, but nobody can say with confidence which pound produced which customer." },
  { icon: FileSpreadsheet, title: "Reporting that takes days", text: "Teams export, copy and reconcile spreadsheets every month—and still argue about which number is right." },
  { icon: ClipboardList, title: "Processes held together by email", text: "Approvals, forms and handovers live in inboxes and personal files, slowing everyone down and hiding risk." },
  { icon: Repeat2, title: "Leads that quietly go cold", text: "Enquiries arrive, a single reply goes out, and follow-up depends on someone remembering to do it." },
];

const steps = [
  { title: "Diagnose", text: "We start with your commercial goals and audit what exists—channels, tracking, data and processes—so recommendations are grounded in evidence.", duration: "Weeks 1–3" },
  { title: "Plan", text: "A prioritised roadmap with clear owners, costs and measures of success. Quick wins first, foundations alongside.", duration: "Week 3–4" },
  { title: "Build & launch", text: "Senior specialists deliver campaigns, tracking, apps, automations and dashboards in short, visible cycles.", duration: "Month 2+" },
  { title: "Measure & improve", text: "A monthly rhythm of reporting, decisions and experiments so results compound rather than plateau.", duration: "Ongoing" },
];

const industries = [
  { icon: Building2, label: "Professional services" },
  { icon: ShoppingBag, label: "Retail & e-commerce" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Truck, label: "Logistics & distribution" },
  { icon: HeartPulse, label: "Healthcare & care" },
  { icon: GraduationCap, label: "Education & training" },
  { icon: Landmark, label: "Financial services" },
  { icon: Wrench, label: "Construction & trades" },
];

const platforms = ["Google Ads", "Google Analytics 4", "Meta", "LinkedIn", "HubSpot", "Power Apps", "Power Automate", "Power BI", "Dataverse", "Microsoft Fabric"];

const faqs = [
  { q: "Do we have to use both practices?", a: "No. Many clients start with one—often Google Ads, analytics or a Power BI dashboard. Because both practices share one team, it's easy to add the other when it makes sense, without onboarding a new supplier." },
  { q: "What size of business do you work with?", a: "We mainly support established small and mid-sized organisations, and teams within larger organisations, that want senior expertise without building a full in-house function." },
  { q: "How do engagements usually start?", a: "With a free consultation, followed by a fixed-scope audit or discovery. You get a clear, prioritised plan whether or not you continue with us for delivery." },
  { q: "Do you work on fixed fees or retainers?", a: "Both. Projects such as an app build or tracking implementation are usually fixed-scope. Ongoing growth management and BI support run on a monthly retainer with agreed deliverables." },
  { q: "Who owns the accounts, data and solutions?", a: "You do. Ad accounts, analytics properties, Power Platform solutions and reports all live in your tenant and accounts. We work inside them with appropriate access." },
];

export default function HomePage() {
  return (
    <div data-site className="min-h-screen bg-white text-zinc-950">
      <TopNav />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
          <HeroBackdrop />
          <Container className="relative">
            <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Digital growth + Microsoft business intelligence
                </span>
                <h1 className="mt-6 text-[2.6rem] font-bold leading-[1.04] tracking-tight text-zinc-950 sm:text-6xl lg:text-[4.25rem]">
                  Grow the business.{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Strengthen the systems.</span>
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
                  Standex Digital brings commercial growth and technical delivery together. We win you more of the right customers—and build the apps, automation and reporting to run the business they create.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/Contact">Book a free consultation</ButtonLink>
                  <ButtonLink href="#practices" variant="outline">See what we do</ButtonLink>
                </div>
                <div className="mt-10 grid max-w-lg grid-cols-3 gap-6 border-t border-zinc-200 pt-6">
                  {[["2", "specialist practices"], ["8", "core services"], ["1", "accountable team"]].map(([n, l]) => (
                    <div key={l}>
                      <p className="text-3xl font-bold text-zinc-950">{n}</p>
                      <p className="mt-1 text-xs font-medium text-zinc-500">{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-3xl border border-zinc-200 shadow-[0_40px_80px_-40px_rgba(16,24,40,0.45)]">
                  <Image src="/Innovative.webp" alt="Standex Digital team collaborating with a client" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                </div>
                <div className="absolute -left-4 bottom-8 w-60 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl sm:-left-10">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-zinc-500">Qualified leads</p>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">Trending up</span>
                  </div>
                  <svg viewBox="0 0 200 60" className="mt-3 h-14 w-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" stopOpacity=".25" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0 50 C30 46 45 40 70 42 S110 28 135 30 S175 12 200 8 L200 60 L0 60Z" fill="url(#hero-area)" />
                    <path d="M0 50 C30 46 45 40 70 42 S110 28 135 30 S175 12 200 8" fill="none" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                  <p className="text-[10px] text-zinc-400">Illustrative reporting view</p>
                </div>
                <div className="absolute -right-3 top-8 hidden w-56 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl sm:block lg:-right-8">
                  <p className="text-xs font-semibold text-zinc-500">Connected system</p>
                  <div className="mt-3 space-y-2">
                    {[["Power Apps", "bg-fuchsia-500"], ["Power Automate", "bg-sky-500"], ["Power BI", "bg-amber-500"]].map(([l, c]) => (
                      <div key={l} className="flex items-center gap-2 rounded-lg bg-zinc-50 px-2.5 py-2 text-xs font-semibold text-zinc-800">
                        <span className={`h-2 w-2 rounded-full ${c}`} />
                        {l}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Platforms strip */}
        <div className="border-y border-zinc-100 bg-zinc-50/70 py-6">
          <Container>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Platforms we work in</p>
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <span key={p} className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700">{p}</span>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Practices */}
        <Section id="practices">
          <SectionHeading
            eyebrow="Two specialist practices"
            title="One company. Two ways to move the business forward."
            intro="Choose the practice that matches the problem you need to solve—or combine them. Both are delivered by the same senior team, with one roadmap and one point of accountability."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {practices.map((p) => (
              <article key={p.href} className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition hover:border-emerald-200 hover:shadow-[0_30px_60px_-30px_rgba(16,24,40,0.35)]">
                <div className="relative aspect-[16/8] overflow-hidden">
                  <Image src={p.image} alt={p.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                  <span className="absolute left-5 top-5 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-zinc-900 shadow-sm">{p.number} · {p.label}</span>
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-zinc-600">{p.text}</p>
                  <div className="mt-7 grid gap-2 sm:grid-cols-2">
                    {p.links.map(({ href, label, icon: Icon }) => (
                      <Link key={href} href={href} className="flex items-center gap-3 rounded-xl border border-zinc-200 px-3 py-2.5 text-sm font-semibold text-zinc-800 transition hover:border-emerald-300 hover:bg-emerald-50/60">
                        <Icon className="h-4 w-4 text-emerald-600" />
                        {label}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto pt-8">
                    <ButtonLink href={p.href} variant="dark">{p.cta}</ButtonLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Problems */}
        <Section tone="muted">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading
              eyebrow="Problems we solve"
              title="Most growth problems are really data and process problems."
              intro="If any of these sound familiar, you're in good company. They're the most common reasons organisations come to us—and each one has a practical fix."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {problems.map((p) => <IconCard key={p.title} {...p} />)}
            </div>
          </div>
        </Section>

        {/* Connection – the one dark band */}
        <Section tone="dark">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <SectionHeading
                dark
                eyebrow="Why the practices connect"
                title="Growth needs good data. Good systems need a commercial purpose."
                intro="Marketing decisions get sharper when measurement, reporting and customer data are designed properly. And technology investments create more value when they serve a defined commercial goal. We work on both sides of that line."
              />
              <CheckList
                dark
                className="mt-8"
                items={[
                  "Campaign data flows into the same Power BI model as sales and finance",
                  "Leads captured by marketing are routed and followed up automatically",
                  "Operational apps produce clean data that reporting can trust",
                  "One roadmap, one reporting rhythm, one accountable team",
                ]}
              />
            </div>
            <div className="relative">
              <div className="grid gap-3">
                {[
                  { icon: Megaphone, title: "Demand", text: "Google Ads, social, SEO and email bring in qualified prospects.", tag: "Digital Growth" },
                  { icon: Workflow, title: "Process", text: "Apps and automations capture, route and follow up every lead and order.", tag: "Power Apps + Automate" },
                  { icon: BarChart3, title: "Decisions", text: "Dashboards show what's working across marketing, sales and operations.", tag: "Power BI" },
                  { icon: Compass, title: "Direction", text: "Insight feeds the next round of budget, campaign and process decisions.", tag: "Monthly review" },
                ].map(({ icon: Icon, title, text, tag }, i) => (
                  <div key={title} className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-semibold text-white">{i + 1}. {title}</p>
                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-zinc-300">{tag}</span>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Process */}
        <Section>
          <SectionHeading eyebrow="How we work" title="A clear path from first conversation to measurable results." intro="Every engagement follows the same disciplined rhythm, whether we're launching a campaign or building a reporting platform." />
          <div className="mt-12">
            <ProcessSteps steps={steps} />
          </div>
        </Section>

        {/* Why us + industries */}
        <Section tone="mint">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[16/12] overflow-hidden rounded-3xl">
              <Image src="/HomeAboutPic.webp" alt="Standex Digital specialist working with a client" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div>
              <Eyebrow>Why Standex Digital</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Senior thinking. Practical delivery. Clear accountability.</h2>
              <CheckList
                className="mt-7"
                items={[
                  "Senior specialists do the work—not junior account managers",
                  "Transparent fees agreed before work begins",
                  "Everything built in your accounts and tenant—you own it",
                  "Plain-English reporting with decisions, not just data",
                  "Documentation and training so your team can take ownership",
                ]}
              />
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">Sectors we support</p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {industries.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-start gap-2 rounded-xl border border-emerald-100 bg-white p-3">
                    <Icon className="h-4 w-4 text-emerald-600" />
                    <span className="text-xs font-semibold leading-snug text-zinc-800">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <FAQSection faqs={faqs} />

        <CTABand
          eyebrow="Not sure where to start?"
          title="Tell us the outcome. We'll map the right path."
          text="A 30-minute conversation is usually enough to identify your biggest opportunity and the fastest way to act on it."
          secondary={{ href: "/digital-growth", label: "Browse services" }}
        />
      </main>
      <Footer />
    </div>
  );
}
