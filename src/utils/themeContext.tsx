import React, { createContext, useContext, useState, useEffect } from 'react';

export type CyberTheme = 'emerald' | 'cyberpunk' | 'cyan' | 'amber';

interface ThemeConfig {
  id: CyberTheme;
  name: string;
  primary: string;
  primaryLight: string;
  primaryGlow: string;
  secondary: string;
  bgGradient: string;
  borderHover: string;
  badgeBg: string;
  badgeText: string;
}

export const THEMES: Record<CyberTheme, ThemeConfig> = {
  emerald: {
    id: 'emerald',
    name: 'Obsidian Emerald',
    primary: '#10B981',
    primaryLight: '#34D399',
    primaryGlow: 'rgba(16, 185, 129, 0.4)',
    secondary: '#06B6D4',
    bgGradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderHover: 'hover:border-emerald-500/50',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/30',
    badgeText: 'text-emerald-300',
  },
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Neo-Tokyo Synth',
    primary: '#EC4899',
    primaryLight: '#F472B6',
    primaryGlow: 'rgba(236, 72, 153, 0.4)',
    secondary: '#8B5CF6',
    bgGradient: 'from-pink-500/20 via-purple-500/10 to-transparent',
    borderHover: 'hover:border-pink-500/50',
    badgeBg: 'bg-pink-500/10 border-pink-500/30',
    badgeText: 'text-pink-300',
  },
  cyan: {
    id: 'cyan',
    name: 'Cryo Ice',
    primary: '#06B6D4',
    primaryLight: '#22D3EE',
    primaryGlow: 'rgba(6, 182, 212, 0.4)',
    secondary: '#3B82F6',
    bgGradient: 'from-cyan-500/20 via-blue-500/10 to-transparent',
    borderHover: 'hover:border-cyan-500/50',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/30',
    badgeText: 'text-cyan-300',
  },
  amber: {
    id: 'amber',
    name: 'Solaris Forge',
    primary: '#F59E0B',
    primaryLight: '#FBBF24',
    primaryGlow: 'rgba(245, 158, 11, 0.4)',
    secondary: '#EF4444',
    bgGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
    borderHover: 'hover:border-amber-500/50',
    badgeBg: 'bg-amber-500/10 border-amber-500/30',
    badgeText: 'text-amber-300',
  },
};

interface ThemeContextType {
  theme: CyberTheme;
  themeConfig: ThemeConfig;
  setTheme: (theme: CyberTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<CyberTheme>('emerald');

  const setTheme = (newTheme: CyberTheme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, themeConfig: THEMES[theme], setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
