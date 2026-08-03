"use client";

import { CodeLab } from "@/components/studio/CodeLab";
import { StudioShell } from "@/components/studio/StudioShell";

/** Code Lab — write and run Python and SQL in the browser, with built-in review. */
export function StudioCodeLab() {
  return (
    <StudioShell active="code">
      {({ theme, themeMode }) => <CodeLab theme={theme} themeMode={themeMode} />}
    </StudioShell>
  );
}
