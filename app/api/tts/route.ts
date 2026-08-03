import { NextResponse } from "next/server";
import {
  getAzureAudioSpeechUrl,
  azureSpeechTranscriptionHeaders,
  getTtsDeploymentName,
  ttsMissingConfigMessage,
} from "@/lib/llm-client";

export const runtime = "nodejs";

/**
 * Text-to-speech (TTS): POST JSON with `text` and optional `voice`.
 * Returns audio binary (MP3).
 */
export async function POST(req: Request) {
  const url = getAzureAudioSpeechUrl();
  if (!url) {
    return NextResponse.json({ error: ttsMissingConfigMessage() }, { status: 503 });
  }

  try {
    const { text, voice = "alloy", speed } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // Clamp speed to the range the OpenAI/Azure speech API accepts (0.25–4.0).
    // Falls back to 1.0 (normal) when omitted or invalid.
    const parsedSpeed = typeof speed === "number" ? speed : Number(speed);
    const safeSpeed = Number.isFinite(parsedSpeed) ? Math.min(4, Math.max(0.25, parsedSpeed)) : 1;

    // Azure OpenAI TTS request body — model must match the deployed TTS model name.
    const body = {
      model: getTtsDeploymentName(),
      voice,
      input: text,
      speed: safeSpeed,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        ...azureSpeechTranscriptionHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `TTS failed: ${errorText || response.statusText}` },
        { status: response.status >= 400 && response.status < 600 ? response.status : 502 },
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Disposition": 'attachment; filename="speech.mp3"',
      },
    });
  } catch (error) {
    const err = error as Error & { cause?: { message?: string; code?: string; errno?: number } };
    const message = err?.message ?? "TTS failed";
    const cause = err?.cause ? (err.cause.message ?? err.cause.code ?? String(err.cause)) : null;
    console.error("TTS route error:", message, "| cause:", cause, "| url:", getAzureAudioSpeechUrl());
    return NextResponse.json({ error: message, cause }, { status: 500 });
  }
}
