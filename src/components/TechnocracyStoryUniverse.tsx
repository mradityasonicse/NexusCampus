import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import {
  Volume2,
  VolumeX,
  Compass,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Award,
  Zap,
  Play,
  Calendar,
  MapPin,
  ExternalLink,
  ChevronRight,
  Radio,
  Eye,
  Maximize2,
  Cpu,
  Layers,
  Flame,
  Globe2
} from 'lucide-react';
import { type CollegeEvent, SAMPLE_EVENTS } from '../data/events';
import { haptics } from '../utils/audioHaptics';

interface TechnocracyStoryUniverseProps {
  onSelectEvent: (event: CollegeEvent) => void;
  onSwitchToDirectory: () => void;
}

interface Chapter {
  id: string;
  actLabel: string;
  title: string;
  subtitle: string;
  quote: string;
  author: string;
  bgUrl: string;
  logoUrl?: string;
  accentColor: string;
  themeClass: string;
  summary: string;
  stats: { label: string; value: string }[];
  actionLabel: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 'prologue',
    actLabel: 'ACT 00 • PROLOGUE',
    title: 'THE GENESIS OF TECHNOCRACY',
    subtitle: '18 Years of Engineering Excellence & Innovation Coalition (NIT Raipur 2007–2026)',
    quote: 'Yesterday is history, tomorrow is a mystery, but today is a gift. That is why it is called the present.',
    author: 'Official Motto of Team Technocracy, NIT Raipur',
    bgUrl: 'https://technocracy.nitrr.ac.in/static/media/homebg.406c62c60c3a2f5d9531.webp',
    logoUrl: 'https://technocracy.nitrr.ac.in/static/media/tcLogo-min.5cc6fefd048634dc6667.webp',
    accentColor: '#10B981',
    themeClass: 'from-emerald-950/80 via-slate-950/90 to-black',
    summary:
      'Born in 2007 within the historic red brick corridors of the National Institute of Technology Raipur, Team Technocracy is Central India’s premier student technical committee. Through relentless curiosity, the team unites thousands of thinkers, builders, and hackers under the sacred banner of Aavartan and Vigyaan.',
    stats: [
      { label: 'Annual Footfall', value: '10,000+' },
      { label: 'Engineering Colleges', value: '150+' },
      { label: 'Legacy of Innovation', value: '18 Years' },
      { label: 'Cumulative Prize Pool', value: '₹2.25 Cr+' }
    ],
    actionLabel: 'Enter Act I: Vigyaan'
  },
  {
    id: 'vigyaan',
    actLabel: 'ACT 01 • THE ROOTS',
    title: 'VIGYAAN: THE BIO-TREE OF SCIENCE',
    subtitle: 'Central India’s Largest Inter-Disciplinary Science & Hardware Prototype Exhibition',
    quote: 'Innovation is the outcome of a habit, not a random act.',
    author: 'Sukant Ratnakar, Author & Innovator',
    bgUrl: 'https://technocracy.nitrr.ac.in/static/media/bio_tree.bafa793d1e5f2e6243c0.webp',
    accentColor: '#10B981',
    themeClass: 'from-emerald-950/80 via-neutral-950/90 to-black',
    summary:
      'Vigyaan represents the deep scientific roots of Technocracy. Originating nearly two decades ago, it challenges students across 10 distinct engineering disciplines to transcend textbooks and forge working physical prototypes evaluated directly by senior industrial patent cells and national researchers.',
    stats: [
      { label: 'Engineering Disciplines', value: '10 Domains' },
      { label: 'Prototype Grants', value: '₹1,00,000+' },
      { label: 'IPR Cell Support', value: 'Patent Filing' },
      { label: 'Live Working Models', value: '120+ Teams' }
    ],
    actionLabel: 'Enter Act II: Ignite'
  },
  {
    id: 'ignite',
    actLabel: 'ACT 02 • THE BEACON',
    title: 'IGNITE: METROPOLIS OF IDEAS',
    subtitle: 'Distinguished Keynote Addresses by ISRO Scientists & Global Tech Founders',
    quote: 'Technology is best when it brings people together.',
    author: 'Matt Mullenweg, CEO Automattic & Founder of WordPress',
    bgUrl: 'https://technocracy.nitrr.ac.in/static/media/ignite_bg.9dd46df8654ae413028d.webp',
    logoUrl: 'https://technocracy.nitrr.ac.in/static/media/ignite_title-2.7c65951aadfd47839940.png',
    accentColor: '#06B6D4',
    themeClass: 'from-cyan-950/80 via-slate-950/90 to-black',
    summary:
      'Held inside the iconic Main Auditorium of NIT Raipur, Ignite illuminates minds with keynote lectures, fireside debates, and high-level technical symposiums delivered by space agency pioneers, national defense leaders, and visionary venture founders.',
    stats: [
      { label: 'Auditorium Seats', value: '2,500 Full' },
      { label: 'Keynote Luminaries', value: 'ISRO & AI' },
      { label: 'Student Attendees', value: '10,000+' },
      { label: 'Research Linkages', value: 'Direct Fellowships' }
    ],
    actionLabel: 'Enter Act III: Aavartan'
  },
  {
    id: 'aavartan',
    actLabel: 'ACT 03 • THE CARNIVAL',
    title: 'AAVARTAN: CELESTIAL BATTLEGROUNDS',
    subtitle: 'Where Algorithms Clash & Heavy Metal Sparks Fly Under Steampunk Skies',
    quote: 'The evening shows are a spectacle of Nrityam dance, Raaga melody, and electrifying EDM nights.',
    author: 'The Chronicles of Aavartan Cultural Archive',
    bgUrl: 'https://technocracy.nitrr.ac.in/static/media/event.91b5ee11360ca6c1e5c2.webp',
    logoUrl: 'https://technocracy.nitrr.ac.in/static/media/Aavartan_title_2.8aad4a6d1605444efc5f.png',
    accentColor: '#F59E0B',
    themeClass: 'from-amber-950/80 via-neutral-950/90 to-black',
    summary:
      'The crescendo of Central India’s competitive spirit. Over three adrenaline-fueled days across NIT Raipur’s Hall S-4, CCC Lab, and Central Ground, thousands battle in 30+ technical arenas before celebrating under twilight pro-shows and EDM beats.',
    stats: [
      { label: 'Live Arenas', value: '30+ Battlegrounds' },
      { label: 'Combined Cash Prizes', value: '₹3,50,000+' },
      { label: 'Pro EDM Footfall', value: '12,000+ Students' },
      { label: 'Merchandise Price', value: '₹350 Official' }
    ],
    actionLabel: 'Enter Act IV: The Arenas'
  },
  {
    id: 'arenas',
    actLabel: 'ACT 04 • THE BATTLEGROUNDS',
    title: 'THE 19 OFFICIAL ARENAS',
    subtitle: 'Interactive 3D Stage of NIT Raipur’s Authorized Technical Competitions',
    quote: 'Every line of code, every robot collision, and every drone lap crowns a legend.',
    author: 'Technocracy Tournament Directory 2026',
    bgUrl: 'https://technocracy.nitrr.ac.in/static/media/event.91b5ee11360ca6c1e5c2.webp',
    accentColor: '#EC4899',
    themeClass: 'from-purple-950/80 via-slate-950/90 to-black',
    summary:
      'Explore all official Technocracy competitions. Inspect official banners, prize breakdowns, venue locations, and secure your certified participation pass.',
    stats: [
      { label: 'Total Events', value: '19 Official' },
      { label: 'Primary Venues', value: 'CCC, S-4, Lawns' },
      { label: 'Prize Distribution', value: 'Instant Cash' },
      { label: 'Verification', value: 'NITRR SHA-256' }
    ],
    actionLabel: 'Explore Directory Grid'
  }
];

