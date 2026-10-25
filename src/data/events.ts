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
