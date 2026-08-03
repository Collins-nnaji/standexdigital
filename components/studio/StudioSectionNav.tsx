"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ConsoleTheme, ConsoleThemeMode } from "@/components/console/console-theme";
import { STUDIO_SECTIONS, type StudioSectionId } from "@/components/studio/studio-sections";

type StudioSectionNavProps = {
  active: StudioSectionId;
  theme: ConsoleTheme;
  themeMode: ConsoleThemeMode;
  className?: string;
};

/** Horizontal section switcher for the Studio hub — one pill per section. */
export function StudioSectionNav({ active, theme, themeMode, className }: StudioSectionNavProps) {
  return (
    <div
      role="navigation"
      aria-label="Studio sections"
      className={cn(
        "flex min-w-0 max-w-full items-center gap-0.5 overflow-x-auto rounded-lg p-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:overflow-visible [&::-webkit-scrollbar]:hidden",
        themeMode === "dark"
          ? "bg-black/25 ring-1 ring-white/[0.1]"
          : "bg-black/[0.04] ring-1 ring-black/[0.08]",
        className,
      )}
    >
      {STUDIO_SECTIONS.map((section) => {
        const isActive = section.id === active;
        const Icon = section.icon;
        return (
          <Link
            key={section.id}
            href={section.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "flex shrink-0 items-center gap-1.5 rounded-[7px] px-2.5 py-1.5 text-[13px] font-semibold tracking-tight transition-colors sm:px-3",
              isActive ? theme.navActive : cn(theme.muted, theme.navHover),
            )}
          >
            <Icon className="h-3.5 w-3.5 shrink-0" />
            <span className="sm:hidden">{section.shortLabel}</span>
            <span className="hidden sm:inline">{section.label}</span>
            {!section.available && (
              <span
                className={cn(
                  "hidden shrink-0 rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider lg:inline",
                  themeMode === "dark" ? "bg-white/10 text-white/60" : "bg-black/[0.06] text-black/50",
                )}
              >
                Soon
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}
