import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { X, ChevronRight, ChevronLeft, Sparkles, Rocket, ShieldCheck, Play, ArrowRight, Compass, Award } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface StoryChapter {
  id: string;
  chapterNumber: string;
  title: string;
  tagline: string;
  realm: string;
  bgImage: string;
  accentColor: string;
  description: string;
  highlights: string[];
  statLabel: string;
  statValue: string;
  ctaText: string;
  targetCategory: string;
}

const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapter-1-vigyaan',
    chapterNumber: 'CHAPTER 01',
    realm: 'THE BIO-TREE OF SCIENCE',
    title: 'Vigyaan — Central India’s Largest Science & Tech Exhibition',
    tagline: 'Originated in 2007 at NIT Raipur: Where Ancient Scientific Inquiry Meets Modern Hardware Engineering',
    bgImage: 'https://technocracy.nitrr.ac.in/static/media/bio_tree.bafa793d1e5f2e6243c0.webp',
    accentColor: '#10B981',
    description: 'Vigyaan represents the roots of Team Technocracy. Established nearly two decades ago at NIT Raipur, it is a multi-disciplinary exhibition where students across 12 engineering branches construct functional working prototypes evaluated directly by senior scientists and industrial patent cells.',
    highlights: [
      '12 Engineering Branches: CSE, IT, Mechanical, Electrical, Mining, Metallurgy, Biotech, and Chemical',
      'Direct State Patent Grants assistance from NIT Raipur IPR & Innovation Cell',
      'Over ₹1,00,000 in direct prototype funding for top sustainable hardware innovations'
    ],
    statLabel: 'Engineering Branches',
    statValue: '12 Disciplines',
    ctaText: 'Explore Vigyaan Exhibition',
    targetCategory: 'Technical'
  },
  {
    id: 'chapter-2-ignite',
    chapterNumber: 'CHAPTER 02',
    realm: 'THE METROPOLIS OF IDEAS',
    title: 'Ignite — Distinguished Guest Lecture Series',
    tagline: 'Illuminating Minds: Keynote Addresses by ISRO Scientists & Global Tech Pioneers',
    bgImage: 'https://technocracy.nitrr.ac.in/static/media/ignite_bg.9dd46df8654ae413028d.webp',
    accentColor: '#06B6D4',
    description: 'Ignite is the intellectual beacon of Aavartan. Taking place in the iconic Main Auditorium of NIT Raipur, it brings national defense scientists, space agency pioneers, and tech leaders to inspire thousands of passionate student delegates.',
    highlights: [
      'Keynotes from ISRO Satellite Center leaders, aerospace innovators, and AI founders',
      'Live Q&A panels and high-level technical symposium discussions',
      'Direct networking opportunities for prospective researchers and student fellows'
    ],
    statLabel: 'Symposium Attendees',
    statValue: '10,000+ Students',
    ctaText: 'View Keynote Schedule',
    targetCategory: 'Workshop'
  },
  {
    id: 'chapter-3-arenas',
    chapterNumber: 'CHAPTER 03',
    realm: 'THE ARENAS OF CHAMPIONS',
    title: 'Aavartan 2026 — 30+ High-Octane Technical Battlegrounds',
    tagline: 'Where Algorithms Clash & Heavy Metal Sparks Fly Across NIT Raipur Campus',
    bgImage: 'https://technocracy.nitrr.ac.in/static/media/event.91b5ee11360ca6c1e5c2.webp',
    accentColor: '#F59E0B',
    description: 'Aavartan is the culmination of Central India’s competitive spirit. Spanning Hall S-4, Central Computer Center (CCC Lab), Central Ground, and outdoor obstacle tracks, it challenges hackers, roboticists, designers, and gamers to conquer 30+ specialized tech arenas.',
    highlights: [
      'DSA Marathon & Code Sprint Relay in CCC Lab with sub-millisecond execution leaderboards',
      'Heavyweight 30kg RoboWars enclosed cage match with flippers and spinning weapons',
      'Night-time FPV Drone Racing grand prix circuit over Central Lawn',
      'Valorant 1 Gbps optical fiber LAN tournament championship'
    ],
    statLabel: 'Combined Cash Prizes',
    statValue: '₹3,50,000+',
    ctaText: 'Enter The 12 Arenas',
    targetCategory: 'Hackathon'
  }
];

