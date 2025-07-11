'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cursor effect
    const cursor = cursorRef.current;
    if (cursor) {
      const moveCursor = (e: MouseEvent) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', moveCursor);
      return () => window.removeEventListener('mousemove', moveCursor);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black grain-overlay">
      <Navigation />
      
      {/* Custom cursor */}
      <div
        ref={cursorRef}
        className="fixed w-4 h-4 bg-white/20 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      <main className="relative">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="min-h-screen flex items-center justify-center px-6 md:px-12"
        >
          <div className="max-w-6xl mx-auto text-center">
            <AnimatedText delay={0.8}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-medium mb-8 leading-tight text-balance">
                Crafting Digital
                <br />
                <span className="text-white/60">Experiences</span>
              </h1>
            </AnimatedText>
            
            <AnimatedText delay={1.2}>
              <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto font-inter leading-relaxed">
                A collection of carefully designed projects that explore the intersection of technology and human experience.
              </p>
            </AnimatedText>
            
            <AnimatedText delay={1.6}>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/work"
                  className="px-8 py-4 bg-white text-black font-inter text-sm tracking-wide hover:bg-white/90 transition-all duration-300 rounded-sm"
                >
                  View Work
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 border border-white/20 text-white font-inter text-sm tracking-wide hover:border-white/40 hover:bg-white/5 transition-all duration-300 rounded-sm"
                >
                  About Me
                </Link>
              </div>
            </AnimatedText>
          </div>
        </section>

        {/* Featured Section */}
        <section className="py-24 md:py-32 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <AnimatedText>
              <h2 className="text-2xl md:text-3xl font-space-grotesk font-medium mb-16 text-center">
                Selected Work
              </h2>
            </AnimatedText>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-8">
                <div className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-all duration-500 cursor-pointer group">
                  <h3 className="text-xl font-space-grotesk font-medium mb-4 group-hover:text-white/90 transition-colors">
                    Mobile Experience
                  </h3>
                  <p className="text-white/60 mb-6 font-inter leading-relaxed group-hover:text-white/70 transition-colors">
                    Reimagining mobile interfaces with fluid animations and intuitive gestures.
                  </p>
                  <div className="flex gap-3">
                    <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/80">Swift</span>
                    <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/80">React Native</span>
                  </div>
                </div>
                
                <div className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-all duration-500 cursor-pointer group">
                  <h3 className="text-xl font-space-grotesk font-medium mb-4 group-hover:text-white/90 transition-colors">
                    Web Platform
                  </h3>
                  <p className="text-white/60 mb-6 font-inter leading-relaxed group-hover:text-white/70 transition-colors">
                    Building scalable web applications with modern frameworks and thoughtful design.
                  </p>
                  <div className="flex gap-3">
                    <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/80">Next.js</span>
                    <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/80">TypeScript</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-all duration-500 cursor-pointer group">
                  <h3 className="text-xl font-space-grotesk font-medium mb-4 group-hover:text-white/90 transition-colors">
                    Design Systems
                  </h3>
                  <p className="text-white/60 mb-6 font-inter leading-relaxed group-hover:text-white/70 transition-colors">
                    Creating cohesive design languages that scale across multiple platforms.
                  </p>
                  <div className="flex gap-3">
                    <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/80">Figma</span>
                    <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/80">Tailwind</span>
                  </div>
                </div>
                
                <div className="p-8 md:p-12 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 rounded-lg hover:border-white/20 transition-all duration-500 cursor-pointer group">
                  <h3 className="text-xl font-space-grotesk font-medium mb-4 group-hover:text-white/90 transition-colors">
                    Interactive Art
                  </h3>
                  <p className="text-white/60 mb-6 font-inter leading-relaxed group-hover:text-white/70 transition-colors">
                    Exploring the boundaries between technology and creative expression.
                  </p>
                  <div className="flex gap-3">
                    <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/80">Three.js</span>
                    <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-white/80">WebGL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}