import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { CollegeEvent } from '../data/events';
import { Calendar, Clock, MapPin, Hourglass, Trophy, ExternalLink, ArrowRight, ShieldCheck, Play } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface EventCardProps {
  event: CollegeEvent;
  onSelect: (event: CollegeEvent) => void;
  onPreviewMedia?: (event: CollegeEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onMouseEnter={() => {
        setIsHovered(true);
        haptics.playHover();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={() => {
        haptics.playClick();
        onSelect(event);
      }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#080B12]/90 hover:bg-[#0B101C] border border-neutral-800/80 hover:border-emerald-500/50 transition-all duration-300 cursor-pointer text-left overflow-hidden shadow-xl hover:shadow-[0_16px_50px_rgba(16,185,129,0.14)]"
    >
      {/* Interactive Radial Cursor Spotlight Inside Card */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(380px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16, 185, 129, 0.12), transparent 75%)`,
          }}
        />
      )}

      {/* Specular Radial Border Glow Following Cursor */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl z-20 border border-emerald-400/50"
          style={{
            maskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black 35%, transparent 80%)`,
            WebkitMaskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black 35%, transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10">
        {/* Top Graphic Banner with Technocracy-Style Typography Banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950">
          <img
            src={event.coverImage}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.82] group-hover:brightness-95"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080B12] via-[#080B12]/20 to-black/40 pointer-events-none" />

          {/* Top Overlaid Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-white bg-black/80 backdrop-blur-md border border-white/10 shadow">
              <MapPin className="w-3 h-3 text-emerald-400" />
              {event.shortCollege}
            </span>

            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
              {event.category}
            </span>
          </div>

          {/* Bottom Overlaid Media Indicators */}
          <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2 z-10">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
              <ShieldCheck className="w-3 h-3" />
              {event.officialVerificationDomain}
            </span>

            {event.videoTeaser && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                <Play className="w-2.5 h-2.5 fill-cyan-400" />
                {event.videoTeaser.duration} Teaser
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          {/* Fest Title & Tagline */}
          <h3 className="font-heading text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1 mb-1.5 tracking-tight">
            {event.title}
          </h3>
          <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {event.tagline}
          </p>

          {/* Technocracy NIT Raipur 4-Metric Grid (Date, Time, Venue, Deadline) */}
          <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-neutral-800/80 mb-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
                <Calendar className="w-2.5 h-2.5 text-emerald-400" /> Date
              </span>
              <span className="text-neutral-200 font-semibold block truncate">
                {event.startDate}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
                <Clock className="w-2.5 h-2.5 text-cyan-400" /> Time
              </span>
              <span className="text-neutral-200 font-semibold block truncate">
                {event.time || '10:00 AM - 5:00 PM'}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
                <MapPin className="w-2.5 h-2.5 text-amber-400" /> Venue
              </span>
              <span className="text-neutral-200 font-semibold block truncate">
                {event.venueCode || event.venue}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
                <Hourglass className="w-2.5 h-2.5 text-pink-400" /> Deadline
              </span>
              <span className="text-pink-300 font-semibold block truncate">
                {event.deadline}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Prize Pool & Official Register Action */}
      <div className="relative z-10 px-5 pb-5 pt-3 border-t border-neutral-800/60 bg-neutral-900/40">
        <div className="flex items-center justify-between text-xs font-mono mb-3">
          <div>
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Prize Pool</span>
            <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" />
              {event.prizePool}
            </span>
          </div>

          <div className="text-right">
            <span className="text-neutral-500 block text-[10px] uppercase tracking-wider">Format</span>
            <span className="text-neutral-300">
              {event.teamSize}
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

          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold text-black bg-emerald-400 group-hover:bg-emerald-300 transition-colors shadow">
            <span>Rulebook & Entry</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
};
