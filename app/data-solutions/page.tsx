import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Database, FileSpreadsheet, Lock, MailWarning, Scale, ShieldCheck, Users } from "lucide-react";
import { TopNav } from "@/components/network/TopNav";
import Footer from "@/components/standex-ai/Footer";
import { ButtonLink, CTABand, CheckList, Container, Eyebrow, FAQSection, HeroBackdrop, IconCard, ProcessSteps, Section, SectionHeading } from "@/components/site/ui";
import { biSolutions } from "@/lib/bi-solutions";

export const metadata: Metadata = {
  title: "Business Intelligence Solutions | Standex Digital",
  description: "Complete business intelligence systems built with Power Apps, Power Automate, Power BI, Microsoft Fabric, Copilot Studio and Salesforce—from data analysis and implementation to adoption.",
};

const problems = [
  { icon: FileSpreadsheet, title: "Spreadsheets running critical processes", text: "Key operations depend on files that only one person understands, with no audit trail or version control." },
  { icon: Clock, title: "Reporting that eats days each month", text: "Analysts export, copy and reconcile data by hand, so insight arrives too late to act on." },
  { icon: MailWarning, title: "Approvals lost in inboxes", text: "Requests wait for sign-off with no visibility of status, bottlenecks or who is holding things up." },
  { icon: Scale, title: "Different numbers in every meeting", text: "Departments define the same KPI differently, so leadership debates the data instead of the decision." },
];

const journey = [
  { step: "Capture", product: "Power Apps", text: "Frontline teams record jobs, inspections, requests and customers in structured apps—on any device." },
  { step: "Automate", product: "Power Automate", text: "Workflows validate, route and sync that data across Microsoft 365, your CRM, finance and ERP." },
  { step: "Analyse", product: "Power BI & Fabric", text: "Trusted models and dashboards give every team the same view of performance, refreshed automatically." },
  { step: "Ask", product: "Copilot Studio", text: "AI agents and Fabric data agents let people ask questions and get things done in plain English." },
];

const delivery = [
  { title: "Discover", text: "Define the decisions, users, workflows and source data the system must support.", duration: "1–3 weeks" },
  { title: "Analyse & design", text: "Profile the data, resolve quality issues and design the apps, flows and reporting model.", duration: "1–3 weeks" },
  { title: "Implement", text: "Build Power Apps, automated workflows, semantic models and dashboards in short sprints.", duration: "3–10 weeks" },
  { title: "Embed", text: "Test with real users, document governance and support adoption across the organisation.", duration: "2 weeks+" },
];

const engagements = [
  { name: "Discovery & Roadmap", tag: "Fixed scope · 2–3 weeks", text: "Map your processes, data sources and reporting needs, then receive a costed, prioritised roadmap and licensing recommendation.", items: ["Stakeholder workshops", "Process and data audit", "Solution architecture", "Licensing guidance", "Phased delivery plan"] },
  { name: "Solution Delivery", tag: "Project · 4–16 weeks", featured: true, text: "We design, build and launch your app, automation or reporting solution—delivered in sprints with regular demos.", items: ["Senior solution lead", "Fortnightly demos", "Testing & UAT", "Training & documentation", "Post-launch hypercare"] },
  { name: "Managed BI Support", tag: "Monthly retainer", text: "Ongoing support, enhancements and new reports from a team that already knows your environment.", items: ["Monitoring & fixes", "Enhancement backlog", "New reports and flows", "Governance reviews", "Licensing optimisation"] },
];

const faqs = [
  { q: "Do we need to use every product?", a: "No. Many projects start with one—often a Power BI dashboard, an automation or a Copilot Studio agent. We'll recommend the simplest solution that solves the problem, and design it so other components can be added later." },
  { q: "We already have Microsoft 365. What extra licences will we need?", a: "Many scenarios work with what you already own. Premium connectors, Dataverse and Power BI Pro are the most common additions. We'll give clear licensing recommendations during discovery, so there are no surprises." },
  { q: "Can you work with our existing systems?", a: "Yes. We regularly integrate with Dynamics 365, Salesforce, Xero, Sage, SQL Server, SharePoint and bespoke systems via APIs or, where needed, desktop automation." },
  { q: "How do you make sure people actually use the solution?", a: "Users are involved from discovery onwards, see prototypes early and test before launch. We provide training and measure adoption after go-live." },
  { q: "Who supports the solution after launch?", a: "Your choice. We document everything so your team can own it, and offer managed support for those who prefer us to look after it." },
  { q: "Is our data secure?", a: "Solutions run inside your own Microsoft tenant, inherit Microsoft's enterprise security and compliance, and are designed with least-privilege access, environment separation and DLP policies." },
];

