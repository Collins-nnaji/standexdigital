"use client";

import { ConsoleStudio } from "@/components/console/ConsoleStudio";
import { StudioShell } from "@/components/studio/StudioShell";

/** Writing Lab — drafting, rewriting and speech tools. Its own tab in the Studio hub. */
export function StudioWritingLab() {
  return (
    <StudioShell active="writing-lab">
      {({ themeMode }) => <ConsoleStudio themeMode={themeMode} />}
    </StudioShell>
  );
}