const VIGYAAN_BRANCHES = [
  { code: 'CSE/IT', name: 'Computer Science & Information Tech', focus: 'Distributed Systems, AI Safety, Edge Computing' },
  { code: 'ECE', name: 'Electronics & Communication', focus: '5G Micro-Antennas, RF Systems & Embedded Silicon' },
  { code: 'EE', name: 'Electrical Engineering', focus: 'Smart Grids, EV Powertrains & Renewable Inverters' },
  { code: 'MECH', name: 'Mechanical Engineering', focus: 'Additive 3D Alloys, Pneumatics & Autonomous Rovers' },
  { code: 'CIVIL', name: 'Civil & Environmental', focus: 'Carbon-Negative Concrete, Smart Cities & Water Reuse' },
  { code: 'BIOTECH', name: 'Biotechnology & Genetic Tech', focus: 'Bio-Remediation, CRISPR Sensors & Protein Folding' },
  { code: 'BIO-MED', name: 'Biomedical Engineering', focus: 'Neural Prosthetics, Low-Cost Dialysis & Telemetry' },
  { code: 'CHEMICAL', name: 'Chemical Engineering', focus: 'Green Hydrogen Catalysts & Polymer Synthesis' },
  { code: 'META', name: 'Metallurgy & Materials', focus: 'Aerospace Superalloys & Corrosion-Resistant Blades' },
  { code: 'MINING', name: 'Mining Engineering', focus: 'Autonomous Sub-Surface Shuttles & Geo-Hazard Lidar' }
];