export default function BISolutionsPage() {
  return (
    <div data-site className="min-h-screen bg-white text-zinc-950">
      <TopNav />
      <main className="overflow-x-hidden">
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
          <HeroBackdrop />
          <Container className="relative">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <Eyebrow>Business Intelligence Solutions</Eyebrow>
                <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">Build a complete BI system around how your business works.</h1>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
                  We combine Microsoft Power Apps, Power Automate, Power BI with Microsoft Fabric, and Copilot Studio to capture better data, remove manual work, turn information into decisions—and let people simply ask.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <ButtonLink href="/contact">Discuss a BI solution</ButtonLink>
                  <ButtonLink href="#products" variant="outline">Explore the system</ButtonLink>
                </div>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  {biSolutions.map((s) => (
                    <Link key={s.slug} href={s.href} className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white py-1.5 pl-1.5 pr-3 text-xs font-semibold text-zinc-700 hover:border-emerald-300">
                      <Image src={s.logo} alt="" width={20} height={20} className="h-5 w-5" />
                      {s.title}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200 shadow-[0_40px_80px_-40px_rgba(16,24,40,0.45)]">
                  <Image src="/Power-BI-Help.webp" alt="Power BI dashboards and data analysis" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-left-top" />
                </div>
                <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl sm:left-8 sm:right-8">
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {journey.map((j, i) => (
                      <div key={j.step} className="relative">
                        <p className="text-sm font-semibold text-zinc-950">{j.step}</p>
                        <p className="text-[11px] text-zinc-500">{j.product}</p>
                        {i < 3 && <ArrowRight className="absolute -right-2 top-2 h-3.5 w-3.5 text-zinc-300" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Problems */}
        <Section tone="muted">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <SectionHeading eyebrow="Why organisations call us" title="Good decisions are impossible on unreliable data." intro="Dashboards alone rarely fix reporting. The root cause is usually how data is captured, moved and defined. We fix the whole chain." />
            <div className="grid gap-4 sm:grid-cols-2">
              {problems.map((p) => <IconCard key={p.title} {...p} />)}
            </div>
          </div>
        </Section>

        {/* Products */}
        <Section id="products">
          <SectionHeading eyebrow="One connected system" title="Capture. Automate. Analyse. Ask." intro="Each platform solves a distinct part of the information journey. Together, they create a practical BI system—from customer and frontline data to leadership reporting and AI agents that answer questions." />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {biSolutions.map((s) => (
              <Link key={s.slug} href={s.href} className="group flex flex-col rounded-2xl border border-zinc-200 bg-white p-7 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-[0_24px_50px_-28px_rgba(16,24,40,0.35)]">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-200 bg-white p-2">
                    <Image src={s.logo} alt="" width={32} height={32} className="h-8 w-8" />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${s.accent.bg} ${s.accent.text} ring-1 ${s.accent.ring}`}>{s.role}</span>
                </div>
                <h3 className="mt-6 text-2xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.description}</p>
                <ul className="mt-6 space-y-2 border-t border-zinc-100 pt-6">
                  {s.capabilities.slice(0, 4).map((c) => (
                    <li key={c.title} className="flex items-center gap-2.5 text-sm text-zinc-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {c.title}
                    </li>
                  ))}
                </ul>
                <span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-emerald-700">
                  Explore {s.title} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
            <div className="flex flex-col justify-between rounded-2xl bg-zinc-950 p-7 text-white">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-400">Not sure where to start?</p>
                <h3 className="mt-4 text-2xl font-bold text-white">Start with a Discovery & Roadmap.</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">We&apos;ll map your processes, CRM and data sources, then recommend the simplest combination of platforms that solves the problem.</p>
              </div>
              <ButtonLink href="/contact" className="mt-8 self-start">Book a discovery call</ButtonLink>
            </div>
          </div>
        </Section>

        {/* Fabric & AI agents band */}
        <Section tone="mint">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Microsoft Fabric & AI agents"
              title="A modern data platform—and agents that answer in plain English."
              intro="When reporting outgrows a few datasets, we build on Microsoft Fabric: OneLake, lakehouses, warehouses and pipelines in one governed platform. On top, Fabric data agents and Copilot Studio let people ask questions of that data and take action, inside Teams and Microsoft 365 Copilot."
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: "Microsoft Fabric", text: "OneLake, lakehouse, warehouse, Data Factory pipelines and Real-Time Intelligence.", href: "/solutions/power-bi#spotlight" },
                { title: "Fabric data agents", text: "Conversational Q&A over your governed lakehouse, warehouse and semantic models.", href: "/solutions/power-bi#spotlight" },
                { title: "Copilot Studio agents", text: "Custom agents grounded in your knowledge that take action through your systems.", href: "/solutions#artificial-intelligence" },
                { title: "Copilot in Power BI", text: "Generate report pages, summaries and DAX from a well-prepared semantic model.", href: "/solutions#power-bi" },
              ].map((c) => (
                <Link key={c.title} href={c.href} className="group rounded-2xl border border-emerald-100 bg-white p-6 transition hover:border-emerald-300 hover:shadow-lg">
                  <h3 className="font-semibold text-zinc-950">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{c.text}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" /></span>
                </Link>
              ))}
            </div>
          </div>
        </Section>

        {/* Example scenario */}
        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading eyebrow="How it fits together" title="Example: from site visit to board report—with no re-keying." intro="A typical connected solution for a field-service or operations team." />
              <ol className="mt-8 space-y-4">
                {[
                  ["Power Apps", "Engineers complete inspections on a tablet, with photos, signatures and offline support."],
                  ["Power Automate", "Failed checks trigger a remedial job, notify the manager in Teams and update the customer record."],
                  ["Power Automate", "Completed jobs generate a PDF report, email it to the customer and log it in SharePoint."],
                  ["Power BI & Fabric", "Leadership sees jobs, first-time-fix rate, compliance and revenue by region—refreshed automatically."],
                  ["Copilot Studio", "A manager asks in Teams, \u201cWhich sites failed inspection this week?\u201d—and a Fabric data agent answers instantly."],
                ].map(([tag, text], i) => (
                  <li key={text} className="flex gap-4 rounded-2xl border border-emerald-100 bg-white p-5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">{i + 1}</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">{tag}</p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-700">{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="relative aspect-[4/4.2] overflow-hidden rounded-3xl border border-emerald-100 bg-white">
              <Image src="/Power-apps.webp" alt="Field engineer using a mobile Power App" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-contain p-8" />
            </div>
          </div>
        </Section>

        {/* Delivery */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"><Database className="h-5 w-5" /></span>
              <SectionHeading className="mt-6" eyebrow="Data analysis & implementation" title="From scattered data to a system people use." intro="We do the analysis and implementation work around the Microsoft tools: source assessment, modelling, integration, design and user adoption." />
            </div>
            <ProcessSteps steps={delivery} />
          </div>
        </Section>

        {/* Engagements */}
        <Section tone="muted">
          <SectionHeading eyebrow="Ways to work with us" title="Clear scope. Clear cost. Clear ownership." align="center" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {engagements.map((e) => (
              <article key={e.name} className={e.featured ? "relative flex flex-col rounded-2xl border-2 border-emerald-500 bg-white p-7 shadow-[0_24px_60px_-30px_rgba(5,150,105,0.5)]" : "flex flex-col rounded-2xl border border-zinc-200 bg-white p-7"}>
                {e.featured && <span className="absolute -top-3 left-7 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white">Recommended</span>}
                <p className="text-xs font-semibold text-emerald-700">{e.tag}</p>
                <h3 className="mt-2 text-2xl font-bold">{e.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{e.text}</p>
                <CheckList items={e.items} className="mt-6 border-t border-zinc-100 pt-6" />
                <ButtonLink href="/contact" variant={e.featured ? "primary" : "outline"} className="mt-8 self-start">Discuss this option</ButtonLink>
              </article>
            ))}
          </div>
        </Section>

        {/* Governance - dark band */}
        <Section tone="dark">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SectionHeading dark eyebrow="Built to last" title="Enterprise-grade governance, sized for your organisation." intro="Solutions run inside your own Microsoft tenant and are built so your IT team can support, secure and extend them with confidence." />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Lock, title: "Security by design", text: "Least-privilege roles, row-level security and Microsoft Entra ID sign-in." },
                { icon: ShieldCheck, title: "Environment strategy", text: "Separate dev, test and production with managed deployments." },
                { icon: Database, title: "Data you can trust", text: "Documented definitions, lineage and data-quality checks." },
                { icon: Users, title: "Adoption & ownership", text: "Training, runbooks and handover so your team is self-sufficient." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <Icon className="h-5 w-5 text-emerald-400" />
                  <h3 className="mt-4 font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Foundation */}
        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[16/11] overflow-hidden rounded-3xl">
              <Image src="/HomeAboutPic.webp" alt="Business analyst reviewing performance information" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
            <div>
              <Eyebrow>A complete BI foundation</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Designed around decisions—not dashboards alone.</h2>
              <CheckList
                className="mt-7"
                items={[
                  "Data captured consistently at the source",
                  "Processes connected through dependable automation",
                  "Shared definitions and trusted reporting models",
                  "Role-specific dashboards that lead to action",
                  "Implementation support from discovery through adoption",
                ]}
              />
              <p className="mt-8 text-sm text-zinc-600">
                Want autonomous AI agents querying this data model?{" "}
                <Link href="/solutions#artificial-intelligence" className="font-semibold text-emerald-700 underline-offset-2 hover:underline">Explore AI Solutions</Link>.
              </p>
            </div>
          </div>
        </Section>

        <FAQSection faqs={faqs} />

        <CTABand
          eyebrow="Power Apps + Power Automate + Power BI"
          title="Build one connected system for data and decisions."
          text="Tell us about the process or reporting challenge. We'll suggest an approach, a realistic timeline and the licensing you'll need."
          primary={{ href: "/contact", label: "Discuss your requirements" }}
        />
      </main>
      <Footer />
    </div>
  );
}
