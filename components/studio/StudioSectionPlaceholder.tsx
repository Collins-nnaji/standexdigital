"use client";

import { StudioShell } from "@/components/studio/StudioShell";
import { StudioComingSoon } from "@/components/studio/StudioComingSoon";
import type { StudioSectionId } from "@/components/studio/studio-sections";

type StudioSectionPlaceholderProps = {
  section: StudioSectionId;
  planned: string[];
};

/** Mounts a not-yet-built section inside the Studio shell so nav stays available. */
export function StudioSectionPlaceholder({ section, planned }: StudioSectionPlaceholderProps) {
  return (
    <StudioShell active={section}>
      {({ theme, themeMode }) => (
        <StudioComingSoon section={section} theme={theme} themeMode={themeMode} planned={planned} />
      )}
    </StudioShell>
  );
}
