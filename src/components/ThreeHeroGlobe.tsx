import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface CampusPin {
  name: string;
  shortCode: string;
  lat: number; // For spherical projection
  lon: number;
  color: number;
  fest: string;
  prize: string;
}

const CAMPUS_PINS: CampusPin[] = [
  { name: 'NIT Raipur', shortCode: 'NITRR', lat: 21.24, lon: 81.60, color: 0x10B981, fest: 'Aavartan 2026', prize: '₹3.5L' },
  { name: 'IIIT Naya Raipur', shortCode: 'IIITNR', lat: 21.12, lon: 81.76, color: 0x06B6D4, fest: 'Technovate 2026', prize: '₹4.0L' },
  { name: 'Rungta Bhilai', shortCode: 'RCET', lat: 21.21, lon: 81.38, color: 0xF59E0B, fest: 'VYOM 2026', prize: '₹2.5L' },
  { name: 'BIT Durg', shortCode: 'BITD', lat: 21.19, lon: 81.28, color: 0x8B5CF6, fest: 'OJAS 2026', prize: '₹1.5L' },
  { name: 'CSVTU University', shortCode: 'CSVTU', lat: 21.15, lon: 81.31, color: 0x3B82F6, fest: 'UTKARSH Expo', prize: '₹3.0L' },
  { name: 'IIT Bombay', shortCode: 'IITB', lat: 19.13, lon: 72.91, color: 0xA855F7, fest: 'Techfest 2026', prize: '₹15.0L' },
  { name: 'IIT Kharagpur', shortCode: 'IITKGP', lat: 22.31, lon: 87.31, color: 0x10B981, fest: 'Kshitij 2026', prize: '₹7.5L' },
  { name: 'Smart India Hackathon', shortCode: 'SIH', lat: 28.61, lon: 77.20, color: 0xF59E0B, fest: 'SIH 2026 Pan-India', prize: '₹1.0Cr+' },
];

