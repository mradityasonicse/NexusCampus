import React, { useState } from 'react';
import type { CollegeEvent } from '../data/events';
import { 
  X, 
  MapPin, 
  Calendar, 
  Share2, 
  Sparkles, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EventModalProps {
  event: CollegeEvent | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'prizes' | 'schedule'>('overview');
  const [registered, setRegistered] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  if (!event) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    
    // Trigger festive particle celebration
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#06B6D4', '#F59E0B', '#FFFFFF']
    });

    setRegistered(true);
  };

  const shareToWhatsApp = () => {
    const text = `Check out ${event.title} at ${event.college}!\nPrize Pool: ${event.prizePool}\nDeadline: ${event.deadline}\nRegister on NexusCampus: ${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const addToGoogleCalendar = () => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.tagline}\nVenue: ${event.venue}\nOrganized by: ${event.organizerClub}`);
    const location = encodeURIComponent(event.venue);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-[#090D15] border border-white/10 shadow-[0_0_50px_-10px_rgba(0,0,0,0.9)] overflow-hidden z-10 my-auto text-left">
        
        {/* Top Header Banner Strip */}
        <div className={`p-6 sm:p-8 bg-gradient-to-r ${event.bannerGradient} border-b border-white/10 relative`}>
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-black/40 hover:bg-black/80 text-slate-400 hover:text-white border border-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {event.category}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/10 text-slate-300">
              {event.mode}
            </span>
            <span className="px-2.5 py-1 rounded-md text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/30">
              {event.teamSize}
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mb-2">
            {event.title}
          </h2>
          <p className="text-slate-300 text-sm font-normal max-w-xl">
            {event.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-5 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {event.college} ({event.city})
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              {event.startDate} – {event.endDate}
            </span>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center justify-between px-6 border-b border-white/[0.08] bg-[#070A10]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-3 text-xs font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Overview & Highlights
            </button>
            <button
              onClick={() => setActiveTab('prizes')}
              className={`py-3 px-3 text-xs font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
                activeTab === 'prizes'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Prize Pool ({event.prizePool})
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`py-3 px-3 text-xs font-semibold tracking-wide border-b-2 transition-all cursor-pointer ${
                activeTab === 'schedule'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Timeline
            </button>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center gap-2 py-2">
            <button
              onClick={shareToWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 transition-all cursor-pointer"
              title="Share to WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <button
              onClick={addToGoogleCalendar}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 transition-all cursor-pointer"
              title="Add to Google Calendar"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Calendar</span>
            </button>
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 sm:p-8 max-h-[50vh] overflow-y-auto space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">About The Event</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{event.description}</p>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">Key Highlights & Perks</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-300">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Venue & Organizer Details */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] font-mono text-slate-500 uppercase mb-1">Exact Campus Venue</p>
                  <p className="text-xs font-medium text-white">{event.venue}</p>
                  <p className="text-xs text-slate-400 mt-1">Organized by: <strong className="text-emerald-400">{event.organizerClub}</strong></p>
                </div>
                <div>
                  <p className="text-[11px] font-mono text-slate-500 uppercase mb-1">Organizer Contact Line</p>
                  <div className="flex flex-col gap-1 text-xs font-mono text-slate-300">
                    <a href={`tel:${event.contactPhone}`} className="flex items-center gap-1.5 hover:text-emerald-400">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" /> {event.contactPhone}
                    </a>
                    <a href={`mailto:${event.contactEmail}`} className="flex items-center gap-1.5 hover:text-cyan-400">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" /> {event.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prizes' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Prize Pool & Bounties Breakdown</h4>
              <div className="space-y-3">
                {event.prizes.map((p, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold text-xs">
                        #{i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{p.rank}</p>
                        <p className="text-xs text-slate-400">{p.perks}</p>
                      </div>
                    </div>
                    <div className="font-mono text-base font-bold text-emerald-400 shrink-0">
                      {p.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">Official Fest Timeline</h4>
              <div className="relative border-l border-white/10 ml-3 pl-5 space-y-5">
                {event.schedule.map((s, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[27px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-black" />
                    <p className="text-xs font-mono font-bold text-emerald-400">{s.time}</p>
                    <p className="text-sm text-slate-300 mt-0.5">{s.activity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Registration Form / Confirmation */}
        <div className="p-6 bg-[#070A10] border-t border-white/10">
          {registered ? (
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-white">Registration Confirmed for {event.title}!</p>
                  <p className="text-xs text-slate-400">Your pass details have been sent to {phone}. Show this at the registration desk.</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegister} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full sm:w-1/3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="WhatsApp Number"
                className="w-full sm:w-1/3 px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50"
              />
              <button
                type="submit"
                className="w-full sm:w-1/3 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-[0_0_20px_-3px_rgba(16,185,129,0.5)] active:scale-95 cursor-pointer font-heading"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Instant 1-Click RSVP</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
