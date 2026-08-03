"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Power Platform Solutions",
  "AI & Agentic Systems",
  "Training & Academy",
  "Partnership & Collaboration",
  "Careers",
];

const inputClass =
  "w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm font-medium text-white placeholder:text-zinc-500 focus:border-[#7C5CFC]/50 focus:outline-none focus:ring-2 focus:ring-[#7C5CFC]/20";

type ContactEnquiryFormProps = {
  defaultEnquiryType?: (typeof ENQUIRY_TYPES)[number];
  eyebrow?: string;
  heading?: string;
};

const ContactEnquiryForm = ({
  defaultEnquiryType = ENQUIRY_TYPES[0],
  eyebrow = "Submit an Enquiry",
  heading = "Tell us what you need.",
}: ContactEnquiryFormProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [enquiryType, setEnquiryType] = useState<string>(defaultEnquiryType);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, enquiryType, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
      setName("");
      setEmail("");
      setEnquiryType(defaultEnquiryType);
      setMessage("");
    } catch {
      setError("Unable to submit. Please try again or email support@standexdigital.com.");
    } finally {
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-8 text-center"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Enquiry received</h3>
        <p className="text-sm font-medium text-zinc-400 mb-6">
          Thank you — we&apos;ll be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-[11px] font-bold uppercase tracking-widest text-[#7C5CFC] hover:text-[#9b85fd]"
        >
          Submit another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      onSubmit={submit}
      className="rounded-[28px] border border-white/10 bg-zinc-900/80 p-6 sm:p-8 space-y-5"
    >
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500 mb-1">
          {eyebrow}
        </p>
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
          {heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="enquiry-name" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
            Full name
          </label>
          <input
            id="enquiry-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="enquiry-email" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
            Email
          </label>
          <input
            id="enquiry-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="enquiry-type" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
          Enquiry type
        </label>
        <select
          id="enquiry-type"
          required
          value={enquiryType}
          onChange={(e) => setEnquiryType(e.target.value)}
          className={inputClass}
        >
          {ENQUIRY_TYPES.map((type) => (
            <option key={type} value={type} className="bg-zinc-900 text-white">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="enquiry-message" className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
          Message
        </label>
        <textarea
          id="enquiry-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${inputClass} resize-y`}
          placeholder="Briefly describe your project, timeline, or question..."
        />
      </div>

      {error && (
        <p className="text-sm font-medium text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C5CFC] px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#6B4FE0] disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Submit Enquiry
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </motion.form>
  );
};

export default ContactEnquiryForm;
