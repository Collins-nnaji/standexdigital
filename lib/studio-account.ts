import { cookies } from "next/headers";
import { STUDIO_ACCOUNT_COOKIE, readStudioAccountSession } from "@/lib/studio-account-auth";
import { prisma } from "@/lib/prisma";

/** Resolves the signed-in Studio account from the request cookies, or null. */
export async function getStudioAccountId(): Promise<string | null> {
  const store = await cookies();
  return readStudioAccountSession(store.get(STUDIO_ACCOUNT_COOKIE)?.value);
}

export async function requireStudioAccount() {
  const accountId = await getStudioAccountId();
  if (!accountId) return null;
  return prisma.studioAccount.findUnique({ where: { id: accountId } });
}
