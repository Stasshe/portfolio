'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.5 }
      );
    }
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-8 md:px-12 md:py-12"
    >
      <div className="flex justify-between items-center">
        <Link 
          href="/"
          className="text-xl font-space-grotesk font-medium tracking-tight hover:opacity-60 transition-opacity duration-300"
        >
          Portfolio
        </Link>
        
        <div className="flex items-center space-x-8 md:space-x-12">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-inter text-sm tracking-wide transition-all duration-300 hover:opacity-60 ${
                pathname === item.href ? 'opacity-100' : 'opacity-70'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}