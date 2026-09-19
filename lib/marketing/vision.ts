import { createChatCompletionsRequest, isLlmConfigured } from '@/lib/llm-client';

const dedicatedNames = ['AZURE_OPENAI_VISION_ENDPOINT', 'AZURE_OPENAI_VISION_API_KEY', 'AZURE_OPENAI_VISION_DEPLOYMENT'] as const;
export function usesDedicatedVision() { return dedicatedNames.some(name => Boolean(process.env[name]?.trim())); }
export function isMarketingVisionConfigured() {
  return usesDedicatedVision() ? dedicatedNames.every(name => Boolean(process.env[name]?.trim())) : isLlmConfigured();
}
export function createMarketingVisionRequest(body: Record<string, unknown>) {
  if (!usesDedicatedVision()) return createChatCompletionsRequest({ ...body, ...(process.env.MARKETING_VISION_MODEL?.trim() ? { model: process.env.MARKETING_VISION_MODEL.trim() } : {}) });
  if (!isMarketingVisionConfigured()) throw new Error('Complete all dedicated Azure vision settings.');
  const raw = process.env.AZURE_OPENAI_VISION_ENDPOINT!.trim().replace(/\/$/, '').replace(/\/openai\/v1$/i, '').replace(/\/openai$/i, '');
  const endpoint = new URL(raw);
  if (endpoint.protocol !== 'https:' || endpoint.username || endpoint.password) throw new Error('Vision endpoint must use HTTPS without embedded credentials.');
  const deployment = encodeURIComponent(process.env.AZURE_OPENAI_VISION_DEPLOYMENT!.trim());
  const version = encodeURIComponent(process.env.AZURE_OPENAI_VISION_API_VERSION?.trim() || '2024-10-21');
  const { model: _model, ...payload } = body;
  return { url: `${raw}/openai/deployments/${deployment}/chat/completions?api-version=${version}`, init: { method: 'POST', headers: { 'Content-Type': 'application/json', 'api-key': process.env.AZURE_OPENAI_VISION_API_KEY!.trim() }, body: JSON.stringify(payload) } satisfies RequestInit };
}
