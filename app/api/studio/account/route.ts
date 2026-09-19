import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import {
  STUDIO_ACCOUNT_COOKIE,
  STUDIO_ACCOUNT_SESSION_MAX_AGE,
  createStudioAccountSessionValue,
  normalizeFirstNameKey,
} from "@/lib/studio-account-auth";
import { getStudioAccountId } from "@/lib/studio-account";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const NAME_MAX_LENGTH = 60;

/** Who's signed in, if anyone. Shared across every Studio tool (Code Lab, Writing Lab, ...). */
export async function GET() {
  const accountId = await getStudioAccountId();
  if (!accountId) return NextResponse.json({ signedIn: false });

  const account = await prisma.studioAccount.findUnique({ where: { id: accountId } });
  if (!account) return NextResponse.json({ signedIn: false });

  return NextResponse.json({ signedIn: true, firstName: account.firstName });
}

/**
 * Sign-in is just two fields: your first name is the username, your last
 * name is the password. The first person to sign in with a given first name
 * registers it; everyone after must match the last name on file.
 */
async function issueSession(accountId: string, firstName: string) {
  const response = NextResponse.json({ signedIn: true, firstName });
  response.cookies.set({
    name: STUDIO_ACCOUNT_COOKIE,
    value: await createStudioAccountSessionValue(accountId),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: STUDIO_ACCOUNT_SESSION_MAX_AGE,
  });
  return response;
}

export async function POST(request: Request) {
  let body: { firstName?: string; lastName?: string; guest?: boolean };
  try {
    body = (await request.json()) as { firstName?: string; lastName?: string; guest?: boolean };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (body.guest === true) {
    const firstNameKey = "guest";
    let account = await prisma.studioAccount.findUnique({ where: { firstNameKey } });
    if (!account) {
      account = await prisma.studioAccount.create({
        data: {
          firstName: "Guest",
          firstNameKey,
          lastNameHash: await bcrypt.hash("Standex", 10),
        },
      });
    }
    return issueSession(account.id, account.firstName);
  }

  const firstName = (body.firstName ?? "").trim().slice(0, NAME_MAX_LENGTH);
  const lastName = (body.lastName ?? "").trim().slice(0, NAME_MAX_LENGTH);

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "Enter both your first name and last name." }, { status: 400 });
  }
  if (!/^[a-zA-Z' -]+$/.test(firstName) || !/^[a-zA-Z' -]+$/.test(lastName)) {
    return NextResponse.json({ error: "Names can only contain letters, spaces, hyphens and apostrophes." }, { status: 400 });
  }

  const firstNameKey = normalizeFirstNameKey(firstName);

  let account = await prisma.studioAccount.findUnique({ where: { firstNameKey } });

  if (!account) {
    const lastNameHash = await bcrypt.hash(lastName, 10);
    account = await prisma.studioAccount.create({
      data: { firstName, firstNameKey, lastNameHash },
    });
  } else {
    const matches = await bcrypt.compare(lastName, account.lastNameHash);
    if (!matches) {
      return NextResponse.json(
        { error: "That last name doesn't match the account for this first name." },
        { status: 401 },
      );
    }
  }

  return issueSession(account.id, account.firstName);
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: STUDIO_ACCOUNT_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return response;
}
