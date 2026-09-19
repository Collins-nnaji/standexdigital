import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { STUDIO_COOKIE, isValidStudioSession } from '@/lib/studio-auth';
import { readImageInput } from '@/lib/marketing/image-input';
export const runtime = 'nodejs';
export async function POST(request: Request) {
  if (!await isValidStudioSession((await cookies()).get(STUDIO_COOKIE)?.value)) return NextResponse.json({ error: 'Sign in to Studio first.' }, { status: 401 });
  const endpoint = process.env.AZURE_AI_VISION_ENDPOINT?.trim(); const key = process.env.AZURE_AI_VISION_KEY?.trim();
  if (!endpoint || !key) return NextResponse.json({ error: 'OCR and object detection need AZURE_AI_VISION_ENDPOINT and AZURE_AI_VISION_KEY from an Azure AI Vision resource.' }, { status: 503 });
  let image: string;
  try { image = await readImageInput(request); } catch (error) { return NextResponse.json({ error: error instanceof SyntaxError ? 'Invalid image request.' : error instanceof Error ? error.message : 'Invalid image.' }, { status: 400 }); }
  try {
    const base = new URL(endpoint);
    if (base.protocol !== 'https:' || base.username || base.password) throw new Error('Invalid endpoint.');
    const url = new URL(`${endpoint.replace(/\/$/, '')}/computervision/imageanalysis:analyze`);
    url.searchParams.set('api-version', process.env.AZURE_AI_VISION_API_VERSION?.trim() || '2024-02-01');
    url.searchParams.set('features', 'read,tags,objects'); url.searchParams.set('language', 'en');
    const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': key }, body: Buffer.from(image.slice(image.indexOf(',') + 1), 'base64'), signal: AbortSignal.timeout(30000) });
    if (!response.ok) return NextResponse.json({ error: 'Azure AI Vision could not analyse the image. Check the resource endpoint, key, region and quota.' }, { status: 502 });
    const data = await response.json() as { readResult?: { blocks?: { lines?: { text: string }[] }[] }; tagsResult?: { values?: { name: string; confidence: number }[] }; objectsResult?: { values?: { tags?: { name: string; confidence: number }[]; boundingBox: { x: number; y: number; w: number; h: number } }[] } };
    return NextResponse.json({
      text: (data.readResult?.blocks || []).flatMap(b => b.lines || []).map(l => l.text).join('\n').slice(0, 20000),
      tags: (data.tagsResult?.values || []).slice(0, 30),
      objects: (data.objectsResult?.values || []).slice(0, 50).map(o => ({ name: o.tags?.[0]?.name || 'Object', confidence: o.tags?.[0]?.confidence ?? null, box: o.boundingBox })),
    });
  } catch { return NextResponse.json({ error: 'OCR and object detection could not complete. Please check configuration and try again.' }, { status: 502 }); }
}
