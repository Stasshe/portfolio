'use client';

import React, { createContext, useContext, useState, ReactNode } from "react";

// テーマカラーの型
export type ThemeColors = {
  mainBg: string;
  mainText: string;
  accent: string;
  accentSoft: string;
  accentGrid: string;
  accentBorder: string;
  accentBlue: string; // 追加
};

// デフォルト値（#で始まるカラーコードを全てThemeContextで管理）
const defaultTheme: ThemeColors = {
  mainBg: "#F6FAF5",
  mainText: "#2C2319",
  accent: "#ABBAA9",
  accentSoft: "#E8F5E8",
  accentGrid: "#ABBAA9",
  accentBorder: "#ABBAA930",
  accentBlue: "#3B82F6", // 明るい青
};

const ThemeContext = createContext<{
  theme: ThemeColors;
  setTheme: (theme: ThemeColors) => void;
} | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeColors>(defaultTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
