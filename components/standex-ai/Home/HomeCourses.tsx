"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, GraduationCap } from "lucide-react";

const tracks = [
  {
    id: "ai",
    label: "AI Engineering",
    tag: "Engineering Curriculum 2026",
    price: "$1800",
    oldPrice: "$3500",
    cohort: "Cohort 04 — Active Enrollment",
    cohortDate: "May 5",
    description: "Master Multi-Agent Orchestration, production-grade RAG architectures, and the deployment of scalable AI systems.",
    color: "#049DCB",
    icon: Bot,
    image: "/ArtificialIntelligence.webp",
  },
  {
    id: "pp",
    label: "Power Platform Developer",
    tag: "Developer Curriculum 2026",
    price: "$1500",
    oldPrice: "$3000",
    cohort: "Cohort 04 — Now Enrolling",
    cohortDate: "Jun 2",
    description: "Master the Microsoft Power Platform stack, enterprise data modelling, and the delivery of production-grade business solutions.",
    color: "#049DCB",
    icon: GraduationCap,
    image: "/PowerPlatform.webp",
  }
];

export default function HomeCourses() {
  return (
    <section className="relative w-full antialiased py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 sm:px-4 py-1.5 mb-4 sm:mb-6">
            
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#7C5CFC]">Standex Digital Academy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-tight px-2">
            Accelerate your <br className="hidden sm:block" /> Engineering Career.
          </h2>
          <p className="mt-4 sm:mt-6 lg:mt-8 text-base sm:text-lg font-medium text-zinc-500 max-w-2xl px-2">
            Intensive, cohort-based curriculum designed for senior engineers and business architects. 
            Built on real-world production stacks.
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {tracks.map((track) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex flex-col rounded-3xl sm:rounded-[40px] border border-zinc-200 bg-zinc-50/50 p-1 overflow-hidden transition-all duration-700 hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.1)] hover:border-zinc-300"
            >
              <div className="bg-white rounded-[23px] sm:rounded-[39px] p-6 sm:p-8 md:p-10 flex flex-col h-full">
                {/* Track Badge */}
                <div className="flex items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-2 w-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: track.color }} />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.3em] leading-snug" style={{ color: track.color }}>
                      {track.cohort}
                    </span>
                  </div>
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100">
                    <track.icon className="h-5 w-5 text-zinc-900" />
                  </div>
                </div>

                {/* Label & Title Area */}
                <div className="flex-1 mb-8">
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400">
                      {track.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 tracking-tight mb-4 sm:mb-6 leading-tight">
                    {track.label}
                  </h3>
                  
                  {/* Course Graphic */}
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-zinc-100 mb-8 group-hover:border-zinc-200 transition-colors shadow-sm">
                    <Image 
                      src={track.image} 
                      alt={track.label} 
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                    />
                  </div>

                  <p className="text-sm sm:text-base font-semibold text-zinc-500 leading-relaxed mb-6 sm:mb-8">
                    {track.description}
                  </p>

                  <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-2">
                    <h4 className="text-3xl sm:text-4xl font-bold tracking-tighter text-zinc-950 leading-none">
                      {track.price}
                    </h4>
                    <span className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest line-through decoration-zinc-950/20">
                      {track.oldPrice}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Starts {track.cohortDate} • 6 Weeks Intensive
                  </p>
                </div>

                {/* Action */}
                <Link
                  href="/Training"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-2xl p-4 sm:p-5 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.2)] transition-all hover:scale-[1.02] active:scale-95"
                  style={{ backgroundColor: track.color }}
                >
                  View Training & Enroll <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              
              {/* Decorative Background Elements */}
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-700">
                 <track.icon className="h-48 w-48 text-zinc-950" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Bottom Glow */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-3/4 h-32 bg-violet-100/20 blur-[100px] -z-10" />
      </div>
    </section>
  );
}
