"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronDown, GraduationCap, Loader2, MessageCircle, User, Users, Building2 } from "lucide-react";

const input =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all";

const AUDIENCE = [
  { id: "individual", label: "Just me", hint: "Join the public cohort", icon: User },
  { id: "team", label: "My team", hint: "2 to 20 seats", icon: Users },
  { id: "company", label: "My company", hint: "Private, in-house cohort", icon: Building2 },
] as const;

const TRACKS = ["AI at Work", "Power BI & Automation", "Both tracks", "Not sure yet"] as const;
const LEVELS = ["Beginner", "Some experience", "Advanced"] as const;
const FORMATS = ["Live online", "In person", "Either is fine"] as const;

type Props = {
  /** Track currently open on the page: "ai" or "pp". */
  activeTrack?: "ai" | "pp";
};

function Chips<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            value === o ? "border-emerald-600 bg-emerald-600 text-white" : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** Cohort-specific enquiry form: who is attending, which track, level, format and seats. */
export default function TrainingEnquiryForm({ activeTrack = "ai" }: Props) {
  const [open, setOpen] = useState(false);
  const trackFor = (t: "ai" | "pp") => (t === "ai" ? TRACKS[0] : TRACKS[1]);
  const [audience, setAudience] = useState<(typeof AUDIENCE)[number]["id"]>("individual");
  const [track, setTrack] = useState<(typeof TRACKS)[number]>(trackFor(activeTrack));
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("Beginner");
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("Live online");
  const [seats, setSeats] = useState("5");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  // Follow the track tab the visitor is looking at.
  useEffect(() => setTrack(trackFor(activeTrack)), [activeTrack]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const body = [
      "--- TRAINING COHORT ENQUIRY ---",
      `Enquiring as: ${AUDIENCE.find((a) => a.id === audience)?.label}`,
      `Track: ${track}`,
      `Level: ${level}`,
      `Format: ${format}`,
      audience !== "individual" ? `Seats: ${seats}` : "",
      org ? `Organisation: ${org}` : "",
      phone ? `Phone / WhatsApp: ${phone}` : "",
      "",
      message || "No additional questions.",
    ]
      .filter((l) => l !== "")
      .join("\n");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, enquiryType: "Training & Academy", message: body }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setDone(true);
    } catch {
      setError("Unable to submit. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl bg-white p-8 text-center shadow-2xl sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-5 text-2xl font-bold text-zinc-950">Seat request received.</h3>
        <p className="mt-2 text-sm text-zinc-600">We will email you the cohort details, dates and next steps within one business day.</p>
      </motion.div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <GraduationCap className="h-5 w-5" />
        </span>
        <span className="flex-1">
          <span className="block text-base font-bold text-zinc-950">Cohort enquiry</span>
          <span className="block text-sm text-zinc-500">Reserve a seat or ask a question</span>
        </span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-zinc-500 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
    <motion.form
      onSubmit={submit}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="overflow-hidden"
    >
      <div className="space-y-6 border-t border-zinc-100 p-6 sm:p-8">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Who is this for?</p>
        <div className="grid gap-2 sm:grid-cols-3">
          {AUDIENCE.map((a) => {
            const Icon = a.icon;
            const on = audience === a.id;
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => setAudience(a.id)}
                className={`flex items-start gap-3 rounded-2xl border p-3 text-left transition ${on ? "border-emerald-600 bg-emerald-50 ring-1 ring-emerald-600" : "border-zinc-200 hover:border-zinc-400"}`}
              >
                <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${on ? "text-emerald-600" : "text-zinc-500"}`} />
                <span>
                  <span className="block text-sm font-bold text-zinc-950">{a.label}</span>
                  <span className="block text-xs text-zinc-500">{a.hint}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Track</p>
        <Chips options={TRACKS} value={track} onChange={setTrack} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Experience level</p>
          <Chips options={LEVELS} value={level} onChange={setLevel} />
        </div>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-zinc-500">Format</p>
          <Chips options={FORMATS} value={format} onChange={setFormat} />
        </div>
      </div>

      {audience !== "individual" && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">Number of seats</span>
            <input type="number" min={2} max={500} value={seats} onChange={(e) => setSeats(e.target.value)} className={input} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">Organisation</span>
            <input value={org} onChange={(e) => setOrg(e.target.value)} className={input} placeholder="Company name" />
          </label>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">Full name</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={input} placeholder="Your name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">Email</span>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} placeholder="you@company.com" />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">Phone / WhatsApp (optional)</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className={input} placeholder="+44 …" />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-zinc-500">Questions (optional)</span>
        <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className={`${input} resize-y`} placeholder="Schedule, certificate, payment plans, what your team needs to learn…" />
      </label>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {busy ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Reserve my seat <ArrowRight className="h-4 w-4" /></>}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-xs text-zinc-500">
        <MessageCircle className="h-3.5 w-3.5" /> Prefer a call? Tell us in the questions box.
      </p>
      </div>
    </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
