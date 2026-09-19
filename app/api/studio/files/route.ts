import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { STUDIO_COOKIE, isValidStudioSession } from '@/lib/studio-auth';
import { fileAccess } from '@/lib/studio-files/server';
import { fileCategories, MAX_FILE_BYTES, ownedFileKey, safeFileName, type FileCategory } from '@/lib/studio-files/policy';
import { listFiles, missingStorageConfig, removeFile, saveFile } from '@/lib/studio-files/storage';
export const runtime = 'nodejs';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    if (url.searchParams.get('status') === '1') {
      if (!await isValidStudioSession((await cookies()).get(STUDIO_COOKIE)?.value)) return NextResponse.json({ error: 'Sign in to Studio first.' }, { status: 401 });
      return NextResponse.json({ configured: missingStorageConfig().length === 0, missing: missingStorageConfig() }, { headers: { 'Cache-Control': 'private, no-store' } });
    }
    const access = await fileAccess(); if (access.error) return access.error;
    const token = url.searchParams.get('cursor') || undefined;
    if (token && token.length > 4096) return NextResponse.json({ error: 'Invalid page cursor.' }, { status: 400 });
    return NextResponse.json(await listFiles(access.accountId!, token), { headers: { 'Cache-Control': 'private, no-store' } });
  } catch { return NextResponse.json({ error: 'Files could not be loaded. Check the Neon storage configuration and account database.' }, { status: 502 }); }
}
export async function POST(request: Request) {
  try {
    const access = await fileAccess(); if (access.error) return access.error;
    const maxRequest = MAX_FILE_BYTES + 65536;
    if (Number(request.headers.get('content-length') || 0) > maxRequest) return NextResponse.json({ error: 'Files must be at most 5 MB.' }, { status: 413 });
    const reader = request.body?.getReader(); if (!reader) return NextResponse.json({ error: 'Choose a file.' }, { status: 400 });
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) { const { value, done } = await reader.read(); if (done) break; size += value.length; if (size > maxRequest) { await reader.cancel(); return NextResponse.json({ error: 'Files must be at most 5 MB.' }, { status: 413 }); } chunks.push(value); }
    const form = await new Request(request.url, { method: 'POST', headers: { 'Content-Type': request.headers.get('content-type') || '' }, body: Buffer.concat(chunks) }).formData();
    const file = form.get('file'); const category = form.get('category') || 'documents';
    if (!(file instanceof File) || !file.size || file.size > MAX_FILE_BYTES || !fileCategories.includes(category as FileCategory)) return NextResponse.json({ error: 'Choose a non-empty supported file under 5 MB and a valid category.' }, { status: 400 });
    let name: string; try { name = safeFileName(file.name); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'Unsupported file.' }, { status: 400 }); }
    const saved = await saveFile(access.accountId!, name, category as FileCategory, new Uint8Array(await file.arrayBuffer()));
    return NextResponse.json({ file: saved }, { status: 201 });
  } catch { return NextResponse.json({ error: 'The file was not saved. Check your Neon bucket, credentials and account connection, then retry.' }, { status: 502 }); }
}
export async function DELETE(request: Request) {
  try {
    const access = await fileAccess(); if (access.error) return access.error;
    const key = new URL(request.url).searchParams.get('key') || '';
    if (!ownedFileKey(access.accountId!, key)) return NextResponse.json({ error: 'File not found.' }, { status: 404 });
    await removeFile(access.accountId!, key); return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: 'The file could not be deleted. Try again.' }, { status: 502 }); }
}
