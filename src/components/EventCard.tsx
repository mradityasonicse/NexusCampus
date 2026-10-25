import React from 'react';
import type { CollegeEvent } from '../data/events';
import { Calendar, MapPin, Trophy, ExternalLink, ArrowRight, ShieldCheck } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface EventCardProps {
  event: CollegeEvent;
  onSelect: (event: CollegeEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  return (
    <div 
      onMouseEnter={() => haptics.playHover()}
      onClick={() => {
        haptics.playClick();
        onSelect(event);
      }}
      className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/80 border border-neutral-800/80 hover:border-neutral-700 transition-all duration-200 cursor-pointer text-left"
    >
      <div>
        {/* Top Badges: Location & Domain Verification */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-neutral-300 bg-neutral-800/80 border border-neutral-700/60">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {event.shortCollege}
            </span>

            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" />
              {event.officialVerificationDomain}
            </span>
          </div>

          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase bg-neutral-800 text-neutral-300 border border-neutral-700">
            {event.mode}
          </span>
        </div>

        {/* Fest Title & Tagline */}
        <h3 className="font-heading text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1.5 tracking-tight">
          {event.title}
        </h3>
        <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed mb-4">
          {event.tagline}
        </p>

        {/* Clean Categorical Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-5">
          {event.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-neutral-800/40 border border-neutral-800"
            >
              {tag}
            </span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-[10px] font-mono text-neutral-600">
              +{event.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Prize Pool & Official Actions */}
      <div className="pt-3.5 border-t border-neutral-800/80">
        <div className="flex items-center justify-between text-xs font-mono mb-3">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase">Prize Pool</span>
            <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              {event.prizePool}
            </span>
          </div>

          <div className="text-right">
            <span className="text-neutral-500 block text-[10px] uppercase">Date</span>
            <span className="text-neutral-300 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-neutral-400" />
              {event.startDate}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <a
            href={event.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              haptics.playClick();
            }}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <span>{event.officialVerificationDomain}</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button 
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 hover:text-white bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-colors"
          >
            <span>Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
