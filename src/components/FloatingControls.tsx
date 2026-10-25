import React, { useState, useEffect } from 'react';
import { ArrowUp, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { haptics } from '../utils/audioHaptics';

export const FloatingControls: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    haptics.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    haptics.enabled = !nextState;
    if (!nextState) haptics.playClick();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      {/* Audio Haptics Toggle */}
      <button
        onClick={toggleMute}
        className="w-10 h-10 rounded-full bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-400 hover:text-white backdrop-blur-md flex items-center justify-center shadow-lg transition-all cursor-pointer"
        title={isMuted ? 'Unmute Audio Haptics' : 'Mute Audio Haptics'}
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
      </button>

      {/* Floating Scroll-to-Top Button (Technocracy Hallmark) */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-emerald-500/90 hover:bg-emerald-400 text-black border border-emerald-400/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:scale-110 active:scale-95 transition-all cursor-pointer animate-in fade-in zoom-in-75"
          title="Scroll back to top"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5]" />
        </button>
      )}
    </div>
  );
};
