"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, TrendingUp, Clock, Award } from 'lucide-react';

const HomeAbout = () => {
  const [stats, setStats] = useState([
    { 
      title: "Efficiency Gain", 
      value: 0, 
      target: 75, 
      isPercentage: true,
      icon: TrendingUp,
      color: "from-emerald-400 to-[#7C5CFC]" 
    },
    { 
      title: "Client Satisfaction", 
      value: 0, 
      target: 95, 
      isPercentage: true,
      icon: Award,
      color: "from-sky-400 to-blue-500" 
    },
    { 
      title: "Human Hours Saved", 
      value: 0, 
      target: 80000, 
      isPercentage: false,
      icon: Clock,
      color: "from-violet-400 to-purple-500" 
    }
  ]);
  
  const [animationStarted, setAnimationStarted] = useState(false);
  const sectionRef = useRef(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countersStarted = useRef(false);
  
  // Use a more precise intersection observer with better options
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setAnimationStarted(true);
        
        // Only start counters once
        if (!countersStarted.current) {
          startCounters();
          countersStarted.current = true;
        }
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.25, // trigger when 25% visible
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Separate function to handle counter animations
  const startCounters = () => {
    stats.forEach((stat, index) => {
      const increment = stat.isPercentage ? 1 : Math.ceil(stat.target / 100);
      let currentValue = 0;
      
      const intervalId = setInterval(() => {
        currentValue += increment;
        
        if (currentValue >= stat.target) {
          currentValue = stat.target;
          clearInterval(intervalId);
        }
        
        setStats(prevStats => {
          const newStats = [...prevStats];
          newStats[index] = {
            ...newStats[index],
            value: currentValue
          };
          return newStats;
        });
      }, 20);
    });
  };
  
  return (
    <div className="w-full bg-zinc-50/50 relative overflow-hidden">
      <div 
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 py-16 sm:py-24 text-zinc-900"
      >
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-600">Company Overview</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
            Global Engineering <br className="hidden sm:block" /> & Digital Strategy.
          </h2>
        </div>
        
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div 
            className={`relative transform transition-all duration-1000 delay-200 ${
              animationStarted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <img 
              src="/HomeAboutPic.webp"
              alt="Modern architecture"
              loading="lazy"
              decoding="async"
              className="rounded-lg w-full object-cover border border-gray-800"
            />
            <div className="hidden lg:block mt-8">
              <Link
                href="/data-solutions#about"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-zinc-900 px-6 py-3.5 text-[11px] font-bold tracking-tight uppercase tracking-widest text-white shadow-lg transition-all active:scale-95"
              >
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-8">
            <p 
              className={`text-zinc-500 text-lg font-semibold tracking-tight leading-relaxed transform transition-all duration-1000 delay-300 ${
                animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Standex is a global engineering firm with a presence in Nigeria and the United Kingdom, delivering production-grade consulting for world-class enterprises. We specialize in maximizing infrastructure ROI through intelligent automation and strategic cloud architectures.
              <br /><br />
              Our solutions enable organizations to connect legacy processes, transform diagnostic reporting, and eliminate manual overhead through proprietary AI and Power Platform integrations.
            </p>
            
            <div className={`h-px bg-zinc-200 w-full transition-all duration-1000 delay-400 ${
              animationStarted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                const delay = 500 + (index * 100);
                
                return (
                  <div 
                    key={index} 
                    className={`relative overflow-hidden bg-white text-zinc-900 rounded-3xl border border-zinc-200 shadow-sm transition-all duration-700 transform hover:shadow-md ${
                      animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    }`}
                    style={{ transitionDelay: `${delay}ms` }}
                    ref={el => { statRefs.current[index] = el; }}
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${stat.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">{stat.title}</h3>
                        <div className={`rounded-xl p-2 bg-zinc-50 border border-zinc-100`}>
                          <IconComponent className="w-4 h-4 text-zinc-900" />
                        </div>
                      </div>
                      <div className="text-3xl font-bold tracking-tight text-zinc-950">
                        {stat.isPercentage ? 
                          `${stat.value}%` : 
                          stat.value.toLocaleString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        <div className={`lg:hidden mt-8 transform transition-all duration-700 delay-800 ${
          animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <Link href="/data-solutions#about">
           <button className="inline-flex items-center gap-2 bg-[#7C5CFC] text-white px-6 py-3 rounded-md hover:bg-[#6B4FE0] transition-all duration-200 hover:scale-105 transform">
             More About us
             <ArrowRight className="w-5 h-5" />
           </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
