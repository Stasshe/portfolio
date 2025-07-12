"use client";

import { useEffect, useRef, useState } from 'react';
import { useClickEffects } from "../hooks/useClickEffects";
import Footer from "../components/Footer";
import { useTheme } from "../contexts/ThemeContext";
import Header from "../components/Header";

export default function Home() {
  const { theme } = useTheme();
  const { containerRef, clickEffects, handlePageClick } = useClickEffects();
  const [isMobile, setIsMobile] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  
  const heroTextRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const decorativeElementsRef = useRef<HTMLDivElement[]>([]);
  const backgroundPatternsRef = useRef<HTMLDivElement[]>([]);
  const mobileFloatingElementsRef = useRef<HTMLDivElement[]>([]);

  const timeoutId = useRef<NodeJS.Timeout | number | null>(null);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsScrolling(true);
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(() => setIsScrolling(false), 150);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile) {
      setTouchStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isMobile && touchStartY) {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;
      if (heroTextRef.current) {
        const intensity = diff * 0.1;
        heroTextRef.current.style.transform = `translateY(${intensity}px)`;
      }
    }
  };

  useEffect(() => {
    const animateElements = () => {
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

      if (heroTextRef.current) {
        const children = Array.from(heroTextRef.current.children);
        children.forEach((child, index) => {
          const element = child as HTMLElement;
          if (isMobile) {
            element.style.transform = `translateY(40px)`;
            element.style.opacity = '0';
            setTimeout(() => {
              element.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              element.style.transform = 'translateY(0)';
              element.style.opacity = '1';
            }, 300 + index * 150);
          } else {
            element.style.transform = 'translateY(100px)';
            element.style.opacity = '0';
            setTimeout(() => {
              element.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
              element.style.transform = 'translateY(0)';
              element.style.opacity = '1';
            }, 300 + index * 150);
          }
        });
      }

      [subtitleRef, roleRef].forEach((ref, index) => {
        if (ref.current) {
          if (isMobile) {
            ref.current.style.transform = `translateY(30px)`;
            ref.current.style.opacity = '0';
            setTimeout(() => {
              if (ref.current) {
                ref.current.style.transition = 'all 0.8s ease-out';
                ref.current.style.transform = 'translateY(0)';
                ref.current.style.opacity = '1';
              }
            }, 800 + index * 200);
          } else {
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
        }
      });

      decorativeElementsRef.current.forEach((element, index) => {
        if (element) {
          element.style.transform = 'scale(0) rotate(180deg)';
          element.style.opacity = '0';
          setTimeout(() => {
            element.style.transition = 'all 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            element.style.transform = 'scale(1) rotate(0deg)';
            element.style.opacity = '1';
          }, 1200 + index * 150);
        }
      });

      if (isMobile) {
        mobileFloatingElementsRef.current.forEach((element, index) => {
          if (element) {
            element.style.transform = 'translateY(50px) scale(0)';
            element.style.opacity = '0';
            setTimeout(() => {
              element.style.transition = 'all 0.8s ease-out';
              element.style.transform = 'translateY(0) scale(1)';
              element.style.opacity = '1';
            }, 1200 + index * 150);
          }
        });
      }

      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.transform = 'translateY(20px)';
        scrollIndicatorRef.current.style.opacity = '0';
        setTimeout(() => {
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.transition = 'all 0.6s ease-out';
            scrollIndicatorRef.current.style.transform = 'translateY(0)';
            scrollIndicatorRef.current.style.opacity = '1';
          }
        }, 1400);
      }
    };

    const animateBackgroundPatterns = () => {
      const params = backgroundPatternsRef.current.map((_, i) => ({
        amplitude: isMobile ? 8 + i * 2 : 15 + i * 8,
        speed: isMobile ? 0.3 + i * 0.1 : 0.15 + i * 0.07,
        direction: i % 2 === 0 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
        rotationSpeed: isMobile ? 0.3 + i * 0.2 : 0.3 + i * 0.2,
      }));

      const animate = () => {
        const currentScrollY = window.scrollY || window.pageYOffset;
        const t = performance.now() / 1000;
        
        backgroundPatternsRef.current.forEach((element, i) => {
          if (!element) return;
          const { amplitude, speed, direction, phase, rotationSpeed } = params[i];
          
          const parallax = currentScrollY * (0.05 + i * 0.02);
          const x = Math.sin(t * speed + phase) * amplitude * direction;
          const y = Math.cos(t * speed + phase) * amplitude - parallax;
          const rotation = isMobile ? t * rotationSpeed * 5 : 0;
          
          element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
        });
        
        requestAnimationFrame(animate);
      };
      animate();
    };

    const animateMobileFloatingElements = () => {
      if (!isMobile) return;
      
      const params = mobileFloatingElementsRef.current.map((_, i) => ({
        amplitude: 5 + i * 2,
        speed: 0.6 + i * 0.3,
        direction: i % 2 === 0 ? 1 : -1,
        phase: Math.random() * Math.PI * 2,
      }));

      const animate = () => {
        const t = performance.now() / 1000;
        mobileFloatingElementsRef.current.forEach((element, i) => {
          if (!element) return;
          const { amplitude, speed, direction, phase } = params[i];
          
          const x = Math.sin(t * speed + phase) * amplitude * direction;
          const y = Math.cos(t * speed * 0.7 + phase) * amplitude * 0.5;
          const scale = 1 + Math.sin(t * speed + phase) * 0.05;
          
          element.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        });
        
        requestAnimationFrame(animate);
      };
      animate();
    };

    const animateScrollIndicator = () => {
      if (scrollIndicatorRef.current) {
        let direction = 1;
        setInterval(() => {
          if (scrollIndicatorRef.current && !isScrolling) {
            const bounce = isMobile ? 5 : 10;
            scrollIndicatorRef.current.style.transform = `translateY(${direction * bounce}px)`;
            direction *= -1;
          }
        }, isMobile ? 1500 : 1500);
      }
    };

    animateElements();
    setTimeout(animateBackgroundPatterns, 1500);
    setTimeout(animateMobileFloatingElements, 1800);
    setTimeout(animateScrollIndicator, 2000);
  }, [isMobile]);

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

  const addToMobileFloatingRefs = (el: HTMLDivElement) => {
    if (el && !mobileFloatingElementsRef.current.includes(el)) {
      mobileFloatingElementsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom right, ${theme.gradientFrom}, ${theme.gradientVia}, ${theme.gradientTo})`,
        color: theme.mainText,
        position: 'relative',
        overflowX: 'hidden',
        cursor: 'pointer',
      }}
      onClick={handlePageClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className="fixed inset-0 pointer-events-none z-0">
        <div ref={addToBackgroundRefs} className={`absolute ${isMobile ? 'top-1/5 right-1/4 w-20 h-20' : 'top-1/4 right-1/3 w-32 h-32'} bg-gradient-to-br from-[${theme.accent}]/15 to-[${theme.accent}]/8 rounded-full blur-xl`}></div>
        <div ref={addToBackgroundRefs} className={`absolute ${isMobile ? 'bottom-1/3 left-1/6 w-24 h-24' : 'bottom-1/3 left-1/4 w-48 h-48'} bg-gradient-to-tl from-[${theme.accent}]/12 to-[${theme.accent}]/6 rounded-full blur-2xl`}></div>
        <div ref={addToBackgroundRefs} className={`absolute ${isMobile ? 'top-1/2 right-1/8 w-16 h-16' : 'top-2/3 right-1/6 w-24 h-24'} bg-gradient-to-br from-[${theme.accent}]/18 to-[${theme.accent}]/10 rounded-full blur-lg`}></div>
        <div ref={addToBackgroundRefs} className={`absolute ${isMobile ? 'top-1/6 left-1/3 w-18 h-18' : 'top-1/6 left-2/3 w-40 h-40'} bg-gradient-to-bl from-[${theme.accent}]/10 to-[${theme.accent}]/5 rounded-full blur-xl`}></div>
        
        {isMobile && (
          <>
            <div ref={addToBackgroundRefs} className="absolute top-3/4 left-1/8 w-12 h-12 bg-gradient-to-br from-[#ABBAA9]/20 to-[#ABBAA9]/5 rounded-full blur-md"></div>
            <div ref={addToBackgroundRefs} className="absolute top-1/8 right-2/3 w-8 h-8 bg-gradient-to-tl from-[#ABBAA9]/15 to-[#ABBAA9]/8 rounded-full blur-lg"></div>
          </>
        )}
        
        <div className="absolute inset-0 opacity-25">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(to right, ${theme.accentGrid} 1px, transparent 1px),linear-gradient(to bottom, ${theme.accentGrid} 1px, transparent 1px)`,
            backgroundSize: isMobile ? '30px 30px' : '40px 40px',
            transform: isMobile ? `translateY(${scrollY * 0.3}px)` : 'none'
          }}></div>
        </div>
      </div>

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

      <Header active="home" />
      
      <main className={`${isMobile ? 'pt-28 pb-8 px-6' : 'pt-32 pb-20 px-4 sm:px-8'} relative z-10`}>
        <div className={`${isMobile ? 'w-full' : 'max-w-7xl mx-auto'}`}>
          <div className="absolute inset-0 pointer-events-none">
            {isMobile ? (
              <>
                <div ref={addToRefs} className="absolute top-1/4 right-1/6 w-2 h-2 bg-gradient-to-br from-[#ABBAA9] to-[#ABBAA9]/60 rounded-full shadow-lg"></div>
                <div ref={addToRefs} className="absolute top-1/3 left-1/8 w-1.5 h-1.5 bg-gradient-to-br from-[#ABBAA9]/90 to-[#ABBAA9]/40 rounded-full shadow-md"></div>
                <div ref={addToRefs} className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-gradient-to-br from-[#ABBAA9]/80 to-[#ABBAA9]/50 rounded-full shadow-lg"></div>
                <div ref={addToRefs} className="absolute top-1/8 left-1/2 w-8 h-0.5 bg-gradient-to-r from-[#ABBAA9]/50 to-transparent rounded-full transform rotate-15"></div>
                <div ref={addToRefs} className="absolute top-2/3 left-1/4 w-6 h-0.5 bg-gradient-to-l from-[#ABBAA9]/40 to-transparent rounded-full transform -rotate-12"></div>
                
                <div ref={addToMobileFloatingRefs} className="absolute top-1/6 right-1/12 w-4 h-4 border border-[#ABBAA9]/30 rounded-full"></div>
                <div ref={addToMobileFloatingRefs} className="absolute bottom-1/6 left-1/12 w-3 h-3 border border-[#ABBAA9]/25 rounded-full"></div>
                <div ref={addToMobileFloatingRefs} className="absolute top-1/2 right-1/8 w-1.5 h-6 bg-gradient-to-b from-[#ABBAA9]/20 to-transparent rounded-full"></div>
              </>
            ) : (
              <>
                <div ref={addToRefs} className="absolute top-1/4 right-1/4 w-3 h-3 bg-gradient-to-br from-[#ABBAA9] to-[#ABBAA9]/70 rounded-full shadow-lg"></div>
                <div ref={addToRefs} className="absolute top-1/3 left-1/6 w-2 h-2 bg-gradient-to-br from-[#ABBAA9]/80 to-[#ABBAA9]/50 rounded-full shadow-md"></div>
                <div ref={addToRefs} className="absolute top-1/6 right-2/3 w-1.5 h-1.5 bg-gradient-to-br from-[#ABBAA9]/60 to-[#ABBAA9]/30 rounded-full shadow-sm"></div>
                <div ref={addToRefs} className="absolute bottom-1/3 left-2/3 w-3.5 h-3.5 bg-gradient-to-br from-[#ABBAA9]/85 to-[#ABBAA9]/55 rounded-full shadow-lg"></div>
                <div ref={addToRefs} className="absolute top-1/2 left-1/8 w-16 h-0.5 bg-gradient-to-r from-[#ABBAA9]/40 to-transparent rounded-full transform rotate-12"></div>
                <div ref={addToRefs} className="absolute bottom-1/5 right-1/8 w-12 h-0.5 bg-gradient-to-l from-[#ABBAA9]/30 to-transparent rounded-full transform -rotate-6"></div>
              </>
            )}
          </div>

          <div className={`${isMobile ? 'flex flex-col space-y-12 min-h-[80vh] justify-center' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[70vh]'}`}> 
            <div className={`${isMobile ? 'order-1' : 'lg:col-span-8'} flex flex-col justify-center ${isMobile ? 'space-y-8' : 'space-y-8'}`}>
              <div ref={heroTextRef} className={`${isMobile ? 'space-y-2' : 'space-y-4'}`}>
                <div 
                  className={`${isMobile ? 'text-5xl sm:text-5xl' : 'text-6xl md:text-8xl lg:text-9xl'} font-extralight leading-none tracking-tight`}
                  style={{
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  Creative
                </div>
                <div 
                  className={`${isMobile ? 'text-5xl sm:text-5xl' : 'text-6xl md:text-8xl lg:text-9xl'} font-extralight leading-none tracking-tight`}
                  style={{
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  Developer
                </div>
                <div 
                  className={`${isMobile ? 'text-5xl sm:text-5xl' : 'text-6xl md:text-8xl lg:text-9xl'} font-extralight leading-none tracking-tight`}
                  style={{
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  Designer
                </div>
              </div>

              <div 
                ref={subtitleRef} 
                className={`${isMobile ? 'max-w-full' : 'max-w-xl'}`}
                style={{
                  transform: isMobile ? `translateY(${scrollY * 0.03}px)` : 'none',
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <p style={{ color: theme.mainText, opacity: 0.85 }} className={`${isMobile ? 'text-base leading-relaxed' : 'text-xl md:text-2xl'} font-light leading-relaxed`}>
                  Crafting digital experiences through the intersection of 
                  <span style={{ color: theme.accent, fontWeight: 400 }}> front-end excellence</span>, 
                  <span style={{ color: theme.accent, fontWeight: 400 }}> back-end innovation</span>, and 
                  <span style={{ color: theme.accent, fontWeight: 400 }}> Swift-powered gaming</span>.
                </p>
              </div>
            </div>

            <div className={`${isMobile ? 'order-2' : 'lg:col-span-4'} flex flex-col ${isMobile ? 'space-y-8' : 'justify-center space-y-10'}`}>
              <div ref={roleRef} className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                  Currently
                </div>
                <div className={`${isMobile ? 'text-base' : 'text-lg'} font-light leading-relaxed`}>
                  Student & Developer
                  <br />
                  <span className="text-[#ABBAA9]">Full-Stack Engineer</span>
                  <br />
                  <span className="text-[#ABBAA9]">Swift Game Developer</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-xs uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                  Focus Areas
                </div>
                <div className={`space-y-3 ${isMobile ? 'text-sm' : 'text-sm'} font-light leading-relaxed`}>
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

          <div
            ref={scrollIndicatorRef}
            className={`absolute ${isMobile ? 'bottom-4 left-1/2 transform -translate-x-1/2' : 'bottom-28 right-[12rem]'} flex ${isMobile ? 'flex-col items-center space-y-2' : 'flex-col items-end space-y-1'} z-20`}
          >
            <div className={`flex items-center ${isMobile ? 'flex-col space-y-1' : 'space-x-2'}`}>
              <span className="text-xs uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                {isMobile ? 'Scroll' : 'Scroll'}
              </span>
              <span 
                className={`${isMobile ? 'text-lg' : 'text-2xl md:text-3xl lg:text-4xl'} select-none`} 
                style={{
                  lineHeight: 1,
                  transform: isMobile ? 'none' : 'none'
                }}
              >
                ☟
              </span>
            </div>
          </div>
        </div>
      </main>

      <section className={`${isMobile ? 'py-12 px-6' : 'py-32 px-4 sm:px-8'} relative z-10`}>
        <div className={`${isMobile ? 'w-full' : 'max-w-7xl mx-auto'}`}>
          <div className={`${isMobile ? 'flex flex-col space-y-8' : 'grid grid-cols-1 lg:grid-cols-2 gap-16'} items-center`}>
            <div className={`${isMobile ? 'space-y-5' : 'space-y-8'}`}>
              <div className="text-xs uppercase tracking-[0.2em] text-[#ABBAA9] font-medium">
                Philosophy
              </div>
              <div className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-light leading-tight`}>
                Code as craft.
                <br />
                <span className="text-[#ABBAA9]">Design as expression.</span>
                <br />
                Technology as art.
              </div>
            </div>
            <div className={`${isMobile ? 'space-y-4' : 'space-y-6'} ${isMobile ? 'text-sm' : 'text-lg'} font-light leading-relaxed`} style={{ color: `${theme.mainText}CC` }}>
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

      <Footer />
    </div>
  );
}