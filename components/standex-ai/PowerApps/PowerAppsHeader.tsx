"use client";

import React, { useState, useEffect } from 'react';

const PowerAppsHeader = () => {
  const [connectorsCount, setConnectorsCount] = useState(0);
  const [fortuneCount, setFortuneCount] = useState(0);
  const [costCount, setCostCount] = useState(0);

  useEffect(() => {
    let startTime: number = 0;
    let animationFrameId: number;
    const animateCounters = (timestamp: number) => {
      if (startTime === 0) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / 2000, 1);
      const eased = 1 - Math.pow(1 - percentage, 3);
      setConnectorsCount(Math.floor(eased * 300));
      setFortuneCount(Math.floor(eased * 86));
      setCostCount(Math.floor(eased * 74));
      if (percentage < 1) animationFrameId = requestAnimationFrame(animateCounters);
    };
    animationFrameId = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="bg-[#f6fbf8] text-zinc-900 py-24 px-6 lg:px-12 pt-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(circle_at_20%_0%,rgba(210,91,177,0.07),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D25BB1]/20 bg-[#D25BB1]/10 px-4 py-1.5 mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D25BB1]">Microsoft Power Apps Consulting Services</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-900 leading-[0.95] mb-8">
          Low Code<br />Application Development
        </h1>

        <p className="max-w-3xl mx-auto text-xl md:text-2xl font-medium text-zinc-600 leading-relaxed mb-12">
          Revolutionise your business processes with a custom app that connects to all of
          your data, built specifically for you, and is accessible across all of your devices.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-3 rounded-2xl bg-[#D25BB1] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#B04B95] transition-all active:scale-95 shadow-[0_20px_40px_-5px_rgba(210,91,177,0.4)]"
        >
          Book A Free Consultation Call
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 border-t border-zinc-200 pt-16">
          <div className="flex flex-col items-center">
            <div className="text-6xl md:text-7xl font-bold tracking-tight text-[#D25BB1]">{connectorsCount}+</div>
            <p className="font-bold text-lg uppercase tracking-widest mt-3 mb-2 text-zinc-900">Connectors</p>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              With over 300 out-of-the-box connectors, easily integrate data from all of your systems taking the capabilities of your apps further.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-6xl md:text-7xl font-bold tracking-tight text-[#D25BB1]">{fortuneCount}%</div>
            <p className="font-bold text-lg uppercase tracking-widest mt-3 mb-2 text-zinc-900">of the Fortune 500</p>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Have simplified their processes and enhanced user experience by transforming ideas into applications.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-6xl md:text-7xl font-bold tracking-tight text-[#D25BB1]">{costCount}%</div>
            <p className="font-bold text-lg uppercase tracking-widest mt-3 mb-2 text-zinc-900">Lower Costs</p>
            <p className="text-sm text-zinc-500 max-w-xs leading-relaxed">
              Custom apps are available in DAYS with up to 74% lower costs than hiring an external custom application developer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerAppsHeader;
