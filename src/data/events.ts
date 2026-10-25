export interface VideoTeaser {
  title: string;
  embedUrl: string;
  previewUrl: string;
  duration: string;
  organizer: string;
  views: string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  tagline: string;
  category: 'Hackathon' | 'Technical' | 'Cultural' | 'Robotics' | 'Workshop' | 'E-Cell' | 'Esports';
  college: string;
  shortCollege: string;
  city: string;
  isRegional: boolean;
  venue: string;
  mode: 'On-Campus' | 'Online' | 'Hybrid';
  startDate: string;
  endDate: string;
  deadline: string;
  prizePool: string;
  entryFee: string;
  registeredCount: number;
  maxSlots?: number;
  teamSize: string;
  tags: string[];
  organizerClub: string;
  officialWebsite: string;
  officialVerificationDomain: string;
  verificationHash: string; // SHA-256 campus authorization stamp
  time?: string;
  venueCode?: string;
  bannerArtTitle?: string;
  registrationLink?: string;
  bannerGradient: string;
  accentColor: string;
  coverImage: string;
  galleryImages: string[];
  videoTeaser?: VideoTeaser;
  isFeatured?: boolean;
  isHot?: boolean;
  highlights: string[];
  description: string;
  schedule: { time: string; activity: string }[];
  prizes: { rank: string; amount: string; perks: string }[];
  contactEmail: string;
  contactPhone: string;
}

