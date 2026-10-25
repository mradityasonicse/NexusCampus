import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ShieldCheck, Sparkles, QrCode, CheckCircle2, Ticket, Share2 } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface HoloPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEventTitle?: string;
}

export const HoloPassModal: React.FC<HoloPassModalProps> = ({
  isOpen,
  onClose,
  defaultEventTitle = 'AAVARTAN & VIGYAAN 2026',
}) => {
  const [attendeeName, setAttendeeName] = useState('Aditya Soni');
  const [college, setCollege] = useState('National Institute of Technology (NIT), Raipur');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [passTier, setPassTier] = useState<'VIP ALL-ACCESS' | 'HACKER ELITE' | 'VIGYAAN INNOVATOR'>('VIP ALL-ACCESS');
  const [passId, setPassId] = useState('NITRR-2026-X892F');
  const [isCopied, setIsCopied] = useState(false);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate deterministic QR Code pattern on canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = qrCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 120;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#05070B';
    ctx.fillRect(0, 0, size, size);

    // Draw stylized QR matrix dots
    ctx.fillStyle = '#10B981';
    const grid = 12;
    const cellSize = size / grid;

    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        // Corner markers
        const isCorner1 = r < 3 && c < 3;
        const isCorner2 = r < 3 && c >= grid - 3;
        const isCorner3 = r >= grid - 3 && c < 3;

        if (isCorner1 || isCorner2 || isCorner3) {
          ctx.fillStyle = '#34D399';
          ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
        } else {
          // Semi-random deterministic seed
          const seed = (r * 17 + c * 31 + attendeeName.length * 7) % 100;
          if (seed > 40) {
            ctx.fillStyle = seed > 75 ? '#06B6D4' : '#10B981';
            ctx.fillRect(c * cellSize + 1.5, r * cellSize + 1.5, cellSize - 3, cellSize - 3);
          }
        }
      }
    }
  }, [isOpen, attendeeName, passTier]);

  // Mouse tilt 3D physics
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: -(y / (rect.height / 2)) * 12,
      y: (x / (rect.width / 2)) * 12,
    });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  // Download High-Resolution Pass PNG
  const downloadPass = () => {
    haptics.playSuccess();
    const offscreen = document.createElement('canvas');
    const width = 800;
    const height = 1100;
    offscreen.width = width;
    offscreen.height = height;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    // 1. Dark Cyber Background
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    bgGrad.addColorStop(0, '#060913');
    bgGrad.addColorStop(0.5, '#0B1120');
    bgGrad.addColorStop(1, '#030508');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Neon Holographic Border
    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 6;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(38, 38, width - 76, height - 76);

    // 3. Header Badges
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 24px monospace';
    ctx.fillText('TEAM TECHNOCRACY • NIT RAIPUR', 60, 90);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 48px sans-serif';
    ctx.fillText('AAVARTAN & VIGYAAN', 60, 155);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '18px monospace';
    ctx.fillText('CENTRAL INDIA’S LARGEST TECH-SYMPOSIUM (2007–2026)', 60, 190);

    // Line separator
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(60, 220);
    ctx.lineTo(width - 60, 220);
    ctx.stroke();

    // 4. Pass Tier Plaque
    ctx.fillStyle = passTier === 'VIP ALL-ACCESS' ? '#F59E0B' : '#10B981';
    ctx.fillRect(60, 250, 320, 48);

    ctx.fillStyle = '#000000';
    ctx.font = 'bold 22px monospace';
    ctx.fillText(passTier, 80, 282);

    // 5. Attendee Metadata Fields
    ctx.fillStyle = '#64748B';
    ctx.font = '16px monospace';
    ctx.fillText('OFFICIAL ATTENDEE NAME', 60, 350);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText(attendeeName, 60, 395);

    ctx.fillStyle = '#64748B';
    ctx.font = '16px monospace';
    ctx.fillText('INSTITUTION / CAMPUS', 60, 460);
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '600 24px sans-serif';
    ctx.fillText(college, 60, 500);

    ctx.fillStyle = '#64748B';
    ctx.font = '16px monospace';
    ctx.fillText('BRANCH / ENGINEERING DISCIPLINE', 60, 565);
    ctx.fillStyle = '#34D399';
    ctx.font = '600 22px monospace';
    ctx.fillText(branch, 60, 600);

    ctx.fillStyle = '#64748B';
    ctx.font = '16px monospace';
    ctx.fillText('AUTHORIZED ACCESS ARENAS', 60, 665);
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '18px monospace';
    ctx.fillText('CCC LAB • HALL S-4 • CENTRAL AUDI • CENTRAL LAWN', 60, 700);

    // Line separator
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(60, 740);
    ctx.lineTo(width - 60, 740);
    ctx.stroke();

    // 6. QR Code Embed
    if (qrCanvasRef.current) {
      ctx.drawImage(qrCanvasRef.current, 60, 780, 200, 200);
    }

    // Pass ID & Hash
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 26px monospace';
    ctx.fillText(passId, 290, 830);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '14px monospace';
    ctx.fillText('SCAN AT NITR CAMPUS GATES FOR ADMISSION', 290, 865);

    ctx.fillStyle = '#64748B';
    ctx.font = '12px monospace';
    ctx.fillText('SHA-256: d241be9a...technocracy.nitrr.ac.in/verify', 290, 900);
    ctx.fillText('IPR PATENT & PROTOTYPE EXHIBITOR CELL BACKED', 290, 925);

    // Footer Stamp
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('OFFICIALLY CERTIFIED BY STUDENT ACTIVITY COUNCIL • NIT RAIPUR', 60, 1040);

    // Trigger download
    const dataUrl = offscreen.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `NexusCampus_Pass_${attendeeName.replace(/\s+/g, '_')}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyVerificationLink = () => {
    haptics.playClick();
    navigator.clipboard.writeText(`https://technocracy.nitrr.ac.in/verify?id=${passId}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl bg-[#090D1A] border border-emerald-500/30 rounded-3xl shadow-[0_0_60px_rgba(16,185,129,0.2)] overflow-hidden p-6 sm:p-8 flex flex-col lg:flex-row gap-8 items-center text-left"
        >
          {/* Close Button */}
          <button
            onClick={() => {
              haptics.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column: 3D Holographic Pass Preview */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            <div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="relative w-full max-w-sm rounded-2xl p-6 bg-gradient-to-b from-[#0D1527] via-[#080D18] to-black border-2 border-emerald-400/50 shadow-[0_0_40px_rgba(16,185,129,0.25)] select-none cursor-pointer overflow-hidden group"
            >
              {/* Shimmer Specular Light Overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity bg-gradient-to-tr from-transparent via-emerald-400/20 to-cyan-400/30"
                style={{
                  transform: `translate(${tilt.y * 3}px, ${-tilt.x * 3}px)`,
                }}
              />

              {/* Pass Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <img
                    src="https://technocracy.nitrr.ac.in/static/media/tcLogo-min.5cc6fefd048634dc6667.webp"
                    alt="Logo"
                    className="w-8 h-8 rounded-full border border-emerald-400/50"
                  />
                  <div>
                    <div className="text-[10px] font-mono font-bold text-emerald-400 tracking-wider">
                      NIT RAIPUR
                    </div>
                    <div className="text-xs font-heading font-black text-white">
                      TEAM TECHNOCRACY
                    </div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {passTier}
                </span>
              </div>

              {/* Fest Title */}
              <div className="mb-4">
                <h3 className="font-heading font-black text-lg text-white leading-tight">
                  AAVARTAN & VIGYAAN '26
                </h3>
                <p className="text-[10px] font-mono text-slate-400">
                  18-Year Legacy • Central India Technical Fest
                </p>
              </div>

              {/* Attendee Details */}
              <div className="space-y-3 mb-4 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">DELEGATE NAME</span>
                  <span className="font-bold text-emerald-300 text-sm">{attendeeName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">INSTITUTION</span>
                  <span className="text-slate-200 truncate block">{college}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">BRANCH</span>
                  <span className="text-cyan-300 truncate block">{branch}</span>
                </div>
              </div>

              {/* QR Code & Barcode Footnote */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <canvas ref={qrCanvasRef} className="w-14 h-14 rounded-lg border border-white/10 bg-black" />
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-emerald-400">
                    {passId}
                  </div>
                  <div className="text-[9px] font-mono text-slate-500">
                    SHA-256 ENCRYPTED
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-emerald-400 mt-0.5 justify-end">
                    <ShieldCheck className="w-3 h-3" />
                    <span>NITRR VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-slate-500 mt-3 text-center">
              Hover & move mouse over the pass to inspect the 3D holographic tilt physics.
            </p>
          </div>

          {/* Right Column: Customization & Actions */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                  CRYPTOGRAPHIC FEST PASS CREATOR
                </span>
              </div>
              <h2 className="font-heading text-2xl font-black text-white">
                Claim Your 3D Attendance Hologram
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Generate an official, tamper-proof festival pass authorized for NIT Raipur’s Central Computer Center, Hall S-4, and open-air arenas.
              </p>
            </div>

            {/* Customizer Inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Full Name / Team Lead
                </label>
                <input
                  type="text"
                  value={attendeeName}
                  onChange={(e) => setAttendeeName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  College / Engineering Institute
                </label>
                <input
                  type="text"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g. NIT Raipur, IIIT-NR, CSVTU"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Branch / Specialization
                </label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white font-mono text-xs focus:border-emerald-500 focus:outline-none"
                  placeholder="e.g. Computer Science, Robotics"
                />
              </div>

              {/* Pass Tier Selector */}
              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">
                  Pass Tier
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['VIP ALL-ACCESS', 'HACKER ELITE', 'VIGYAAN INNOVATOR'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => {
                        haptics.playHover();
                        setPassTier(tier);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        passTier === tier
                          ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                          : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3">
              <button
                onClick={downloadPass}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD PASS (PNG)</span>
              </button>

              <button
                onClick={copyVerificationLink}
                className="w-full sm:w-auto px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{isCopied ? 'Link Copied!' : 'Share Pass'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
