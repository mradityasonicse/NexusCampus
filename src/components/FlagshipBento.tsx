import React from 'react';
import { Trophy, Calendar, MapPin, ShieldCheck, ArrowRight, ExternalLink, Train, Plus } from 'lucide-react';
import type { CollegeEvent } from '../data/events';
import { haptics } from '../utils/audioHaptics';

interface FlagshipBentoProps {
  event: CollegeEvent;
  onSelectEvent: (event: CollegeEvent) => void;
  onOpenTransit: () => void;
  onOpenHostModal: () => void;
}

export const FlagshipBento: React.FC<FlagshipBentoProps> = ({
  event,
  onSelectEvent,
  onOpenTransit,
  onOpenHostModal,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
      
      {/* LEFT 8 COLS: Flagship Fest Feature Card */}
      <div 
        onClick={() => {
          haptics.playClick();
          onSelectEvent(event);
        }}
        className="lg:col-span-8 p-6 sm:p-7 rounded-2xl bg-neutral-900/60 hover:bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer text-left relative overflow-hidden"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Featured Flagship Symposium
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-300 bg-neutral-800 border border-neutral-700">
              <MapPin className="w-3 h-3 text-neutral-400 inline mr-1" />
              {event.college}
            </span>
          </div>

          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified: {event.officialVerificationDomain}
          </span>
        </div>

        <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight group-hover:text-emerald-400 transition-colors">
          {event.title}
        </h2>
        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-2xl mb-5">
          {event.description}
        </p>

        {/* Verified Parameters Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3.5 border-t border-neutral-800/80 text-xs font-mono">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase">Cash Prize Pool</span>
            <span className="text-emerald-400 font-bold text-sm sm:text-base flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              {event.prizePool}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 block text-[10px] uppercase">Event Schedule</span>
            <span className="text-neutral-200 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {event.startDate} – {event.endDate}
            </span>
          </div>

          <div className="flex items-center sm:justify-end">
            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors">
              <span>View Dossier & Schedule</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT 4 COLS: Direct Navigation Utilities */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-3 text-left">
        
        {/* Transit Radar Card */}
        <div 
          onClick={() => {
            haptics.playClick();
            onOpenTransit();
          }}
          className="p-5 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer flex-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Train className="w-3.5 h-3.5" /> Campus Transit
              </span>
              <span className="text-[10px] font-mono text-neutral-500">Local Guide</span>
            </div>
            <h3 className="font-heading font-bold text-sm text-white mb-1">
              Central India Route & Transit Guide
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Verified train fares, Raipur-Durg EMU shuttle schedules, City Bus 11A, and auto rates between Raipur Jn, Durg Jn, NIT & IIIT-NR.
            </p>
          </div>
          <div className="pt-2 text-[11px] font-mono text-neutral-400 flex items-center gap-1">
            <span>Open Directions</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

        {/* Submit Fest Card */}
        <div 
          onClick={() => {
            haptics.playClick();
            onOpenHostModal();
          }}
          className="p-5 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer flex-1 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Student Clubs
              </span>
              <span className="text-[10px] font-mono text-neutral-500">IEEE • ACM • GDG</span>
            </div>
            <h3 className="font-heading font-bold text-sm text-white mb-1">
              List Your College Fest or Hackathon
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Official committee coordinators can submit upcoming technical events with verified institutional domains and helplines.
            </p>
          </div>
          <div className="pt-2 text-[11px] font-mono text-neutral-400 flex items-center gap-1">
            <span>Submit Fest Details</span>
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>

      </div>

    </div>
  );
};
