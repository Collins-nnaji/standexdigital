"use client";

import { useCallback, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Sparkles, Loader2, PenTool, Smile, Zap, CheckCircle2, Minus, Minimize2,
  Briefcase, HeartHandshake, Volume2, Copy, Download, Wand2, PanelRightClose,
  PanelRightOpen, X, Dumbbell, MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONSOLE_THEMES,
  type ConsoleThemeMode,
} from "@/components/console/console-theme";
import { stripHtmlToText } from "@/lib/strip-html";
import type { RewriteMode } from "@/lib/communication-llm";
import { TTSTool } from "@/components/workspace/TTSTool";
import { WritingChallenges } from "@/components/console/WritingChallenges";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type RewriteResult = {
  rewritten?: string;
  summary?: string;
  toneShift?: string;
};

type AssistGenerateOutput = { title: string; html: string; notes: string };

const REWRITE_MODES: { id: RewriteMode; label: string; icon: LucideIcon }[] = [
  { id: "professional", label: "Professional", icon: PenTool },
  { id: "friendly", label: "Friendly", icon: Smile },
  { id: "persuasive", label: "Persuasive", icon: Zap },
  { id: "safe", label: "Safe", icon: CheckCircle2 },
  { id: "neutral", label: "Neutral", icon: Minus },
  { id: "concise", label: "Concise", icon: Minimize2 },
  { id: "executive", label: "Executive", icon: Briefcase },
  { id: "empathetic", label: "Empathetic", icon: HeartHandshake },
];

type Props = { themeMode?: ConsoleThemeMode };

