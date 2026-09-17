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
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 mb-5"
      >
        <Sparkles className="h-3.5 w-3.5 text-[#7C5CFC]" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7C5CFC]">
          Growth Consultation
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.05 }}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] text-white mb-5"
      >
        Let&apos;s talk growth.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-sm sm:text-base font-medium text-zinc-400 leading-relaxed max-w-md mb-8"
      >
        Tell us where you are, what growth should look like, and what is getting in the
        way. We&apos;ll identify the strongest place to start.
      </motion.p>

      <motion.ul
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="space-y-3 text-sm font-medium text-zinc-500"
      >
        <li className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC]" />
          Response within one business day
        </li>
        <li className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Strategy, advertising & analytics enquiries
        </li>
        <li className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Digital, AI & technology partnerships
        </li>
      </motion.ul>
    </div>
  );
};

export default ContactHeader;
