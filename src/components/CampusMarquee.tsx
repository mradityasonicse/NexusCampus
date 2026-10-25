import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';

interface AccreditedCampus {
  name: string;
  tagline: string;
  accreditation: string;
  domain: string;
  flagshipFest: string;
  badgeColor: string;
}

const ACCREDITED_CAMPUSES: AccreditedCampus[] = [
  {
    name: 'NIT Raipur',
    tagline: 'Institute of National Importance',
    accreditation: 'MoE Govt of India',
    domain: 'nitrr.ac.in',
    flagshipFest: 'Aavartan 2026',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
  },
  {
    name: 'IIIT Naya Raipur',
    tagline: 'State Govt of CG & NTPC Joint Venture',
    accreditation: 'Statutory IIIT',
    domain: 'iiitnr.ac.in',
    flagshipFest: 'Technovate 2026',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
  },
  {
    name: 'IIT Bombay',
    tagline: 'Asia’s Premier Technology Institution',
    accreditation: 'IoE National Star',
    domain: 'techfest.org',
    flagshipFest: 'Techfest 2026',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10'
  },
  {
    name: 'Rungta Group (RCET & RSR)',
    tagline: 'SIH Pan-India Nodal Center',
    accreditation: 'NAAC A+ & NBA Accredited',
    domain: 'rungta.ac.in',
    flagshipFest: 'VYOM 2026',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10'
  },
  {
    name: 'BIT Durg',
    tagline: 'First Autonomous Engineering College in CG',
    accreditation: 'NAAC Grade A',
    domain: 'bitdurg.ac.in',
    flagshipFest: 'OJAS 2026',
    badgeColor: 'border-violet-500/30 text-violet-400 bg-violet-500/10'
  },
  {
    name: 'CSVTU Bhilai',
    tagline: 'State Technical Affiliating University',
    accreditation: 'State University Act',
    domain: 'csvtu.ac.in',
    flagshipFest: 'UTKARSH Expo',
    badgeColor: 'border-blue-500/30 text-blue-400 bg-blue-500/10'
  },
  {
    name: 'Smart India Hackathon',
    tagline: 'World’s Largest Open Innovation Model',
    accreditation: 'Ministry of Education & AICTE',
    domain: 'sih.gov.in',
    flagshipFest: 'SIH 2026',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10'
  },
  {
    name: 'IIT Kharagpur',
    tagline: 'First IIT of India • Kalidas Auditorium',
    accreditation: 'UNESCO Patronage',
    domain: 'ktj.in',
    flagshipFest: 'Kshitij 2026',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10'
  }
];

export const CampusMarquee: React.FC<{ onSelectCollege?: (name: string) => void }> = ({ onSelectCollege }) => {
  // We duplicate the list to make the CSS infinite horizontal scroll perfectly seamless
  const duplicatedList = [...ACCREDITED_CAMPUSES, ...ACCREDITED_CAMPUSES];

  return (
    <div className="relative w-full py-4 bg-[#05070B] border-y border-neutral-900/90 overflow-hidden select-none">
      {/* Edge gradient fades for seamless ribbon transition */}
      <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-[#05070B] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-[#05070B] to-transparent z-10 pointer-events-none" />

      {/* Kinetic marquee track */}
      <div className="flex w-max items-center gap-4 animate-marquee">
        {duplicatedList.map((campus, idx) => (
          <div
            key={`${campus.name}-${idx}`}
            onClick={() => onSelectCollege && onSelectCollege(campus.name)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-800/60 hover:border-neutral-700 transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center font-heading font-black text-xs text-white group-hover:text-emerald-400 border border-neutral-700/80 transition-colors">
              {campus.name.slice(0, 2).toUpperCase()}
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-xs sm:text-sm text-neutral-200 group-hover:text-white transition-colors">
                  {campus.name}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${campus.badgeColor}`}>
                  {campus.accreditation}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                <span>{campus.tagline}</span>
                <span className="text-neutral-600">•</span>
                <span className="text-emerald-400/90 group-hover:underline flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  {campus.domain}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
