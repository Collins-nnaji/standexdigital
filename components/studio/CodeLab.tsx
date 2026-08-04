"use client";

import dynamic from "next/dynamic";
import { useCallback, useMemo, useRef, useState } from "react";
import { python } from "@codemirror/lang-python";
import { sql } from "@codemirror/lang-sql";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import {
  AlertTriangle,
  BarChart3,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Code2,
  Database,
  Dumbbell,
  Loader2,
  Menu,
  MessageCircleQuestion,
  Play,
  RotateCcw,
  Sparkles,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme, ConsoleThemeMode } from "@/components/console/console-theme";
import { CodeLabAccountBadge, CodeLabAccountGate } from "@/components/studio/CodeLabAccountGate";
import { CodeLabLibrary } from "@/components/studio/CodeLabLibrary";
import { CodeLabLesson, type Lesson } from "@/components/studio/CodeLabLesson";
import { CodeLabPlans, type LessonPlan } from "@/components/studio/CodeLabPlans";
import { CodeLabPractice } from "@/components/studio/CodeLabPractice";
import { CodeLabProgress } from "@/components/studio/CodeLabProgress";
import { CodeLabReview } from "@/components/studio/CodeLabReview";
import type { LearningLevel } from "@/lib/code-lab/modules";
import {
  resetSqlDatabase,
  runPython,
  runSql,
  STARTER_CODE,
  type CodeLanguage,
  type RunResult,
} from "@/lib/code-lab/runtimes";

// CodeMirror touches the DOM on import, so keep it out of the server bundle.
const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-[13px] text-zinc-500">
      Loading editor…
    </div>
  ),
});

type CodeLabTab = "editor" | "lesson" | "plans" | "practice" | "review" | "progress";

type CodeLabProps = {
  theme: ConsoleTheme;
  themeMode: ConsoleThemeMode;
};

const LANGUAGES: { id: CodeLanguage; label: string }[] = [
  { id: "python", label: "Python" },
  { id: "sql", label: "SQL" },
];

const TABS: { id: CodeLabTab; label: string; icon: typeof Code2 }[] = [
  { id: "editor", label: "Editor", icon: Code2 },
  { id: "lesson", label: "Lesson", icon: BookOpen },
  { id: "plans", label: "Plans", icon: BookMarked },
  { id: "practice", label: "Practice", icon: Dumbbell },
  { id: "review", label: "Review", icon: Sparkles },
  { id: "progress", label: "Progress", icon: BarChart3 },
];

export function CodeLab({ theme, themeMode }: CodeLabProps) {
  return (
    <CodeLabAccountGate theme={theme} isDark={themeMode === "dark"}>
      {({ firstName, onSignOut }) => (
        <CodeLabWorkspace theme={theme} themeMode={themeMode} firstName={firstName} onSignOut={onSignOut} />
      )}
    </CodeLabAccountGate>
  );
}

