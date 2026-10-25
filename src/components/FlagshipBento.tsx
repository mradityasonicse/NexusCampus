import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, Sparkles, MapPin, ShieldCheck, ArrowUpRight, Flame, Clock, Calculator, Train, Users2 } from 'lucide-react';
import type { CollegeEvent } from '../data/events';
import { haptics } from '../utils/audioHaptics';

interface FlagshipBentoProps {
  event: CollegeEvent;
  onSelectEvent: (event: CollegeEvent) => void;
  onOpenCalculator: () => void;
  onOpenTransit: () => void;
  onOpenSquadBuilder: () => void;
}

export const FlagshipBento: React.FC<FlagshipBentoProps> = ({
  event,
  onSelectEvent,
  onOpenCalculator,
  onOpenTransit,
  onOpenSquadBuilder,
}) => {
  // Live Countdown Timer to event date
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 50,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10">
      
      {/* LEFT 7/8 COLS: Flagship Fest Feature Card */}
      <div 
        onClick={() => {
          haptics.playClick();
          onSelectEvent(event);
        }}
        className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B101B]/95 via-[#070A10] to-[#04060A] border border-white/[0.09] hover:border-emerald-500/50 shadow-2xl relative overflow-hidden group cursor-pointer backdrop-blur-2xl transition-all duration-300"
      >
        {/* Directional Specular Top Highlight */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent opacity-80" />
        
        {/* Ambient Corner Flare */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* HUD Corner Brackets */}
        <div className="hud-corner-tl" />
        <div className="hud-corner-tr" />
        <div className="hud-corner-bl" />
        <div className="hud-corner-br" />

        {/* Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              FLAGSHIP SPOTLIGHT OF CENTRAL INDIA
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.08]">
              <MapPin className="w-3 h-3 text-cyan-400" />
              {event.college}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              {event.officialVerificationDomain}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white group-hover:text-emerald-300 transition-colors tracking-tight leading-tight mb-3">
          {event.title}
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mb-6">
          {event.description}
        </p>

        {/* Live Countdown Clock Bar */}
        <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.07] mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Clock className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>REGISTRATION DEADLINE COUNTDOWN:</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-center">
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.1] min-w-[54px]">
              <div className="text-base sm:text-xl font-bold text-white">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="text-[9px] text-slate-500 uppercase">Days</div>
            </div>
            <span className="text-emerald-400 font-bold">:</span>
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.1] min-w-[54px]">
              <div className="text-base sm:text-xl font-bold text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-[9px] text-slate-500 uppercase">Hours</div>
            </div>
            <span className="text-emerald-400 font-bold">:</span>
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.1] min-w-[54px]">
              <div className="text-base sm:text-xl font-bold text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-[9px] text-slate-500 uppercase">Mins</div>
            </div>
            <span className="text-emerald-400 font-bold">:</span>
            <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.1] min-w-[54px]">
              <div className="text-base sm:text-xl font-bold text-emerald-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-[9px] text-slate-500 uppercase">Secs</div>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-white/[0.07]">
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">Total Prize Pool</div>
            <div className="font-heading font-extrabold text-lg sm:text-xl text-emerald-400 flex items-center gap-1">
              <Trophy className="w-4 h-4" />
              {event.prizePool}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">Dates</div>
            <div className="font-mono font-semibold text-xs sm:text-sm text-slate-200 flex items-center gap-1 mt-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {event.startDate}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">Team Size</div>
            <div className="font-mono font-semibold text-xs sm:text-sm text-slate-200 mt-1">
              {event.teamSize}
            </div>
          </div>
          <div className="flex items-center justify-end">
            <span className="inline-flex items-center gap-1 text-xs font-heading font-bold text-emerald-300 group-hover:text-emerald-400">
              Open Full Dossier
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </div>

      </div>

      {/* RIGHT 4/5 COLS: Quick Student Telemetry & Utilities */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-4">
        
        {/* Utility Card 1: Hackathon ROI & Expense Calculator */}
        <div 
          onClick={() => {
            haptics.playClick();
            onOpenCalculator();
          }}
          className="p-5 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/40 hover:bg-white/[0.05] transition-all cursor-pointer group flex-1"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
              Interactive Tool
            </span>
          </div>
          <h3 className="font-heading font-bold text-base text-white group-hover:text-cyan-300 transition-colors">
            Hackathon ROI & Expense Calculator
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Estimate team travel, meal allowances, registration ROI, and net winning prize per teammate.
          </p>
        </div>

        {/* Utility Card 2: Central India Inter-Campus Transit Guide */}
        <div 
          onClick={() => {
            haptics.playClick();
            onOpenTransit();
          }}
          className="p-5 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all cursor-pointer group flex-1"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
              <Train className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
              Campus Transit
            </span>
          </div>
          <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
            Raipur & Bhilai Transit Radar
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Direct auto, bus route numbers, and EMU train schedules between Raipur Jn, Durg Jn, NIT & IIIT-NR.
          </p>
        </div>

        {/* Utility Card 3: Squad Builder CTA */}
        <div 
          onClick={() => {
            haptics.playClick();
            onOpenSquadBuilder();
          }}
          className="p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-black border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer group flex-1"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center">
              <Users2 className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-400 text-black font-bold">
              3+1 Formula
            </span>
          </div>
          <h3 className="font-heading font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
            Assemble 4-Member Dream Squad
          </h3>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Assign Lead Architect, AI Dev, UI Designer, and Pitcher. Mint your digital credentials.
          </p>
        </div>

      </div>

    </div>
  );
};
