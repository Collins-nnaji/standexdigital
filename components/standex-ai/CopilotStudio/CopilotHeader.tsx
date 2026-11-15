"use client";

import React from 'react';

const CopilotHeader = () => {
  return (
    <div className="w-full bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-900 py-16 pt-32">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Top header with company name */}
        <div className="text-center mb-6">
          <h3 className="text-sm md:text-base lg:text-lg font-medium text-[#7C5CFC]">
            Microsoft Copilot Studio Consulting
          </h3>
        </div>

        {/* Main headline */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">
            Transform Your Business with Intelligent AI-Powered Chatbots
          </h1>
          <p className="text-sm md:text-base lg:text-lg max-w-3xl mx-auto">
            Harness the power of AI and natural language processing with our Copilot Studio
            Consulting Services.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-12">
          <a 
            href="/contact"
            className="inline-block bg-[#7C5CFC] text-zinc-900 font-medium py-3 px-6 rounded hover:bg-[#7C5CFC] transition-colors duration-300"
          >
            Book A Free Consultation Call &rarr;
          </a>
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {/* Connectors */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[#7C5CFC]">300+</h2>
            <p className="font-medium mb-3">Connectors</p>
            <p className="text-sm text-[#7C5CFC]">
              Integrate Copilot Studio with over 300 connectors to streamline customer service and internal processes.
            </p>
          </div>

          {/* Support */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[#7C5CFC]">24/7</h2>
            <p className="font-medium mb-3">Support</p>
            <p className="text-sm text-[#7C5CFC]">
              Provide round-the-clock assistance to your customers and employees.
            </p>
          </div>

          {/* Experience */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-[#7C5CFC]">30+</h2>
            <p className="font-medium mb-3">Years of Experience</p>
            <p className="text-sm text-[#7C5CFC]">
              Our Certified Microsoft Power Platform Specialists in the UK have over 30 years of combined experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CopilotHeader;