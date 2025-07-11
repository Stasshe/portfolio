"use client";

import { useEffect, useRef } from 'react';
import { useClickEffects } from "../hooks/useClickEffects";
import Link from "next/link";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
  const { theme } = useTheme();
  const { containerRef, clickEffects, handlePageClick } = useClickEffects();
  const heroTextRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const decorativeElementsRef = useRef<HTMLDivElement[]>([]);
  const backgroundPatternsRef = useRef<HTMLDivElement[]>([]);


  useEffect(() => {
    // Initial page load animations
    const animateElements = () => {
      // Navigation fade in
      if (navRef.current) {
        navRef.current.style.transform = 'translateY(-30px)';
        navRef.current.style.opacity = '0';
        setTimeout(() => {
          if (navRef.current) {
            navRef.current.style.transition = 'all 0.8s ease-out';
            navRef.current.style.transform = 'translateY(0)';
            navRef.current.style.opacity = '1';
          }
        }, 100);
      }

      // Hero text animations
      if (heroTextRef.current) {
        const children = Array.from(heroTextRef.current.children);
        children.forEach((child, index) => {
          const element = child as HTMLElement;
          element.style.transform = 'translateY(100px)';
          element.style.opacity = '0';
          setTimeout(() => {
            element.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
          }, 300 + index * 150);
        });
      }

      // Subtitle and role animations
      [subtitleRef, roleRef].forEach((ref, index) => {
        if (ref.current) {
          ref.current.style.transform = `translateY(${30 - index * 10}px)`;
          ref.current.style.opacity = '0';
          setTimeout(() => {
            if (ref.current) {
              ref.current.style.transition = 'all 0.8s ease-out';
              ref.current.style.transform = 'translateY(0)';
              ref.current.style.opacity = '1';
            }
          }, 800 + index * 200);
        }
      });

      // Decorative elements animation
      decorativeElementsRef.current.forEach((element, index) => {
        if (element) {
          element.style.transform = 'scale(0)';
          element.style.opacity = '0';
          setTimeout(() => {
            element.style.transition = 'all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            element.style.transform = 'scale(1)';
            element.style.opacity = '1';
          }, 1000 + index * 100);
        }
      });

      // Scroll indicator
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.transform = 'translateY(20px)';
        scrollIndicatorRef.current.style.opacity = '0';
        setTimeout(() => {
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.transition = 'all 0.6s ease-out';
            scrollIndicatorRef.current.style.transform = 'translateY(0)';
            scrollIndicatorRef.current.style.opacity = '1';
          }
        }, 1200);
      }
    };

    // Floating & parallax animation for background patterns
    const animateBackgroundPatterns = () => {
      // 各要素に個別のパラメータを割り当て
      const params = backgroundPatternsRef.current.map((_, i) => ({
        amplitude: 15 + i * 8,
        speed: 0.15 + i * 0.07,
        direction: i % 2 === 0 ? 1 : -1,
        baseX: 0,
        baseY: 0,
        phase: Math.random() * Math.PI * 2,
      }));

      const animate = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const t = performance.now() / 1000;
        backgroundPatternsRef.current.forEach((element, i) => {
          if (!element) return;
          const { amplitude, speed, direction, phase } = params[i];
          // パララックス: スクロール量に応じてY方向に遅れて動く
          const parallax = scrollY * (0.08 + i * 0.03);
          // 浮遊アニメーション
          const x = Math.sin(t * speed + phase) * amplitude * direction;
          const y = Math.cos(t * speed + phase) * amplitude + parallax;
          element.style.transform = `translate(${x}px, ${y}px)`;
        });
        requestAnimationFrame(animate);
      };
      animate();
    };

    // Continuous scroll indicator animation
    const animateScrollIndicator = () => {
      if (scrollIndicatorRef.current) {
        let direction = 1;
        setInterval(() => {
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.transform = `translateY(${direction * 10}px)`;
            direction *= -1;
          }
        }, 1500);
      }
    };

    animateElements();
    setTimeout(animateBackgroundPatterns, 1500);
    setTimeout(animateScrollIndicator, 2000);
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !decorativeElementsRef.current.includes(el)) {
      decorativeElementsRef.current.push(el);
    }
  };

  const addToBackgroundRefs = (el: HTMLDivElement) => {
    if (el && !backgroundPatternsRef.current.includes(el)) {
      backgroundPatternsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`min-h-screen bg-gradient-to-br from-[${theme.mainBg}] via-[${theme.accentSoft}] to-[${theme.accentSoft}] text-[${theme.mainText}] overflow-x-hidden relative cursor-pointer`}
      onClick={handlePageClick}
    >
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Organic shapes */}
        <div ref={addToBackgroundRefs} className={`absolute top-1/4 right-1/3 w-32 h-32 bg-gradient-to-br from-[${theme.accent}]/10 to-[${theme.accent}]/5 rounded-full blur-xl`}></div>
        <div ref={addToBackgroundRefs} className={`absolute bottom-1/3 left-1/4 w-48 h-48 bg-gradient-to-tl from-[${theme.accent}]/8 to-[${theme.accent}]/3 rounded-full blur-2xl`}></div>
        <div ref={addToBackgroundRefs} className={`absolute top-2/3 right-1/6 w-24 h-24 bg-gradient-to-br from-[${theme.accent}]/12 to-[${theme.accent}]/6 rounded-full blur-lg`}></div>
        <div ref={addToBackgroundRefs} className={`absolute top-1/6 left-2/3 w-40 h-40 bg-gradient-to-bl from-[${theme.accent}]/7 to-[${theme.accent}]/4 rounded-full blur-xl`}></div>
        
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(to right, ${theme.accentGrid} 1px, transparent 1px),linear-gradient(to bottom, ${theme.accentGrid} 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      </div>

      {/* Click Effects */}
      {clickEffects.map((effect) => (
        <div
          key={effect.id}
          className="absolute pointer-events-none z-50"
          style={{
            left: effect.x,
            top: effect.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Expanding circle */}
          <div className="absolute inset-0 w-4 h-4 border border-[#ABBAA9]/50 rounded-full animate-ping"></div>
          {/* Rotating squares */}
          <div className="absolute inset-0 w-3 h-3 bg-[#ABBAA9]/30 transform rotate-45 animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-[#ABBAA9]/50 transform rotate-12 animate-spin"></div>
          {/* Expanding diamond */}
          <div className="absolute inset-0 w-1 h-1 bg-[#ABBAA9]/70 transform rotate-45 animate-bounce"></div>
        </div>
      ))}

      {/* Navigation */}
      <nav ref={navRef} className={`fixed top-0 left-0 right-0 z-50 p-8 backdrop-blur-md bg-[${theme.mainBg}]/90 border-b border-[${theme.accent}]/10`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-lg font-light tracking-wider">
            Portfolio
          </div>
          <div className="flex space-x-8 text-sm font-light tracking-wide">
            <Link href="/work" className={`hover:text-[${theme.accent}] transition-colors duration-300`} scroll={false}>Work</Link>
            <Link href="/about" className={`hover:text-[${theme.accent}] transition-colors duration-300`} scroll={false}>About</Link>
            <Link href="/contact" className={`hover:text-[${theme.accent}] transition-colors duration-300`} scroll={false}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Natural Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div ref={addToRefs} className="absolute top-1/4 right-1/4 w-3 h-3 bg-gradient-to-br from-[#ABBAA9] to-[#ABBAA9]/70 rounded-full shadow-lg"></div>
            <div ref={addToRefs} className="absolute top-1/3 left-1/6 w-2 h-2 bg-gradient-to-br from-[#ABBAA9]/80 to-[#ABBAA9]/50 rounded-full shadow-md"></div>
            <div ref={addToRefs} className="absolute top-1/6 right-2/3 w-1.5 h-1.5 bg-gradient-to-br from-[#ABBAA9]/60 to-[#ABBAA9]/30 rounded-full shadow-sm"></div>
            <div ref={addToRefs} className="absolute bottom-1/3 left-2/3 w-3.5 h-3.5 bg-gradient-to-br from-[#ABBAA9]/85 to-[#ABBAA9]/55 rounded-full shadow-lg"></div>
            
            {/* Organic line elements */}
            <div ref={addToRefs} className="absolute top-1/2 left-1/8 w-16 h-0.5 bg-gradient-to-r from-[#ABBAA9]/40 to-transparent rounded-full transform rotate-12"></div>
            <div ref={addToRefs} className="absolute bottom-1/5 right-1/8 w-12 h-0.5 bg-gradient-to-l from-[#ABBAA9]/30 to-transparent rounded-full transform -rotate-6"></div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[70vh]">
            {/* Left Column - Main Text */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-8">
              <div ref={heroTextRef} className="space-y-4">
                <div className="text-6xl md:text-8xl lg:text-9xl font-extralight leading-none tracking-tight">
                  Creative
                </div>
                <div className="text-6xl md:text-8xl lg:text-9xl font-extralight leading-none tracking-tight">
                  Developer
                </div>
                <div className="text-6xl md:text-8xl lg:text-9xl font-extralight leading-none tracking-tight">
                  Designer
                </div>
              </div>

              <div ref={subtitleRef} className="max-w-xl">
                <p className={`text-xl md:text-2xl font-light leading-relaxed text-[${theme.mainText}]/80`}>
                  Crafting digital experiences through the intersection of 
                  <span className={`text-[${theme.accent}] font-normal`}> front-end excellence</span>, 
                  <span className={`text-[${theme.accent}] font-normal`}> back-end innovation</span>, and 
                  <span className={`text-[${theme.accent}] font-normal`}> Swift-powered gaming</span>.
                </p>
              </div>
            </div>

            {/* Right Column - Role & Details */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-10">
              <div ref={roleRef} className="space-y-4">
                <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                  Currently
                </div>
                <div className="text-lg font-light leading-relaxed">
                  Student & Developer
                  <br />
                  <span className="text-[#ABBAA9]">Full-Stack Engineer</span>
                  <br />
                  <span className="text-[#ABBAA9]">Swift Game Developer</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                  Focus Areas
                </div>
                <div className="space-y-2 text-sm font-light leading-relaxed">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#ABBAA9] rounded-full"></div>
                    <span>Web Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#ABBAA9] rounded-full"></div>
                    <span>Backend Systems</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#ABBAA9] rounded-full"></div>
                    <span>iOS Game Development</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 bg-[#ABBAA9] rounded-full"></div>
                    <span>UI/UX Design</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator (右寄せ・☟アイコン) */}
          <div
            ref={scrollIndicatorRef}
            className="absolute bottom-28 right-[12rem] flex flex-col items-end space-y-1 z-20"
            >
            <div className="flex items-center space-x-2">
              <span className="text-xs uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">Scroll</span>
              <span className="text-2xl md:text-3xl lg:text-4xl select-none" style={{lineHeight:1}}>☟</span>
            </div>
          </div>
        </div>
      </main>

      {/* Secondary Section */}
      <section className="py-32 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                Philosophy
              </div>
              <div className="text-3xl md:text-4xl font-light leading-tight">
                Code as craft.
                <br />
                <span className="text-[#ABBAA9]">Design as expression.</span>
                <br />
                Technology as art.
              </div>
            </div>
            <div className="space-y-6 text-lg font-light leading-relaxed text-[#2C2319]/80">
              <p>
                Every line of code is an opportunity to create something beautiful. 
                I believe in the power of thoughtful design, clean architecture, 
                and the endless possibilities that emerge when creativity meets technology.
              </p>
              <p>
                From crafting responsive web experiences to building immersive games, 
                I approach each project with the same dedication to excellence and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}