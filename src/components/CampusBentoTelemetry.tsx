import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Ticket, 
  Train, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  ArrowUpRight, 
  MapPin, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Layers 
} from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface CampusBentoTelemetryProps {
  onOpenPass: () => void;
  onOpenTransit: () => void;
  onOpenHostModal: () => void;
  onFilterCategory?: (category: string) => void;
  onFilterCollege?: (college: string) => void;
}

export const CampusBentoTelemetry: React.FC<CampusBentoTelemetryProps> = ({
  onOpenPass,
  onOpenTransit,
  onOpenHostModal,
  onFilterCategory,
  onFilterCollege,
}) => {
  // Real-time Countdown to Aavartan 2026 (March 28, 2026)
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2026-03-28T09:00:00+05:30').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = Math.max(0, targetDate - now);

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 bg-[#05080E] border-t border-neutral-900 relative">
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Institutional Telemetry & Services
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white tracking-tight">
              CAMPUS RADAR & PROTOCOLS
            </h2>
          </div>
          <p className="text-xs font-mono text-neutral-400 max-w-md text-left md:text-right leading-relaxed">
            Direct synchronization with NIT Raipur Technocracy, IIIT Naya Raipur, Rungta, and CSVTU official servers.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5">
          
          {/* CARD 1: 3D HoloPass Station (7 cols on lg) */}
          <div 
            onClick={() => {
              haptics.playClick();
              onOpenPass();
            }}
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-[#0A101D] via-[#070B14] to-[#04060A] border border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_40px_rgba(16,185,129,0.08)] hover:shadow-[0_0_50px_rgba(16,185,129,0.2)] transition-all duration-300 cursor-pointer text-left relative overflow-hidden group flex flex-col justify-between"
          >
            {/* Ambient animated shimmer background */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 backdrop-blur-md">
                  <Ticket className="w-3.5 h-3.5" />
                  OFFICIAL HOLOGRAPHIC ATTENDANCE PASS
                </span>
                <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  SHA-256 Campus Verification
                </span>
              </div>

              <h3 className="font-heading text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-emerald-300 transition-colors">
                Generate Your 3D Student Access Pass
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-xl mb-6">
                Instant encrypted QR badge with custom student credentials, institutional seals, and offline PNG export for CCC Lab & Arena gates.
              </p>

              {/* Real-time Aavartan Countdown Telemetry */}
              <div className="grid grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl bg-black/50 border border-neutral-800/80 mb-6 font-mono text-center">
                <div>
                  <span className="block text-lg sm:text-2xl font-black text-emerald-400 font-heading">
                    {timeLeft.days}
                  </span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Days</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-2xl font-black text-cyan-400 font-heading">
                    {timeLeft.hours}
                  </span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Hours</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-2xl font-black text-white font-heading">
                    {timeLeft.minutes}
                  </span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Mins</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-2xl font-black text-emerald-400 font-heading animate-pulse">
                    {timeLeft.seconds}
                  </span>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider">Secs</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400">Target Arena: Aavartan NIT Raipur</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-400 text-black font-semibold font-heading hover:bg-emerald-300 transition-colors flex items-center gap-1.5">
                <span>CLAIM HOLO PASS</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* CARD 2: Central India High-Speed Transit Radar (5 cols on lg) */}
          <div 
            onClick={() => {
              haptics.playClick();
              onOpenTransit();
            }}
            className="lg:col-span-5 rounded-3xl p-6 sm:p-7 bg-[#080C16] border border-neutral-800 hover:border-cyan-500/40 shadow-xl transition-all duration-300 cursor-pointer text-left relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                  <Train className="w-3.5 h-3.5" />
                  CAMPUS TRANSIT RADAR
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Routes Active
                </span>
              </div>

              <h3 className="font-heading text-xl font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                Inter-Campus Travel & Express Routes
              </h3>
              <p className="text-neutral-400 text-xs leading-relaxed mb-4">
                Verified connectivity between Raipur Junction, Telibandha, G.E. Road (NIT Raipur), and Atal Nagar (IIIT-NR).
              </p>

              {/* Transit Nodes Quick List */}
              <div className="space-y-2 mb-4 font-mono text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-neutral-300">Raipur Jn ⇄ NIT Raipur</span>
                  <span className="text-cyan-400 font-semibold">City Bus 11 / Auto (₹20-₹60)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-neutral-300">NIT Raipur ⇄ IIIT-NR</span>
                  <span className="text-cyan-400 font-semibold">BRTS 24 Express (₹45)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-neutral-900/60 border border-neutral-800">
                  <span className="text-neutral-300">Durg Jn ⇄ Rungta / BIT</span>
                  <span className="text-cyan-400 font-semibold">Shared E-Rickshaw (₹15)</span>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>View Route Timetables & Emergency Helplines</span>
              <span className="text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Open Radar <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* CARD 3: Official NIT Raipur Technocracy Verification Status (4 cols) */}
          <div 
            onClick={() => {
              if (onFilterCollege) onFilterCollege('NIT Raipur');
              haptics.playClick();
            }}
            className="lg:col-span-4 rounded-3xl p-6 bg-[#080B14] border border-neutral-800 hover:border-emerald-500/40 transition-all cursor-pointer text-left relative overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  TECHNOCRACY SYNC
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Live Sync
                </span>
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                19 Arenas Synchronized
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                Full parity with <code className="text-emerald-400">technocracy.nitrr.ac.in</code>. All dates, CCC Lab & G-4 venues, rulebooks, and student coordinators verified.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
              <span>Filter NIT Raipur Events</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* CARD 4: Prize Pool Matrix & Fast Categories (4 cols) */}
          <div className="lg:col-span-4 rounded-3xl p-6 bg-[#080B14] border border-neutral-800 hover:border-amber-500/40 transition-all text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-amber-400 font-bold flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" />
                  PRIZE POOL MATRIX
                </span>
                <span className="text-xs font-mono text-white font-bold">
                  ₹2.25 Crores+
                </span>
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-2">
                Verified Cash Allocations
              </h4>
              
              <div className="grid grid-cols-2 gap-2 font-mono text-xs mb-2">
                <button 
                  onClick={() => onFilterCategory && onFilterCategory('Robotics')}
                  className="p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-neutral-500 block">Robotics</span>
                  <span className="text-amber-400 font-bold">₹1,50,000+</span>
                </button>
                <button 
                  onClick={() => onFilterCategory && onFilterCategory('Coding & AI')}
                  className="p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-neutral-500 block">Coding & AI</span>
                  <span className="text-emerald-400 font-bold">₹1,85,000+</span>
                </button>
                <button 
                  onClick={() => onFilterCategory && onFilterCategory('Gaming')}
                  className="p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-neutral-500 block">Esports</span>
                  <span className="text-cyan-400 font-bold">₹60,000+</span>
                </button>
                <button 
                  onClick={() => onFilterCategory && onFilterCategory('Design')}
                  className="p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-left transition-colors cursor-pointer"
                >
                  <span className="text-[10px] text-neutral-500 block">Design & CAD</span>
                  <span className="text-purple-400 font-bold">₹40,000+</span>
                </button>
              </div>
            </div>

            <div className="pt-2 text-[11px] font-mono text-neutral-500">
              *Direct payment into student bank accounts / UPI upon faculty verification.
            </div>
          </div>

          {/* CARD 5: Host Your Campus Fest (4 cols) */}
          <div 
            onClick={() => {
              haptics.playClick();
              onOpenHostModal();
            }}
            className="lg:col-span-4 rounded-3xl p-6 bg-gradient-to-br from-[#0F1424] to-[#070A12] border border-cyan-500/30 hover:border-cyan-400 transition-all cursor-pointer text-left relative overflow-hidden group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-cyan-400 font-bold flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  INSTITUTIONAL ONBOARDING
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                  Open For All Fests
                </span>
              </div>
              <h4 className="font-heading text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                List Your College Fest
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                Are you a fest convener at GEC Raipur, RITEE, Shankara, or ITM? Get your fest, rulebook, and registration gateway listed with official verification badges.
              </p>
            </div>

            <div className="pt-3 border-t border-neutral-800 text-xs font-mono text-cyan-400 flex items-center justify-between">
              <span>Submit Fest Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
