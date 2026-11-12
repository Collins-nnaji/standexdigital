export type ServiceFaq = { q: string; a: string };
export type ServiceStep = { title: string; text: string; duration?: string };
export type ServiceChallenge = { title: string; text: string };

export type DigitalGrowthService = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  promise: string;
  intro: string;
  icon: "target" | "chart" | "megaphone" | "mail" | "search";
  image: string;
  challenges: ServiceChallenge[];
  outcomes: string[];
  deliverables: { title: string; text: string }[];
  process: ServiceStep[];
  idealFor: string[];
  tools: string[];
  metrics: { label: string; value: string; note: string }[];
  faqs: ServiceFaq[];
};

export const digitalGrowthServices: DigitalGrowthService[] = [
  {
    slug: "google-ads",
    title: "Google Ads",
    shortTitle: "Paid Search",
    eyebrow: "High-intent acquisition",
    description: "Turn active search demand into qualified opportunities with tightly managed campaigns, landing pages and spend.",
    promise: "Capture the buyers already searching for what you sell—without losing control of the budget.",
    intro:
      "We manage Google Ads as a commercial system, not a collection of keywords. Account structure, search intent, creative, landing pages and conversion tracking are run together, so every pound of spend is tied to evidence about what produces qualified leads and revenue.",
    icon: "target",
    image: "/Woman-consulting.webp",
    challenges: [
      { title: "Spend is rising, lead quality isn't", text: "Broad match, auto-applied recommendations and loose Performance Max settings quietly push budget towards cheap, low-intent traffic." },
      { title: "Conversions can't be trusted", text: "Form fills, calls and offline sales are tracked inconsistently, so Smart Bidding is optimising towards the wrong signal." },
      { title: "The account has grown messy", text: "Years of additions leave overlapping campaigns, duplicate keywords and ad groups that compete with each other." },
      { title: "Landing pages don't match the ad", text: "Traffic arrives on generic pages that don't answer the search, so cost per acquisition stays stubbornly high." },
    ],
    outcomes: [
      "A clean campaign structure mapped to products, margins and intent",
      "Budget allocated by commercial priority, not platform defaults",
      "Smart Bidding trained on qualified conversions and offline outcomes",
      "Continuous ad, asset and landing-page testing with a written log",
      "Search-term control that cuts wasted spend every week",
      "Transparent reporting on cost per qualified lead and return on spend",
    ],
    deliverables: [
      { title: "Account & conversion audit", text: "A line-by-line review of structure, settings, bidding, tracking and search terms, with a prioritised fix list." },
      { title: "Search & Performance Max strategy", text: "Campaign architecture, match-type policy, audience signals and asset groups designed around your offer." },
      { title: "Campaign build or restructure", text: "Hands-on rebuild that protects existing learning while removing overlap and waste." },
      { title: "Ad copy & asset testing", text: "Responsive search ads, extensions and creative assets tested in controlled rounds." },
      { title: "Search-term & negative management", text: "Weekly review of what triggered your ads, with negatives, exclusions and new opportunities." },
      { title: "Offline conversion import", text: "Feeding CRM outcomes back to Google so bidding learns from real sales, not just form fills." },
      { title: "Landing-page recommendations", text: "Message-match, structure and CRO improvements for the pages your ads send traffic to." },
      { title: "Monthly performance & budget review", text: "What happened, why, and exactly what we are changing next—agreed with you." },
    ],
    process: [
      { title: "Audit & baseline", text: "Review the account, tracking and commercial targets. Agree what a qualified conversion is worth.", duration: "Weeks 1–2" },
      { title: "Fix the foundations", text: "Repair conversion tracking, tidy structure and remove obvious waste before scaling anything.", duration: "Weeks 2–4" },
      { title: "Launch & learn", text: "Roll out the new structure, bidding strategy and first creative tests.", duration: "Month 2" },
      { title: "Optimise & scale", text: "Shift budget towards proven campaigns, expand coverage and keep the test cycle running.", duration: "Month 3+" },
    ],
    idealFor: [
      "B2B and professional-services firms generating leads through search",
      "E-commerce and retail brands running Shopping and Performance Max",
      "Teams spending £3k+ a month who want clearer accountability",
      "Businesses moving Google Ads in-house from a generalist agency",
    ],
    tools: ["Google Ads", "Performance Max", "Google Merchant Center", "Google Tag Manager", "GA4", "Looker Studio", "Microsoft Advertising"],
    metrics: [
      { label: "Cost per qualified lead", value: "CPL", note: "Measured against CRM, not just form fills" },
      { label: "Return on ad spend", value: "ROAS", note: "Where revenue data is available" },
      { label: "Search impression share", value: "IS", note: "Coverage of your highest-intent terms" },
      { label: "Conversion rate", value: "CVR", note: "By campaign and landing page" },
    ],
    faqs: [
      { q: "What budget do we need for Google Ads to work?", a: "It depends on your market and cost per click, but we generally recommend enough monthly spend to generate at least 30 conversions a month so Smart Bidding has data to learn from. We'll model this with you during the audit before you commit." },
      { q: "Do you take a percentage of ad spend?", a: "We prefer a fixed monthly management fee agreed up front, so our advice on budget is never influenced by how much you spend." },
      { q: "Will we keep ownership of the account?", a: "Always. The Google Ads account, data and assets remain yours. We work inside it with manager access." },
      { q: "How quickly will we see results?", a: "Tracking and structural fixes usually improve efficiency within the first month. Meaningful scaling decisions typically follow once the new structure has two to three months of clean data." },
      { q: "Do you also manage Microsoft Advertising (Bing)?", a: "Yes. Where it makes sense for your audience, we mirror proven Google campaigns into Microsoft Advertising and manage them together." },
    ],
  },
  {
    slug: "analytics",
    title: "Analytics & Measurement",
    shortTitle: "Analytics",
    eyebrow: "Decisions you can trust",
    description: "Build a reliable measurement layer across GA4, advertising platforms, conversions and commercial reporting.",
    promise: "Know what is working, what isn't, and what to do next—with numbers your whole team agrees on.",
    intro:
      "Growth becomes manageable when the numbers are dependable. We design measurement around the decisions your team needs to make, implement it properly across GA4, Tag Manager and your ad platforms, and connect it to the commercial outcomes that matter—leads, pipeline and revenue.",
    icon: "chart",
    image: "/Experienced.webp",
    challenges: [
      { title: "Every platform tells a different story", text: "Google Ads, Meta, GA4 and the CRM all report different numbers, and meetings stall on which one is right." },
      { title: "GA4 was set up and never finished", text: "Default events, missing conversions and no documentation mean the data looks busy but answers nothing." },
      { title: "Consent and privacy gaps", text: "Consent Mode, cookie banners and server-side options are misconfigured, putting both data quality and compliance at risk." },
      { title: "Reporting takes days, not minutes", text: "Someone exports spreadsheets every month and the insight arrives too late to change anything." },
    ],
    outcomes: [
      "A documented measurement plan tied to business KPIs",
      "Reliable conversion and event tracking across every channel",
      "Consent Mode v2 and privacy-aware tracking configured properly",
      "One cross-channel dashboard the whole team trusts",
      "Less time reconciling reports, more time acting on them",
      "Faster, better-evidenced budget and campaign decisions",
    ],
    deliverables: [
      { title: "Measurement strategy & plan", text: "KPIs, events, conversions and naming conventions agreed and written down before anything is built." },
      { title: "GA4 & Tag Manager audit", text: "A full check of properties, data streams, tags, triggers and data quality." },
      { title: "Event & conversion architecture", text: "Clean, scalable tracking for forms, calls, purchases, sign-ups and key engagement." },
      { title: "Consent Mode & privacy setup", text: "Cookie consent, Consent Mode v2 and, where useful, server-side tagging." },
      { title: "Ad-platform conversion sync", text: "Google Ads, Meta and LinkedIn conversions aligned with GA4 and validated." },
      { title: "CRM & offline outcome tracking", text: "Connect lead quality and revenue back to the source that generated it." },
      { title: "Cross-channel dashboards", text: "Looker Studio or Power BI reporting designed around the questions leadership asks." },
      { title: "Monthly insight & action report", text: "A short, plain-English summary of what changed and what to do about it." },
    ],
    process: [
      { title: "Discover", text: "Interview stakeholders, map the customer journey and agree the decisions data must support.", duration: "Week 1" },
      { title: "Audit", text: "Test the current setup end to end and document every gap and risk.", duration: "Week 2" },
      { title: "Implement", text: "Build tracking, consent and integrations in a staging-first, tested way.", duration: "Weeks 3–5" },
      { title: "Report & embed", text: "Launch dashboards, train the team and set the monthly insight rhythm.", duration: "Week 6+" },
    ],
    idealFor: [
      "Businesses investing in paid media without trusted attribution",
      "Teams that migrated to GA4 but never rebuilt their reporting",
      "Leadership who want one view of marketing performance",
      "Organisations preparing to scale spend and needing proof first",
    ],
    tools: ["Google Analytics 4", "Google Tag Manager", "Server-side GTM", "Looker Studio", "Power BI", "BigQuery", "HubSpot", "Microsoft Clarity"],
    metrics: [
      { label: "Tracking health", value: "QA", note: "Events, consent and tags validated" },
      { label: "Channel contribution", value: "ATTR", note: "Value by source and campaign" },
      { label: "Journey conversion", value: "CVR", note: "Across each funnel stage" },
      { label: "Reporting latency", value: "LIVE", note: "Time from activity to insight" },
    ],
    faqs: [
      { q: "We already have GA4—why would we need this?", a: "Most GA4 properties capture data but aren't configured to answer business questions. We make sure the right events and conversions exist, are accurate, and feed reporting people actually use." },
      { q: "Can you connect marketing data to our CRM?", a: "Yes. We regularly connect HubSpot, Salesforce, Dynamics 365 and other CRMs so lead quality and revenue can be traced back to their source." },
      { q: "Do you handle cookie consent and GDPR?", a: "We implement Consent Mode v2 and consent-aware tracking with your chosen consent platform. We'll flag compliance risks, though final legal sign-off sits with your DPO or legal advisor." },
      { q: "Looker Studio or Power BI?", a: "Looker Studio is quick and cost-effective for marketing reporting. Power BI is better when marketing data needs to sit alongside finance, sales and operations—something our BI Solutions team specialises in." },
    ],
  },
  {
    slug: "social-media-ads",
    title: "Social Media Advertising",
    shortTitle: "Social Ads",
    eyebrow: "Create and convert demand",
    description: "Reach the right audiences with disciplined paid social campaigns, structured creative testing and measurable funnels.",
    promise: "Build demand with creative that earns attention and campaigns that keep learning.",
    intro:
      "Paid social works when audience, offer, creative and follow-up operate as one journey. We plan and run that journey across the platforms that fit your market—Meta, LinkedIn and beyond—rather than spreading budget thinly everywhere, and we measure it against outcomes, not likes.",
    icon: "megaphone",
    image: "/Innovative.webp",
    challenges: [
      { title: "Creative fatigue", text: "The same few ads run for months, frequency climbs and performance slowly erodes." },
      { title: "Cheap leads that never convert", text: "Platform lead forms deliver volume, but sales can't reach or qualify most of them." },
      { title: "No clear funnel", text: "Cold audiences see a hard sell and warm audiences see nothing, so the journey breaks in the middle." },
      { title: "Tracking lost to privacy changes", text: "iOS changes and missing Conversions API leave the algorithm optimising blind." },
    ],
    outcomes: [
      "A clear audience, offer and channel strategy",
      "A structured creative-testing programme with documented learning",
      "Full-funnel campaigns from awareness to retargeting",
      "Conversions API and pixel tracking validated end to end",
      "Better alignment between ads, landing pages and follow-up",
      "Reporting on qualified pipeline—not clicks and impressions",
    ],
    deliverables: [
      { title: "Channel & audience strategy", text: "Which platforms, which audiences and which offers—grounded in your buyer and margins." },
      { title: "Meta campaign management", text: "Facebook and Instagram prospecting, retargeting and Advantage+ campaigns." },
      { title: "LinkedIn campaign management", text: "Account-based and job-title targeting for B2B pipeline, with lead quality controls." },
      { title: "Creative concepts & test plans", text: "Hooks, formats and messages tested in rounds, with winners scaled and learnings logged." },
      { title: "Retargeting & funnel design", text: "Sequenced messages for visitors, engagers and leads at every stage." },
      { title: "Conversions API & pixel setup", text: "Server-side events and deduplication so platforms receive reliable signals." },
      { title: "Lead quality feedback loops", text: "CRM status fed back into campaigns so optimisation favours real opportunities." },
      { title: "Performance & learning reviews", text: "Monthly reviews covering results, creative insight and the next test plan." },
    ],
    process: [
      { title: "Strategy", text: "Define audiences, offers, funnel stages and success measures.", duration: "Weeks 1–2" },
      { title: "Tracking & creative", text: "Validate pixel and CAPI, then produce the first round of creative concepts.", duration: "Weeks 2–4" },
      { title: "Launch & test", text: "Go live with a structured testing framework and tight budget controls.", duration: "Month 2" },
      { title: "Scale what works", text: "Increase investment in winners, refresh creative and expand audiences.", duration: "Month 3+" },
    ],
    idealFor: [
      "B2B companies building pipeline with LinkedIn",
      "Consumer brands that need consistent creative testing",
      "Businesses launching a new product, service or market",
      "Teams whose social ads produce volume but not quality",
    ],
    tools: ["Meta Ads Manager", "Conversions API", "LinkedIn Campaign Manager", "TikTok Ads", "Canva", "GA4", "HubSpot"],
    metrics: [
      { label: "Creative response", value: "CTR", note: "By concept, hook and audience" },
      { label: "Qualified cost", value: "CPL", note: "Based on CRM-qualified leads" },
      { label: "Funnel conversion", value: "CVR", note: "Ad click to commercial outcome" },
      { label: "Frequency", value: "FREQ", note: "Fatigue and reach control" },
    ],
    faqs: [
      { q: "Do you create the ad creative?", a: "Yes. We write the concepts, copy and test plans and produce static and simple motion creative. For larger video productions we can brief and work with your in-house team or a production partner." },
      { q: "Which platforms do you recommend?", a: "It depends on who you sell to. LinkedIn is usually strongest for B2B pipeline; Meta for consumer and broad local demand. We recommend the fewest channels that can reach your buyers well." },
      { q: "How do you deal with low-quality leads?", a: "We tighten targeting and forms, add qualifying questions, send leads to landing pages where appropriate, and feed CRM outcomes back into the platforms so they optimise for quality." },
      { q: "Is organic social included?", a: "Our focus is paid social, but we align paid creative with your organic presence and can advise on an organic content rhythm that supports campaigns." },
    ],
  },
  {
    slug: "email-marketing",
    title: "Email Marketing & Automation",
    shortTitle: "Email",
    eyebrow: "Nurture demand into action",
    description: "Create lifecycle email journeys that follow up leads, deepen customer relationships and support repeatable growth.",
    promise: "Make every new lead and customer relationship work harder—automatically.",
    intro:
      "Email should be more than an occasional newsletter. We design purposeful journeys around real customer moments—first enquiry, education, conversion, onboarding, repeat purchase and re-engagement—and automate them so follow-up happens consistently, without adding work for your team.",
    icon: "mail",
    image: "/HomeAboutPic.webp",
    challenges: [
      { title: "Leads go cold after the first contact", text: "Enquiries arrive, a single reply goes out, and nothing happens until the prospect has moved on." },
      { title: "One message for everyone", text: "The whole database gets the same email, so engagement drops and unsubscribes rise." },
      { title: "Deliverability problems", text: "Missing SPF, DKIM and DMARC records or poor list hygiene send important emails to spam." },
      { title: "No link to revenue", text: "Open rates are reported, but nobody knows how much pipeline or revenue email actually influences." },
    ],
    outcomes: [
      "Automated follow-up for every new lead and customer",
      "Segmented communication by interest, stage and behaviour",
      "A healthier sender reputation and inbox placement",
      "A stronger, faster path from lead to opportunity",
      "Higher repeat purchase and customer retention",
      "Clear visibility of email-assisted pipeline and revenue",
    ],
    deliverables: [
      { title: "Lifecycle & database audit", text: "Review of your list, segments, existing flows and platform configuration." },
      { title: "Segmentation strategy", text: "Practical segments based on role, interest, behaviour and customer stage." },
      { title: "Journey mapping", text: "Visual maps of every automated journey, agreed before build." },
      { title: "Nurture & conversion sequences", text: "Written, designed and built sequences for leads, trials and enquiries." },
      { title: "Onboarding & retention flows", text: "Welcome, onboarding, review, repeat-purchase and win-back journeys." },
      { title: "Templates & campaign calendar", text: "Branded, mobile-first templates and a sustainable broadcast rhythm." },
      { title: "Deliverability setup", text: "SPF, DKIM, DMARC, warm-up, list hygiene and sender reputation monitoring." },
      { title: "Performance optimisation", text: "Subject-line, content and timing tests with monthly reporting." },
    ],
    process: [
      { title: "Audit & map", text: "Review the list and platform, then map the journeys that matter most.", duration: "Weeks 1–2" },
      { title: "Write & design", text: "Produce copy, templates and segmentation logic for priority flows.", duration: "Weeks 2–4" },
      { title: "Build & test", text: "Implement automations, QA every path and switch on in stages.", duration: "Weeks 4–6" },
      { title: "Optimise", text: "Test, refine and add new journeys as performance data builds.", duration: "Ongoing" },
    ],
    idealFor: [
      "Businesses with a growing database that is rarely used",
      "Service firms whose sales cycle needs consistent nurture",
      "E-commerce brands focused on repeat purchase and LTV",
      "Teams moving to HubSpot, Klaviyo or a new email platform",
    ],
    tools: ["HubSpot", "Klaviyo", "Mailchimp", "ActiveCampaign", "Dynamics 365 Customer Insights", "Power Automate"],
    metrics: [
      { label: "Inbox placement", value: "INBOX", note: "Sender health and deliverability" },
      { label: "Engagement", value: "CTR", note: "Meaningful click activity" },
      { label: "Journey conversion", value: "CVR", note: "Email-assisted outcomes" },
      { label: "Customer value", value: "LTV", note: "Retention and repeat purchase" },
    ],
    faqs: [
      { q: "Which email platform should we use?", a: "We work across HubSpot, Klaviyo, Mailchimp, ActiveCampaign and Microsoft's Customer Insights. If you already have a platform we'll usually make the most of it; if not, we'll recommend one that fits your CRM and budget." },
      { q: "Do you write the emails?", a: "Yes. Copywriting, design and build are included, written in your brand voice and reviewed with you before anything goes live." },
      { q: "Can you help with GDPR and consent?", a: "We build consent capture, preference centres and suppression rules into the setup, and align with your privacy policy and legal guidance." },
      { q: "How soon do automations start working?", a: "Priority journeys such as new-lead follow-up are typically live within four to six weeks, and start working on every new contact from that day forward." },
    ],
  },
  {
    slug: "seo-content",
    title: "SEO & Content Growth",
    shortTitle: "SEO & Content",
    eyebrow: "Compound organic visibility",
    description: "Build useful search visibility around customer demand, commercial priorities and content your market values.",
    promise: "Become easier to find—and more convincing when prospects arrive.",
    intro:
      "We combine technical SEO, search-intent research and subject expertise into a practical content programme. The goal isn't traffic for its own sake, but sustained visibility with the people most likely to buy—across Google and the AI assistants that increasingly answer their questions.",
    icon: "search",
    image: "/Power-BI-Help.webp",
    challenges: [
      { title: "Invisible for commercial searches", text: "You rank for your brand name, but not for the problems and services buyers actually search for." },
      { title: "Technical issues holding the site back", text: "Slow pages, crawl errors, duplicate content and weak site structure limit what content can achieve." },
      { title: "Content without a plan", text: "Blog posts are published sporadically with no link to keywords, buyer stages or sales conversations." },
      { title: "AI answers are changing search", text: "Prospects ask ChatGPT and Google's AI Overviews, and your brand isn't part of the answer." },
    ],
    outcomes: [
      "Clear organic priorities based on demand and commercial value",
      "Strong technical foundations and Core Web Vitals",
      "Content mapped to customer intent at every buying stage",
      "Service and landing pages that rank and convert",
      "Visibility in AI Overviews and assistant-style answers",
      "A repeatable publishing and improvement rhythm",
    ],
    deliverables: [
      { title: "Technical SEO audit", text: "Crawlability, indexation, site speed, structured data and architecture reviewed and prioritised." },
      { title: "Keyword & opportunity mapping", text: "Search demand mapped to pages, intent and commercial value." },
      { title: "Content strategy & briefs", text: "A quarterly content plan with detailed briefs for every piece." },
      { title: "Content production", text: "Expert-led articles, guides and service pages written for people first." },
      { title: "On-page & internal linking", text: "Titles, headings, schema and internal links optimised across key pages." },
      { title: "Local SEO", text: "Google Business Profile, citations and location pages where relevant." },
      { title: "Authority & digital PR", text: "Earning relevant mentions and links through useful assets and outreach." },
      { title: "Search performance reporting", text: "Rankings, organic leads and content performance reviewed monthly." },
    ],
    process: [
      { title: "Audit & research", text: "Technical audit, competitor review and keyword opportunity mapping.", duration: "Weeks 1–3" },
      { title: "Fix & optimise", text: "Resolve technical issues and optimise existing high-potential pages.", duration: "Months 1–2" },
      { title: "Create & publish", text: "Produce new content to the agreed plan and build authority.", duration: "Month 2+" },
      { title: "Measure & compound", text: "Refresh what's working, prune what isn't, and expand the plan.", duration: "Ongoing" },
    ],
    idealFor: [
      "Businesses over-reliant on paid media for leads",
      "Specialist firms with deep expertise that isn't online yet",
      "Websites that have plateaued or lost traffic after updates",
      "Companies planning a redesign or migration that must protect rankings",
    ],
    tools: ["Google Search Console", "Ahrefs", "Semrush", "Screaming Frog", "PageSpeed Insights", "GA4", "Schema.org"],
    metrics: [
      { label: "Share of search", value: "SOV", note: "Visibility for priority topics" },
      { label: "Non-brand demand", value: "SEO", note: "Organic traffic beyond your name" },
      { label: "Content conversion", value: "CVR", note: "Visits to commercial action" },
      { label: "Technical health", value: "CWV", note: "Core Web Vitals and crawl signals" },
    ],
    faqs: [
      { q: "How long does SEO take?", a: "Technical fixes and optimising existing pages can show movement within weeks. New content typically takes three to six months to build meaningful rankings, and the benefit compounds from there." },
      { q: "Do you write the content or do we?", a: "Either. We can write everything, or provide briefs and editing support so your experts contribute their knowledge efficiently." },
      { q: "What about AI search and ChatGPT?", a: "We optimise for answer engines as well as Google—clear, well-structured, authoritative content and consistent brand information make you more likely to be cited in AI answers." },
      { q: "Can you help with a website migration?", a: "Yes. We plan redirects, preserve metadata and monitor closely after launch so you keep the rankings you've earned." },
    ],
  },
];

export function getDigitalGrowthService(slug: string) {
  return digitalGrowthServices.find((service) => service.slug === slug);
}
