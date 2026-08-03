import { NextResponse } from "next/server";
import {
  STUDIO_COOKIE,
  STUDIO_SESSION_MAX_AGE,
  createStudioSessionValue,
  isStudioAuthConfigured,
  verifyStudioPassword,
} from "@/lib/studio-auth";

export const runtime = "nodejs";

/** Verifies the Studio password and issues an HttpOnly session cookie. */
export async function POST(request: Request) {
  if (!isStudioAuthConfigured()) {
    console.error("[studio/auth] STUDIO_PASSWORD is not set");
    return NextResponse.json(
      { error: "Studio access is not configured on this environment." },
      { status: 503 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: string };
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!password) {
    return NextResponse.json({ error: "Enter your access code." }, { status: 400 });
  }

  // Slow down brute-force attempts a little without hurting real sign-ins.
  await new Promise((resolve) => setTimeout(resolve, 400));

  if (!(await verifyStudioPassword(password))) {
    return NextResponse.json({ error: "Invalid access code." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: STUDIO_COOKIE,
    value: await createStudioSessionValue(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: STUDIO_SESSION_MAX_AGE,
  });
  return response;
}

/** Signs out by clearing the session cookie. */
export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: STUDIO_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
