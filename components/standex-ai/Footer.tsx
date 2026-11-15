import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const columns = [
  {
    title: "Solutions",
    links: [
      { href: "/solutions", label: "Overview" },
      { href: "/solutions#artificial-intelligence", label: "Artificial Intelligence" },
      { href: "/solutions#power-bi", label: "Power BI & Fabric" },
      { href: "/solutions#power-apps", label: "Power Apps & Automate" },
      { href: "/solutions#salesforce", label: "Salesforce CRM" },
      { href: "/solutions#digital-growth", label: "Digital Marketing & Growth" },
    ],
  },
  {
    title: "How We Drive Growth",
    links: [
      { href: "/#growth-system", label: "Lead Intake" },
      { href: "/#growth-system", label: "Process Automation" },
      { href: "/#growth-system", label: "Executive BI Dashboards" },
      { href: "/#growth-system", label: "AI Agents" },
      { href: "/#growth-system", label: "Business Outcomes" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/Training", label: "Enterprise Training" },
      { href: "/studio", label: "Studio (In-House)" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

const socials = [
  { href: "https://www.linkedin.com/company/standex-digital", label: "LinkedIn", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { href: "https://www.instagram.com/standexdigital", label: "Instagram", path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.88 5.88 0 0 0-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.71 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" },
  { href: "https://x.com/standexdigital", label: "X (Twitter)", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { href: "https://www.youtube.com/@StandexDigital", label: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
];

export default function Footer() {
  return (
    <footer data-site className="bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Image src="/StandexLogo.webp" alt="Standex Digital" width={160} height={68} loading="lazy" className="h-12 w-auto" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-400">
              Focused enterprise AI and Business Intelligence solutions—AI agents, Microsoft Power Platform, and Fabric BI systems that eliminate manual bottlenecks and drive measurable company growth.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-500">
              Contact us <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-8 space-y-1.5 text-sm">
              <a href="mailto:support@standexdigital.com" className="block text-zinc-400 transition hover:text-emerald-400">support@standexdigital.com</a>
              <a href="mailto:hr@standexdigital.com" className="block text-zinc-400 transition hover:text-emerald-400">hr@standexdigital.com</a>
              <p className="text-zinc-500">London, United Kingdom</p>
              <p className="text-zinc-500">Lagos, Nigeria</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white">{col.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={`${link.href}-${link.label}`}>
                      <Link href={link.href} className="text-sm text-zinc-400 transition hover:text-emerald-400">{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Standex Digital. All rights reserved.</p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:border-emerald-500 hover:text-emerald-400">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d={s.path} /></svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
