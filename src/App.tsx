import { useState, useMemo } from 'react';
import { SAMPLE_EVENTS, type CollegeEvent, COLLEGE_LIST, CATEGORY_LIST } from './data/events';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventCard } from './components/EventCard';
import { EventModal } from './components/EventModal';
import { HostEventModal } from './components/HostEventModal';
import { CommandPalette } from './components/CommandPalette';
import { CampusMarquee } from './components/CampusMarquee';
import { TransitGuideModal } from './components/TransitGuideModal';
import { TechnocracyRail } from './components/TechnocracyRail';
import { FloatingControls } from './components/FloatingControls';
import { TechnocracyStoryUniverse } from './components/TechnocracyStoryUniverse';
import { CyberCursor } from './components/CyberCursor';
import { HoloPassModal } from './components/HoloPassModal';
import { PinnedFlagshipShowcase } from './components/PinnedFlagshipShowcase';
import { CampusBentoTelemetry } from './components/CampusBentoTelemetry';
import { TeammateSection } from './components/TeammateSection';
import { useSmoothScroll } from './utils/useSmoothScroll';
import { Compass, ArrowUpRight, ShieldCheck, Sparkles, X } from 'lucide-react';
import { haptics } from './utils/audioHaptics';

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function App() {
  // Activate Lenis + GSAP Smooth Inertia Scrolling
  useSmoothScroll();

  const [events, setEvents] = useState<CollegeEvent[]>(SAMPLE_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CollegeEvent | null>(null);
  const [isRegionalOnly, setIsRegionalOnly] = useState<boolean>(true); // Central India Focus
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedCollege, setSelectedCollege] = useState<string>('All Colleges');
  const [isHostModalOpen, setIsHostModalOpen] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isTransitOpen, setIsTransitOpen] = useState<boolean>(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState<boolean>(false);
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  const [isTechnocracyTheme, setIsTechnocracyTheme] = useState<boolean>(true);

  // Filter events based on active controls
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      // Regional toggle
      if (isRegionalOnly && !ev.isRegional) return false;

      // Category filter
      if (selectedCategory !== 'All Categories' && ev.category !== selectedCategory) return false;

      // College filter
      if (selectedCollege !== 'All Colleges') {
        const match = ev.college.toLowerCase().includes(selectedCollege.toLowerCase()) ||
                      ev.shortCollege.toLowerCase().includes(selectedCollege.toLowerCase());
        if (!match) return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesTitle = ev.title.toLowerCase().includes(query);
        const matchesCollege = ev.college.toLowerCase().includes(query);
        const matchesTags = ev.tags.some((t) => t.toLowerCase().includes(query));
        const matchesTagline = ev.tagline.toLowerCase().includes(query);
        if (!matchesTitle && !matchesCollege && !matchesTags && !matchesTagline) return false;
      }

      return true;
    });
  }, [events, isRegionalOnly, selectedCategory, selectedCollege, searchQuery]);

  // Telemetry metrics
  const totalPrizePoolFormatted = useMemo(() => '₹2.25 Crores+', []);

  const handleAddEvent = (newEvent: CollegeEvent) => {
    setEvents([newEvent, ...events]);
  };

  return (
    <div className="min-h-screen bg-[#06080D] text-[#E2E8F0] flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      
      {/* Technocracy NIT Raipur Celestial Sky & Fest Atmosphere Layer */}
      {isTechnocracyTheme && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-15 filter brightness-90 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url('https://technocracy.nitrr.ac.in/static/media/event.91b5ee11360ca6c1e5c2.webp')` }}
        />
      )}

      {/* Top Navigation Bar */}
      <Navbar
        isRegionalOnly={isRegionalOnly}
        setIsRegionalOnly={setIsRegionalOnly}
        onOpenHostModal={() => setIsHostModalOpen(true)}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenTransit={() => setIsTransitOpen(true)}
        onOpenStory={() => setIsStoryModalOpen(true)}
        onOpenPass={() => setIsPassModalOpen(true)}
        isTechnocracyTheme={isTechnocracyTheme}
        onToggleTechnocracyTheme={() => setIsTechnocracyTheme(!isTechnocracyTheme)}
        eventCount={filteredEvents.length}
      />

      {/* Left Vertical Cyber Rail */}
      <TechnocracyRail 
        onActivateTechnocracyMode={() => setIsStoryModalOpen(true)} 
      />

      {/* Floating Bottom Navigation Controls */}
      <FloatingControls
        onToggleMode={() => setIsStoryModalOpen(true)}
      />

      {/* Main Continuous Platform Flow */}
      <main className="flex-1 relative z-10">
        
        {/* 1. Hero Section with Kinetic GSAP Reveal & 3D Three.js Globe */}
        <HeroSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCollege={selectedCollege}
          setSelectedCollege={setSelectedCollege}
          collegeList={COLLEGE_LIST}
          categoryList={CATEGORY_LIST}
          totalPrizePool={totalPrizePoolFormatted}
          totalEvents={filteredEvents.length}
        />

        {/* 2. Kinetic Campus Accreditation Ribbon */}
        <CampusMarquee onSelectCollege={(col) => setSelectedCollege(col)} />

        {/* 3. GSAP ScrollTrigger Pinned Flagship Horizontal Showcase */}
        <PinnedFlagshipShowcase
          flagshipEvents={events.filter((e) => e.isRegional || e.prizePool.includes('L') || e.prizePool.includes('Cr'))}
          onSelectEvent={(ev) => setSelectedEvent(ev)}
          onOpenPass={() => setIsPassModalOpen(true)}
        />

        {/* 4. Asymmetrical Agency-Tier Bento Telemetry */}
        <CampusBentoTelemetry
          onOpenPass={() => setIsPassModalOpen(true)}
          onOpenTransit={() => setIsTransitOpen(true)}
          onOpenHostModal={() => setIsHostModalOpen(true)}
          onFilterCategory={(cat) => setSelectedCategory(cat)}
          onFilterCollege={(col) => setSelectedCollege(col)}
        />

        {/* 5. Directory Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          
          {/* Dedicated Technocracy NIT Raipur Spotlight Banner */}
          {selectedCollege === 'NIT Raipur' && (
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-neutral-900/90 to-[#0A0D18] border border-emerald-500/40 backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-[0_0_50px_rgba(16,185,129,0.18)] text-left">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    TEAM TECHNOCRACY • NIT RAIPUR
                  </span>
                  <span className="text-xs font-mono text-neutral-400">Aavartan & Vigyaan Symposium</span>
                </div>
                <h2 className="font-heading text-xl sm:text-2xl font-black text-white tracking-tight">
                  Official Technical Arenas & Hackathon Circuits
                </h2>
                <p className="text-xs text-neutral-300 mt-1 max-w-xl leading-relaxed">
                  Direct access to the 19+ official arenas from <code className="text-emerald-400">technocracy.nitrr.ac.in</code>. All dates, CCC Lab & G-4 venues, rulebooks, and deadlines are synchronized with the student committee.
                </p>
              </div>

              <div className="relative z-10 flex flex-wrap items-center gap-2.5 shrink-0">
                <button 
                  onClick={() => setIsStoryModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-400 text-black hover:bg-emerald-300 transition-all font-heading shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>3D FEST CHRONICLES</span>
                </button>
                <a 
                  href="https://technocracy.nitrr.ac.in/events" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl text-xs font-mono bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors flex items-center gap-1.5"
                >
                  <span>technocracy.nitrr.ac.in</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              </div>
            </div>
          )}

          {/* Results Status Header */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Directory Results</span>
              <span className="px-2.5 py-0.5 rounded text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {filteredEvents.length} Verified Symposia
              </span>
              {isRegionalOnly && (
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-cyan-400">
                  • Filtered for Raipur & Central India Hub
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsHostModalOpen(true)}
                className="text-xs font-mono text-neutral-400 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Add Your College Fest</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Event Cards Grid with Radial Spotlight Masks */}
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onSelect={(ev) => setSelectedEvent(ev)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 max-w-lg mx-auto">
              <Compass className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
              <h3 className="font-heading text-lg font-bold text-white mb-1">No matching campus events found</h3>
              <p className="text-xs text-neutral-400 mb-4">
                Try clearing your search query, selecting "All Categories", or toggling All India events on.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All Categories');
                  setSelectedCollege('All Colleges');
                  setIsRegionalOnly(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-400 text-black hover:bg-emerald-300 transition-colors cursor-pointer font-heading"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* 6. Hackathon Teammate Matchmaker Section */}
          <div className="pt-8 border-t border-neutral-900">
            <TeammateSection />
          </div>

        </div>

      </main>

      {/* Clean Agency-Grade Minimalist Footer */}
      <footer className="border-t border-neutral-800 bg-[#04060A] py-10 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div>
              <span className="text-neutral-200 font-bold font-heading text-sm">NEXUSCAMPUS</span>
              <span className="text-neutral-500 block">Authorized College Events & Hackathon Platform • Central India Hub</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => setIsPassModalOpen(true)} className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400 font-bold">
              🎟️ 3D Holo Pass
            </button>
            <button onClick={() => setIsTransitOpen(true)} className="hover:text-emerald-400 transition-colors cursor-pointer">
              🧭 Transit Radar
            </button>
            <button onClick={() => setIsStoryModalOpen(true)} className="hover:text-cyan-400 transition-colors cursor-pointer">
              🎬 3D Fest Chronicles
            </button>
            <button onClick={() => setIsHostModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
              ➕ List Your Fest
            </button>
            <a
              href="https://github.com/mradityasonicse/NexusCampus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
          </div>

          <p className="text-neutral-600 text-center md:text-right">
            NIT Raipur • IIIT Naya Raipur • Rungta • BIT Durg • CSVTU
          </p>
        </div>
      </footer>

      {/* Immersive 3D Fest Chronicles Modal (Optional Overlay) */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col animate-in fade-in duration-300">
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={() => {
                haptics.playClick();
                setIsStoryModalOpen(false);
              }}
              className="p-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-white border border-neutral-700 shadow-xl transition-all cursor-pointer flex items-center gap-2 text-xs font-mono"
            >
              <X className="w-4 h-4" />
              <span>CLOSE 3D CHRONICLES</span>
            </button>
          </div>
          <div className="flex-1 w-full h-full">
            <TechnocracyStoryUniverse
              onSelectEvent={(ev) => {
                setIsStoryModalOpen(false);
                setSelectedEvent(ev);
              }}
              onSwitchToDirectory={() => setIsStoryModalOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Global Interactive Modals */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectEvent={(ev) => setSelectedEvent(ev)}
        onOpenHostModal={() => setIsHostModalOpen(true)}
        onOpenTransit={() => setIsTransitOpen(true)}
        onFilterCollege={(col) => setSelectedCollege(col)}
      />

      <TransitGuideModal
        isOpen={isTransitOpen}
        onClose={() => setIsTransitOpen(false)}
      />

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <HostEventModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
        onAddEvent={handleAddEvent}
      />

      {/* 3D Hologram Attendance Pass Modal */}
      <HoloPassModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
      />

      {/* Award-Winning Awwwards Cyber Cursor */}
      <CyberCursor />
    </div>
  );
}

export default App;
