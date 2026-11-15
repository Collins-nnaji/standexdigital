"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function WaitlistSection() {
  return (
    <section className="py-24 bg-[#FAFAF9] border-t border-zinc-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] bg-zinc-900 overflow-hidden p-8 sm:p-16 lg:p-24 text-center"
        >
          {/* Decorative gradients */}
          <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] h-[70%] w-[70%] rounded-full bg-[#7C5CFC]/30 blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[70%] w-[70%] rounded-full bg-blue-500/30 blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-7xl mb-8 text-balance">
              Ready to learn AI that actually works?
            </h2>
            <p className="text-zinc-400 text-lg sm:text-xl font-medium mb-12">
              Join the waitlist — early members get 3 months free. Master the tools that are reshaping the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full sm:w-80 h-16 rounded-2xl bg-white/10 border border-white/20 px-6 text-white text-sm font-medium focus:outline-none focus:border-[#7C5CFC] transition-colors placeholder:text-zinc-500"
              />
              <Link
                href="/contact"
                className="w-full sm:w-auto flex h-16 items-center justify-center gap-3 rounded-2xl bg-[#7C5CFC] text-white hover:bg-[#6c4de0] transition-all active:scale-95 px-10 text-xs font-black uppercase tracking-widest shadow-xl shadow-[#7C5CFC]/20"
              >
                Join the waitlist
                <ArrowUpRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
