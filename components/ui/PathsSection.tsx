"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Bot, 
  Cpu, 
  Layers, 
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const curriculumModules = [
  {
    title: "Agentic Systems",
    items: ["Agent orchestration", "Tool use & function calling", "Autonomous reasoning"]
  },
  {
    title: "Full-Stack AI",
    items: ["Advanced RAG & vector retrieval", "Fine-tuning & RLHF", "Token-cost optimization"]
  },
  {
    title: "Technical Architecture",
    items: ["AI platform design & MLOps", "Model governance & safety", "Production inference"]
  }
];

export function PathsSection() {
  return (
    <section className="relative py-24 px-6 lg:px-12 w-full max-w-7xl mx-auto">
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#7C5CFC]/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#7C5CFC]">
           <div className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC] animate-pulse" />
           Flagship Programme
        </div>
        <h2 className="font-syne text-5xl md:text-7xl font-black text-zinc-900 tracking-tight mb-8">
          One standard. <br /><span className="text-[#7C5CFC]">One mastery.</span>
        </h2>
        <p className="text-xl font-medium text-zinc-500 leading-relaxed">
          The definitive, multi-module engineering fellowship for building production-grade AI systems. 
          No separate tracks — just one authoritative curriculum.
        </p>
      </div>

      <div className="relative group rounded-[48px] border border-zinc-200 bg-white p-2 shadow-2xl shadow-zinc-200/50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#7C5CFC08,transparent_70%)]" />
        
        <div className="relative z-10 rounded-[40px] bg-zinc-950 p-8 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-12">
               <div>
                  <h3 className="font-syne text-3xl font-black text-white mb-4">Learn: Applied AI Engineering</h3>
                  <p className="text-zinc-400 font-medium text-lg leading-relaxed">
                    A comprehensive, 12-week fellowship covering the entire technical stack of autonomous agents and production LLM architectures.
                  </p>
               </div>

               <div className="grid sm:grid-cols-2 gap-10">
                  {curriculumModules.map((module, i) => (
                    <div key={i} className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-[#7C5CFC]">{module.title}</h4>
                       <ul className="space-y-3">
                          {module.items.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-xs font-bold text-zinc-300">
                               <CheckCircle2 className="h-4 w-4 text-[#7C5CFC]/60" /> {item}
                            </li>
                          ))}
                       </ul>
                    </div>
                  ))}
               </div>

               <Link href="/Training" className="block pt-8">
                  <Button className="h-16 rounded-2xl bg-[#7C5CFC] px-10 text-xs font-black uppercase tracking-widest text-white shadow-xl hover:bg-[#6042db] active:scale-95">
                    VIEW COMPLETE CURRICULUM <ArrowRight className="ml-3 h-4 w-4" />
                  </Button>
               </Link>
            </div>

            <div className="relative aspect-square lg:aspect-auto h-full min-h-[400px] rounded-[32px] bg-white/5 border border-white/10 overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="relative w-full aspect-video rounded-2xl border border-white/20 bg-zinc-900 shadow-2xl overflow-hidden flex flex-col">
                     <div className="h-8 w-full bg-zinc-800 flex items-center px-4 gap-1.5 border-b border-white/5">
                        <div className="h-2 w-2 rounded-full bg-rose-500/50" />
                        <div className="h-2 w-2 rounded-full bg-amber-500/50" />
                        <div className="h-2 w-2 rounded-full bg-emerald-500/50" />
                     </div>
                     <div className="flex-1 p-6 font-mono text-[10px] text-[#7C5CFC] leading-relaxed">
                        <p className="mb-2">// Initialize Standex Environment</p>
                        <p className="mb-2"><span className="text-zinc-500">const</span> <span className="text-white">agent</span> = <span className="text-zinc-500">await</span> Standex.createAgent({"{"}</p>
                        <p className="ml-4 mb-2">mission: <span className="text-emerald-400">"Production Engineering"</span>,</p>
                        <p className="ml-4 mb-2">deployment: <span className="text-emerald-400">"SOTA-V5.4-mini"</span>,</p>
                        <p className="ml-4 mb-2">architecture: <span className="text-emerald-400">"Multi-Agent Swarm"</span></p>
                        <p className="mb-2">{"}"});</p>
                        <p className="mb-2 animate-pulse cursor-block">_</p>
                     </div>
                  </div>
               </div>
               {/* SOTA Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[#7C5CFC]/20 blur-[100px] pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
