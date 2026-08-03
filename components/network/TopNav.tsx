"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <div className="flex min-w-0 items-center">
      <Image
        src="/StandexLogo.webp"
        alt="Standex Digital Logo"
        width={176}
        height={44}
        className="h-11 w-auto max-h-11 object-contain"
        priority
      />
    </div>
  );
}


export interface TopNavProps {
  user?: {
    id: string;
    email: string;
    name?: string | null;
    role?: string | null;
  } | null;
  forceDark?: boolean;
}

const solutionLinks = [
  { href: "/solutions/artificial-intelligence", label: "Artificial Intelligence", accent: "#049DCB" },
  { href: "/solutions/power-apps", label: "Power Apps", accent: "#D25BB1" },
  { href: "/solutions/power-automate", label: "Power Automate", accent: "#0078D4" },
  { href: "/solutions/power-bi", label: "Power BI", accent: "#F2C811" },
  { href: "/solutions/power-platform", label: "Power Platform Governance", accent: "#7C5CFC" },
  { href: "/solutions/data-readiness", label: "Data Engineering & Analytics", accent: "#10b981" },
];

const primaryLinks = [
  { href: "/Training", label: "Training" },
  { href: "/Contact", label: "Contact" },
];

export function TopNav({ forceDark }: TopNavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!solutionsOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setSolutionsOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSolutionsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [solutionsOpen]);

  useEffect(() => {
    setSolutionsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Keep the header stable on mobile and while the menu is open.
      if (window.innerWidth < 768 || mobileMenuOpen) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
      setIsScrolled(currentScrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isActivePath = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] w-full border-b border-zinc-800/90 bg-zinc-950/92 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.72)] transition-all duration-300",
        (isScrolled || mobileMenuOpen || forceDark) && "bg-zinc-950/96"
      )}
    >
      <div className="mx-auto flex h-20 min-h-[5rem] max-w-7xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
        {/* Left: Logo */}
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <div className="transition-all duration-300">
              <Logo />
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-500">v.2026.4 [LIVE]</span>
          </div>
        </div>

        {/* Center: Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {/* Solutions Dropdown */}
          <div className="relative" ref={solutionsRef}>
            <button
              type="button"
              onClick={() => setSolutionsOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={solutionsOpen}
              className="flex items-center gap-1 rounded-xl px-4 py-2 text-sm font-bold text-white hover:bg-zinc-800 transition-all duration-300 border border-zinc-800/50 hover:border-[#7C5CFC]/30"
            >
              Solutions
              <ChevronDown className={cn("h-3.5 w-3.5 opacity-50 transition-transform", solutionsOpen && "rotate-180")} />
            </button>
            <div
              className={cn(
                "absolute top-full left-0 pt-2 transition-all duration-200 z-50",
                solutionsOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
              )}
            >
              <div className="w-[280px] rounded-3xl border border-zinc-800 bg-zinc-900 p-3 shadow-[0_20px_80px_-15px_rgba(0,0,0,0.5)] flex flex-col gap-0.5">
                {solutionLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSolutionsOpen(false)}
                    className="flex flex-col rounded-2xl px-4 py-3 transition-all hover:bg-zinc-800/60"
                  >
                    <span className="text-sm font-bold text-white tracking-tight">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Standalone Links */}
          <Link 
            href="/Training" 
            className="rounded-xl px-4 py-2 text-sm font-bold text-white hover:bg-white/10 transition-all border border-transparent hover:border-white/20"
            style={{ color: '#FFFFFF' }}
          >
            Training
          </Link>

          
          <Link
            href="/Contact"
            className="ml-2 inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 active:scale-95"
          >
            Contact
          </Link>
        </nav>

        {/* Right: Actions */}
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl border shadow-sm transition-all active:scale-95 md:hidden",
              mobileMenuOpen 
                ? "border-white bg-white text-zinc-950 hover:bg-zinc-100" 
                : "border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700"
            )}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" strokeWidth={2.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

    </motion.header>

      {/* Mobile Menu — portalled to body to escape header's stacking context */}
      {mounted && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm md:hidden"
                aria-label="Close mobile navigation overlay"
                onClick={() => setMobileMenuOpen(false)}
              />

              <motion.div
                id="mobile-navigation"
                initial={{ opacity: 0, y: -18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="fixed inset-x-0 top-20 bottom-0 z-[200] flex flex-col overflow-hidden border-t border-zinc-800 bg-zinc-950 text-white md:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-5">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.32em] text-emerald-500">Navigation</p>
                    <p className="mt-2 text-sm font-semibold text-zinc-400">Everything important, one tap away.</p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-700 bg-zinc-900 text-white transition-all active:scale-[0.98]"
                    aria-label="Close mobile navigation"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5">
                  <div className="rounded-[28px] border border-zinc-800 bg-zinc-900/60 p-3">
                    <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">Main</p>
                    <div className="flex flex-col gap-1">
                      {primaryLinks.map((item) => {
                        const isActive = isActivePath(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex min-h-14 items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-bold tracking-tight transition-all",
                              isActive
                                ? "bg-white text-zinc-950 shadow-[0_10px_30px_-15px_rgba(255,255,255,0.65)]"
                                : "bg-zinc-950/40 text-white hover:bg-zinc-800 active:bg-zinc-800"
                            )}
                          >
                            <span>{item.label}</span>
                            <ChevronRight className={cn("h-4 w-4", isActive ? "text-zinc-950/60" : "text-zinc-500")} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-4 rounded-[28px] border border-zinc-800 bg-zinc-900/60 p-3">
                    <p className="px-3 pb-2 text-[10px] font-black uppercase tracking-[0.28em] text-zinc-500">Solutions</p>
                    <div className="flex flex-col gap-1">
                      {solutionLinks.map((item) => {
                        const isActive = isActivePath(item.href);
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              "flex min-h-14 items-center justify-between rounded-2xl px-4 py-3 transition-all",
                              isActive ? "bg-white text-zinc-950" : "bg-zinc-950/40 text-white hover:bg-zinc-800 active:bg-zinc-800"
                            )}
                          >
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.accent }} />
                              <span className="text-[15px] font-bold tracking-tight">{item.label}</span>
                            </div>
                            <ChevronRight className={cn("h-4 w-4 shrink-0", isActive ? "text-zinc-950/60" : "text-zinc-500")} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="border-t border-zinc-800 bg-zinc-950/95 px-4 py-4">
                  <div className="grid grid-cols-1 gap-3">
                    <Link
                      href="/Contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex min-h-14 items-center justify-center rounded-2xl bg-emerald-500 px-4 py-4 text-[15px] font-bold text-white shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]"
                    >
                      Contact Standex
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
