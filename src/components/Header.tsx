"use client";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";

interface HeaderProps {
  active?: "home" | "about" | "work" | "contact";
}

export default function Header({ active = "home" }: HeaderProps) {
  const { theme } = useTheme();
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 p-8 backdrop-blur-md bg-[${theme.mainBg}]/90 border-b border-[${theme.accent}]/10`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className={`text-lg font-light tracking-wider hover:text-[${theme.accent}] transition-colors duration-300`}>
          Portfolio
        </Link>
        <div className="flex space-x-8 text-sm font-light tracking-wide">
          <Link href="/work" className={`hover:text-[${theme.accent}] transition-colors duration-300${active === "work" ? ` text-[${theme.accent}]` : ""}`}>Work</Link>
          <Link href="/about" className={`hover:text-[${theme.accent}] transition-colors duration-300${active === "about" ? ` text-[${theme.accent}]` : ""}`}>About</Link>
          <Link href="/contact" className={`hover:text-[${theme.accent}] transition-colors duration-300${active === "contact" ? ` text-[${theme.accent}]` : ""}`}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
