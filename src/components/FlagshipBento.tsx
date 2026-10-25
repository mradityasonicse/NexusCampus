import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, ShieldCheck, ArrowRight, ExternalLink, Train, Plus, Play, Image as ImageIcon, Volume2 } from 'lucide-react';
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
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-8">
      
      {/* LEFT 8 COLS: Flagship Fest Feature Card with Cinematic Media */}
      <div 
        onClick={() => {
          haptics.playClick();
          onSelectEvent(event);
        }}
        className="lg:col-span-8 rounded-2xl bg-neutral-900/70 hover:bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-all cursor-pointer text-left relative overflow-hidden group shadow-2xl flex flex-col justify-between"
      >
        {/* Cinematic Ambient Background Image with Dark Gradient Vignette */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover object-center opacity-25 group-hover:opacity-35 group-hover:scale-105 transition-all duration-700 ease-out filter blur-[1px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/80 to-[#080B12]/60" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                Featured Flagship Fest
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono text-neutral-300 bg-neutral-900/80 border border-neutral-800 backdrop-blur-md">
                <MapPin className="w-3 h-3 text-emerald-400 inline mr-1" />
                {event.college}
              </span>
            </div>

            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 bg-black/50 px-2.5 py-0.5 rounded border border-emerald-500/20 backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified: {event.officialVerificationDomain}
            </span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-2.5 tracking-tight group-hover:text-emerald-300 transition-colors">
            {event.title}
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-2xl mb-6">
            {event.description}
          </p>

          {/* Quick Media Bar */}
          {event.videoTeaser && (
            <div className="flex items-center gap-3 mb-5 p-2.5 rounded-xl bg-black/40 border border-neutral-800/80 backdrop-blur-md max-w-md">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400 ml-0.5" />
              </div>
              <div className="text-left overflow-hidden">
                <span className="block text-xs font-mono font-medium text-white truncate">
                  {event.videoTeaser.title}
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  {event.videoTeaser.duration} Duration • {event.videoTeaser.views}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Verified Parameters Strip */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 p-6 sm:p-7 pt-4 border-t border-neutral-800/80 bg-neutral-950/60 backdrop-blur-md text-xs font-mono">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Cash Prize Pool</span>
            <span className="text-emerald-400 font-bold text-sm sm:text-base flex items-center gap-1 mt-0.5">
              <Trophy className="w-3.5 h-3.5" />
              {event.prizePool}
            </span>
          </div>

          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Event Schedule</span>
            <span className="text-neutral-200 flex items-center gap-1 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" />
              {event.startDate} – {event.endDate}
            </span>
          </div>

          <div className="flex items-center sm:justify-end">
            <button className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all cursor-pointer">
              <span>View Dossier & Gallery</span>
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
              Verified train, bus, and metro connectivity between Raipur Junction, Durg Junction, Atal Nagar Naya Raipur, and Bhilai campus nodes.
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Inter-city Fares: ₹20 – ₹180</span>
            <span className="text-emerald-400 flex items-center gap-1">
              Open Route Radar <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

        {/* List Fest Card */}
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
                <Plus className="w-3.5 h-3.5" /> For College Organizers
              </span>
              <span className="text-[10px] font-mono text-neutral-500">Free Listing</span>
            </div>
            <h3 className="font-heading font-bold text-sm text-white mb-1">
              Submit Your College Fest / Hackathon
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Are you part of a Student Council, IEEE, CSI, or E-Cell? Submit your fest details, rulebook, and official portal for verified inclusion.
            </p>
          </div>

          <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Domain Check Required</span>
            <span className="text-cyan-400 flex items-center gap-1">
              Organizer Form <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
