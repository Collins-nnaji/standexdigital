"use client";

import Link from "next/link";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONSOLE_THEMES,
  THEME_STORAGE_KEY,
  type ConsoleTheme,
  type ConsoleThemeMode,
} from "@/components/console/console-theme";
import { StudioWordmark } from "@/components/studio/StudioWordmark";
import { Button } from "@/components/ui/button";

type StudioShellProps = {
  children: (ctx: { theme: ConsoleTheme; themeMode: ConsoleThemeMode }) => ReactNode;
};

/**
 * Studio chrome for Writing Lab: wordmark, theme, and the workspace.
 */
export function StudioShell({ children }: StudioShellProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-[100dvh] items-center justify-center bg-white text-sm text-zinc-500">
          Loading Studio…
        </div>
      }
    >
      <StudioShellInner>{children}</StudioShellInner>
    </Suspense>
  );
}

let studioGuestReady = false;

function StudioShellInner({ children }: StudioShellProps) {
  const [themeMode, setThemeMode] = useState<ConsoleThemeMode>("light");
  const [ready, setReady] = useState(studioGuestReady);
  const t = CONSOLE_THEMES[themeMode];
  const isDark = themeMode === "dark";

  useEffect(() => {
    const s = localStorage.getItem(THEME_STORAGE_KEY) as ConsoleThemeMode | null;
    if (s === "light" || s === "dark") setThemeMode(s);
  }, []);

  useEffect(() => {
    if (studioGuestReady) {
      setReady(true);
      return;
    }
    let cancelled = false;
    const timer = window.setTimeout(() => {
      if (cancelled) return;
      studioGuestReady = true;
      setReady(true);
    }, 2000);
    (async () => {
      try {
        const me = await fetch("/api/studio/account").then((r) => r.json());
        if (!cancelled && !me?.signedIn) {
          await fetch("/api/studio/account", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ guest: true }),
          });
        }
      } catch {
        // Tools still work locally until real auth is added.
      }
      if (!cancelled) {
        studioGuestReady = true;
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  const persistTheme = (m: ConsoleThemeMode) => {
    setThemeMode(m);
    localStorage.setItem(THEME_STORAGE_KEY, m);
  };

  return (
    <div
      data-studio
      className={cn(
        "relative flex h-[100dvh] flex-col overflow-hidden [font-family:var(--font-inter),ui-sans-serif,sans-serif] text-[14px] leading-snug antialiased",
        t.shell,
        t.scrollbar,
      )}
    >
      <header
        className={cn(
          "relative z-20 flex h-12 min-h-12 shrink-0 items-center gap-2 border-b px-3 sm:px-4",
          t.borderSub,
          t.workspaceSurface,
        )}
      >
        <Link href="/studio/writing" className="flex min-w-0 shrink-0 items-center" aria-label="Standex Studio">
          <StudioWordmark compact className={t.text} />
        </Link>

        <div className="ml-auto flex shrink-0 items-center">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => persistTheme(isDark ? "light" : "dark")}
            className={cn("h-8 w-8 shadow-none", t.borderSub, t.text)}
            title={isDark ? "Light background" : "Dark background"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </header>

      <div className={cn("relative z-[1] flex min-h-0 min-w-0 flex-1", t.workspaceSurface)}>
        <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
          {ready ? children({ theme: t, themeMode }) : (
            <div className={cn("flex flex-1 items-center justify-center text-sm", t.muted)}>Opening Studio…</div>
          )}
        </div>
      </div>
    </div>
  );
}
