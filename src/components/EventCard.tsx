import React from 'react';
import type { CollegeEvent } from '../data/events';
import { 
  Calendar, 
  MapPin, 
  Trophy, 
  Users, 
  ArrowUpRight, 
  Flame 
} from 'lucide-react';

interface EventCardProps {
  event: CollegeEvent;
  onSelect: (event: CollegeEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  return (
    <div 
      onClick={() => onSelect(event)}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#0E131F]/90 via-[#0B0F17]/95 to-[#080B11] border border-white/[0.08] hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)] cursor-pointer overflow-hidden backdrop-blur-xl"
    >
      {/* Top Hairline Specular Highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Subtle Corner Glow Accent */}
      <div 
        className="absolute -top-12 -right-12 w-28 h-28 blur-[40px] rounded-full pointer-events-none transition-all group-hover:scale-125 duration-500 opacity-20"
        style={{ backgroundColor: event.accentColor }}
      />

      {/* Header Info: College & Status Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-white/[0.04] text-slate-300 border border-white/[0.08]">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {event.shortCollege}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
              {event.city}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {event.isHot && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/25">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> HOT
              </span>
            )}
            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase ${
              event.mode === 'On-Campus' 
                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
            }`}>
              {event.mode}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1 mb-2">
          {event.title}
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4">
          {event.tagline}
        </p>

        {/* Key Event Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {event.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] text-slate-400 border border-white/[0.06]"
            >
              #{tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-[10px] font-mono text-slate-500">
              +{event.tags.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Bottom Telemetry: Prize Pool, Date, Registrations & Action */}
      <div className="pt-4 border-t border-white/[0.06]">
        <div className="grid grid-cols-2 gap-3 mb-4">
          
          {/* Prize Pool */}
          <div>
            <p className="text-[10px] font-mono uppercase text-slate-500 mb-0.5">Prize Pool</p>
            <p className="font-mono text-base font-bold text-emerald-400 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-emerald-400" />
              {event.prizePool}
            </p>
          </div>

          {/* Dates & Deadline */}
          <div>
            <p className="text-[10px] font-mono uppercase text-slate-500 mb-0.5">Event Dates</p>
            <p className="font-mono text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-cyan-400" />
              {event.startDate}
            </p>
          </div>

        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Users className="w-3.5 h-3.5 text-slate-500" />
            <span><strong className="text-white">{event.registeredCount}</strong> registered</span>
          </div>

          <button 
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-black transition-all border border-emerald-500/30 group-hover:border-emerald-400 group-hover:shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)] cursor-pointer"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
