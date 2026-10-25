import React, { useState, useEffect } from 'react';
import { Sparkles, Compass, Users, Trophy, PlusCircle, Volume2, VolumeX, ShieldCheck, Activity, MapPin, Globe2, Search, Palette, Users2 } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';
import { useTheme, type CyberTheme, THEMES } from '../utils/themeContext';

const GithubIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

interface NavbarProps {
  activeTab: 'events' | 'hackers' | 'leaderboard';
  setActiveTab: (tab: 'events' | 'hackers' | 'leaderboard') => void;
  isRegionalOnly: boolean;
  setIsRegionalOnly: (val: boolean) => void;
  onOpenHostModal: () => void;
  onOpenCommandPalette: () => void;
  onOpenSquadBuilder: () => void;
  eventCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isRegionalOnly,
  setIsRegionalOnly,
  onOpenHostModal,
  onOpenCommandPalette,
  onOpenSquadBuilder,
  eventCount,
}) => {
  const { theme, setTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subscribe to audio haptics activity for live visualizer
  useEffect(() => {
    return haptics.subscribe((active) => {
      setIsAudioActive(active);
    });
  }, []);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    haptics.enabled = next;
    if (next) haptics.playClick();
  };

  const handleTabSwitch = (tab: 'events' | 'hackers' | 'leaderboard') => {
    haptics.playClick();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#05070B]/90 backdrop-blur-xl">
      {/* Top Micro Telemetry Ticker */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-[#030407] border-b border-white/[0.04] text-[10px] font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            RADAR: ONLINE
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Activity className="w-3 h-3 text-cyan-400" />
            SERVER LATENCY: 22ms
          </span>
          <span className="text-slate-600">|</span>
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            100% AUTHORIZED GOVT & DEEMED UNIVERSITY PORTALS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-slate-400">CAMPUS SYNC: {currentTime || 'LIVE'}</span>
          <span className="text-slate-600">|</span>
          <a
            href="https://github.com/mradityasonicse/NexusCampus"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
          >
            <GithubIcon className="w-3 h-3 text-slate-400" />
            <span>GitHub Repo: mradityasonicse/NexusCampus</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group shrink-0" 
            onClick={() => handleTabSwitch('events')}
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-cyan-500/10 border border-emerald-500/40 shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)] transition-transform group-hover:scale-105 duration-300">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg sm:text-2xl tracking-tight text-white">
                  NEXUS<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">CAMPUS</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  VERIFIED
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Authorized College Events & Hackathon Radar
              </p>
            </div>
          </div>

          {/* Quick Search / Command Palette Bar */}
          <button
            onClick={() => {
              haptics.playClick();
              onOpenCommandPalette();
            }}
            className="hidden xl:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 text-slate-400 hover:text-white transition-all cursor-pointer text-xs font-mono"
          >
            <Search className="w-3.5 h-3.5 text-emerald-400" />
            <span>Search fests, NIT, SIH, teams...</span>
            <kbd className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.08] border border-white/[0.1] text-slate-300">
              Ctrl+K
            </kbd>
          </button>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <button
              onClick={() => handleTabSwitch('events')}
              onMouseEnter={() => haptics.playHover()}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_-3px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Events</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-white/10 text-slate-300">
                {eventCount}
              </span>
            </button>

            <button
              onClick={() => handleTabSwitch('hackers')}
              onMouseEnter={() => haptics.playHover()}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'hackers'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_-3px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Teammates</span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            </button>

            <button
              onClick={() => handleTabSwitch('leaderboard')}
              onMouseEnter={() => haptics.playHover()}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_-3px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Colleges</span>
            </button>
          </nav>

          {/* Controls: Audio Wave, Squad Builder, Region Switch & Host CTA */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Squad Builder Shortcut */}
            <button
              onClick={() => {
                haptics.playClick();
                onOpenSquadBuilder();
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-cyan-500/40 text-xs font-mono text-cyan-300 transition-all cursor-pointer"
              title="Assemble 4-member Dream Squad"
            >
              <Users2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Squad Builder</span>
            </button>

            {/* Audio Wave Visualizer & Toggle */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl border border-white/[0.08] bg-white/[0.02]">
              <button
                onClick={toggleSound}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  soundEnabled 
                    ? 'text-emerald-400' 
                    : 'text-slate-500'
                }`}
                title={soundEnabled ? 'Audio Haptics Enabled' : 'Audio Haptics Muted'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Reactive Micro Frequency Bars */}
              {soundEnabled && (
                <div className="flex items-end gap-0.5 h-3 pr-1">
                  <div className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-75 ${isAudioActive ? 'h-3' : 'h-1'}`} />
                  <div className={`w-0.5 bg-cyan-400 rounded-full transition-all duration-75 ${isAudioActive ? 'h-2.5' : 'h-1.5'}`} />
                  <div className={`w-0.5 bg-emerald-400 rounded-full transition-all duration-75 ${isAudioActive ? 'h-3' : 'h-1'}`} />
                </div>
              )}
            </div>

            {/* Cyber Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => {
                  haptics.playClick();
                  setIsThemeMenuOpen(!isThemeMenuOpen);
                }}
                className="p-2 rounded-xl border border-white/[0.08] bg-white/[0.02] text-slate-400 hover:text-white hover:border-white/[0.2] transition-colors cursor-pointer"
                title="Switch Cyber Atmosphere Theme"
              >
                <Palette className="w-4 h-4" />
              </button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 p-2 rounded-2xl bg-[#05070B] border border-white/15 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="text-[10px] font-mono text-slate-500 px-2 py-1 uppercase">
                    Cyber Atmosphere
                  </div>
                  {(Object.keys(THEMES) as CyberTheme[]).map((tKey) => {
                    const cfg = THEMES[tKey];
                    return (
                      <button
                        key={tKey}
                        onClick={() => {
                          haptics.playClick();
                          setTheme(tKey);
                          setIsThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          theme === tKey
                            ? 'bg-white/[0.1] text-white font-bold'
                            : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cfg.primary }} />
                          <span>{cfg.name}</span>
                        </span>
                        {theme === tKey && <span className="text-[10px] text-emerald-400">✓</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Raipur / Pan-India Toggle */}
            <div 
              onClick={() => {
                haptics.playClick();
                setIsRegionalOnly(!isRegionalOnly);
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl cursor-pointer text-xs font-mono font-medium border border-white/[0.08] bg-white/[0.02] hover:border-emerald-500/40 transition-all select-none"
              title="Toggle between Raipur/Central India and Pan-India"
            >
              {isRegionalOnly ? (
                <>
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-white font-semibold hidden sm:inline">Raipur Hub</span>
                  <span className="text-white font-semibold sm:hidden">Raipur</span>
                </>
              ) : (
                <>
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300">National</span>
                </>
              )}
            </div>

            {/* Host Event Button (Organizers) */}
            <button
              onClick={() => {
                haptics.playClick();
                onOpenHostModal();
              }}
              className="relative group flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 transition-all shadow-[0_0_25px_-5px_rgba(16,185,129,0.5)] active:scale-95 cursor-pointer font-heading whitespace-nowrap"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="tracking-wide">Host Fest</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
