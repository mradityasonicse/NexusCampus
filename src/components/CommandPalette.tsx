import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Plus, X, ArrowRight, ShieldCheck, MapPin, Train } from 'lucide-react';
import { SAMPLE_EVENTS, type CollegeEvent } from '../data/events';
import { haptics } from '../utils/audioHaptics';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: CollegeEvent) => void;
  onOpenHostModal: () => void;
  onOpenTransit: () => void;
  onFilterCollege: (college: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
  onOpenHostModal,
  onOpenTransit,
  onFilterCollege,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const cleanQ = query.toLowerCase().trim();

  const matchingEvents = SAMPLE_EVENTS.filter(
    (ev) =>
      ev.title.toLowerCase().includes(cleanQ) ||
      ev.college.toLowerCase().includes(cleanQ) ||
      ev.tags.some((t) => t.toLowerCase().includes(cleanQ))
  ).slice(0, 5);

  const quickColleges = [
    { name: 'NIT Raipur', fest: 'Aavartan 2026' },
    { name: 'IIIT Naya Raipur', fest: 'Technovate 2026' },
    { name: 'Rungta', fest: 'VYOM 2026' },
    { name: 'BIT Durg', fest: 'OJAS 2026' },
    { name: 'CSVTU', fest: 'UTKARSH Expo' },
  ].filter(
    (c) => cleanQ === '' || c.name.toLowerCase().includes(cleanQ) || c.fest.toLowerCase().includes(cleanQ)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      
      <div 
        className="w-full max-w-xl bg-[#090C12] border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-neutral-800 flex items-center gap-3 bg-neutral-900/60">
          <Search className="w-4 h-4 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              haptics.playHover();
            }}
            placeholder="Type college name, fest title, or keywords..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 focus:outline-none font-sans"
          />
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-neutral-800 text-neutral-400 border border-neutral-700">
              ESC
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded text-neutral-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Container */}
        <div className="max-h-[55vh] overflow-y-auto p-3 space-y-4 text-xs font-sans">
          
          {/* Quick Actions */}
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-3 py-1 block">
              Quick Actions
            </span>
            <div className="space-y-1 mt-1">
              <div
                onClick={() => {
                  haptics.playClick();
                  onOpenTransit();
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-800/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <Train className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-emerald-400">
                      Central India Transit Radar
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      View SECR local trains, bus routes, and fares to campuses
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-emerald-400" />
              </div>

              <div
                onClick={() => {
                  haptics.playClick();
                  onOpenHostModal();
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-800/60 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-cyan-400">
                      List College Fest / Hackathon
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Submit upcoming event for authorized university listing
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-cyan-400" />
              </div>
            </div>
          </div>

          {/* College Quick Filters */}
          {quickColleges.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-3 py-1 block">
                Filter by Accredited College
              </span>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                {quickColleges.map((c, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      haptics.playClick();
                      onFilterCollege(c.name);
                      onClose();
                    }}
                    className="p-2 rounded-lg bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-left cursor-pointer transition-colors"
                  >
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      <span>{c.name}</span>
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      {c.fest}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matching Events */}
          {matchingEvents.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 px-3 py-1 block">
                Matching Campus Events
              </span>
              <div className="space-y-1 mt-1">
                {matchingEvents.map((ev) => (
                  <div
                    key={ev.id}
                    onClick={() => {
                      haptics.playClick();
                      onSelectEvent(ev);
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-800/60 border border-transparent hover:border-neutral-800 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-neutral-800 text-neutral-400 flex items-center justify-center">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-emerald-400 flex items-center gap-2">
                          <span>{ev.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {ev.prizePool}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          {ev.college} • {ev.city}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500">
                      View Dossier
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-500">
          <div className="flex items-center gap-3">
            <span>ESC to Close</span>
            <span>Click to Select</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Official Domains Only</span>
          </div>
        </div>

      </div>

    </div>
  );
};
