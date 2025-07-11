'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedText({ children, className = '', delay = 0 }: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: 'power3.out', delay }
      );
    }
  }, [delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}