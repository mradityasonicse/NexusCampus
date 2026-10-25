import React, { useState, useEffect, useRef } from 'react';
import { Search, Compass, Users, Trophy, PlusCircle, Volume2, Sparkles, X, ArrowRight, ShieldCheck, School } from 'lucide-react';
import { SAMPLE_EVENTS, type CollegeEvent } from '../data/events';
import { SAMPLE_HACKERS, type SoloHacker } from '../data/hackers';
import { haptics } from '../utils/audioHaptics';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: CollegeEvent) => void;
  onNavigateTab: (tab: 'events' | 'hackers' | 'leaderboard') => void;
  onOpenHostModal: () => void;
  onOpenSquadBuilder: () => void;
  onFilterCollege: (college: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectEvent,
  onNavigateTab,
  onOpenHostModal,
  onOpenSquadBuilder,
  onFilterCollege,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
    }
  }, [isOpen]);

  // Global Ctrl+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose(); // toggle
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter items
  const cleanQ = query.toLowerCase().trim();

  const matchingEvents = SAMPLE_EVENTS.filter(
    (ev) =>
      ev.title.toLowerCase().includes(cleanQ) ||
      ev.college.toLowerCase().includes(cleanQ) ||
      ev.tags.some((t) => t.toLowerCase().includes(cleanQ))
  ).slice(0, 4);

  const matchingHackers = SAMPLE_HACKERS.filter(
    (h: SoloHacker) =>
      h.name.toLowerCase().includes(cleanQ) ||
      h.primaryRole.toLowerCase().includes(cleanQ) ||
      h.college.toLowerCase().includes(cleanQ) ||
      h.skills.some((s: string) => s.toLowerCase().includes(cleanQ))
  ).slice(0, 3);

  const quickActions = [
    {
      id: 'act-squad',
      title: 'Assemble Dream Hackathon Squad',
      subtitle: 'Build 4-person team & mint holographic squad pass',
      icon: Sparkles,
      action: () => {
        onOpenSquadBuilder();
        onClose();
      },
    },
    {
      id: 'act-host',
      title: 'Host / Publish Campus Fest',
      subtitle: 'Organizer OS for GDG, ACM, IEEE & CSI clubs',
      icon: PlusCircle,
      action: () => {
        onOpenHostModal();
        onClose();
      },
    },
    {
      id: 'act-nitrr',
      title: 'Filter NIT Raipur Radar',
      subtitle: 'Show all Aavartan, Vigyaan & Code Sprints',
      icon: School,
      action: () => {
        onFilterCollege('NIT Raipur');
        onNavigateTab('events');
        onClose();
      },
    },
    {
      id: 'act-iiitnr',
      title: 'Filter IIIT Naya Raipur Radar',
      subtitle: 'Show all Technovate & AI Hackathons',
      icon: School,
      action: () => {
        onFilterCollege('IIIT Naya Raipur');
        onNavigateTab('events');
        onClose();
      },
    },
  ].filter(
    (a) =>
      cleanQ === '' ||
      a.title.toLowerCase().includes(cleanQ) ||
      a.subtitle.toLowerCase().includes(cleanQ)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Palette Container */}
      <div 
        className="w-full max-w-2xl bg-[#05070B] border border-white/20 rounded-3xl shadow-2xl overflow-hidden text-white flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/[0.08] flex items-center gap-3 bg-[#030508]">
          <Search className="w-5 h-5 text-emerald-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              haptics.playHover();
            }}
            placeholder="Search verified events, colleges, solo hackers, or commands..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-sans"
          />
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.08] text-slate-400 border border-white/[0.1]">
              ESC to Close
            </span>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-3 space-y-4 text-xs font-sans">
          
          {/* Quick Actions */}
          {quickActions.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 block">
                Quick Actions
              </span>
              <div className="space-y-1 mt-1">
                {quickActions.map((act) => {
                  const Icon = act.icon;
                  return (
                    <div
                      key={act.id}
                      onClick={() => {
                        haptics.playClick();
                        act.action();
                      }}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-500/10 hover:border-emerald-500/30 border border-transparent transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-emerald-300">
                            {act.title}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            {act.subtitle}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Events Section */}
          {matchingEvents.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 block">
                Verified Campus Fests & Hackathons
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
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.05] border border-white/[0.04] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-cyan-400 flex items-center justify-center">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-cyan-300 flex items-center gap-2">
                          <span>{ev.title}</span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {ev.prizePool}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {ev.college} • {ev.city}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      View Details ↵
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hackers Section */}
          {matchingHackers.length > 0 && (
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-3 py-1 block">
                Teammate Matchmaker Profiles
              </span>
              <div className="space-y-1 mt-1">
                {matchingHackers.map((hacker: SoloHacker) => (
                  <div
                    key={hacker.id}
                    onClick={() => {
                      haptics.playClick();
                      onNavigateTab('hackers');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/[0.05] border border-white/[0.04] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-white/[0.05] text-amber-400 flex items-center justify-center font-bold font-mono">
                        {hacker.name[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-amber-300">
                          {hacker.name} — <span className="text-slate-400 font-normal">{hacker.primaryRole}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {hacker.college} • Skills: {hacker.skills.slice(0, 3).join(', ')}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">
                      Invite to Squad ↵
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingEvents.length === 0 && matchingHackers.length === 0 && quickActions.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <p>No matching commands or fests found for "{query}"</p>
            </div>
          )}

        </div>

        {/* Footer Hotkey Legend */}
        <div className="p-3 bg-[#020306] border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Authorized Institutional Feed</span>
          </div>
        </div>

      </div>

    </div>
  );
};
