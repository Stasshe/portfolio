"use client";

import { useEffect, useRef } from 'react';
import { useClickEffects } from "../../hooks/useClickEffects";
import Link from "next/link";
import Footer from "../../components/Footer";
import WaterSurfaceBackground from '../../components/waterSurface';

export default function About() {
  const { containerRef, clickEffects, handlePageClick } = useClickEffects();
  const heroTextRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const navRef = useRef<HTMLDivElement>(null);
  const decorativeElementsRef = useRef<HTMLDivElement[]>([]);
  const backgroundPatternsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
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
          element.style.transform = 'translateY(80px)';
          element.style.opacity = '0';
          setTimeout(() => {
            element.style.transition = 'all 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
          }, 200 + index * 100);
        });
      }

      // Sections staggered animation
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          section.style.transform = 'translateY(60px)';
          section.style.opacity = '0';
          setTimeout(() => {
            section.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            section.style.transform = 'translateY(0)';
            section.style.opacity = '1';
          }, 600 + index * 200);
        }
      });

      // Decorative elements animation
      decorativeElementsRef.current.forEach((element, index) => {
        if (element) {
          element.style.transform = 'scale(0) rotate(45deg)';
          element.style.opacity = '0';
          setTimeout(() => {
            element.style.transition = 'all 1.0s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            element.style.transform = 'scale(1) rotate(0deg)';
            element.style.opacity = '1';
          }, 1000 + index * 150);
        }
      });
    };

    // Floating animation for background patterns
    const animateBackgroundPatterns = () => {
      const params = backgroundPatternsRef.current.map((_, i) => ({
        amplitude: 12 + i * 6,
        speed: 0.12 + i * 0.05,
        direction: i % 2 === 0 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
      }));

      const animate = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        const t = performance.now() / 1000;
        backgroundPatternsRef.current.forEach((element, i) => {
          if (!element) return;
          const { amplitude, speed, direction, phase } = params[i];
          const parallax = scrollY * (0.06 + i * 0.02);
          const x = Math.sin(t * speed + phase) * amplitude * direction;
          const y = Math.cos(t * speed + phase) * amplitude + parallax;
          element.style.transform = `translate(${x}px, ${y}px)`;
        });
        requestAnimationFrame(animate);
      };
      animate();
    };

    animateElements();
    setTimeout(animateBackgroundPatterns, 1200);
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

  const addToSectionsRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="min-h-screen bg-[#F6FAF5] text-[#2C2319] overflow-x-hidden relative cursor-pointer"
      onClick={handlePageClick}
    >
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div ref={addToBackgroundRefs} className="absolute top-1/5 right-1/4 w-28 h-28 bg-gradient-to-br from-[#ABBAA9]/8 to-[#ABBAA9]/3 rounded-full blur-xl"></div>
        <div ref={addToBackgroundRefs} className="absolute bottom-1/4 left-1/5 w-44 h-44 bg-gradient-to-tl from-[#ABBAA9]/6 to-[#ABBAA9]/2 rounded-full blur-2xl"></div>
        <div ref={addToBackgroundRefs} className="absolute top-3/5 right-1/8 w-20 h-20 bg-gradient-to-br from-[#ABBAA9]/10 to-[#ABBAA9]/4 rounded-full blur-lg"></div>
        <div ref={addToBackgroundRefs} className="absolute top-1/8 left-3/5 w-36 h-36 bg-gradient-to-bl from-[#ABBAA9]/5 to-[#ABBAA9]/2 rounded-full blur-xl"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-15">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(to right, #ABBAA9 1px, transparent 1px),
              linear-gradient(to bottom, #ABBAA9 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
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
          <div className="absolute inset-0 w-4 h-4 border border-[#ABBAA9]/50 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-3 h-3 bg-[#ABBAA9]/30 transform rotate-45 animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-[#ABBAA9]/50 transform rotate-12 animate-spin"></div>
          <div className="absolute inset-0 w-1 h-1 bg-[#ABBAA9]/70 transform rotate-45 animate-bounce"></div>
        </div>
      ))}

      {/* Navigation */}
      <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 p-8 backdrop-blur-md bg-[#F6FAF5]/90 border-b border-[#ABBAA9]/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-lg font-light tracking-wider hover:text-[#ABBAA9] transition-colors duration-300">
            Portfolio
          </Link>
          <div className="flex space-x-8 text-sm font-light tracking-wide">
            <Link href="/work" className="hover:text-[#ABBAA9] transition-colors duration-300">Work</Link>
            <span className="text-[#ABBAA9]">About</span>
            <Link href="/contact" className="hover:text-[#ABBAA9] transition-colors duration-300">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div ref={addToRefs} className="absolute top-1/6 right-1/3 w-2.5 h-2.5 bg-gradient-to-br from-[#ABBAA9] to-[#ABBAA9]/60 rounded-full shadow-md"></div>
            <div ref={addToRefs} className="absolute top-2/5 left-1/8 w-1.5 h-1.5 bg-gradient-to-br from-[#ABBAA9]/70 to-[#ABBAA9]/40 rounded-full shadow-sm"></div>
            <div ref={addToRefs} className="absolute bottom-1/4 right-1/6 w-3 h-3 bg-gradient-to-br from-[#ABBAA9]/80 to-[#ABBAA9]/50 rounded-full shadow-lg"></div>
            <div ref={addToRefs} className="absolute top-1/8 left-2/3 w-2 h-2 bg-gradient-to-br from-[#ABBAA9]/60 to-[#ABBAA9]/30 rounded-full shadow-md"></div>
            
            {/* Organic line elements */}
            <div ref={addToRefs} className="absolute top-1/3 right-1/5 w-14 h-0.5 bg-gradient-to-r from-[#ABBAA9]/35 to-transparent rounded-full transform rotate-8"></div>
            <div ref={addToRefs} className="absolute bottom-1/3 left-1/4 w-10 h-0.5 bg-gradient-to-l from-[#ABBAA9]/25 to-transparent rounded-full transform -rotate-12"></div>
          </div>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div ref={heroTextRef} className="space-y-6">
              <div className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-none tracking-tight">
                About
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight text-[#ABBAA9]">
                Stasshe
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Content Sections */}
      <div className="px-8 relative z-10">
        <div className="max-w-5xl mx-auto space-y-32">
          {/* Introduction Section */}
          <div className="relative">
            <WaterSurfaceBackground 
              opacity={0.18} 
              speed={0.25} 
              color={[0.8, 0.1, 0.1]} // 濃い赤
              className="rounded-3xl"
              enableRipples={false}
            />
            <section
              ref={addToSectionsRefs}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 rounded-3xl shadow-sm backdrop-blur-md p-8 relative overflow-hidden"
              style={{ boxShadow: '0 4px 32px 0 #ABBAA930' }}
            >
            <div className="lg:col-span-3 space-y-4 relative z-10">
              <div className="text-sm uppercase tracking-[0.3em] text-[#ABBAA9] font-medium">
                Introduction
              </div>
              <div className="w-16 h-0.5 bg-[#ABBAA9]/30"></div>
            </div>
            <div className="lg:col-span-9 space-y-8 relative z-10">
              <div className="text-3xl md:text-4xl font-light leading-tight">
                A student passionate about the intersection of
                <span className="text-[#ABBAA9]"> technology </span>
                and
                <span className="text-[#ABBAA9]"> creativity</span>.
              </div>
              <div className="text-lg font-light leading-relaxed text-[#2C2319]/80 space-y-6">
                <p>
                  I'm a developer who believes that code is more than logic—it's a medium for artistic expression. Currently pursuing my studies while crafting digital experiences that blend technical precision with creative vision.
                </p>
                <p>
                  My journey spans across multiple disciplines: from architecting robust web applications to creating immersive gaming experiences, each project is an opportunity to push boundaries and explore new possibilities.
                </p>
              </div>
            </div>
            </section>
          </div>

          {/* Skills Section */}
          <div className="relative">
            <WaterSurfaceBackground 
              opacity={0.5} 
              speed={0.35} 
              color={[0.1, 0.2, 0.9]} // 濃い青
              className="rounded-3xl"
              enableRipples={true}
            />
            <section
              ref={addToSectionsRefs}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 rounded-3xl shadow-sm backdrop-blur-md p-8 border border-[#ABBAA9]/10 relative overflow-hidden"
              style={{ boxShadow: '0 4px 32px 0 #ABBAA930' }}
            >
            <div className="lg:col-span-3 space-y-4 relative z-10">
              <div className="text-sm uppercase tracking-[0.3em] text-[#ABBAA9] font-medium">
                Expertise
              </div>
              <div className="w-16 h-0.5 bg-[#ABBAA9]/30"></div>
            </div>
            <div className="lg:col-span-9 space-y-12 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="text-xl font-light text-[#ABBAA9]">Frontend Development</div>
                  <div className="space-y-3 text-sm font-light leading-relaxed">
                    <div>Modern JavaScript & TypeScript</div>
                    <div>React & Next.js ecosystems</div>
                    <div>Responsive design principles</div>
                    <div>Performance optimization</div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="text-xl font-light text-[#ABBAA9]">Backend Systems</div>
                  <div className="space-y-3 text-sm font-light leading-relaxed">
                    <div>Server architecture design</div>
                    <div>Database optimization</div>
                    <div>API development</div>
                    <div>Cloud infrastructure</div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="text-xl font-light text-[#ABBAA9]">Game Development</div>
                  <div className="space-y-3 text-sm font-light leading-relaxed">
                    <div>Swift & iOS development</div>
                    <div>Game mechanics design</div>
                    <div>3D graphics programming</div>
                    <div>User experience in gaming</div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="text-xl font-light text-[#ABBAA9]">Design Philosophy</div>
                  <div className="space-y-3 text-sm font-light leading-relaxed">
                    <div>Spatial design thinking</div>
                    <div>Minimalist aesthetics</div>
                    <div>Typography & composition</div>
                    <div>Interactive experiences</div>
                  </div>
                </div>
              </div>
            </div>
            </section>
          </div>

          {/* Philosophy Section */}
          <div className="relative">
            <WaterSurfaceBackground 
              opacity={0.15} 
              speed={0.4} 
              color={[0.8, 0.3, 0.1]} // 濃いオレンジ
              className="rounded-3xl"
              enableRipples={false}
            />
            <section
              ref={addToSectionsRefs}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 rounded-3xl shadow-sm backdrop-blur-md p-8 border border-[#ABBAA9]/10 relative overflow-hidden"
              style={{ boxShadow: '0 4px 32px 0 #ABBAA930' }}
            >
            <div className="lg:col-span-3 space-y-4 relative z-10">
              <div className="text-sm uppercase tracking-[0.3em] text-[#ABBAA9] font-medium">
                Philosophy
              </div>
              <div className="w-16 h-0.5 bg-[#ABBAA9]/30"></div>
            </div>
            <div className="lg:col-span-9 space-y-8 relative z-10">
              <div className="text-2xl md:text-3xl font-light leading-tight">
                "Excellence is not a destination,
                <br />
                <span className="text-[#ABBAA9]">but a continuous journey of refinement."</span>
              </div>
              <div className="text-lg font-light leading-relaxed text-[#2C2319]/80 space-y-6">
                <p>
                  I approach every project with the belief that technology should be invisible—the user should feel the experience, not the complexity behind it. This philosophy drives me to create solutions that are not only functional but also elegant and intuitive.
                </p>
                <p>
                  Whether I'm debugging a complex algorithm or designing an interface, I strive for that perfect balance between innovation and simplicity, always asking: "How can this be more beautiful, more efficient, more meaningful?"
                </p>
              </div>
            </div>
            </section>
          </div>

          {/* Current Focus Section */}
          <div className="relative">
            <WaterSurfaceBackground 
              opacity={0.18} 
              speed={0.3} 
              color={[0.1, 0.7, 0.2]} // 濃い緑
              className="rounded-3xl"
              enableRipples={false}
            />
            <section
              ref={addToSectionsRefs}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 rounded-3xl shadow-sm backdrop-blur-md p-8 border border-[#ABBAA9]/10 relative overflow-hidden"
              style={{ boxShadow: '0 4px 32px 0 #ABBAA930' }}
            >
            <div className="lg:col-span-3 space-y-4 relative z-10">
              <div className="text-sm uppercase tracking-[0.3em] text-[#ABBAA9] font-medium">
                Current Focus
              </div>
              <div className="w-16 h-0.5 bg-[#ABBAA9]/30"></div>
            </div>
            <div className="lg:col-span-9 space-y-8 relative z-10">
              <div className="text-2xl md:text-3xl font-light leading-tight">
                Exploring the future of
                <span className="text-[#ABBAA9]"> interactive experiences</span>
              </div>
              <div className="text-lg font-light leading-relaxed text-[#2C2319]/80 space-y-6">
                <p>
                  Currently immersed in advanced web technologies and game development frameworks, constantly experimenting with new ways to create meaningful digital interactions. My focus is on building applications that not only solve problems but also inspire and delight users.
                </p>
                <p>
                  As a student, I'm fortunate to have the freedom to explore, fail, learn, and iterate—each day brings new challenges and opportunities to grow as both a developer and a creator.
                </p>
              </div>
            </div>
            </section>
          </div>
        </div>
      </div>

      {/* Final Section */}
      <section className="py-32 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="text-3xl md:text-4xl font-light leading-tight">
            Let's create something 
            <span className="text-[#ABBAA9]"> extraordinary </span>
            together.
          </div>
          <div className="text-lg font-light leading-relaxed text-[#2C2319]/80 max-w-2xl mx-auto">
            I'm always open to new opportunities, collaborations, and conversations about technology, design, and the endless possibilities that lie ahead.
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}