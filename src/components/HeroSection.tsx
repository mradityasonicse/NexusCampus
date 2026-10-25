import React from 'react';
import { Search, Flame, Filter } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedCollege: string;
  setSelectedCollege: (col: string) => void;
  collegeList: string[];
  categoryList: string[];
  totalPrizePool: string;
  totalEvents: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedCollege,
  setSelectedCollege,
  collegeList,
  categoryList,
  totalPrizePool,
  totalEvents,
}) => {
  return (
    <div className="relative pt-8 pb-10 overflow-hidden">
      {/* Background Cyber Ambient Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[400px] h-[250px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Live Status Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono backdrop-blur-md shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>CENTRAL INDIA REGIONAL RADAR: LIVE ACROSS RAIPUR & DURG</span>
            <span className="text-white/40">|</span>
            <span className="text-white font-semibold flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-amber-400" /> {totalEvents} Active Fests
            </span>
          </div>
        </div>

        {/* Hero Main Heading */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-6">
            The Campus OS for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Builders, Hackathons
            </span>{' '}
            & College Fests.
          </h1>
          <p className="text-slate-300 text-base sm:text-xl font-normal max-w-2xl mx-auto mb-8 leading-relaxed">
            Discover every hackathon, robotics arena, coding sprint, and cultural fest across NIT Raipur, IIIT-NR, Rungta, BIT Durg, and top universities. Zero WhatsApp spam.
          </p>

          {/* Telemetry Numbers Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-10">
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md text-center">
              <p className="text-xs font-mono uppercase text-slate-400 mb-1">Total Prize Pools</p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">{totalPrizePool}</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md text-center">
              <p className="text-xs font-mono uppercase text-slate-400 mb-1">Live Events</p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-white">{totalEvents} Active</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md text-center">
              <p className="text-xs font-mono uppercase text-slate-400 mb-1">Hackers Matching</p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">450+ Active</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-md text-center">
              <p className="text-xs font-mono uppercase text-slate-400 mb-1">Participating Colleges</p>
              <p className="text-xl sm:text-2xl font-mono font-bold text-amber-400">12 Verified</p>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Main Search Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-400 transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by event title, tech stack (AI, Web3), or college name..."
              className="w-full pl-12 pr-28 py-4 bg-[#0A0E17]/90 border border-white/10 rounded-2xl text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 shadow-[0_0_30px_-5px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-16 pr-2 flex items-center text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
            <div className="absolute inset-y-0 right-3 flex items-center">
              <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-white/[0.05] border border-white/10 text-slate-400">
                ⌘K
              </span>
            </div>
          </div>

          {/* College Dropdown / Quick Select + Category Pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
              {categoryList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-black shadow-[0_0_15px_-2px_rgba(16,185,129,0.5)] scale-105'
                      : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.07] hover:border-white/20'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* College Filter Select */}
            <div className="relative min-w-[220px]">
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full appearance-none px-4 py-2 bg-white/[0.03] border border-white/10 rounded-xl text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500/50 cursor-pointer pr-8"
              >
                {collegeList.map((col) => (
                  <option key={col} value={col} className="bg-[#0A0E17] text-white">
                    {col}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
                <Filter className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
