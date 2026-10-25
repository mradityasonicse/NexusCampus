import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  PlusCircle, 
  Globe2, 
  Compass,
  Trophy,
  Volume2,
  VolumeX,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface NavbarProps {
  activeTab: 'events' | 'hackers' | 'leaderboard';
  setActiveTab: (tab: 'events' | 'hackers' | 'leaderboard') => void;
  isRegionalOnly: boolean;
  setIsRegionalOnly: (val: boolean) => void;
  onOpenHostModal: () => void;
  eventCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isRegionalOnly,
  setIsRegionalOnly,
  onOpenHostModal,
  eventCount,
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
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
          <span className="text-emerald-400 font-semibold">ALL-CENTRAL-INDIA-FEED</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Brand Identity */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group" 
            onClick={() => handleTabSwitch('events')}
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500/25 via-teal-500/15 to-cyan-500/10 border border-emerald-500/40 shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)] transition-transform group-hover:scale-105 duration-300">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
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

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.03] border border-white/[0.08]">
            <button
              onClick={() => handleTabSwitch('events')}
              onMouseEnter={() => haptics.playHover()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_-3px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Events & Fests
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-white/10 text-slate-300">
                {eventCount}
              </span>
            </button>

            <button
              onClick={() => handleTabSwitch('hackers')}
              onMouseEnter={() => haptics.playHover()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'hackers'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_-3px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Teammate Matchmaker
              <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            </button>

            <button
              onClick={() => handleTabSwitch('leaderboard')}
              onMouseEnter={() => haptics.playHover()}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_-3px_rgba(16,185,129,0.3)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Colleges
            </button>
          </nav>

          {/* Controls: Sound Toggle, Region Switch & Host CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Audio Haptics Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                soundEnabled 
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                  : 'border-white/10 bg-white/[0.02] text-slate-500'
              }`}
              title={soundEnabled ? 'Audio Haptics Enabled' : 'Audio Haptics Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Raipur / Pan-India Toggle */}
            <div 
              onClick={() => {
                haptics.playClick();
                setIsRegionalOnly(!isRegionalOnly);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl cursor-pointer text-xs font-mono font-medium border border-white/[0.08] bg-white/[0.02] hover:border-emerald-500/40 transition-all select-none"
              title="Toggle between Raipur/Central India and Pan-India"
            >
              {isRegionalOnly ? (
                <>
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-white font-semibold">Raipur Hub</span>
                  <span className="text-[10px] text-emerald-400 font-mono">(Active)</span>
                </>
              ) : (
                <>
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-slate-300">Pan-India</span>
                </>
              )}
            </div>

            {/* Host Event Button (Organizers) */}
            <button
              onClick={() => {
                haptics.playClick();
                onOpenHostModal();
              }}
              className="relative group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:from-emerald-300 hover:to-cyan-200 transition-all shadow-[0_0_25px_-5px_rgba(16,185,129,0.5)] active:scale-95 cursor-pointer font-heading"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="tracking-wide">Host Fest</span>
              <span className="hidden lg:inline text-[10px] font-mono opacity-80">(Clubs)</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
