"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme, ConsoleThemeMode } from "@/components/console/console-theme";
import {
  STUDIO_SECTIONS,
  studioItemIsActive,
  type StudioSectionId,
} from "@/components/studio/studio-sections";

type StudioNavProps = {
  active: StudioSectionId;
  theme: ConsoleTheme;
  themeMode: ConsoleThemeMode;
  onNavigate?: () => void;
};

/** Single Studio sidebar: sections with optional dropdown sub-nav. */
export function StudioNav({ active, theme, themeMode, onNavigate }: StudioNavProps) {
  const pathname = usePathname();
  const view = useSearchParams().get("view");
  const [openId, setOpenId] = useState<StudioSectionId | null>(active);
  const isDark = themeMode === "dark";

  useEffect(() => {
    setOpenId(active);
  }, [active]);

  return (
    <nav aria-label="Studio" className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <div className="flex min-h-0 flex-1 flex-col gap-1 px-2 py-3">
      {STUDIO_SECTIONS.map((section) => {
        const Icon = section.icon;
        const isSectionActive = section.id === active;
        const hasItems = Boolean(section.items?.length);
        const expanded = openId === section.id;
        const showItems = hasItems && expanded;

        return (
          <div key={section.id}>
            <div className="flex items-center gap-0.5">
              <Link
                href={section.href}
                onClick={onNavigate}
                aria-current={isSectionActive && !view ? "page" : undefined}
                className={cn(
                  "flex min-w-0 flex-1 items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] font-semibold tracking-tight transition-colors",
                  isSectionActive ? theme.navActive : cn(theme.muted, theme.navHover),
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{section.label}</span>
                {!section.available && (
                  <span
                    className={cn(
                      "ml-auto rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                      isDark ? "bg-white/10 text-white/55" : "bg-black/[0.06] text-black/45",
                    )}
                  >
                    Soon
                  </span>
                )}
              </Link>
              {hasItems && (
                <button
                  type="button"
                  aria-expanded={expanded}
                  aria-label={expanded ? `Collapse ${section.label}` : `Expand ${section.label}`}
                  onClick={() => setOpenId(expanded ? null : section.id)}
                  className={cn("rounded-md p-1.5 transition-colors", theme.muted, theme.navHover)}
                >
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-180")} />
                </button>
              )}
            </div>

            {showItems && (
              <div className={cn("mb-1 ml-3.5 mt-0.5 flex flex-col border-l pl-2", theme.borderSub)}>
                {section.items!.map((item) => {
                  const itemActive = studioItemIsActive(item.href, pathname, view);
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={itemActive ? "page" : undefined}
                      className={cn(
                        "rounded-md px-2.5 py-1.5 text-[12.5px] font-medium transition-colors",
                        itemActive ? theme.navActive : cn(theme.muted, theme.navHover),
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      </div>
      <p className={cn("mt-auto border-t px-3 py-3 text-[11px] leading-relaxed", theme.borderSub, theme.muted2)}>
        Writing Lab drafts copy. Marketing turns it into campaigns and ads. Data Hub keeps the files they share.
      </p>
    </nav>
  );
}
