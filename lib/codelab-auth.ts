/**
 * Per-user account layer for the Code Lab, nested inside the shared Studio
 * password gate (see lib/studio-auth.ts). Sign-in is intentionally simple —
 * first name as username, surname as password — so each person's lesson
 * plans, saved lessons, practice attempts and error history stay separate.
 * Swap for real auth later without touching the rest of the app.
 */

export const CODELAB_COOKIE = "codelab_session";

/** How long a session stays valid. */
export const CODELAB_SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function getSecret(): string {
  return (
    process.env.CODELAB_SESSION_SECRET ||
    process.env.STUDIO_SESSION_SECRET ||
    process.env.STUDIO_PASSWORD ||
    "codelab-dev-secret-change-me"
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sign(value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return toHex(signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/** Normalizes a first name into the lookup key used for uniqueness/sign-in. */
export function normalizeFirstNameKey(firstName: string): string {
  return firstName.trim().toLowerCase();
}

/** Builds the cookie value: accountId + expiry, plus a signature. */
export async function createCodeLabSessionValue(accountId: string): Promise<string> {
  const expiresAt = Date.now() + CODELAB_SESSION_MAX_AGE * 1000;
  const payload = `${accountId}.${expiresAt}`;
  return `${payload}.${await sign(payload)}`;
}

/** Verifies a session cookie and returns the accountId, or null if invalid/expired. */
export async function readCodeLabSession(cookieValue: string | undefined): Promise<string | null> {
  if (!cookieValue) return null;

  const lastDot = cookieValue.lastIndexOf(".");
  if (lastDot <= 0) return null;

  const payload = cookieValue.slice(0, lastDot);
  const signature = cookieValue.slice(lastDot + 1);

  const expected = await sign(payload);
  if (!timingSafeEqual(signature, expected)) return null;

  const separator = payload.lastIndexOf(".");
  if (separator <= 0) return null;

  const accountId = payload.slice(0, separator);
  const expiresAt = Number(payload.slice(separator + 1));
  if (!accountId || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) return null;

  return accountId;
}
