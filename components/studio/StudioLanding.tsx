"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONSOLE_THEMES,
  THEME_STORAGE_KEY,
  type ConsoleThemeMode,
} from "@/components/console/console-theme";
import { STUDIO_SECTIONS } from "@/components/studio/studio-sections";
import { Button } from "@/components/ui/button";

/** Studio entry point — one large card per section. */
export function StudioLanding() {
  const [themeMode, setThemeMode] = useState<ConsoleThemeMode>("light");
  const t = CONSOLE_THEMES[themeMode];

  useEffect(() => {
    const s = localStorage.getItem(THEME_STORAGE_KEY) as ConsoleThemeMode | null;
    if (s === "light" || s === "dark") setThemeMode(s);
  }, []);

  const persistTheme = (m: ConsoleThemeMode) => {
    setThemeMode(m);
    localStorage.setItem(THEME_STORAGE_KEY, m);
  };

  const isDark = themeMode === "dark";

  return (
    <div
      className={cn(
        "relative flex min-h-[100dvh] flex-col [font-family:var(--font-inter),ui-sans-serif,sans-serif] antialiased",
        t.shell,
        t.scrollbar,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(237,235,228,0.05),transparent_55%)]",
          !isDark && "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(17,17,16,0.04),transparent_55%)]",
        )}
      />

      <header className="relative z-10 flex h-14 shrink-0 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="Standex Digital home"
        >
          <Image
            src="/standexailogo.png"
            alt="Standex Digital"
            width={130}
            height={36}
            className={cn(
              "h-7 w-auto max-w-[96px] object-contain transition-all duration-300 sm:h-8 sm:max-w-[130px]",
              isDark ? "brightness-0 invert opacity-90" : "",
            )}
            priority
            unoptimized
          />
        </Link>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => persistTheme(isDark ? "light" : "dark")}
          className={cn("ml-auto h-8 w-8 shadow-none", t.borderSub, t.text)}
          title={isDark ? "Light background" : "Dark background"}
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </header>

      <main className="relative z-[1] w-full flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-14 lg:px-8">
        <div className="max-w-2xl">
          <h1 className={cn("text-3xl font-black tracking-tight sm:text-4xl", t.text)}>Studio</h1>
          <p className={cn("mt-3 text-[15px] leading-relaxed", t.muted)}>
            Marketing intelligence, writing tools, coding environments and data
            exploration in one connected Studio.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {STUDIO_SECTIONS.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                href={section.href}
                className={cn(
                  "group relative flex flex-col rounded-2xl border p-6 transition-all hover:-translate-y-0.5",
                  t.borderSub,
                  isDark
                    ? "bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/25"
                    : "bg-black/[0.02] hover:bg-black/[0.04] hover:border-black/20",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                      isDark ? "bg-white/[0.08]" : "bg-black/[0.06]",
                    )}
                  >
                    <Icon className={cn("h-5 w-5", t.text)} />
                  </div>
                  {!section.available && (
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em]",
                        isDark ? "bg-white/10 text-white/60" : "bg-black/[0.07] text-black/50",
                      )}
                    >
                      Coming soon
                    </span>
                  )}
                </div>

                <h2 className={cn("mt-5 text-lg font-bold tracking-tight", t.text)}>
                  {section.label}
                </h2>
                <p className={cn("mt-2 flex-1 text-[13px] leading-relaxed", t.muted)}>
                  {section.description}
                </p>

                <span
                  className={cn(
                    "mt-5 inline-flex items-center gap-1.5 text-[12px] font-bold tracking-tight",
                    section.available ? "text-emerald-500" : t.muted,
                  )}
                >
                  {section.available ? "Open" : "Preview"}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