function CodeLabWorkspace({
  theme,
  themeMode,
  firstName,
  onSignOut,
}: CodeLabProps & { firstName: string; onSignOut: () => void }) {
  const isDark = themeMode === "dark";

  const [language, setLanguage] = useState<CodeLanguage>("python");
  const [code, setCode] = useState<Record<CodeLanguage, string>>({ ...STARTER_CODE });
  const [tab, setTab] = useState<CodeLabTab>("editor");
  const [libraryOpen, setLibraryOpen] = useState(false);

  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [booting, setBooting] = useState(false);

  const [level, setLevel] = useState<LearningLevel>("beginner");
  const [request, setRequest] = useState("");
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [loadingModuleId, setLoadingModuleId] = useState<string | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [lessonError, setLessonError] = useState<string | null>(null);
  const [lessonSaved, setLessonSaved] = useState(false);

  const [explaining, setExplaining] = useState(false);
  const [errorExplanation, setErrorExplanation] = useState<string | null>(null);

  // Python's first run downloads the interpreter; only warn about it once.
  const pythonBooted = useRef(false);

  const current = code[language];
  const extensions = useMemo(() => (language === "python" ? [python()] : [sql()]), [language]);

  const setCurrent = useCallback(
    (value: string) => setCode((prev) => ({ ...prev, [language]: value })),
    [language],
  );

  const handleRun = useCallback(async () => {
    setRunning(true);
    setResult(null);
    setErrorExplanation(null);
    if (language === "python" && !pythonBooted.current) setBooting(true);

    try {
      const res = language === "python" ? await runPython(current) : await runSql(current);
      if (language === "python") pythonBooted.current = true;
      setResult(res);
    } catch (err) {
      setResult({
        ok: false,
        output: "",
        error: err instanceof Error ? err.message : "Something went wrong.",
        durationMs: 0,
      });
    } finally {
      setBooting(false);
      setRunning(false);
    }
  }, [current, language]);

  const handleExplainError = useCallback(async () => {
    if (!result?.error) return;
    setExplaining(true);
    try {
      const res = await fetch("/api/studio/codelab/errors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          level,
          topic: lesson?.title ?? null,
          code: current,
          errorText: result.error,
        }),
      });
      const data = await res.json();
      if (res.ok) setErrorExplanation(data.explanation || data.warning || "No explanation available.");
    } finally {
      setExplaining(false);
    }
  }, [current, language, level, lesson, result]);

  const handleSelectModule = useCallback(
    async (moduleId: string, title: string, overrides?: { language: CodeLanguage; level: LearningLevel }) => {
      const effLanguage = overrides?.language ?? language;
      const effLevel = overrides?.level ?? level;
      if (overrides) {
        setLanguage(overrides.language);
        setLevel(overrides.level);
      }

      setLoadingModuleId(moduleId);
      setActiveModuleId(moduleId);
      setLesson(null);
      setLessonError(null);
      setLessonSaved(false);
      setTab("lesson");
      setLibraryOpen(false);

      try {
        const res = await fetch("/api/studio/lesson", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language: effLanguage, topic: title, level: effLevel, request }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "The lesson could not be generated.");
        setLesson(data as Lesson);

        fetch("/api/studio/codelab/lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language: effLanguage, level: effLevel, moduleId, topic: title, ...data }),
        })
          .then((r) => r.ok && setLessonSaved(true))
          .catch(() => undefined);
      } catch (err) {
        setLessonError(err instanceof Error ? err.message : "The lesson could not be generated.");
      } finally {
        setLoadingModuleId(null);
      }
    },
    [language, level, request],
  );

  const handleUseExample = useCallback(
    (example: string) => {
      setCurrent(example);
      setResult(null);
      setTab("editor");
    },
    [setCurrent],
  );

  const handleReset = useCallback(() => {
    setCurrent(STARTER_CODE[language]);
    setResult(null);
    if (language === "sql") resetSqlDatabase();
  }, [language, setCurrent]);

  const surface = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  const library = (
    <CodeLabLibrary
      language={language}
      theme={theme}
      isDark={isDark}
      level={level}
      onLevelChange={setLevel}
      request={request}
      onRequestChange={setRequest}
      activeModuleId={activeModuleId}
      loadingModuleId={loadingModuleId}
      onSelectModule={handleSelectModule}
    />
  );

  return (
    <div className="flex min-h-0 flex-1">
      {/* Library rail — inline on desktop, drawer on mobile */}
      <aside className={cn("hidden w-64 shrink-0 border-r lg:block", theme.borderSub)}>{library}</aside>

      {libraryOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close library"
            className="absolute inset-0 bg-black/50"
            onClick={() => setLibraryOpen(false)}
          />
          <div className={cn("absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r", theme.shell, theme.borderSub)}>
            {library}
          </div>
        </div>
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Toolbar */}
        <div
          className={cn(
            "flex shrink-0 flex-wrap items-center gap-2 border-b px-3 py-2 sm:px-4",
            theme.borderSub,
          )}
        >
          <button
            type="button"
            onClick={() => setLibraryOpen(true)}
            className={cn("rounded-lg p-1.5 lg:hidden", theme.muted, theme.navHover)}
            aria-label="Open library"
          >
            <Menu className="h-4 w-4" />
          </button>

          <div
            className={cn(
              "flex items-center gap-0.5 rounded-lg p-0.5",
              isDark ? "bg-black/25 ring-1 ring-white/[0.1]" : "bg-black/[0.04] ring-1 ring-black/[0.08]",
            )}
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                type="button"
                onClick={() => {
                  setLanguage(lang.id);
                  setResult(null);
                  setActiveModuleId(null);
                  setLesson(null);
                  setLessonError(null);
                }}
                className={cn(
                  "rounded-[7px] px-3 py-1.5 text-[13px] font-semibold transition-colors",
                  language === lang.id ? theme.navActive : cn(theme.muted, theme.navHover),
                )}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <div
            className={cn(
              "flex items-center gap-0.5 rounded-lg p-0.5",
              isDark ? "bg-black/25 ring-1 ring-white/[0.1]" : "bg-black/[0.04] ring-1 ring-black/[0.08]",
            )}
          >
            {TABS.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-[7px] px-2.5 py-1.5 text-[12.5px] font-semibold transition-colors",
                    tab === t.id ? theme.navActive : cn(theme.muted, theme.navHover),
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{t.label}</span>
                </button>
              );
            })}
          </div>

          {tab === "editor" && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleReset}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition-colors",
                  theme.muted,
                  theme.navHover,
                )}
                title="Reset to the starter example"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <button
                type="button"
                onClick={handleRun}
                disabled={running || !current.trim()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
              >
                {running ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
                Run
              </button>
            </div>
          )}

          <CodeLabAccountBadge firstName={firstName} onSignOut={onSignOut} theme={theme} />
        </div>

        {/* Panels */}
        {tab === "editor" && (
          <div className="grid min-h-0 flex-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
            <div className={cn("min-h-0 overflow-auto border-b lg:border-b-0 lg:border-r", theme.borderSub)}>
              <CodeMirror
                value={current}
                height="100%"
                className="h-full text-[13px]"
                theme={isDark ? githubDark : githubLight}
                extensions={extensions}
                onChange={setCurrent}
                basicSetup={{ lineNumbers: true, foldGutter: false, highlightActiveLine: true }}
              />
            </div>

            <div className="flex min-h-0 flex-col overflow-y-auto">
              {booting && (
                <div className={cn("flex items-center gap-2 px-4 py-3 text-[12px]", theme.muted)}>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Starting Python for the first time — this downloads the interpreter and takes a moment.
                </div>
              )}

              {!result && !booting && (
                <div className={cn("flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center", theme.muted)}>
                  {language === "sql" ? <Database className="h-6 w-6" /> : <Terminal className="h-6 w-6" />}
                  <p className="text-[13px]">
                    {language === "sql"
                      ? "Run a query against the sample employees and projects tables."
                      : "Press Run to execute your Python in the browser."}
                  </p>
                </div>
              )}

              {result && (
                <RunOutput
                  result={result}
                  theme={theme}
                  isDark={isDark}
                  surface={surface}
                  explaining={explaining}
                  explanation={errorExplanation}
                  onExplain={handleExplainError}
                />
              )}
            </div>
          </div>
        )}

        {tab === "lesson" && (
          <div className="flex min-h-0 flex-1 flex-col">
            <CodeLabLesson
              lesson={lesson}
              loading={Boolean(loadingModuleId)}
              error={lessonError}
              theme={theme}
              isDark={isDark}
              onUseExample={handleUseExample}
              saved={lessonSaved}
            />
          </div>
        )}

        {tab === "plans" && (
          <CodeLabPlans
            theme={theme}
            isDark={isDark}
            onStudyModule={(plan: LessonPlan, moduleId, title) =>
              handleSelectModule(moduleId, title, { language: plan.language, level: plan.level })
            }
          />
        )}

        {tab === "practice" && (
          <CodeLabPractice
            theme={theme}
            isDark={isDark}
            language={language}
            level={level}
            editorCode={current}
            onOpenInEditor={handleUseExample}
          />
        )}

        {tab === "review" && (
          <CodeLabReview language={language} theme={theme} isDark={isDark} editorCode={current} />
        )}

        {tab === "progress" && <CodeLabProgress theme={theme} isDark={isDark} />}
      </div>
    </div>
  );
}

