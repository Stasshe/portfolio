"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const decorativeElementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial page load animations
      const tl = gsap.timeline();
      
      // Navigation fade in
      tl.from(navRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      // Hero text animations with staggered reveals
      tl.from(heroTextRef.current?.children || [], {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.15
      }, "-=0.5");

      // Subtitle reveal
      tl.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.8");

      // Role reveal
      tl.from(roleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6");

      // Decorative elements animation
      tl.from(decorativeElementsRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.1
      }, "-=0.4");

      // Scroll indicator
      tl.from(scrollIndicatorRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3");

      // Continuous scroll indicator animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Parallax effect for decorative elements
      decorativeElementsRef.current.forEach((element, index) => {
        gsap.to(element, {
          y: -50 * (index + 1),
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      });

      // Text color animation on scroll
      gsap.to(heroTextRef.current, {
        color: "#ABBAA9",
        scrollTrigger: {
          trigger: heroTextRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLDivElement) => {
    if (el && !decorativeElementsRef.current.includes(el)) {
      decorativeElementsRef.current.push(el);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#F6FAF5] text-[#2C2319] overflow-x-hidden">
      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 p-8 backdrop-blur-sm bg-[#F6FAF5]/80">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-lg font-light tracking-wider">
            Portfolio
          </div>
          <div className="flex space-x-8 text-sm font-light tracking-wide">
            <a href="#work" className="hover:text-[#ABBAA9] transition-colors duration-300">Work</a>
            <a href="#about" className="hover:text-[#ABBAA9] transition-colors duration-300">About</a>
            <a href="#contact" className="hover:text-[#ABBAA9] transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div ref={addToRefs} className="absolute top-1/4 right-1/4 w-2 h-2 bg-[#ABBAA9] rounded-full opacity-60"></div>
            <div ref={addToRefs} className="absolute top-1/3 left-1/6 w-1 h-1 bg-[#ABBAA9] rounded-full opacity-40"></div>
            <div ref={addToRefs} className="absolute bottom-1/4 right-1/6 w-3 h-3 bg-[#ABBAA9] rounded-full opacity-30"></div>
            <div ref={addToRefs} className="absolute top-2/3 left-1/4 w-1.5 h-1.5 bg-[#ABBAA9] rounded-full opacity-50"></div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[70vh]">
            {/* Left Column - Main Text */}
            <div className="lg:col-span-8 flex flex-col justify-center space-y-12">
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
                <p className="text-xl md:text-2xl font-light leading-relaxed text-[#2C2319]/80">
                  Crafting digital experiences through the intersection of 
                  <span className="text-[#ABBAA9] font-normal"> front-end excellence</span>, 
                  <span className="text-[#ABBAA9] font-normal"> back-end innovation</span>, and 
                  <span className="text-[#ABBAA9] font-normal"> Swift-powered gaming</span>.
                </p>
              </div>
            </div>

            {/* Right Column - Role & Details */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-16">
              <div ref={roleRef} className="space-y-6">
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

              <div className="space-y-6">
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

          {/* Scroll Indicator */}
          <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
            <div className="text-xs uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
              Scroll
            </div>
            <div className="w-px h-12 bg-[#ABBAA9] opacity-60"></div>
            <div className="w-1.5 h-1.5 bg-[#ABBAA9] rounded-full"></div>
          </div>
        </div>
      </main>

      {/* Secondary Section */}
      <section className="py-32 px-8 relative">
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
      <footer className="py-16 px-8 border-t border-[#ABBAA9]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                Connect
              </div>
              <div className="space-y-2 text-sm font-light">
                <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                  LinkedIn
                </a>
                <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                  GitHub
                </a>
                <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                  Email
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                Work
              </div>
              <div className="space-y-2 text-sm font-light">
                <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                  Projects
                </a>
                <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                  Case Studies
                </a>
                <a href="#" className="block hover:text-[#ABBAA9] transition-colors duration-300">
                  Blog
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                Available for
              </div>
              <div className="text-sm font-light">
                Freelance projects
                <br />
                Collaboration opportunities
                <br />
                Full-time positions
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#ABBAA9]/20">
            <div className="text-xs text-[#2C2319]/60 font-light">
              © 2025 Portfolio. Crafted with precision and passion.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}