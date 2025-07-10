"use client";
import React, { useState, useRef, useEffect } from "react";

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
        className="min-h-screen bg-gradient-to-br from-[#F6FAF5] via-[#F0F8EF] to-[#E8F5E8] text-[#2C2319] overflow-x-hidden relative cursor-pointer"
        onClick={handlePageClick}
        >
        {/* Enhanced Background Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0">
            <div ref={addToBackgroundRefs} className="absolute top-1/6 right-1/4 w-28 h-28 bg-gradient-to-br from-[#ABBAA9]/8 to-[#ABBAA9]/4 rounded-full blur-xl"></div>
            <div ref={addToBackgroundRefs} className="absolute bottom-1/4 left-1/6 w-36 h-36 bg-gradient-to-tl from-[#ABBAA9]/6 to-[#ABBAA9]/3 rounded-full blur-2xl"></div>
            <div ref={addToBackgroundRefs} className="absolute top-1/2 right-1/6 w-20 h-20 bg-gradient-to-br from-[#ABBAA9]/10 to-[#ABBAA9]/5 rounded-full blur-lg"></div>
            <div ref={addToBackgroundRefs} className="absolute top-1/3 left-2/3 w-32 h-32 bg-gradient-to-bl from-[#ABBAA9]/7 to-[#ABBAA9]/3 rounded-full blur-xl"></div>
            
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-15">
            <div className="w-full h-full" style={{
                backgroundImage: `
                linear-gradient(to right, #ABBAA9 1px, transparent 1px),
                linear-gradient(to bottom, #ABBAA9 1px, transparent 1px)
                `,
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
        <nav className="fixed top-0 left-0 right-0 z-50 p-8 backdrop-blur-md bg-[#F6FAF5]/90 border-b border-[#ABBAA9]/10">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-lg font-light tracking-wider">
                <a href="/" className="hover:text-[#ABBAA9] transition-colors duration-300">Portfolio</a>
            </div>
            <div className="flex space-x-8 text-sm font-light tracking-wide">
                <a href="/work" className="text-[#ABBAA9] font-medium">Work</a>
                <a href="#about" className="hover:text-[#ABBAA9] transition-colors duration-300">About</a>
                <a href="#contact" className="hover:text-[#ABBAA9] transition-colors duration-300">Contact</a>
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
                    border border-[#ABBAA9]/20 hover:border-[#ABBAA9]/40
                    transition-all duration-500 ease-out
                    hover:shadow-xl hover:shadow-[#ABBAA9]/10
                    cursor-pointer
                    `}
                    onMouseEnter={() => setHoveredProject(project.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                >
                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="space-y-2">
                        <div className="text-xs uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                        {project.category}
                        </div>
                        <div className="text-lg font-light leading-tight">
                        {project.title}
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex flex-wrap gap-1">
                        {project.tech.map((tech) => (
                            <span
                            key={tech}
                            className="px-2 py-1 text-xs bg-[#ABBAA9]/20 text-[#2C2319] rounded-full font-light"
                            >
                            {tech}
                            </span>
                        ))}
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm text-[#ABBAA9] font-light">
                        <span>View Project</span>
                        <div className={`
                            w-1 h-1 bg-[#ABBAA9] rounded-full
                            transition-all duration-300 ease-out
                            ${hoveredProject === project.id ? 'transform translate-x-1' : ''}
                        `}></div>
                        </div>
                    </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className={`
                    absolute inset-0 bg-gradient-to-br from-[#ABBAA9]/10 to-[#ABBAA9]/5
                    transition-all duration-300 ease-out
                    ${hoveredProject === project.id ? 'opacity-100' : 'opacity-0'}
                    `}></div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 w-2 h-2 bg-[#ABBAA9]/30 rounded-full"></div>
                    <div className={`
                    absolute bottom-4 left-4 w-8 h-0.5 bg-[#ABBAA9]/40 rounded-full
                    transition-all duration-300 ease-out
                    ${hoveredProject === project.id ? 'w-12' : 'w-8'}
                    `}></div>
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
