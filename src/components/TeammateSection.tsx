import React, { useState } from 'react';
import { SAMPLE_HACKERS, type SoloHacker } from '../data/hackers';
import { 
  Search, 
  Trophy, 
  Sparkles, 
  MessageSquare, 
  UserPlus, 
  Check, 
  MapPin 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const TeammateSection: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<string>('All Roles');
  const [skillSearch, setSkillSearch] = useState<string>('');
  const [invitedList, setInvitedList] = useState<string[]>([]);
  const [showPostModal, setShowPostModal] = useState<boolean>(false);

  // New Profile Form State
  const [newHackerName, setNewHackerName] = useState('');
  const [newCollege, setNewCollege] = useState('NIT Raipur');
  const [newRole, setNewRole] = useState<'Frontend Dev' | 'Backend Dev' | 'AI / ML Engineer' | 'UI/UX Designer' | 'Full-Stack' | 'Blockchain / Web3'>('Frontend Dev');
  const [newSkills, setNewSkills] = useState('');
  const [newBio, setNewBio] = useState('');
  const [newLookingFor, setNewLookingFor] = useState('');
  const [allHackers, setAllHackers] = useState<SoloHacker[]>(SAMPLE_HACKERS);

  const roles = [
    'All Roles',
    'AI / ML Engineer',
    'UI/UX Designer',
    'Full-Stack',
    'Frontend Dev',
    'Blockchain / Web3'
  ];

  const handleInvite = (id: string) => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#10B981', '#06B6D4', '#F59E0B']
    });
    setInvitedList((prev) => [...prev, id]);
  };

  const handlePostProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHackerName || !newSkills) return;

    const newProfile: SoloHacker = {
      id: `hacker-${Date.now()}`,
      name: newHackerName,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      college: newCollege,
      branchYear: 'B.Tech — 3rd Year',
      primaryRole: newRole,
      skills: newSkills.split(',').map((s) => s.trim()),
      bio: newBio || 'Passionate developer building high-impact hackathon projects.',
      lookingFor: newLookingFor || 'Looking for dedicated teammates for upcoming college hackathons.',
      targetEvent: 'HackNITR 6.0 / Aarohan IIITNR',
      availability: 'Immediate (Looking for Team)',
      rating: 5.0,
      pastHackathonsWon: 1
    };

    setAllHackers([newProfile, ...allHackers]);
    setShowPostModal(false);
    confetti({ particleCount: 80, spread: 70 });
  };

  const filteredHackers = allHackers.filter((hacker) => {
    const matchesRole = roleFilter === 'All Roles' || hacker.primaryRole === roleFilter;
    const matchesSkill = skillSearch === '' || 
      hacker.skills.some((s) => s.toLowerCase().includes(skillSearch.toLowerCase())) ||
      hacker.name.toLowerCase().includes(skillSearch.toLowerCase()) ||
      hacker.college.toLowerCase().includes(skillSearch.toLowerCase());
    return matchesRole && matchesSkill;
  });

  return (
    <div className="py-8">
      {/* Header Info */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 mb-4">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>HACKATHON TEAMMATE MATCHMAKER</span>
        </div>
        <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white mb-3">
          Find Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Hackathon Squad</span>.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
          Don't hack solo. Connect with verified frontend, backend, AI/ML, and UI/UX builders across Raipur & Central India colleges.
        </p>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowPostModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-[0_0_20px_-3px_rgba(16,185,129,0.4)] transition-all cursor-pointer font-heading"
          >
            <UserPlus className="w-4 h-4" />
            <span>Post Teammate Request (Free)</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="max-w-4xl mx-auto space-y-4 mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Skill Search */}
          <div className="relative w-full sm:w-1/2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={skillSearch}
              onChange={(e) => setSkillSearch(e.target.value)}
              placeholder="Filter by skill (e.g. PyTorch, React, Figma, Web3)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
            />
          </div>

          {/* Role Filter Pills */}
          <div className="w-full sm:w-1/2 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setRoleFilter(role)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  roleFilter === role
                    ? 'bg-cyan-500 text-black font-semibold shadow-[0_0_15px_-3px_rgba(6,182,212,0.4)]'
                    : 'bg-white/[0.03] text-slate-400 hover:text-white border border-white/[0.07]'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hackers Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredHackers.map((hacker) => {
          const isInvited = invitedList.includes(hacker.id);
          return (
            <div
              key={hacker.id}
              className="relative p-5 rounded-2xl bg-gradient-to-b from-[#0E131F]/90 via-[#0B0F17]/95 to-[#080B11] border border-white/[0.08] hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header Profile Info */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={hacker.avatar}
                      alt={hacker.name}
                      className="w-12 h-12 rounded-xl object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="font-heading text-base font-bold text-white flex items-center gap-1.5">
                        {hacker.name}
                        <span className="text-[10px] font-mono text-emerald-400">★ {hacker.rating}</span>
                      </h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {hacker.college}
                      </p>
                      <p className="text-[10px] font-mono text-slate-500">{hacker.branchYear}</p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {hacker.primaryRole}
                  </span>
                </div>

                {/* Bio & Looking For */}
                <p className="text-xs text-slate-300 mb-3 leading-relaxed line-clamp-2">
                  {hacker.bio}
                </p>

                <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] mb-4">
                  <p className="text-[10px] font-mono text-slate-500 uppercase mb-1">Looking For:</p>
                  <p className="text-xs text-emerald-300 line-clamp-2">{hacker.lookingFor}</p>
                </div>

                {/* Skills Tag Cloud */}
                <div className="flex flex-wrap items-center gap-1.5 mb-5">
                  {hacker.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-amber-400 flex items-center gap-1">
                  <Trophy className="w-3 h-3" />
                  {hacker.pastHackathonsWon} Wins
                </span>

                <button
                  onClick={() => handleInvite(hacker.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isInvited
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-white/10 hover:bg-emerald-500 hover:text-black text-white'
                  }`}
                >
                  {isInvited ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Invite Sent!</span>
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Connect</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Teammate Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPostModal(false)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-[#090D15] border border-white/10 p-6 z-10 text-left">
            <h3 className="font-heading text-xl font-bold text-white mb-2">Post Your Hacker Profile</h3>
            <p className="text-xs text-slate-400 mb-4">Let campus teams and hackathon squads invite you directly.</p>

            <form onSubmit={handlePostProfile} className="space-y-3">
              <div>
                <label className="text-xs font-mono text-slate-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={newHackerName}
                  onChange={(e) => setNewHackerName(e.target.value)}
                  placeholder="e.g. Rahul Sahu"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400">College</label>
                  <select
                    value={newCollege}
                    onChange={(e) => setNewCollege(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0E17] border border-white/10 text-xs text-white"
                  >
                    <option value="NIT Raipur">NIT Raipur</option>
                    <option value="IIIT Naya Raipur">IIIT Naya Raipur</option>
                    <option value="Rungta College">Rungta College</option>
                    <option value="BIT Durg">BIT Durg</option>
                    <option value="CSVTU University">CSVTU University</option>
                    <option value="Other College">Other College</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400">Primary Superpower</label>
                  <select
                    value={newRole}
                    onChange={(e: any) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0E17] border border-white/10 text-xs text-white"
                  >
                    {roles.slice(1).map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Skills (Comma separated)</label>
                <input
                  type="text"
                  required
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  placeholder="e.g. React, Python, Tailwind, PyTorch"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Short Bio / What you built</label>
                <textarea
                  rows={2}
                  value={newBio}
                  onChange={(e) => setNewBio(e.target.value)}
                  placeholder="Briefly describe your experience..."
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Who are you looking for?</label>
                <input
                  type="text"
                  value={newLookingFor}
                  onChange={(e) => setNewLookingFor(e.target.value)}
                  placeholder="e.g. Need a UI designer and backend developer"
                  className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 cursor-pointer font-heading"
                >
                  Publish Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
