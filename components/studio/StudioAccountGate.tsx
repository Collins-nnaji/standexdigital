"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ConsoleTheme } from "@/components/console/console-theme";

type StudioAccountGateProps = {
  theme: ConsoleTheme;
  isDark: boolean;
  /** Shown in the sign-in card header, e.g. "Code Lab" or "Writing Lab". */
  toolName: string;
  children: (account: { firstName: string; onSignOut: () => void }) => React.ReactNode;
};

/**
 * Simple sign-in shared by every Studio tool: your first name is the
 * username, your last name is the password. One sign-in works across Code
 * Lab, Writing Lab and anything else added under Studio — nested inside the
 * shared Studio password gate. This is just enough to keep one person's
 * saved work apart from another's, not real authentication.
 */
export function StudioAccountGate({ theme, isDark, toolName, children }: StudioAccountGateProps) {
  const [status, setStatus] = useState<"loading" | "signedOut" | "signedIn">("loading");
  const [firstName, setFirstName] = useState("");

  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/studio/account")
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
      const res = await fetch("/api/studio/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: formFirstName, lastName: formLastName }),
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
  }, [formFirstName, formLastName]);

  const handleSignOut = useCallback(async () => {
    await fetch("/api/studio/account", { method: "DELETE" });
    setStatus("signedOut");
    setFirstName("");
    setFormFirstName("");
    setFormLastName("");
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
              Sign in to {toolName}
            </p>
          </div>
          <p className={cn("mt-2 text-[12px] leading-relaxed", theme.muted)}>
            Just your first and last name — first name is your username, last name is your
            password. The same sign-in works across every Studio tool, and your work is saved
            under this name. This is a lightweight sign-in, not a secure account.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!submitting) void handleSignIn();
            }}
            className="mt-3 flex flex-col gap-2"
          >
            <label className={cn("text-[10.5px] font-semibold uppercase tracking-wide", theme.muted)}>
              First name (username)
            </label>
            <input
              value={formFirstName}
              onChange={(e) => setFormFirstName(e.target.value)}
              placeholder="e.g. Collins"
              autoComplete="off"
              className={cn(
                "w-full rounded-lg border px-3 py-2 text-[13px] outline-none transition-colors placeholder:opacity-60 focus:border-emerald-500/50",
                theme.borderSub,
                theme.input,
                theme.text,
              )}
            />
            <label className={cn("mt-1 text-[10.5px] font-semibold uppercase tracking-wide", theme.muted)}>
              Last name (password)
            </label>
            <input
              value={formLastName}
              onChange={(e) => setFormLastName(e.target.value)}
              placeholder="e.g. Nnaji"
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
              disabled={submitting || !formFirstName.trim() || !formLastName.trim()}
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

export function StudioAccountBadge({
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
