export interface SoloHacker {
  id: string;
  name: string;
  avatar: string;
  college: string;
  branchYear: string;
  primaryRole: 'Frontend Dev' | 'Backend Dev' | 'AI / ML Engineer' | 'UI/UX Designer' | 'Full-Stack' | 'Blockchain / Web3';
  skills: string[];
  bio: string;
  lookingFor: string;
  targetEvent: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  availability: 'Immediate (Looking for Team)' | 'Forming Team (Need 1 more)' | 'Booked';
  rating: number; // peer credibility rating
  pastHackathonsWon: number;
}

export const SAMPLE_HACKERS: SoloHacker[] = [
  {
    id: 'hacker-1',
    name: 'Aarav Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    college: 'NIT Raipur',
    branchYear: 'B.Tech CSE — 3rd Year',
    primaryRole: 'AI / ML Engineer',
    skills: ['PyTorch', 'LangChain', 'FastAPI', 'Vector DBs', 'Computer Vision'],
    bio: 'Building autonomous agent workflows and RAG systems. Won Smart India Hackathon internal round. Need a solid frontend + UI designer for HackNITR!',
    lookingFor: 'Looking for a clean React/Tailwind frontend developer and a UI designer to build full working MVP.',
    targetEvent: 'HackNITR 6.0',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    availability: 'Forming Team (Need 1 more)',
    rating: 4.9,
    pastHackathonsWon: 3
  },
  {
    id: 'hacker-2',
    name: 'Priya Verma',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    college: 'IIIT Naya Raipur',
    branchYear: 'B.Tech DSAI — 2nd Year',
    primaryRole: 'UI/UX Designer',
    skills: ['Figma', 'Framer', 'Design Systems', 'Micro-interactions', 'User Research'],
    bio: 'Obsessed with dark cyber aesthetics, Bento grids, and 0ms friction UX. Can deliver complete Figma design tokens in 6 hours.',
    lookingFor: 'Seeking passionate backend and full-stack devs for upcoming central India hackathons.',
    targetEvent: 'HackNITR 6.0 / OJAS BIT Durg',
    portfolioUrl: 'https://bento.me',
    availability: 'Immediate (Looking for Team)',
    rating: 5.0,
    pastHackathonsWon: 2
  },
  {
    id: 'hacker-3',
    name: 'Rohan Dewangan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    college: 'Rungta College (RCET Bhilai)',
    branchYear: 'B.Tech IT — 4th Year',
    primaryRole: 'Full-Stack',
    skills: ['Next.js 15', 'Node.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker'],
    bio: 'Shipped 4 production SaaS projects. I build fast APIs and clean responsive frontends with sub-100ms response times.',
    lookingFor: 'Need an AI/ML teammate or domain expert to tackle real-world problem statements.',
    targetEvent: 'VYOM 2026 CodeSprint',
    githubUrl: 'https://github.com',
    availability: 'Immediate (Looking for Team)',
    rating: 4.8,
    pastHackathonsWon: 4
  },
  {
    id: 'hacker-4',
    name: 'Ananya Sahu',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    college: 'BIT Durg',
    branchYear: 'B.Tech CSE — 3rd Year',
    primaryRole: 'Frontend Dev',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
    bio: 'Frontend enthusiast focused on fluid animations, keyboard navigation, and responsive layouts down to 360px.',
    lookingFor: 'Looking for backend API developer and Web3 smart contract engineer.',
    targetEvent: 'OJAS BIT Durg CTF & Hack',
    githubUrl: 'https://github.com',
    availability: 'Forming Team (Need 1 more)',
    rating: 4.9,
    pastHackathonsWon: 1
  },
  {
    id: 'hacker-5',
    name: 'Kunal Agrawal',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    college: 'CSVTU University Campus',
    branchYear: 'M.Tech Embedded Systems — 1st Year',
    primaryRole: 'Blockchain / Web3',
    skills: ['Solidity', 'Rust', 'Anchor', 'EVM', 'Ethers.js', 'Smart Contract Auditing'],
    bio: 'Specialized in DeFi protocols and verifiable decentralized computation. Deployed multiple smart contracts on Polygon and Arbitrum.',
    lookingFor: 'Need full-stack web3 frontend developer for national hackathon track.',
    targetEvent: 'Techfest IIT Bombay',
    githubUrl: 'https://github.com',
    availability: 'Immediate (Looking for Team)',
    rating: 4.7,
    pastHackathonsWon: 2
  }
];
