"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const services = [
  {
    label: "01",
    title: "Power Platform",
    subtitle: "Apps · Automate · BI · Governance",
    desc: "Our primary area of expertise. We engineer production-grade Power Apps, Power Automate flows, Power BI dashboards, and platform governance structures that transform how your organisation operates.",
    accent: "#7C5CFC",
    href: "/solutions#power-apps",
    cta: "Explore Power Platform",
  },
  {
    label: "02",
    title: "Artificial Intelligence",
    subtitle: "Autonomous AI Agents & Swarms",
    desc: "We build production-grade AI agents that reason, act, and orchestrate across complex enterprise workflows. Multi-agent systems, RAG pipelines, and real-time decisioning — deployed infrastructure, not demos.",
    accent: "#049DCB",
    href: "/solutions#artificial-intelligence",
    cta: "Explore AI Solutions",
  },
  {
    label: "03",
    title: "Power Apps",
    subtitle: "Low-Code Application Engineering",
    desc: "Bespoke canvas and model-driven apps built for real business complexity. Custom PCF components, offline sync, Dataverse architecture, and full ALM pipelines — ready in days, not months.",
    accent: "#D25BB1",
    href: "/solutions#power-apps",
    cta: "Explore Power Apps",
  },
  {
    label: "04",
    title: "Power Automate",
    subtitle: "Autonomous Workflow Orchestration",
    desc: "Eliminate manual friction with high-throughput cloud flows and desktop RPA. We engineer retry-resilient, error-handled automations that connect your legacy systems to modern cloud APIs.",
    accent: "#0078D4",
    href: "/solutions#power-apps",
    cta: "Explore Power Automate",
  },
  {
    label: "05",
    title: "Power BI",
    subtitle: "Data Intelligence & Analytics",
    desc: "From raw telemetry to executive dashboards. We engineer DAX semantic models, DirectQuery layers, and real-time reporting pipelines — turning your data into your most valuable asset.",
    accent: "#F2C811",
    accentText: "#c9a700",
    href: "/solutions#power-bi",
    cta: "Explore Power BI",
  },
  {
    label: "06",
    title: "Platform Governance",
    subtitle: "Compliance, DLP & AI Readiness",
    desc: "Before you scale, you govern. We design DLP policies, CoE toolkits, environment strategies, and AI-readiness audits — ensuring your platform and data estate are secure, compliant, and model-ready.",
    accent: "#10b981",
    href: "/solutions#power-apps",
    cta: "Explore Governance",
  },
  {
    label: "07",
    title: "Data Engineering",
    subtitle: "Pipelines, Analytics & AI Infrastructure",
    desc: "End-to-end data engineering from ingestion to AI deployment. Schema profiling, compliance mapping, entity linkage, and vector-indexing — the infrastructure behind every intelligent solution we ship.",
    accent: "#f59e0b",
    href: "/solutions",
    cta: "Explore Data Engineering",
  },
];

