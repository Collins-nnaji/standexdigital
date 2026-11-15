"use client";

import React from "react";
import { motion } from "framer-motion";
import { CircleDot, GraduationCap, Code, Building2, ChevronRight } from "lucide-react";

const tracks = [
  {
    title: "Starter",
    subtitle: "AI Foundations",
    description: "Master prompting, ChatGPT, Claude, and Gemini. Get productive in days.",
    modules: "6 modules",
    level: "Beginner",
    icon: CircleDot,
    color: "text-zinc-900",
    border: "border-zinc-200",
  },
  {
    title: "Professional",
    subtitle: "AI for Work",
    description: "Automate workflows, write with AI, build tools, and save hours every week.",
    modules: "8 modules",
    level: "Intermediate",
    icon: GraduationCap,
    color: "text-[#7C5CFC]",
    border: "border-[#7C5CFC]/20",
    featured: true,
  },
  {
    title: "Builder",
    subtitle: "Agents & Automation",
    description: "Build AI agents, connect APIs, set up n8n/Make flows, launch AI-powered websites.",
    modules: "10 modules",
    level: "Advanced",
    icon: Code,
    color: "text-[#7C5CFC]",
    border: "border-zinc-200",
  },
  {
    title: "Corporate",
    subtitle: "AI for Teams",
    description: "Tailored training for company teams. We assess, design, train, and implement.",
    modules: "Custom",
    level: "All levels",
    icon: Building2,
    color: "text-zinc-900",
    border: "border-zinc-200",
  },
];

export function CurriculumSection() {
  return (
    <section id="curriculum" className="py-24 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-black uppercase tracking-widest text-[#7C5CFC] mb-4"
          >
            Curriculum
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black tracking-tight text-zinc-900 md:text-5xl lg:text-6xl"
          >
            Four learning tracks
          </motion.h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.map((track, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative flex flex-col p-8 rounded-[32px] bg-white border ${track.border} shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(124,92,252,0.08)] transition-all duration-300 group cursor-pointer`}
            >
              {track.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#7C5CFC] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-[#7C5CFC]/20">
                  Most Popular
                </div>
              )}
              
              <div className={`mb-8 ${track.color}`}>
                <track.icon className="h-10 w-10" strokeWidth={2.5} />
              </div>

              <div className="mt-auto">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{track.title}</p>
                <h4 className="text-2xl font-black text-zinc-900 mb-3 tracking-tight">{track.subtitle}</h4>
                <p className="text-zinc-500 leading-relaxed font-medium mb-8 text-sm">
                  {track.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{track.modules}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900">{track.level}</span>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center group-hover:bg-[#7C5CFC] group-hover:border-[#7C5CFC] group-hover:text-white transition-all duration-300">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