// Helper to convert lat/long to 3D Cartesian coordinates on sphere radius R
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export const ThreeHeroGlobe: React.FC<{ onSelectCollege?: (code: string) => void }> = ({ onSelectCollege }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredPin, setHoveredPin] = useState<CampusPin | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const globeRadius = 1.9;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Inner Wireframe Core
    const coreGeo = new THREE.IcosahedronGeometry(globeRadius * 0.96, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 2. Outer Particle Shell (Constellation Points)
    const particleCount = 1400;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const colorEmerald = new THREE.Color(0x10b981);
    const colorCyan = new THREE.Color(0x06b6d4);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      // Golden Spiral distribution on sphere
      const y = 1 - (i / (particleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = 2.39996323 * i; // Golden ratio angle

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const r = globeRadius * (1 + (Math.random() - 0.5) * 0.06);
      positions[i * 3] = x * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = z * r;

      const rand = Math.random();
      const ptColor = rand > 0.6 ? colorEmerald : rand > 0.2 ? colorCyan : colorWhite;
      colors[i * 3] = ptColor.r;
      colors[i * 3 + 1] = ptColor.g;
      colors[i * 3 + 2] = ptColor.b;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particles);

    // 3. Orbital Concentric Cyber Rings
    const ringMat1 = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.3 });
    const ringMat2 = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.25 });
    
    const ringGeo1 = new THREE.BufferGeometry();
    const ringPoints1: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      ringPoints1.push(new THREE.Vector3(Math.cos(angle) * (globeRadius * 1.25), 0, Math.sin(angle) * (globeRadius * 1.25)));
    }
    ringGeo1.setFromPoints(ringPoints1);
    const ringMesh1 = new THREE.Line(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 4;
    ringMesh1.rotation.y = Math.PI / 6;
    globeGroup.add(ringMesh1);

    const ringGeo2 = new THREE.BufferGeometry();
    const ringPoints2: THREE.Vector3[] = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      ringPoints2.push(new THREE.Vector3(Math.cos(angle) * (globeRadius * 1.4), 0, Math.sin(angle) * (globeRadius * 1.4)));
    }
    ringGeo2.setFromPoints(ringPoints2);
    const ringMesh2 = new THREE.Line(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 5;
    ringMesh2.rotation.z = Math.PI / 3;
    globeGroup.add(ringMesh2);

    // 4. Interactive Campus Beacon Pins
    const pinGroup = new THREE.Group();
    const pinMeshes: THREE.Mesh[] = [];

    CAMPUS_PINS.forEach((pin) => {
      const pos = latLonToVector3(pin.lat, pin.lon, globeRadius);

      // Beacon Dot
      const beaconGeo = new THREE.SphereGeometry(0.065, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({ color: pin.color });
      const beacon = new THREE.Mesh(beaconGeo, beaconMat);
      beacon.position.copy(pos);
      beacon.userData = { pin };
      pinGroup.add(beacon);
      pinMeshes.push(beacon);

      // Light Beam radiating outward
      const normal = pos.clone().normalize();
      const beamEnd = pos.clone().add(normal.clone().multiplyScalar(0.45));
      const beamPoints = [pos, beamEnd];
      const beamGeo = new THREE.BufferGeometry().setFromPoints(beamPoints);
      const beamMat = new THREE.LineBasicMaterial({ color: pin.color, transparent: true, opacity: 0.75, linewidth: 2 });
      const beam = new THREE.Line(beamGeo, beamMat);
      pinGroup.add(beam);

      // Orbiting satellite ring around beacon head
      const satGeo = new THREE.RingGeometry(0.09, 0.105, 16);
      const satMat = new THREE.MeshBasicMaterial({ color: pin.color, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
      const sat = new THREE.Mesh(satGeo, satMat);
      sat.position.copy(beamEnd);
      sat.lookAt(new THREE.Vector3(0, 0, 0));
      pinGroup.add(sat);
    });
    globeGroup.add(pinGroup);

    // Initial orientation focusing on Central India
    globeGroup.rotation.y = 1.2;
    globeGroup.rotation.x = 0.35;

    // 5. Mouse Interaction & Inertial Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0.35;
    let targetRotationY = 1.2;
    let isInteracting = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isInteracting = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = normX;
      mouseY = normY;

      if (isInteracting) {
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        targetRotationY += deltaX * 0.006;
        targetRotationX += deltaY * 0.006;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      }

      // Raycasting for pin hover
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(normX, normY), camera);
      const intersects = raycaster.intersectObjects(pinMeshes);
      if (intersects.length > 0) {
        const found = intersects[0].object.userData.pin as CampusPin;
        setHoveredPin(found);
        container.style.cursor = 'pointer';
      } else {
        setHoveredPin(null);
        container.style.cursor = isInteracting ? 'grabbing' : 'grab';
      }
    };

    const handlePointerUp = () => {
      isInteracting = false;
    };

    const handleClick = () => {
      if (hoveredPin && onSelectCollege) {
        onSelectCollege(hoveredPin.name);
      }
    };

    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle continuous rotation when not dragging
      if (!isInteracting) {
        targetRotationY += 0.0022;
        // Subtle tilt oscillation based on mouse position
        targetRotationX = 0.35 + mouseY * 0.2;
      }

      // Smooth spring damping
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetRotationX - globeGroup.rotation.x) * 0.05;

      // Rotate cyber rings at independent velocities
      ringMesh1.rotation.z = elapsedTime * 0.15;
      ringMesh2.rotation.z = -elapsedTime * 0.18;

      // Pulse core wireframe
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.02;
      coreMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Complete Teardown & Garbage Collection
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('click', handleClick);

      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat1.dispose();
      ringMat2.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [hoveredPin, onSelectCollege]);

  return (
    <div className="relative w-full h-full min-h-[380px] sm:min-h-[460px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Mount */}
      <div 
        ref={containerRef} 
        className="w-full h-full min-h-[380px] sm:min-h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center" 
      />

      {/* Real-time Hovered Campus Telemetry HUD */}
      {hoveredPin ? (
        <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-20 p-3 sm:p-4 rounded-xl bg-neutral-950/90 border border-emerald-500/40 backdrop-blur-md shadow-2xl transition-all duration-200 pointer-events-none text-left max-w-xs animate-in fade-in zoom-in-95">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              {hoveredPin.shortCode} Active Node
            </span>
            <span className="text-[10px] font-mono text-neutral-400 font-semibold">{hoveredPin.prize}</span>
          </div>
          <h4 className="font-heading font-bold text-white text-sm line-clamp-1">{hoveredPin.name}</h4>
          <p className="text-xs text-neutral-300 font-mono mt-0.5">Fest: {hoveredPin.fest}</p>
          <div className="mt-2 pt-2 border-t border-neutral-800 flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>Lat: {hoveredPin.lat}° N</span>
            <span>Lon: {hoveredPin.lon}° E</span>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-3 left-4 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm text-[11px] font-mono text-neutral-400">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Interactive 3D Constellation • Drag to Rotate • Click Beacon</span>
        </div>
      )}
    </div>
  );
};
