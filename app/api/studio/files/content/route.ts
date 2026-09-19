import { NextResponse } from 'next/server';
import { fileAccess } from '@/lib/studio-files/server';
import { ownedFileKey } from '@/lib/studio-files/policy';
import { readFile } from '@/lib/studio-files/storage';
export const runtime = 'nodejs';
export async function GET(request: Request) {
  try {
    const access = await fileAccess(); if (access.error) return access.error;
    const key = new URL(request.url).searchParams.get('key') || '';
    if (!ownedFileKey(access.accountId!, key)) return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    const file = await readFile(access.accountId!, key);
    return new Response(new Uint8Array(file.bytes), { headers: { 'Content-Type': 'application/octet-stream', 'Content-Disposition': `attachment; filename="${file.name}"`, 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'private, no-store' } });
  } catch { return NextResponse.json({ error: 'This file is unavailable. Refresh Files and try again.' }, { status: 502 }); }
}
