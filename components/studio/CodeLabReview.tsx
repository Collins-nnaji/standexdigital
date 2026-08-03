"use client";

import { useState } from "react";
import { ClipboardPaste, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";
import type { CodeLanguage } from "@/lib/code-lab/runtimes";

export type ReviewFinding = {
  severity: "high" | "medium" | "low" | "praise";
  title: string;
  detail: string;
  line?: number | null;
};

export type ReviewResult = { summary: string; findings: ReviewFinding[] };

const SEVERITY_STYLES: Record<ReviewFinding["severity"], string> = {
  high: "bg-rose-500/15 text-rose-500",
  medium: "bg-amber-500/15 text-amber-600",
  low: "bg-sky-500/15 text-sky-500",
  praise: "bg-emerald-500/15 text-emerald-500",
};

type CodeLabReviewProps = {
  language: CodeLanguage;
  theme: ConsoleTheme;
  isDark: boolean;
  /** Current editor contents, offered as a one-click fill. */
  editorCode: string;
};

/** Review tab — paste any snippet (or pull in the editor's code) and get feedback. */
export function CodeLabReview({ language, theme, isDark, editorCode }: CodeLabReviewProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ReviewResult | null>(null);

  const surface = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  const handleReview = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/studio/code-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "The review could not be completed.");
      setResult({ summary: data.summary ?? "", findings: data.findings ?? [] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "The review could not be completed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2">
        <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>
          Paste {language === "sql" ? "SQL" : "Python"} to review
        </p>
        <button
          type="button"
          onClick={() => setCode(editorCode)}
          disabled={!editorCode.trim()}
          className={cn(
            "ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors disabled:opacity-50",
            theme.muted,
            theme.navHover,
          )}
        >
          <ClipboardPaste className="h-3.5 w-3.5" />
          Use editor code
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        spellCheck={false}
        placeholder={
          language === "sql"
            ? "SELECT * FROM employees WHERE salary > 70000;"
            : "def average(numbers):\n    return sum(numbers) / len(numbers)"
        }
        className={cn(
          "mt-2 w-full resize-y rounded-xl border p-3 text-[12.5px] leading-relaxed outline-none transition-colors placeholder:opacity-50 focus:border-emerald-500/50",
          theme.borderSub,
          theme.input,
          theme.text,
          theme.mono,
        )}
      />

      <div className="mt-2 flex items-center gap-2">
        <button
          type="button"
          onClick={handleReview}
          disabled={loading || !code.trim()}
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-1.5 text-[12px] font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
        >
          {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
          Review code
        </button>
        {code.trim() && (
          <span className={cn("text-[11px] tabular-nums", theme.muted)}>
            {code.split("\n").length} lines
          </span>
        )}
      </div>

      {error && <p className="mt-3 text-[13px] text-rose-500">{error}</p>}

      {result && (
        <div className="mt-4">
          {result.summary && (
            <p className={cn("text-[13px] leading-relaxed", theme.text)}>{result.summary}</p>
          )}

          {result.findings.length === 0 ? (
            <p className={cn("mt-3 text-[12.5px]", theme.muted)}>No specific findings were raised.</p>
          ) : (
            <ul className="mt-3 flex flex-col gap-2">
              {result.findings.map((finding, i) => (
                <li
                  key={`${finding.title}-${i}`}
                  className={cn("rounded-xl border p-3", theme.borderSub, surface)}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider",
                        SEVERITY_STYLES[finding.severity] ?? SEVERITY_STYLES.low,
                      )}
                    >
                      {finding.severity}
                    </span>
                    <span className={cn("text-[13px] font-bold", theme.text)}>{finding.title}</span>
                    {typeof finding.line === "number" && (
                      <span className={cn("text-[11px] tabular-nums", theme.muted)}>
                        line {finding.line}
                      </span>
                    )}
                  </div>
                  <p className={cn("mt-1.5 text-[12px] leading-relaxed", theme.muted)}>
                    {finding.detail}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
