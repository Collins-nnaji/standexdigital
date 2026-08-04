"use client";

import { useEffect, useState } from "react";
import { BookMarked, Loader2, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";
import { CODE_LAB_MODULES, LEARNING_LEVELS, type LearningLevel } from "@/lib/code-lab/modules";
import type { CodeLanguage } from "@/lib/code-lab/runtimes";

export type LessonPlan = {
  id: string;
  title: string;
  description: string;
  language: CodeLanguage;
  level: LearningLevel;
  moduleIds: string[];
};

type CodeLabPlansProps = {
  theme: ConsoleTheme;
  isDark: boolean;
  onStudyModule: (plan: LessonPlan, moduleId: string, title: string) => void;
};

export function CodeLabPlans({ theme, isDark, onStudyModule }: CodeLabPlansProps) {
  const [plans, setPlans] = useState<LessonPlan[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [language, setLanguage] = useState<CodeLanguage>("python");
  const [level, setLevel] = useState<LearningLevel>("beginner");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const surface = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  const load = () => {
    fetch("/api/studio/codelab/lesson-plans")
      .then((res) => res.json())
      .then((data) => setPlans(data.plans ?? []))
      .catch(() => setPlans([]));
  };

  useEffect(load, []);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));
  };

  const handleCreate = async () => {
    if (!title.trim() || selectedModules.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/studio/codelab/lesson-plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, language, level, moduleIds: selectedModules }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not save the plan.");
      setTitle("");
      setSelectedModules([]);
      setCreating(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save the plan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setPlans((prev) => (prev ? prev.filter((p) => p.id !== id) : prev));
    await fetch(`/api/studio/codelab/lesson-plans/${id}`, { method: "DELETE" });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5">
      <div className="flex items-center gap-2">
        <BookMarked className={cn("h-4 w-4", theme.muted)} />
        <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>
          Your lesson plans
        </p>
        <button
          type="button"
          onClick={() => setCreating((v) => !v)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] font-bold text-white transition-colors hover:bg-emerald-600"
        >
          <Plus className="h-3.5 w-3.5" />
          New plan
        </button>
      </div>

      {creating && (
        <div className={cn("mt-3 rounded-xl border p-3.5", theme.borderSub, surface)}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Plan title, e.g. SQL fundamentals for the interview"
            className={cn(
              "w-full rounded-lg border px-3 py-2 text-[13px] outline-none transition-colors placeholder:opacity-60 focus:border-emerald-500/50",
              theme.borderSub,
              theme.input,
              theme.text,
            )}
          />

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className={cn("flex items-center gap-0.5 rounded-lg p-0.5", isDark ? "bg-black/25" : "bg-black/[0.04]")}>
              {(["python", "sql"] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setLanguage(lang);
                    setSelectedModules([]);
                  }}
                  className={cn(
                    "rounded-[7px] px-2.5 py-1 text-[12px] font-semibold transition-colors",
                    language === lang ? theme.navActive : cn(theme.muted, theme.navHover),
                  )}
                >
                  {lang === "python" ? "Python" : "SQL"}
                </button>
              ))}
            </div>

            <div className={cn("flex items-center gap-0.5 rounded-lg p-0.5", isDark ? "bg-black/25" : "bg-black/[0.04]")}>
              {LEARNING_LEVELS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLevel(l.id)}
                  className={cn(
                    "rounded-[7px] px-2.5 py-1 text-[12px] font-semibold transition-colors",
                    level === l.id ? theme.navActive : cn(theme.muted, theme.navHover),
                  )}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <p className={cn("mt-3 text-[11px] font-semibold uppercase tracking-wide", theme.muted)}>
            Topics ({selectedModules.length} selected)
          </p>
          <div className="mt-1.5 grid grid-cols-1 gap-1 sm:grid-cols-2">
            {CODE_LAB_MODULES[language].map((m) => (
              <label
                key={m.id}
                className={cn(
                  "flex cursor-pointer items-start gap-2 rounded-lg px-2 py-1.5 text-[12px]",
                  selectedModules.includes(m.id) ? (isDark ? "bg-white/[0.08]" : "bg-black/[0.06]") : theme.navHover,
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedModules.includes(m.id)}
                  onChange={() => toggleModule(m.id)}
                  className="mt-0.5"
                />
                <span className={theme.text}>{m.title}</span>
              </label>
            ))}
          </div>

          {error && <p className="mt-2 text-[12px] text-rose-500">{error}</p>}

          <button
            type="button"
            onClick={handleCreate}
            disabled={saving || !title.trim() || selectedModules.length === 0}
            className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
          >
            {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Save plan
          </button>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-3">
        {plans === null && (
          <div className={cn("flex items-center gap-2 text-[12px]", theme.muted)}>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading plans…
          </div>
        )}

        {plans && plans.length === 0 && !creating && (
          <p className={cn("text-[12.5px]", theme.muted)}>
            No lesson plans yet. Create one to sequence topics into a curriculum you can work
            through step by step.
          </p>
        )}

        {plans?.map((plan) => (
          <div key={plan.id} className={cn("rounded-xl border p-3.5", theme.borderSub, surface)}>
            <div className="flex items-center gap-2">
              <p className={cn("text-[13.5px] font-bold", theme.text)}>{plan.title}</p>
              <span className={cn("rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide", theme.muted)}>
                {plan.language} · {plan.level}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(plan.id)}
                className={cn("ml-auto rounded-lg p-1 transition-colors", theme.muted, theme.navHover)}
                title="Delete plan"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {plan.moduleIds.map((moduleId) => {
                const mod = CODE_LAB_MODULES[plan.language].find((m) => m.id === moduleId);
                if (!mod) return null;
                return (
                  <button
                    key={moduleId}
                    type="button"
                    onClick={() => onStudyModule(plan, moduleId, mod.title)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-[11.5px] font-semibold transition-colors",
                      isDark ? "bg-white/[0.06] hover:bg-white/[0.1]" : "bg-black/[0.05] hover:bg-black/[0.08]",
                      theme.text,
                    )}
                  >
                    {mod.title}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
