"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type MarqueeIcon = {
  src: string;
  name: string;
  /** Dark logo assets — invert to white for the dark hero background */
  lightOnDark?: boolean;
};

const powerPlatformIcons: MarqueeIcon[] = [
  { src: "/PowerApps.svg", name: "Power Apps" },
  { src: "/PowerAutomate.svg", name: "Power Automate" },
  { src: "/PowerBi.svg", name: "Power BI" },
  { src: "/PowerPlatform.svg", name: "Power Platform" },
  { src: "/CopilotStudio.svg", name: "Copilot Studio" },
];

const aiCloudIcons: MarqueeIcon[] = [
  { src: "/images/openai%20logo.svg", name: "OpenAI", lightOnDark: true },
  { src: "/images/azure%20logo.png", name: "Azure AI" },
  { src: "/images/claude%20logo.svg", name: "Anthropic" },
  { src: "/images/nextjslogo.png", name: "Next.js", lightOnDark: true },
];

export function LandingHero() {
  return (
    <section className="relative min-h-[100dvh] w-full overflow-hidden bg-zinc-950 px-3 sm:px-5 md:px-8 py-3 sm:py-4 md:py-5">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.12),transparent_70%)]" />
        <CodeBackground />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "radial-gradient(#10b981 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl h-full flex flex-col justify-center min-h-[calc(100dvh-1.5rem)] sm:min-h-[calc(100dvh-2rem)] md:min-h-[calc(100dvh-2.5rem)] pt-28 sm:pt-24 md:pt-20 pb-10 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 sm:gap-16 lg:gap-24 items-center py-4 sm:py-6">
          <div className="landing-hero-enter flex flex-col gap-6 sm:gap-8 lg:gap-10 z-10 text-center lg:text-left">
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.95] text-white">
                Architecting <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400">
                  Intelligent
                </span>
                <br />
                Systems.
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-emerald-400/90 tracking-tight">
                Automate and save cost.
              </p>
            </div>

            <p className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed text-zinc-400">
              Transforming enterprise complexity into high-performance
              <span className="text-white font-bold border-b-2 border-emerald-500/30 mx-1">AI Agents</span>
              and
              <span className="text-white font-bold border-b-2 border-emerald-500/30 mx-1">Power Platform</span>
              innovations. We implement the future, then train your team to own it.
            </p>

            <div className="flex flex-col items-center lg:items-start gap-4">
              <div className="flex flex-wrap gap-4 sm:gap-5 justify-center lg:justify-start w-full">
                <Link
                  href="/Contact"
                  className="group relative flex h-12 sm:h-14 lg:h-16 w-full sm:w-auto items-center justify-center gap-3 sm:gap-4 overflow-hidden rounded-2xl bg-emerald-500 px-6 sm:px-8 lg:px-10 text-xs sm:text-sm font-bold tracking-widest text-white transition-all hover:bg-emerald-600 shadow-lg shadow-emerald-200"
                >
                  <span>ENGINEER A SOLUTION</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] sm:text-xs font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden />
                <span className="text-white">Free 30-minute business consultation call</span>
              </p>
            </div>
          </div>

          <div className="relative h-[320px] sm:h-[450px] md:h-[550px] lg:h-[750px] grid grid-cols-2 gap-4 sm:gap-6 overflow-hidden max-w-md sm:max-w-none mx-auto lg:mx-0 w-full">
            <div className="relative h-full">
              <VerticalIconColumn icons={powerPlatformIcons} direction="up" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
            </div>
            <div className="relative h-full translate-y-8 sm:translate-y-12 lg:translate-y-20">
              <VerticalIconColumn icons={aiCloudIcons} direction="down" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-zinc-950 to-transparent z-10" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function VerticalIconColumn({
  icons,
  direction = "up",
}: {
  icons: MarqueeIcon[];
  direction?: "up" | "down";
}) {
  const loopIcons = [...icons, ...icons];

  return (
    <div className="flex flex-col gap-6 py-6 h-full overflow-hidden">
      <div
        className={cn(
          "flex flex-col gap-6 will-change-transform",
          direction === "up" ? "landing-marquee-up" : "landing-marquee-down"
        )}
      >
        {loopIcons.map((icon, i) => (
          <div key={`${icon.name}-${i}`} className="group relative">
            <div className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 flex items-center justify-center p-3 sm:p-4 transition-all">
              <img
                src={icon.src}
                alt={icon.name}
                width={112}
                height={112}
                loading={i < icons.length ? "eager" : "lazy"}
                decoding="async"
                className={cn(
                  "h-full w-full object-contain transition-opacity",
                  icon.lightOnDark
                    ? "brightness-0 invert opacity-75 group-hover:opacity-100"
                    : "brightness-110 opacity-60 group-hover:opacity-100"
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeBackground() {
  const lines = [
    "class IntelligentEngine {",
    "  public async deployAgent(model: string) {",
    "    const system = await PowerPlatform.init();",
    "    return system.inject(AI_CORE);",
    "  }",
    "}",
    "const Standex = new AI_Engineering_Partner();",
    "Standex.audit(infrastructure).optimize();",
    "// LLM context: high-performance tokens only",
    "// Power Platform: Low-code scaling active",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none select-none opacity-[0.1]">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`code-pill-${i}`}
          className="absolute flex items-center gap-4 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full"
          style={{ top: `${15 + i * 12}%`, left: `${4 + i * 2}%` }}
        >
          <div className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[8px] font-bold text-emerald-500/80 tracking-widest uppercase">
            {lines[i % lines.length]}
          </span>
        </div>
      ))}

      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={`code-line-${i}`}
          className="landing-code-enter absolute text-[10px] font-mono text-emerald-500/50 whitespace-nowrap text-right"
          style={{
            bottom: `${10 + i * 12}%`,
            right: `${2 + i * 2}%`,
            animationDelay: `${0.1 * i}s`,
          }}
        >
          {lines[(i + 4) % lines.length]}
        </div>
      ))}
    </div>
  );
}