const HomeServices = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimationStarted(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-white relative">
      <style jsx>{`
        @keyframes glow {
          0% { box-shadow: 0 0 0px rgba(124,92,252,0); }
          50% { box-shadow: 0 0 15px rgba(124,92,252,0.3); }
          100% { box-shadow: 0 0 0px rgba(124,92,252,0); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <section ref={sectionRef} className="relative py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">

        {/* Header */}
        <div className={`mb-16 transition-all duration-700 ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1 mb-6">
            <div className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC] animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#7C5CFC]">Microsoft Solutions</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.0] max-w-2xl">
              Our Services
            </h2>
            <p className="text-base font-medium text-zinc-500 max-w-md leading-relaxed lg:text-right">
              Transforming legacy ecosystems into intelligent workspaces — Power Platform, AI agents, governance, and data infrastructure.
            </p>
          </div>
        </div>

        {/* 6 service cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {services.slice(1).map((s, i) => (
            <Link
              key={i}
              href={s.href}
              className={`group relative rounded-3xl border border-zinc-100 bg-zinc-50 p-8 flex flex-col gap-4 hover:border-zinc-200 hover:bg-white hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] transition-all duration-500 ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${(i + 1) * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">{s.label}</span>
                <div className="h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16" style={{ backgroundColor: s.accent }} />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 mb-1">{s.title}</h3>
                <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: s.accentText ?? s.accent }}>{s.subtitle}</p>
              </div>
              <p className="text-sm font-medium text-zinc-500 leading-relaxed flex-1">{s.desc}</p>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-colors" style={{ color: s.accent }}>
                {s.cta}
                <svg className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Merged Power Platform + AI overview block */}
        <div
          className={`bg-white rounded-[32px] overflow-hidden shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] border border-zinc-200 transform transition-all duration-1000 delay-200 ${
            animationStarted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
          } hover:shadow-[0_48px_100px_-20px_rgba(0,0,0,0.12)] hover:border-zinc-300`}
        >
          <div className="p-6 sm:p-8 md:p-12 flex flex-col lg:flex-row gap-8 sm:gap-12 lg:gap-16">
            {/* Diagram */}
            <div className={`w-full lg:w-1/2 flex items-center justify-center transform transition-all duration-1000 delay-400 ${animationStarted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
              <div className="relative w-full max-w-[280px] sm:max-w-md mx-auto aspect-square">
                {/* Center */}
                <div
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#7C5CFC] rounded-full w-2/5 h-2/5 flex items-center justify-center z-10 transition-all duration-1000 delay-800 ${animationStarted ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  style={{ animationName: animationStarted ? 'glow' : 'none', animationDuration: '4s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite' }}
                >
                  <div className="text-center text-white font-bold text-[10px] uppercase tracking-widest leading-relaxed">
                    <div>Solutions</div>
                    <div>& Engineering</div>
                  </div>
                </div>
                {/* Top — Power Apps */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-1/4 transition-all duration-700 delay-900 ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="absolute inset-0 border-4 border-[#D25BB1] rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ animationName: animationStarted ? 'float' : 'none', animationDuration: '3s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDelay: '0.1s' }}>
                    <img src="/PowerApps.svg" alt="Power Apps" className="w-1/2 h-1/2" />
                  </div>
                </div>
                <div className={`absolute top-[12%] left-1/2 -translate-x-1/2 w-1/3 h-1/3 border-4 border-[#D25BB1] rounded-full border-b-0 border-x-0 transition-all duration-700 delay-1000 ${animationStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                {/* Right — Power BI */}
                <div className={`absolute top-1/2 right-0 -translate-y-1/2 w-1/4 h-1/4 transition-all duration-700 delay-1100 ${animationStarted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                  <div className="absolute inset-0 border-4 border-[#EEA32C] rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ animationName: animationStarted ? 'float' : 'none', animationDuration: '3s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDelay: '0.7s' }}>
                    <img src="/PowerBi.svg" alt="Power BI" className="w-3/4 h-1/2" />
                  </div>
                </div>
                <div className={`absolute top-1/2 right-[12%] -translate-y-1/2 w-1/3 h-1/3 border-4 border-[#EEA32C] rounded-full border-l-0 border-y-0 transition-all duration-700 delay-1200 ${animationStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                {/* Bottom — Power Pages */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-1/4 transition-all duration-700 delay-1300 ${animationStarted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="absolute inset-0 border-4 border-[#9B7AC7] rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ animationName: animationStarted ? 'float' : 'none', animationDuration: '3s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDelay: '1.3s' }}>
                    <img src="/PowerPages.svg" alt="Power Pages" className="w-1/2 h-1/2" />
                  </div>
                </div>
                <div className={`absolute bottom-[12%] left-1/2 -translate-x-1/2 w-1/3 h-1/3 border-4 border-[#9B7AC7] rounded-full border-t-0 border-x-0 transition-all duration-700 delay-1400 ${animationStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
                {/* Left — Power Automate */}
                <div className={`absolute top-1/2 left-0 -translate-y-1/2 w-1/4 h-1/4 transition-all duration-700 delay-1500 ${animationStarted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <div className="absolute inset-0 border-4 border-[#2F8DD8] rounded-full" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ animationName: animationStarted ? 'float' : 'none', animationDuration: '3s', animationTimingFunction: 'ease-in-out', animationIterationCount: 'infinite', animationDelay: '1.9s' }}>
                    <img src="/PowerAutomate.svg" alt="Power Automate" className="w-1/2 h-1/2" />
                  </div>
                </div>
                <div className={`absolute top-1/2 left-[12%] -translate-y-1/2 w-1/3 h-1/3 border-4 border-[#2F8DD8] rounded-full border-r-0 border-y-0 transition-all duration-700 delay-1600 ${animationStarted ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`} />
              </div>
            </div>

            {/* Content — Power Platform + AI merged */}
            <div className={`w-full lg:w-1/2 flex flex-col justify-center gap-10 transform transition-all duration-1000 delay-400 ${animationStarted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              {/* Power Platform */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#7C5CFC]" viewBox="0 0 24 24" fill="none">
                      <rect x="4" y="4" width="6" height="6" fill="currentColor" />
                      <rect x="14" y="4" width="6" height="6" fill="currentColor" />
                      <rect x="4" y="14" width="6" height="6" fill="currentColor" />
                      <rect x="14" y="14" width="6" height="6" fill="currentColor" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#7C5CFC]">Power Platform</p>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-950">Apps · Automate · BI · Governance</h3>
                  </div>
                </div>
                <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                  The Microsoft Power Platform is our primary area of expertise — Power Apps, Power Automate, Power BI, and Power Pages, each powerful independently and transformative when unified. We engineer production-grade solutions, govern entire tenants, and keep your platform compliant and model-ready.
                </p>
              </div>

              <div className="h-px bg-zinc-100" />

              {/* AI */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#049DCB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#049DCB]">Artificial Intelligence</p>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-950">Autonomous AI Agents & Swarms</h3>
                  </div>
                </div>
                <p className="text-sm font-medium text-zinc-500 leading-relaxed">
                  We build production-grade AI agents that reason, act, and orchestrate across complex enterprise workflows. Multi-agent systems, RAG pipelines, and real-time decisioning — deployed infrastructure, not demos.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
};

export default HomeServices;
