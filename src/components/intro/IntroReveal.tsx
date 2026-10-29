import React, { useEffect, useState } from 'react';
import { LogoEmblem } from '../brand/Logo';

interface IntroRevealProps {
  onComplete: () => void;
  forceReplay?: boolean;
}

export const IntroReveal: React.FC<IntroRevealProps> = ({ onComplete, forceReplay = false }) => {
  const [phase, setPhase] = useState<'field' | 'converge' | 'resolve' | 'exit'>('field');
  const [isSkipped, setIsSkipped] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    // Sequence timer: 1.35 seconds total
    const t1 = setTimeout(() => setPhase('converge'), 350);
    const t2 = setTimeout(() => setPhase('resolve'), 800);
    const t3 = setTimeout(() => setPhase('exit'), 1350);
    const t4 = setTimeout(() => {
      onComplete();
    }, 1650);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    setPhase('exit');
    setTimeout(() => {
      onComplete();
    }, 250);
  };

  return (
    <div
      role="dialog"
      aria-label="Machine Magnets Brand Reveal"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080808] text-[#F0ECE8] transition-opacity duration-500 ${
        phase === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Animated Magnetic Field Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
        <svg width="800" height="800" viewBox="0 0 800 800" className="w-full max-w-3xl aspect-square">
          <ellipse
            cx="400"
            cy="400"
            rx="320"
            ry="180"
            fill="none"
            stroke="rgba(240, 236, 232, 0.2)"
            strokeWidth="1.5"
            strokeDasharray="6 8"
            className="transition-transform duration-1000 ease-out"
            style={{
              transform: phase === 'field' ? 'scale(0.8) rotate(-15deg)' : 'scale(1) rotate(0deg)',
              transformOrigin: 'center'
            }}
          />
          <ellipse
            cx="400"
            cy="400"
            rx="240"
            ry="120"
            fill="none"
            stroke="#ED2028"
            strokeWidth="1.5"
            strokeDasharray="4 6"
            className="transition-transform duration-1000 ease-out opacity-60"
            style={{
              transform: phase === 'field' ? 'scale(1.2) rotate(20deg)' : 'scale(1) rotate(0deg)',
              transformOrigin: 'center'
            }}
          />
        </svg>
      </div>

      {/* Center Brand Assembly */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Converging Emblem */}
        <div
          className="transition-all duration-700 ease-out"
          style={{
            transform:
              phase === 'field'
                ? 'scale(0.7) translateY(10px)'
                : phase === 'converge'
                ? 'scale(1.1) translateY(0)'
                : 'scale(1) translateY(0)',
            opacity: phase === 'field' ? 0.4 : 1
          }}
        >
          <LogoEmblem size={72} className="text-[#F0ECE8]" />
        </div>

        {/* Resolving Wordmark */}
        <div
          className="mt-6 flex flex-col items-center transition-all duration-500 ease-out"
          style={{
            opacity: phase === 'resolve' || phase === 'exit' ? 1 : 0,
            transform: phase === 'resolve' || phase === 'exit' ? 'translateY(0)' : 'translateY(8px)'
          }}
        >
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-tight text-2xl md:text-3xl text-[#F0ECE8]">
              MACHINE
            </span>
            <span className="font-extrabold tracking-tight text-2xl md:text-3xl text-[#ED2028]">
              MAGNETS
            </span>
          </div>
          <span className="text-xs font-mono tracking-widest text-[#AAA5A2] uppercase mt-1">
            NIET · ARTIFICIAL INTELLIGENCE & MACHINE LEARNING
          </span>
        </div>
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 px-4 py-2 text-xs font-mono text-[#AAA5A2] hover:text-[#F0ECE8] border border-white/10 hover:border-white/30 rounded-md transition-colors bg-white/5 backdrop-blur-sm cursor-pointer"
        aria-label="Skip Brand Introduction"
      >
        Skip Reveal [ESC]
      </button>
    </div>
  );
};