function RunOutput({
  result,
  theme,
  isDark,
  surface,
  explaining,
  explanation,
  onExplain,
}: {
  result: RunResult;
  theme: ConsoleTheme;
  isDark: boolean;
  surface: string;
  explaining: boolean;
  explanation: string | null;
  onExplain: () => void;
}) {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        {result.ok ? (
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
        )}
        <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>Output</p>
        <span className={cn("ml-auto text-[11px] tabular-nums", theme.muted)}>
          {Math.round(result.durationMs)} ms
        </span>
      </div>

      {result.error && (
        <>
          <pre
            className={cn(
              "mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg border border-rose-500/30 bg-rose-500/[0.07] p-3 text-[12px] text-rose-500",
              theme.mono,
            )}
          >
            {result.error}
          </pre>

          {!explanation && (
            <button
              type="button"
              onClick={onExplain}
              disabled={explaining}
              className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-amber-500/15 px-2.5 py-1.5 text-[11.5px] font-bold text-amber-600 transition-colors hover:bg-amber-500/25 disabled:opacity-60 dark:text-amber-400"
            >
              {explaining ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MessageCircleQuestion className="h-3.5 w-3.5" />}
              Explain this error
            </button>
          )}

          {explanation && (
            <div className={cn("mt-2 rounded-lg border p-3 text-[12.5px] leading-relaxed", theme.borderSub, surface, theme.text)}>
              {explanation}
            </div>
          )}
        </>
      )}

      {result.output && (
        <pre
          className={cn(
            "mt-2 overflow-x-auto whitespace-pre-wrap rounded-lg border p-3 text-[12px]",
            theme.borderSub,
            surface,
            theme.text,
            theme.mono,
          )}
        >
          {result.output}
        </pre>
      )}

      {result.table && (
        <div className={cn("mt-3 overflow-x-auto rounded-lg border", theme.borderSub)}>
          <table className="w-full border-collapse text-left text-[12px]">
            <thead>
              <tr className={cn(isDark ? "bg-white/[0.05]" : "bg-black/[0.04]")}>
                {result.table.columns.map((col) => (
                  <th key={col} className={cn("whitespace-nowrap px-3 py-2 font-bold", theme.text)}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.table.rows.map((row, i) => (
                <tr key={i} className={cn("border-t", theme.borderSub)}>
                  {row.map((cell, j) => (
                    <td key={j} className={cn("whitespace-nowrap px-3 py-2 tabular-nums", theme.muted)}>
                      {cell === null ? "NULL" : String(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
