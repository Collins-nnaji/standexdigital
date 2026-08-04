"use client";

import { ConsoleStudio } from "@/components/console/ConsoleStudio";
import { StudioAccountGate } from "@/components/studio/StudioAccountGate";
import { StudioShell } from "@/components/studio/StudioShell";

/** Writing Lab — drafting, rewriting and speech tools. Its own tab in the Studio hub. */
export function StudioWritingLab() {
  return (
    <StudioShell active="writing-lab">
      {({ theme, themeMode }) => (
        <StudioAccountGate theme={theme} isDark={themeMode === "dark"} toolName="Writing Lab">
          {({ firstName, onSignOut }) => (
            <ConsoleStudio themeMode={themeMode} firstName={firstName} onSignOut={onSignOut} />
          )}
        </StudioAccountGate>
      )}
    </StudioShell>
  );
}
