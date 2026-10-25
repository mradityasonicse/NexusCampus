import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ShieldCheck, Sparkles, Navigation, MapPin } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

interface CampusNode {
  name: string;
  shortName: string;
  city: string;
  coords: [number, number]; // 3D coordinates on plane
  fest: string;
  prizePool: string;
  color: number;
  domain: string;
  activeEvents: number;
}

const CAMPUS_NODES: CampusNode[] = [
  {
    name: 'NIT Raipur (National Institute of Tech)',
    shortName: 'NIT Raipur',
    city: 'Raipur (G.E. Road)',
    coords: [-2.2, 0.8],
    fest: 'Aavartan 2026 & Vigyaan',
    prizePool: '₹4,50,000',
    color: 0x10b981, // Emerald
    domain: 'technocracy.nitrr.ac.in',
    activeEvents: 3,
  },
  {
    name: 'IIIT Naya Raipur (DSPM IIITNR)',
    shortName: 'IIIT-NR',
    city: 'Naya Raipur (Sector 24)',
    coords: [2.0, 1.4],
    fest: 'Technovate 2026',
    prizePool: '₹3,00,000',
    color: 0x06b6d4, // Cyan
    domain: 'iiitnr.ac.in',
    activeEvents: 2,
  },
  {
    name: 'Rungta Group of Institutions',
    shortName: 'Rungta Bhilai',
    city: 'Bhilai-Raipur Twin City',
    coords: [-1.4, -1.2],
    fest: 'VYOM 2026 (SIH Nodal Center)',
    prizePool: '₹2,50,000',
    color: 0xa855f7, // Purple
    domain: 'rungta.ac.in',
    activeEvents: 2,
  },
  {
    name: 'BIT Durg (Bhilai Institute of Tech)',
    shortName: 'BIT Durg',
    city: 'Durg (G.E. Road)',
    coords: [-3.0, -1.8],
    fest: 'OJAS 2026 (IEEE & CSI)',
    prizePool: '₹2,00,000',
    color: 0xf59e0b, // Amber
    domain: 'bitdurg.ac.in',
    activeEvents: 1,
  },
  {
    name: 'CSVTU State Technical University',
    shortName: 'CSVTU Bhilai',
    city: 'Newai, Bhilai',
    coords: [0.2, -2.0],
    fest: 'UTKARSH State Expo',
    prizePool: '₹1,50,000',
    color: 0x3b82f6, // Blue
    domain: 'csvtu.ac.in',
    activeEvents: 1,
  },
];

interface CampusHoloMapProps {
  onSelectCollege?: (collegeName: string) => void;
}

