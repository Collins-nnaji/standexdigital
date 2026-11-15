"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Linkedin, Mail } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';

const TrainingConnect = () => {
  const [animationStarted, setAnimationStarted] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useRouter();
  const location = usePathname();
  
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

  // Function to handle navigation to contact page and scroll to email section
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're already on the contact page, just scroll to the section
    if (location === '/contact') {
      const emailElement = document.getElementById('contact-email');
      if (emailElement) {
        emailElement.scrollIntoView({ behavior: 'smooth' });
        // Optional: Add a highlight effect
        emailElement.classList.add('pulse-highlight');
        setTimeout(() => {
          emailElement.classList.remove('pulse-highlight');
        }, 2000);
      }
    } else {
      // Navigate to contact page with a hash for the email section
      navigate.push('/contact?section=email');
    }
  };

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        {/* Add CSS for the highlight effect */}
        <style>
          {`
            @keyframes pulse {
              0% { box-shadow: 0 0 0 0 rgba(4, 157, 203, 0.7); }
              70% { box-shadow: 0 0 0 10px rgba(4, 157, 203, 0); }
              100% { box-shadow: 0 0 0 0 rgba(4, 157, 203, 0); }
            }
            
            .pulse-highlight {
              animation: pulse 1s ease-in-out 2;
              background-color: rgba(4, 157, 203, 0.2);
            }
          `}
        </style>
        
        <h2 
          className={`text-3xl md:text-4xl font-black tracking-tight text-center text-white mb-12 transform transition-all duration-700 ${
            animationStarted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          Connect With Us
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Side - Image with Pattern */}
          <div 
            className={`md:w-1/2 transform transition-all duration-700 delay-100 ${
              animationStarted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="w-full max-w-md mx-auto">
              <img 
                src="/ConnectImage1.svg" 
                alt="Person using mobile phone" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Right Side - Text and Buttons */}
          <div 
            className={`md:w-1/2 transform transition-all duration-700 delay-200 ${
              animationStarted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <p className="text-lg text-zinc-400 mb-8">
              Join our vibrant community and stay updated with the latest news, updates, and exclusive offers. Connect with us on Telegram to be part of our growing network of enthusiasts and professionals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://www.linkedin.com/company/standex-digital" 
                className="flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#6B4FE0] text-white px-6 py-3 rounded-md transition duration-200"
              >
                <Linkedin size={20} />
                <span>Join us on LinkedIn</span>
              </a>
              <a 
                href="#" 
                onClick={handleEmailClick}
                className="flex items-center justify-center gap-2 bg-[#7C5CFC] hover:bg-[#25a936] text-white px-6 py-3 rounded-md transition duration-200"
              >
                <Mail size={20} />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainingConnect;