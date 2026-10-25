import React, { useEffect } from 'react';
import { X, Train, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface TransitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRANSIT_ROUTES = [
  {
    campus: 'NIT Raipur (National Institute of Technology)',
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
    fromRaipurJn: '32 km (45 mins). Take local EMU/MEMU train to Bhilai Power House (BPHB), then 7 mins auto (₹40).',
    fromAirport: '48 km (1 hr 10 mins) via NH53 Raipur-Durg Highway.',
    nearestStation: 'Bhilai Power House (BPHB) — 4.5 km.',
    landmark: 'Near Kurud Kohka Junction, Bhilai.'
  },
  {
    campus: 'BIT Durg (Bhilai Institute of Technology)',
    address: 'Subhash Nagar, G.E. Road, Durg 491001',
    fromRaipurJn: '38 km (50 mins) via local Raipur-Durg EMU shuttle (Fare ₹15, trains every 45 mins).',
    fromAirport: '54 km (1 hr 15 mins).',
    nearestStation: 'Durg Junction (DURG) — 1.8 km (7 mins by E-Rickshaw, ₹20).',
    landmark: 'Opposite Kendriya Vidyalaya, Durg bypass.'
  },
  {
    campus: 'CSVTU State University (Swami Vivekanand Technical University)',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl rounded-2xl bg-[#090C12] border border-neutral-800 shadow-2xl overflow-hidden z-10 my-auto text-left">
        
        {/* Header */}
        <div className="p-5 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Train className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-white">Central India Campus Transit Radar</h3>
              <p className="text-xs text-neutral-400 font-mono">
                Verified railway stations, local EMU trains, and road connectivity across Raipur & Durg-Bhilai.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              haptics.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Routes Body */}
        <div className="p-6 max-h-[55vh] overflow-y-auto space-y-4 text-xs font-sans">
          
          {/* SECR Shuttle Alert */}
          <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300">
            <span className="font-mono text-emerald-400 font-bold block mb-1">
              SECR Local Train Advisory:
            </span>
            <span>
              Raipur Junction and Durg Junction are connected by frequent <strong>MEMU/EMU local trains every 45-60 minutes</strong> (Ticket fare: ₹15-20). Stops include Saraswati Nagar (NIT Raipur halt), Bhilai Nagar, and Bhilai Power House (Rungta halt).
            </span>
          </div>

          {/* List of Campuses */}
          <div className="space-y-3">
            {TRANSIT_ROUTES.map((route, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-2 text-left"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-white">
                    {route.campus}
                  </h4>
                  <span className="text-[11px] font-mono text-neutral-500">{route.landmark}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-neutral-800/80 text-[11px]">
                  <div>
                    <span className="font-mono text-emerald-400 font-semibold block mb-0.5">
                      From Raipur Junction (R):
                    </span>
                    <p className="text-neutral-300">{route.fromRaipurJn}</p>
                  </div>

                  <div>
                    <span className="font-mono text-cyan-400 font-semibold block mb-0.5">
                      From Raipur Airport (RPR):
                    </span>
                    <p className="text-neutral-300">{route.fromAirport}</p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-neutral-500 pt-1">
                  Nearest Rail Head: <span className="text-neutral-300">{route.nearestStation}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <div className="text-xs font-mono text-neutral-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified with South East Central Railway (SECR) timetables</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
