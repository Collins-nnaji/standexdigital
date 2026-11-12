"use client";

import React, { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Loader2, Send, CheckCircle2 } from "lucide-react";
import { ENQUIRY_TYPES } from "@/lib/enquiry-types";

const inputClass =
  "w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20";

type ContactEnquiryFormProps = {
  defaultEnquiryType?: (typeof ENQUIRY_TYPES)[number];
  eyebrow?: string;
  heading?: string;
};

const ContactEnquiryForm = ({
  defaultEnquiryType = ENQUIRY_TYPES[0],
  eyebrow = "Book a consultation",
  heading = "Tell us about your goals.",
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
        className="rounded-[28px] border border-emerald-200 bg-white p-8 text-center shadow-xl"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-zinc-950 mb-2">Enquiry received</h3>
        <p className="text-sm font-medium text-zinc-600 mb-6">
          Thank you — we&apos;ll be in touch shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 hover:text-emerald-800"
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
      className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 space-y-5 shadow-[0_30px_70px_-35px_rgba(16,24,40,0.4)]"
    >
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 mb-1">
          {eyebrow}
        </p>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
          {heading}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="enquiry-name" className="block text-xs font-semibold text-zinc-700 mb-2">
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
          <label htmlFor="enquiry-email" className="block text-xs font-semibold text-zinc-700 mb-2">
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
        <label htmlFor="enquiry-type" className="block text-xs font-semibold text-zinc-700 mb-2">
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
            <option key={type} value={type} className="bg-white text-zinc-950">
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="enquiry-message" className="block text-xs font-semibold text-zinc-700 mb-2">
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
        <p className="text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-emerald-700 disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Send enquiry
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </motion.form>
  );
};

export default ContactEnquiryForm;
