"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, MessageCircle, Send, Trash2, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";
import type { LearningLevel } from "@/lib/code-lab/modules";
import type { CodeLanguage } from "@/lib/code-lab/runtimes";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type CodeLabChatProps = {
  theme: ConsoleTheme;
  isDark: boolean;
  language: CodeLanguage;
  level: LearningLevel;
  editorCode: string;
};

/** Splits a reply into plain-text and fenced-code segments for rendering. */
function splitSegments(content: string): { type: "text" | "code"; value: string; lang?: string }[] {
  const parts = content.split(/```(\w*)\n?([\s\S]*?)```/g);
  const segments: { type: "text" | "code"; value: string; lang?: string }[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    const text = parts[i];
    if (text?.trim()) segments.push({ type: "text", value: text.trim() });
    const lang = parts[i + 1];
    const code = parts[i + 2];
    if (code !== undefined) segments.push({ type: "code", value: code.replace(/\n$/, ""), lang });
  }
  return segments.length ? segments : [{ type: "text", value: content }];
}

export function CodeLabChat({ theme, isDark, language, level, editorCode }: CodeLabChatProps) {
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [includeCode, setIncludeCode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const surface = isDark ? "bg-white/[0.03]" : "bg-black/[0.02]";

  useEffect(() => {
    setMessages(null);
    fetch(`/api/studio/codelab/chat?language=${language}`)
      .then((res) => res.json())
      .then((data) => setMessages(data.messages ?? []))
      .catch(() => setMessages([]));
  }, [language]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const send = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setError(null);
    setInput("");

    const optimisticId = `pending-${Date.now()}`;
    setMessages((prev) => [...(prev ?? []), { id: optimisticId, role: "user", content: text }]);

    try {
      const res = await fetch("/api/studio/codelab/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          level,
          message: text,
          code: includeCode ? editorCode : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "The tutor could not respond.");
      setMessages((prev) => [
        ...(prev ?? []).filter((m) => m.id !== optimisticId),
        { id: data.userMessage.id, role: "user", content: data.userMessage.content },
        { id: data.reply.id, role: "assistant", content: data.reply.content },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The tutor could not respond.");
      setMessages((prev) => (prev ?? []).filter((m) => m.id !== optimisticId));
      setInput(text);
    } finally {
      setSending(false);
    }
  };

  const clearConversation = async () => {
    setMessages([]);
    await fetch(`/api/studio/codelab/chat?language=${language}`, { method: "DELETE" });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className={cn("flex shrink-0 items-center gap-2 border-b px-4 py-2.5", theme.borderSub)}>
        <MessageCircle className={cn("h-3.5 w-3.5", theme.muted)} />
        <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>
          Ask the tutor — {language === "sql" ? "SQL" : "Python"}
        </p>
        {messages && messages.length > 0 && (
          <button
            type="button"
            onClick={() => void clearConversation()}
            className={cn("ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold transition-colors", theme.muted, theme.navHover)}
          >
            <Trash2 className="h-3 w-3" />
            Clear
          </button>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {messages === null && (
          <div className={cn("flex h-full items-center justify-center gap-2 text-[12px]", theme.muted)}>
            <Loader2 className="h-3.5 w-3.5 animate-spin" /> Loading conversation…
          </div>
        )}

        {messages && messages.length === 0 && (
          <div className={cn("flex h-full flex-col items-center justify-center gap-2 px-6 text-center", theme.muted)}>
            <Bot className="h-6 w-6" />
            <p className="max-w-sm text-[13px]">
              Ask anything about {language === "sql" ? "SQL" : "Python"} — a concept, why an error
              happened, or a real use case for something you just wrote. Answers are tuned to your{" "}
              {level} level.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {messages?.map((m) => (
            <div key={m.id} className={cn("flex gap-2.5", m.role === "user" && "flex-row-reverse")}>
              <div
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
                  m.role === "user" ? "bg-emerald-500/15 text-emerald-500" : cn(surface, theme.muted),
                )}
              >
                {m.role === "user" ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
              </div>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl border px-3.5 py-2.5 text-[13px] leading-relaxed",
                  theme.borderSub,
                  m.role === "user" ? "bg-emerald-500/[0.08]" : surface,
                  theme.text,
                )}
              >
                {splitSegments(m.content).map((seg, i) =>
                  seg.type === "code" ? (
                    <pre
                      key={i}
                      className={cn(
                        "my-2 overflow-x-auto rounded-lg border p-2.5 text-[12px] leading-relaxed first:mt-0 last:mb-0",
                        theme.borderSub,
                        isDark ? "bg-black/25" : "bg-black/[0.04]",
                        theme.mono,
                      )}
                    >
                      {seg.value}
                    </pre>
                  ) : (
                    <p key={i} className="whitespace-pre-wrap first:mt-0 last:mb-0">
                      {seg.value}
                    </p>
                  ),
                )}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex gap-2.5">
              <div className={cn("flex h-6 w-6 shrink-0 items-center justify-center rounded-full", surface, theme.muted)}>
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className={cn("flex items-center gap-1.5 rounded-2xl border px-3.5 py-2.5", theme.borderSub, surface)}>
                <Loader2 className={cn("h-3.5 w-3.5 animate-spin", theme.muted)} />
                <span className={cn("text-[12.5px]", theme.muted)}>Thinking…</span>
              </div>
            </div>
          )}
        </div>
        <div ref={bottomRef} />
      </div>

      {error && <p className="px-4 pb-1 text-[12px] text-rose-500">{error}</p>}

      <div className={cn("shrink-0 border-t p-3", theme.borderSub)}>
        <label className={cn("mb-2 flex w-fit items-center gap-1.5 text-[11.5px] font-medium", theme.muted)}>
          <input type="checkbox" checked={includeCode} onChange={(e) => setIncludeCode(e.target.checked)} />
          Include my current editor code as context
        </label>
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void send();
              }
            }}
            rows={2}
            placeholder={`Ask about ${language === "sql" ? "SQL" : "Python"}… e.g. "why would I use a CTE instead of a subquery?"`}
            className={cn(
              "min-h-[42px] flex-1 resize-none rounded-xl border px-3 py-2.5 text-[13px] leading-relaxed outline-none transition-colors placeholder:opacity-50 focus:border-emerald-500/50",
              theme.borderSub,
              theme.input,
              theme.text,
            )}
          />
          <button
            type="button"
            onClick={() => void send()}
            disabled={sending || !input.trim()}
            className="inline-flex h-[42px] shrink-0 items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 text-[12.5px] font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
          >
            {sending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Send className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
