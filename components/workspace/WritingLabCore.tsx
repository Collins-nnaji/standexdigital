"use client";

import { Suspense, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import {
  FileText, Sparkles, Loader2, AlertTriangle, AlertCircle, Info,
  PenTool, Smile, CheckCircle2, TrendingUp, Eye, ChevronDown, ChevronUp,
  ShieldAlert, Brain, Shield, Copy, ScanSearch, Bot, User, Wand2,
  Zap, Minus, RefreshCw, Plus, Trash2, X, BookOpen, LayoutList, Users, BadgeAlert,
  Briefcase, Minimize2, HeartHandshake, ClipboardPaste, Download, FileType, Upload,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  CONSOLE_THEMES,
  type ConsoleThemeMode,
} from "@/components/console/console-theme";
import { dispatchCommunicationSaved } from "@/lib/console-events";
import { stripHtmlToText } from "@/lib/strip-html";
import { parseUploadedFile } from "@/lib/parse-uploaded-file";
import type { AnalyzeType, RewriteMode } from "@/lib/communication-llm";
import { TTSTool } from "@/components/workspace/TTSTool";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type AssistGenerateOutput = { title: string; html: string; notes: string };

type Flag = {
  text: string;
  severity: "critical" | "warning" | "info";
  category: string;
  explanation: string;
  suggestion: string;
};

type AnalysisResult = {
  toneScore: number;
  riskScore: number;
  clarityScore: number;
  overallScore: number;
  flags: Flag[];
  summary: string;
  strengths: string[];
  improvements: string[];
};

type RiskResult = {
  riskLevel: string;
  overallScore: number;
  issues: Array<{
    category: string;
    text: string;
    severity: string;
    explanation: string;
    saferVersion: string;
  }>;
  summary: string;
  recommendations: string[];
};

type IntentResult = {
  overallAssessment: string;
  confidenceScore: number;
  tactics: Array<{
    type: string;
    text: string;
    explanation: string;
    impact: string;
  }>;
  biasDetected: string[];
  summary: string;
  neutralVersion: string;
};

type DetectionResult = {
  aiProbability: number;
  verdict: string;
  sections: Array<{ text: string; probability: number; reason: string }>;
  indicators: { aiSignals: string[]; humanSignals: string[] };
  suggestions: string[];
  summary: string;
};

type ReadabilityResult = {
  readingEaseScore: number;
  gradeLevelApprox: string;
  avgSentenceLength: number;
  longSentenceCount: number;
  wordCount: number;
  issues: Array<{ text: string; issue: string; fix: string }>;
  summary: string;
  recommendations: string[];
};

type StructureResult = {
  documentTypeGuess: string;
  hasClearAsk: boolean;
  missingSections: string[];
  strengths: string[];
  suggestedOutline: string[];
  summary: string;
};

type InclusionResult = {
  inclusionScore: number;
  flags: Array<{ text: string; issue: string; suggestion: string }>;
  summary: string;
  goodPractices: string[];
};

type ClaimsResult = {
  overclaimRisk: string;
  flags: Array<{ text: string; concern: string; suggestion: string }>;
  summary: string;
  recommendations: string[];
};

type RewriteResult = {
  rewritten?: string;
  changes?: Array<{ original: string; rewritten: string; reason: string }>;
  summary?: string;
  toneShift?: string;
  wordCountOriginal?: number;
  wordCountRewritten?: number;
};

type ToolId =
  | "communication"
  | "compliance"
  | "intent"
  | "detect"
  | "readability"
  | "structure"
  | "inclusion"
  | "claims";

type ToolDef = {
  id: ToolId;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconWrap: string;
  iconColor: string;
  activeClass: string;
  idleClass: string;
  analyzeType: AnalyzeType;
};


type TransformPersonaRow = {
  id: string;
  name: string;
  instructions: string;
  createdAt?: string;
  updatedAt?: string;
};

const STUDIO_MODES: {
  id: RewriteMode;
  label: string;
  icon: LucideIcon;
  desc: string;
  chip: string;
  chipActive: string;
}[] = [
  { id: "professional", label: "Professional", icon: PenTool, desc: "Polished business tone", chip: "border-slate-200 bg-white text-slate-700 hover:border-[#0f2744]/25", chipActive: "border-[#0f2744] bg-[#0f2744] text-white shadow-md" },
  { id: "friendly", label: "Friendly", icon: Smile, desc: "Warm and approachable", chip: "border-slate-200 bg-white text-slate-700 hover:border-emerald-300/50", chipActive: "border-emerald-600 bg-emerald-600 text-white shadow-md" },
  { id: "persuasive", label: "Persuasive", icon: Zap, desc: "Compelling rhetoric", chip: "border-slate-200 bg-white text-slate-700 hover:border-amber-300/50", chipActive: "border-amber-600 bg-amber-600 text-white shadow-md" },
  { id: "safe", label: "Safe", icon: CheckCircle2, desc: "Lower-risk wording", chip: "border-slate-200 bg-white text-slate-700 hover:border-sky-300/50", chipActive: "border-sky-600 bg-sky-600 text-white shadow-md" },
  { id: "neutral", label: "Neutral", icon: Minus, desc: "Balanced and objective", chip: "border-slate-200 bg-white text-slate-700 hover:border-zinc-400/50", chipActive: "border-zinc-700 bg-zinc-800 text-white shadow-md" },
  { id: "concise", label: "Concise", icon: Minimize2, desc: "Tight, minimal fluff", chip: "border-slate-200 bg-white text-slate-700 hover:border-cyan-300/50", chipActive: "border-cyan-700 bg-cyan-700 text-white shadow-md" },
  { id: "executive", label: "Executive", icon: Briefcase, desc: "Board-ready, strategic", chip: "border-slate-200 bg-white text-slate-700 hover:border-indigo-300/50", chipActive: "border-indigo-700 bg-indigo-700 text-white shadow-md" },
  { id: "empathetic", label: "Empathetic", icon: HeartHandshake, desc: "Warm, inclusive, human", chip: "border-slate-200 bg-white text-slate-700 hover:border-rose-300/50", chipActive: "border-rose-600 bg-rose-600 text-white shadow-md" },
];

const AI_GENERATE_TEMPLATES: ReadonlyArray<{ id: string; label: string; seed: string }> = [
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
];

const RISK_COLORS: Record<string, { bg: string; border: string; text: string; icon: string; label: string }> = {
  low: { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-900", icon: "text-emerald-600", label: "Low risk" },
  medium: { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-950", icon: "text-amber-600", label: "Medium risk" },
  high: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-950", icon: "text-rose-600", label: "High risk" },
  critical: { bg: "bg-rose-100", border: "border-rose-300", text: "text-rose-950", icon: "text-rose-700", label: "Critical risk" },
};

const CATEGORY_LABELS: Record<string, string> = {
  harassment: "Harassment",
  discrimination: "Discrimination",
  threat: "Threat",
  legal: "Legal risk",
  policy: "Policy violation",
  privacy: "Privacy concern",
};

const ASSESSMENT_CONFIG: Record<string, { bg: string; border: string; text: string; label: string; desc: string }> = {
  neutral: { bg: "bg-zinc-50", border: "border-zinc-200", text: "text-zinc-900", label: "Neutral", desc: "No persuasion or manipulation tactics detected." },
  mildly_persuasive: {
    bg: "bg-fuchsia-50",
    border: "border-fuchsia-200",
    text: "text-fuchsia-950",
    label: "Mildly persuasive",
    desc: "Uses standard persuasion techniques common in everyday communication.",
  },
  strongly_persuasive: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-950",
    label: "Strongly persuasive",
    desc: "Contains significant persuasion tactics that could influence decision-making.",
  },
  manipulative: {
    bg: "bg-rose-50",
    border: "border-rose-200",
    text: "text-rose-950",
    label: "Manipulative",
    desc: "Contains manipulative language designed to exploit psychological vulnerabilities.",
  },
};

const TACTIC_LABELS: Record<string, string> = {
  social_pressure: "Social pressure",
  emotional_manipulation: "Emotional manipulation",
  false_urgency: "False urgency",
  gaslighting: "Gaslighting",
  bandwagon: "Bandwagon effect",
  guilt_trip: "Guilt trip",
  fear_appeal: "Fear appeal",
  flattery: "Flattery",
  authority_bias: "Authority bias",
  straw_man: "Straw man",
  appeal_to_emotion: "Appeal to emotion",
};


const ANALYZER_TOOLS: ToolDef[] = [
  {
    id: "communication",
    title: "Writing fundamentals",
    subtitle: "Tone, clarity, overall quality & phrase-level coaching",
    icon: FileText,
    iconWrap: "border-[#0f2744]/15 bg-[#0f2744]/[0.04]",
    iconColor: "text-[#0f2744]",
    activeClass: "border-[#0f2744]/40 bg-white shadow-lg shadow-[#0f2744]/[0.07] ring-1 ring-[#0f2744]/15",
    idleClass: "border-slate-200/80 bg-white/90 hover:border-[#0f2744]/20",
    analyzeType: "text",
  },
  {
    id: "compliance",
    title: "Safety & compliance",
    subtitle: "HR, legal, policy & safer wording alternatives",
    icon: ShieldAlert,
    iconWrap: "border-rose-200 bg-rose-50",
    iconColor: "text-rose-600",
    activeClass: "border-rose-400 bg-rose-50/90 shadow-md shadow-rose-500/10 ring-1 ring-rose-200",
    idleClass: "border-slate-200/80 bg-white/90 hover:border-rose-200",
    analyzeType: "risk",
  },
  {
    id: "intent",
    title: "Persuasion signals",
    subtitle: "Pressure cues & cognitive bias signals",
    icon: Brain,
    iconWrap: "border-fuchsia-200 bg-fuchsia-50",
    iconColor: "text-fuchsia-600",
    activeClass: "border-fuchsia-400 bg-fuchsia-50/90 shadow-md shadow-fuchsia-500/10 ring-1 ring-fuchsia-200",
    idleClass: "border-slate-200/80 bg-white/90 hover:border-fuchsia-200",
    analyzeType: "intent",
  },
  {
    id: "detect",
    title: "Originality signal",
    subtitle: "AI-likeness and tips to sound more human",
    icon: ScanSearch,
    iconWrap: "border-amber-200 bg-amber-50",
    iconColor: "text-amber-600",
    activeClass: "border-amber-400 bg-amber-50/90 shadow-md shadow-amber-500/10 ring-1 ring-amber-200",
    idleClass: "border-slate-200/80 bg-white/90 hover:border-amber-200",
    analyzeType: "detect",
  },
  {
    id: "readability",
    title: "Readability level",
    subtitle: "Sentence flow, grade level & clarity fixes",
    icon: BookOpen,
    iconWrap: "border-sky-200 bg-sky-50",
    iconColor: "text-sky-600",
    activeClass: "border-sky-400 bg-sky-50/90 shadow-md shadow-sky-500/10 ring-1 ring-sky-200",
    idleClass: "border-slate-200/80 bg-white/90 hover:border-sky-200",
    analyzeType: "readability",
  },
  {
    id: "structure",
    title: "Structure map",
    subtitle: "Outline guidance, asks, and missing sections",
    icon: LayoutList,
    iconWrap: "border-indigo-200 bg-indigo-50",
    iconColor: "text-indigo-600",
    activeClass: "border-indigo-400 bg-indigo-50/90 shadow-md shadow-indigo-500/10 ring-1 ring-indigo-200",
    idleClass: "border-slate-200/80 bg-white/90 hover:border-indigo-200",
    analyzeType: "structure",
  },
  {
    id: "inclusion",
    title: "Inclusive language",
    subtitle: "Respectful, accessible wording",
    icon: Users,
    iconWrap: "border-teal-200 bg-teal-50",
    iconColor: "text-teal-600",
    activeClass: "border-teal-400 bg-teal-50/90 shadow-md shadow-teal-500/10 ring-1 ring-teal-200",
    idleClass: "border-slate-200/80 bg-white/90 hover:border-teal-200",
    analyzeType: "inclusion",
  },
  {
    id: "claims",
    title: "Claims balance",
    subtitle: "Overstatements & supportable wording",
    icon: BadgeAlert,
    iconWrap: "border-orange-200 bg-orange-50",
    iconColor: "text-orange-600",
    activeClass: "border-orange-400 bg-orange-50/90 shadow-md shadow-orange-500/10 ring-1 ring-orange-200",
    idleClass: "border-slate-200/80 bg-white/90 hover:border-orange-200",
    analyzeType: "claims",
  },
];

function firstLineTitle(raw: string): string {
  const line = raw.split(/\r?\n/).find((l) => l.trim()) ?? raw;
  const t = line.trim().replace(/\s+/g, " ");
  if (t.length <= 120) return t || "Untitled";
  return `${t.slice(0, 117)}…`;
}

function scoresForPersist(analyzeType: AnalyzeType, result: unknown) {
  if (!result) return {};
  switch (analyzeType) {
    case "text": {
      const r = result as AnalysisResult;
      return {
        overallScore: r.overallScore,
        toneScore: r.toneScore,
        riskScore: r.riskScore,
        clarityScore: r.clarityScore,
      };
    }
    case "risk": {
      const r = result as RiskResult;
      return { overallScore: r.overallScore, riskLevel: r.riskLevel ?? null };
    }
    case "intent": {
      const r = result as IntentResult;
      return { overallScore: r.confidenceScore };
    }
    case "detect": {
      const r = result as DetectionResult;
      return { aiProbability: r.aiProbability };
    }
    case "readability": {
      const r = result as ReadabilityResult;
      return { overallScore: r.readingEaseScore };
    }
    case "structure":
      return {};
    case "inclusion": {
      const r = result as InclusionResult;
      return { overallScore: r.inclusionScore };
    }
    case "claims":
    default:
      return {};
  }
}

async function persistCommunicationAnalysis(payload: {
  title: string;
  source: "TEXT";
  kind: string;
  contentText?: string;
  overallScore?: number;
  toneScore?: number;
  riskScore?: number;
  clarityScore?: number;
  aiProbability?: number;
  riskLevel?: string | null;
}) {
  try {
    const res = await fetch("/api/communication-analysis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) dispatchCommunicationSaved();
  } catch {
    /* non-blocking */
  }
}

type Props = {
  themeMode?: ConsoleThemeMode;
  /** When set, loads draft into the editor without running analysis (ChatGPT-style history). */
  historySnapshot?: { id: string; contentText: string | null } | null;
  /** Sidebar row id while fetch runs — keeps URL sync from clobbering the composer before snapshot arrives. */
  historySelectionId?: string | null;
};

/** Full analysis + transform UI — mounted from `/console` (single platform). */
export function WritingLabCore({
  themeMode = "light",
  historySnapshot = null,
  historySelectionId = null,
}: Props) {
  const t = CONSOLE_THEMES[themeMode];
  return (
    <Suspense fallback={<div className={cn("flex flex-1 items-center justify-center", t.shell)}><Loader2 className={cn("h-6 w-6 animate-spin", t.muted)} /></div>}>
      <WritingLabInner
        themeMode={themeMode}
        historySnapshot={historySnapshot}
        historySelectionId={historySelectionId}
      />
    </Suspense>
  );
}

function WritingLabInner({
  themeMode = "light",
  historySnapshot = null,
  historySelectionId = null,
}: Props) {
  const t = CONSOLE_THEMES[themeMode];
  const searchParams = useSearchParams();
  const router = useRouter();
  const [text, setText] = useState("");
  const [runAllAnalyzeLoading, setRunAllAnalyzeLoading] = useState(false);
  const [commResult, setCommResult] = useState<AnalysisResult | null>(null);
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null);
  const [intentResult, setIntentResult] = useState<IntentResult | null>(null);
  const [detectResult, setDetectResult] = useState<DetectionResult | null>(null);
  const [readabilityResult, setReadabilityResult] = useState<ReadabilityResult | null>(null);
  const [structureResult, setStructureResult] = useState<StructureResult | null>(null);
  const [inclusionResult, setInclusionResult] = useState<InclusionResult | null>(null);
  const [claimsResult, setClaimsResult] = useState<ClaimsResult | null>(null);
  const [studioMode, setStudioMode] = useState<RewriteMode>("professional");
  const [studioResult, setStudioResult] = useState<RewriteResult | null>(null);
  const [studioLoading, setStudioLoading] = useState(false);
  const [studioError, setStudioError] = useState("");
  const [showStudioChanges, setShowStudioChanges] = useState(false);
  const [studioCopied, setStudioCopied] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolId | null>(null);
  /** Tools marked to run together via “Run selected”. */
  const [batchSelected, setBatchSelected] = useState<Set<ToolId>>(() => new Set());
  const historyAppliedRef = useRef<string | null>(null);
  /** Auto-open generate modal once when `prompt` appears in URL (avoid reopening on every param change). */
  const aiGenOpenedFromUrlRef = useRef(false);
  const [loadingTools, setLoadingTools] = useState<Partial<Record<ToolId, boolean>>>({});
  const [toolErrors, setToolErrors] = useState<Partial<Record<ToolId, string>>>({});
  const [error, setError] = useState("");
  const [expandedFlag, setExpandedFlag] = useState<number | null>(null);
  const [showNeutral, setShowNeutral] = useState(false);
  const [copiedRiskIdx, setCopiedRiskIdx] = useState<number | null>(null);
  const [humanizing, setHumanizing] = useState(false);
  const [personas, setPersonas] = useState<TransformPersonaRow[]>([]);
  const [personasLoading, setPersonasLoading] = useState(false);
  const [activePersonaId, setActivePersonaId] = useState<string | null>(null);
  const [personaModalOpen, setPersonaModalOpen] = useState(false);
  const [personaModalTab, setPersonaModalTab] = useState<"ai" | "manual">("ai");
  const [personaAiDescription, setPersonaAiDescription] = useState("");
  const [personaGenLoading, setPersonaGenLoading] = useState(false);
  const [personaFormName, setPersonaFormName] = useState("");
  const [personaFormInstructions, setPersonaFormInstructions] = useState("");
  const [personaSaveLoading, setPersonaSaveLoading] = useState(false);
  const [personaDeletingId, setPersonaDeletingId] = useState<string | null>(null);
  const [personaModalError, setPersonaModalError] = useState("");
  const [historyDraftMissing, setHistoryDraftMissing] = useState(false);
  const [genPrompt, setGenPrompt] = useState("");
  const [genIndustry, setGenIndustry] = useState("");
  const [genAudience, setGenAudience] = useState("");
  const [genTone, setGenTone] = useState("Professional");
  const [genKeyword, setGenKeyword] = useState("");
  const [genLoading, setGenLoading] = useState(false);
  const [genError, setGenError] = useState("");
  const [genPreview, setGenPreview] = useState<AssistGenerateOutput | null>(null);
  const [aiGenerateModalOpen, setAiGenerateModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadError, setUploadError] = useState("");
  /** Export/copy allowed only after a successful Transform or inserting AI-generated text. */
  const [exportUnlocked, setExportUnlocked] = useState(false);
  const [ttsOpen, setTtsOpen] = useState(false);
  const [consoleTask, setConsoleTask] = useState("");
  const [refineLoading, setRefineLoading] = useState(false);
  const [refineError, setRefineError] = useState<string | null>(null);
  const [refinedOutput, setRefinedOutput] = useState<{ refined: string; notes: string } | null>(null);

  const hasAnyResult = Boolean(
    commResult ||
      riskResult ||
      intentResult ||
      detectResult ||
      readabilityResult ||
      structureResult ||
      inclusionResult ||
      claimsResult,
  );

  const hasResultForTool = (id: ToolId): boolean => {
    switch (id) {
      case "communication":
        return commResult != null;
      case "compliance":
        return riskResult != null;
      case "intent":
        return intentResult != null;
      case "detect":
        return detectResult != null;
      case "readability":
        return readabilityResult != null;
      case "structure":
        return structureResult != null;
      case "inclusion":
        return inclusionResult != null;
      case "claims":
        return claimsResult != null;
      default:
        return false;
    }
  };

  const openGeneratorWithText = useCallback(() => {
    const seed = (studioResult?.rewritten || text || "").trim();
    const prompt = seed
      ? `Generate a polished enterprise communication from this starting draft. Keep claims supportable.\n\n${seed}`
      : "Generate a polished enterprise communication from a short brief. Keep claims supportable.";
    setGenPrompt(prompt);
    setGenError("");
    setGenPreview(null);
    setAiGenerateModalOpen(true);
  }, [studioResult?.rewritten, text]);

  /** Opens the generate modal; clears brief when the console editor is empty (true “from scratch”). */
  const openGenerateWorkspace = useCallback(() => {
    setGenError("");
    if (!text.trim()) {
      setGenPrompt("");
      setGenPreview(null);
    }
    setAiGenerateModalOpen(true);
  }, [text]);

  const getExportPlainText = useCallback(() => {
    const fromTransform = studioResult?.rewritten?.trim();
    if (fromTransform) return fromTransform;
    return text.trim();
  }, [studioResult?.rewritten, text]);

  const copyWorkspaceText = useCallback(() => {
    const body = getExportPlainText();
    if (!exportUnlocked || !body) return;
    void navigator.clipboard.writeText(body);
  }, [exportUnlocked, getExportPlainText]);

  const downloadWorkspaceTxt = useCallback(() => {
    const body = getExportPlainText();
    if (!exportUnlocked || !body) return;
    const blob = new Blob([body], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `console-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, [exportUnlocked, getExportPlainText]);

  const applyGenTemplate = (seed: string) => {
    setGenPrompt((prev) => {
      const p = prev.trim();
      if (!p) return seed;
      return `${seed}\n\nContext / notes:\n${p}`;
    });
  };

  const taskForConsole = () => consoleTask.trim() || text.trim();

  /** Right rail: depth from shadow + hairline ring only — same surface as workspace (no darker card fills). */
  const assistantSectionClass = cn(
    "rounded-2xl px-4 py-4",
    themeMode === "light"
      ? "shadow-[0_2px_16px_-2px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.04)]"
      : "shadow-[0_4px_28px_-8px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06]",
  );

  const runRefinePrompt = async () => {
    const prompt = taskForConsole();
    if (!prompt) return;
    setRefineLoading(true);
    setRefineError(null);
    setRefinedOutput(null);
    try {
      const res = await fetch("/api/console/refine-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = (await res.json()) as { refined?: string; notes?: string; error?: string };
      if (!res.ok) throw new Error(data.error || "Refine failed");
      if (!data.refined?.trim()) throw new Error("Empty refine result");
      setRefinedOutput({ refined: data.refined.trim(), notes: data.notes?.trim() ?? "" });
    } catch (e) {
      setRefineError(e instanceof Error ? e.message : "Refine failed");
    } finally {
      setRefineLoading(false);
    }
  };

  const runWorkspaceGenerate = async () => {
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
          industry: genIndustry,
          audience: genAudience,
          tone: genTone,
          keyword: genKeyword,
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

  const loadPersonas = useCallback(async () => {
    setPersonasLoading(true);
    try {
      const res = await fetch("/api/transform-personas", { cache: "no-store" });
      const data = (await res.json()) as { personas?: TransformPersonaRow[]; error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to load personas");
      setPersonas(data.personas ?? []);
    } catch {
      setPersonas([]);
    } finally {
      setPersonasLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPersonas();
  }, [loadPersonas]);

  useEffect(() => {
    if (studioResult?.rewritten?.trim()) setExportUnlocked(true);
  }, [studioResult]);

  useEffect(() => {
    if (!text.trim() && !studioResult?.rewritten?.trim()) setExportUnlocked(false);
  }, [text, studioResult]);

  useEffect(() => {
    if (personasLoading) return;
    if (!activePersonaId) return;
    if (personas.some((p) => p.id === activePersonaId)) return;
    setActivePersonaId(null);
    router.replace(`/studio/writing?tab=lab&rewriteMode=${encodeURIComponent(studioMode)}`, { scroll: false });
  }, [personasLoading, activePersonaId, personas, router, studioMode]);

  useEffect(() => {
    // While a sidebar history row is selected, keep the composer driven by history load / snapshot,
    // not by URL (avoids racing `workspace=` / `text=` with the detail fetch).
    if (historySelectionId) return;

    const prefilled = searchParams.get("text");
    if (prefilled) {
      setText(decodeURIComponent(prefilled));
      setExportUnlocked(false);
    }
    const personaParam = searchParams.get("persona");
    if (personaParam) {
      setActivePersonaId(personaParam);
    } else {
      setActivePersonaId(null);
      const rm = searchParams.get("rewriteMode");
      if (rm && STUDIO_MODES.some((x) => x.id === rm)) {
        setStudioMode(rm as RewriteMode);
      }
    }
    const promptParam = searchParams.get("prompt");
    if (promptParam) {
      setGenPrompt(decodeURIComponent(promptParam));
      if (!aiGenOpenedFromUrlRef.current) {
        aiGenOpenedFromUrlRef.current = true;
        setAiGenerateModalOpen(true);
      }
    }
  }, [searchParams, historySelectionId]);

  /** Load saved draft from history into the editor — no API re-analysis. */
  useEffect(() => {
    if (!historySnapshot) {
      historyAppliedRef.current = null;
      setHistoryDraftMissing(false);
      return;
    }
    if (historyAppliedRef.current === historySnapshot.id) return;
    historyAppliedRef.current = historySnapshot.id;
    const draft = historySnapshot.contentText?.trim() ?? "";
    setText(draft);
    setExportUnlocked(false);
    setHistoryDraftMissing(draft.length === 0);
    setActivePersonaId(null);
    setCommResult(null);
    setRiskResult(null);
    setIntentResult(null);
    setDetectResult(null);
    setReadabilityResult(null);
    setStructureResult(null);
    setInclusionResult(null);
    setClaimsResult(null);
    setExpandedFlag(null);
    setShowNeutral(false);
    setSelectedTool(null);
    setBatchSelected(new Set());
    setToolErrors({});
    setLoadingTools({});
    router.replace("/studio/writing?tab=lab", { scroll: false });
  }, [historySnapshot, router]);

  const clearAnalysis = () => {
    setCommResult(null);
    setRiskResult(null);
    setIntentResult(null);
    setDetectResult(null);
    setReadabilityResult(null);
    setStructureResult(null);
    setInclusionResult(null);
    setClaimsResult(null);
    setExpandedFlag(null);
    setShowNeutral(false);
    setSelectedTool(null);
    setBatchSelected(new Set());
    setToolErrors({});
    setLoadingTools({});
  };

  const applyUploadedFiles = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    setUploadError("");
    setUploadingFile(true);
    try {
      const result = await parseUploadedFile(file);
      if (!result.ok) {
        setUploadError(result.error);
        return;
      }
      if (!result.text.trim()) {
        setUploadError("No text could be extracted from this file.");
        return;
      }
      setText(result.text);
      setExportUnlocked(false);
      clearAnalysis();
      setHistoryDraftMissing(false);
    } finally {
      setUploadingFile(false);
    }
  };

  const insertGeneratedIntoWorkspace = () => {
    if (!genPreview?.html) return;
    setText(stripHtmlToText(genPreview.html));
    setExportUnlocked(true);
    clearAnalysis();
    setGenPreview(null);
    setGenError("");
    setAiGenerateModalOpen(false);
  };

  useEffect(() => {
    return () => {
      // Cleanup any pending resources
    };
  }, []);



  const applyAnalyzeResult = (type: AnalyzeType, result: unknown) => {
    switch (type) {
      case "text":
        setCommResult(result as AnalysisResult);
        break;
      case "risk":
        setRiskResult(result as RiskResult);
        break;
      case "intent":
        setIntentResult(result as IntentResult);
        break;
      case "detect":
        setDetectResult(result as DetectionResult);
        break;
      case "readability":
        setReadabilityResult(result as ReadabilityResult);
        break;
      case "structure":
        setStructureResult(result as StructureResult);
        break;
      case "inclusion":
        setInclusionResult(result as InclusionResult);
        break;
      case "claims":
        setClaimsResult(result as ClaimsResult);
        break;
    }
  };

  const runTool = async (id: ToolId, opts?: { persist?: boolean }) => {
    if (!text.trim()) return;
    const shouldPersist = opts?.persist !== false;
    setSelectedTool(id);
    setToolErrors((e) => {
      const next = { ...e };
      delete next[id];
      return next;
    });
    setLoadingTools((l) => ({ ...l, [id]: true }));
    const def = ANALYZER_TOOLS.find((t) => t.id === id);
    if (!def) {
      setLoadingTools((l) => ({ ...l, [id]: false }));
      return;
    }
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), type: def.analyzeType }),
      });
      const data = (await res.json()) as { result?: unknown; error?: string };
      if (!res.ok) throw new Error(data.error || "Analysis failed");
      applyAnalyzeResult(def.analyzeType, data.result);
      if (shouldPersist) {
        void persistCommunicationAnalysis({
          title: firstLineTitle(text.trim()),
          source: "TEXT",
          kind: def.analyzeType === "text" ? "communication" : def.id,
          contentText: text.trim(),
          ...scoresForPersist(def.analyzeType, data.result),
        });
      }
    } catch (err) {
      setToolErrors((e) => ({
        ...e,
        [id]: err instanceof Error ? err.message : "Something went wrong",
      }));
    } finally {
      setLoadingTools((l) => ({ ...l, [id]: false }));
    }
  };

  const focusToolPanel = (id: ToolId) => {
    setSelectedTool(id);
  };

  const toggleBatchTool = (id: ToolId) => {
    setBatchSelected((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const handleRunSelectedBatch = async () => {
    if (!text.trim() || batchSelected.size === 0) return;
    setRunAllAnalyzeLoading(true);
    setError("");
    try {
      await Promise.all([...batchSelected].map((id) => runTool(id, { persist: false })));
      void persistCommunicationAnalysis({
        title: firstLineTitle(text.trim()),
        source: "TEXT",
        kind: "batch_selected",
        contentText: text.trim(),
      });
    } finally {
      setRunAllAnalyzeLoading(false);
    }
  };

  const handleRunAllAnalyze = async () => {
    if (!text.trim()) return;
    setRunAllAnalyzeLoading(true);
    setError("");
    const analyzeIds = ANALYZER_TOOLS;
    for (const t of analyzeIds) {
      setToolErrors((e) => {
        const next = { ...e };
        delete next[t.id];
        return next;
      });
      setLoadingTools((l) => ({ ...l, [t.id]: true }));
    }
    const payload = { text: text.trim() };
    const bundle: {
      text?: AnalysisResult;
      risk?: RiskResult;
      intent?: IntentResult;
      detect?: DetectionResult;
    } = {};

    await Promise.all(
      analyzeIds.map(async (t) => {
        try {
          const res = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...payload, type: t.analyzeType }),
          });
          const data = (await res.json()) as { result?: unknown; error?: string };
          if (!res.ok) throw new Error(data.error || "Analysis failed");
          const r = data.result;
          if (t.analyzeType === "text") bundle.text = r as AnalysisResult;
          if (t.analyzeType === "risk") bundle.risk = r as RiskResult;
          if (t.analyzeType === "intent") bundle.intent = r as IntentResult;
          if (t.analyzeType === "detect") bundle.detect = r as DetectionResult;
          applyAnalyzeResult(t.analyzeType, r);
        } catch (err) {
          setToolErrors((e) => ({
            ...e,
            [t.id]: err instanceof Error ? err.message : "Analysis failed",
          }));
        } finally {
          setLoadingTools((l) => ({ ...l, [t.id]: false }));
        }
      }),
    );
    setSelectedTool("communication");
    setRunAllAnalyzeLoading(false);

    if (bundle.text) {
      void persistCommunicationAnalysis({
        title: firstLineTitle(text.trim()),
        source: "TEXT",
        kind: "run_all",
        contentText: text.trim(),
        overallScore: bundle.text.overallScore,
        toneScore: bundle.text.toneScore,
        riskScore: bundle.text.riskScore,
        clarityScore: bundle.text.clarityScore,
        aiProbability: bundle.detect?.aiProbability,
        riskLevel: bundle.risk?.riskLevel ?? null,
      });
    }
  };

  const copySafer = (saferText: string, idx: number) => {
    navigator.clipboard.writeText(saferText);
    setCopiedRiskIdx(idx);
    setTimeout(() => setCopiedRiskIdx(null), 2000);
  };

  const handleHumanize = async () => {
    if (!text.trim()) return;
    setHumanizing(true);
    setError("");
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, mode: "friendly" }),
      });
      const data = (await res.json()) as { result?: { rewritten?: string }; error?: string };
      if (!res.ok) throw new Error(data.error || "Humanize failed");
      const next = data.result?.rewritten?.trim();
      if (next) {
        setText(next);
        clearAnalysis();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Humanize failed");
    } finally {
      setHumanizing(false);
    }
  };

  const handleStudioRewrite = async () => {
    if (!text.trim()) return;
    setStudioLoading(true);
    setStudioError("");
    setStudioResult(null);
    setShowStudioChanges(false);
    try {
      const res = await fetch("/api/rewrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          activePersonaId
            ? { text, personaId: activePersonaId }
            : { text, mode: studioMode },
        ),
      });
      const data = (await res.json()) as { result?: RewriteResult; error?: string };
      if (!res.ok) throw new Error(data.error || "Rewrite failed");
      setStudioResult(data.result ?? null);
    } catch (err) {
      setStudioError(err instanceof Error ? err.message : "Rewrite failed");
    } finally {
      setStudioLoading(false);
    }
  };

  const selectStudioMode = (m: RewriteMode) => {
    setActivePersonaId(null);
    setStudioMode(m);
    setStudioResult(null);
    setStudioError("");
    router.replace(`/studio/writing?tab=lab&rewriteMode=${encodeURIComponent(m)}`, { scroll: false });
  };

  const selectPersona = (id: string) => {
    setActivePersonaId(id);
    setStudioResult(null);
    setStudioError("");
    router.replace(`/studio/writing?tab=lab&persona=${encodeURIComponent(id)}`, { scroll: false });
  };

  /** Switch back to built-in modes (dropdown “Prebuilt”). */
  const useStudioModesOnly = useCallback(() => {
    setActivePersonaId(null);
    setStudioResult(null);
    setStudioError("");
    router.replace(`/studio/writing?tab=lab&rewriteMode=${encodeURIComponent(studioMode)}`, { scroll: false });
  }, [router, studioMode]);

  const openPersonaModal = () => {
    setPersonaModalTab("ai");
    setPersonaAiDescription("");
    setPersonaFormName("");
    setPersonaFormInstructions("");
    setPersonaModalError("");
    setPersonaModalOpen(true);
  };

  const generatePersonaDraft = async () => {
    const d = personaAiDescription.trim();
    if (d.length < 8) return;
    setPersonaGenLoading(true);
    try {
      const res = await fetch("/api/transform-personas/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: d }),
      });
      const data = (await res.json()) as {
        draft?: { name: string; instructions: string };
        error?: string;
      };
      if (!res.ok) throw new Error(data.error || "Generation failed");
      if (!data.draft) throw new Error("No draft returned");
      setPersonaFormName(data.draft.name);
      setPersonaFormInstructions(data.draft.instructions);
      setPersonaModalError("");
    } catch (e) {
      setPersonaModalError(e instanceof Error ? e.message : "Persona generation failed");
    } finally {
      setPersonaGenLoading(false);
    }
  };

  const savePersonaFromModal = async () => {
    const name = personaFormName.trim();
    const instructions = personaFormInstructions.trim();
    if (!name || !instructions) return;
    setPersonaSaveLoading(true);
    try {
      const res = await fetch("/api/transform-personas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, instructions }),
      });
      const data = (await res.json()) as { persona?: TransformPersonaRow; error?: string };
      if (!res.ok) throw new Error(data.error || "Save failed");
      if (!data.persona?.id) throw new Error("No persona returned");
      await loadPersonas();
      setPersonaModalOpen(false);
      selectPersona(data.persona.id);
    } catch (e) {
      setPersonaModalError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setPersonaSaveLoading(false);
    }
  };

  const deletePersona = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this persona?")) return;
    setPersonaDeletingId(id);
    try {
      const res = await fetch(`/api/transform-personas/${encodeURIComponent(id)}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error || "Delete failed");
      }
      if (activePersonaId === id) {
        setActivePersonaId(null);
        router.replace(`/studio/writing?tab=lab&rewriteMode=${encodeURIComponent(studioMode)}`, { scroll: false });
      }
      await loadPersonas();
    } catch (err) {
      setStudioError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setPersonaDeletingId(null);
    }
  };

  const severityConfig = {
    critical: { icon: AlertTriangle, color: "text-zinc-800", bg: "bg-zinc-100", border: "border-zinc-300", label: "Harmful / Toxic" },
    warning: { icon: AlertCircle, color: "text-zinc-700", bg: "bg-zinc-100", border: "border-zinc-300", label: "Unclear / Risky" },
    info: { icon: Info, color: "text-zinc-800", bg: "bg-zinc-100", border: "border-zinc-200", label: "Suggestion" },
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981";
    if (score >= 60) return "#F59E0B";
    return "#F43F5E";
  };

  const getRiskColor = (score: number) => {
    if (score <= 20) return "#10B981";
    if (score <= 50) return "#F59E0B";
    return "#F43F5E";
  };

  const highlightText = (inputText: string, flags: Flag[]) => {
    if (!flags?.length) return inputText;
    let highlighted = inputText;
    const sortedFlags = [...flags].sort((a, b) => b.text.length - a.text.length);
    for (const flag of sortedFlags) {
      if (!flag.text) continue;
      const escaped = flag.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escaped})`, "gi");
      const cls = flag.severity === "critical" ? "highlight-danger" : flag.severity === "warning" ? "highlight-warning" : "highlight-info";
      highlighted = highlighted.replace(regex, `<span class="${cls}" title="${flag.explanation}">$1</span>`);
    }
    return highlighted;
  };

  const riskConfig = riskResult ? (RISK_COLORS[riskResult.riskLevel] || RISK_COLORS.low) : RISK_COLORS.low;
  const assessment = intentResult ? (ASSESSMENT_CONFIG[intentResult.overallAssessment] || ASSESSMENT_CONFIG.neutral) : null;

  const getAiProbStyle = (prob: number) => {
    if (prob <= 30) return { text: "text-emerald-800", bg: "bg-emerald-500", ring: "#10B981" };
    if (prob <= 60) return { text: "text-amber-900", bg: "bg-amber-500", ring: "#F59E0B" };
    return { text: "text-rose-900", bg: "bg-rose-500", ring: "#F43F5E" };
  };

  const verdictLabels: Record<string, string> = {
    likely_human: "Likely human-written",
    mixed: "Mixed content",
    likely_ai: "Likely AI-generated",
    definitely_ai: "Almost certainly AI",
  };

  const aiRingCircumference = 2 * Math.PI * 40;

  const canUseExportActions = exportUnlocked && Boolean(getExportPlainText());
  const exportToolbar = (
    <div
      className={cn(
        "pointer-events-none absolute right-2 top-2 z-10 flex items-center gap-px rounded-lg border p-0.5 shadow-sm sm:right-2.5 sm:top-2.5",
        t.borderSub,
        themeMode === "dark" ? "border-white/[0.08] bg-zinc-950/90" : "border-zinc-200/90 bg-white/95",
      )}
      role="toolbar"
      aria-label="Export"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={copyWorkspaceText}
        disabled={!canUseExportActions}
        title={canUseExportActions ? "Copy text" : "Run Transform or Generate with AI first"}
        className={cn(
          "pointer-events-auto h-8 w-8 text-inherit hover:bg-black/[0.06] dark:hover:bg-white/[0.08]",
          t.text,
          !canUseExportActions && "pointer-events-none opacity-35",
        )}
        aria-label="Copy text"
      >
        <Copy className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setTtsOpen(true)}
        disabled={!text.trim()}
        title={text.trim() ? "Speech synthesis" : "Add text to enable speech"}
        className={cn(
          "pointer-events-auto h-8 w-8 text-inherit hover:bg-black/[0.06] dark:hover:bg-white/[0.08]",
          t.text,
          !canUseExportActions && "pointer-events-none opacity-35",
        )}
        aria-label="Speech synthesis"
      >
        <Volume2 className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={downloadWorkspaceTxt}
        disabled={!canUseExportActions}
        title={canUseExportActions ? "Download .txt" : "Run Transform or Generate with AI first"}
        className={cn(
          "pointer-events-auto h-8 w-8 text-inherit hover:bg-black/[0.06] dark:hover:bg-white/[0.08]",
          t.text,
          !canUseExportActions && "pointer-events-none opacity-35",
        )}
        aria-label="Download text file"
      >
        <Download className="h-3.5 w-3.5" />
      </Button>
      <Separator orientation="vertical" className="mx-0.5 h-5 bg-zinc-200/80 dark:bg-white/15" />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled
        title="PDF export coming soon"
        className={cn("pointer-events-auto h-8 w-8 cursor-not-allowed opacity-35", t.muted)}
        aria-label="PDF export coming soon"
      >
        <FileType className="h-3.5 w-3.5" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled
        title="Word export coming soon"
        className={cn("pointer-events-auto h-8 w-8 cursor-not-allowed opacity-35", t.muted)}
        aria-label="Word export coming soon"
      >
        <FileText className="h-3.5 w-3.5" />
      </Button>
    </div>
  );

  return (
    <div className={cn("flex flex-1 flex-col overflow-hidden", t.shell)}>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
        <div className={cn("flex min-h-0 flex-1 flex-col overflow-hidden", t.workspaceSurface)}>
          <div className="relative shrink-0 px-3 py-2 sm:px-4 sm:py-2.5">
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full blur-3xl opacity-40",
                themeMode === "dark" ? "bg-[var(--brand-teal)]/[0.04]" : "bg-[var(--brand-teal)]/[0.06]",
              )}
            />
            <div className="relative flex flex-col gap-3" aria-label="Transform">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className={cn("text-xs font-medium tracking-wide", t.muted2)}>Learning console</p>
                    <Badge variant="outline" className={cn("h-5 border px-2 text-[10px] font-semibold uppercase tracking-wider", t.borderSub, t.muted2)}>
                      Draft
                    </Badge>
                  </div>
                  <p className={cn("max-w-xl text-sm leading-relaxed", t.muted)}>
                    Write in the canvas, tune tone with AI rewrite modes, then export or listen with speech.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className={cn("text-[11px] font-medium", t.muted2)}>AI Rewrite Tone</Label>
                <ToggleGroup
                  type="single"
                  value={studioMode}
                  onValueChange={(v) => {
                    if (v) selectStudioMode(v as RewriteMode);
                  }}
                  disabled={Boolean(activePersonaId)}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "w-full justify-start rounded-lg border p-1",
                    t.borderSub,
                    themeMode === "dark" ? "bg-white/[0.03]" : "bg-zinc-50/80",
                  )}
                >
                  {STUDIO_MODES.map((m) => {
                    const Icon = m.icon;
                    return (
                      <ToggleGroupItem
                        key={m.id}
                        value={m.id}
                        title={m.desc}
                        className={cn(
                          "h-8 gap-1.5 border-0 px-2 shadow-none data-[state=on]:bg-[var(--brand-teal)]/15 data-[state=on]:text-[var(--brand-teal)]",
                          t.text,
                          themeMode === "dark"
                            ? "text-[#B9B7B0] hover:bg-white/[0.06] hover:text-[#F6F4EF]"
                            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                        )}
                      >
                        <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                        <span className="whitespace-nowrap text-[11px] font-medium">{m.label}</span>
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </div>

              <Separator className={themeMode === "dark" ? "bg-white/10" : "bg-zinc-200"} />

              <div className="flex flex-wrap items-center gap-2">
                {personasLoading ? <Loader2 className={cn("h-3.5 w-3.5 shrink-0 animate-spin", t.muted)} /> : null}
                <div
                  className={cn(
                    "inline-flex min-w-0 items-stretch overflow-hidden rounded-lg",
                    themeMode === "dark" ? "bg-white/[0.04] ring-1 ring-white/[0.08]" : "bg-zinc-100/80 ring-1 ring-zinc-200/80",
                  )}
                  title="Saved personas — use with Prebuilt or Neutral"
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => openPersonaModal()}
                    className={cn(
                      "h-[38px] shrink-0 rounded-none rounded-l-lg border-0 border-r px-2.5 text-[11px] font-semibold sm:px-3",
                      themeMode === "dark" ? "border-white/[0.1] hover:bg-white/[0.06]" : "border-zinc-200/70 hover:bg-zinc-200/50",
                      t.muted,
                      t.text,
                    )}
                  >
                    <Plus className="mr-1 h-3.5 w-3.5 shrink-0" />
                    <span className="max-w-[5.5rem] truncate sm:max-w-none">New persona</span>
                  </Button>
                  <label htmlFor="saved-persona-select" className="sr-only">
                    Prebuilt or saved persona
                  </label>
                  <div className="relative min-w-0">
                    <select
                      id="saved-persona-select"
                      value={activePersonaId ?? ""}
                      disabled={personas.length === 0 || personasLoading}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (!v) useStudioModesOnly();
                        else selectPersona(v);
                      }}
                      className={cn(
                        "h-[38px] min-w-[5.5rem] max-w-[9rem] cursor-pointer appearance-none truncate border-0 bg-transparent py-2 pl-2 pr-7 text-[11px] font-semibold outline-none transition sm:min-w-[7rem] sm:max-w-[11rem]",
                        t.text,
                        activePersonaId ? "text-[var(--brand-magenta)]" : t.muted,
                        (personas.length === 0 || personasLoading) && "cursor-not-allowed opacity-45",
                      )}
                    >
                      <option value="">Prebuilt</option>
                      {personas.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      className={cn(
                        "pointer-events-none absolute right-1.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 opacity-45",
                        t.muted,
                      )}
                      aria-hidden
                    />
                  </div>
                  {activePersonaId ? (
                    <button
                      type="button"
                      title="Delete this persona"
                      disabled={personaDeletingId === activePersonaId}
                      onClick={(e) => void deletePersona(activePersonaId, e)}
                      className={cn(
                        "inline-flex w-9 shrink-0 items-center justify-center border-l border-zinc-200/70 transition disabled:opacity-40 dark:border-white/[0.1]",
                        t.muted,
                        t.navHover,
                      )}
                    >
                      {personaDeletingId === activePersonaId ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  ) : null}
                </div>

                <div className="inline-flex shrink-0 items-center gap-0 rounded-lg shadow-sm ring-1 ring-inset ring-black/[0.06] dark:ring-white/[0.1]">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setTtsOpen(true)}
                    disabled={!text.trim()}
                    className={cn(
                      "rounded-r-none border-r-0 text-[12px] font-semibold shadow-none",
                      t.borderSub,
                      t.text,
                      themeMode === "dark" ? "hover:bg-white/[0.06]" : "hover:bg-zinc-50",
                    )}
                  >
                    <Volume2 className="mr-1.5 h-4 w-4" />
                    Speech
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => void handleStudioRewrite()}
                    disabled={!text.trim() || studioLoading}
                    title={!text.trim() ? "Add text in the console below to improve" : undefined}
                    className={cn(
                      "rounded-l-none border-0 bg-[var(--brand-teal)] text-[#0C0C0B] shadow-none hover:brightness-105 disabled:opacity-45",
                      "text-[12px] font-semibold",
                    )}
                  >
                    {studioLoading ? <Loader2 className="mr-1.5 h-4 w-4 animate-spin" /> : <PenTool className="mr-1.5 h-4 w-4" />}
                    {studioLoading ? "Improving…" : "Improve draft"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {historyDraftMissing && (
            <div className="px-3 pb-2 sm:px-4">
              <p className={cn("text-[11px] leading-snug", t.muted2)}>
                This run has no saved draft in the database (often older saves). New analyses save the text automatically so history can reopen it.
              </p>
            </div>
          )}

          <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-5">
            {commResult ? (
              <div className="min-h-full">
                <div
                  className={cn(
                    "mb-4 rounded-xl border border-[var(--brand-teal)]/35 px-4 py-3 sm:px-5",
                    themeMode === "dark" ? "bg-[var(--brand-teal)]/[0.06]" : "bg-[var(--brand-teal)]/[0.08]",
                  )}
                >
                  <p className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Coach highlights</p>
                  <p className={cn("mt-1 text-[12px] leading-relaxed", t.muted)}>
                    Phrase-level notes from Writing fundamentals. Use skill checks for safety, intent, and originality.
                  </p>
                </div>
                <div className="relative">
                  {exportToolbar}
                  <div
                    className={cn(
                      "rounded-2xl border px-4 py-4 pr-12 shadow-sm sm:px-5 sm:py-5 sm:pr-14",
                      t.borderSub,
                      t.composerInset,
                      "whitespace-pre-wrap text-[14px] leading-[1.85]",
                      t.text,
                    )}
                    dangerouslySetInnerHTML={{ __html: highlightText(text, commResult.flags) }}
                  />
                </div>
              </div>
            ) : (
              <div
                className="flex min-h-0 flex-1 flex-col gap-3"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  void applyUploadedFiles(e.dataTransfer.files);
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.md,.markdown,.html,.htm,.csv,.json,.docx,.pdf,text/plain,text/html,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf"
                  className="sr-only"
                  aria-hidden
                  tabIndex={-1}
                  onChange={(e) => {
                    void applyUploadedFiles(e.target.files);
                    e.target.value = "";
                  }}
                />
                <div
                  className={cn(
                    "flex shrink-0 flex-col gap-3 rounded-xl border px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4",
                    t.borderSub,
                    themeMode === "dark" ? "bg-white/[0.03]" : "bg-[var(--brand-teal)]/[0.05]",
                  )}
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Write or upload</p>
                    <p className={cn("text-[12px] leading-snug", t.muted)}>
                      <span className="inline-flex flex-wrap items-center gap-x-1.5 gap-y-1">
                        <ClipboardPaste className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
                        Paste or type, <span className={cn("font-semibold", t.text)}>upload</span> a file (.txt, .md, .html, .docx, .pdf). Empty?{" "}
                        <span className={cn("font-semibold", t.text)}>Generate with AI</span> from a short brief below.
                      </span>
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    {uploadingFile ? (
                      <span className={cn("inline-flex items-center gap-2 text-[12px] font-semibold", t.muted)}>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                        Reading file…
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingFile}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[12px] font-semibold transition disabled:opacity-45",
                        t.borderSub,
                        t.text,
                        t.navHover,
                      )}
                    >
                      <Upload className="h-4 w-4" aria-hidden />
                      Upload file
                    </button>
                  </div>
                </div>

                {uploadError ? (
                  <p className={cn("shrink-0 text-[12px] font-medium", t.danger)} role="alert">
                    {uploadError}
                  </p>
                ) : null}
                <div
                  className={cn(
                    "relative flex w-full flex-1 flex-col overflow-hidden rounded-2xl border shadow-sm",
                    t.borderSub,
                    t.composerInset,
                  )}
                >
                  {exportToolbar}
                  {ttsOpen && (
                    <div className="absolute inset-0 z-20 overflow-y-auto bg-black/5 backdrop-blur-[2px] dark:bg-black/20">
                      <div className="flex min-h-full items-center justify-center p-4 sm:p-8">
                        <div className="w-full max-w-md">
                          <TTSTool 
                            text={getExportPlainText()} 
                            themeMode={themeMode} 
                            onClose={() => setTtsOpen(false)} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <textarea
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      if (historyDraftMissing) setHistoryDraftMissing(false);
                    }}
                    placeholder={
                      "Paste, type, or upload a draft above.\n\nWhen the console is empty, use Generate with AI below for a first draft from instructions. After you have text, use Improve draft above."
                    }
                    className={cn(
                      "min-h-[min(34vh,260px)] w-full flex-1 resize-y border-0 bg-transparent px-4 py-4 pr-12 text-[14px] leading-relaxed outline-none transition-[box-shadow] focus:ring-2 focus:ring-inset focus:ring-zinc-400/25 dark:focus:ring-white/15 sm:min-h-[min(40vh,360px)] sm:pr-14",
                      t.text,
                      "placeholder:opacity-35",
                      text.trim() ? "rounded-2xl" : "rounded-t-2xl rounded-b-none",
                    )}
                  />
                  {!text.trim() ? (
                    <div
                      className={cn(
                        "flex shrink-0 flex-col gap-3 border-t px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4",
                        themeMode === "dark" ? "border-white/[0.08] bg-white/[0.03]" : "border-zinc-200/80 bg-[var(--brand-teal)]/[0.04]",
                      )}
                    >
                      <div className="min-w-0 space-y-0.5">
                        <p className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Create a new draft</p>
                        <p className={cn("text-[12px] leading-snug", t.muted)}>
                          Generate a first draft from a short prompt — then refine with AI and skill checks.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={openGenerateWorkspace}
                        className={cn(
                          "inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13px] font-semibold shadow-sm transition sm:w-auto",
                          t.btnPrimary,
                        )}
                      >
                        <Sparkles className="h-4 w-4 opacity-90" aria-hidden />
                        Generate with AI
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>

          {(studioLoading || studioError || studioResult) && (
            <div className={cn("flex min-h-0 max-h-[min(34vh,280px)] shrink-0 flex-col border-t pt-1", t.workspaceSurface, t.borderSub)}>
              <div className={cn("flex shrink-0 items-center justify-between gap-2 px-4 py-2 sm:px-5")}>
                <span className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Generated text</span>
                {studioResult?.rewritten ? (
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      type="button"
                      onClick={() => setShowStudioChanges(!showStudioChanges)}
                      className={cn("text-[11px] font-semibold", t.muted, t.navHover)}
                    >
                      {showStudioChanges ? "Hide changes" : "Show changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (studioResult.rewritten) {
                          navigator.clipboard.writeText(studioResult.rewritten);
                          setStudioCopied(true);
                          setTimeout(() => setStudioCopied(false), 2000);
                        }
                      }}
                      className={cn("flex items-center gap-1 text-[11px] font-semibold", t.muted, t.navHover)}
                    >
                      {studioCopied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      {studioCopied ? "Copied" : "Copy"}
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="min-h-0 flex-1 overflow-auto px-4 pb-3 sm:px-5">
                {studioLoading && (
                  <div className="flex min-h-[100px] flex-col items-center justify-center gap-3 py-4">
                    <Loader2 className={cn("h-7 w-7 animate-spin", t.info)} />
                    <p className={cn("text-center text-[12px] font-medium", t.muted)}>
                      Crafting your{" "}
                      {activePersonaId
                        ? (personas.find((p) => p.id === activePersonaId)?.name ?? "persona")
                        : (STUDIO_MODES.find((x) => x.id === studioMode)?.label.toLowerCase() ?? "text")}{" "}
                      version…
                    </p>
                  </div>
                )}
                {studioError && (
                  <div className={cn("rounded-xl border p-3", t.border)}>
                    <p className={cn("text-[12px] font-semibold", t.danger)}>{studioError}</p>
                  </div>
                )}
                {studioResult && !showStudioChanges && studioResult.rewritten && (
                  <p className={cn("whitespace-pre-wrap text-[13px] leading-[1.75]", t.text)}>{studioResult.rewritten}</p>
                )}
                {studioResult && showStudioChanges && studioResult.changes && studioResult.changes.length > 0 && (
                  <div className="space-y-2">
                    {studioResult.changes.map((c, i) => (
                      <div key={i} className={cn("overflow-hidden rounded-xl border", t.border, t.s3)}>
                        <div className={cn("border-b px-3 py-1.5", t.border)}>
                          <p className={cn("text-[11px] line-through", t.muted)}>{c.original}</p>
                        </div>
                        <div className={cn("border-b px-3 py-1.5", t.border)}>
                          <p className={cn("text-[11px] font-semibold", t.text)}>{c.rewritten}</p>
                        </div>
                        <div className="px-3 py-1.5">
                          <p className={cn("text-[10px]", t.muted2)}>{c.reason}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {studioResult?.rewritten && (
                <div className={cn("flex shrink-0 flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-5", t.s1)}>
                  <span className={cn(t.mono, "text-[10px] tabular-nums", t.muted2)}>
                    {studioResult.wordCountRewritten != null ? `${studioResult.wordCountRewritten} w` : ""}
                    {studioResult.wordCountOriginal != null && studioResult.wordCountRewritten != null && (
                      <span className="ml-1">
                        ({studioResult.wordCountRewritten > studioResult.wordCountOriginal ? "+" : ""}
                        {studioResult.wordCountRewritten - studioResult.wordCountOriginal})
                      </span>
                    )}
                  </span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const next = studioResult.rewritten?.trim();
                        if (next) {
                          setText(next);
                          setExportUnlocked(true);
                          clearAnalysis();
                          setStudioResult(null);
                          setShowStudioChanges(false);
                        }
                      }}
                      className={cn(
                        "rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition-colors",
                        t.borderSub,
                        t.text,
                        t.navHover,
                      )}
                    >
                      Apply to source
                    </button>
                    <button
                      type="button"
                      onClick={openGeneratorWithText}
                      className={cn(
                        "rounded-lg border px-2.5 py-1 text-[10px] font-semibold transition-colors",
                        t.borderSub,
                        t.text,
                        t.navHover,
                      )}
                    >
                      Generate with AI
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleStudioRewrite()}
                      disabled={studioLoading}
                      className={cn(
                        "inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[10px] font-semibold disabled:opacity-45",
                        t.muted,
                        t.navHover,
                      )}
                    >
                      <RefreshCw className="h-3 w-3" />
                      Regenerate
                    </button>
                  </div>
                </div>
              )}
              {studioResult?.summary ? (
                <div className={cn("shrink-0 px-4 py-2 sm:px-5", t.s1)}>
                  <p className={cn("text-[10px] font-medium leading-snug", t.muted)}>
                    <Sparkles className="mr-1 inline h-3 w-3 text-[var(--brand-teal)]" />
                    {studioResult.summary}
                    {studioResult.toneShift ? (
                      <span className={cn("ml-1.5 font-normal", t.muted2)}>· {studioResult.toneShift}</span>
                    ) : null}
                  </p>
                </div>
              ) : null}
            </div>
          )}

          <div className={cn("flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 sm:px-5", t.workspaceSurface)}>
            <span className={cn(t.mono, "text-[11px] tabular-nums", t.muted2)}>
              {text.trim() ? `${text.trim().split(/\s+/).length} words` : "No text"}
            </span>
            {hasAnyResult && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => clearAnalysis()}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-[11px] font-semibold transition-colors",
                    t.borderSub,
                    t.muted,
                    t.navHover,
                  )}
                >
                  Edit text
                </button>
                {selectedTool && hasResultForTool(selectedTool) && (
                  <button
                    type="button"
                    onClick={() => void runTool(selectedTool)}
                    disabled={!text.trim() || Boolean(loadingTools[selectedTool])}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-[11px] font-semibold disabled:opacity-45",
                      t.text,
                      t.navHover,
                    )}
                  >
                    Refresh
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        <div
          className={cn(
            "flex w-full shrink-0 flex-col overflow-hidden lg:w-[min(100%,480px)] lg:max-w-[480px]",
            t.workspaceSurface,
          )}
        >
          <div className="shrink-0 px-4 py-3 sm:py-3.5">
            <div>
              <p className={cn("text-xs font-medium", t.muted2)}>Workspace Copilot</p>
              <h2 className={cn("mt-0.5 text-sm font-semibold tracking-tight sm:text-base", t.text)}>
                AI Custom Instructions
              </h2>
            </div>
          </div>

          <div className={cn("flex-1 space-y-5 overflow-y-auto px-4 pb-5 pt-2 lg:pt-1", t.scrollbar)}>
            <section className={assistantSectionClass} aria-labelledby="assistant-unified-title">
              <h3 id="assistant-unified-title" className={cn("text-sm font-semibold", t.text)}>
                AI Assistant
              </h3>
              <p className={cn("mt-1 text-xs leading-relaxed", t.muted2)}>
                Add specific directions for how the AI should rewrite or structure your text.
              </p>
              <div className="mt-3">
                <Label htmlFor="console-task" className={cn("mb-1 block text-[10px] font-bold uppercase tracking-wider", t.text)}>
                  Custom rewrite instructions
                </Label>
                <Textarea
                  id="console-task"
                  value={consoleTask}
                  onChange={(e) => setConsoleTask(e.target.value)}
                  rows={3}
                  placeholder="Example: Make the tone more executive and summarize the text into three bullet points…"
                  className={cn("min-h-[88px] resize-y text-[13px] leading-relaxed transition-[box-shadow] focus:ring-2 focus:ring-inset focus:ring-zinc-400/25 dark:focus:ring-white/15", t.input)}
                />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => void runRefinePrompt()}
                  disabled={refineLoading || !taskForConsole()}
                  title="Expand into a structured prompt"
                  className={cn("w-full justify-center gap-1.5 shadow-none px-2", t.borderSub, t.text, "hover:bg-black/[0.04] dark:hover:bg-white/[0.06]")}
                >
                  {refineLoading ? <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" /> : <Wand2 className="h-3.5 w-3.5 shrink-0" />}
                  <span className="truncate">Refine instructions</span>
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => void handleStudioRewrite()}
                  disabled={!text.trim() || studioLoading}
                  title="Apply instructions to the canvas draft"
                  className={cn("w-full justify-center gap-1.5 border-0 bg-[var(--brand-teal)] text-[#0C0C0B] shadow-none hover:brightness-105 px-2")}
                >
                  {studioLoading ? <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" /> : <PenTool className="h-3.5 w-3.5 shrink-0" />}
                  <span className="truncate">Apply to draft</span>
                </Button>
              </div>
              
              {refineError ? (
                <p className={cn("mt-3 text-xs font-medium", t.danger)} role="alert">
                  {refineError}
                </p>
              ) : null}
              {refinedOutput ? (
                <div
                  className={cn(
                    "mt-3 space-y-2 rounded-xl p-3",
                    themeMode === "light"
                      ? "shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] ring-1 ring-zinc-900/[0.05]"
                      : "shadow-[inset_0_1px_3px_rgba(0,0,0,0.35)] ring-1 ring-white/[0.06]",
                  )}
                >
                  <p className={cn("text-[10px] font-semibold uppercase tracking-wider", t.muted2)}>Refined Prompt</p>
                  <p className={cn("whitespace-pre-wrap text-xs leading-relaxed sm:text-sm", t.text)}>{refinedOutput.refined}</p>
                  {refinedOutput.notes ? (
                    <p className={cn("text-[11px] leading-snug", t.muted2)}>{refinedOutput.notes}</p>
                  ) : null}
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    className={cn("h-auto p-0 text-xs", t.muted)}
                    onClick={() => {
                      setConsoleTask(refinedOutput.refined);
                      setRefinedOutput(null);
                    }}
                  >
                    Use as input
                  </Button>
                </div>
              ) : null}
            </section>

            <p
              className={cn(
                "rounded-2xl px-3 py-2.5 text-[11px] leading-relaxed",
                themeMode === "light"
                  ? "text-zinc-500 shadow-[0_1px_8px_-2px_rgba(15,23,42,0.06)] ring-1 ring-zinc-900/[0.04]"
                  : "text-[#8A8880] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.05]",
              )}
            >
              Text generation and coaching use your existing API defaults. Multi-model compare is off until deployments are ready. Speech uses the voice picker only.
            </p>
          </div>
        </div>
      </div>

      {aiGenerateModalOpen ? (
        <div
          className="fixed inset-0 z-[190] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ai-generate-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
            aria-label="Close"
            onClick={() => setAiGenerateModalOpen(false)}
          />
          <div
            id="console-ai-generate"
            className={cn(
              "relative z-10 flex max-h-[min(92vh,760px)] w-full max-w-xl flex-col overflow-hidden rounded-2xl border shadow-2xl ring-1 ring-[var(--brand-teal)]/15",
              t.s1,
              t.border,
            )}
          >
            <div
              className={cn(
                "relative shrink-0 overflow-hidden border-b px-5 py-4 sm:px-6",
                t.border,
                themeMode === "dark"
                  ? "bg-gradient-to-br from-[var(--brand-teal)]/[0.12] via-transparent to-[var(--brand-magenta)]/[0.06]"
                  : "bg-gradient-to-br from-[var(--brand-teal)]/[0.08] via-white to-[var(--brand-magenta)]/[0.04]",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-start gap-3">
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                      themeMode === "dark" ? "bg-[var(--brand-teal)]/15 text-[var(--brand-teal)]" : "bg-[var(--brand-teal)]/12 text-[#0d6b5c]",
                    )}
                  >
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 id="ai-generate-modal-title" className={cn("text-base font-semibold tracking-tight", t.text)}>
                      Generate with AI
                    </h2>
                    <p className={cn("mt-1 max-w-md text-[12px] leading-relaxed", t.muted)}>
                      Describe what you need — we&apos;ll draft text you can insert into the console, then coach or refine.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setAiGenerateModalOpen(false)}
                  className={cn("shrink-0 rounded-lg p-1.5 transition", t.muted, t.navHover)}
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-5">
              <div className="flex flex-wrap gap-2">
                {AI_GENERATE_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    onClick={() => applyGenTemplate(tpl.seed)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors",
                      t.borderSub,
                      t.muted,
                      t.navHover,
                    )}
                  >
                    {tpl.label}
                  </button>
                ))}
              </div>
              <textarea
                value={genPrompt}
                onChange={(e) => setGenPrompt(e.target.value)}
                placeholder="What are you writing? Include context, claims you can support, audience, channel, and constraints."
                className={cn(
                  "mt-4 min-h-[132px] w-full resize-y rounded-xl border px-3 py-3 text-[13px] leading-relaxed outline-none transition-[box-shadow] focus:ring-2 focus:ring-[var(--brand-teal)]/25 dark:focus:ring-white/15",
                  t.borderSub,
                  t.workspaceSurface,
                  t.text,
                  "placeholder:opacity-45",
                )}
              />
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className={cn("mb-1 block text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Industry</label>
                  <input
                    value={genIndustry}
                    onChange={(e) => setGenIndustry(e.target.value)}
                    className={cn("w-full rounded-xl border px-3 py-2 text-[13px] outline-none", t.input)}
                    placeholder="e.g. Fintech"
                  />
                </div>
                <div>
                  <label className={cn("mb-1 block text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Audience</label>
                  <input
                    value={genAudience}
                    onChange={(e) => setGenAudience(e.target.value)}
                    className={cn("w-full rounded-xl border px-3 py-2 text-[13px] outline-none", t.input)}
                    placeholder="e.g. Investors"
                  />
                </div>
                <div>
                  <label className={cn("mb-1 block text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Tone</label>
                  <input
                    value={genTone}
                    onChange={(e) => setGenTone(e.target.value)}
                    className={cn("w-full rounded-xl border px-3 py-2 text-[13px] outline-none", t.input)}
                    placeholder="Professional"
                  />
                </div>
                <div>
                  <label className={cn("mb-1 block text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Keyword (optional)</label>
                  <input
                    value={genKeyword}
                    onChange={(e) => setGenKeyword(e.target.value)}
                    className={cn("w-full rounded-xl border px-3 py-2 text-[13px] outline-none", t.input)}
                    placeholder="Optional"
                  />
                </div>
              </div>
              {genError ? (
                <p className={cn("mt-3 rounded-lg border px-3 py-2 text-[12px] font-medium", t.border, t.danger)} role="alert">
                  {genError}
                </p>
              ) : null}
              {genPreview ? (
                <div className={cn("mt-4 rounded-xl border p-4", t.border, t.s2)}>
                  <p className={cn("text-[10px] font-bold uppercase tracking-[0.14em]", t.muted2)}>Preview</p>
                  <p className={cn("mt-1 text-[15px] font-semibold tracking-tight", t.text)}>{genPreview.title}</p>
                  {genPreview.notes ? <p className={cn("mt-2 text-[12px] leading-relaxed", t.muted)}>{genPreview.notes}</p> : null}
                  <div
                    className={cn("prose prose-sm mt-3 max-w-none text-[13px] leading-relaxed", t.text)}
                    dangerouslySetInnerHTML={{ __html: genPreview.html }}
                  />
                </div>
              ) : null}
            </div>
            <div className={cn("flex shrink-0 flex-wrap items-center justify-end gap-2 border-t px-5 py-3.5 sm:px-6", t.border, t.s1)}>
              <button
                type="button"
                onClick={() => setAiGenerateModalOpen(false)}
                className={cn("rounded-xl border px-4 py-2.5 text-[12px] font-semibold", t.borderSub, t.muted, t.navHover)}
              >
                Cancel
              </button>
              {genPreview?.html ? (
                <button
                  type="button"
                  onClick={insertGeneratedIntoWorkspace}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-xl border px-4 py-2.5 text-[12px] font-semibold",
                    t.borderSub,
                    t.text,
                    t.navHover,
                  )}
                >
                  <Wand2 className="h-3.5 w-3.5" />
                  Insert into console
                </button>
              ) : null}
              <button
                type="button"
                onClick={() => void runWorkspaceGenerate()}
                disabled={!genPrompt.trim() || genLoading}
                className={cn(
                  "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold shadow-sm transition disabled:opacity-45",
                  t.btnPrimary,
                )}
              >
                {genLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 opacity-90" />}
                {genLoading ? "Generating…" : "Generate first draft"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {personaModalOpen ? (
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="persona-modal-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50"
            aria-label="Close"
            onClick={() => setPersonaModalOpen(false)}
          />
          <div
            className={cn(
              "relative z-10 flex max-h-[min(90vh,640px)] w-full max-w-lg flex-col rounded-xl border shadow-xl",
              t.s1,
              t.border,
            )}
          >
            <div className={cn("flex items-center justify-between border-b px-4 py-3", t.border)}>
              <h2 id="persona-modal-title" className={cn("text-sm font-semibold", t.text)}>
                New transform persona
              </h2>
              <button
                type="button"
                onClick={() => setPersonaModalOpen(false)}
                className={cn("rounded p-1", t.muted, t.navHover)}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className={cn("flex border-b", t.border)}>
              <button
                type="button"
                onClick={() => setPersonaModalTab("ai")}
                className={cn(
                  "flex-1 px-3 py-2 text-[11px] font-semibold",
                  personaModalTab === "ai" ? cn(t.text, t.s2) : cn(t.muted, t.navHover),
                )}
              >
                Generate with AI
              </button>
              <button
                type="button"
                onClick={() => setPersonaModalTab("manual")}
                className={cn(
                  "flex-1 px-3 py-2 text-[11px] font-semibold",
                  personaModalTab === "manual" ? cn(t.text, t.s2) : cn(t.muted, t.navHover),
                )}
              >
                Manual
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-4">
              {personaModalError ? (
                <p className={cn("mb-3 rounded-lg border px-3 py-2 text-[12px]", t.border, t.danger)} role="alert">
                  {personaModalError}
                </p>
              ) : null}
              {personaModalTab === "ai" ? (
                <div className="space-y-3">
                  <p className={cn("text-[11px] leading-relaxed", t.muted)}>
                    Describe who this voice is for or how it should sound. We&apos;ll draft a name and rewriter instructions you can edit before saving.
                  </p>
                  <textarea
                    value={personaAiDescription}
                    onChange={(e) => setPersonaAiDescription(e.target.value)}
                    placeholder="e.g. Our general counsel — concise, cautious, no hype; or friendly onboarding for new customers…"
                    rows={4}
                    className={cn(
                      "w-full resize-y rounded-lg border px-3 py-2 text-[13px] outline-none",
                      t.input,
                    )}
                  />
                  <button
                    type="button"
                    disabled={personaAiDescription.trim().length < 8 || personaGenLoading}
                    onClick={() => void generatePersonaDraft()}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[12px] font-semibold disabled:opacity-45",
                      t.btnPrimary,
                    )}
                  >
                    {personaGenLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    Generate draft
                  </button>
                </div>
              ) : null}
              {(personaModalTab === "manual" || (personaModalTab === "ai" && (personaFormName || personaFormInstructions))) ? (
                <div className={cn("space-y-3", personaModalTab === "ai" ? "mt-4 border-t pt-4" : "", t.border)}>
                  <div>
                    <label htmlFor="persona-name" className={cn("mb-1 block text-[10px] font-bold uppercase tracking-wider", t.muted2)}>
                      Name
                    </label>
                    <input
                      id="persona-name"
                      value={personaFormName}
                      onChange={(e) => setPersonaFormName(e.target.value)}
                      className={cn("w-full rounded-lg border px-3 py-2 text-[13px] outline-none", t.input)}
                      placeholder="e.g. Legal review tone"
                    />
                  </div>
                  <div>
                    <label htmlFor="persona-instructions" className={cn("mb-1 block text-[10px] font-bold uppercase tracking-wider", t.muted2)}>
                      Rewriter instructions
                    </label>
                    <textarea
                      id="persona-instructions"
                      value={personaFormInstructions}
                      onChange={(e) => setPersonaFormInstructions(e.target.value)}
                      rows={8}
                      className={cn("w-full resize-y rounded-lg border px-3 py-2 text-[13px] leading-relaxed outline-none", t.input)}
                      placeholder="Instructions the model follows when transforming text…"
                    />
                  </div>
                </div>
              ) : null}
            </div>
            <div className={cn("flex justify-end gap-2 border-t px-4 py-3", t.border)}>
              <button
                type="button"
                onClick={() => setPersonaModalOpen(false)}
                className={cn("rounded-lg border px-3 py-2 text-[11px] font-semibold", t.borderSub, t.muted, t.navHover)}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={
                  personaSaveLoading ||
                  !personaFormName.trim() ||
                  !personaFormInstructions.trim()
                }
                onClick={() => void savePersonaFromModal()}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[11px] font-semibold disabled:opacity-45",
                  t.btnPrimary,
                )}
              >
                {personaSaveLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Save persona
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function ArrowRight(props: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
