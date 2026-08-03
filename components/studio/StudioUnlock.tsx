"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Studio sign-in. The password is checked by /api/studio/auth on the server;
 * nothing secret is present in this component.
 */
export function StudioUnlock() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError(null);

    try {
      const res = await fetch("/api/studio/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: code }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || "Invalid access code.");
        setCode("");
        return;
      }

      // Only redirect within this app, so `next` can't be used to bounce
      // someone to an external site.
      const next = searchParams.get("next");
      const destination = next && next.startsWith("/") && !next.startsWith("//") ? next : "/studio";
      router.replace(destination);
      router.refresh();
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950 font-sans selection:bg-emerald-500/30">
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:40px_40px]"
          style={{ maskImage: "radial-gradient(circle at center, black, transparent 80%)" }}
        />
      </div>

      <div className="relative w-full max-w-md px-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-[32px] p-8 shadow-2xl overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/5 blur-[80px]" />

          <div className="flex flex-col items-center text-center">
            <div className="h-20 w-20 rounded-3xl bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-8 relative group">
              <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <Lock className="h-8 w-8 text-zinc-400 group-hover:text-emerald-400 transition-colors relative z-10" />
            </div>

            <div className="space-y-2 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-2">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                  Restricted Access
                </span>
              </div>
              <h1 className="text-3xl font-black text-white uppercase italic tracking-tight">Enter Code</h1>
              <p className="text-zinc-500 text-sm font-medium">
                Please provide the authorization key to access Studio.
              </p>
            </div>

            <form onSubmit={handleVerify} className="w-full space-y-4 relative z-10">
              <div className="relative">
                <Input
                  type={showCode ? "text" : "password"}
                  placeholder="AUTHORIZATION_KEY"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                    setError(null);
                  }}
                  className={cn(
                    "h-14 rounded-2xl border-zinc-300 bg-white pl-6 pr-14 text-center text-lg font-mono tracking-[0.3em] text-zinc-900 transition-all placeholder:text-zinc-400 focus:border-emerald-500 focus:ring-emerald-500/20",
                    error && "border-rose-500 focus:border-rose-500 animate-shake",
                  )}
                  disabled={isVerifying}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowCode((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
                  aria-label={showCode ? "Hide access code" : "Show access code"}
                  title={showCode ? "Hide access code" : "Show access code"}
                  tabIndex={-1}
                >
                  {showCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
                {error && (
                  <p className="absolute -bottom-6 left-0 w-full text-[10px] font-black text-rose-500 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isVerifying || !code}
                className="w-full h-14 rounded-2xl bg-zinc-100 text-zinc-950 hover:bg-white active:scale-95 transition-all text-sm font-black uppercase tracking-widest shadow-xl shadow-white/5"
              >
                {isVerifying ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Verify Identity <ArrowRight className="h-4 w-4" />
                  </span>
                )}
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 text-center px-4">
          <Link
            href="/"
            className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] hover:text-zinc-400 transition-colors"
          >
            Return to Standex Digital
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}
