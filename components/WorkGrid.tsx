'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkItem {
  title: string;
  category: string;
  tech: string[];
  size: string;
  color: string;
  date: string;
  priority: number;
  content: string;
}

interface WorkGridProps {
  works: WorkItem[];
}

export default function WorkGrid({ works }: WorkGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll('.work-item');
      
      gsap.fromTo(
        items,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top bottom-=150',
            end: 'bottom top',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Enhanced hover animations
      items.forEach((item) => {
        const hoverTl = gsap.timeline({ paused: true });
        const contentEl = item.querySelector('.work-content');
        const techEl = item.querySelector('.work-tech');
        
        hoverTl
          .to(item, {
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
          })
          .to(contentEl, {
            y: -4,
            duration: 0.4,
            ease: 'power2.out',
          }, 0)
          .to(techEl, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          }, 0.1);

        item.addEventListener('mouseenter', () => hoverTl.play());
        item.addEventListener('mouseleave', () => hoverTl.reverse());
      });
    }
  }, [works]);

  // Convert size string to grid classes
  const getGridClasses = (size: string) => {
    const [cols, rows] = size.split('x').map(Number);
    
    // Ensure values are within bounds
    const safeCols = Math.min(Math.max(cols || 1, 1), 3);
    const safeRows = Math.min(Math.max(rows || 1, 1), 3);
    
    return {
      mobile: `col-span-${Math.min(safeCols, 3)} row-span-${safeRows}`,
      desktop: `lg:col-span-${Math.min(safeCols, 5)} lg:row-span-${safeRows}`
    };
  };

  const sortedWorks = works.sort((a, b) => a.priority - b.priority);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 lg:gap-6 auto-rows-[180px] md:auto-rows-[220px] lg:auto-rows-[240px]"
    >
      {sortedWorks.map((work, index) => {
        const gridClasses = getGridClasses(work.size);
        
        return (
          <div
            key={`${work.title}-${index}`}
            className={`work-item ${gridClasses.mobile} ${gridClasses.desktop} bg-gradient-to-br ${work.color} backdrop-blur-sm border border-white/[0.08] rounded-lg overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/20 group relative`}
          >
            <div className="work-content p-4 md:p-6 lg:p-8 h-full flex flex-col justify-between relative z-10">
              <div className="space-y-3">
                <div>
                  <h3 className="font-space-grotesk text-base md:text-lg lg:text-xl font-light mb-2 text-balance group-hover:text-white/95 transition-colors duration-300 leading-tight">
                    {work.title}
                  </h3>
                  <p className="text-white/50 text-xs md:text-sm font-inter font-light group-hover:text-white/60 transition-colors duration-300">
                    {work.category}
                  </p>
                </div>
                
                <div className="work-tech opacity-60 translate-y-2 transition-all duration-300">
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {work.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-[10px] md:text-xs px-2 py-1 bg-white/[0.08] rounded-sm text-white/70 font-inter font-light group-hover:bg-white/15 group-hover:text-white/80 transition-all duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {work.tech.length > 3 && (
                      <span className="text-[10px] md:text-xs px-2 py-1 bg-white/[0.08] rounded-sm text-white/70 font-inter font-light group-hover:bg-white/15 group-hover:text-white/80 transition-all duration-300">
                        +{work.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-[10px] md:text-xs text-white/30 font-inter font-light group-hover:text-white/40 transition-colors duration-300">
                {new Date(work.date).getFullYear()}
              </div>
            </div>
            
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        );
      })}
    </div>
  );
}