interface AavartanStoryExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCategory?: (category: string) => void;
}

export const AavartanStoryExperience: React.FC<AavartanStoryExperienceProps> = ({
  isOpen,
  onClose,
  onNavigateToCategory,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const chapter = STORY_CHAPTERS[currentIdx];

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIdx < STORY_CHAPTERS.length - 1) {
        haptics.playClick();
        setCurrentIdx(prev => prev + 1);
      }
      if (e.key === 'ArrowLeft' && currentIdx > 0) {
        haptics.playClick();
        setCurrentIdx(prev => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIdx, onClose]);

  // Ambient 3D Three.js particle overlay on story canvas
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Floating bioluminescent spore particles
    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      scales[i] = Math.random() * 0.8 + 0.3;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      color: 0x10b981,
      size: 0.35,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      particles.rotation.y = elapsed * 0.04;
      particles.rotation.x = Math.sin(elapsed * 0.03) * 0.1;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/95 select-none animate-in fade-in">
      
      {/* Dynamic Realm Background Image with Cinematic Pan & Zoom */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={chapter.id}
            src={chapter.bgImage}
            alt={chapter.title}
            initial={{ scale: 1.15, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.45 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full h-full object-cover object-center filter brightness-[0.75]"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/80" />
      </div>

      {/* Three.js Ambient Particle WebGL Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-10 w-full h-full" 
      />

      {/* Top Header Bar */}
      <div className="absolute top-0 inset-x-0 z-30 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-heading font-black tracking-widest text-sm text-white uppercase">
            CHRONICLES OF AAVARTAN & VIGYAAN • NIT RAIPUR
          </span>
        </div>

        <button
          onClick={() => {
            haptics.playClick();
            onClose();
          }}
          className="p-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-white transition-all cursor-pointer shadow-lg"
          title="Exit Story Experience"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Chapter Story Presentation */}
      <div className="relative z-20 max-w-4xl w-full mx-auto px-6 py-12 flex flex-col justify-between min-h-[580px] text-left">
        
        {/* Realm Header */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {chapter.chapterNumber}
            </span>
            <span className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">
              {chapter.realm}
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3">
            {chapter.title}
          </h2>

          <p className="font-mono text-xs sm:text-sm text-neutral-300 mb-6 max-w-2xl leading-relaxed">
            {chapter.tagline}
          </p>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl mb-6">
            {chapter.description}
          </p>

          {/* Highlights & Pillars */}
          <div className="space-y-2 mb-8 max-w-2xl">
            {chapter.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-black/50 border border-neutral-800/80 backdrop-blur-md text-xs text-neutral-200">
                <span className="text-emerald-400 font-mono">✦</span>
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Controls & Chapter Progress */}
        <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Chapter Telemetry Stat */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">{chapter.statLabel}</span>
              <span className="text-emerald-400 font-bold text-base">{chapter.statValue}</span>
            </div>
            <div className="text-neutral-700">|</div>
            <div>
              <span className="text-neutral-500 block text-[10px] uppercase">Authentic Records</span>
              <span className="text-white font-bold text-sm">technocracy.nitrr.ac.in</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Step navigation */}
            <div className="flex items-center gap-1.5 mr-2">
              {STORY_CHAPTERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    haptics.playClick();
                    setCurrentIdx(i);
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    i === currentIdx ? 'w-8 bg-emerald-400' : 'w-2 bg-neutral-700 hover:bg-neutral-500'
                  }`}
                  title={`Jump to Chapter ${i + 1}`}
                />
              ))}
            </div>

            {currentIdx > 0 && (
              <button
                onClick={() => {
                  haptics.playClick();
                  setCurrentIdx(prev => prev - 1);
                }}
                className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Previous Chapter"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {currentIdx < STORY_CHAPTERS.length - 1 ? (
              <button
                onClick={() => {
                  haptics.playClick();
                  setCurrentIdx(prev => prev + 1);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition-all cursor-pointer font-heading shadow-lg"
              >
                <span>Next Chapter</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  haptics.playClick();
                  onClose();
                  if (onNavigateToCategory) onNavigateToCategory('All Categories');
                }}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-black transition-all cursor-pointer font-heading shadow-[0_0_25px_rgba(16,185,129,0.4)]"
              >
                <span>{chapter.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
