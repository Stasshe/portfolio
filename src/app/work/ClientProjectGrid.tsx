"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "../../contexts/ThemeContext";

type Project = {
  id: string;
  title: string;
  category: string;
  tech: string[];
  size: string;
  color: string;
  priority: number; // Assuming priority is a number, adjust as needed
  date: string; // Assuming date is a string, adjust as needed
  content?: string;
};

type Props = {
  projects: Project[];
};

export default function ClientProjectGrid({ projects }: Props) {
  const { theme } = useTheme();
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [clickEffects, setClickEffects] = useState<Array<{id: number, x: number, y: number}>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const backgroundPatternsRef = useRef<HTMLDivElement[]>([]);

  // Handle page clicks for geometric animations
  const handlePageClick = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const id = Date.now() + Math.random();
        
        setClickEffects(prev => [...prev, { id, x, y }]);
        
        setTimeout(() => {
            setClickEffects(prev => prev.filter(effect => effect.id !== id));
        }, 350);
        }
    };

  // Get grid size classes based on project size
  const getGridClasses = (size: string) => {
    switch (size) {
      case '1x1': return 'col-span-1 row-span-1';
      case '2x1': return 'col-span-2 row-span-1';
      case '2x2': return 'col-span-2 row-span-2';
      case '3x2': return 'col-span-3 row-span-2';
      case '3x3': return 'col-span-3 row-span-3';
      default: return 'col-span-1 row-span-1';
      }
    };

    useEffect(() => {
        // Initial animations
        const animateElements = () => {
        // Header animation
        if (headerRef.current) {
            headerRef.current.style.transform = 'translateY(-30px)';
            headerRef.current.style.opacity = '0';
            setTimeout(() => {
            if (headerRef.current) {
                headerRef.current.style.transition = 'all 0.8s ease-out';
                headerRef.current.style.transform = 'translateY(0)';
                headerRef.current.style.opacity = '1';
            }
            }, 200);
        }

        // Grid projects animation
        projectRefs.current.forEach((element, index) => {
            if (element) {
            element.style.transform = 'translateY(50px)';
            element.style.opacity = '0';
            setTimeout(() => {
                element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }, 400 + index * 100);
            }
        });
        };

        // Background patterns animation
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
            const parallax = scrollY * (0.05 + i * 0.02);
            const x = Math.sin(t * speed + phase) * amplitude * direction;
            const y = Math.cos(t * speed + phase) * amplitude + parallax;
            element.style.transform = `translate(${x}px, ${y}px)`;
            });
            requestAnimationFrame(animate);
        };
        animate();
        };

        animateElements();
        setTimeout(animateBackgroundPatterns, 1000);
    }, []);

    const addToProjectRefs = (el: HTMLDivElement) => {
        if (el && !projectRefs.current.includes(el)) {
        projectRefs.current.push(el);
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
      style={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom right, ${theme.mainBg}, ${theme.accentSoft}, ${theme.accentSoft})`,
        color: theme.mainText,
        position: 'relative',
        overflowX: 'hidden',
        cursor: 'pointer',
      }}
      onClick={handlePageClick}
    >
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div ref={addToBackgroundRefs} className={`absolute top-1/6 right-1/4 w-28 h-28 bg-gradient-to-br from-[${theme.accent}]/8 to-[${theme.accent}]/4 rounded-full blur-xl`}></div>
        <div ref={addToBackgroundRefs} className={`absolute bottom-1/4 left-1/6 w-36 h-36 bg-gradient-to-tl from-[${theme.accent}]/6 to-[${theme.accent}]/3 rounded-full blur-2xl`}></div>
        <div ref={addToBackgroundRefs} className={`absolute top-1/2 right-1/6 w-20 h-20 bg-gradient-to-br from-[${theme.accent}]/10 to-[${theme.accent}]/5 rounded-full blur-lg`}></div>
        <div ref={addToBackgroundRefs} className={`absolute top-1/3 left-2/3 w-32 h-32 bg-gradient-to-bl from-[${theme.accent}]/7 to-[${theme.accent}]/3 rounded-full blur-xl`}></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-15">
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
          <div className="absolute inset-0 w-4 h-4 border border-[#ABBAA9]/50 rounded-full animate-ping"></div>
          <div className="absolute inset-0 w-3 h-3 bg-[#ABBAA9]/30 transform rotate-45 animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 bg-[#ABBAA9]/50 transform rotate-12 animate-spin"></div>
          <div className="absolute inset-0 w-1 h-1 bg-[#ABBAA9]/70 transform rotate-45 animate-bounce"></div>
        </div>
      ))}

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '2rem',
        backdropFilter: 'blur(8px)',
        background: `${theme.mainBg}E6`,
        borderBottom: `1px solid ${theme.accent}1A`,
      }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-lg font-light tracking-wider">
            <a href="/" style={{ color: theme.accent }}>Portfolio</a>
          </div>
          <div className="flex space-x-8 text-sm font-light tracking-wide">
            <Link href="/work" style={{ color: theme.accent, fontWeight: 500 }}>Work</Link>
            <Link href="/about" style={{ color: theme.accent }}>About</Link>
            <Link href="/contact" style={{ color: theme.accent }}>Contact</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-16">
            <div className="space-y-4">
              <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                Selected Work
              </div>
              <div className="text-5xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-tight">
                Projects & 
                <br />
                <span className="text-[#ABBAA9]">Case Studies</span>
              </div>
              <div className="max-w-2xl">
                <p className="text-lg md:text-xl font-light leading-relaxed text-[#2C2319]/80">
                  A collection of projects spanning web development, mobile applications, 
                  and interactive experiences. Each project represents a unique challenge 
                  and creative solution.
                </p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 auto-rows-[200px]"
          >
            {projects.map((project) => (
              <div
                key={project.id}
                ref={addToProjectRefs}
                className={`
                  ${getGridClasses(project.size)}
                  group relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.color}
                  border border-[${theme.accent}]/20 hover:border-[${theme.accent}]/40
                  transition-all duration-500 ease-out
                  hover:shadow-xl hover:shadow-[${theme.accent}]/10
                  cursor-pointer
                `}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div style={{ color: theme.accent, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.75rem' }}>
                      {project.category}
                    </div>
                    <div style={{ fontSize: '1.125rem', fontWeight: 300, lineHeight: '1.25' }}>
                      {project.title}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          style={{ backgroundColor: theme.accent + '99', color: theme.mainText, borderRadius: '9999px', fontWeight: 300, fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: theme.accent, fontWeight: 300, fontSize: '0.875rem' }}>
                      <span>View Project</span>
                      <div style={{ width: '0.25rem', height: '0.25rem', backgroundColor: theme.accent, borderRadius: '9999px', transform: hoveredProject === project.id ? 'translateX(0.25rem)' : undefined, transition: 'all 0.3s' }}></div>
                    </div>
                  </div>
                </div>
                {/* Hover Effect Overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to bottom right, ${theme.accent}1A, ${theme.accent}0D)`,
                  opacity: hoveredProject === project.id ? 1 : 0,
                  transition: 'all 0.3s',
                }}></div>
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '0.5rem', height: '0.5rem', backgroundColor: theme.accent + '4D', borderRadius: '9999px' }}></div>
                <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', width: hoveredProject === project.id ? '3rem' : '2rem', height: '0.125rem', backgroundColor: theme.accent + '66', borderRadius: '9999px', transition: 'all 0.3s' }}></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-24 text-center">
            <div className="space-y-6">
              <div className="text-sm uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                Interested in working together?
              </div>
              <div className="text-2xl md:text-3xl font-light">
                Let's create something amazing
              </div>
              <div className="pt-4">
                <a 
                  href="#contact"
                  className="inline-flex items-center space-x-3 px-8 py-4 bg-[#ABBAA9]/10 hover:bg-[#ABBAA9]/20 border border-[#ABBAA9]/30 hover:border-[#ABBAA9]/50 rounded-full transition-all duration-300 text-sm font-light tracking-wide"
                >
                  <span>Get in Touch</span>
                  <div className="w-1 h-1 bg-[#ABBAA9] rounded-full"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>    
    );
}
