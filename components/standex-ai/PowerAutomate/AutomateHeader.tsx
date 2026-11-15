"use client";

import React, { useState, useEffect } from 'react';

const AutomateHeader = () => {
  const stats = [
    {
      end: 300,
      suffix: '+',
      title: 'Connectors',
      description: 'Power Automate connects and automates tasks across hundreds of apps and systems.'
    },
    {
      end: 25,
      suffix: '%',
      title: 'Error Reduction',
      description: 'According to Forrester, organisations reduced errors by 24.7% when increasing automated workflows.'
    },
    {
      end: 30,
      suffix: '+',
      title: 'Years of Experience',
      description: 'Our consultants in the UK have over 30 years of automation experience.'
    }
  ];

  const CountUp = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
      let startTime: number = 0;
      let animationFrame: number;
      const animate = (timestamp: number) => {
        if (startTime === 0) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        setCount(Math.floor(percentage * end));
        if (percentage < 1) animationFrame = requestAnimationFrame(animate);
      };
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);
    return <span>{count}{suffix}</span>;
  };

  return (
    <div className="w-full bg-[#f6fbf8] text-zinc-900 py-24 px-6 lg:px-12 pt-36 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-[600px] bg-[radial-gradient(circle_at_80%_0%,rgba(0,120,212,0.07),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#0078D4]/20 bg-[#0078D4]/10 px-4 py-1.5 mb-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0078D4]">Microsoft Power Automate Consulting Services</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-900 leading-[0.95] mb-8">
          Optimise Your Business<br />Processes With Power Automate
        </h1>

        <p className="text-xl md:text-2xl font-medium text-zinc-600 leading-relaxed mb-12 max-w-3xl mx-auto">
          Our team of automation specialists will streamline your processes and workflows to
          eliminate repetitive manual tasks, saving you time and money.
        </p>

        <a
          href="/contact"
          className="inline-flex items-center gap-3 rounded-2xl bg-[#0078D4] px-10 py-5 text-sm font-bold uppercase tracking-widest text-white hover:bg-[#005a9e] transition-all active:scale-95 shadow-[0_20px_40px_-5px_rgba(0,120,212,0.4)]"
        >
          Book A Free Consultation Call
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>

      <div className="max-w-7xl mx-auto mt-20 border-t border-zinc-200 pt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl md:text-7xl font-bold tracking-tight text-[#0078D4]">
                <CountUp end={stat.end} suffix={stat.suffix} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest mt-3 mb-2 text-zinc-900">{stat.title}</h3>
              <p className="text-zinc-500 mx-auto max-w-xs text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutomateHeader;