export function ConsoleStudio({ themeMode = "light" }: Props) {
  const t = CONSOLE_THEMES[themeMode];

  const [text, setText] = useState("");
  const [rewriteMode, setRewriteMode] = useState<RewriteMode>("professional");

  // Rewrite
  const [rewriteLoading, setRewriteLoading] = useState(false);
  const [rewriteError, setRewriteError] = useState("");
  const [rewriteResult, setRewriteResult] = useState<RewriteResult | null>(null);

  // Generate
  const [genOpen, setGenOpen] = useState(false);
  const [genPrompt, setGenPrompt] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState("");
  const [genPreview, setGenPreview] = useState<AssistGenerateOutput | null>(null);

  // Speech
  const [ttsOpen, setTtsOpen] = useState(false);

  // Copilot (custom instructions + refine, or writing challenges)
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [copilotTab, setCopilotTab] = useState<"assistant" | "challenges">("assistant");
  const [instructions, setInstructions] = useState("");
  const [refineLoading, setRefineLoading] = useState(false);
  const [refineError, setRefineError] = useState("");
  const [refined, setRefined] = useState<{ refined: string; notes: string } | null>(null);

  const [copied, setCopied] = useState(false);

  const draftText = useCallback(
    () => rewriteResult?.rewritten?.trim() || text.trim(),
    [rewriteResult, text],
  );

  const copyText = useCallback(() => {
    const body = draftText();
    if (!body) return;
    void navigator.clipboard.writeText(body);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }, [draftText]);

  const downloadTxt = useCallback(() => {
    const body = draftText();
    if (!body) return;
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `console-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [draftText]);

  const runRewrite = async () => {
    const body = text.trim();
    if (!body) return;
    setRewriteLoading(true);
    setRewriteError("");
    setRewriteResult(null);
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: body, mode: rewriteMode }),
      });
      const data = (await res.json()) as { result?: RewriteResult; error?: string };
      if (!res.ok) throw new Error(data.error || "Rewrite failed");
      setRewriteResult(data.result ?? null);
    } catch (e) {
      setRewriteError(e instanceof Error ? e.message : "Rewrite failed");
    } finally {
      setRewriteLoading(false);
    }
  };

  const applyRewriteToSource = () => {
    const next = rewriteResult?.rewritten?.trim();
    if (!next) return;
    setText(next);
    setRewriteResult(null);
  };

  const runGenerate = async () => {
    const p = genPrompt.trim();
    if (!p) return;
    setGenLoading(true);
    setGenError("");
    setGenPreview(null);
    try {
      const res = await fetch("/api/studio/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "generate",
          prompt: p,
          tone: rewriteMode,
        }),
      });
      const data = (await res.json()) as { output?: AssistGenerateOutput; error?: string };
      if (!res.ok) throw new Error(data.error || "Generation failed");
      if (!data.output) throw new Error("No output returned");
      setGenPreview(data.output);
    } catch (e) {
      setGenError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setGenLoading(false);
    }
  };

  const insertGenerated = () => {
    if (!genPreview?.html) return;
    setText(stripHtmlToText(genPreview.html));
    setRewriteResult(null);
    setGenPreview(null);
    setGenPrompt("");
    setGenOpen(false);
  };

  const runRefine = async () => {
    const prompt = instructions.trim() || text.trim();
    if (!prompt) return;
    setRefineLoading(true);
    setRefineError("");
    setRefined(null);
    try {
      const res = await fetch("/api/console/refine-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = (await res.json()) as { refined?: string; notes?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Refine failed");
      if (!data.refined?.trim()) throw new Error("Empty refine result");
      setRefined({ refined: data.refined.trim(), notes: data.notes?.trim() ?? "" });
    } catch (e) {
      setRefineError(e instanceof Error ? e.message : "Refine failed");
    } finally {
      setRefineLoading(false);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const hasText = Boolean(text.trim());

  const assistantBody = (
    <div className="space-y-4">
      <div>
        <Label htmlFor="copilot-instructions" className={cn("mb-1.5 block text-[10px] font-bold uppercase tracking-wider", t.muted2)}>
          Custom instructions
        </Label>
        <Textarea
          id="copilot-instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          rows={4}
          placeholder="Example: Make the tone more executive and summarize into three bullet points…"
          className={cn("min-h-[96px] resize-y text-[13px] leading-relaxed", t.input)}
        />
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => void runRefine()}
        disabled={refineLoading || (!instructions.trim() && !text.trim())}
        title="Expand into a structured prompt"
        className={cn("w-full justify-center gap-1.5 shadow-none", t.borderSub, t.text)}
      >
        {refineLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="h-3.5 w-3.5" />}
        Refine instructions
      </Button>
      {refineError ? (
        <p className={cn("text-xs font-medium", t.danger)} role="alert">{refineError}</p>
      ) : null}
      {refined ? (
        <div className={cn("space-y-2 rounded-xl border p-3", t.borderSub, t.s2)}>
          <p className={cn("text-[10px] font-semibold uppercase tracking-wider", t.muted2)}>Refined prompt</p>
          <p className={cn("whitespace-pre-wrap text-xs leading-relaxed", t.text)}>{refined.refined}</p>
          {refined.notes ? <p className={cn("text-[11px] leading-snug", t.muted2)}>{refined.notes}</p> : null}
          <Button
            type="button"
            variant="link"
            size="sm"
            className={cn("h-auto p-0 text-xs", t.muted)}
            onClick={() => { setInstructions(refined.refined); setRefined(null); }}
          >
            Use as instructions
          </Button>
        </div>
      ) : null}
    </div>
  );

  const copilotBody = (
    <div className="space-y-4">
      <div className={cn("inline-flex items-center gap-0.5 rounded-lg border p-0.5", t.borderSub)}>
        <button
          type="button"
          onClick={() => setCopilotTab("assistant")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[12px] font-semibold transition-colors",
            copilotTab === "assistant" ? t.navActive : cn(t.muted, t.navHover),
          )}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Assistant
        </button>
        <button
          type="button"
          onClick={() => setCopilotTab("challenges")}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-[6px] px-2.5 py-1.5 text-[12px] font-semibold transition-colors",
            copilotTab === "challenges" ? t.navActive : cn(t.muted, t.navHover),
          )}
        >
          <Dumbbell className="h-3.5 w-3.5" />
          Challenges
        </button>
      </div>

      {copilotTab === "assistant" ? assistantBody : <WritingChallenges t={t} editorText={text} />}
    </div>
  );

  return (
    <div className={cn("flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row", t.shell)}>
      {/* ---------- Main canvas ---------- */}
      <div className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", t.workspaceSurface)}>
        {/* Header + rewrite tones */}
        <div className="shrink-0 space-y-3 px-3 py-3 sm:px-5">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className={cn("text-xs font-medium tracking-wide", t.muted2)}>Console</p>
                <Badge variant="outline" className={cn("h-5 border px-2 text-[10px] font-semibold uppercase tracking-wider", t.borderSub, t.muted2)}>
                  Draft
                </Badge>
              </div>
              <p className={cn("max-w-xl text-sm leading-relaxed", t.muted)}>
                Generate a draft, rewrite the tone, then listen with speech.
              </p>
            </div>
            {/* Copilot toggle — desktop */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCopilotOpen((v) => !v)}
              className={cn("hidden shrink-0 gap-1.5 shadow-none lg:inline-flex", t.borderSub, t.text)}
            >
              {copilotOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
              Copilot
            </Button>
          </div>

          <div className="space-y-1.5">
            <Label className={cn("text-[11px] font-medium", t.muted2)}>Rewrite tone</Label>
            <div className="flex flex-wrap gap-1.5">
              {REWRITE_MODES.map((m) => {
                const Icon = m.icon;
                const active = rewriteMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setRewriteMode(m.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold transition-colors",
                      active
                        ? "border-[var(--brand-teal)] bg-[var(--brand-teal)]/15 text-[var(--brand-teal)]"
                        : cn(t.borderSub, t.muted, t.navHover),
                    )}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              onClick={() => { setGenError(""); setGenPreview(null); if (!text.trim()) setGenPrompt(""); setGenOpen(true); }}
              className={cn("gap-1.5 shadow-none", t.btnPrimary)}
            >
              <Sparkles className="h-4 w-4 opacity-90" />
              Generate
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => void runRewrite()}
              disabled={!hasText || rewriteLoading}
              title={!hasText ? "Add text to rewrite" : undefined}
              className="gap-1.5 border-0 bg-[var(--brand-teal)] text-[#0C0C0B] shadow-none hover:brightness-105 disabled:opacity-45"
            >
              {rewriteLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <PenTool className="h-4 w-4" />}
              {rewriteLoading ? "Rewriting…" : "Rewrite"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setTtsOpen(true)}
              disabled={!hasText}
              title={!hasText ? "Add text to enable speech" : undefined}
              className={cn("gap-1.5 shadow-none", t.borderSub, t.text)}
            >
              <Volume2 className="h-4 w-4" />
              Speech
            </Button>
            <div className="ml-auto flex items-center gap-1">
              <Button type="button" variant="ghost" size="icon" onClick={copyText} disabled={!hasText} title="Copy" className={cn("h-8 w-8", t.text)}>
                {copied ? <CheckCircle2 className="h-4 w-4 text-[var(--brand-teal)]" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Button type="button" variant="ghost" size="icon" onClick={downloadTxt} disabled={!hasText} title="Download .txt" className={cn("h-8 w-8", t.text)}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="min-h-0 flex-1 overflow-auto px-3 pb-3 sm:px-5">
          <div className={cn("relative flex min-h-full flex-col overflow-hidden rounded-2xl border shadow-sm", t.borderSub, t.composerInset)}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={"Paste or type a draft here.\n\nEmpty? Use Generate for a first draft from a short brief, then Rewrite to tune the tone."}
              className={cn(
                "min-h-[min(45vh,420px)] w-full flex-1 resize-none border-0 bg-transparent px-4 py-4 text-[14px] leading-relaxed outline-none",
                t.text,
                "placeholder:opacity-35",
              )}
            />
          </div>
        </div>

        {/* Rewrite result */}
        {(rewriteLoading || rewriteError || rewriteResult) && (
          <div className={cn("flex max-h-[min(34vh,280px)] shrink-0 flex-col border-t", t.borderSub)}>
            <div className="flex shrink-0 items-center justify-between px-4 py-2 sm:px-5">
              <span className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Rewritten</span>
              {rewriteResult?.rewritten ? (
                <button type="button" onClick={applyRewriteToSource} className={cn("rounded-lg border px-2.5 py-1 text-[10px] font-semibold", t.borderSub, t.text, t.navHover)}>
                  Apply to source
                </button>
              ) : null}
            </div>
            <div className="min-h-0 flex-1 overflow-auto px-4 pb-3 sm:px-5">
              {rewriteLoading && (
                <div className="flex min-h-[80px] items-center justify-center gap-2">
                  <Loader2 className={cn("h-6 w-6 animate-spin", t.info)} />
                  <p className={cn("text-[12px]", t.muted)}>Rewriting…</p>
                </div>
              )}
              {rewriteError && <p className={cn("text-[12px] font-semibold", t.danger)}>{rewriteError}</p>}
              {rewriteResult?.rewritten && (
                <p className={cn("whitespace-pre-wrap text-[13px] leading-[1.75]", t.text)}>{rewriteResult.rewritten}</p>
              )}
              {rewriteResult?.summary && (
                <p className={cn("mt-2 text-[11px] leading-snug", t.muted2)}>
                  <Sparkles className="mr-1 inline h-3 w-3 text-[var(--brand-teal)]" />
                  {rewriteResult.summary}
                  {rewriteResult.toneShift ? <span className="ml-1.5">· {rewriteResult.toneShift}</span> : null}
                </p>
              )}
            </div>
          </div>
        )}

        <div className={cn("flex items-center justify-between px-4 py-2 sm:px-5", t.workspaceSurface)}>
          <span className={cn(t.mono, "text-[11px] tabular-nums", t.muted2)}>{wordCount ? `${wordCount} words` : "No text"}</span>
          {/* Copilot toggle — mobile */}
          <Button type="button" variant="outline" size="sm" onClick={() => setCopilotOpen(true)} className={cn("gap-1.5 shadow-none lg:hidden", t.borderSub, t.text)}>
            <PanelRightOpen className="h-4 w-4" />
            Copilot
          </Button>
        </div>
      </div>

      {/* ---------- Copilot rail (desktop, collapsible) ---------- */}
      {copilotOpen && (
        <div className={cn("hidden w-full shrink-0 flex-col overflow-hidden border-l lg:flex lg:w-[380px]", t.workspaceSurface, t.borderSub)}>
          <div className="flex shrink-0 items-center justify-between px-4 py-3">
            <div>
              <p className={cn("text-xs font-medium", t.muted2)}>Workspace</p>
              <h2 className={cn("text-sm font-semibold tracking-tight", t.text)}>Copilot</h2>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={() => setCopilotOpen(false)} className={cn("h-8 w-8", t.muted)} title="Collapse">
              <PanelRightClose className="h-4 w-4" />
            </Button>
          </div>
          <div className={cn("flex-1 overflow-y-auto px-4 pb-5", t.scrollbar)}>{copilotBody}</div>
        </div>
      )}

      {/* ---------- Copilot drawer (mobile) ---------- */}
      {copilotOpen && (
        <div className="fixed inset-0 z-[180] flex flex-col justify-end lg:hidden" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-black/50" aria-label="Close" onClick={() => setCopilotOpen(false)} />
          <div className={cn("relative z-10 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t px-4 pb-6 pt-4", t.workspaceSurface, t.borderSub)}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className={cn("text-sm font-semibold", t.text)}>Copilot</h2>
              <Button type="button" variant="ghost" size="icon" onClick={() => setCopilotOpen(false)} className={cn("h-8 w-8", t.muted)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {copilotBody}
          </div>
        </div>
      )}

      {/* ---------- Speech modal ---------- */}
      {ttsOpen && (
        <div className="fixed inset-0 z-[190] flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" aria-label="Close" onClick={() => setTtsOpen(false)} />
          <div className="relative z-10 w-full max-w-md">
            <TTSTool text={draftText()} themeMode={themeMode} onClose={() => setTtsOpen(false)} />
          </div>
        </div>
      )}

      {/* ---------- Generate modal ---------- */}
      {genOpen && (
        <div className="fixed inset-0 z-[190] flex items-end justify-center p-4 sm:items-center" role="dialog" aria-modal="true">
          <button type="button" className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" aria-label="Close" onClick={() => setGenOpen(false)} />
          <div className={cn("relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border shadow-2xl", t.s1, t.border)}>
            <div className={cn("flex shrink-0 items-start justify-between gap-3 border-b px-5 py-4", t.border)}>
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-teal)]/[0.12] text-[var(--brand-teal)]">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div>
                  <h2 className={cn("text-base font-semibold tracking-tight", t.text)}>Generate</h2>
                  <p className={cn("mt-1 max-w-md text-[12px] leading-relaxed", t.muted)}>Describe what you need — we&apos;ll draft text you can insert and refine.</p>
                </div>
              </div>
              <button type="button" onClick={() => setGenOpen(false)} className={cn("rounded-lg p-1.5", t.muted, t.navHover)} aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
              <textarea
                value={genPrompt}
                onChange={(e) => setGenPrompt(e.target.value)}
                placeholder="What are you writing? Include context, audience, channel, and constraints."
                className={cn("min-h-[140px] w-full resize-y rounded-xl border px-3 py-3 text-[13px] leading-relaxed outline-none", t.borderSub, t.workspaceSurface, t.text, "placeholder:opacity-45")}
              />
              {genError ? <p className={cn("mt-3 rounded-lg border px-3 py-2 text-[12px] font-medium", t.border, t.danger)} role="alert">{genError}</p> : null}
              {genPreview ? (
                <div className={cn("mt-4 rounded-xl border p-4", t.border, t.s2)}>
                  <p className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Preview</p>
                  <p className={cn("mt-1 text-[15px] font-semibold tracking-tight", t.text)}>{genPreview.title}</p>
                  {genPreview.notes ? <p className={cn("mt-2 text-[12px] leading-relaxed", t.muted)}>{genPreview.notes}</p> : null}
                  <div className={cn("prose prose-sm mt-3 max-w-none text-[13px] leading-relaxed", t.text)} dangerouslySetInnerHTML={{ __html: genPreview.html }} />
                </div>
              ) : null}
            </div>
            <div className={cn("flex shrink-0 flex-wrap items-center justify-end gap-2 border-t px-5 py-3.5", t.border, t.s1)}>
              <button type="button" onClick={() => setGenOpen(false)} className={cn("rounded-xl border px-4 py-2.5 text-[12px] font-semibold", t.borderSub, t.muted, t.navHover)}>Cancel</button>
              {genPreview?.html ? (
                <button type="button" onClick={insertGenerated} className={cn("inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-[12px] font-semibold", t.borderSub, t.text, t.navHover)}>
                  <Wand2 className="h-3.5 w-3.5" />
                  Insert into console
                </button>
              ) : null}
              <button type="button" onClick={() => void runGenerate()} disabled={!genPrompt.trim() || genLoading} className={cn("inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold shadow-sm disabled:opacity-45", t.btnPrimary)}>
                {genLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 opacity-90" />}
                {genLoading ? "Generating…" : "Generate draft"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
