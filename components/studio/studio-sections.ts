import type { LucideIcon } from "lucide-react";
import { Database, PenLine, Megaphone } from "lucide-react";

export type StudioSectionId = "writing-lab" | "marketing" | "data";

export type StudioSubItem = {
  id: string;
  label: string;
  href: string;
};

export type StudioSection = {
  id: StudioSectionId;
  href: string;
  shortLabel: string;
  label: string;
  description: string;
  icon: LucideIcon;
  available: boolean;
  items?: StudioSubItem[];
};

export const STUDIO_SECTIONS: StudioSection[] = [
  {
    id: "writing-lab",
    href: "/studio/writing",
    shortLabel: "Writing",
    label: "Writing Lab",
    description: "Draft, rewrite and polish copy, then send it into Marketing or Data Hub.",
    icon: PenLine,
    available: true,
  },
  {
    id: "marketing",
    href: "/studio/marketing",
    shortLabel: "Marketing",
    label: "Marketing",
    description: "Brainstorm campaigns, fill Google Ads from brand assets, and read performance from uploads.",
    icon: Megaphone,
    available: true,
    items: [
      { id: "campaigns", label: "Campaigns", href: "/studio/marketing" },
      { id: "ads", label: "Google Ads", href: "/studio/marketing?view=ads" },
      { id: "performance", label: "Performance", href: "/studio/marketing?view=performance" },
    ],
  },
  {
    id: "data",
    href: "/studio/data",
    shortLabel: "Data",
    label: "Data Hub",
    description: "Documents, campaign exports, reports and brand assets in one place.",
    icon: Database,
    available: true,
    items: [
      { id: "documents", label: "Documents", href: "/studio/data?view=documents" },
      { id: "campaigns", label: "Campaigns", href: "/studio/data?view=campaigns" },
      { id: "reports", label: "Reports", href: "/studio/data?view=reports" },
      { id: "creatives", label: "Creatives", href: "/studio/data?view=creatives" },
      { id: "workspaces", label: "Brand files", href: "/studio/data?view=workspaces" },
    ],
  },
];

export function getStudioSection(id: StudioSectionId): StudioSection {
  const section = STUDIO_SECTIONS.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown studio section: ${id}`);
  return section;
}

export function studioItemIsActive(href: string, pathname: string, view: string | null): boolean {
  const [path, query] = href.split("?");
  if (pathname !== path) return false;
  const wanted = new URLSearchParams(query ?? "").get("view");
  if (!wanted) return !view;
  return view === wanted;
}
