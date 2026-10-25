import React, { useState, useEffect } from 'react';
import { X, Calculator, Trophy, DollarSign, Train, ShieldCheck, Check, Sparkles, Share2 } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface HackathonCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EVENTS_DATA = [
  { name: 'NIT Raipur — Aavartan 2026', first: 200000, second: 100000, third: 50000, fee: 0 },
  { name: 'IIIT Naya Raipur — Technovate', first: 150000, second: 80000, third: 40000, fee: 0 },
  { name: 'Rungta Bhilai — VYOM 2026', first: 120000, second: 60000, third: 30000, fee: 0 },
  { name: 'BIT Durg — OJAS 2026', first: 100000, second: 50000, third: 25000, fee: 0 },
  { name: 'Smart India Hackathon (SIH 2026)', first: 100000, second: 75000, third: 50000, fee: 0 },
];

export const HackathonCalculatorModal: React.FC<HackathonCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);
  const [teamSize, setTeamSize] = useState(4);
  const [targetRank, setTargetRank] = useState<'first' | 'second' | 'third'>('first');
  const [origin, setOrigin] = useState<'local' | 'nearby' | 'interstate'>('local');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentEvent = EVENTS_DATA[selectedEventIndex];
  const grossPrize = currentEvent[targetRank];

  // Travel cost estimate per person
  const travelCostPerHead = origin === 'local' ? 50 : origin === 'nearby' ? 180 : 1200;
  const totalTravelCost = travelCostPerHead * teamSize;
  const netPool = grossPrize - totalTravelCost;
  const netPerHead = Math.max(Math.floor(netPool / teamSize), 0);

  const handleShare = () => {
    haptics.playClick();
    const text = `💰 Hackathon ROI Analysis for ${currentEvent.name}: Targeting ${targetRank.toUpperCase()} Prize (₹${grossPrize.toLocaleString('en-IN')}) with ${teamSize} members. Net payout: ₹${netPerHead.toLocaleString('en-IN')} per member (Accommodation: FREE). Calculated via NexusCampus!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div 
        className="w-full max-w-xl bg-[#05070B] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 bg-[#030508] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/25 flex items-center justify-center">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-white">HACKATHON ROI CALCULATOR</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  REAL BUDGETING
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Calculate real team travel expenses, food rations, and net winning payout per hacker.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              haptics.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Controls */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs font-sans">
          
          {/* 1. Target Event */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">
              Select Target Hackathon
            </label>
            <select
              value={selectedEventIndex}
              onChange={(e) => {
                haptics.playHover();
                setSelectedEventIndex(Number(e.target.value));
              }}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white font-heading font-semibold text-xs focus:outline-none focus:border-cyan-400"
            >
              {EVENTS_DATA.map((ev, i) => (
                <option key={i} value={i} className="bg-[#05070B] text-white">
                  {ev.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Team Size & Target Rank */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">
                Team Size: {teamSize} Hackers
              </label>
              <div className="flex items-center gap-1.5">
                {[2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    onClick={() => {
                      haptics.playClick();
                      setTeamSize(num);
                    }}
                    className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      teamSize === num
                        ? 'bg-cyan-500 text-black shadow-[0_0_15px_-3px_rgba(6,182,212,0.5)]'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">
                Target Prize Tier
              </label>
              <div className="flex items-center gap-1.5">
                {(['first', 'second', 'third'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      haptics.playClick();
                      setTargetRank(r);
                    }}
                    className={`flex-1 py-2 rounded-xl text-[11px] font-mono font-bold capitalize transition-all cursor-pointer ${
                      targetRank === r
                        ? 'bg-emerald-400 text-black shadow-[0_0_15px_-3px_rgba(16,185,129,0.5)]'
                        : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.08]'
                    }`}
                  >
                    {r === 'first' ? '1st Winner' : r === 'second' ? 'Runner Up' : '3rd Rank'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Origin City */}
          <div>
            <label className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">
              Origin Location & Travel Distance
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => {
                  haptics.playClick();
                  setOrigin('local');
                }}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  origin === 'local'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:text-white'
                }`}
              >
                <div className="font-bold font-heading text-xs">Raipur Local</div>
                <div className="text-[10px] font-mono opacity-70">Auto / Bus (~₹50)</div>
              </button>

              <button
                onClick={() => {
                  haptics.playClick();
                  setOrigin('nearby');
                }}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  origin === 'nearby'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:text-white'
                }`}
              >
                <div className="font-bold font-heading text-xs">Bhilai / Durg</div>
                <div className="text-[10px] font-mono opacity-70">Local Train (~₹180)</div>
              </button>

              <button
                onClick={() => {
                  haptics.playClick();
                  setOrigin('interstate');
                }}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  origin === 'interstate'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40'
                    : 'bg-white/[0.02] text-slate-400 border-white/[0.06] hover:text-white'
                }`}
              >
                <div className="font-bold font-heading text-xs">Inter-State</div>
                <div className="text-[10px] font-mono opacity-70">Express Rail (~₹1,200)</div>
              </button>
            </div>
          </div>

          {/* 4. Calculated Financial Breakdown Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0A1220] to-[#04060A] border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Gross Prize Pool:</span>
              <span className="font-mono font-bold text-white">₹{grossPrize.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Registration Fee:</span>
              <span className="font-mono font-bold text-emerald-400">₹0 (100% Free Campus Fest)</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Stay & 24h Meals:</span>
              <span className="font-mono font-bold text-emerald-400">₹0 (Hostel Accommodation Provided)</span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Estimated Team Travel:</span>
              <span className="font-mono font-bold text-rose-400">-₹{totalTravelCost.toLocaleString('en-IN')}</span>
            </div>

            <div className="pt-3 border-t border-white/[0.1] flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Estimated Net Payout Per Teammate</div>
                <div className="font-heading font-extrabold text-2xl text-emerald-400">
                  ₹{netPerHead.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400">Team Total Net</div>
                <div className="font-mono font-bold text-white text-base">
                  ₹{netPool.toLocaleString('en-IN')}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#030508] border-t border-white/[0.08] flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Based on official university verified rulebooks</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl bg-cyan-400 text-black font-heading font-bold text-xs hover:bg-cyan-300 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied to Clipboard!' : 'Share Breakdown'}</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
