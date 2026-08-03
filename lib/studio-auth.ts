/**
 * Server-side gate for the Studio hub.
 *
 * The password lives in STUDIO_PASSWORD and never reaches the browser. A
 * successful sign-in sets a signed HttpOnly cookie, so client JavaScript can
 * neither read nor forge it. Verification uses the Web Crypto API so the same
 * code runs in both middleware (edge) and route handlers (node).
 */

export const STUDIO_COOKIE = "studio_session";

/** How long a session stays valid. */
export const STUDIO_SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

function getSecret(): string {
  // Fall back to the password itself so a deployment that sets only
  // STUDIO_PASSWORD still gets signed cookies rather than silently failing.
  return process.env.STUDIO_SESSION_SECRET || process.env.STUDIO_PASSWORD || "";
}

export function isStudioAuthConfigured(): boolean {
  return Boolean(process.env.STUDIO_PASSWORD);
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

/** Compares two strings without leaking length or content through timing. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function verifyStudioPassword(candidate: string): Promise<boolean> {
  const expected = process.env.STUDIO_PASSWORD;
  if (!expected) return false;

  // Hash both sides first so the comparison is fixed-length regardless of input.
  const [a, b] = await Promise.all([sign(candidate), sign(expected)]);
  return timingSafeEqual(a, b);
}

/** Builds the cookie value: an expiry stamp plus its signature. */
export async function createStudioSessionValue(): Promise<string> {
  const expiresAt = Date.now() + STUDIO_SESSION_MAX_AGE * 1000;
  const payload = String(expiresAt);
  return `${payload}.${await sign(payload)}`;
}

export async function isValidStudioSession(cookieValue: string | undefined): Promise<boolean> {
  if (!cookieValue) return false;
  if (!getSecret()) return false;

  const separator = cookieValue.lastIndexOf(".");
  if (separator <= 0) return false;

  const payload = cookieValue.slice(0, separator);
  const signature = cookieValue.slice(separator + 1);

  const expected = await sign(payload);
  if (!timingSafeEqual(signature, expected)) return false;

  const expiresAt = Number(payload);
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}
