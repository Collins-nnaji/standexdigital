"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Users, CheckCircle2, Zap, Layout } from "lucide-react";
import { useEffect, useState } from "react";

const RESEARCHERS = [
  { name: "Dr. Aris Chen", role: "AI Architecture", status: "Active", initial: "AC" },
  { name: "Prof. Sarah Jensen", role: "VLM/Multimodal", status: "Vetted", initial: "SJ" },
  { name: "Dr. Liam O'Connell", role: "Systems Optimization", status: "Active", initial: "LO" },
];

export function HeroGraphic() {
  const [activeNode, setActiveNode] = useState(0);
  const [nodes, setNodes] = useState<{ top: string; left: string; x: number[]; y: number[] }[]>([]);

  useEffect(() => {
    const generatedNodes = [...Array(6)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      x: [0, Math.random() * 20 - 10, 0],
      y: [0, Math.random() * 20 - 10, 0]
    }));
    setNodes(generatedNodes);

    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % RESEARCHERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-visible select-none pointer-events-none">
      {/* Subtle Background Nodes */}
      <div className="absolute inset-0 z-0">
        {nodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
              x: node.x,
              y: node.y
            }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
            className="absolute h-1.5 w-1.5 rounded-full bg-[#7C5CFC]/20"
            style={{
              top: node.top,
              left: node.left,
            }}
          />
        ))}
      </div>

      {/* Professional Connection Beams */}
      <svg className="absolute inset-0 h-full w-full z-10 overflow-visible">
         <defs>
            <linearGradient id="beamGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
               <stop offset="0%" stopColor="#7C5CFC" stopOpacity="0" />
               <stop offset="50%" stopColor="#7C5CFC" stopOpacity="0.3" />
               <stop offset="100%" stopColor="#7C5CFC" stopOpacity="0" />
            </linearGradient>
         </defs>
         
         <AnimatePresence mode="wait">
            <motion.path
               key={activeNode}
               initial={{ pathLength: 0, opacity: 0 }}
               animate={{ pathLength: 1, opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 1.5, ease: "easeInOut" }}
               d={`M 50% 50% L ${activeNode === 0 ? "80%" : activeNode === 1 ? "75%" : "85%"} ${activeNode === 0 ? "20%" : activeNode === 1 ? "40%" : "70%"}`}
               stroke="url(#beamGradientLight)"
               strokeWidth="1.5"
               fill="transparent"
               className="translate-x-[-50%] translate-y-[-45%]"
            />
         </AnimatePresence>
      </svg>

      {/* Technical Brief Card - Light Theme */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-20 w-full max-w-[340px] rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_32px_128px_rgba(124,92,252,0.08)] ring-1 ring-black/[0.02]"
      >
        <div className="mb-4 flex items-center justify-between border-b border-zinc-50 pb-4">
           <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#7C5CFC]/10 text-[#7C5CFC]">
                 <Terminal className="h-4 w-4" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Technical Brief</p>
           </div>
           <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>

        <div className="space-y-4">
           <div>
              <h3 className="font-syne text-lg font-black text-zinc-900 leading-tight">Quantized Multi-Modal Logic</h3>
              <p className="mt-1 text-[11px] text-zinc-500 font-medium tracking-tight whitespace-nowrap">Production Engineering / Mission-Critical</p>
           </div>

           <div className="space-y-3">
              <div className="flex items-center gap-2">
                 <div className="h-1.5 w-1.5 rounded-full bg-[#7C5CFC]" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-[#7C5CFC]">Implementation Goal</span>
              </div>
              <div className="rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
                 <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-white shadow-sm border border-zinc-100 flex items-center justify-center">
                       <CheckCircle2 className="h-4 w-4 text-[#7C5CFC]" />
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Status</p>
                       <p className="text-[10px] font-bold text-zinc-900 capitalize">Architecture Complete</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Vetted Personnel Nodes - Light Theme */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {RESEARCHERS.map((res, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: activeNode === i ? [0, -5, 0] : 0
            }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.2 }}
            className={cn(
               "absolute rounded-3xl border p-4 transition-all duration-500 bg-white",
               activeNode === i 
                 ? "border-[#7C5CFC]/20 shadow-[0_20px_50px_rgba(124,92,252,0.12)] scale-110" 
                 : "border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] opacity-60"
            )}
            style={{
              top: i === 0 ? "15%" : i === 1 ? "45%" : "75%",
              right: i === 0 ? "5%" : i === 1 ? "0%" : "8%",
            }}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full text-xs font-black ring-2",
                activeNode === i ? "bg-[#7C5CFC] text-white ring-[#7C5CFC]/10 shadow-lg shadow-[#7C5CFC]/20" : "bg-zinc-50 text-zinc-400 ring-zinc-100"
              )}>
                {res.initial}
              </div>
              <div className="max-w-[120px]">
                <p className="text-[10px] font-black text-zinc-900 truncate">{res.name}</p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-500">{res.role}</p>
                {activeNode === i && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-[9px] font-black text-[#7C5CFC] uppercase tracking-[0.1em]"
                  >
                    Vetted Profile
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