export const SAMPLE_EVENTS: CollegeEvent[] = [
  {
    id: 'aavartan-nit-raipur-2026',
    title: 'Aavartan 2026 & Vigyaan — Central India’s Largest Techno-Management Fest',
    tagline: 'Flagship Annual Symposium by Team Technocracy (NIT Raipur) with 30+ Tech Arenas',
    category: 'Hackathon',
    college: 'National Institute of Technology (NIT), Raipur',
    shortCollege: 'NIT Raipur',
    city: 'Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Main Auditorium, CSE/IT Blocks & Central Lawn, NIT Raipur, G.E. Road',
    mode: 'On-Campus',
    startDate: 'Nov 14, 2026',
    endDate: 'Nov 16, 2026',
    deadline: 'Nov 10, 2026',
    prizePool: '₹3,50,000',
    entryFee: 'Free (Selected Tracks)',
    registeredCount: 1420,
    maxSlots: 1800,
    teamSize: '2 - 4 Members',
    tags: ['Aavartan', 'Vigyaan Expo', 'Ignite Lecture Series', 'AI/ML Track', 'DSA Marathon', 'Web3'],
    organizerClub: 'Team Technocracy (Technical Committee of NIT Raipur, Est. 2007)',
    officialWebsite: 'https://technocracy.nitrr.ac.in/',
    officialVerificationDomain: 'nitrr.ac.in',
    verificationHash: 'SHA256: 7f8a91c492e...technocracy.nitrr.ac.in [GOVT AUTHORIZED]',
    bannerGradient: 'from-emerald-950/80 via-slate-900 to-black',
    accentColor: '#10B981',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Aavartan 2026 Official Aftermovie & Vigyaan Glimpses',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      duration: '03:42',
      organizer: 'Team Technocracy (NIT Raipur)',
      views: '24,500+ views'
    },
    isFeatured: true,
    isHot: true,
    highlights: [
      'Official Vigyaan Science & Innovation Exhibition across 12 engineering branches',
      'Ignite Guest Lecture Series featuring ISRO scientists & Silicon Valley tech leaders',
      'Free boarding & lodging in NIT Raipur student hostels for outstation qualified teams',
      'Direct internship shortlisting with visiting technology sponsors'
    ],
    description: 'Aavartan originated in 2007 as "Vigyaan" and has since evolved into the largest annual techno-management festival of Central India, orchestrated officially by Team Technocracy at NIT Raipur. It attracts over 10,000+ student footfalls across nationwide engineering colleges.',
    schedule: [
      { time: 'Day 1 - 09:30 AM', activity: 'Inauguration at Main Auditorium by Director, NIT Raipur' },
      { time: 'Day 1 - 11:30 AM', activity: 'Vigyaan Exhibition Booth Setup & Jury Round 1' },
      { time: 'Day 1 - 01:30 PM', activity: '36-Hour Hackathon Problem Statements Release' },
      { time: 'Day 2 - 04:00 PM', activity: 'Ignite Keynote Address & Final Project Demonstrations' },
      { time: 'Day 3 - 05:30 PM', activity: 'Valedictory Ceremony, Cash Awards & Certificate Distribution' }
    ],
    prizes: [
      { rank: 'Hackathon Grand Champion', amount: '₹1,50,000', perks: 'Winner Trophy + Cloud GPU Credits ($3,000) + NIT Raipur Incubation Track' },
      { rank: 'Vigyaan Best Innovation (All Branches)', amount: '₹1,00,000', perks: 'Patent Filing Assistance from NITR IPR Cell' },
      { rank: '1st Runner Up', amount: '₹60,000', perks: 'Fast-Track Technical Interviews + Merch Kits' },
      { rank: 'Best All-Women Hacker Team', amount: '₹40,000', perks: 'Empowerment Award Trophy + Special Mentorship' }
    ],
    contactEmail: 'aavartan@nitrr.ac.in',
    contactPhone: '+91 771 2254200'
  },
  {
    id: 'nitrr-dsa-marathon',
    title: 'DSA MARATHON — Competitive Data Structures & Algorithmic Sprint',
    tagline: 'Code • Collaborate • Conquer: Solve Maximum Problems from 30 Curated Standard DSA Challenges',
    bannerArtTitle: 'DSA MARATHON',
    category: 'Technical',
    college: 'National Institute of Technology (NIT), Raipur',
    shortCollege: 'NIT Raipur',
    city: 'Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Hall S-4, Department of Computer Science & IT, NIT Raipur',
    venueCode: 'S-4',
    time: '11:30 AM - 1:00 PM',
    mode: 'On-Campus',
    startDate: 'Feb 01, 2026',
    endDate: 'Feb 01, 2026',
    deadline: 'Jan 31, 2026',
    prizePool: '₹40,000',
    entryFee: 'Free',
    registeredCount: 380,
    maxSlots: 500,
    teamSize: 'Solo or Pair',
    tags: ['DSA Marathon', 'Competitive Programming', 'LeetCode Hard', 'Graphs & DP', 'NIT Raipur'],
    organizerClub: 'Team Technocracy (Coding Wing, NIT Raipur)',
    officialWebsite: 'https://technocracy.nitrr.ac.in/events',
    registrationLink: 'https://technocracy.nitrr.ac.in/events',
    officialVerificationDomain: 'technocracy.nitrr.ac.in',
    verificationHash: 'SHA256: dsa2026nitrr...technocracy.nitrr.ac.in [OFFICIAL ARENA]',
    bannerGradient: 'from-emerald-950/90 via-slate-900 to-black',
    accentColor: '#10B981',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'DSA Marathon & Competitive Coding Heats — Team Technocracy',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      duration: '02:40',
      organizer: 'Team Technocracy NITRR',
      views: '12,400+ views'
    },
    isFeatured: true,
    isHot: true,
    highlights: [
      '30 Standard Data Structure & Algorithm problem challenges on HackerRank/Codeforces',
      'Instant leaderboard scoring with sub-millisecond execution runtime metrics',
      'Fast-track placement preparation kits & mechanical keyboards for champions'
    ],
    description: 'An elite speed-solving contest based on quick selection and optimal algorithmic solving from a standard set of 30 standard DSA questions spanning Dynamic Programming, Graph Traversals, and Greedy Paradigms.',
    schedule: [
      { time: '11:00 AM', activity: 'Reporting & Terminal Setup at Hall S-4' },
      { time: '11:30 AM', activity: 'Challenge Platform Unlock & Live Coding Sprint' },
      { time: '01:00 PM', activity: 'Automated Test Suite Freeze & Final Leaderboard Evaluation' }
    ],
    prizes: [
      { rank: 'Grand Champion', amount: '₹20,000', perks: 'DSA Trophy + Coding Gear + Certificate of Excellence' },
      { rank: '1st Runner Up', amount: '₹12,000', perks: 'Silver Memento + Tech Goodies' },
      { rank: 'Fastest Solve Award', amount: '₹8,000', perks: 'Speedcoder Medal' }
    ],
    contactEmail: 'dsa@technocracy.nitrr.ac.in',
    contactPhone: '+91 771 2254200'
  },
  {
    id: 'nitrr-drone-racing',
    title: 'DRONE RACING — High-Speed FPV Obstacle Circuit Grand Prix',
    tagline: 'High-Velocity Aerial Acrobatics & Time-Attack Obstacle Navigation over Central Lawn',
    bannerArtTitle: 'DRONE RACING',
    category: 'Robotics',
    college: 'National Institute of Technology (NIT), Raipur',
    shortCollege: 'NIT Raipur',
    city: 'Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Outdoors Central Lawn Circuit, NIT Raipur',
    venueCode: 'Outdoors',
    time: '2:30 PM - 4:00 PM',
    mode: 'On-Campus',
    startDate: 'Feb 02, 2026',
    endDate: 'Feb 02, 2026',
    deadline: 'Jan 31, 2026',
    prizePool: '₹50,000',
    entryFee: 'Free',
    registeredCount: 160,
    maxSlots: 200,
    teamSize: '1 - 3 Members',
    tags: ['Drone Racing', 'FPV Quadcopter', 'Aerial Acrobatics', 'Telemetry', 'NIT Raipur'],
    organizerClub: 'Team Technocracy (Robotics Wing, NIT Raipur)',
    officialWebsite: 'https://technocracy.nitrr.ac.in/events',
    registrationLink: 'https://technocracy.nitrr.ac.in/events',
    officialVerificationDomain: 'technocracy.nitrr.ac.in',
    verificationHash: 'SHA256: drone2026nitrr...technocracy.nitrr.ac.in [OFFICIAL ARENA]',
    bannerGradient: 'from-amber-950/90 via-slate-900 to-black',
    accentColor: '#F59E0B',
    coverImage: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Drone Racing Circuit Night Heats — NIT Raipur Central Lawn',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
      duration: '03:10',
      organizer: 'Team Technocracy NITRR',
      views: '16,200+ views'
    },
    isFeatured: true,
    isHot: true,
    highlights: [
      'Custom built FPV neon ring slalom circuit on NIT Raipur Central Lawn',
      'Laser lap timing system with live high-definition pilot feed display',
      'Teams bring their own quadcopters / FPV drones for minimum-time circuit sprint'
    ],
    description: 'Each team must bring their own custom FPV quadcopter and maneuver through intense air-gates, tight hairpin turns, and elevation chicanes in minimum time under official FPV racing rules.',
    schedule: [
      { time: '01:30 PM', activity: 'Pilot Scrutiny & Frequency Sync at Central Lawn' },
      { time: '02:30 PM', activity: 'Time-Attack Solo Qualification Rounds' },
      { time: '03:45 PM', activity: 'Top 4 Final Elimination Race & Award Ceremony' }
    ],
    prizes: [
      { rank: 'Circuit Champion', amount: '₹25,000', perks: 'Golden Propeller Trophy + Brushless Motor Kits' },
      { rank: '1st Runner Up', amount: '₹15,000', perks: 'High-Discharge LiPo Batteries' },
      { rank: 'Best Aerodynamic Design', amount: '₹10,000', perks: 'Aero Excellence Memento' }
    ],
    contactEmail: 'drones@technocracy.nitrr.ac.in',
    contactPhone: '+91 771 2254200'
  },
  {
    id: 'nitrr-code-sprint-relay',
    title: 'CODE SPRINT RELAY — Team-Based Competitive Baton Relay',
    tagline: '3-Hacker Team Relay: Solve Code, Pass the Terminal Baton, Optimize Under Pressure',
    bannerArtTitle: 'CODE SPRINT RELAY',
    category: 'Hackathon',
    college: 'National Institute of Technology (NIT), Raipur',
    shortCollege: 'NIT Raipur',
    city: 'Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Central Computer Center (CCC Lab), NIT Raipur',
    venueCode: 'CCC Lab',
    time: '11:30 AM - 1:00 PM',
    mode: 'On-Campus',
    startDate: 'Feb 02, 2026',
    endDate: 'Feb 02, 2026',
    deadline: 'Jan 31, 2026',
    prizePool: '₹35,000',
    entryFee: 'Free',
    registeredCount: 220,
    maxSlots: 300,
    teamSize: '3 Members',
    tags: ['Code Sprint', 'Relay Challenge', 'CCC Lab', 'Algorithms', 'NIT Raipur'],
    organizerClub: 'Team Technocracy (Software Wing, NIT Raipur)',
    officialWebsite: 'https://technocracy.nitrr.ac.in/events',
    registrationLink: 'https://technocracy.nitrr.ac.in/events',
    officialVerificationDomain: 'technocracy.nitrr.ac.in',
    verificationHash: 'SHA256: relay2026nitrr...technocracy.nitrr.ac.in [OFFICIAL ARENA]',
    bannerGradient: 'from-cyan-950/90 via-slate-900 to-black',
    accentColor: '#06B6D4',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Code Sprint Relay Adrenaline Heats — CCC Lab NIT Raipur',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      duration: '02:15',
      organizer: 'Team Technocracy NITRR',
      views: '9,800+ views'
    },
    isFeatured: false,
    isHot: true,
    highlights: [
      'High-pressure coding relay: each teammate gets 20 minutes at keyboard before tag-out',
      'No verbal communication permitted during terminal handoff',
      'Requires reading teammate’s code instantly and completing algorithms to pass unit tests'
    ],
    description: 'A dynamic team-based speed coding competition testing collaborative programming, algorithmic clarity, and rapid problem decomposition under intense ticking clocks in CCC Lab.',
    schedule: [
      { time: '11:00 AM', activity: 'CCC Lab Station Allocation' },
      { time: '11:30 AM', activity: 'Leg 1 Hacker Start' },
      { time: '12:10 PM', activity: 'Leg 2 Tag & Baton Handover' },
      { time: '12:50 PM', activity: 'Anchor Hacker Final Submissions' }
    ],
    prizes: [
      { rank: 'Winning Relay Trio', amount: '₹18,000', perks: 'Champion Trophies + Team Certificates' },
      { rank: '1st Runner Up', amount: '₹11,000', perks: 'Silver Medals' },
      { rank: 'Cleanest Code Base', amount: '₹6,000', perks: 'Clean Architecture Plaque' }
    ],
    contactEmail: 'relay@technocracy.nitrr.ac.in',
    contactPhone: '+91 771 2254200'
  },
  {
    id: 'nitrr-techno-graphix',
    title: 'TECHNO GRAPHIX — Design with Conviction Digital Artistry',
    tagline: 'Futuristic Graphic & UI/UX Poster Design Challenge on the Fest Theme',
    bannerArtTitle: 'TECHNO GRAPHIX',
    category: 'Technical',
    college: 'National Institute of Technology (NIT), Raipur',
    shortCollege: 'NIT Raipur',
    city: 'Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Studio Hall G-4, Department of Architecture, NIT Raipur',
    venueCode: 'G-4',
    time: '4:00 PM - 5:00 PM',
    mode: 'On-Campus',
    startDate: 'Feb 02, 2026',
    endDate: 'Feb 02, 2026',
    deadline: 'Jan 31, 2026',
    prizePool: '₹25,000',
    entryFee: 'Free',
    registeredCount: 190,
    maxSlots: 250,
    teamSize: 'Solo',
    tags: ['Techno Graphix', 'Graphic Design', 'Figma', 'Photoshop', 'Theme Art'],
    organizerClub: 'Team Technocracy (Design Wing, NIT Raipur)',
    officialWebsite: 'https://technocracy.nitrr.ac.in/events',
    registrationLink: 'https://technocracy.nitrr.ac.in/events',
    officialVerificationDomain: 'technocracy.nitrr.ac.in',
    verificationHash: 'SHA256: graphix2026nitrr...technocracy.nitrr.ac.in [OFFICIAL ARENA]',
    bannerGradient: 'from-purple-950/90 via-slate-900 to-black',
    accentColor: '#A855F7',
    coverImage: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Techno Graphix Digital Art Showcase — NIT Raipur',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
      duration: '02:00',
      organizer: 'Team Technocracy NITRR',
      views: '7,100+ views'
    },
    isFeatured: false,
    isHot: false,
    highlights: [
      'Evaluated by senior UI/UX directors and visual artists',
      'Live prompt-based design creation in Photoshop / Figma / Illustrator',
      'Winning artworks displayed in the Aavartan National Exhibition Gallery'
    ],
    description: 'An elite visual artistry challenge focusing on graphic design, typography pairing, aesthetic composition, and thematic digital poster rendering based on the annual symposium concept.',
    schedule: [
      { time: '03:45 PM', activity: 'Studio G-4 Workstation Setup' },
      { time: '04:00 PM', activity: 'Theme Reveal & 60-Minute Sprint Begins' },
      { time: '05:00 PM', activity: 'Art Export, Submissions & Jury Critique' }
    ],
    prizes: [
      { rank: 'Best Digital Artist', amount: '₹14,000', perks: 'Golden Stylus Trophy + Design Licenses' },
      { rank: 'Runner Up', amount: '₹8,000', perks: 'Silver Memento' },
      { rank: 'Best Visual Hierarchy', amount: '₹3,000', perks: 'Creative Excellence Certificate' }
    ],
    contactEmail: 'design@technocracy.nitrr.ac.in',
    contactPhone: '+91 771 2254200'
  },
  {
    id: 'nitrr-robowars',
    title: 'ROBO WARS — Combat Steel Cage Death Match',
    tagline: 'High-Torque Crushers, Spinning Blades & 15kg/30kg Armored Robot Destruction Arena',
    bannerArtTitle: 'ROBO WARS',
    category: 'Robotics',
    college: 'National Institute of Technology (NIT), Raipur',
    shortCollege: 'NIT Raipur',
    city: 'Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Outdoors Bulletproof Enclosed Cage, Central Ground, NIT Raipur',
    venueCode: 'Outdoors',
    time: '11:30 AM - 1:00 PM',
    mode: 'On-Campus',
    startDate: 'Feb 01, 2026',
    endDate: 'Feb 02, 2026',
    deadline: 'Jan 31, 2026',
    prizePool: '₹75,000',
    entryFee: 'Nominal Arena Fee',
    registeredCount: 85,
    maxSlots: 100,
    teamSize: '2 - 4 Members',
    tags: ['Robo Wars', 'Combat Robotics', 'Bulletproof Arena', 'Death Match', 'NIT Raipur'],
    organizerClub: 'Team Technocracy (Robotics Wing, NIT Raipur)',
    officialWebsite: 'https://technocracy.nitrr.ac.in/events',
    registrationLink: 'https://technocracy.nitrr.ac.in/events',
    officialVerificationDomain: 'technocracy.nitrr.ac.in',
    verificationHash: 'SHA256: robowar2026nitrr...technocracy.nitrr.ac.in [OFFICIAL ARENA]',
    bannerGradient: 'from-red-950/90 via-slate-900 to-black',
    accentColor: '#EF4444',
    coverImage: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'RoboWars Cage Fights Sparks & Heavy Metal Carnage — NIT Raipur',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1200&q=80',
      duration: '04:10',
      organizer: 'Team Technocracy NITRR',
      views: '38,000+ views'
    },
    isFeatured: true,
    isHot: true,
    highlights: [
      'Heavyweight 15kg & 30kg combat categories with pneumatic flippers & vertical spinners',
      'Double-walled polycarbonate & steel mesh safety cage built to international standards',
      'Live arena commentary and multi-angle slow motion action replays'
    ],
    description: 'An electrifying combat robotics arena where armored mechanical gladiators clash in an enclosed death match cage, testing structural durability, drivetrain torque, and tactical driving skills.',
    schedule: [
      { time: '10:30 AM', activity: 'Weight In, Fail-Safe Test & Weapon Scrutiny' },
      { time: '11:30 AM', activity: 'Quarter-Final Heavy Metal Bout Rounds' },
      { time: '12:40 PM', activity: 'Championship Title Bout & Crowd Destruction Showcase' }
    ],
    prizes: [
      { rank: 'Grand Cage Champion', amount: '₹40,000', perks: 'Golden Gear Trophy + Industrial Machine Sponsorship' },
      { rank: '1st Runner Up', amount: '₹22,000', perks: 'Heavy Metal Plaque' },
      { rank: 'Most Aggressive Bot', amount: '₹13,000', perks: 'Best Weapon Engineering Award' }
    ],
    contactEmail: 'robowar@technocracy.nitrr.ac.in',
    contactPhone: '+91 771 2254200'
  },
  {
    id: 'nitrr-reverse-coding',
    title: 'REVERSE CODING — Binary Decompilation & Logic Reconstruction',
    tagline: 'Work Backward from Input/Output Behaviors to Reconstruct Secret Source Algorithms',
    bannerArtTitle: 'REVERSE CODING',
    category: 'Technical',
    college: 'National Institute of Technology (NIT), Raipur',
    shortCollege: 'NIT Raipur',
    city: 'Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Central Computer Center (CCC), NIT Raipur',
    venueCode: 'CCC',
    time: '3:00 PM - 5:00 PM',
    mode: 'On-Campus',
    startDate: 'Feb 02, 2026',
    endDate: 'Feb 02, 2026',
    deadline: 'Jan 31, 2026',
    prizePool: '₹35,000',
    entryFee: 'Free',
    registeredCount: 210,
    maxSlots: 300,
    teamSize: 'Solo or Pair',
    tags: ['Reverse Coding', 'Black Box Testing', 'Binary Analysis', 'CCC Lab', 'NIT Raipur'],
    organizerClub: 'Team Technocracy (Software Wing, NIT Raipur)',
    officialWebsite: 'https://technocracy.nitrr.ac.in/events',
    registrationLink: 'https://technocracy.nitrr.ac.in/events',
    officialVerificationDomain: 'technocracy.nitrr.ac.in',
    verificationHash: 'SHA256: revcode2026nitrr...technocracy.nitrr.ac.in [OFFICIAL ARENA]',
    bannerGradient: 'from-emerald-950/90 via-slate-900 to-black',
    accentColor: '#10B981',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Reverse Coding Black-Box Logic Arena — NIT Raipur',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      duration: '02:30',
      organizer: 'Team Technocracy NITRR',
      views: '11,200+ views'
    },
    isFeatured: false,
    isHot: true,
    highlights: [
      'Black box executable binaries provided with zero documentation',
      'Participants feed custom inputs, observe outputs, and reverse engineer code structure',
      'Tests deep mathematical intuition, edge case reasoning, and algorithmic logic'
    ],
    description: 'Reverse Coding is a renowned competition where participants receive compiled binaries or black-box APIs, working purely backward from input/output behaviors to reconstruct the exact hidden algorithms.',
    schedule: [
      { time: '02:45 PM', activity: 'CCC Lab Terminal Login & Binary Distribution' },
      { time: '03:00 PM', activity: 'Round 1: 5 Black-Box Mathematical Systems' },
      { time: '04:15 PM', activity: 'Round 2: Obfuscated Data Structure Reconstructions' }
    ],
    prizes: [
      { rank: 'Master Reverse Engineer', amount: '₹18,000', perks: 'Winner Plaque + Binary Hacker Toolkit' },
      { rank: 'Runner Up', amount: '₹11,000', perks: 'Silver Trophy' },
      { rank: 'Highest Precision Score', amount: '₹6,000', perks: 'Logic Pioneer Certificate' }
    ],
    contactEmail: 'reversecode@technocracy.nitrr.ac.in',
    contactPhone: '+91 771 2254200'
  },
  {
    id: 'nitrr-valorant-lan',
    title: 'VALORANT LAN TOURNAMENT — Central India Esports Championship',
    tagline: '1 Gbps Optical Fiber LAN Arena: 5v5 Competitive Tactical FPS Championship',
    bannerArtTitle: 'VALORANT TOURNAMENT',
    category: 'Esports',
    college: 'National Institute of Technology (NIT), Raipur',
    shortCollege: 'NIT Raipur',
    city: 'Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Central Computer Center (CCC), NIT Raipur',
    venueCode: 'CCC',
    time: '2:30 PM onwards',
    mode: 'On-Campus',
    startDate: 'Feb 01, 2026',
    endDate: 'Feb 02, 2026',
    deadline: 'Jan 31, 2026',
    prizePool: '₹40,000',
    entryFee: 'Nominal Squad Fee',
    registeredCount: 320,
    maxSlots: 400,
    teamSize: '5 Members',
    tags: ['Valorant', 'Esports', 'LAN Gaming', '1 Gbps Fiber', 'CCC Lab', 'NIT Raipur'],
    organizerClub: 'Team Technocracy (Gaming Wing, NIT Raipur)',
    officialWebsite: 'https://technocracy.nitrr.ac.in/events',
    registrationLink: 'https://technocracy.nitrr.ac.in/events',
    officialVerificationDomain: 'technocracy.nitrr.ac.in',
    verificationHash: 'SHA256: valo2026nitrr...technocracy.nitrr.ac.in [OFFICIAL ARENA]',
    bannerGradient: 'from-pink-950/90 via-slate-900 to-black',
    accentColor: '#EC4899',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Valorant LAN Finals Shoutcast & Clutch Highlights — NIT Raipur',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      duration: '04:00',
      organizer: 'Team Technocracy NITRR',
      views: '29,000+ views'
    },
    isFeatured: true,
    isHot: true,
    highlights: [
      'High-refresh rate monitors & sub-1ms dedicated LAN routing inside CCC Lab',
      'Live shoutcasting with projector stream for spectators in the main gallery',
      'Official tournament rulebook following Riot Games competitive guidelines'
    ],
    description: 'Central India’s premier 5v5 collegiate LAN Valorant tournament featuring best-of-3 bracket eliminations, anti-cheat hardware checks, and professional shoutcasting.',
    schedule: [
      { time: '01:30 PM', activity: 'Warmup & Ping Calibration in CCC Lab' },
      { time: '02:30 PM', activity: 'Round of 16 Single Elimination Brackets' },
      { time: '06:00 PM', activity: 'Grand Finals Best-of-3 Broadcast' }
    ],
    prizes: [
      { rank: 'Grand LAN Champion (Team of 5)', amount: '₹25,000', perks: 'Pro Gaming Headsets + Champions Trophy' },
      { rank: '1st Runner Up Squad', amount: '₹12,000', perks: 'Esports Medals' },
      { rank: 'Tournament MVP', amount: '₹3,000', perks: 'MVP Plaque + Mechanical Mouse' }
    ],
    contactEmail: 'esports@technocracy.nitrr.ac.in',
    contactPhone: '+91 771 2254200'
  },
  {
    id: 'technovate-iiitnr-2026',
    title: 'Technovate 2026 — Annual Techno-Cultural Festival',
    tagline: 'Autonomous Robotics, Hackathons, Drone Grand Prix & Celebrity Pro-Nites',
    category: 'Robotics',
    college: 'International Institute of Information Technology (IIIT), Naya Raipur',
    shortCollege: 'IIIT Naya Raipur',
    city: 'Naya Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Plot No. 7, Sector 24, Near Purkhoti Muktangan, Atal Nagar, Naya Raipur',
    mode: 'On-Campus',
    startDate: 'Feb 19, 2027',
    endDate: 'Feb 21, 2027',
    deadline: 'Feb 10, 2027',
    prizePool: '₹4,00,000',
    entryFee: 'Free (Online Rounds) / Nominal for Arena',
    registeredCount: 890,
    maxSlots: 1200,
    teamSize: '1 - 4 Members',
    tags: ['Technovate', 'RoboWars', 'Ideathon', 'Pro-Nite', 'Drone Racing', 'ACM IIITNR'],
    organizerClub: 'Student Activity Council (SAC) & Robotics Society, IIIT Naya Raipur',
    officialWebsite: 'https://www.iiitnr.ac.in/',
    officialVerificationDomain: 'iiitnr.ac.in',
    verificationHash: 'SHA256: d241be9a771...sac.iiitnr.ac.in [STATE GOVT OF CG & NTPC]',
    bannerGradient: 'from-cyan-950/80 via-slate-900 to-black',
    accentColor: '#06B6D4',
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Technovate Heavyweight RoboWars & Smart Campus Teaser',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
      duration: '04:18',
      organizer: 'SAC & Robotics Society (IIIT-NR)',
      views: '18,200+ views'
    },
    isFeatured: true,
    isHot: true,
    highlights: [
      'Official Joint Venture of Government of Chhattisgarh & NTPC Limited',
      'Battle-grade enclosed cage arena for 15kg & 30kg RoboWars',
      'Pro-Nite celebrity concerts (past artists include Seedhe Maut and top national bands)',
      'High-speed fiber connectivity & 24x7 hardware lab access'
    ],
    description: 'Technovate is the premier 3-day techno-cultural festival hosted at IIIT Naya Raipur’s sprawling 50-acre smart campus. It combines intense technological competitions (Robotics, Data Science Ideathons) with vibrant cultural battles and celebrity EDM concerts.',
    schedule: [
      { time: 'Day 1 - 10:00 AM', activity: 'Registration & Welcome Keynote by Dr. Pradeep K. Sinha' },
      { time: 'Day 1 - 02:00 PM', activity: 'Line Follower & Maze Solver Technical Arena Heats' },
      { time: 'Day 2 - 11:30 AM', activity: 'High-Impact RoboWars 30kg Heavyweight Championship' },
      { time: 'Day 3 - 07:00 PM', activity: 'Mega Pro-Nite Concert & Grand Award Felicitation' }
    ],
    prizes: [
      { rank: 'RoboWars Champion (30kg Heavyweight)', amount: '₹1,20,000', perks: 'Golden Gear Trophy + Industrial Automation Sponsorship' },
      { rank: 'Technovate Hackathon 1st Place', amount: '₹1,00,000', perks: 'Seed Incubation Opportunity at IIITNR Innovation Hub' },
      { rank: 'FPV Drone Night Sprint Winner', amount: '₹60,000', perks: 'High-Torque BLDC Drone Motor Kits' }
    ],
    contactEmail: 'iiitnr@iiitnr.ac.in',
    contactPhone: '+91 771 2474182'
  },
  {
    id: 'vyom-rungta-bhilai-2026',
    title: 'VYOM 2026 — Rungta National Mega Fest & CodeWars',
    tagline: 'CodeSprint, Esports Championship (LAN Valorant/BGMI) & E-Cell Startup Shark Tank',
    category: 'Technical',
    college: 'Rungta Group of Institutions (RCET & RSR)',
    shortCollege: 'Rungta College',
    city: 'Bhilai-Raipur, Chhattisgarh',
    isRegional: true,
    venue: 'Rungta R1 Educational Campus, Kohka-Kurud Road, Bhilai',
    mode: 'Hybrid',
    startDate: 'Dec 02, 2026',
    endDate: 'Dec 04, 2026',
    deadline: 'Nov 27, 2026',
    prizePool: '₹2,50,000',
    entryFee: 'Free',
    registeredCount: 1150,
    maxSlots: 1500,
    teamSize: 'Solo or 2 - 4 Members',
    tags: ['VYOM', 'CodeWars', 'LAN Gaming', 'E-Cell Shark Tank', 'Smart India Nodal Center'],
    organizerClub: 'Department of Computer Science & E-Cell, Rungta Group (RIIT)',
    officialWebsite: 'https://www.rungta.ac.in/',
    officialVerificationDomain: 'rungta.ac.in',
    verificationHash: 'SHA256: 3c9b741088a...rungta.ac.in [AICTE APPROVED & NAAC A+]',
    bannerGradient: 'from-amber-950/80 via-slate-900 to-black',
    accentColor: '#F59E0B',
    coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'VYOM National Mega Fest & Esports Championship Trailer',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
      duration: '05:10',
      organizer: 'Department of CS & E-Cell (Rungta Bhilai)',
      views: '32,100+ views'
    },
    isFeatured: true,
    isHot: false,
    highlights: [
      'Official Nodal Center for Smart India Hackathon (SIH)',
      '1 Gbps dedicated optical fiber LAN arena for Esports tournaments',
      'Venture pitch sessions judged by Chhattisgarh Angel Network investors',
      'Star celebrity musical night on final evening'
    ],
    description: 'VYOM is one of Central India’s highest-attended student fests, bringing together over 60+ regional institutions. The technical wing features speed-coding algorithms, cybersecurity capture-the-flag, and working prototype demonstrations.',
    schedule: [
      { time: 'Day 1 - 09:30 AM', activity: 'CodeSprint Algorithmic Prelims on HackerRank platform' },
      { time: 'Day 1 - 01:30 PM', activity: 'LAN Gaming Group Stages' },
      { time: 'Day 2 - 11:00 AM', activity: 'E-Cell Shark Tank Pitching to Angel Investors' },
      { time: 'Day 3 - 06:00 PM', activity: 'Grand Finale, Celebrity Performance & Prize Distribution' }
    ],
    prizes: [
      { rank: 'CodeWars Champion', amount: '₹60,000', perks: 'Fast-Track Placement Shortlist + Custom Mechanical Keyboards' },
      { rank: 'Esports Championship (Valorant)', amount: '₹50,000', perks: 'Pro Gaming Headsets & Trophy' },
      { rank: 'Best Startup Prototype', amount: '₹75,000', perks: 'Incubation & Co-working space at Rungta RIIT Hub' }
    ],
    contactEmail: 'vyom@rungta.ac.in',
    contactPhone: '+91 788 6666666'
  },
  {
    id: 'ojas-bit-durg-2026',
    title: 'OJAS 2026 — BIT Durg Flagship Technical Symposium',
    tagline: 'CTF Ethical Hacking, UI/UX Live Designathon & Full-Stack Web Sprint',
    category: 'Hackathon',
    college: 'Bhilai Institute of Technology (BIT), Durg',
    shortCollege: 'BIT Durg',
    city: 'Durg-Bhilai, Chhattisgarh',
    isRegional: true,
    venue: 'Computer Science & IT Departments, BIT Durg Campus, Subhash Nagar',
    mode: 'On-Campus',
    startDate: 'Nov 27, 2026',
    endDate: 'Nov 28, 2026',
    deadline: 'Nov 22, 2026',
    prizePool: '₹1,50,000',
    entryFee: '₹100 / Person',
    registeredCount: 540,
    maxSlots: 750,
    teamSize: '2 - 3 Members',
    tags: ['OJAS', 'IEEE BIT', 'CTF Cybersecurity', 'Figma UI/UX', 'Web Sprint'],
    organizerClub: 'IEEE Student Branch & CSI Student Chapter, BIT Durg',
    officialWebsite: 'https://bitdurg.ac.in/',
    officialVerificationDomain: 'bitdurg.ac.in',
    verificationHash: 'SHA256: 8a5d1203fe1...bitdurg.ac.in [AUTONOMOUS & NAAC A]',
    bannerGradient: 'from-violet-950/80 via-slate-900 to-black',
    accentColor: '#8B5CF6',
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'OJAS Technical Symposium CTF & Designathon Recap',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      duration: '02:50',
      organizer: 'IEEE & CSI Student Branches (BIT Durg)',
      views: '11,400+ views'
    },
    isFeatured: false,
    isHot: true,
    highlights: [
      'Jeopardy-style Capture The Flag (CTF) cybersecurity challenge',
      '6-hour live Figma designathon evaluated by senior product leaders',
      'Oldest autonomous engineering college fest in Durg-Bhilai industrial belt'
    ],
    description: 'OJAS at BIT Durg brings together technical coders, penetration testers, and digital product designers under one roof. BIT Durg is recognized as the first autonomous engineering college in Chhattisgarh.',
    schedule: [
      { time: 'Day 1 - 09:30 AM', activity: 'Inaugural Session at Golden Jubilee Hall' },
      { time: 'Day 1 - 11:30 AM', activity: 'CTF Vulnerability Challenge Begins' },
      { time: 'Day 2 - 03:00 PM', activity: 'Live Design Sprint Submissions & Winner Announcements' }
    ],
    prizes: [
      { rank: 'CTF Grand Master', amount: '₹55,000', perks: 'Offensive Security Vouchers + Winner Trophy' },
      { rank: 'Best UI/UX Redesign', amount: '₹40,000', perks: 'Figma Annual Subscriptions + Mechanical Gear' }
    ],
    contactEmail: 'ojas@bitdurg.ac.in',
    contactPhone: '+91 788 2359297'
  },
  {
    id: 'csvtu-utkarsh-2026',
    title: 'CSVTU State Innovation & University Tech Expo (UTKARSH)',
    tagline: 'Annual Exposition bringing 40+ Engineering Colleges of Chhattisgarh Together',
    category: 'Technical',
    college: 'Chhattisgarh Swami Vivekanand Technical University (CSVTU)',
    shortCollege: 'CSVTU University',
    city: 'Bhilai, Chhattisgarh',
    isRegional: true,
    venue: 'CSVTU Administrative Campus, Newai, Bhilai',
    mode: 'On-Campus',
    startDate: 'Dec 10, 2026',
    endDate: 'Dec 11, 2026',
    deadline: 'Dec 04, 2026',
    prizePool: '₹3,00,000',
    entryFee: 'Free',
    registeredCount: 780,
    maxSlots: 1000,
    teamSize: '3 - 5 Members',
    tags: ['UTKARSH', 'State Expo', 'Patent Cell', 'SAIL Bhilai Jury', 'Renewable Energy'],
    organizerClub: 'State Innovation & Patent Cell, CSVTU (State Technical University)',
    officialWebsite: 'https://csvtu.ac.in/',
    officialVerificationDomain: 'csvtu.ac.in',
    verificationHash: 'SHA256: 1f0e499d30c...csvtu.ac.in [STATE UNIVERSITY ACT 2004]',
    bannerGradient: 'from-blue-950/80 via-slate-900 to-black',
    accentColor: '#3B82F6',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'UTKARSH State Innovation & University Tech Expo Reel',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      duration: '03:15',
      organizer: 'State Innovation & Patent Cell (CSVTU)',
      views: '9,800+ views'
    },
    isFeatured: false,
    isHot: false,
    highlights: [
      'Official state-level project exposition of Chhattisgarh state government',
      'Jury from Bhilai Steel Plant (SAIL) & Jindal Power Corporation',
      'Top 3 innovative projects receive direct state patent grant funding'
    ],
    description: 'UTKARSH is the apex state technical gathering conducted directly by CSVTU, the affiliating university for engineering in Chhattisgarh. Final year students and university innovators present functional hardware and software solutions.',
    schedule: [
      { time: 'Day 1 - 10:00 AM', activity: 'Inaugural Address by Hon. Vice Chancellor' },
      { time: 'Day 1 - 01:30 PM', activity: 'Project Stall Exhibition & Technical Scrutiny' },
      { time: 'Day 2 - 04:00 PM', activity: 'Governor’s State Innovation Trophy Award Ceremony' }
    ],
    prizes: [
      { rank: 'State Innovation Champion', amount: '₹1,25,000', perks: 'State Patent Grant + Startup Chhattisgarh Incubation' },
      { rank: 'Best Industrial Automation Model', amount: '₹75,000', perks: 'SAIL Industrial Mentorship' }
    ],
    contactEmail: 'registrar@csvtu.ac.in',
    contactPhone: '+91 788 2261311'
  },
  {
    id: 'sih-2026-national',
    title: 'Smart India Hackathon (SIH 2026) — Government of India',
    tagline: 'World’s Biggest Open Innovation Model by Ministry of Education & AICTE',
    category: 'Hackathon',
    college: 'Ministry of Education Innovation Cell (MIC) & AICTE',
    shortCollege: 'Govt of India (SIH)',
    city: 'Pan-India Nodal Centers',
    isRegional: false,
    venue: 'Nationwide Nodal Centers (including Rungta RCET Bhilai Nodal Center)',
    mode: 'On-Campus',
    startDate: 'Dec 15, 2026',
    endDate: 'Dec 17, 2026',
    deadline: 'Nov 30, 2026',
    prizePool: '₹1,00,00,000+',
    entryFee: 'Free',
    registeredCount: 65000,
    teamSize: '6 Members (Mandatory 1 Female Member)',
    tags: ['SIH 2026', 'Government of India', 'AICTE', 'MIC', 'Nation Building'],
    organizerClub: 'Ministry of Education Innovation Cell (MIC) & AICTE',
    officialWebsite: 'https://www.sih.gov.in/',
    officialVerificationDomain: 'sih.gov.in',
    verificationHash: 'SHA256: 9e10ff4a802...sih.gov.in [GOVT OF INDIA MINISTRY OF EDUCATION]',
    bannerGradient: 'from-amber-950/80 via-slate-900 to-black',
    accentColor: '#F59E0B',
    coverImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Smart India Hackathon Grand Finale Nationwide Broadcast',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
      duration: '06:30',
      organizer: 'Ministry of Education Innovation Cell (MIC)',
      views: '140,000+ views'
    },
    isFeatured: true,
    isHot: true,
    highlights: [
      'Problem statements directly from Central Ministries, State Governments, and PSUs',
      'Fixed cash prize of ₹1,00,000 per winning problem statement',
      'Opportunity to present solutions to Hon. Prime Minister of India'
    ],
    description: 'Smart India Hackathon (SIH) is a nationwide initiative by the Ministry of Education’s Innovation Cell to provide students a platform to solve some of the pressing problems faced by ministries and industries in our daily lives.',
    schedule: [
      { time: 'Day 1 - 08:00 AM', activity: 'Nationwide Live Video Stream Kickoff by Central Ministry' },
      { time: 'Day 1 - 09:00 AM', activity: '36-Hour Coding Sprint Commences' },
      { time: 'Day 2 - 08:00 PM', activity: 'Nationwide Results Declaration on Doordarshan & Web' }
    ],
    prizes: [
      { rank: 'Per Winning Problem Statement', amount: '₹1,00,000', perks: 'Central Government Memento + National Recognition' }
    ],
    contactEmail: 'sih@aicte-india.org',
    contactPhone: '+91 11 29581333'
  },
  {
    id: 'techfest-iit-bombay-2026',
    title: 'Techfest 2026 — Indian Institute of Technology (IIT), Bombay',
    tagline: 'Asia’s Largest Science & Technology Festival (Patronage by UNESCO & UNICEF)',
    category: 'Hackathon',
    college: 'Indian Institute of Technology (IIT), Bombay',
    shortCollege: 'IIT Bombay',
    city: 'Mumbai, Maharashtra',
    isRegional: false,
    venue: 'IIT Bombay Campus, Powai, Mumbai',
    mode: 'Hybrid',
    startDate: 'Dec 18, 2026',
    endDate: 'Dec 21, 2026',
    deadline: 'Dec 05, 2026',
    prizePool: '₹15,00,000',
    entryFee: 'Free',
    registeredCount: 8400,
    maxSlots: 10000,
    teamSize: '2 - 4 Members',
    tags: ['Techfest', 'IIT Bombay', 'UNESCO Patronage', 'International Robowars', 'Quantum AI'],
    organizerClub: 'Techfest Core Working Committee, IIT Bombay',
    officialWebsite: 'https://techfest.org/',
    officialVerificationDomain: 'techfest.org',
    verificationHash: 'SHA256: 4a2d80ef719...techfest.org [IIT BOMBAY STATUTORY INSTITUTE]',
    bannerGradient: 'from-purple-950/80 via-slate-900 to-black',
    accentColor: '#A855F7',
    coverImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Techfest Asia’s Largest Science & Tech Festival Official Teaser',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
      duration: '04:45',
      organizer: 'Techfest Core Committee (IIT Bombay)',
      views: '210,000+ views'
    },
    isFeatured: true,
    isHot: true,
    highlights: [
      'Recognized as Asia’s largest festival with 1,75,000+ national and global attendees',
      'International Robowars featuring heavy-combat bot teams from Russia, USA, and Brazil',
      'Technoholix night events with laser shows and global drone choreography'
    ],
    description: 'Techfest is the annual science and technology festival of Indian Institute of Technology Bombay. It serves as a benchmark for student engineering worldwide, hosting global keynote talks by Nobel Laureates and industry leaders.',
    schedule: [
      { time: 'Day 1 - 09:00 AM', activity: 'Grand Opening at Convocation Hall, IIT Bombay' },
      { time: 'Day 2 - 02:00 PM', activity: 'International Robowars Prelims' },
      { time: 'Day 4 - 06:00 PM', activity: 'Technoholix Drone Light Arena & Closing Awards' }
    ],
    prizes: [
      { rank: 'International Hackathon Winner', amount: '₹5,00,000', perks: 'Global Accelerator Shortlist + Silicon Valley Mentorship' },
      { rank: 'RoboWars World Cup', amount: '₹4,00,000', perks: 'World Cup Trophy + Hardware Kits' }
    ],
    contactEmail: 'info@techfest.org',
    contactPhone: '+91 22 2576 4000'
  },
  {
    id: 'kshitij-iit-kharagpur-2026',
    title: 'Kshitij 2026 — IIT Kharagpur Techno-Management Fest',
    tagline: 'UNESCO Certified Symposium: Algorithmic Quant Challenge & National Data Cup',
    category: 'Technical',
    college: 'Indian Institute of Technology (IIT), Kharagpur',
    shortCollege: 'IIT Kharagpur',
    city: 'Kharagpur, West Bengal',
    isRegional: false,
    venue: 'IIT Kharagpur Campus, Paschim Medinipur',
    mode: 'Hybrid',
    startDate: 'Jan 16, 2027',
    endDate: 'Jan 18, 2027',
    deadline: 'Jan 06, 2027',
    prizePool: '₹7,50,000',
    entryFee: 'Free',
    registeredCount: 3900,
    maxSlots: 5000,
    teamSize: '1 - 3 Members',
    tags: ['Kshitij', 'IIT KGP', 'Quant Finance', 'Data Science Cup', 'Hedge Fund Track'],
    organizerClub: 'Technology Students’ Gymkhana (TSG), IIT Kharagpur',
    officialWebsite: 'https://ktj.in/',
    officialVerificationDomain: 'ktj.in',
    verificationHash: 'SHA256: b8302fec551...ktj.in [IIT KHARAGPUR TSG AUTHENTICATED]',
    bannerGradient: 'from-emerald-950/80 via-slate-900 to-black',
    accentColor: '#10B981',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1567521464027-f127ff144326?auto=format&fit=crop&w=1000&q=80'
    ],
    videoTeaser: {
      title: 'Kshitij Annual Techno-Management Fest Official Glimpses',
      embedUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
      previewUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      duration: '03:55',
      organizer: 'Technology Students’ Gymkhana (IIT Kharagpur)',
      views: '85,000+ views'
    },
    isFeatured: false,
    isHot: false,
    highlights: [
      'Certified by UNESCO and Make in India initiative',
      'Real-world algorithmic trading datasets provided by institutional hedge funds',
      'Direct interview opportunities with quantitative finance firms'
    ],
    description: 'Kshitij is the flagship annual techno-management festival of IIT Kharagpur. It is one of India’s most rigorous platforms for competitive algorithmic programming, quant modeling, and mechanical design.',
    schedule: [
      { time: 'Day 1 - 10:00 AM', activity: 'Inaugural Keynote at Kalidas Auditorium' },
      { time: 'Day 2 - 01:00 PM', activity: 'Algorithmic Trading Backtest Arena Launch' },
      { time: 'Day 3 - 04:30 PM', activity: 'Grand Valedictory Session & Cash Distribution' }
    ],
    prizes: [
      { rank: 'National Data Cup 1st Place', amount: '₹1,75,000', perks: 'Hedge Fund Placement Shortlist + Trophy' },
      { rank: 'Algorithmic Trading Winner', amount: '₹1,25,000', perks: 'Wall Street Mentorship Fellowship' }
    ],
    contactEmail: 'contact@ktj.in',
    contactPhone: '+91 3222 282 000'
  }
];

export const COLLEGE_LIST = [
  'All Colleges',
  'NIT Raipur',
  'IIIT Naya Raipur',
  'Rungta College',
  'BIT Durg',
  'CSVTU University',
  'Govt of India (SIH)',
  'IIT Bombay',
  'IIT Kharagpur'
];

export const CATEGORY_LIST = [
  'All Categories',
  'Hackathon',
  'Technical',
  'Robotics',
  'Workshop',
  'Cultural',
  'Esports'
];
