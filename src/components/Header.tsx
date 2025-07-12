"use client";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";

interface HeaderProps {
  active?: "home" | "about" | "work" | "contact";
}

export default function Header({ active = "home" }: HeaderProps) {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/work", label: "Work", active: active === "work" },
    { href: "/about", label: "About", active: active === "about" },
    { href: "/contact", label: "Contact", active: active === "contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 p-8 backdrop-blur-md bg-[${theme.mainBg}]/90 border-b border-[${theme.accent}]/10`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            href="/"
            className={`text-lg font-light tracking-wider hover:text-[${theme.accent}] transition-colors duration-300`}
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 text-sm font-light tracking-wide">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-[${theme.accent}] transition-colors duration-300${
                  link.active ? ` text-[${theme.accent}]` : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open navigation menu"
              className={`text-[${theme.mainText}] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[${theme.accent}] p-2 rounded-md`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-lg"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          {/* Modal Content */}
          <div
            className={`relative w-full max-w-xs p-8 rounded-2xl shadow-2xl border border-[${theme.accent}]/10 bg-[${theme.mainBg}]/80`}
          >
            <div className="flex justify-end mb-6">
               <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close navigation menu"
                className={`text-[${theme.mainText}] hover:text-[${theme.accent}] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[${theme.accent}] p-2 rounded-full`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-xl font-light tracking-wider hover:text-[${theme.accent}] transition-colors duration-300${
                    link.active
                      ? ` text-[${theme.accent}]`
                      : ` text-[${theme.mainText}]`
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}