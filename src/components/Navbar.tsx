import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  PlusCircle, 
  Globe2, 
  Compass,
  Trophy
} from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#05070B]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('events')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 border border-emerald-500/40 shadow-[0_0_20px_-3px_rgba(16,185,129,0.35)]">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                  NEXUS<span className="text-emerald-400">CAMPUS</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  v2.4
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 hidden sm:block">
                Unified Campus Events & Hackathon Radar
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_-3px_rgba(16,185,129,0.25)]'
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
              onClick={() => setActiveTab('hackers')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'hackers'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_-3px_rgba(16,185,129,0.25)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Teammate Matchmaker
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            </button>

            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_-3px_rgba(16,185,129,0.25)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Colleges
            </button>
          </nav>

          {/* Region Toggle & Host CTA */}
          <div className="flex items-center gap-3">
            {/* Raipur / Pan-India Toggle */}
            <div 
              onClick={() => setIsRegionalOnly(!isRegionalOnly)}
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
              onClick={onOpenHostModal}
              className="relative group flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-[0_0_20px_-3px_rgba(16,185,129,0.5)] active:scale-95 cursor-pointer font-heading"
            >
              <PlusCircle className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="tracking-wide">Host Event</span>
              <span className="hidden lg:inline text-[10px] font-mono opacity-80">(Clubs)</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
