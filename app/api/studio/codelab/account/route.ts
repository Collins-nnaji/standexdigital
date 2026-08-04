import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  CODELAB_COOKIE,
  CODELAB_SESSION_MAX_AGE,
  createCodeLabSessionValue,
  normalizeFirstNameKey,
} from "@/lib/codelab-auth";
import { getCodeLabAccountId } from "@/lib/code-lab/server-helpers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const NAME_MAX_LENGTH = 60;

/** Who's signed in, if anyone. */
export async function GET() {
  const accountId = await getCodeLabAccountId();
  if (!accountId) return NextResponse.json({ signedIn: false });

  const account = await prisma.studioAccount.findUnique({ where: { id: accountId } });
  if (!account) return NextResponse.json({ signedIn: false });

  return NextResponse.json({ signedIn: true, firstName: account.firstName });
}

/**
 * First name is the username, surname is the password. The first person to
 * sign in with a given first name registers it; everyone after must match
 * the surname on file.
 */
export async function POST(request: Request) {
  let body: { firstName?: string; surname?: string };
  try {
    body = (await request.json()) as { firstName?: string; surname?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const firstName = (body.firstName ?? "").trim().slice(0, NAME_MAX_LENGTH);
  const surname = (body.surname ?? "").trim().slice(0, NAME_MAX_LENGTH);

  if (!firstName || !surname) {
    return NextResponse.json({ error: "Enter both your first name and surname." }, { status: 400 });
  }
  if (!/^[a-zA-Z' -]+$/.test(firstName) || !/^[a-zA-Z' -]+$/.test(surname)) {
    return NextResponse.json({ error: "Names can only contain letters, spaces, hyphens and apostrophes." }, { status: 400 });
  }

  const firstNameKey = normalizeFirstNameKey(firstName);

  let account = await prisma.studioAccount.findUnique({ where: { firstNameKey } });

  if (!account) {
    const surnameHash = await bcrypt.hash(surname, 10);
    account = await prisma.studioAccount.create({
      data: { firstName, firstNameKey, surnameHash },
    });
  } else {
    const matches = await bcrypt.compare(surname, account.surnameHash);
    if (!matches) {
      return NextResponse.json(
        { error: "That surname doesn't match the account for this first name." },
        { status: 401 },
      );
    }
  }

  const response = NextResponse.json({ signedIn: true, firstName: account.firstName });
  response.cookies.set({
    name: CODELAB_COOKIE,
    value: await createCodeLabSessionValue(account.id),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CODELAB_SESSION_MAX_AGE,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: CODELAB_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
