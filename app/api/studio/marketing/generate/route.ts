import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { STUDIO_COOKIE, isValidStudioSession } from "@/lib/studio-auth";
import { createChatCompletionsRequest, isLlmConfigured } from "@/lib/llm-client";

export const runtime = "nodejs";

type Brand = {
  name?: string;
  website?: string;
  offer?: string;
  audience?: string;
  proof?: string;
  tone?: string;
};

function clip(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!(await isValidStudioSession((await cookies()).get(STUDIO_COOKIE)?.value))) {
    return NextResponse.json({ error: "Sign in to Studio first." }, { status: 401 });
  }
  if (!isLlmConfigured()) {
    return NextResponse.json({ error: "Campaign generation needs a configured AI provider." }, { status: 503 });
  }

  let body: { mode?: string; brand?: Brand };
  try {
    body = (await request.json()) as { mode?: string; brand?: Brand };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const mode = body.mode === "ads" ? "ads" : "campaigns";
  const brand = {
    name: clip(body.brand?.name, 80) || "the brand",
    website: clip(body.brand?.website, 200),
    offer: clip(body.brand?.offer, 500),
    audience: clip(body.brand?.audience, 400),
    proof: clip(body.brand?.proof, 400),
    tone: clip(body.brand?.tone, 80) || "clear and confident",
  };

  const system =
    mode === "ads"
      ? `You write Google Ads Responsive Search Ad copy that can be pasted into Google Ads.
Return JSON only:
{"finalUrl":string,"path1":string,"path2":string,"headlines":string[15],"descriptions":string[4],"keywords":string[12]}
Rules:
- headlines: exactly 15, each 30 characters or fewer, unique, no punctuation spam.
- descriptions: exactly 4, each 90 characters or fewer.
- path1 and path2: max 15 characters, no slashes or spaces.
- finalUrl must be a full https URL if a website was supplied, otherwise a plausible https URL.
- keywords are search phrases, not hashtags.
- Use only the supplied brand facts. Do not invent awards, prices or claims that are not in the brief.`
      : `You are a marketing strategist. Return JSON only:
{"ideas":[{"name":string,"angle":string,"channel":string,"message":string,"cta":string}]}
Rules:
- Return 4 campaign ideas.
- Channels should be practical (Search, Demand Gen, YouTube, email, landing page, partners).
- Message is the core promise in 1-2 sentences.
- CTA is a specific next action.
- Stay inside the supplied brand facts. Label any stretch as a test, not a claim.`;

  try {
    const { url, init } = createChatCompletionsRequest({
      max_tokens: 1600,
      messages: [
        { role: "system", content: system },
        { role: "user", content: JSON.stringify(brand) },
      ],
    });
    const response = await fetch(url, { ...init, signal: AbortSignal.timeout(60000) });
    if (!response.ok) return NextResponse.json({ error: "Generation is unavailable. Try again." }, { status: 502 });
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json({ error: "Empty generation. Try again." }, { status: 502 });
    }
    const json = content.replace(/^```json\s*|\s*```$/g, "").trim();
    const parsed = JSON.parse(json) as Record<string, unknown>;
    return NextResponse.json(parsed);
  } catch {
    return NextResponse.json({ error: "Generation failed. Check the brand details and try again." }, { status: 500 });
  }
}
