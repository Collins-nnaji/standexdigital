"use client";

import React, { useState, useEffect, useRef } from 'react';

const PPdiscovery = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setAnimationStarted(true);
      }
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.15,
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
  
  return (
    <div className="w-full bg-[#f6fbf8] py-16">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4">
        <div 
          className={`bg-white rounded-2xl p-12 relative overflow-hidden transform transition-all duration-1000 ${
            animationStarted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
          }`}
        >
          {/* Background pattern - subtle grid lines */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `linear-gradient(0deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          
          {/* Additional animated elements */}
          <div 
            className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#7C5CFC] to-transparent rounded-full filter blur-3xl opacity-20 transform transition-all duration-2000 ${
              animationStarted ? 'translate-x-0 opacity-20' : 'translate-x-20 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          ></div>
          
          <div 
            className={`absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#7C5CFC] to-transparent rounded-full filter blur-3xl opacity-20 transform transition-all duration-2000 ${
              animationStarted ? 'translate-x-0 opacity-20' : '-translate-x-20 opacity-0'
            }`}
            style={{ transitionDelay: '600ms' }}
          ></div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            {/* Main heading */}
            <h2 
              className={`text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mb-6 leading-tight transform transition-all duration-700 ${
                animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              Want to learn how the Power Platform can transform your business?
            </h2>
            
            {/* Subtext */}
            <p 
              className={`text-zinc-500 text-lg mb-10 transform transition-all duration-700 ${
                animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Schedule a FREE call with our power platform specialists.
            </p>
            
            {/* CTA Button - links to Contact page */}
            <a 
              href="/contact"
              className={`inline-flex items-center bg-[#7C5CFC] text-white py-4 px-8 rounded-md font-medium transition-all duration-300 hover:bg-[#6B4FE0] hover:scale-105 transform ${
                animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              Book A Discovery Session
              <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PPdiscovery;