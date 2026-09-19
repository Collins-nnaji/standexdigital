"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Code Lab was removed from Studio. Keep this module type-safe if anything still imports it. */
export function StudioCodeLab() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/studio/writing");
  }, [router]);
  return null;
}
