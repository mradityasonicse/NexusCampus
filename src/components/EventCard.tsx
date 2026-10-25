import React from 'react';
import { motion } from 'framer-motion';
import type { CollegeEvent } from '../data/events';
import { Calendar, MapPin, Trophy, ExternalLink, ArrowRight, ShieldCheck, Play, Image as ImageIcon } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface EventCardProps {
  event: CollegeEvent;
  onSelect: (event: CollegeEvent) => void;
  onPreviewMedia?: (event: CollegeEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect, onPreviewMedia }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      onMouseEnter={() => haptics.playHover()}
      onClick={() => {
        haptics.playClick();
        onSelect(event);
      }}
      className="group relative flex flex-col justify-between rounded-2xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800/80 hover:border-neutral-700/90 transition-all duration-300 cursor-pointer text-left overflow-hidden shadow-lg hover:shadow-2xl"
    >
      <div>
        {/* Cover Photo Banner with Cinematic Overlay */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
          <img
            src={event.coverImage}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.9] group-hover:brightness-100"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-black/30 pointer-events-none" />

          {/* Top Overlaid Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-white bg-black/70 backdrop-blur-md border border-white/10 shadow">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {event.shortCollege}
            </span>

            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
              {event.mode}
            </span>
          </div>

          {/* Bottom Overlaid Media Indicators */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3" />
              {event.officialVerificationDomain}
            </span>

            {event.videoTeaser && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-black/70 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                <Play className="w-2.5 h-2.5 fill-cyan-400" />
                {event.videoTeaser.duration} Teaser
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Fest Title & Tagline */}
          <h3 className="font-heading text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1 tracking-tight">
            {event.title}
          </h3>
          <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {event.tagline}
          </p>

          {/* Clean Categorical Tags & Gallery Pill */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {event.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag}
                className="px-2 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-neutral-800/40 border border-neutral-800"
              >
                {tag}
              </span>
            ))}
            {event.galleryImages.length > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-400 bg-neutral-800/30 border border-neutral-800">
                <ImageIcon className="w-2.5 h-2.5 text-neutral-500" />
                {event.galleryImages.length} Photos
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Prize Pool, Schedule & Official Link */}
      <div className="px-5 pb-5 pt-3 border-t border-neutral-800/60 bg-neutral-900/20">
        <div className="flex items-center justify-between text-xs font-mono mb-3">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Prize Pool</span>
            <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              {event.prizePool}
            </span>
          </div>

          <div className="text-right">
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Date</span>
            <span className="text-neutral-300 flex items-center gap-1">
              <Calendar className="w-3 h-3 text-neutral-400" />
              {event.startDate}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-neutral-800/40">
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

          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 group-hover:translate-x-0.5 transition-transform">
            <span>Explore Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
