"use client";

import React from "react";
import { motion } from "framer-motion";

const ContactHeader = () => {
  return (
    <div className="flex flex-col items-start text-left">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-sm mb-5"
      >
        
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800">
          Contact Us
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-zinc-950 mb-5"
      >
        Let&apos;s map your growth blueprint.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-md mb-8"
      >
        Tell us about your current systems and what&apos;s slowing your growth. A Senior Solutions Architect
        will deliver a tailored architecture roadmap, timeline, and ROI estimate within one business day.
      </motion.p>

      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="space-y-3 text-[15px] text-zinc-700"
      >
        <li className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Response within one business day from a Senior Architect
        </li>
        <li className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Tailored architecture roadmap & licensing guidance
        </li>
        <li className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          100% confidential · Direct WhatsApp & email support
        </li>
      </motion.ul>
    </div>
  );
};

export default ContactHeader;
