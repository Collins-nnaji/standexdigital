"use client";

import React, { useState, useEffect } from 'react';

const PowerBiHeader = () => {
  const stats = [
    {
      end: 300,
      suffix: '+',
      title: 'Connectors',
      description: 'To connect data from all your systems into one centralised dashboard'
    },
    {
      end: 97,
      suffix: '%',
      title: 'of the Fortune 500',
      description: 'Use Power BI to turn their data into compelling visual narratives'
    },
    {
      value: '#1',
      title: 'BI Solution',
      description: 'A leader for Analytics and Business Intelligence Platforms for 14 consecutive years.'
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
    <header className="w-full bg-[#f6fbf8] text-zinc-900 py-24 relative overflow-hidden pt-36">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(242,200,17,0.07),transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F2C811]/20 bg-[#F2C811]/10 px-4 py-1.5 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#F2C811]">Microsoft Power BI Consulting Services</span>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-zinc-900 leading-[0.95] mb-8">
            Bring Your Data<br />To Life With Power BI
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl font-medium text-zinc-600 leading-relaxed">
            Expert Power BI solutions to unlock hidden insights in your data and empower your
            business to make data-driven decisions.
          </p>
        </div>

        <div className="text-center mb-20">
          <a
            href="/contact"
            className="inline-flex items-center gap-3 rounded-2xl bg-[#F2C811] px-10 py-5 text-sm font-bold uppercase tracking-widest text-zinc-900 hover:bg-[#D4AF0E] transition-all active:scale-95 shadow-[0_20px_40px_-5px_rgba(242,200,17,0.4)]"
          >
            Book A Free Consultation Call
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-zinc-200 pt-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl md:text-7xl font-bold tracking-tight text-[#F2C811]">
                {stat.value ? <span>{stat.value}</span> : <CountUp end={stat.end ?? 0} suffix={stat.suffix} />}
              </div>
              <h3 className="text-lg font-bold uppercase tracking-widest mt-3 mb-2 text-zinc-900">{stat.title}</h3>
              <p className="text-zinc-500 mx-auto max-w-xs text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default PowerBiHeader;
