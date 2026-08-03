"use client";

import { BookOpen, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";
import { CODE_LAB_MODULES, LEARNING_LEVELS, type LearningLevel } from "@/lib/code-lab/modules";
import type { CodeLanguage } from "@/lib/code-lab/runtimes";

type CodeLabLibraryProps = {
  language: CodeLanguage;
  theme: ConsoleTheme;
  isDark: boolean;
  level: LearningLevel;
  onLevelChange: (level: LearningLevel) => void;
  request: string;
  onRequestChange: (value: string) => void;
  activeModuleId: string | null;
  loadingModuleId: string | null;
  onSelectModule: (moduleId: string, title: string) => void;
};

/** Left rail of the Code Lab: learning level, a steer box, and the module list. */
export function CodeLabLibrary({
  language,
  theme,
  isDark,
  level,
  onLevelChange,
  request,
  onRequestChange,
  activeModuleId,
  loadingModuleId,
  onSelectModule,
}: CodeLabLibraryProps) {
  const modules = CODE_LAB_MODULES[language];

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className={cn("shrink-0 border-b px-3 py-3", theme.borderSub)}>
        <div className="flex items-center gap-1.5">
          <BookOpen className={cn("h-3.5 w-3.5", theme.muted)} />
          <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>
            Library
          </p>
        </div>

        <div
          className={cn(
            "mt-2.5 flex items-center gap-0.5 rounded-lg p-0.5",
            isDark ? "bg-black/25 ring-1 ring-white/[0.1]" : "bg-black/[0.04] ring-1 ring-black/[0.08]",
          )}
        >
          {LEARNING_LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => onLevelChange(l.id)}
              className={cn(
                "flex-1 rounded-[7px] px-1.5 py-1 text-[11px] font-semibold transition-colors",
                level === l.id ? theme.navActive : cn(theme.muted, theme.navHover),
              )}
            >
              {l.label}
            </button>
          ))}
        </div>

        <textarea
          value={request}
          onChange={(e) => onRequestChange(e.target.value)}
          rows={2}
          maxLength={500}
          placeholder="Anything specific? e.g. use real examples"
          className={cn(
            "mt-2 w-full resize-none rounded-lg border px-2.5 py-2 text-[12px] outline-none transition-colors placeholder:opacity-60 focus:border-emerald-500/50",
            theme.borderSub,
            theme.input,
            theme.text,
          )}
        />
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <ul className="flex flex-col gap-1">
          {modules.map((module) => {
            const isActive = module.id === activeModuleId;
            const isLoading = module.id === loadingModuleId;
            return (
              <li key={module.id}>
                <button
                  type="button"
                  disabled={Boolean(loadingModuleId)}
                  onClick={() => onSelectModule(module.id, module.title)}
                  className={cn(
                    "w-full rounded-lg px-2.5 py-2 text-left transition-colors disabled:opacity-60",
                    isActive
                      ? isDark
                        ? "bg-white/[0.08]"
                        : "bg-black/[0.06]"
                      : cn(theme.navHover),
                  )}
                >
                  <div className="flex items-center gap-1.5">
                    <span className={cn("text-[12.5px] font-semibold leading-snug", theme.text)}>
                      {module.title}
                    </span>
                    {isLoading && (
                      <Loader2 className={cn("h-3 w-3 shrink-0 animate-spin", theme.muted)} />
                    )}
                  </div>
                  <p className={cn("mt-0.5 text-[11px] leading-snug", theme.muted)}>
                    {module.blurb}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
