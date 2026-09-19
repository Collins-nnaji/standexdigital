const WRITING_KEY = "standex-studio-writing-handoff";
const MARKETING_KEY = "standex-studio-marketing-handoff";

export type WritingHandoff = {
  text: string;
  title?: string;
  from: "marketing" | "data";
};

export type MarketingHandoff = {
  from: "writing" | "data";
  kind?: "copy" | "workspace" | "campaign";
  text?: string;
  fileName?: string;
};

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    sessionStorage.removeItem(key);
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function handoffToWriting(payload: WritingHandoff) {
  sessionStorage.setItem(WRITING_KEY, JSON.stringify(payload));
}

export function takeWritingHandoff(): WritingHandoff | null {
  return read<WritingHandoff>(WRITING_KEY);
}

export function handoffToMarketing(payload: MarketingHandoff) {
  sessionStorage.setItem(MARKETING_KEY, JSON.stringify(payload));
}

export function takeMarketingHandoff(): MarketingHandoff | null {
  return read<MarketingHandoff>(MARKETING_KEY);
}
