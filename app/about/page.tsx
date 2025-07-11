'use client';

import Navigation from '@/components/Navigation';
import AnimatedText from '@/components/AnimatedText';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AboutPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      const elements = contentRef.current.querySelectorAll('.animate-item');
      gsap.fromTo(
        elements,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.2,
          delay: 0.5,
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-black grain-overlay">
      <Navigation />
      
      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto" ref={contentRef}>
          <AnimatedText delay={0.5}>
            <h1 className="text-4xl md:text-5xl font-space-grotesk font-medium mb-12 text-balance">
              About
            </h1>
          </AnimatedText>
          
          <div className="space-y-16">
            <div className="animate-item">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-inter mb-8">
                I'm a designer and developer who believes in the power of technology to create meaningful human experiences. My work spans across digital platforms, always with a focus on craftsmanship and attention to detail.
              </p>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-inter">
                Each project is an opportunity to explore new possibilities, challenge conventions, and push the boundaries of what's possible in digital design.
              </p>
            </div>
            
            <div className="animate-item">
              <h2 className="text-2xl md:text-3xl font-space-grotesk font-medium mb-8">
                Philosophy
              </h2>
              <p className="text-lg text-white/70 leading-relaxed font-inter">
                Good design is invisible. It solves problems without drawing attention to itself, creating experiences that feel natural and effortless. I believe in the power of minimalism, where every element serves a purpose and nothing is superfluous.
              </p>
            </div>
            
            <div className="animate-item">
              <h2 className="text-2xl md:text-3xl font-space-grotesk font-medium mb-8">
                Expertise
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-space-grotesk font-medium mb-4 text-white/90">
                    Design
                  </h3>
                  <ul className="space-y-2 text-white/70 font-inter">
                    <li>User Experience Design</li>
                    <li>Interface Design</li>
                    <li>Design Systems</li>
                    <li>Prototyping</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-space-grotesk font-medium mb-4 text-white/90">
                    Development
                  </h3>
                  <ul className="space-y-2 text-white/70 font-inter">
                    <li>Frontend Development</li>
                    <li>Mobile Applications</li>
                    <li>Web Platforms</li>
                    <li>Creative Technology</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}