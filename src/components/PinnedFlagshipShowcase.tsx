import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Trophy, Sparkles, MapPin, Calendar, ShieldCheck, Ticket } from 'lucide-react';
import { type CollegeEvent } from '../data/events';
import { haptics } from '../utils/audioHaptics';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface PinnedFlagshipShowcaseProps {
  flagshipEvents: CollegeEvent[];
  onSelectEvent: (event: CollegeEvent) => void;
  onOpenPass: () => void;
}

export const PinnedFlagshipShowcase: React.FC<PinnedFlagshipShowcaseProps> = ({
  flagshipEvents,
  onSelectEvent,
  onOpenPass,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Take top 4 flagship items
  const showcaseItems = flagshipEvents.slice(0, 4);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: Pinned horizontal glide track with GSAP ScrollTrigger
      mm.add('(min-width: 1024px)', () => {
        const track = trackRef.current;
        const container = containerRef.current;
        if (!track || !container) return;

        const totalScroll = track.scrollWidth - window.innerWidth + 96;

        gsap.to(track, {
          x: -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            pin: true,
            scrub: 1.1,
            start: 'top top',
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });
      });

      // Mobile / Tablet: Smooth staggered entrance
      mm.add('(max-width: 1023px)', () => {
        gsap.from('.flagship-card', {
          opacity: 0,
          y: 35,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative overflow-hidden py-12 bg-[#06080D] border-y border-white/5">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                GSAP ScrollTrigger Arena Showcase
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl font-black text-white tracking-tight">
              FLAGSHIP CAMPUS SYMPOZIA
            </h2>
          </div>
          <p className="text-xs font-mono text-slate-400 max-w-md text-left md:text-right">
            High-octane collegiate tournaments with verified cash prize pools and official faculty oversight across Central India.
          </p>
        </div>
      </div>

      {/* Horizontal Track Container */}
      <div className="w-full">
        <div
          ref={trackRef}
          className="flex flex-col lg:flex-row lg:h-[460px] lg:w-max items-center gap-6 px-4 sm:px-6 lg:px-12"
        >
          {showcaseItems.map((event, idx) => (
            <div
              key={event.id}
              onClick={() => {
                haptics.playClick();
                onSelectEvent(event);
              }}
              className="flagship-card group relative w-full lg:w-[480px] h-[400px] lg:h-[440px] rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/50 bg-[#0B0F19] shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all cursor-pointer flex flex-col justify-between p-6 select-none shrink-0"
            >
              {/* Cover Image with Parallax Depth */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-[0.38] group-hover:brightness-[0.48]"
                style={{ backgroundImage: `url('${event.coverImage}')` }}
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />

              {/* Top Meta Header */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{event.shortCollege}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-white/10 text-slate-300">
                    {event.category}
                  </span>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-500 text-black font-mono font-bold text-xs shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                  {event.prizePool}
                </div>
              </div>

              {/* Center Lore / Headline */}
              <div className="relative z-10 space-y-2">
                <span className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider">
                  ARENA 0{idx + 1} • {event.venueCode || event.city.split(',')[0]}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-emerald-300 transition-colors">
                  {event.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 font-sans font-light leading-relaxed">
                  {event.tagline}
                </p>
              </div>

              {/* Bottom Telemetry & Direct Actions */}
              <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{event.startDate}</span>
                  </span>
                  <span className="hidden sm:flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="truncate max-w-[120px]">{event.venue.split(',')[0]}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      haptics.playClick();
                      onOpenPass();
                    }}
                    className="p-2 rounded-xl bg-white/10 hover:bg-emerald-500 hover:text-black text-white transition-colors cursor-pointer"
                    title="Claim 3D Attendance Pass"
                  >
                    <Ticket className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Inspect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
