'use client';

import Navigation from '@/components/Navigation';
import AnimatedText from '@/components/AnimatedText';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function ContactPage() {
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
              Contact
            </h1>
          </AnimatedText>
          
          <div className="space-y-16">
            <div className="animate-item">
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-inter mb-8">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question, want to collaborate, or just want to say hello, I'd love to hear from you.
              </p>
            </div>
            
            <div className="animate-item">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-2xl font-space-grotesk font-medium mb-8 text-white/90">
                    Get in Touch
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-inter font-medium mb-2 text-white/60 tracking-wide uppercase">
                        Email
                      </h3>
                      <a
                        href="mailto:hello@portfolio.com"
                        className="text-lg text-white/80 hover:text-white transition-colors duration-300 font-inter"
                      >
                        hello@portfolio.com
                      </a>
                    </div>
                    <div>
                      <h3 className="text-sm font-inter font-medium mb-2 text-white/60 tracking-wide uppercase">
                        Social
                      </h3>
                      <div className="space-y-2">
                        <a
                          href="#"
                          className="block text-lg text-white/80 hover:text-white transition-colors duration-300 font-inter"
                        >
                          LinkedIn
                        </a>
                        <a
                          href="#"
                          className="block text-lg text-white/80 hover:text-white transition-colors duration-300 font-inter"
                        >
                          Twitter
                        </a>
                        <a
                          href="#"
                          className="block text-lg text-white/80 hover:text-white transition-colors duration-300 font-inter"
                        >
                          GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-space-grotesk font-medium mb-8 text-white/90">
                    Send a Message
                  </h2>
                  <form className="space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Your name"
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-colors duration-300 font-inter"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-colors duration-300 font-inter"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Your message"
                        rows={6}
                        className="w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-colors duration-300 font-inter resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-white text-black font-inter text-sm tracking-wide hover:bg-white/90 transition-all duration-300 rounded-sm"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}