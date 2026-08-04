"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, ClipboardPaste, Dumbbell, Loader2, PlayCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";
import type { LearningLevel } from "@/lib/code-lab/modules";
import type { CodeLanguage } from "@/lib/code-lab/runtimes";

type PracticeItem = {
  id: string;
  topic: string;
  prompt: string;
  starterCode: string;
  status: "open" | "passed" | "needs_review";
  lastAttempt?: { passed: boolean | null; feedback: string } | null;
};

const STATUS_STYLE: Record<PracticeItem["status"], string> = {
  open: "bg-sky-500/15 text-sky-500",
  passed: "bg-emerald-500/15 text-emerald-500",
  needs_review: "bg-amber-500/15 text-amber-600",
};

const STATUS_LABEL: Record<PracticeItem["status"], string> = {
  open: "Not attempted",
  passed: "Passed",
  needs_review: "Needs review",
};

type CodeLabPracticeProps = {
  theme: ConsoleTheme;
  isDark: boolean;
  language: CodeLanguage;
  level: LearningLevel;
  editorCode: string;
  onOpenInEditor: (code: string) => void;
};

export function CodeLabPractice({ theme, isDark, language, level, editorCode, onOpenInEditor }: CodeLabPracticeProps) {
  const [items, setItems] = useState<PracticeItem[] | null>(null);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [grading, setGrading] = useState(false);
  const [gradeError, setGradeError] = useState<string | null>(null);

  const surface = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  const load = () => {
    fetch(`/api/studio/codelab/practice?language=${language}`)
      .then((res) => res.json())
      .then((data) => setItems(data.items ?? []))
      .catch(() => setItems([]));
  };

  useEffect(load, [language]);

  const active = items?.find((i) => i.id === activeId) ?? null;

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setGenError(null);
    try {
      const res = await fetch("/api/studio/codelab/practice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, level, topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not generate a scenario.");
      setItems((prev) => [{ ...data.item, lastAttempt: null }, ...(prev ?? [])]);
      setActiveId(data.item.id);
      setTopic("");
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Could not generate a scenario.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async () => {
    if (!active || !editorCode.trim()) return;
    setGrading(true);
    setGradeError(null);
    try {
      const res = await fetch(`/api/studio/codelab/practice/${active.id}/attempts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: editorCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not grade this attempt.");
      setItems((prev) =>
        (prev ?? []).map((i) =>
          i.id === active.id
            ? { ...i, status: data.passed ? "passed" : "needs_review", lastAttempt: { passed: data.passed, feedback: data.feedback } }
            : i,
        ),
      );
    } catch (err) {
      setGradeError(err instanceof Error ? err.message : "Could not grade this attempt.");
    } finally {
      setGrading(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1">
      <div className={cn("hidden w-64 shrink-0 flex-col overflow-y-auto border-r p-2 md:flex", theme.borderSub)}>
        <div className="px-1.5 py-1.5">
          <div className="flex items-center gap-1.5">
            <Dumbbell className={cn("h-3.5 w-3.5", theme.muted)} />
            <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>Practice bank</p>
          </div>
          <div className="mt-2 flex gap-1.5">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Topic, e.g. dictionaries"
              onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
              className={cn(
                "min-w-0 flex-1 rounded-lg border px-2 py-1.5 text-[12px] outline-none placeholder:opacity-60 focus:border-emerald-500/50",
                theme.borderSub,
                theme.input,
                theme.text,
              )}
            />
          </div>
          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating || !topic.trim()}
            className="mt-1.5 inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-2.5 py-1.5 text-[11.5px] font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
          >
            {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
            New scenario
          </button>
          {genError && <p className="mt-1.5 text-[11px] text-rose-500">{genError}</p>}
        </div>

        <ul className="mt-1 flex flex-col gap-1">
          {items?.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "w-full rounded-lg px-2.5 py-2 text-left transition-colors",
                  activeId === item.id ? (isDark ? "bg-white/[0.08]" : "bg-black/[0.06]") : theme.navHover,
                )}
              >
                <p className={cn("text-[12px] font-semibold leading-snug", theme.text)}>{item.topic}</p>
                <span className={cn("mt-1 inline-block rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide", STATUS_STYLE[item.status])}>
                  {STATUS_LABEL[item.status]}
                </span>
              </button>
            </li>
          ))}
          {items && items.length === 0 && (
            <p className={cn("px-1.5 py-2 text-[11.5px]", theme.muted)}>
              Generate a scenario to start building a practice bank for this language.
            </p>
          )}
        </ul>
      </div>

      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5">
        {!active ? (
          <div className={cn("flex flex-1 flex-col items-center justify-center gap-2 text-center", theme.muted)}>
            <Dumbbell className="h-6 w-6" />
            <p className="max-w-xs text-[13px]">
              Generate a scenario, then write your solution in the Editor tab and submit it here
              for feedback.
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <h2 className={cn("text-lg font-bold tracking-tight", theme.text)}>{active.topic}</h2>
              <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide", STATUS_STYLE[active.status])}>
                {STATUS_LABEL[active.status]}
              </span>
            </div>
            <p className={cn("mt-2 text-[13px] leading-relaxed", theme.text)}>{active.prompt}</p>

            {active.starterCode && (
              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>Starter code</p>
                  <button
                    type="button"
                    onClick={() => onOpenInEditor(active.starterCode)}
                    className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white transition-colors hover:bg-emerald-600"
                  >
                    <PlayCircle className="h-3.5 w-3.5" />
                    Open in editor
                  </button>
                </div>
                <pre className={cn("mt-2 overflow-x-auto rounded-xl border p-3 text-[12px] leading-relaxed", theme.borderSub, surface, theme.text, theme.mono)}>
                  {active.starterCode}
                </pre>
              </div>
            )}

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={grading || !editorCode.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {grading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ClipboardPaste className="h-3.5 w-3.5" />}
                Submit editor code for grading
              </button>
            </div>
            {gradeError && <p className="mt-2 text-[12px] text-rose-500">{gradeError}</p>}

            {active.lastAttempt && (
              <div
                className={cn(
                  "mt-3 flex items-start gap-2 rounded-xl border p-3",
                  active.lastAttempt.passed ? "border-emerald-500/30 bg-emerald-500/[0.07]" : "border-amber-500/30 bg-amber-500/[0.07]",
                )}
              >
                {active.lastAttempt.passed ? (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                ) : (
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                )}
                <p className={cn("text-[12.5px] leading-relaxed", theme.text)}>{active.lastAttempt.feedback}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
