"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const ContactHeader = () => {
  return (
    <div className="flex flex-col items-start text-left">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 shadow-sm mb-5"
      >
        <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-800">
          Free consultation
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-zinc-950 mb-5"
      >
        Let&apos;s talk about what you need.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-md mb-8"
      >
        Whether it&apos;s winning more customers or building better systems and reporting,
        tell us where you are and what&apos;s getting in the way. We&apos;ll identify the strongest place to start.
      </motion.p>

      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="space-y-3 text-[15px] text-zinc-700"
      >
        <li className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Response within one business day
        </li>
        <li className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Strategy, advertising & analytics enquiries
        </li>
        <li className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Power Apps, Power Automate & Power BI projects
        </li>
      </motion.ul>
    </div>
  );
};

export default ContactHeader;
