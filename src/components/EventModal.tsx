import React, { useState, useEffect } from 'react';
import type { CollegeEvent } from '../data/events';
import { 
  X, 
  MapPin, 
  Calendar, 
  Share2, 
  Phone, 
  Mail, 
  ExternalLink,
  ShieldCheck,
  Building,
  Check,
  Trophy
} from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface EventModalProps {
  event: CollegeEvent | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'prizes' | 'schedule'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (event) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [event, onClose]);

  if (!event) return null;

  const shareToWhatsApp = () => {
    haptics.playClick();
    const text = `Verified Campus Fest: ${event.title}\nCollege: ${event.college}\nPrize Pool: ${event.prizePool}\nDeadline: ${event.deadline}\nOfficial Website: ${event.officialWebsite}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const addToGoogleCalendar = () => {
    haptics.playClick();
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(`${event.tagline}\nVenue: ${event.venue}\nOfficial Portal: ${event.officialWebsite}\nOrganized by: ${event.organizerClub}`);
    const location = encodeURIComponent(event.venue);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`, '_blank');
  };

  const copyOfficialLink = () => {
    haptics.playClick();
    navigator.clipboard.writeText(event.officialWebsite);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#090C12] border border-neutral-800 shadow-2xl overflow-hidden z-10 my-auto text-left">
        
        {/* Header */}
        <div className="p-6 border-b border-neutral-800 bg-neutral-900/60 relative">
          <button 
            onClick={() => {
              haptics.playClick();
              onClose();
            }}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2 py-0.5 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {event.category}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700">
              {event.mode}
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40">
              {event.teamSize}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified by {event.officialVerificationDomain}
            </span>
          </div>

          <h2 className="font-heading text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            {event.title}
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-4">
            {event.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
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

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between px-6 border-b border-neutral-800 bg-[#06080D]">
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                haptics.playClick();
                setActiveTab('overview');
              }}
              className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Overview & Verification
            </button>
            <button
              onClick={() => {
                haptics.playClick();
                setActiveTab('prizes');
              }}
              className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'prizes'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Prize Breakdown
            </button>
            <button
              onClick={() => {
                haptics.playClick();
                setActiveTab('schedule');
              }}
              className={`py-3 px-3 text-xs font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'schedule'
                  ? 'border-emerald-400 text-emerald-400'
                  : 'border-transparent text-neutral-400 hover:text-white'
              }`}
            >
              Official Schedule
            </button>
          </div>

          <div className="flex items-center gap-2 py-2">
            <button
              onClick={shareToWhatsApp}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <Share2 className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={addToGoogleCalendar}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono text-neutral-300 hover:text-white bg-neutral-800 hover:bg-neutral-700 transition-colors cursor-pointer"
            >
              <Calendar className="w-3 h-3 text-cyan-400" />
              <span>Calendar</span>
            </button>
          </div>
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[45vh] overflow-y-auto space-y-5 text-xs">
          
          {activeTab === 'overview' && (
            <div className="space-y-4">
              {/* Authorized Verification Card */}
              <div className="p-3.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="text-white font-semibold">Institutional Authorization</div>
                  <p className="text-neutral-400 mt-0.5">
                    Hosted officially by <strong>{event.organizerClub}</strong> under <strong>{event.college}</strong>.
                  </p>
                  <p className="text-neutral-500 font-mono text-[11px] mt-1">
                    Verified Domain: <span className="text-emerald-400">{event.officialVerificationDomain}</span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">Description</h4>
                <p className="text-neutral-300 leading-relaxed">{event.description}</p>
              </div>

              <div>
                <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2">Key Highlights</h4>
                <div className="space-y-1.5">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 text-neutral-300">
                      <span className="text-emerald-400 font-mono">•</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exact Venue & Direct Helpline */}
              <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Campus Venue</span>
                  <p className="text-white">{event.venue}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block mb-1">Coordinator Contacts</span>
                  <div className="space-y-1 font-mono">
                    <a href={`tel:${event.contactPhone}`} className="flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400">
                      <Phone className="w-3 h-3 text-emerald-400" /> {event.contactPhone}
                    </a>
                    <a href={`mailto:${event.contactEmail}`} className="flex items-center gap-1.5 text-neutral-300 hover:text-cyan-400">
                      <Mail className="w-3 h-3 text-cyan-400" /> {event.contactEmail}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'prizes' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between">
                <span className="font-mono text-neutral-300">Total Verified Prize Pool:</span>
                <span className="font-heading font-extrabold text-base text-emerald-400">{event.prizePool}</span>
              </div>

              <div className="space-y-2">
                {event.prizes.map((p, i) => (
                  <div key={i} className="p-3 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-white">{p.rank}</div>
                      <div className="text-[11px] text-neutral-400">{p.perks}</div>
                    </div>
                    <div className="font-mono font-bold text-emerald-400 shrink-0 text-sm">
                      {p.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-3">
              <h4 className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">Official Fest Timeline</h4>
              <div className="border-l border-neutral-800 ml-2 pl-4 space-y-4">
                {event.schedule.map((s, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-emerald-400" />
                    <p className="text-xs font-mono font-bold text-emerald-400">{s.time}</p>
                    <p className="text-xs text-neutral-300 mt-0.5">{s.activity}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions: 100% Real Links */}
        <div className="p-4 bg-neutral-900/90 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs font-mono text-neutral-400">
            Registration Deadline: <strong className="text-white">{event.deadline}</strong>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={copyOfficialLink}
              className="px-3 py-2 rounded-xl text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors cursor-pointer"
            >
              {copiedLink ? 'Portal Link Copied!' : 'Copy Portal URL'}
            </button>

            <a
              href={event.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 transition-colors font-heading"
            >
              <span>Visit Official Fest Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