const VIGYAAN_GALLERY = [
  'https://technocracy.nitrr.ac.in/static/media/vigyaan_1.8b9501b9bd0da29f2686.webp',
  'https://technocracy.nitrr.ac.in/static/media/vigyaan_2.1c9812d979a3f4f555c3.webp',
  'https://technocracy.nitrr.ac.in/static/media/vigyaan_3.a15ee84cd70550b4e92e.webp',
  'https://technocracy.nitrr.ac.in/static/media/vigyaan_4.c17cd443ab1655badf9a.webp',
  'https://technocracy.nitrr.ac.in/static/media/vigyaan_5.81e0f53135cd11c45fd8.webp',
  'https://technocracy.nitrr.ac.in/static/media/vigyaan_6.ba6a6b6bd686c2288d5e.webp'
];

const EVENING_GALLERY = [
  'https://technocracy.nitrr.ac.in/static/media/es_1.14ebc99901bbe63f7dc7.webp',
  'https://technocracy.nitrr.ac.in/static/media/es_2.e2b3594400cce096e1d7.webp',
  'https://technocracy.nitrr.ac.in/static/media/es_3.9dd1622683b43eea72e6.webp',
  'https://technocracy.nitrr.ac.in/static/media/es_4.2c92a0757d4f377dead3.webp',
  'https://technocracy.nitrr.ac.in/static/media/es_5.26724badf7f5dc135e7a.webp',
  'https://technocracy.nitrr.ac.in/static/media/a1.fcbf56811917e6b86373.webp'
];

