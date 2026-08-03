"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONSOLE_THEMES,
  THEME_STORAGE_KEY,
  type ConsoleTheme,
  type ConsoleThemeMode,
} from "@/components/console/console-theme";
import { StudioSectionNav } from "@/components/studio/StudioSectionNav";
import type { StudioSectionId } from "@/components/studio/studio-sections";
import { Button } from "@/components/ui/button";

type StudioShellProps = {
  active: StudioSectionId;
  /** Receives the resolved theme so sections style themselves consistently. */
  children: (ctx: { theme: ConsoleTheme; themeMode: ConsoleThemeMode }) => ReactNode;
};

/**
 * Chrome shared by every Studio section: theme toggle, brand mark and section nav.
 * Theme choice is persisted under the existing console key so the two stay in sync.
 */
export function StudioShell({ active, children }: StudioShellProps) {
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

  return (
    <div
      className={cn(
        "relative flex h-[100dvh] flex-col overflow-hidden [font-family:var(--font-inter),ui-sans-serif,sans-serif] text-[14px] leading-snug antialiased",
        t.shell,
        t.scrollbar,
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(237,235,228,0.04),transparent_55%)]",
          themeMode === "light" &&
            "bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(17,17,16,0.03),transparent_55%)]",
        )}
      />

      <header
        className={cn(
          "relative z-10 flex h-12 min-h-12 shrink-0 items-center gap-2 px-3 backdrop-blur-md sm:gap-3 sm:px-4 lg:gap-4 lg:px-6",
          t.workspaceSurface,
        )}
      >
        <Link
          href="/studio"
          className="flex shrink-0 items-center transition-opacity hover:opacity-90"
          aria-label="Studio home"
        >
          <Image
            src="/standexailogo.png"
            alt="Standex Digital"
            width={130}
            height={36}
            className={cn(
              "h-7 w-auto max-w-[96px] object-contain transition-all duration-300 sm:h-8 sm:max-w-[130px]",
              themeMode === "dark" ? "brightness-0 invert opacity-90" : "",
            )}
            priority
            unoptimized
          />
        </Link>

        <StudioSectionNav active={active} theme={t} themeMode={themeMode} className="min-w-0 flex-1 sm:flex-none" />

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-1.5">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => persistTheme(themeMode === "dark" ? "light" : "dark")}
            className={cn("h-8 w-8 shadow-none", t.borderSub, t.text)}
            title={themeMode === "dark" ? "Light background" : "Dark background"}
          >
            {themeMode === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <div className="relative z-[1] flex min-h-0 min-w-0 flex-1">
        <div className={cn("relative min-h-0 min-w-0 flex-1", t.workspaceSurface)}>
          <div className="flex h-full min-h-0 flex-col">{children({ theme: t, themeMode })}</div>
        </div>
      </div>
    </div>
  );
}
