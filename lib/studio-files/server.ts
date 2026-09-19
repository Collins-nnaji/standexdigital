import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { STUDIO_COOKIE, isValidStudioSession } from '@/lib/studio-auth';
import { requireStudioAccount } from '@/lib/studio-account';
import { missingStorageConfig } from './storage';

export async function fileAccess() {
  if (!await isValidStudioSession((await cookies()).get(STUDIO_COOKIE)?.value)) return { error: NextResponse.json({ error: 'Sign in to Studio first.' }, { status: 401 }) };
  const missing = missingStorageConfig();
  if (missing.length) return { error: NextResponse.json({ error: 'File storage needs configuration. Add the Neon bucket settings from config/studio-services.env.example.', missing }, { status: 503 }) };
  const account = await requireStudioAccount();
  if (!account) return { error: NextResponse.json({ error: 'Sign in to your Studio account in Files to save and access your private files.' }, { status: 401 }) };
  return { accountId: account.id };
}
