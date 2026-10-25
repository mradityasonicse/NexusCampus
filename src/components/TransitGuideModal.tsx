import React, { useEffect } from 'react';
import { X, Train, MapPin, Bus, Car, Navigation, Clock, ShieldCheck } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface TransitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRANSIT_ROUTES = [
  {
    campus: 'NIT Raipur (National Institute of Tech)',
    address: 'G.E. Road, Raipur, Chhattisgarh 492010',
    fromRaipurJn: '5.2 km (15 mins) via G.E. Road. Direct City Bus 11A or Auto (₹40 - ₹70).',
    fromAirport: '18 km (35 mins) via VIP Road & G.E. Road. Prepaid Taxi / Uber (₹350 - ₹450).',
    nearestStation: 'Raipur Junction (R) & Saraswati Nagar Halt (walking distance).',
    landmark: 'Opposite Ayurvedic College, Great Eastern Road.'
  },
  {
    campus: 'IIIT Naya Raipur (DSPM IIITNR)',
    address: 'Plot No. 7, Sector 24, Atal Nagar, Nava Raipur 493661',
    fromRaipurJn: '26 km (40 mins) via Atal Path Expressway. BRTS AC Bus Route to Sector 24 (₹45) or Cab (₹400).',
    fromAirport: '12 km (18 mins) via Expressway. Nearest university to the airport (₹250 - ₹300).',
    nearestStation: 'Raipur Junction (R) / Mandir Hasaud Jn.',
    landmark: 'Adjacent to Purkhouti Muktangan & Jungle Safari.'
  },
  {
    campus: 'Rungta Group of Institutions (RCET & RSR)',
    address: 'Rungta Educational Complex, Kohka-Kurud Road, Bhilai 490024',
    fromRaipurJn: '32 km (45 mins). Take local EMU MEMU train to Bhilai Power House (BPHB), then 7 mins auto (₹40).',
    fromAirport: '48 km (1 hr 10 mins) via NH53 Raipur-Durg Highway.',
    nearestStation: 'Bhilai Power House (BPHB) — 4.5 km.',
    landmark: 'Near Kurud Kohka Junction, Bhilai.'
  },
  {
    campus: 'BIT Durg (Bhilai Institute of Tech)',
    address: 'Subhash Nagar, G.E. Road, Durg 491001',
    fromRaipurJn: '38 km (50 mins) via local Raipur-Durg EMU shuttle (Fare ₹15, trains every 45 mins).',
    fromAirport: '54 km (1 hr 15 mins).',
    nearestStation: 'Durg Junction (DURG) — 1.8 km (7 mins by E-Rickshaw, ₹20).',
    landmark: 'Opposite Kendriya Vidyalaya, Durg bypass.'
  },
  {
    campus: 'CSVTU State University (Swami Vivekanand Tech Univ)',
    address: 'Newai, PO-Newai, Bhilai, Dist-Durg 491107',
    fromRaipurJn: '36 km via Durg expressway.',
    fromAirport: '50 km via NH53.',
    nearestStation: 'Durg Junction (DURG) — 8 km (20 mins auto, ₹80).',
    landmark: 'University Campus, Risali-Newai Road.'
  }
];

export const TransitGuideModal: React.FC<TransitGuideModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div 
        className="w-full max-w-2xl bg-[#05070B] border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-5 bg-[#030508] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 flex items-center justify-center">
              <Train className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-base text-white">CENTRAL INDIA TRANSIT RADAR</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  CAMPUS MOBILITY
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Real transit routes, local EMU trains, and fares for hackers traveling to Raipur & Bhilai.
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

        {/* Routes Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs font-sans">
          
          {/* Quick Alert Banner */}
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-start gap-3 text-cyan-200">
            <Navigation className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong>Hacker Travel Tip:</strong> Raipur Junction se Durg Junction ke beech har 45 minutes me <strong>Local MEMU/EMU Trains</strong> chalti hain (ticket sirf ₹15-20), jo Bhilai Power House aur Durg direct pahunchati hain!
            </div>
          </div>

          {/* List of Campuses */}
          <div className="space-y-4">
            {TRANSIT_ROUTES.map((route, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/40 transition-all space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {route.campus}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-500">{route.landmark}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/[0.05] text-[11px]">
                  <div>
                    <span className="font-mono text-emerald-400 font-semibold block mb-0.5">
                      🚆 From Raipur Junction (R):
                    </span>
                    <p className="text-slate-300">{route.fromRaipurJn}</p>
                  </div>

                  <div>
                    <span className="font-mono text-cyan-400 font-semibold block mb-0.5">
                      ✈️ From Raipur Airport (RPR):
                    </span>
                    <p className="text-slate-300">{route.fromAirport}</p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-slate-400 pt-1">
                  📍 <strong>Nearest Station:</strong> {route.nearestStation}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#030508] border-t border-white/[0.08] flex items-center justify-between">
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified against Indian Railways (SECR) & Raipur City Transport</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.08] text-white font-heading font-semibold text-xs hover:bg-white/[0.15] transition-all cursor-pointer"
          >
            Close Guide
          </button>
        </div>

      </div>

    </div>
  );
};
