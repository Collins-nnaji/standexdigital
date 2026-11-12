"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BarChart3, Bot, ChevronDown, ChevronRight, Cloud, Layers3, Mail, Megaphone, Menu, Search, Target, Workflow, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface TopNavProps {
  user?: { id: string; email: string; name?: string | null; role?: string | null } | null;
  /** Kept for backwards compatibility; the navigation is always light now. */
  forceDark?: boolean;
}

type MenuItem = { href: string; label: string; text: string; icon: typeof Target };
type NavItem = { href: string; label: string; menu?: { overview: { href: string; label: string; text: string }; items: MenuItem[] } };

const navigation: NavItem[] = [
  {
    href: "/digital-growth",
    label: "Digital Growth",
    menu: {
      overview: { href: "/digital-growth", label: "Digital Strategy & Growth", text: "A complete growth function—strategy, acquisition, analytics and conversion, managed as one system." },
      items: [
        { href: "/digital-growth/google-ads", label: "Google Ads", text: "High-intent paid search", icon: Target },
        { href: "/digital-growth/analytics", label: "Analytics & Measurement", text: "GA4, tracking & dashboards", icon: BarChart3 },
        { href: "/digital-growth/social-media-ads", label: "Social Media Advertising", text: "Meta & LinkedIn campaigns", icon: Megaphone },
        { href: "/digital-growth/email-marketing", label: "Email Marketing & Automation", text: "Lifecycle journeys", icon: Mail },
        { href: "/digital-growth/seo-content", label: "SEO & Content Growth", text: "Organic & AI-search visibility", icon: Search },
      ],
    },
  },
  {
    href: "/data-solutions",
    label: "BI Solutions",
    menu: {
      overview: { href: "/data-solutions", label: "Business Intelligence Solutions", text: "Power Platform, Power BI & Fabric, Copilot Studio and Salesforce—one connected system for customers, data, decisions and AI agents." },
      items: [
        { href: "/solutions/power-apps", label: "Power Apps", text: "Custom business applications", icon: Layers3 },
        { href: "/solutions/power-automate", label: "Power Automate", text: "Workflow & process automation", icon: Workflow },
        { href: "/solutions/power-bi", label: "Power BI & Fabric", text: "Dashboards, Fabric & data agents", icon: BarChart3 },
        { href: "/solutions/copilot-studio", label: "Copilot Studio", text: "Custom AI agents", icon: Bot },
        { href: "/solutions/salesforce", label: "Salesforce", text: "CRM implementation & integration", icon: Cloud },
      ],
    },
  },
  { href: "/Training", label: "Training" },
  { href: "/Contact", label: "Contact" },
];

function Logo() {
  return <Image src="/StandexLogoDark.webp" alt="Standex Digital" width={176} height={74} className="h-10 w-auto object-contain sm:h-11" priority />;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function TopNav(_props: TopNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close any open menus when the route changes (adjusting state during render).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpenMenu(null);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setMobileMenuOpen(false);
    const resize = () => window.innerWidth >= 1024 && setMobileMenuOpen(false);
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [mobileMenuOpen]);

  const isActive = (item: NavItem) =>
    pathname === item.href || pathname.startsWith(`${item.href}/`) || (item.menu?.items.some((m) => pathname === m.href) ?? false);

  return (
    <>
      <header
        data-site
        className={cn(
          "fixed inset-x-0 top-0 z-[100] border-b bg-white/90 backdrop-blur-xl transition-[box-shadow,border-color]",
          isScrolled || mobileMenuOpen ? "border-zinc-200 shadow-[0_6px_24px_-16px_rgba(16,24,40,0.35)]" : "border-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="mr-auto shrink-0" aria-label="Standex Digital home">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation" onMouseLeave={() => setOpenMenu(null)}>
            {navigation.map((item) =>
              item.menu ? (
                <div key={item.href} className="relative" onMouseEnter={() => setOpenMenu(item.href)}>
                  <button
                    type="button"
                    onClick={() => setOpenMenu((v) => (v === item.href ? null : item.href))}
                    aria-expanded={openMenu === item.href}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                      isActive(item) ? "text-emerald-700" : "text-zinc-700 hover:text-zinc-950",
                    )}
                  >
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition", openMenu === item.href && "rotate-180")} />
                  </button>
                  <AnimatePresence>
                    {openMenu === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3"
                      >
                        <div className="grid grid-cols-[0.9fr_1.1fr] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_24px_60px_-20px_rgba(16,24,40,0.3)]">
                          <Link href={item.menu.overview.href} className="group flex flex-col justify-between bg-emerald-50/70 p-6 hover:bg-emerald-50">
                            <div>
                              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700">Overview</p>
                              <p className="mt-3 text-base font-semibold text-zinc-950">{item.menu.overview.label}</p>
                              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.menu.overview.text}</p>
                            </div>
                            <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700">
                              Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                            </span>
                          </Link>
                          <div className="p-3">
                            {item.menu.items.map(({ href, label, text, icon: Icon }) => (
                              <Link key={href} href={href} className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-zinc-50">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-700 ring-1 ring-zinc-200">
                                  <Icon className="h-4 w-4" />
                                </span>
                                <span>
                                  <span className="block text-sm font-semibold text-zinc-950">{label}</span>
                                  <span className="block text-xs text-zinc-500">{text}</span>
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setOpenMenu(null)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500",
                    isActive(item) ? "text-emerald-700" : "text-zinc-700 hover:text-zinc-950",
                  )}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <Link
            href="/Contact"
            className="hidden items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 lg:inline-flex"
          >
            Book a consultation <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-900 lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-navigation"
                data-site
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-x-0 bottom-0 top-[72px] z-[200] flex flex-col border-t border-zinc-200 bg-white text-zinc-950 lg:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
              >
                <div className="flex-1 overflow-y-auto px-4 py-6">
                  <Link href="/" className="flex min-h-12 items-center justify-between rounded-xl px-3 text-base font-semibold hover:bg-zinc-50">
                    Home <ChevronRight className="h-4 w-4 text-zinc-400" />
                  </Link>
                  {navigation.map((item) => (
                    <div key={item.href} className="border-t border-zinc-100 py-2 first:border-t-0">
                      <Link href={item.href} className={cn("flex min-h-12 items-center justify-between rounded-xl px-3 text-base font-semibold hover:bg-zinc-50", isActive(item) && "text-emerald-700")}>
                        {item.label}
                        <ChevronRight className="h-4 w-4 text-zinc-400" />
                      </Link>
                      {item.menu && (
                        <div className="mb-2 ml-3 grid gap-1 border-l border-zinc-200 pl-3">
                          {item.menu.items.map(({ href, label, icon: Icon }) => (
                            <Link key={href} href={href} className={cn("flex min-h-10 items-center gap-3 rounded-lg px-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950", pathname === href && "text-emerald-700")}>
                              <Icon className="h-4 w-4 text-emerald-600" />
                              {label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="border-t border-zinc-200 p-4">
                  <Link href="/Contact" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-4 text-[15px] font-semibold text-white">
                    Book a consultation <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
}
