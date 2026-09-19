"use client";

import { ConsoleStudio } from "@/components/console/ConsoleStudio";
import { StudioShell } from "@/components/studio/StudioShell";

/** Writing Lab — drafting, rewriting and speech tools. */
export function StudioWritingLab() {
  return (
    <StudioShell>
      {({ themeMode }) => <ConsoleStudio themeMode={themeMode} />}
    </StudioShell>
  );
}
