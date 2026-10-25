export interface CollegeEvent {
  id: string;
  title: string;
  tagline: string;
  category: 'Hackathon' | 'Technical' | 'Cultural' | 'Robotics' | 'Workshop' | 'E-Cell' | 'Esports';
  college: string;
  shortCollege: string;
  city: string;
  isRegional: boolean; // true = Raipur / Central India, false = Pan-India
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
  bannerGradient: string;
  accentColor: string;
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
    id: 'hack-nitr-2026',
    title: 'HackNITR 6.0 — Central India’s Premier Hackathon',
    tagline: '36 Hours of Non-Stop Innovation, High-Frequency Building & Web3/AI Tracks',
    category: 'Hackathon',
    college: 'National Institute of Technology (NIT), Raipur',
    shortCollege: 'NIT Raipur',
    city: 'Raipur, CG',
    isRegional: true,
    venue: 'Main Auditorium & E-Classrooms, NIT Raipur Campus',
    mode: 'On-Campus',
    startDate: 'Nov 14, 2026',
    endDate: 'Nov 16, 2026',
    deadline: 'Nov 10, 2026',
    prizePool: '₹3,50,000',
    entryFee: 'Free',
    registeredCount: 840,
    maxSlots: 1000,
    teamSize: '2 - 4 Members',
    tags: ['AI/ML', 'Web3', 'Open Innovation', 'Hardware IoT', 'FinTech'],
    organizerClub: 'Coding Club & Innovation Cell, NIT Raipur',
    bannerGradient: 'from-emerald-950/80 via-slate-900 to-black',
    accentColor: '#10B981',
    isFeatured: true,
    isHot: true,
    highlights: [
      'Free Food & Accommodation for outstation participants',
      'Direct interview opportunities with sponsoring startups',
      'Official GitHub, Devfolio & Polygon tracks with special bounties'
    ],
    description: 'HackNITR is Central India’s largest annual student hackathon hosted by NIT Raipur. Bring your laptops, coffee cups, and most ambitious ideas to solve real-world problems across AI, FinTech, and Decentralized Systems.',
    schedule: [
      { time: 'Day 1 - 09:00 AM', activity: 'Registration & Swag Distribution' },
      { time: 'Day 1 - 11:30 AM', activity: 'Opening Ceremony & Problem Statements Release' },
      { time: 'Day 1 - 01:00 PM', activity: 'Hacking Begins & Mentor Round 1' },
      { time: 'Day 2 - 03:00 AM', activity: 'Midnight Gaming & Pizza Break' },
      { time: 'Day 2 - 04:00 PM', activity: 'Final Pitching to Jury Panel' },
      { time: 'Day 2 - 07:00 PM', activity: 'Award Ceremony & Cash Prize Distribution' }
    ],
    prizes: [
      { rank: '1st Place (Overall Winner)', amount: '₹1,50,000', perks: 'Winner Trophy + Cloud Credits ($5,000) + Angel Investor Meet' },
      { rank: '1st Runner Up', amount: '₹80,000', perks: 'Trophy + Swag Kits + Fast-track Internships' },
      { rank: 'Best AI / ML Track', amount: '₹50,000', perks: 'Sponsored GPU Compute Credits + Hardware Kits' },
      { rank: 'Best All-Women Team', amount: '₹30,000', perks: 'Special Trophy + Mentorship Passes' }
    ],
    contactEmail: 'organizers@hacknitr.ac.in',
    contactPhone: '+91 98271 44520'
  },
  {
    id: 'aarohan-iiitnr-2026',
    title: 'Aarohan 2026 — Annual Tech & Innovation Fest',
    tagline: 'Autonomous Robotics, Drone Racing & Central India Drone Grand Prix',
    category: 'Robotics',
    college: 'IIIT Naya Raipur (DSPM IIITNR)',
    shortCollege: 'IIIT Naya Raipur',
    city: 'Naya Raipur, CG',
    isRegional: true,
    venue: 'IIIT-NR Campus, Sector 24, Atal Nagar',
    mode: 'On-Campus',
    startDate: 'Nov 20, 2026',
    endDate: 'Nov 22, 2026',
    deadline: 'Nov 17, 2026',
    prizePool: '₹2,00,000',
    entryFee: '₹150 / Team',
    registeredCount: 420,
    teamSize: '1 - 4 Members',
    tags: ['Robotics', 'RoboWars', 'Drone Racing', 'CAD Design', 'Line Follower'],
    organizerClub: 'Robotics & Automation Society (RAS), IIITNR',
    bannerGradient: 'from-cyan-950/80 via-slate-900 to-black',
    accentColor: '#06B6D4',
    isFeatured: true,
    isHot: true,
    highlights: [
      'Battlefield arena for 15kg & 30kg combat robots (RoboWars)',
      'Night-glow drone racing obstacle course',
      'Keynote sessions by ISRO & DRDO roboticists'
    ],
    description: 'Aarohan is the flagship technical symposium of IIIT Naya Raipur bringing together drone pilots, hardware tinkerers, and robotics clubs across Chhattisgarh, MP, and Maharashtra.',
    schedule: [
      { time: 'Day 1 - 10:00 AM', activity: 'Weigh-in & Technical Safety Scrutiny' },
      { time: 'Day 1 - 02:00 PM', activity: 'Line Follower & Maze Solver Prelims' },
      { time: 'Day 2 - 11:00 AM', activity: 'High-Impact RoboWars Arena Heats' },
      { time: 'Day 2 - 06:00 PM', activity: 'FPV Drone Night Sprint Championship' }
    ],
    prizes: [
      { rank: 'RoboWars Champion (30kg)', amount: '₹75,000', perks: 'Golden Gear Trophy + Industrial Components Kit' },
      { rank: 'FPV Drone Grand Prix', amount: '₹50,000', perks: 'Carbon Fiber Frame + Speed Controllers' },
      { rank: 'Best Autonomous Rover', amount: '₹35,000', perks: 'NVIDIA Jetson Nano Dev Kit' }
    ],
    contactEmail: 'aarohan@iiitnr.edu.in',
    contactPhone: '+91 70004 89211'
  },
  {
    id: 'vyom-rungta-2026',
    title: 'VYOM 2026 — Rungta National Mega Fest & Hack Sprint',
    tagline: 'CodeSprint, Esports Championship (Valorant & BGMI) & Startup Pitch',
    category: 'Technical',
    college: 'Rungta Group of Institutions (RCET & RSR)',
    shortCollege: 'Rungta College',
    city: 'Bhilai-Raipur, CG',
    isRegional: true,
    venue: 'Rungta R1 Campus, Kohka-Kurud Road',
    mode: 'Hybrid',
    startDate: 'Dec 02, 2026',
    endDate: 'Dec 04, 2026',
    deadline: 'Nov 28, 2026',
    prizePool: '₹1,75,000',
    entryFee: 'Free',
    registeredCount: 650,
    teamSize: 'Solo or 2-4 Members',
    tags: ['Competitive Coding', 'Esports', 'Valorant', 'Startup Pitch', 'Paper Presentation'],
    organizerClub: 'Department of Computer Science & E-Cell Rungta',
    bannerGradient: 'from-amber-950/80 via-slate-900 to-black',
    accentColor: '#F59E0B',
    isFeatured: true,
    isHot: false,
    highlights: [
      'LAN Gaming arena with dedicated gigabit fiber',
      'Over 50+ regional engineering colleges competing',
      'Seed funding pitch sessions with Chhattisgarh Angel Network'
    ],
    description: 'VYOM is one of Central India’s biggest student-driven technical celebrations featuring coding sprints on LeetCode-style algorithmic challenges, inter-college esports tournaments, and venture pitching.',
    schedule: [
      { time: 'Day 1 - 10:00 AM', activity: 'Speed Coding Sprint (Round 1)' },
      { time: 'Day 1 - 01:00 PM', activity: 'Esports Group Stages (LAN)' },
      { time: 'Day 2 - 11:00 AM', activity: 'E-Cell Shark Tank Round' },
      { time: 'Day 2 - 04:00 PM', activity: 'Grand Finals & Celebrity Night' }
    ],
    prizes: [
      { rank: 'CodeSprint Grand Master', amount: '₹40,000', perks: 'Mechanical Keyboards + Fast-track Interviews' },
      { rank: 'Esports Champions (Valorant)', amount: '₹50,000', perks: 'Custom Gaming Gear' },
      { rank: 'Best Startup Pitch', amount: '₹50,000', perks: 'Incubation Support at Rungta RIIT' }
    ],
    contactEmail: 'vyom@rungta.ac.in',
    contactPhone: '+91 92291 11555'
  },
  {
    id: 'ojas-bit-durg-2026',
    title: 'OJAS 2026 — BIT Durg Tech & Design Symposium',
    tagline: 'UI/UX Designathon, Full-Stack Web Sprint & CTF Cybersecurity Battle',
    category: 'Hackathon',
    college: 'Bhilai Institute of Technology (BIT), Durg',
    shortCollege: 'BIT Durg',
    city: 'Durg-Bhilai, CG',
    isRegional: true,
    venue: 'CS & IT Blocks, BIT Durg Campus',
    mode: 'On-Campus',
    startDate: 'Nov 27, 2026',
    endDate: 'Nov 28, 2026',
    deadline: 'Nov 24, 2026',
    prizePool: '₹1,20,000',
    entryFee: '₹100 / Person',
    registeredCount: 310,
    teamSize: '2 - 3 Members',
    tags: ['Cybersecurity', 'CTF', 'UI/UX Design', 'Figma', 'Web Development'],
    organizerClub: 'IEEE Student Branch & Cyber Security Club BIT',
    bannerGradient: 'from-violet-950/80 via-slate-900 to-black',
    accentColor: '#8B5CF6',
    isFeatured: false,
    isHot: true,
    highlights: [
      'Jeopardy style Capture The Flag (CTF) security challenge',
      'Live 6-hour Design Sprint judged by senior product designers',
      'Exclusive workshops on zero-day vulnerabilities'
    ],
    description: 'OJAS at BIT Durg brings cybersecurity enthusiasts and visual product designers together under one roof. Test your penetration testing skills or craft award-winning design prototypes in Figma.',
    schedule: [
      { time: 'Day 1 - 09:30 AM', activity: 'CTF Flag Hunt Launch' },
      { time: 'Day 1 - 01:00 PM', activity: 'UI/UX Live Redesign Challenge' },
      { time: 'Day 2 - 02:00 PM', activity: 'Security Exploit Presentations' }
    ],
    prizes: [
      { rank: 'CTF Winner', amount: '₹45,000', perks: 'Offensive Security Vouchers + Trophies' },
      { rank: 'Best UI/UX Prototype', amount: '₹35,000', perks: 'Figma Annual Pro Subscriptions + Hardware' }
    ],
    contactEmail: 'ojas@bitdurg.ac.in',
    contactPhone: '+91 94252 78100'
  },
  {
    id: 'csvtu-innovation-summit-2026',
    title: 'CSVTU University State Innovation & Project Expo',
    tagline: 'All Chhattisgarh Engineering Colleges Final Year Project Showcase',
    category: 'Technical',
    college: 'Chhattisgarh Swami Vivekanand Technical University (CSVTU)',
    shortCollege: 'CSVTU University',
    city: 'Bhilai, CG',
    isRegional: true,
    venue: 'CSVTU Administrative Campus, Newai, Bhilai',
    mode: 'On-Campus',
    startDate: 'Dec 10, 2026',
    endDate: 'Dec 11, 2026',
    deadline: 'Dec 05, 2026',
    prizePool: '₹2,50,000',
    entryFee: 'Free',
    registeredCount: 520,
    teamSize: '3 - 5 Members',
    tags: ['IoT', 'Renewable Energy', 'Civil Smart City', 'Agriculture Tech', 'Healthcare AI'],
    organizerClub: 'State Innovation & Patent Cell, CSVTU',
    bannerGradient: 'from-blue-950/80 via-slate-900 to-black',
    accentColor: '#3B82F6',
    isFeatured: false,
    isHot: false,
    highlights: [
      'State Government grant awards up to ₹5,00,000 for top 3 patents',
      'Official industry jury from Bhilai Steel Plant (SAIL) & Jindal Power',
      'Direct seed funding fast-track'
    ],
    description: 'The pinnacle state-level project exposition where engineering minds across all CSVTU affiliated colleges present working prototypes to government dignitaries and industrial leaders.',
    schedule: [
      { time: 'Day 1 - 10:00 AM', activity: 'Inaugural Address & Booth Setup' },
      { time: 'Day 1 - 01:30 PM', activity: 'Jury Evaluation across 5 Streams' },
      { time: 'Day 2 - 03:00 PM', activity: 'State Innovation Grant Announcements' }
    ],
    prizes: [
      { rank: 'State Innovation Champion', amount: '₹1,00,000', perks: 'State Patent Grant + Startup Chhattisgarh Incubation' },
      { rank: 'Best Sustainability Solution', amount: '₹60,000', perks: 'Research Sponsorship' }
    ],
    contactEmail: 'innovation@csvtu.ac.in',
    contactPhone: '+91 788 2261311'
  },
  {
    id: 'techfest-iitb-2026',
    title: 'Techfest IIT Bombay — Asia’s Largest Science & Tech Fest',
    tagline: 'International Robowars, Technoholix & Smart Cities Hackathon',
    category: 'Hackathon',
    college: 'Indian Institute of Technology (IIT), Bombay',
    shortCollege: 'IIT Bombay',
    city: 'Mumbai, MH',
    isRegional: false,
    venue: 'IIT Bombay Campus, Powai, Mumbai',
    mode: 'Hybrid',
    startDate: 'Dec 18, 2026',
    endDate: 'Dec 21, 2026',
    deadline: 'Dec 08, 2026',
    prizePool: '₹12,00,000',
    entryFee: 'Free',
    registeredCount: 4200,
    teamSize: '2 - 4 Members',
    tags: ['Global Hackathon', 'Autonomous Systems', 'Quantum Computing', 'AI Agents'],
    organizerClub: 'Techfest Core Committee, IIT Bombay',
    bannerGradient: 'from-purple-950/80 via-slate-900 to-black',
    accentColor: '#A855F7',
    isFeatured: true,
    isHot: true,
    highlights: [
      'Over 1,75,000+ national and international footfall',
      'Panels featuring Nobel Laureates & Tech Titans',
      'National Hackathon with Google, Microsoft, and Qualcomm problem statements'
    ],
    description: 'Techfest is recognized as Asia’s largest science and technology festival with participants competing from across India and over 40+ countries worldwide.',
    schedule: [
      { time: 'Day 1 - 08:30 AM', activity: 'Registration & International Pavilion Opening' },
      { time: 'Day 1 - 11:00 AM', activity: 'Keynote & AI Hackathon Kickoff' },
      { time: 'Day 3 - 05:00 PM', activity: 'Technoholix Drone Light Show & Awards' }
    ],
    prizes: [
      { rank: 'Grand Champion', amount: '₹4,00,000', perks: 'Global Accelerator Fast-Track + International Media Feature' },
      { rank: 'Runner Up', amount: '₹2,50,000', perks: 'Silicon Valley Mentorship' }
    ],
    contactEmail: 'admin@techfest.org',
    contactPhone: '+91 22 2576 4000'
  },
  {
    id: 'kshitij-iitkgp-2026',
    title: 'Kshitij 2026 — IIT Kharagpur Techno-Management Fest',
    tagline: 'Case Studies, Algorithmic Trading Simulations & Data Science Cup',
    category: 'Technical',
    college: 'Indian Institute of Technology (IIT), Kharagpur',
    shortCollege: 'IIT Kharagpur',
    city: 'Kharagpur, WB',
    isRegional: false,
    venue: 'IIT Kharagpur Campus, Main Building',
    mode: 'Hybrid',
    startDate: 'Jan 16, 2027',
    endDate: 'Jan 18, 2027',
    deadline: 'Jan 05, 2027',
    prizePool: '₹6,50,000',
    entryFee: 'Free',
    registeredCount: 2800,
    teamSize: '1 - 3 Members',
    tags: ['Data Science', 'Quant Finance', 'Business Case', 'Machine Learning'],
    organizerClub: 'Technology Students’ Gymkhana, IIT KGP',
    bannerGradient: 'from-emerald-950/80 via-slate-900 to-black',
    accentColor: '#10B981',
    isFeatured: false,
    isHot: false,
    highlights: [
      'Certified by UNESCO and Make in India',
      'Real-world financial datasets provided by leading quantitative hedge funds',
      'Campus recruitment direct shortlist passes'
    ],
    description: 'Kshitij is the annual techno-management festival of IIT Kharagpur, blending computer science rigor with investment banking and consulting challenges.',
    schedule: [
      { time: 'Day 1 - 10:00 AM', activity: 'Quant Finance Simulation Start' },
      { time: 'Day 2 - 02:00 PM', activity: 'Data Science Model Benchmark Submission' }
    ],
    prizes: [
      { rank: 'Data Cup Champion', amount: '₹1,50,000', perks: 'Hedge Fund Interview Guarantee' },
      { rank: 'Case Master', amount: '₹1,00,000', perks: 'Consulting Fellowship' }
    ],
    contactEmail: 'support@ktj.in',
    contactPhone: '+91 3222 282 000'
  }
];

export const COLLEGE_LIST = [
  'All Colleges',
  'NIT Raipur',
  'IIIT Naya Raipur',
  'Rungta College (RCET/RSR)',
  'BIT Durg',
  'CSVTU University',
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
