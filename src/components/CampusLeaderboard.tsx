import React from 'react';
import { Trophy, MapPin, Sparkles } from 'lucide-react';

export const CampusLeaderboard: React.FC = () => {
  const colleges = [
    {
      rank: 1,
      name: 'National Institute of Technology (NIT), Raipur',
      shortName: 'NIT Raipur',
      city: 'Raipur, Chhattisgarh',
      eventsHosted: 8,
      activeBuilders: 840,
      cashWon: '₹8,50,000',
      activeClubs: ['Coding Club NITR', 'Innovation Cell', 'Turing Club', 'Robotics Society'],
      badge: 'Premier Central India Hub',
      badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-500/10'
    },
    {
      rank: 2,
      name: 'IIIT Naya Raipur (DSPM IIITNR)',
      shortName: 'IIIT Naya Raipur',
      city: 'Naya Raipur, Chhattisgarh',
      eventsHosted: 6,
      activeBuilders: 620,
      cashWon: '₹6,20,000',
      activeClubs: ['Robotics Society (RAS)', 'ACM Chapter', 'Cyber Security Club'],
      badge: 'Hardware & AI Pioneer',
      badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-500/10'
    },
    {
      rank: 3,
      name: 'Rungta Group of Institutions (RCET & RSR)',
      shortName: 'Rungta College',
      city: 'Bhilai-Raipur, Chhattisgarh',
      eventsHosted: 7,
      activeBuilders: 710,
      cashWon: '₹5,40,000',
      activeClubs: ['E-Cell Rungta', 'GDG on Campus', 'CS Department Hack Cell'],
      badge: 'High-Velocity Builder Network',
      badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10'
    },
    {
      rank: 4,
      name: 'Bhilai Institute of Technology (BIT), Durg',
      shortName: 'BIT Durg',
      city: 'Durg-Bhilai, Chhattisgarh',
      eventsHosted: 5,
      activeBuilders: 490,
      cashWon: '₹4,10,000',
      activeClubs: ['IEEE Student Branch', 'NullByte Security', 'Developer Student Club'],
      badge: 'Cybersecurity & Design Track',
      badgeColor: 'border-violet-500/30 text-violet-300 bg-violet-500/10'
    },
    {
      rank: 5,
      name: 'CSVTU University State Campus',
      shortName: 'CSVTU Bhilai',
      city: 'Bhilai, Chhattisgarh',
      eventsHosted: 4,
      activeBuilders: 520,
      cashWon: '₹3,80,000',
      activeClubs: ['State Innovation Cell', 'Robotics & Automation Society'],
      badge: 'State Patent Exposition Leader',
      badgeColor: 'border-blue-500/30 text-blue-300 bg-blue-500/10'
    }
  ];

  return (
    <div className="py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-amber-500/10 border border-amber-500/30 text-amber-300 mb-3">
          <Trophy className="w-3.5 h-3.5" />
          <span>CAMPUS BUILDER INDEX (2026 SEASON)</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white mb-3">
          Central India <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-emerald-400">Campus Leaderboard</span>
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Rankings based on verified hackathon participation, prize money won, and active student builders across Raipur & Bhilai campuses.
        </p>
      </div>

      {/* Leaderboard Table / Cards */}
      <div className="space-y-4">
        {colleges.map((col) => (
          <div
            key={col.rank}
            className="p-6 rounded-2xl bg-gradient-to-r from-[#0C1019] via-[#090D15] to-[#070A10] border border-white/[0.08] hover:border-emerald-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md"
          >
            {/* Rank & College Details */}
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-2xl font-mono font-extrabold text-lg border ${
                col.rank === 1 
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]'
                  : col.rank === 2
                  ? 'bg-slate-300/10 text-slate-200 border-slate-300/30'
                  : col.rank === 3
                  ? 'bg-amber-700/10 text-amber-600 border-amber-700/30'
                  : 'bg-white/[0.03] text-slate-400 border-white/10'
              }`}>
                #{col.rank}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-heading text-lg font-bold text-white">{col.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold border ${col.badgeColor}`}>
                    {col.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {col.city}
                </p>
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  {col.activeClubs.map((club) => (
                    <span key={club} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/[0.05]">
                      {club}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Telemetry */}
            <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-white/[0.08] pt-4 md:pt-0 md:pl-6 w-full md:w-auto text-left md:text-right">
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Fests Hosted</p>
                <p className="text-sm sm:text-base font-mono font-bold text-white">{col.eventsHosted} Active</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Builders</p>
                <p className="text-sm sm:text-base font-mono font-bold text-cyan-400">{col.activeBuilders}+</p>
              </div>
              <div>
                <p className="text-[10px] font-mono text-slate-500 uppercase">Bounties Won</p>
                <p className="text-sm sm:text-base font-mono font-bold text-emerald-400">{col.cashWon}</p>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Ambassador CTA Card */}
      <div className="mt-12 p-8 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-cyan-950/20 to-black border border-emerald-500/30 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />
        <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
        <h3 className="font-heading text-2xl font-bold text-white mb-2">
          Want your college club or fest featured at the top?
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto mb-5">
          Join the NexusCampus Ambassador Network. Onboard your college clubs (GDG, ACM, IEEE, CSI) and get priority verification & ticketing for your fests.
        </p>
        <button className="px-6 py-2.5 rounded-xl text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition-all font-heading shadow-[0_0_20px_-3px_rgba(16,185,129,0.4)] cursor-pointer">
          Apply as Campus Ambassador
        </button>
      </div>
    </div>
  );
};
