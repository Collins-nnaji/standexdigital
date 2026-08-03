"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ConsoleTheme, ConsoleThemeMode } from "@/components/console/console-theme";
import { getStudioSection, type StudioSectionId } from "@/components/studio/studio-sections";

type StudioComingSoonProps = {
  section: StudioSectionId;
  theme: ConsoleTheme;
  themeMode: ConsoleThemeMode;
  /** What this section will do, shown as a short checklist. */
  planned: string[];
};

/** Placeholder surface for Studio sections that are still being built. */
export function StudioComingSoon({ section, theme, themeMode, planned }: StudioComingSoonProps) {
  const { label, description, icon: Icon } = getStudioSection(section);

  return (
    <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto p-6">
      <div className="w-full max-w-lg text-center">
        <div
          className={cn(
            "mx-auto flex h-12 w-12 items-center justify-center rounded-xl",
            themeMode === "dark" ? "bg-white/[0.07]" : "bg-black/[0.05]",
          )}
        >
          <Icon className={cn("h-6 w-6", theme.text)} />
        </div>

        <h1 className={cn("mt-4 text-xl font-bold tracking-tight", theme.text)}>{label}</h1>
        <p className={cn("mt-2 text-[13px] leading-relaxed", theme.muted)}>{description}</p>

        <div
          className={cn(
            "mt-6 rounded-xl border p-4 text-left",
            theme.borderSub,
            themeMode === "dark" ? "bg-white/[0.03]" : "bg-black/[0.02]",
          )}
        >
          <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>
            Planned
          </p>
          <ul className="mt-3 flex flex-col gap-2">
            {planned.map((item) => (
              <li key={item} className={cn("flex items-start gap-2 text-[13px]", theme.text)}>
                <span
                  aria-hidden
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    themeMode === "dark" ? "bg-white/40" : "bg-black/30",
                  )}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/studio/writing"
          className={cn(
            "mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors",
            theme.btnPrimary,
          )}
        >
          Go to Writing Lab
        </Link>
      </div>
    </div>
  );
}
