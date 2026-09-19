"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/** Reads and writes `?view=` so left-nav sub-items can switch screens inside a section. */
export function useStudioView<T extends string>(
  allowed: readonly T[],
  fallback: T,
): [T, (next: T) => void] {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const view = useMemo(() => {
    const raw = params.get("view");
    return raw && (allowed as readonly string[]).includes(raw) ? (raw as T) : fallback;
  }, [allowed, fallback, params]);

  const setView = useCallback(
    (next: T) => {
      const search = next === fallback ? "" : `?view=${encodeURIComponent(next)}`;
      router.replace(`${pathname}${search}`, { scroll: false });
    },
    [fallback, pathname, router],
  );

  return [view, setView];
}
