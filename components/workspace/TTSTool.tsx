"use client";

import { useState, useRef } from "react";
import { Play, Download, Loader2, Volume2, X, VolumeX, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ConsoleThemeMode, CONSOLE_THEMES } from "@/components/console/console-theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TTSToolProps {
  text: string;
  themeMode: ConsoleThemeMode;
  onClose: () => void;
}

const VOICES = [
  { id: "alloy", label: "Alloy", desc: "Neutral & balanced", accent: "#6366f1" },
  { id: "echo", label: "Echo", desc: "Confident, warm", accent: "#0ea5e9" },
  { id: "fable", label: "Fable", desc: "British, narrative", accent: "#8b5cf6" },
  { id: "onyx", label: "Onyx", desc: "Deep, authoritative", accent: "#334155" },
  { id: "nova", label: "Nova", desc: "Energetic, pro", accent: "#ec4899" },
  { id: "shimmer", label: "Shimmer", desc: "Clear, expressive", accent: "#14b8a6" },
];

const SPEEDS = [
  { value: 0.75, label: "0.75×", desc: "Slower" },
  { value: 1, label: "1×", desc: "Normal" },
  { value: 1.25, label: "1.25×", desc: "Faster" },
  { value: 1.5, label: "1.5×", desc: "Fast" },
];

export function TTSTool({ text, themeMode, onClose }: TTSToolProps) {
  const t = CONSOLE_THEMES[themeMode];
  const [voice, setVoice] = useState("alloy");
  const [speed, setSpeed] = useState(1);
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [filename, setFilename] = useState("speech-synthesis");

  const generateTTS = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice, speed }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to generate speech");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const cleanName = filename.trim().replace(/[^a-z0-9]/gi, "-").toLowerCase() || "speech";
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `${cleanName}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const isLight = themeMode === "light";

  return (
    <div
      className={cn(
        "flex max-h-[85vh] flex-col overflow-hidden rounded-2xl border shadow-2xl",
        isLight ? "border-zinc-200 bg-white" : "border-white/10 bg-[#1f1f1f]",
      )}
    >
      {/* Header */}
      <div className={cn("flex shrink-0 items-center justify-between gap-3 border-b px-5 py-4", isLight ? "border-zinc-100" : "border-white/[0.08]")}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-teal)]/[0.14] text-[var(--brand-teal)]">
            <Volume2 className="h-4 w-4" />
          </span>
          <div>
            <h2 className={cn("text-[15px] font-semibold leading-tight", t.text)}>Text to speech</h2>
            <p className={cn("text-xs", t.muted2)}>Pick a voice and generate MP3 audio</p>
          </div>
        </div>
        <Button type="button" variant="ghost" size="icon" className={cn("h-8 w-8 shrink-0", t.muted)} onClick={onClose} aria-label="Close">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-5 py-4">
        {/* Voice picker */}
        <div className="space-y-2">
          <Label className={cn("text-[10px] font-bold uppercase tracking-wider", t.muted2)}>Voice</Label>
          <div role="radiogroup" aria-label="Voice" className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {VOICES.map((v) => {
              const active = voice === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setVoice(v.id)}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-all",
                    active
                      ? "border-[var(--brand-teal)] ring-1 ring-[var(--brand-teal)]/40"
                      : isLight
                        ? "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                        : "border-white/[0.1] hover:border-white/20 hover:bg-white/[0.03]",
                    active && (isLight ? "bg-[var(--brand-teal)]/[0.06]" : "bg-[var(--brand-teal)]/[0.1]"),
                  )}
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                    style={{ backgroundColor: v.accent }}
                    aria-hidden
                  >
                    {v.label[0]}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("block text-[13px] font-semibold leading-tight", t.text)}>{v.label}</span>
                    <span className={cn("block truncate text-[11px] leading-tight", t.muted2)}>{v.desc}</span>
                  </span>
                  <span
                    className={cn(
                      "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                      active ? "border-[var(--brand-teal)] bg-[var(--brand-teal)] text-white" : isLight ? "border-zinc-300" : "border-white/20",
                    )}
                  >
                    {active ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Speed picker */}
        <div className="space-y-2">
          <Label className={cn("text-[10px] font-bold uppercase tracking-wider", t.muted2)}>Speed</Label>
          <div role="radiogroup" aria-label="Playback speed" className="grid grid-cols-4 gap-1.5">
            {SPEEDS.map((s) => {
              const active = speed === s.value;
              return (
                <button
                  key={s.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setSpeed(s.value)}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-xl border px-2 py-2 text-center transition-all",
                    active
                      ? "border-[var(--brand-teal)] ring-1 ring-[var(--brand-teal)]/40"
                      : isLight
                        ? "border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50"
                        : "border-white/[0.1] hover:border-white/20 hover:bg-white/[0.03]",
                    active && (isLight ? "bg-[var(--brand-teal)]/[0.06]" : "bg-[var(--brand-teal)]/[0.1]"),
                  )}
                >
                  <span className={cn("text-[13px] font-semibold leading-tight", t.text)}>{s.label}</span>
                  <span className={cn("text-[10px] leading-tight", t.muted2)}>{s.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filename */}
        <div className="space-y-1.5">
          <Label htmlFor="tts-filename" className={cn("text-[10px] font-bold uppercase tracking-wider", t.muted2)}>
            File name
          </Label>
          <div className="relative">
            <Input
              id="tts-filename"
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              placeholder="speech-synthesis"
              className={cn("h-10 pr-14 text-[13px]", t.input)}
            />
            <span className={cn("pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium opacity-50", t.text)}>
              .mp3
            </span>
          </div>
        </div>

        {error ? (
          <div className={cn("flex items-start gap-2 rounded-lg border border-rose-500/25 bg-rose-500/[0.07] p-2.5 text-xs", t.danger)}>
            <VolumeX className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="flex-1">{error}</span>
          </div>
        ) : null}

        {audioUrl ? (
          <div className={cn("rounded-xl border p-2", isLight ? "border-zinc-200 bg-zinc-50" : "border-white/10 bg-white/[0.03]")}>
            <audio ref={audioRef} src={audioUrl} className="h-9 w-full" controls autoPlay />
          </div>
        ) : null}
      </div>

      {/* Footer actions */}
      <div className={cn("shrink-0 border-t px-5 py-3.5", isLight ? "border-zinc-100" : "border-white/[0.08]")}>
        {!audioUrl ? (
          <Button
            type="button"
            className="w-full gap-2 border-0 bg-[var(--brand-teal)] text-[#0C0C0B] shadow-none hover:brightness-105"
            onClick={() => void generateTTS()}
            disabled={loading || !text.trim()}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            {loading ? "Synthesizing…" : !text.trim() ? "Add text first" : "Generate audio"}
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className={cn("flex-1 gap-2 shadow-none", t.borderSub, t.text)}
              onClick={() => void generateTTS()}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
              Regenerate
            </Button>
            <Button
              type="button"
              className="flex-1 gap-2 border-0 bg-[var(--brand-teal)] text-[#0C0C0B] shadow-none hover:brightness-105"
              onClick={downloadAudio}
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        )}
        <p className={cn("mt-2.5 text-center text-[10px] leading-relaxed", t.muted2)}>
          Audio is generated on demand and not stored on the server.
        </p>
      </div>
    </div>
  );
}
