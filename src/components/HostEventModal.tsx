import React, { useState } from 'react';
import type { CollegeEvent } from '../data/events';
import { X, Sparkles, PlusCircle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HostEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: CollegeEvent) => void;
}

export const HostEventModal: React.FC<HostEventModalProps> = ({ isOpen, onClose, onAddEvent }) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [college, setCollege] = useState('NIT Raipur');
  const [city] = useState('Raipur, CG');
  const [category, setCategory] = useState<'Hackathon' | 'Technical' | 'Cultural' | 'Robotics' | 'Workshop' | 'E-Cell' | 'Esports'>('Hackathon');
  const [mode, setMode] = useState<'On-Campus' | 'Online' | 'Hybrid'>('On-Campus');
  const [prizePool, setPrizePool] = useState('₹50,000');
  const [entryFee, setEntryFee] = useState('Free');
  const [startDate] = useState('Dec 05, 2026');
  const [endDate] = useState('Dec 06, 2026');
  const [deadline] = useState('Dec 01, 2026');
  const [organizerClub, setOrganizerClub] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail] = useState('');
  const [tags, setTags] = useState('Hackathon, AI, Innovation');
  const [description] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !organizerClub) return;

    const newEvent: CollegeEvent = {
      id: `event-${Date.now()}`,
      title,
      tagline,
      category,
      college,
      shortCollege: college.split('(')[0].trim(),
      city,
      isRegional: true,
      venue: `${college} Main Auditorium`,
      mode,
      startDate,
      endDate,
      deadline,
      prizePool,
      entryFee,
      registeredCount: 1,
      teamSize: '2 - 4 Members',
      tags: tags.split(',').map((t) => t.trim()),
      organizerClub,
      bannerGradient: 'from-emerald-950/80 via-slate-900 to-black',
      accentColor: '#10B981',
      highlights: ['Free Certificate of Participation', 'Direct Networking with Industry Mentors', 'Cash Prize Distribution on Stage'],
      description: description || tagline,
      schedule: [
        { time: '10:00 AM', activity: 'Inauguration & Problem Statement Release' },
        { time: '04:00 PM', activity: 'Final Submissions & Jury Pitching' }
      ],
      prizes: [
        { rank: '1st Prize Winner', amount: prizePool, perks: 'Winner Trophy & Official Certificate' }
      ],
      contactEmail: contactEmail || 'club@campus.edu',
      contactPhone: contactPhone || '+91 99999 99999'
    };

    onAddEvent(newEvent);
    setSubmitted(true);
    confetti({ particleCount: 100, spread: 70 });
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl rounded-3xl bg-[#090D15] border border-white/10 p-6 sm:p-8 z-10 text-left my-auto shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-black/40 hover:bg-black/80 text-slate-400 hover:text-white border border-white/10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="font-heading text-2xl font-bold text-white">Event Published to NexusCampus!</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Your college event is now live on the Central India campus radar feed. Students can now discover and RSVP.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ORGANIZER OS: ZERO GOOGLE FORMS</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Publish College Fest or Hackathon
              </h3>
              <p className="text-xs text-slate-400">
                Put your campus event on the map. Reach students across NIT Raipur, IIIT-NR, Rungta, and BIT Durg.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. CodeSprint 2026 — 24 Hour Algorithmic Hack"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Tagline / Catchphrase</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Solve real-world AI challenges with your campus team"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">College / Institute *</label>
                  <select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0E17] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="NIT Raipur">National Institute of Technology (NIT), Raipur</option>
                    <option value="IIIT Naya Raipur">IIIT Naya Raipur (DSPM IIITNR)</option>
                    <option value="Rungta College">Rungta Group of Institutions (RCET & RSR Bhilai)</option>
                    <option value="BIT Durg">Bhilai Institute of Technology (BIT), Durg</option>
                    <option value="CSVTU University">CSVTU University Campus</option>
                    <option value="IIT Bombay">IIT Bombay</option>
                    <option value="Other College">Other College</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0E17] border border-white/10 text-xs text-white focus:outline-none focus:border-emerald-500/50"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Technical">Technical</option>
                    <option value="Robotics">Robotics</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Esports">Esports</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Total Prize Pool</label>
                  <input
                    type="text"
                    value={prizePool}
                    onChange={(e) => setPrizePool(e.target.value)}
                    placeholder="e.g. ₹50,000"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Registration Fee</label>
                  <input
                    type="text"
                    value={entryFee}
                    onChange={(e) => setEntryFee(e.target.value)}
                    placeholder="Free or ₹100"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Mode</label>
                  <select
                    value={mode}
                    onChange={(e: any) => setMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0A0E17] border border-white/10 text-xs text-white"
                  >
                    <option value="On-Campus">On-Campus</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Organizer Club / Society *</label>
                  <input
                    type="text"
                    required
                    value={organizerClub}
                    onChange={(e) => setOrganizerClub(e.target.value)}
                    placeholder="e.g. GDG on Campus, ACM Chapter, E-Cell"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Coordinator WhatsApp / Phone *</label>
                  <input
                    type="tel"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98271 XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Tags (Comma separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="AI, Web3, Python, Robotics, Design"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 cursor-pointer shadow-[0_0_20px_-3px_rgba(16,185,129,0.5)] active:scale-95 font-heading"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Publish Event to Live Feed</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
