import { useState, useMemo } from 'react';
import { SAMPLE_EVENTS, type CollegeEvent, COLLEGE_LIST, CATEGORY_LIST } from './data/events';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventCard } from './components/EventCard';
import { EventModal } from './components/EventModal';
import { TeammateSection } from './components/TeammateSection';
import { CampusLeaderboard } from './components/CampusLeaderboard';
import { HostEventModal } from './components/HostEventModal';
import { CyberCanvas } from './components/CyberCanvas';
import { Compass, ArrowUpRight } from 'lucide-react';

export function App() {
  const [events, setEvents] = useState<CollegeEvent[]>(SAMPLE_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<CollegeEvent | null>(null);
  const [activeTab, setActiveTab] = useState<'events' | 'hackers' | 'leaderboard'>('events');
  const [isRegionalOnly, setIsRegionalOnly] = useState<boolean>(true); // default to Raipur & Central India Focus
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [selectedCollege, setSelectedCollege] = useState<string>('All Colleges');
  const [isHostModalOpen, setIsHostModalOpen] = useState<boolean>(false);

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

  // Calculate telemetry
  const totalPrizePoolFormatted = useMemo(() => {
    return '₹24.5 Lakhs+';
  }, []);

  const handleAddEvent = (newEvent: CollegeEvent) => {
    setEvents([newEvent, ...events]);
  };

  return (
    <div className="min-h-screen bg-[#05070B] text-[#E2E8F0] flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300 relative overflow-x-hidden">
      {/* Interactive Vector Particle Grid */}
      <CyberCanvas />
      
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isRegionalOnly={isRegionalOnly}
        setIsRegionalOnly={setIsRegionalOnly}
        onOpenHostModal={() => setIsHostModalOpen(true)}
        eventCount={filteredEvents.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* TAB 1: Events & Fests Discovery */}
        {activeTab === 'events' && (
          <div>
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

            {/* Event Bento Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
              
              {/* Results Status Header */}
              <div className="flex items-center justify-between gap-4 mb-6 pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">Showing</span>
                  <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {filteredEvents.length} Verified Fests & Hackathons
                  </span>
                  {isRegionalOnly && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-cyan-400">
                      • Filtered for Raipur & Central India Campuses
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsHostModalOpen(true)}
                    className="text-xs font-mono text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Organizing a fest? Add your event</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Grid or Empty State */}
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
                <div className="text-center py-16 p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] max-w-lg mx-auto">
                  <Compass className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <h3 className="font-heading text-lg font-bold text-white mb-1">No matching campus events found</h3>
                  <p className="text-xs text-slate-400 mb-4">
                    Try adjusting your search query, selecting "All Categories", or toggling Pan-India events on.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All Categories');
                      setSelectedCollege('All Colleges');
                      setIsRegionalOnly(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-400 text-black hover:bg-emerald-300 transition-all font-heading cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* TAB 2: Teammate Matchmaker */}
        {activeTab === 'hackers' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TeammateSection />
          </div>
        )}

        {/* TAB 3: Campus Leaderboard */}
        {activeTab === 'leaderboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CampusLeaderboard />
          </div>
        )}

      </main>

      {/* Event Details Deep Dive Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      {/* Host Event / Organizer Modal */}
      <HostEventModal
        isOpen={isHostModalOpen}
        onClose={() => setIsHostModalOpen(false)}
        onAddEvent={handleAddEvent}
      />

      {/* Terminal Footer */}
      <footer className="border-t border-white/[0.08] bg-[#030508] py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 font-mono">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-semibold font-heading">NEXUSCAMPUS</span>
            <span>— The Unified Campus Events & Hackathon Operating System</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('events')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              Live Fests
            </button>
            <button onClick={() => setActiveTab('hackers')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              Hacker Match
            </button>
            <button onClick={() => setActiveTab('leaderboard')} className="hover:text-amber-400 transition-colors cursor-pointer">
              College Index
            </button>
            <button onClick={() => setIsHostModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">
              Club Portal
            </button>
          </div>

          <p className="text-slate-600">
            Crafted for NIT Raipur, IIIT-NR, Rungta, BIT Durg & Pan-India Builders.
          </p>
        </div>
      </footer>

    </div>
  );
}

export default App;
