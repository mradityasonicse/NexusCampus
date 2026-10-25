import React from 'react';
import { Search, MapPin, Globe2, Plus, Train, Sparkles, Orbit } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

const GithubIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface NavbarProps {
  isRegionalOnly: boolean;
  setIsRegionalOnly: (val: boolean) => void;
  onOpenHostModal: () => void;
  onOpenCommandPalette: () => void;
  onOpenTransit: () => void;
  onOpenStory: () => void;
  isTechnocracyTheme: boolean;
  onToggleTechnocracyTheme: () => void;
  eventCount: number;
  viewMode?: 'story' | 'directory';
}

export const Navbar: React.FC<NavbarProps> = ({
  isRegionalOnly,
  setIsRegionalOnly,
  onOpenHostModal,
  onOpenCommandPalette,
  onOpenTransit,
  onOpenStory,
  isTechnocracyTheme,
  onToggleTechnocracyTheme,
  eventCount,
  viewMode = 'directory',
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-[#06080D]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg tracking-tight text-white">
                  NEXUS<span className="text-emerald-400">CAMPUS</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-neutral-800 text-neutral-300 border border-neutral-700">
                  {eventCount} Events
                </span>
              </div>
            </div>
          </div>

          {/* Center Search / Command Trigger */}
          <button
            onClick={() => {
              haptics.playClick();
              onOpenCommandPalette();
            }}
            className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all text-xs font-mono max-w-sm w-full cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-neutral-400" />
            <span className="flex-1 text-left">Search verified fests, colleges, tracks...</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-800 border border-neutral-700 text-neutral-400 font-mono">
              Ctrl+K
            </kbd>
          </button>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* 3D Story Mode Trigger */}
            <button
              onClick={() => {
                haptics.playWarp();
                onOpenStory();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/15 hover:bg-emerald-500/25 text-xs font-mono text-emerald-300 transition-all cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.25)]"
              title={viewMode === 'story' ? 'Switch to Events Directory Grid' : 'Experience 3D Chronicles of Aavartan & Vigyaan'}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '5s' }} />
              <span className="font-bold">{viewMode === 'story' ? '⚡ Open Directory' : '🎬 3D Fest Story'}</span>
            </button>

            {/* Celestial Technocracy Theme Toggle */}
            <button
              onClick={() => {
                haptics.playClick();
                onToggleTechnocracyTheme();
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-mono transition-colors cursor-pointer ${
                isTechnocracyTheme
                  ? 'border-purple-500/40 bg-purple-500/20 text-purple-300'
                  : 'border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400 hover:text-white'
              }`}
              title="Toggle Technocracy Aavartan Celestial Atmosphere"
            >
              <Orbit className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden md:inline">Celestial Theme</span>
            </button>

            {/* Transit Route Radar */}
            <button
              onClick={() => {
                haptics.playClick();
                onOpenTransit();
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-mono text-neutral-300 transition-colors cursor-pointer"
              title="Central India Train & Bus Transit Radar"
            >
              <Train className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transit</span>
            </button>

            {/* Region Switcher */}
            <div
              onClick={() => {
                haptics.playClick();
                setIsRegionalOnly(!isRegionalOnly);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 text-xs font-mono transition-colors cursor-pointer select-none"
            >
              {isRegionalOnly ? (
                <>
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-white font-medium text-[11px] sm:text-xs">Central India</span>
                </>
              ) : (
                <>
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-neutral-300 text-[11px] sm:text-xs">All India</span>
                </>
              )}
            </div>

            {/* List Event Button */}
            <button
              onClick={() => {
                haptics.playClick();
                onOpenHostModal();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer font-heading"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">List Fest</span>
            </button>

            {/* GitHub Repo */}
            <a
              href="https://github.com/mradityasonicse/NexusCampus"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:text-white hover:border-neutral-700 transition-colors"
              title="View on GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};