export const TechnocracyStoryUniverse: React.FC<TechnocracyStoryUniverseProps> = ({
  onSelectEvent,
  onSwitchToDirectory
}) => {
  const [currentChapterIdx, setCurrentChapterIdx] = useState<number>(0);
  const [selectedBranch, setSelectedBranch] = useState<string>('CSE/IT');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [arenaFilter, setArenaFilter] = useState<string>('All');
  
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshesRef = useRef<{ [key: string]: THREE.Object3D }>({});
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const currentChapter = CHAPTERS[currentChapterIdx];

  // Filter NIT Raipur official events for Act IV
  const nitrrEvents = useMemo(() => {
    return SAMPLE_EVENTS.filter((e) => e.shortCollege === 'NIT Raipur' || e.college.includes('NIT, Raipur'));
  }, []);

  const filteredArenas = useMemo(() => {
    if (arenaFilter === 'All') return nitrrEvents;
    return nitrrEvents.filter((e) => e.category === arenaFilter);
  }, [nitrrEvents, arenaFilter]);

  // Handle Audio toggle
  const toggleAudio = () => {
    haptics.playClick();
    const newState = haptics.toggleAmbientDrone();
    setIsAudioPlaying(newState);
  };

  // Chapter Navigation
  const goToChapter = (idx: number) => {
    if (idx < 0 || idx >= CHAPTERS.length) return;
    haptics.playWarp();
    setCurrentChapterIdx(idx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoModal) {
        if (e.key === 'Escape') setActivePhotoModal(null);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentChapterIdx < CHAPTERS.length - 1) {
          goToChapter(currentChapterIdx + 1);
        } else {
          onSwitchToDirectory();
        }
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentChapterIdx > 0) {
          goToChapter(currentChapterIdx - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentChapterIdx, activePhotoModal, onSwitchToDirectory]);

  // Mouse move parallax tracker
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // WebGL Three.js 3D Engine Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 18);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Directional colored point lights
    const pointLight1 = new THREE.PointLight(0x10b981, 2, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 1.5, 50);
    pointLight2.position.set(-10, -10, 8);
    scene.add(pointLight2);

    // 1. STARFIELD / CELESTIAL PARTICLES
    const starCount = 600;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const colorA = new THREE.Color(0x10b981);
    const colorB = new THREE.Color(0x06b6d4);
    const colorC = new THREE.Color(0xf59e0b);

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 80;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 50;

      const c = i % 3 === 0 ? colorA : i % 3 === 1 ? colorB : colorC;
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 0.28,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const starPoints = new THREE.Points(starGeo, starMat);
    scene.add(starPoints);
    particlesRef.current = starPoints;

    // 2. PROLOGUE MESH: Dual Rotating Torus + Icosahedron Core
    const prologueGroup = new THREE.Group();
    const icoGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8
    });
    const icoMesh = new THREE.Mesh(icoGeo, icoMat);
    prologueGroup.add(icoMesh);

    const ringGeo = new THREE.TorusGeometry(4.2, 0.08, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.4 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    prologueGroup.add(ringMesh);

    prologueGroup.position.set(7, 0, 0);
    scene.add(prologueGroup);
    meshesRef.current.prologue = prologueGroup;

    // 3. VIGYAAN MESH: Bioluminescent Double Helix / Tree Nodes
    const vigyaanGroup = new THREE.Group();
    const helixCount = 80;
    const helixGeo = new THREE.BufferGeometry();
    const helixPos = new Float32Array(helixCount * 3);
    for (let i = 0; i < helixCount; i++) {
      const angle = i * 0.25;
      helixPos[i * 3] = Math.cos(angle) * 3;
      helixPos[i * 3 + 1] = (i - helixCount / 2) * 0.16;
      helixPos[i * 3 + 2] = Math.sin(angle) * 3;
    }
    helixGeo.setAttribute('position', new THREE.BufferAttribute(helixPos, 3));
    const helixMat = new THREE.PointsMaterial({ color: 0x10b981, size: 0.45, transparent: true, opacity: 0.9 });
    const helixMesh = new THREE.Points(helixGeo, helixMat);
    vigyaanGroup.add(helixMesh);

    vigyaanGroup.position.set(7, 0, 0);
    vigyaanGroup.visible = false;
    scene.add(vigyaanGroup);
    meshesRef.current.vigyaan = vigyaanGroup;

    // 4. IGNITE MESH: 3D Cyber Grid Plane + Cyber Monolith
    const igniteGroup = new THREE.Group();
    const gridHelper = new THREE.GridHelper(30, 20, 0x06b6d4, 0x1e293b);
    gridHelper.rotation.x = Math.PI / 2.5;
    gridHelper.position.set(0, -6, 0);
    igniteGroup.add(gridHelper);

    const monoGeo = new THREE.BoxGeometry(1.5, 6, 1.5);
    const monoMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9
    });
    const monoMesh = new THREE.Mesh(monoGeo, monoMat);
    monoMesh.position.set(6, 0, 0);
    igniteGroup.add(monoMesh);

    igniteGroup.visible = false;
    scene.add(igniteGroup);
    meshesRef.current.ignite = igniteGroup;

    // 5. AAVARTAN MESH: Clockwork Steampunk Gears
    const aavartanGroup = new THREE.Group();
    const gearGeo = new THREE.TorusGeometry(3.2, 0.4, 8, 24);
    const gearMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.9
    });
    const gearMesh1 = new THREE.Mesh(gearGeo, gearMat);
    const gearMesh2 = new THREE.Mesh(gearGeo, gearMat);
    gearMesh2.scale.set(0.65, 0.65, 0.65);
    gearMesh2.position.set(4, 2, -2);
    aavartanGroup.add(gearMesh1);
    aavartanGroup.add(gearMesh2);

    aavartanGroup.position.set(6, 0, 0);
    aavartanGroup.visible = false;
    scene.add(aavartanGroup);
    meshesRef.current.aavartan = aavartanGroup;

    // 6. ARENAS MESH: Cyber Gateway Rings
    const arenasGroup = new THREE.Group();
    const portalGeo = new THREE.TorusGeometry(4.5, 0.15, 16, 50);
    const portalMat = new THREE.MeshBasicMaterial({ color: 0xec4899, wireframe: true });
    const portalMesh = new THREE.Mesh(portalGeo, portalMat);
    arenasGroup.add(portalMesh);

    arenasGroup.position.set(6, 0, 0);
    arenasGroup.visible = false;
    scene.add(arenasGroup);
    meshesRef.current.arenas = arenasGroup;

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Rotate starfield
      if (starPoints) {
        starPoints.rotation.y = elapsedTime * 0.03;
        starPoints.rotation.x = elapsedTime * 0.015;
      }

      // Parallax smooth camera offset
      const targetCamX = mouseRef.current.x * 2.5;
      const targetCamY = mouseRef.current.y * 1.5;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.04);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.04);
      camera.lookAt(0, 0, 0);

      // Rotate active meshes
      if (icoMesh) {
        icoMesh.rotation.x = elapsedTime * 0.4;
        icoMesh.rotation.y = elapsedTime * 0.5;
      }
      if (ringMesh) {
        ringMesh.rotation.z = -elapsedTime * 0.2;
        ringMesh.rotation.x = elapsedTime * 0.1;
      }
      if (helixMesh) {
        helixMesh.rotation.y = elapsedTime * 0.6;
      }
      if (gridHelper) {
        gridHelper.position.z = (elapsedTime * 2) % 3 - 1.5;
      }
      if (gearMesh1) {
        gearMesh1.rotation.z = elapsedTime * 0.3;
      }
      if (gearMesh2) {
        gearMesh2.rotation.z = -elapsedTime * 0.45;
      }
      if (portalMesh) {
        portalMesh.rotation.z = elapsedTime * 0.25;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  // Update 3D Scene visibility based on current chapter
  useEffect(() => {
    const meshes = meshesRef.current;
    if (!meshes) return;

    const chapterId = CHAPTERS[currentChapterIdx].id;

    Object.keys(meshes).forEach((key) => {
      if (meshes[key]) {
        meshes[key].visible = key === chapterId;
      }
    });
  }, [currentChapterIdx]);

  return (
    <div className="relative w-full min-h-screen bg-[#05070B] text-slate-100 overflow-x-hidden selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* 1. Dynamic WebGL Canvas (Full-Screen Three.js Spatial Layer) */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-10 opacity-70"
      />

      {/* 2. Official Technocracy Atmospheric Photo Backdrop */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center transition-all duration-1000 transform scale-105"
        style={{
          backgroundImage: `url('${currentChapter.bgUrl}')`,
          filter: 'brightness(0.32) saturate(1.4) blur(1px)'
        }}
      />

      {/* Atmospheric Radial Gradient Overlay */}
      <div className={`fixed inset-0 pointer-events-none z-0 bg-gradient-to-b ${currentChapter.themeClass} opacity-85 transition-colors duration-1000`} />

      {/* Top HUD: Navigation & Audio Master Control */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 backdrop-blur-xl bg-black/40 border-b border-white/10 flex items-center justify-between">
        
        {/* Left: Technocracy & Nexus Identity */}
        <div className="flex items-center gap-3">
          <img
            src="https://technocracy.nitrr.ac.in/static/media/tcLogo-min.5cc6fefd048634dc6667.webp"
            alt="Technocracy NIT Raipur"
            className="w-9 h-9 rounded-full border border-emerald-500/40 object-cover shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-sm tracking-wider text-white">
                TEAM TECHNOCRACY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                NIT RAIPUR
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400">
              The 3D Chronicles of Aavartan & Vigyaan (2007–2026)
            </p>
          </div>
        </div>

        {/* Center: Chapter Quick Indicators */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => goToChapter(idx)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                idx === currentChapterIdx
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              0{idx} {ch.id.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Right: Sound Synthesizer & Directory Switcher */}
        <div className="flex items-center gap-3">
          
          {/* Ambient Synthesizer Equalizer Button */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              isAudioPlaying
                ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
            }`}
            title="Toggle Procedural Cosmic Ambient Synthesizer (Web Audio API)"
          >
            {isAudioPlaying ? <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-bold">
              {isAudioPlaying ? 'BINAURAL SYNTH: ON' : 'AUDIO: OFF'}
            </span>
            {isAudioPlaying && (
              <div className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 h-3 bg-emerald-400 animate-pulse" />
                <span className="w-0.5 h-2 bg-emerald-400 animate-bounce" />
                <span className="w-0.5 h-3.5 bg-emerald-400 animate-pulse" />
              </div>
            )}
          </button>

          {/* Switch to Arena Directory View */}
          <button
            onClick={() => {
              haptics.playClick();
              onSwitchToDirectory();
            }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-mono font-bold text-xs hover:brightness-110 transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-black" />
            <span>OPEN DIRECTORY</span>
          </button>
        </div>
      </header>

      {/* Main Chapter Content Viewport */}
      <main className="relative z-20 min-h-screen flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-24 pb-28 max-w-7xl mx-auto">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentChapter.id}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Act Badge & Chapter Indicator */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-widest bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                {currentChapter.actLabel}
              </span>
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                CHAPTER {currentChapterIdx + 1} OF {CHAPTERS.length}
              </span>
            </div>

            {/* Official Title & Logo Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-4">
              {currentChapter.logoUrl && (
                <img
                  src={currentChapter.logoUrl}
                  alt={currentChapter.title}
                  className="h-14 sm:h-16 object-contain filter drop-shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                />
              )}
              <div>
                <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                  {currentChapter.title}
                </h1>
                <p className="text-sm sm:text-lg text-emerald-300 font-mono mt-1 font-medium">
                  {currentChapter.subtitle}
                </p>
              </div>
            </div>

            {/* Famous Quote Banner */}
            <div className="my-5 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md max-w-3xl">
              <p className="text-slate-200 text-sm italic font-serif leading-relaxed">
                "{currentChapter.quote}"
              </p>
              <p className="text-[11px] font-mono text-emerald-400 mt-1">
                — {currentChapter.author}
              </p>
            </div>

            {/* Narrative Summary Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-6">
              
              <div className="lg:col-span-7 space-y-5">
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-light">
                  {currentChapter.summary}
                </p>

                {/* Telemetry Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {currentChapter.stats.map((st, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-black/60 border border-white/10 backdrop-blur-lg"
                    >
                      <div className="text-xl sm:text-2xl font-mono font-black text-emerald-400">
                        {st.value}
                      </div>
                      <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CHAPTER-SPECIFIC INTERACTIVE MODULES */}
                
                {/* 1. VIGYAAN: 10 Department Problem Statements & IPR Patent Cell */}
                {currentChapter.id === 'vigyaan' && (
                  <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-black/60 border border-emerald-500/30 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                          Vigyaan Problem Statement Explorer (10 Engineering Branches)
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        ₹1,00,000+ Prototype Grants
                      </span>
                    </div>

                    {/* Department Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {VIGYAAN_BRANCHES.map((b) => (
                        <button
                          key={b.code}
                          onClick={() => {
                            haptics.playHover();
                            setSelectedBranch(b.code);
                          }}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                            selectedBranch === b.code
                              ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                              : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                          }`}
                        >
                          {b.code}
                        </button>
                      ))}
                    </div>

                    {/* Active Department Details */}
                    {(() => {
                      const branch = VIGYAAN_BRANCHES.find((b) => b.code === selectedBranch);
                      if (!branch) return null;
                      return (
                        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-left">
                          <div className="text-sm font-bold text-white mb-1">
                            {branch.name}
                          </div>
                          <p className="text-xs text-slate-300 font-mono">
                            <span className="text-emerald-400 font-semibold">Active R&D Focus:</span> {branch.focus}
                          </p>
                          <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/10 pt-2">
                            <span>Evaluated by: NIT Raipur Senior Faculty Jury</span>
                            <span className="text-emerald-300">Patent Cell Assistance: Verified</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}

                {/* 2. AAVARTAN: Evening Shows Culture (Nrityam, Raaga & Pro-EDM) */}
                {currentChapter.id === 'aavartan' && (
                  <div className="mt-6 p-4 sm:p-6 rounded-2xl bg-black/60 border border-amber-500/30 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-400" />
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                          Evening Shows, EDM Pro-Nites & Merchandise
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        12,000+ Crowd Surge
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      The evening shows at Aavartan are a legendary spectacle: captivating dance performances by <strong>"Nrityam"</strong> (Dance Club of NIT Raipur), soul-stirring melodies by <strong>"Raaga"</strong> (Music Club of NIT Raipur), and an electrifying celebrity DJ/EDM night on Central Grounds.
                    </p>

                    <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/20 flex items-center justify-between">
                      <div>
                        <div className="text-xs font-mono font-bold text-amber-300">
                          Official Aavartan '26 Merchandise
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Slay the fest season in authentic Team Technocracy gear. Price: ₹350
                        </div>
                      </div>
                      <a
                        href="https://technocracy.nitrr.ac.in/aavartan"
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1 rounded-lg bg-amber-500 text-black text-xs font-mono font-bold hover:brightness-110 flex items-center gap-1.5"
                      >
                        <span>GET MERCH</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Chapter CTA Navigation */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    onClick={() => {
                      haptics.playClick();
                      if (currentChapterIdx < CHAPTERS.length - 1) {
                        goToChapter(currentChapterIdx + 1);
                      } else {
                        onSwitchToDirectory();
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-sm shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all cursor-pointer"
                  >
                    <span>{currentChapter.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {currentChapterIdx > 0 && (
                    <button
                      onClick={() => {
                        haptics.playClick();
                        goToChapter(currentChapterIdx - 1);
                      }}
                      className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-mono text-sm transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Dynamic Visual Showcase & Real Photo Gallery */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* ACT 00 & ACT 01: Vigyaan Photo Gallery Showcase */}
                {(currentChapter.id === 'prologue' || currentChapter.id === 'vigyaan') && (
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-emerald-400" />
                        Vigyaan Science Exhibition Live Moments
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Official NIT Raipur Gallery
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {VIGYAAN_GALLERY.map((imgUrl, i) => (
                        <div
                          key={i}
                          onClick={() => setActivePhotoModal(imgUrl)}
                          className="group relative aspect-video rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:border-emerald-500 transition-all"
                        >
                          <img
                            src={imgUrl}
                            alt={`Vigyaan Exhibition ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ACT 02: Ignite Keynote Stage Showcase */}
                {currentChapter.id === 'ignite' && (
                  <div className="p-4 rounded-2xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl space-y-3">
                    <div className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      NIT Raipur Main Auditorium Keynote Stage
                    </div>
                    
                    <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-left space-y-2">
                      <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        Distinguished Speaker Lineup
                      </div>
                      <div className="text-sm font-semibold text-white">
                        ISRO Space Agency Scientists & DeepTech Innovators
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans">
                        Fireside sessions exploring launch vehicle aerodynamics, indigenous satellite payloads, quantum algorithms, and next-generation autonomous robotics.
                      </p>
                      <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-white/10 flex items-center justify-between">
                        <span>Venue: NIT Raipur Main Audi</span>
                        <span className="text-cyan-300">Live Q&A: Enabled</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ACT 03: Evening Shows & Culture Photo Gallery */}
                {currentChapter.id === 'aavartan' && (
                  <div className="p-4 rounded-2xl bg-black/60 border border-amber-500/30 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                        <Flame className="w-3.5 h-3.5 text-amber-400" />
                        Evening Shows & EDM Pro-Nite Gallery
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        Official NIT Raipur Live
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {EVENING_GALLERY.map((imgUrl, i) => (
                        <div
                          key={i}
                          onClick={() => setActivePhotoModal(imgUrl)}
                          className="group relative aspect-video rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:border-amber-500 transition-all"
                        >
                          <img
                            src={imgUrl}
                            alt={`Evening Show ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                            <Maximize2 className="w-3.5 h-3.5 text-white" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ACT 04: The 19 Battleground Arenas 3D Card Stage */}
                {currentChapter.id === 'arenas' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-white">
                        Official Technocracy Arenas ({filteredArenas.length})
                      </span>
                      
                      {/* Category Filter */}
                      <div className="flex items-center gap-1">
                        {['All', 'Technical', 'Robotics', 'Fun'].map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setArenaFilter(cat)}
                            className={`px-2 py-0.5 rounded text-[10px] font-mono transition-all cursor-pointer ${
                              arenaFilter === cat
                                ? 'bg-emerald-500 text-black font-bold'
                                : 'bg-white/5 text-slate-400 hover:text-white'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Arena Cards Grid */}
                    <div className="grid grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
                      {filteredArenas.map((ev) => (
                        <div
                          key={ev.id}
                          onClick={() => {
                            haptics.playClick();
                            onSelectEvent(ev);
                          }}
                          className="group p-2.5 rounded-xl bg-black/80 border border-white/10 hover:border-emerald-500/60 transition-all cursor-pointer text-left backdrop-blur-md relative overflow-hidden"
                        >
                          <div className="relative aspect-video rounded-lg overflow-hidden mb-2 bg-slate-900">
                            <img
                              src={ev.coverImage}
                              alt={ev.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/70 text-emerald-400 border border-emerald-500/30">
                              {ev.prizePool}
                            </div>
                          </div>
                          
                          <div className="text-xs font-mono font-bold text-white truncate group-hover:text-emerald-300">
                            {ev.bannerArtTitle || ev.title.split('—')[0].trim()}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 truncate mt-0.5">
                            {ev.venueCode || ev.venue.split(',')[0]}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Fixed Navigation Scrubber HUD */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 px-4 sm:px-8 py-3 backdrop-blur-xl bg-black/60 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Keyboard Controls Helper */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Navigate:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white text-[10px]">
              ← Left
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white text-[10px]">
              → Right / Space
            </kbd>
          </div>

          {/* Center: Timeline Progress Scrubber */}
          <div className="flex-1 max-w-xl flex items-center gap-2">
            {CHAPTERS.map((ch, idx) => (
              <div key={ch.id} className="flex-1 flex flex-col gap-1 cursor-pointer" onClick={() => goToChapter(idx)}>
                <div
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    idx <= currentChapterIdx ? 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-white/10'
                  }`}
                />
                <span className={`text-[10px] font-mono hidden md:inline truncate ${idx === currentChapterIdx ? 'text-emerald-400 font-bold' : 'text-slate-500'}`}>
                  0{idx} {ch.id}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Chapter Switcher Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (currentChapterIdx > 0) goToChapter(currentChapterIdx - 1);
              }}
              disabled={currentChapterIdx === 0}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors cursor-pointer"
              title="Previous Act"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (currentChapterIdx < CHAPTERS.length - 1) {
                  goToChapter(currentChapterIdx + 1);
                } else {
                  onSwitchToDirectory();
                }
              }}
              className="p-2 rounded-xl bg-emerald-500 text-black font-bold hover:bg-emerald-400 transition-colors cursor-pointer"
              title={currentChapterIdx < CHAPTERS.length - 1 ? 'Next Act' : 'Enter Arena Directory'}
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Lightbox Photo Modal for Official NIT Raipur Exhibition Photos */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoModal(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhotoModal}
                alt="Enlarged Fest Moment"
                className="w-full h-auto max-h-[80vh] object-contain bg-black"
              />
              <div className="p-4 bg-neutral-900 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">
                  Official Archive • Team Technocracy, NIT Raipur
                </span>
                <button
                  onClick={() => setActivePhotoModal(null)}
                  className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white cursor-pointer"
                >
                  Close (Esc)
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
