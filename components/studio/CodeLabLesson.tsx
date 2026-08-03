"use client";

import { BookOpen, Loader2, PlayCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";

export type Lesson = {
  title: string;
  explanation: string;
  keyPoints: string[];
  example: string;
  exampleNote: string;
  exercise: string;
};

type CodeLabLessonProps = {
  lesson: Lesson | null;
  loading: boolean;
  error: string | null;
  theme: ConsoleTheme;
  isDark: boolean;
  /** Loads the lesson's example into the editor. */
  onUseExample: (code: string) => void;
};

export function CodeLabLesson({
  lesson,
  loading,
  error,
  theme,
  isDark,
  onUseExample,
}: CodeLabLessonProps) {
  const surface = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  if (loading) {
    return (
      <div className={cn("flex flex-1 flex-col items-center justify-center gap-2 p-6", theme.muted)}>
        <Loader2 className="h-5 w-5 animate-spin" />
        <p className="text-[13px]">Building your lesson…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <p className="text-center text-[13px] text-rose-500">{error}</p>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className={cn("flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center", theme.muted)}>
        <BookOpen className="h-6 w-6" />
        <p className="max-w-xs text-[13px]">
          Pick a topic from the library to get an explanation, a runnable example and an exercise.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 sm:p-5">
      <h2 className={cn("text-lg font-bold tracking-tight", theme.text)}>{lesson.title}</h2>

      {lesson.explanation && (
        <div className="mt-3 flex flex-col gap-3">
          {lesson.explanation.split("\n\n").map((para, i) => (
            <p key={i} className={cn("text-[13px] leading-relaxed", theme.muted)}>
              {para}
            </p>
          ))}
        </div>
      )}

      {lesson.keyPoints.length > 0 && (
        <div className={cn("mt-4 rounded-xl border p-3.5", theme.borderSub, surface)}>
          <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>
            Key points
          </p>
          <ul className="mt-2.5 flex flex-col gap-1.5">
            {lesson.keyPoints.map((point, i) => (
              <li key={i} className={cn("flex items-start gap-2 text-[12.5px] leading-relaxed", theme.text)}>
                <span
                  aria-hidden
                  className={cn(
                    "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                    isDark ? "bg-white/40" : "bg-black/30",
                  )}
                />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {lesson.example && (
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>
              Example
            </p>
            <button
              type="button"
              onClick={() => onUseExample(lesson.example)}
              className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white transition-colors hover:bg-emerald-600"
            >
              <PlayCircle className="h-3.5 w-3.5" />
              Open in editor
            </button>
          </div>
          <pre
            className={cn(
              "mt-2 overflow-x-auto rounded-xl border p-3 text-[12px] leading-relaxed",
              theme.borderSub,
              surface,
              theme.text,
              theme.mono,
            )}
          >
            {lesson.example}
          </pre>
          {lesson.exampleNote && (
            <p className={cn("mt-2 text-[12px] leading-relaxed", theme.muted)}>{lesson.exampleNote}</p>
          )}
        </div>
      )}

      {lesson.exercise && (
        <div className={cn("mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.07] p-3.5")}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
            Try it
          </p>
          <p className={cn("mt-2 text-[12.5px] leading-relaxed", theme.text)}>{lesson.exercise}</p>
        </div>
      )}
    </div>
  );
}
