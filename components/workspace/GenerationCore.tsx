"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Sparkles, Copy, RotateCcw, ArrowLeft, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONSOLE_THEMES, type ConsoleThemeMode } from "@/components/console/console-theme";

type Props = { themeMode: ConsoleThemeMode };

type AssistOutput = { title: string; html: string; notes: string };

function stripHtmlToText(html: string): string {
  return html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<\/(p|div|h1|h2|h3|li|blockquote)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function GenerationCore({ themeMode }: Props) {
  const t = CONSOLE_THEMES[themeMode];
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialPrompt = useMemo(() => (searchParams.get("prompt") ?? "").trim(), [searchParams]);

  const [prompt, setPrompt] = useState("");
  const [industry, setIndustry] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [out, setOut] = useState<AssistOutput | null>(null);
  const [copied, setCopied] = useState<"html" | "text" | "">("");

  const templates = useMemo(
    () =>
      [
        {
          id: "press_release",
          label: "Press release",
          seed: "Draft a press release with a strong headline, a clear lede, 3–5 key bullets, quotes placeholders, and a short boilerplate. Keep claims supportable.",
        },
        {
          id: "internal_memo",
          label: "Internal memo",
          seed: "Draft an internal memo for employees. Be clear, direct, and calm. Include context, decision, actions, owners, and timeline. Keep compliance-safe wording.",
        },
        {
          id: "board_update",
          label: "Board update",
          seed: "Draft a board update. Executive tone. Include key outcomes, risks, mitigations, and asks. Use concise sections and bullets.",
        },
        {
          id: "investor_update",
          label: "Investor comms",
          seed: "Draft an investor update. Be factual, avoid absolute guarantees, and separate metrics from narrative. Include key highlights and forward-looking caution where needed.",
        },
        {
          id: "regulatory_note",
          label: "Regulatory note",
          seed: "Draft a regulatory-facing note. Conservative wording, avoid promotional language, include disclaimers, and keep statements verifiable.",
        },
        {
          id: "client_report",
          label: "Client report",
          seed: "Draft a client report. Professional and structured. Include summary, findings, implications, and recommendations. Keep it measurable and specific.",
        },
      ] as const,
    [],
  );

  const applyTemplate = (seed: string) => {
    setPrompt((prev) => {
      const p = prev.trim();
      if (!p) return seed;
      return `${seed}\n\nContext / notes:\n${p}`;
    });
  };

  useEffect(() => {
    if (initialPrompt) setPrompt(initialPrompt);
    // only on first mount / param change
  }, [initialPrompt]);

  const runGenerate = async () => {
    const p = prompt.trim();
    if (!p) return;
    setLoading(true);
    setError("");
    setOut(null);
    try {
      const res = await fetch("/api/studio/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "generate",
          prompt: p,
          industry,
          audience,
          tone,
          keyword,
        }),
      });
      const data = (await res.json()) as { output?: AssistOutput; error?: string };
      if (!res.ok) throw new Error(data.error || "Generation failed");
      if (!data.output) throw new Error("No output returned");
      setOut(data.output);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setPrompt("");
    setIndustry("");
    setAudience("");
    setTone("Professional");
    setKeyword("");
    setOut(null);
    setError("");
    setCopied("");
  };

  const copyHtml = async () => {
    if (!out?.html) return;
    await navigator.clipboard.writeText(out.html);
    setCopied("html");
    setTimeout(() => setCopied(""), 1200);
  };

  const copyText = async () => {
    if (!out?.html) return;
    await navigator.clipboard.writeText(stripHtmlToText(out.html));
    setCopied("text");
    setTimeout(() => setCopied(""), 1200);
  };

  return (
    <div className={cn("relative flex min-h-0 flex-1 flex-col overflow-hidden", t.shell)}>
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full blur-3xl",
          themeMode === "dark" ? "bg-[var(--brand-magenta)]/[0.06]" : "bg-[var(--brand-teal)]/[0.12]",
        )}
      />
      <header className={cn("relative shrink-0 border-b px-4 py-4 sm:px-6", t.border, t.s1)}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1">
            <p className={cn("text-[10px] font-bold uppercase tracking-[0.16em]", t.muted2)}>Console</p>
            <h1 className={cn("text-lg font-semibold tracking-tight sm:text-xl", t.text)}>Generation</h1>
            <p className={cn("max-w-2xl text-[12px] leading-relaxed sm:text-[13px]", t.muted)}>
              First‑draft communications from a brief — stay inside your review and transform workflow.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => router.replace("/studio/writing?tab=lab", { scroll: false })}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-semibold",
                t.borderSub,
                t.muted,
                t.navHover,
              )}
              title="Back to Console"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Console
            </button>
            <button
              type="button"
              onClick={reset}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2 text-[12px] font-semibold",
                t.borderSub,
                t.muted,
                t.navHover,
              )}
              title="Reset generator"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Reset
            </button>
          </div>
        </div>
      </header>

      <div className="relative min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-6xl gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="flex flex-col gap-4">
            <div className={cn("rounded-2xl border p-5 shadow-sm", t.border, t.s2)}>
              <div className="mb-4 flex flex-col gap-3">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <p className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Brief</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      type="button"
                      onClick={() => applyTemplate(tpl.seed)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition-colors",
                        t.borderSub,
                        t.muted,
                        t.navHover,
                      )}
                    >
                      {tpl.label}
                    </button>
                  ))}
                </div>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="What are you writing? Include context, claims you can support, target audience, channel, and any constraints."
                className={cn(
                  "min-h-[180px] w-full resize-y bg-transparent text-[13px] leading-relaxed outline-none",
                  t.text,
                  "placeholder:opacity-60",
                )}
              />
            </div>

            <div className={cn("grid grid-cols-1 gap-4 rounded-2xl border p-5 sm:grid-cols-2", t.border, t.s2)}>
              <div>
                <label className={cn("mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Industry</label>
                <input value={industry} onChange={(e) => setIndustry(e.target.value)} className={cn("w-full rounded-xl border px-3 py-2.5 text-[13px] outline-none transition-shadow focus:ring-2 focus:ring-black/5", t.input)} placeholder="e.g. Fintech" />
              </div>
              <div>
                <label className={cn("mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Audience</label>
                <input value={audience} onChange={(e) => setAudience(e.target.value)} className={cn("w-full rounded-xl border px-3 py-2.5 text-[13px] outline-none transition-shadow focus:ring-2 focus:ring-black/5", t.input)} placeholder="e.g. Investors" />
              </div>
              <div>
                <label className={cn("mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Tone</label>
                <input value={tone} onChange={(e) => setTone(e.target.value)} className={cn("w-full rounded-xl border px-3 py-2.5 text-[13px] outline-none transition-shadow focus:ring-2 focus:ring-black/5", t.input)} placeholder="Professional" />
              </div>
              <div>
                <label className={cn("mb-1.5 block text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Keyword (optional)</label>
                <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className={cn("w-full rounded-xl border px-3 py-2.5 text-[13px] outline-none transition-shadow focus:ring-2 focus:ring-black/5", t.input)} placeholder="Optional" />
              </div>
            </div>

            <button
              type="button"
              onClick={() => void runGenerate()}
              disabled={!prompt.trim() || loading}
              className={cn(
                "inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-[14px] font-semibold shadow-lg transition disabled:opacity-45 sm:w-auto",
                t.btnPrimary,
                themeMode === "dark" && "shadow-[#EDEBE4]/10",
              )}
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5 opacity-90" />}
              {loading ? "Generating…" : "Generate first draft"}
            </button>

            {error ? (
              <p className={cn("text-sm", t.danger)} role="alert">
                {error}
              </p>
            ) : null}
          </div>

          <div className={cn("flex min-h-[280px] flex-col rounded-2xl border shadow-sm", t.border, t.s2)}>
            {!out ? (
              <div className={cn("flex h-full min-h-[280px] flex-1 flex-col items-center justify-center gap-4 p-8 text-center", t.muted)}>
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl border bg-gradient-to-br shadow-inner",
                    t.borderSub,
                    themeMode === "dark" ? "from-white/[0.04] to-transparent" : "from-black/[0.03] to-transparent",
                  )}
                >
                  <Sparkles className="h-7 w-7 opacity-35" />
                </div>
                <div className="space-y-1">
                  <p className={cn("text-[15px] font-semibold", t.text)}>Draft preview</p>
                  <p className="mx-auto max-w-sm text-[13px] leading-relaxed opacity-90">
                    Output lands here — copy, send to Console, or iterate on the brief.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <div className="mb-4 flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Draft</p>
                    <p className={cn("mt-1 text-lg font-semibold tracking-tight", t.text)}>{out.title}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const text = stripHtmlToText(out.html);
                        router.replace(`/studio/writing?tab=lab&text=${encodeURIComponent(text)}`, { scroll: false });
                      }}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-semibold",
                        t.borderSub,
                        t.text,
                        t.navHover,
                      )}
                      title="Send draft to Console editor"
                    >
                      <Wand2 className="h-3.5 w-3.5" />
                      Send to Console
                    </button>
                    <button
                      type="button"
                      onClick={() => void copyText()}
                      className={cn("inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-semibold", t.borderSub, t.muted, t.navHover)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied === "text" ? "Copied" : "Copy text"}
                    </button>
                    <button
                      type="button"
                      onClick={() => void copyHtml()}
                      className={cn("inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-[12px] font-semibold", t.borderSub, t.muted, t.navHover)}
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied === "html" ? "Copied" : "Copy HTML"}
                    </button>
                  </div>
                </div>

                {out.notes ? (
                  <p className={cn("mb-3 text-[12px] leading-relaxed", t.muted)}>{out.notes}</p>
                ) : null}

                <div
                  className={cn("prose max-w-none text-[13px] leading-relaxed", t.text)}
                  dangerouslySetInnerHTML={{ __html: out.html }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