export const CampusHoloMap: React.FC<CampusHoloMapProps> = ({ onSelectCollege }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] = useState<CampusNode>(CAMPUS_NODES[0]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 420;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070b, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 7.5, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Holographic Ground Grid
    const gridHelper = new THREE.GridHelper(16, 32, 0x10b981, 0x1e293b);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Concentric Radar Rings
    const ringGeo = new THREE.RingGeometry(2, 2.04, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide, opacity: 0.35, transparent: true });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    scene.add(ringMesh);

    const ringGeo2 = new THREE.RingGeometry(5, 5.05, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x10b981, side: THREE.DoubleSide, opacity: 0.2, transparent: true });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 2;
    scene.add(ringMesh2);

    // 3. Ambient & Point Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x10b981, 3, 20);
    pointLight.position.set(0, 5, 2);
    scene.add(pointLight);

    // 4. College Pylons & Beacons
    const pylonGroup = new THREE.Group();
    const pylonMeshes: THREE.Mesh[] = [];

    CAMPUS_NODES.forEach((node) => {
      // Base beacon cylinder
      const cylGeo = new THREE.CylinderGeometry(0.18, 0.25, 1.4, 16);
      const cylMat = new THREE.MeshStandardMaterial({
        color: node.color,
        emissive: node.color,
        emissiveIntensity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      });
      const pylon = new THREE.Mesh(cylGeo, cylMat);
      pylon.position.set(node.coords[0], 0.7, node.coords[1]);
      pylon.userData = { node };
      pylonGroup.add(pylon);
      pylonMeshes.push(pylon);

      // Top glowing sphere
      const sphereGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.set(node.coords[0], 1.5, node.coords[1]);
      pylonGroup.add(sphere);

      // Light beam shooting upwards
      const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 5, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: node.color,
        transparent: true,
        opacity: 0.25,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(node.coords[0], 4, node.coords[1]);
      pylonGroup.add(beam);
    });

    scene.add(pylonGroup);

    // 5. Connecting Fiber Lines between Campuses
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35 });
    for (let i = 0; i < CAMPUS_NODES.length; i++) {
      for (let j = i + 1; j < CAMPUS_NODES.length; j++) {
        const points = [];
        points.push(new THREE.Vector3(CAMPUS_NODES[i].coords[0], 0.2, CAMPUS_NODES[i].coords[1]));
        // Arc peak
        const midX = (CAMPUS_NODES[i].coords[0] + CAMPUS_NODES[j].coords[0]) / 2;
        const midZ = (CAMPUS_NODES[i].coords[1] + CAMPUS_NODES[j].coords[1]) / 2;
        points.push(new THREE.Vector3(midX, 1.2, midZ));
        points.push(new THREE.Vector3(CAMPUS_NODES[j].coords[0], 0.2, CAMPUS_NODES[j].coords[1]));

        const curve = new THREE.QuadraticBezierCurve3(points[0], points[1], points[2]);
        const curvePoints = curve.getPoints(24);
        const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
        const line = new THREE.Line(lineGeo, lineMaterial);
        scene.add(line);
      }
    }

    // 6. Interactive Mouse Drag & Raycasting
    let isDragging = false;
    let prevMouseX = 0;
    let rotationAngle = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX;
        rotationAngle += deltaX * 0.005;
        scene.rotation.y = rotationAngle;
        prevMouseX = e.clientX;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // 7. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle auto-rotation if not dragging
      if (!isDragging) {
        scene.rotation.y += 0.0015;
      }

      // Pulse radar rings
      ringMesh.rotation.z += 0.005;
      ringMesh2.rotation.z -= 0.003;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight || 420;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="p-6 rounded-3xl bg-gradient-to-b from-white/[0.04] to-black/80 border border-white/[0.08] relative overflow-hidden backdrop-blur-xl">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
              3D SPATIAL RADAR
            </span>
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CENTRAL INDIA TECH CORRIDOR
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-lg sm:text-xl text-white mt-1">
            Holographic Campus Telemetry Grid
          </h2>
          <p className="text-xs text-slate-400">
            Interactive 3D coordinate space linking NIT Raipur, IIIT-NR, Rungta, BIT Durg & CSVTU. (Click or drag to rotate 3D view)
          </p>
        </div>

        {/* Selected Campus Quick Dossier */}
        <div className="px-4 py-3 rounded-2xl bg-[#030508] border border-white/[0.1] flex items-center gap-4">
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase">Active Node Selected</div>
            <div className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
              <span>{selectedNode.shortName}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-[11px] font-mono text-emerald-400">
              {selectedNode.fest} • {selectedNode.prizePool}
            </div>
          </div>

          <button
            onClick={() => {
              haptics.playClick();
              if (onSelectCollege) onSelectCollege(selectedNode.shortName);
            }}
            className="px-3 py-1.5 rounded-xl bg-emerald-400 text-black font-heading font-bold text-xs hover:bg-emerald-300 transition-all cursor-pointer whitespace-nowrap"
          >
            Filter Events ↵
          </button>
        </div>
      </div>

      {/* 3D WebGL Canvas Viewport */}
      <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl bg-[#020408] border border-white/[0.06] overflow-hidden">
        <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

        {/* On-Canvas Telemetry HUD Overlay */}
        <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/[0.08] text-[10px] font-mono text-slate-300 space-y-1">
          <div className="text-cyan-400 font-bold flex items-center gap-1">
            <Navigation className="w-3 h-3" /> RAIPUR JUNCTION RADIAL: 32 KM
          </div>
          <div>FIBER BACKBONE: 10 Gbps NKN ACTIVE</div>
          <div>COORDINATE SYNC: EPSG:4326</div>
        </div>

        {/* Node Switcher Floating Bar */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CAMPUS_NODES.map((node) => (
            <button
              key={node.shortName}
              onClick={() => {
                haptics.playClick();
                setSelectedNode(node);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap border ${
                selectedNode.shortName === node.shortName
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-[0_0_15px_-3px_rgba(16,185,129,0.4)]'
                  : 'bg-black/60 text-slate-400 border-white/[0.08] hover:text-white hover:bg-black/80'
              }`}
            >
              📍 {node.shortName}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
