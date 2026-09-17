import { BarChart3, CheckCircle2, Gauge, LineChart, ShieldCheck, Target } from "lucide-react";

const metricSets: Record<string, { label: string; value: string; note: string }[]> = {
  "Google Ads": [
    { label: "Conversion rate", value: "CVR", note: "By campaign and landing page" },
    { label: "Acquisition cost", value: "CPA", note: "By qualified conversion" },
    { label: "Return on spend", value: "ROAS", note: "Where revenue data allows" },
    { label: "Search quality", value: "IS", note: "Impression share and intent" },
  ],
  "Analytics & Measurement": [
    { label: "Tracking health", value: "QA", note: "Events, consent and tags" },
    { label: "Channel value", value: "ATTR", note: "Contribution by source" },
    { label: "Journey conversion", value: "CVR", note: "Across funnel stages" },
    { label: "Data freshness", value: "LIVE", note: "Reporting availability" },
  ],
  "Social Media Advertising": [
    { label: "Creative response", value: "CTR", note: "By concept and audience" },
    { label: "Qualified cost", value: "CPL", note: "Not just platform leads" },
    { label: "Funnel conversion", value: "CVR", note: "Ad click to outcome" },
    { label: "Frequency", value: "FREQ", note: "Fatigue and reach control" },
  ],
  "Email Marketing & Automation": [
    { label: "Deliverability", value: "INBOX", note: "List and sender health" },
    { label: "Engagement", value: "CTR", note: "Meaningful click activity" },
    { label: "Journey conversion", value: "CVR", note: "Email-assisted outcomes" },
    { label: "List quality", value: "LTV", note: "Growth and customer value" },
  ],
  "SEO & Content Growth": [
    { label: "Qualified visibility", value: "SOV", note: "Share of relevant search" },
    { label: "Organic demand", value: "SEO", note: "Non-brand opportunity" },
    { label: "Content conversion", value: "CVR", note: "Visits to commercial action" },
    { label: "Technical health", value: "CWV", note: "Crawl and experience signals" },
  ],
  default: [
    { label: "Qualified demand", value: "MQL", note: "Leads that fit the brief" },
    { label: "Acquisition efficiency", value: "CAC", note: "Cost by channel" },
    { label: "Journey conversion", value: "CVR", note: "From visit to outcome" },
    { label: "Commercial return", value: "ROI", note: "Value created from spend" },
  ],
};

export function GrowthProof({ serviceTitle = "default" }: { serviceTitle?: string }) {
  const metrics = metricSets[serviceTitle] ?? metricSets.default;
  return <section className="bg-zinc-50 px-4 py-20 sm:px-6 sm:py-28 lg:px-12">
    <div className="mx-auto max-w-7xl">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.25em] text-emerald-700">Measurement built in</p><h2 className="mt-4 text-4xl font-bold tracking-tight text-zinc-950 sm:text-5xl">A dashboard that leads to decisions.</h2><p className="mt-6 font-medium leading-relaxed text-zinc-700">We agree the commercial measures first, validate the data behind them and use one reporting rhythm to decide what changes next.</p></div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{metrics.map(({ label, value, note }) => <div key={label} className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5"><p className="text-2xl font-bold text-zinc-950">{value}</p><p className="mt-2 text-sm font-bold text-zinc-800">{label}</p><p className="mt-1 text-xs font-medium text-zinc-600">{note}</p></div>)}</div>
      </div>

      <div className="mt-10 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
        <div className="min-w-0 rounded-[28px] border border-zinc-200 bg-white p-5 sm:p-8"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="text-xs font-bold uppercase tracking-[.2em] text-zinc-500">Performance direction</p><h3 className="mt-2 text-lg font-bold text-zinc-950 sm:text-xl">From baseline to repeatable improvement</h3></div><LineChart className="h-6 w-6 shrink-0 text-emerald-600" /></div><div className="mt-6 h-44 w-full sm:mt-8 sm:h-56"><svg viewBox="0 0 720 220" className="h-full w-full" role="img" aria-label="Illustrative upward performance trend"><defs><linearGradient id="growth-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity=".3"/><stop offset="100%" stopColor="#10b981" stopOpacity="0"/></linearGradient></defs>{[35,80,125,170].map(y => <line key={y} x1="20" x2="700" y1={y} y2={y} stroke="#e4e4e7" strokeDasharray="5 7"/>)}<path d="M20 177 C90 168 116 156 175 160 S280 123 345 135 S450 92 515 102 S625 53 700 48 L700 210 L20 210 Z" fill="url(#growth-area)"/><path d="M20 177 C90 168 116 156 175 160 S280 123 345 135 S450 92 515 102 S625 53 700 48" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round"/><circle cx="700" cy="48" r="8" fill="#059669"/></svg></div><p className="text-xs font-medium text-zinc-500">Illustrative reporting view. Live dashboards use your verified business data and agreed targets.</p></div>
        <div className="rounded-[28px] bg-zinc-950 p-6 text-white sm:p-8"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-white">Funnel clarity</p><h3 className="mt-2 text-xl font-bold text-white">See where value is lost</h3></div><BarChart3 className="h-6 w-6 text-emerald-400" /></div><div className="mt-8 space-y-5">{[["Reach","100%"],["Engaged","64%"],["Qualified","31%"],["Converted","12%"]].map(([label,width]) => <div key={label}><div className="mb-2 flex justify-between text-xs font-bold text-white"><span>{label}</span><span>{width}</span></div><div className="h-3 rounded-full bg-white/10"><div className="h-3 rounded-full bg-emerald-400" style={{width}} /></div></div>)}</div><p className="mt-7 text-xs font-medium text-white">Illustrative funnel for showing how reporting isolates the next optimisation priority.</p></div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">{[
        { icon: Target, title: "Commercial measures", text: "Success is tied to qualified demand, conversion and value—not vanity metrics." },
        { icon: ShieldCheck, title: "Verified tracking", text: "Tags, events and platform data are checked before they drive budget decisions." },
        { icon: Gauge, title: "Action every month", text: "Reporting ends with decisions, owners and the next set of controlled experiments." },
      ].map(({icon:Icon,title,text}) => <article key={title} className="rounded-3xl border border-zinc-200 bg-white p-6"><Icon className="h-6 w-6 text-violet-700" /><h3 className="mt-5 text-lg font-bold text-zinc-950">{title}</h3><p className="mt-3 text-sm font-medium leading-relaxed text-zinc-700">{text}</p></article>)}</div>

      <div className="mt-16 rounded-[32px] bg-emerald-600 p-7 text-white sm:p-10"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-bold uppercase tracking-[.25em] text-white">Why Standex Digital</p><h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">One accountable team from strategy to evidence.</h2></div><div className="grid gap-4 sm:grid-cols-2">{["Commercial strategy and channel execution stay connected", "Analytics is part of delivery, not an end-of-month afterthought", "Specialists work against one roadmap and reporting cadence", "Testing is documented so learning compounds over time"].map(item => <p key={item} className="flex gap-3 text-sm font-bold leading-relaxed text-white"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />{item}</p>)}</div></div></div>
    </div>
  </section>;
}
