import React from 'react';
import { Search, Filter, ShieldCheck, MapPin, Sparkles, Orbit } from 'lucide-react';
import { ThreeHeroGlobe } from './ThreeHeroGlobe';

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
    <div className="relative pt-8 pb-8 border-b border-neutral-900 bg-gradient-to-b from-[#080B13] via-[#05070B] to-[#04060A] overflow-hidden">
      
      {/* Background radial gradient spotlight */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Dual-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-8">
          
          {/* Left Column (7 cols): Content & Search */}
          <div className="lg:col-span-7 text-left">
            
            {/* Accreditation Badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                100% Authorized Institutional Directory • Official .ac.in & .gov.in Portals
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.08] mb-4">
              Central India & National Campus Events Directory
            </h1>
            
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 max-w-2xl">
              Direct access to official hackathons, technical symposia, and robotics arenas across NIT Raipur, IIIT Naya Raipur, Rungta Bhilai, BIT Durg, CSVTU, and top national institutes. All dates, rulebooks, and registration helplines are verified against institutional records.
            </p>

            {/* Clean Verified Telemetry Strip */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 py-3 px-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 mb-6 text-xs font-mono">
              <div>
                <span className="text-neutral-500">Verified Events: </span>
                <span className="text-white font-bold">{totalEvents} Active Symposia</span>
              </div>
              <div className="hidden sm:block text-neutral-700">|</div>
              <div>
                <span className="text-neutral-500">Prize Pools: </span>
                <span className="text-emerald-400 font-bold">{totalPrizePool}</span>
              </div>
              <div className="hidden sm:block text-neutral-700">|</div>
              <div>
                <span className="text-neutral-500">Pilot Territory: </span>
                <span className="text-cyan-400 font-bold">Raipur • Bhilai • Durg • National</span>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by fest name, tech domain (Robotics, AI, Web3), or college..."
                className="w-full pl-10 pr-24 py-3 bg-neutral-900/90 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50 transition-colors font-sans shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-14 pr-2 flex items-center text-xs font-mono text-neutral-400 hover:text-white cursor-pointer"
                >
                  Clear
                </button>
              )}
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-400 border border-neutral-700">
                  Ctrl+K
                </span>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Interactive 3D Three.js Constellation Globe */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl bg-neutral-900/30 border border-neutral-800/80 p-2 overflow-hidden shadow-2xl backdrop-blur-sm">
              
              {/* Header HUD inside 3D frame */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] font-mono pointer-events-none">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-950/80 border border-neutral-800 text-neutral-300 backdrop-blur-md">
                  <Orbit className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
                  <span>3D Campus Constellation</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">
                  Three.js WebGL
                </span>
              </div>

              {/* Three.js Canvas */}
              <ThreeHeroGlobe 
                onSelectCollege={(collegeName) => {
                  setSelectedCollege(collegeName);
                }} 
              />
            </div>
          </div>

        </div>

        {/* Filter Pills & College Dropdown Strip */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-neutral-900">
          
          {/* Category Pills (No Emojis) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {categoryList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-400 text-black font-semibold'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* College Dropdown Filter */}
          <div className="relative min-w-[220px]">
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="w-full appearance-none px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300 focus:outline-none focus:border-neutral-700 cursor-pointer pr-8"
            >
              {collegeList.map((col) => (
                <option key={col} value={col} className="bg-neutral-900 text-white">
                  {col}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2.5 pointer-events-none text-neutral-500">
              <Filter className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
