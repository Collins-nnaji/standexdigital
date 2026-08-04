"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";

type CodeLabAccountGateProps = {
  theme: ConsoleTheme;
  isDark: boolean;
  children: (account: { firstName: string; onSignOut: () => void }) => React.ReactNode;
};

/**
 * Simple per-user sign-in for the Code Lab: first name as username, surname
 * as password. Nested inside the shared Studio password gate, so this is
 * just enough to keep one person's saved lessons, plans and progress apart
 * from another's — not real authentication.
 */
export function CodeLabAccountGate({ theme, isDark, children }: CodeLabAccountGateProps) {
  const [status, setStatus] = useState<"loading" | "signedOut" | "signedIn">("loading");
  const [firstName, setFirstName] = useState("");

  const [formFirstName, setFormFirstName] = useState("");
  const [formSurname, setFormSurname] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/studio/codelab/account")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.signedIn) {
          setFirstName(data.firstName);
          setStatus("signedIn");
        } else {
          setStatus("signedOut");
        }
      })
      .catch(() => !cancelled && setStatus("signedOut"));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSignIn = useCallback(async () => {
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch("/api/studio/codelab/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: formFirstName, surname: formSurname }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Could not sign in.");
      setFirstName(data.firstName);
      setStatus("signedIn");
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Could not sign in.");
    } finally {
      setSubmitting(false);
    }
  }, [formFirstName, formSurname]);

  const handleSignOut = useCallback(async () => {
    await fetch("/api/studio/codelab/account", { method: "DELETE" });
    setStatus("signedOut");
    setFirstName("");
    setFormFirstName("");
    setFormSurname("");
  }, []);

  if (status === "loading") {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Loader2 className={cn("h-5 w-5 animate-spin", theme.muted)} />
      </div>
    );
  }

  if (status === "signedOut") {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <div className={cn("w-full max-w-xs rounded-2xl border p-5", theme.borderSub, isDark ? "bg-white/[0.03]" : "bg-black/[0.02]")}>
          <div className="flex items-center gap-2">
            <User className={cn("h-4 w-4", theme.muted)} />
            <p className={cn("text-[10px] font-black uppercase tracking-[0.2em]", theme.muted)}>
              Sign in to Code Lab
            </p>
          </div>
          <p className={cn("mt-2 text-[12px] leading-relaxed", theme.muted)}>
            Enter your first name and surname. Your lessons, plans and progress are saved under
            this name — this is a lightweight sign-in, not a secure account.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!submitting) void handleSignIn();
            }}
            className="mt-3 flex flex-col gap-2"
          >
            <input
              value={formFirstName}
              onChange={(e) => setFormFirstName(e.target.value)}
              placeholder="First name"
              autoComplete="off"
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-[13px] outline-none transition-colors placeholder:opacity-60 focus:border-emerald-500/50",
                theme.borderSub,
                theme.input,
                theme.text,
              )}
            />
            <input
              value={formSurname}
              onChange={(e) => setFormSurname(e.target.value)}
              placeholder="Surname"
              type="password"
              autoComplete="off"
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-[13px] outline-none transition-colors placeholder:opacity-60 focus:border-emerald-500/50",
                theme.borderSub,
                theme.input,
                theme.text,
              )}
            />
            {formError && <p className="text-[12px] text-rose-500">{formError}</p>}
            <button
              type="submit"
              disabled={submitting || !formFirstName.trim() || !formSurname.trim()}
              className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-emerald-500 px-3.5 py-2 text-[12.5px] font-bold text-white transition-colors hover:bg-emerald-600 disabled:opacity-50"
            >
              {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Continue
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children({ firstName, onSignOut: handleSignOut })}</>;
}

export function CodeLabAccountBadge({
  firstName,
  onSignOut,
  theme,
}: {
  firstName: string;
  onSignOut: () => void;
  theme: ConsoleTheme;
}) {
  return (
    <div className="ml-auto flex items-center gap-1.5">
      <span className={cn("hidden text-[11.5px] font-semibold sm:inline", theme.muted)}>{firstName}</span>
      <button
        type="button"
        onClick={onSignOut}
        title="Sign out"
        className={cn("rounded-lg p-1.5 transition-colors", theme.muted, theme.navHover)}
      >
        <LogOut className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
