"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface TopNavProps {
  user?: { id: string; email: string; name?: string | null; role?: string | null } | null;
  forceDark?: boolean;
}

const navigation = [
  { href: "/", label: "Home" },
  { href: "/digital-growth", label: "Digital Growth" },
  { href: "/data-solutions", label: "BI Solutions" },
];

function Logo() {
  return <Image src="/StandexLogo.webp" alt="Standex Digital" width={176} height={44} className="h-11 w-auto max-h-11 object-contain" priority />;
}

export function TopNav({ forceDark }: TopNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setIsVisible(window.innerWidth < 768 || mobileMenuOpen || current <= lastScrollY || current <= 100);
      setLastScrollY(current);
      setIsScrolled(current > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) { document.body.style.overflow = ""; return; }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (event: KeyboardEvent) => event.key === "Escape" && setMobileMenuOpen(false);
    const resize = () => window.innerWidth >= 768 && setMobileMenuOpen(false);
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", escape); window.removeEventListener("resize", resize); };
  }, [mobileMenuOpen]);

  const active = (href: string) => href === "/" ? pathname === "/" : href.startsWith("/#") ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <motion.header initial={{ y: 0 }} animate={{ y: isVisible ? 0 : -100 }} transition={{ duration: 0.3 }} className={cn("fixed inset-x-0 top-0 z-[100] border-b border-zinc-800/90 bg-zinc-950/92 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.72)] backdrop-blur-xl", (isScrolled || mobileMenuOpen || forceDark) && "bg-zinc-950/96")}>
        <div className="mx-auto flex h-20 max-w-7xl items-center gap-3 px-3 sm:px-6">
          <Link href="/" className="min-w-0 flex-1" aria-label="Standex Digital home"><Logo /></Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => <Link key={item.href} href={item.href} className={cn("rounded-xl px-3 py-2 text-sm font-bold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400", active(item.href) && "bg-white/10")}>{item.label}</Link>)}
            <Link href="/Contact" className="ml-2 inline-flex items-center rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300">Book a Consultation</Link>
          </nav>
          <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-800 text-white md:hidden" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">{mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </motion.header>

      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && <>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm md:hidden" aria-label="Close mobile navigation overlay" onClick={() => setMobileMenuOpen(false)} />
            <motion.div id="mobile-navigation" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} className="fixed inset-x-0 bottom-0 top-20 z-[200] flex flex-col border-t border-zinc-800 bg-zinc-950 text-white md:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <p className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-500">Navigation</p>
                <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/60 p-3">
                  {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)} className={cn("flex min-h-14 items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-bold transition", active(item.href) ? "bg-white text-zinc-950" : "text-white hover:bg-zinc-800")}><span>{item.label}</span><ChevronRight className="h-4 w-4 opacity-50" /></Link>)}
                </div>
              </div>
              <div className="border-t border-zinc-800 p-4"><Link href="/Contact" onClick={() => setMobileMenuOpen(false)} className="flex min-h-14 items-center justify-center rounded-2xl bg-emerald-500 px-4 text-[15px] font-bold text-white">Book a Growth Consultation</Link></div>
            </motion.div>
          </>}
        </AnimatePresence>, document.body
      )}
    </>
  );
}
