"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, BarChart3, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";

type TopicProgress = {
  language: "python" | "sql";
  topic: string;
  lessonsCount: number;
  practiceOpen: number;
  practicePassed: number;
  practiceNeedsReview: number;
  errorCount: number;
  lastLevel: "beginner" | "intermediate" | "advanced";
};

type ErrorEntry = {
  id: string;
  language: "python" | "sql";
  topic: string | null;
  errorText: string;
  explanation: string;
  createdAt: string;
};

type CodeLabProgressProps = {
  theme: ConsoleTheme;
  isDark: boolean;
};

export function CodeLabProgress({ theme, isDark }: CodeLabProgressProps) {
  const [topics, setTopics] = useState<TopicProgress[] | null>(null);
  const [totals, setTotals] = useState<{ lessons: number; practicePassed: number; practiceNeedsReview: number; errors: number } | null>(null);
  const [errors, setErrors] = useState<ErrorEntry[] | null>(null);

  const surface = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  useEffect(() => {
    fetch("/api/studio/codelab/progress")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.topics ?? []);
        setTotals(data.totals ?? null);
      })
      .catch(() => setTopics([]));

    fetch("/api/studio/codelab/errors")
      .then((res) => res.json())
      .then((data) => setErrors(data.errors ?? []))
      .catch(() => setErrors([]));
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <BarChart3 className={cn("h-4 w-4", theme.muted)} />
        <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>Progress</p>
      </div>

      {totals && (
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { label: "Lessons studied", value: totals.lessons },
            { label: "Practice passed", value: totals.practicePassed },
            { label: "Needs review", value: totals.practiceNeedsReview },
            { label: "Errors logged", value: totals.errors },
          ].map((stat) => (
            <div key={stat.label} className={cn("rounded-xl border p-3", theme.borderSub, surface)}>
              <p className={cn("text-xl font-black tabular-nums", theme.text)}>{stat.value}</p>
              <p className={cn("mt-0.5 text-[10.5px] leading-tight", theme.muted)}>{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <p className={cn("mt-5 text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>By topic</p>
      {topics === null && (
        <div className={cn("mt-2 flex items-center gap-2 text-[12px]", theme.muted)}>
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading…
        </div>
      )}
      {topics && topics.length === 0 && (
        <p className={cn("mt-2 text-[12.5px]", theme.muted)}>Nothing tracked yet — study a lesson or try a practice scenario.</p>
      )}
      <div className="mt-2 flex flex-col gap-2">
        {topics?.map((t, i) => {
          const totalPractice = t.practiceOpen + t.practicePassed + t.practiceNeedsReview;
          const masteryPct = totalPractice > 0 ? Math.round((t.practicePassed / totalPractice) * 100) : t.lessonsCount > 0 ? 20 : 0;
          return (
            <div key={`${t.language}-${t.topic}-${i}`} className={cn("rounded-xl border p-3", theme.borderSub, surface)}>
              <div className="flex items-center gap-2">
                <p className={cn("text-[12.5px] font-bold", theme.text)}>{t.topic}</p>
                <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide", theme.muted)}>
                  {t.language} · {t.lastLevel}
                </span>
                {t.errorCount > 0 && (
                  <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-semibold text-amber-500">
                    <AlertTriangle className="h-3 w-3" /> {t.errorCount}
                  </span>
                )}
              </div>
              <div className={cn("mt-2 h-1.5 w-full overflow-hidden rounded-full", isDark ? "bg-white/[0.08]" : "bg-black/[0.06]")}>
                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${masteryPct}%` }} />
              </div>
              <p className={cn("mt-1.5 text-[11px]", theme.muted)}>
                {t.lessonsCount} lesson{t.lessonsCount === 1 ? "" : "s"} · {t.practicePassed} passed · {t.practiceNeedsReview} needs review
              </p>
            </div>
          );
        })}
      </div>

      <p className={cn("mt-5 text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>Error log</p>
      {errors && errors.length === 0 && (
        <p className={cn("mt-2 text-[12.5px]", theme.muted)}>No errors logged yet — they&apos;ll appear here when a run fails and you explain it.</p>
      )}
      <div className="mt-2 flex flex-col gap-2">
        {errors?.map((e) => (
          <details key={e.id} className={cn("rounded-xl border p-3", theme.borderSub, surface)}>
            <summary className={cn("cursor-pointer text-[12px] font-semibold", theme.text)}>
              {e.topic ? `${e.topic} · ` : ""}
              {e.errorText.split("\n")[0].slice(0, 90)}
            </summary>
            {e.explanation && (
              <p className={cn("mt-2 text-[12px] leading-relaxed", theme.muted)}>{e.explanation}</p>
            )}
          </details>
        ))}
      </div>
    </div>
  );
}
