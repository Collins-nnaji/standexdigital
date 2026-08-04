"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Dumbbell, History, Loader2, Sparkles, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";
import { WRITING_LEVELS, WRITING_SKILLS, type WritingLevel } from "@/lib/writing-lab/skills";

type Challenge = {
  title: string;
  brief: string;
  targetWords: number | null;
  skillFocus: string;
  level: WritingLevel;
};

type Feedback = {
  score: number | null;
  strengths: string[];
  improvements: string[];
  note: string;
  saved: boolean;
};

type HistoryEntry = {
  id: string;
  skillFocus: string;
  level: WritingLevel;
  title: string;
  score: number | null;
  createdAt: string;
};

type WritingChallengesProps = {
  t: ConsoleTheme;
  /** Current text in the main console editor — what gets submitted for grading. */
  editorText: string;
};

export function WritingChallenges({ t, editorText }: WritingChallengesProps) {
  const [skillFocus, setSkillFocus] = useState(WRITING_SKILLS[0].id);
  const [level, setLevel] = useState<WritingLevel>("beginner");

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState("");

  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [grading, setGrading] = useState(false);
  const [gradeError, setGradeError] = useState("");

  const [history, setHistory] = useState<HistoryEntry[] | null>(null);
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  const loadHistory = () => {
    fetch("/api/studio/writing-challenges/history")
      .then((res) => res.json())
      .then((data) => {
        setSignedIn(Boolean(data.signedIn));
        setHistory(data.attempts ?? []);
      })
      .catch(() => setHistory([]));
  };

  useEffect(loadHistory, []);

  const generateChallenge = async () => {
    setGenerating(true);
    setGenError("");
    setChallenge(null);
    setFeedback(null);
    try {
      const res = await fetch("/api/studio/writing-challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillFocus, level }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not generate a challenge.");
      setChallenge(data as Challenge);
    } catch (err) {
      setGenError(err instanceof Error ? err.message : "Could not generate a challenge.");
    } finally {
      setGenerating(false);
    }
  };

  const submitFeedback = async () => {
    if (!challenge || !editorText.trim()) return;
    setGrading(true);
    setGradeError("");
    setFeedback(null);
    try {
      const res = await fetch("/api/studio/writing-challenges/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...challenge, text: editorText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not grade this attempt.");
      setFeedback(data as Feedback);
      if (data.saved) loadHistory();
    } catch (err) {
      setGradeError(err instanceof Error ? err.message : "Could not grade this attempt.");
    } finally {
      setGrading(false);
    }
  };

  const wordCount = editorText.trim() ? editorText.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-4">
      <div>
        <p className={cn("mb-1.5 text-[10px] font-bold uppercase tracking-wider", t.muted2)}>Skill focus</p>
        <div className="flex flex-wrap gap-1.5">
          {WRITING_SKILLS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSkillFocus(s.id)}
              title={s.blurb}
              className={cn(
                "rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors",
                skillFocus === s.id
                  ? "border-[var(--brand-teal)] bg-[var(--brand-teal)]/15 text-[var(--brand-teal)]"
                  : cn(t.borderSub, t.muted, t.navHover),
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className={cn("mb-1.5 text-[10px] font-bold uppercase tracking-wider", t.muted2)}>Level</p>
        <div className={cn("inline-flex items-center gap-0.5 rounded-lg border p-0.5", t.borderSub)}>
          {WRITING_LEVELS.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setLevel(l.id)}
              className={cn(
                "rounded-[6px] px-2.5 py-1 text-[11.5px] font-semibold transition-colors",
                level === l.id ? t.navActive : cn(t.muted, t.navHover),
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => void generateChallenge()}
        disabled={generating}
        className={cn("inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-[12.5px] font-bold shadow-none disabled:opacity-60", t.btnPrimary)}
      >
        {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
        New challenge
      </button>
      {genError && <p className={cn("text-xs font-medium", t.danger)}>{genError}</p>}

      {challenge && (
        <div className={cn("space-y-2 rounded-xl border p-3", t.borderSub, t.s2)}>
          <div className="flex items-start gap-2">
            <Dumbbell className={cn("mt-0.5 h-3.5 w-3.5 shrink-0", t.muted)} />
            <p className={cn("text-[13px] font-bold leading-snug", t.text)}>{challenge.title}</p>
          </div>
          <p className={cn("text-[12.5px] leading-relaxed", t.text)}>{challenge.brief}</p>
          {challenge.targetWords && (
            <p className={cn("inline-flex items-center gap-1 text-[11px]", t.muted2)}>
              <Target className="h-3 w-3" />
              ~{challenge.targetWords} words {wordCount > 0 && `· you have ${wordCount}`}
            </p>
          )}

          <button
            type="button"
            onClick={() => void submitFeedback()}
            disabled={grading || !editorText.trim()}
            className={cn(
              "mt-1 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-semibold shadow-none disabled:opacity-50",
              t.borderSub,
              t.text,
              t.navHover,
            )}
            title={!editorText.trim() ? "Write your response in the console first" : undefined}
          >
            {grading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CheckCircle2 className="h-3.5 w-3.5" />}
            Submit console draft for feedback
          </button>
        </div>
      )}
      {gradeError && <p className={cn("text-xs font-medium", t.danger)}>{gradeError}</p>}

      {feedback && (
        <div className={cn("space-y-2.5 rounded-xl border p-3", t.borderSub, t.s2)}>
          <div className="flex items-center gap-2">
            <p className={cn("text-[10px] font-semibold uppercase tracking-wider", t.muted2)}>Feedback</p>
            {feedback.score !== null && (
              <span
                className={cn(
                  "ml-auto rounded-full px-2 py-0.5 text-[11px] font-black tabular-nums",
                  feedback.score >= 70 ? "bg-emerald-500/15 text-emerald-500" : "bg-amber-500/15 text-amber-600",
                )}
              >
                {feedback.score}/100
              </span>
            )}
          </div>
          {feedback.note && <p className={cn("text-[12.5px] leading-relaxed", t.text)}>{feedback.note}</p>}

          {feedback.strengths.length > 0 && (
            <div>
              <p className={cn("text-[10.5px] font-semibold uppercase tracking-wide", t.ok)}>Working</p>
              <ul className="mt-1 space-y-1">
                {feedback.strengths.map((s, i) => (
                  <li key={i} className={cn("flex items-start gap-1.5 text-[12px] leading-relaxed", t.text)}>
                    <CheckCircle2 className={cn("mt-0.5 h-3 w-3 shrink-0", t.ok)} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feedback.improvements.length > 0 && (
            <div>
              <p className={cn("text-[10.5px] font-semibold uppercase tracking-wide", t.warn)}>Fix next</p>
              <ul className="mt-1 space-y-1">
                {feedback.improvements.map((s, i) => (
                  <li key={i} className={cn("flex items-start gap-1.5 text-[12px] leading-relaxed", t.text)}>
                    <AlertCircle className={cn("mt-0.5 h-3 w-3 shrink-0", t.warn)} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {feedback.saved && <p className={cn("text-[10.5px]", t.muted2)}>Saved to your history.</p>}
        </div>
      )}

      <div className="pt-1">
        <div className="flex items-center gap-1.5">
          <History className={cn("h-3.5 w-3.5", t.muted2)} />
          <p className={cn("text-[10px] font-bold uppercase tracking-wider", t.muted2)}>History</p>
        </div>
        {signedIn === false && (
          <p className={cn("mt-1.5 text-[11.5px] leading-relaxed", t.muted2)}>
            Sign in from the Code Lab (Studio) to keep a running history and score trend here — challenges
            still work without it.
          </p>
        )}
        {history === null && signedIn !== false && (
          <div className={cn("mt-1.5 flex items-center gap-1.5 text-[11.5px]", t.muted2)}>
            <Loader2 className="h-3 w-3 animate-spin" /> Loading…
          </div>
        )}
        {history && history.length === 0 && signedIn && (
          <p className={cn("mt-1.5 text-[11.5px]", t.muted2)}>No attempts saved yet.</p>
        )}
        {history && history.length > 0 && (
          <ul className="mt-1.5 space-y-1">
            {history.map((h) => (
              <li key={h.id} className={cn("flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px]", t.s1)}>
                <span className={cn("truncate", t.text)}>{h.title}</span>
                {h.score !== null && (
                  <span className={cn("ml-auto shrink-0 font-bold tabular-nums", t.muted2)}>{h.score}</span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
