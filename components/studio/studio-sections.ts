import type { LucideIcon } from "lucide-react";
import { Code2, Database, PenLine, Megaphone, FolderOpen } from "lucide-react";

export type StudioSectionId = "writing-lab" | "code" | "data" | "marketing" | "files";

export type StudioSection = {
  id: StudioSectionId;
  href: string;
  /** Compact label for the section rail on small screens */
  shortLabel: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** Sections still being built render a placeholder instead of a tool surface */
  available: boolean;
};

export const STUDIO_SECTIONS: StudioSection[] = [
  {
    id: "marketing",
    href: "/studio/marketing",
    shortLabel: "Marketing",
    label: "Marketing",
    description: "Analyse campaign data, uncover opportunities, review ad creative and produce client-ready reports.",
    icon: Megaphone,
    available: true,
  },
  {
    id: "writing-lab",
    href: "/studio/writing",
    shortLabel: "Writing",
    label: "Writing Lab",
    description:
      "Draft, rewrite and analyse copy, generate from a prompt, and turn text into speech.",
    icon: PenLine,
    available: true,
  },
  {
    id: "code",
    href: "/studio/code",
    shortLabel: "Code",
    label: "Code Lab",
    description:
      "Write and run Python and SQL in the browser, with built-in review to learn from your code.",
    icon: Code2,
    available: true,
  },
  {
    id: "data",
    href: "/studio/data",
    shortLabel: "Data",
    label: "Data Hub",
    description:
      "Explore datasets, run queries and build charts alongside the rest of your workspace.",
    icon: Database,
    available: false,
  },
  {
    id: "files",
    href: "/studio/files",
    shortLabel: "Files",
    label: "Files",
    description: "Save documents, reports, campaign exports and creative assets in private Neon storage.",
    icon: FolderOpen,
    available: true,
  },
];

export function getStudioSection(id: StudioSectionId): StudioSection {
  const section = STUDIO_SECTIONS.find((s) => s.id === id);
  if (!section) throw new Error(`Unknown studio section: ${id}`);
  return section;
}
