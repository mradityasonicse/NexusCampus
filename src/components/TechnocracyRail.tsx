import React from 'react';
import { Rocket, ShieldCheck } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

export const TechnocracyRail: React.FC<{ onActivateTechnocracyMode?: () => void }> = ({ onActivateTechnocracyMode }) => {
  return (
    <aside 
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-4 py-6 px-2.5 rounded-r-2xl bg-[#080B13]/85 border-y border-r border-emerald-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(16,185,129,0.15)] select-none transition-all hover:bg-[#0D121F] cursor-pointer group"
      onClick={() => {
        haptics.playClick();
        if (onActivateTechnocracyMode) onActivateTechnocracyMode();
      }}
      title="Click to view Team Technocracy (NIT Raipur) Official Arena Hub"
    >
      {/* Top Animated Rocket Icon */}
      <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
        <Rocket className="w-4 h-4 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
      </div>

      {/* Pulsing Status Dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />

      {/* Rotated Vertical Typography */}
      <div className="[writing-mode:vertical-rl] rotate-180 flex items-center gap-3 font-heading font-black text-[11px] tracking-[0.25em] uppercase text-neutral-300 group-hover:text-emerald-400 transition-colors py-2">
        <span>HAIL TECHNOCRACY</span>
        <span className="text-emerald-500 font-mono">•</span>
        <span className="text-neutral-500 font-mono">NIT RAIPUR</span>
      </div>

      {/* Bottom Verification Glyph */}
      <div className="w-6 h-6 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
      </div>
    </aside>
  );
};
