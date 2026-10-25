import React, { useState } from 'react';
import { X, Sparkles, ShieldCheck, Check, Share2, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import { haptics } from '../utils/audioHaptics';

interface SquadMember {
  role: string;
  name: string;
  college: string;
  skill: string;
}

interface SquadBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_SLOTS = [
  { role: 'Team Lead & Architect', name: 'Arjun Verma', college: 'NIT Raipur', skill: 'Distributed Systems & FastAPI' },
  { role: 'AI / Core ML Engineer', name: 'Shreya Agrawal', college: 'IIIT Naya Raipur', skill: 'PyTorch, Whisper, LLMs' },
  { role: 'Frontend & UI/UX Specialist', name: 'Rohan Sharma', college: 'Rungta (RCET)', skill: 'React 19, Tailwind, Framer' },
  { role: 'Pitcher & Domain Lead', name: 'Ananya Sahu', college: 'BIT Durg', skill: 'Deck Design & Monetization' },
];

export const SquadBuilderModal: React.FC<SquadBuilderModalProps> = ({ isOpen, onClose }) => {
  const [squadName, setSquadName] = useState('Central Builders X');
  const [targetEvent, setTargetEvent] = useState('Smart India Hackathon 2026');
  const [members, setMembers] = useState<SquadMember[]>(DEFAULT_SLOTS);
  const [isMinted, setIsMinted] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);

  if (!isOpen) return null;

  const synergyScore = 98; // High synergy for full 4-role complement

  const handleMintPass = () => {
    haptics.playSuccess();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
    });
    setIsMinted(true);
  };

  const handleShare = () => {
    haptics.playClick();
    const shareText = `🚀 Check out our hackathon squad "${squadName}" for ${targetEvent} on NexusCampus! Team Lead: ${members[0].name} (${members[0].college}) | Synergy: ${synergyScore}%`;
    navigator.clipboard.writeText(shareText);
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div 
        className="w-full max-w-2xl bg-[#05070B] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 bg-[#030508] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-white">SQUAD BUILDER PLAYGROUND</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  DREAM TEAM DOCK
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Assemble a high-synergy 4-member squad & mint your digital hackathon credentials.
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

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs font-sans">
          
          {/* Squad Meta Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase">Squad Call-Sign / Name</label>
              <input
                type="text"
                value={squadName}
                onChange={(e) => setSquadName(e.target.value)}
                className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white font-heading font-bold text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-slate-400 uppercase">Target Event / Fest</label>
              <input
                type="text"
                value={targetEvent}
                onChange={(e) => setTargetEvent(e.target.value)}
                className="w-full mt-1.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white font-heading font-bold text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* 4-Role Squad Matrix */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                Squad Roster (3+1 Winning Formula)
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  Synergy Score: {synergyScore}%
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {members.map((slot, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 transition-all relative group"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 mb-1">
                    <span>SLOT #{idx + 1}</span>
                    <span className="px-1.5 py-0.2 rounded bg-cyan-500/10 border border-cyan-500/20">{slot.role}</span>
                  </div>
                  <div className="font-heading font-bold text-white text-sm">
                    {slot.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans">
                    {slot.college}
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 mt-1">
                    ⚡ {slot.skill}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minted Digital Squad Pass Preview */}
          {isMinted && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-black to-cyan-950/40 border border-emerald-500/40 shadow-[0_0_40px_-5px_rgba(16,185,129,0.3)] animate-in zoom-in-95 duration-300">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-emerald-400 font-bold">NEXUS HACKATHON PASS</div>
                    <div className="font-heading font-extrabold text-white text-base">{squadName}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400">PASSPORT HASH</div>
                  <div className="text-[10px] font-mono text-cyan-400 font-bold">NXS-CENTRAL-2026-X9</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-slate-300 text-xs">
                  <div>🎯 <strong>Event:</strong> {targetEvent}</div>
                  <div>👥 <strong>Members:</strong> {members.map(m => m.name.split(' ')[0]).join(', ')}</div>
                  <div>⚡ <strong>Win Probability Index:</strong> 98.4% (Tier 1 Central Indian Hub)</div>
                </div>
                <div className="p-2 rounded-xl bg-white text-black flex flex-col items-center">
                  <QrCode className="w-14 h-14" />
                  <span className="text-[8px] font-mono font-bold mt-0.5">VERIFIED SQUAD</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Pass Cryptographically Signed
                </span>
                <button
                  onClick={handleShare}
                  className="px-3.5 py-1.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] text-white font-mono text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedPass ? 'Squad Copied!' : 'Copy Share Link'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#030508] border-t border-white/[0.08] flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400">
            {isMinted ? 'Status: Active Digital Credential' : 'Ready to mint: 4/4 Verified Slots'}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Close
            </button>
            {!isMinted ? (
              <button
                onClick={handleMintPass}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-heading font-extrabold text-xs hover:from-emerald-300 hover:to-cyan-300 transition-all shadow-[0_0_20px_-3px_rgba(16,185,129,0.5)] cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Mint Digital Squad Pass</span>
              </button>
            ) : (
              <button
                onClick={handleShare}
                className="px-5 py-2.5 rounded-xl bg-emerald-400 text-black font-heading font-extrabold text-xs hover:bg-emerald-300 transition-all cursor-pointer flex items-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                <span>{copiedPass ? 'Invite Link Copied!' : 'Share with College Squad'}</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
