import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CyberCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'drag' | 'warp'>('default');

  const cursorX = useSpring(0, { damping: 25, stiffness: 350 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 350 });
  const ringX = useSpring(0, { damping: 35, stiffness: 200 });
  const ringY = useSpring(0, { damping: 35, stiffness: 200 });

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element context
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, [role="button"], canvas, .cursor-pointer');
      if (interactive) {
        const title = interactive.getAttribute('title') || '';
        const text = interactive.textContent?.trim().slice(0, 12) || '';
        if (title.toLowerCase().includes('warp') || title.toLowerCase().includes('chapter')) {
          setCursorVariant('warp');
          setCursorText('WARP');
        } else if (interactive.tagName === 'CANVAS') {
          setCursorVariant('drag');
          setCursorText('DRAG 3D');
        } else {
          setCursorVariant('hover');
          setCursorText(text.length > 0 && text.length < 8 ? text.toUpperCase() : 'VIEW');
        }
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorVariant === 'hover' ? 1.8 : cursorVariant === 'drag' ? 2.2 : cursorVariant === 'warp' ? 2.4 : 1,
          borderColor: cursorVariant === 'warp' ? '#EC4899' : cursorVariant === 'drag' ? '#06B6D4' : '#10B981',
        }}
        transition={{ duration: 0.18 }}
        className="absolute w-9 h-9 rounded-full border border-emerald-400/60 shadow-[0_0_15px_rgba(16,185,129,0.35)] flex items-center justify-center backdrop-blur-[0.5px]"
      >
        {cursorText && (
          <span className="text-[8px] font-mono font-black tracking-widest text-emerald-300 drop-shadow-[0_0_5px_rgba(16,185,129,0.8)]">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner High-Precision Core Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: cursorVariant === 'default' ? 1 : 0.4,
          backgroundColor: cursorVariant === 'warp' ? '#EC4899' : '#10B981',
        }}
        className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,1)]"
      />
    </div>
  );
};
