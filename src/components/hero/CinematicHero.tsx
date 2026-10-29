import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowRight, Compass, Cpu, Zap } from 'lucide-react';

interface CinematicHeroProps {
  onExploreClick: () => void;
  onProjectsClick: () => void;
}

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onExploreClick,
  onProjectsClick
}) => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [fluxDensity, setFluxDensity] = useState('1.42 T');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });

      // Calculate dynamic flux density based on cursor distance from center
      const dx = x - 0.5;
      const dy = y - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const computedFlux = (1.2 + dist * 0.8).toFixed(2);
      setFluxDensity(`${computedFlux} T`);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden technical-grid-dark dark:technical-grid-dark light:technical-grid-light"
      aria-label="Machine Magnets Hero Section"
    >
      {/* Background Interactive Magnetic Field Illustration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-30">
        <svg
          className="w-full h-full object-cover"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dynamic Curving Field Lines influenced by mousePos */}
          <path
            d={`M 0 ${300 + mousePos.y * 60} C 400 ${100 + mousePos.y * 100}, 900 ${700 - mousePos.y * 100}, 1440 ${450 + mousePos.y * 40}`}
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
            fill="none"
          />
          <path
            d={`M 0 ${450 - mousePos.y * 40} C 500 ${650 - mousePos.x * 120}, 850 ${200 + mousePos.x * 120}, 1440 ${550 - mousePos.y * 30}`}
            stroke="var(--color-text-secondary)"
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeDasharray="4 6"
            fill="none"
          />
          <path
            d={`M 150 ${900} C 450 ${500 + mousePos.y * 80}, 850 ${400 - mousePos.y * 80}, 1200 0`}
            stroke="var(--color-accent)"
            strokeWidth="1.2"
            strokeOpacity="0.3"
            fill="none"
          />
          {/* Subtle Red Center Dipole Glow */}
          <circle
            cx={720 + (mousePos.x - 0.5) * 80}
            cy={450 + (mousePos.y - 0.5) * 60}
            r="260"
            fill="var(--color-glow)"
            className="filter blur-3xl transition-all duration-300"
          />
        </svg>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow Label */}
            <div className="flex items-center gap-2 mb-4 text-xs font-mono font-medium tracking-wider text-[var(--color-text-secondary)] uppercase">
              <span className="text-[var(--color-accent)] font-semibold">MACHINE MAGNETS</span>
              <span aria-hidden="true">/</span>
              <span>NIET GREATER NOIDA</span>
              <span aria-hidden="true">/</span>
              <span>EST. 2023</span>
            </div>

            {/* Primary & Secondary Statement */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-[var(--color-text-primary)] mb-6 text-balance">
              WE DON'T JUST STUDY THE FUTURE.
              <span className="block mt-2 text-[var(--color-accent)]">
                WE BUILD IT.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-lg sm:text-xl text-[var(--color-text-secondary)] max-w-xl leading-relaxed mb-8">
              Ideas in motion. Intelligence in action. Built together by students engineering real-world machine learning, edge robotics, and open research.
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onExploreClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-all shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                <span>Explore the club</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onProjectsClick}
                className="px-6 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] bg-[var(--color-surface)] hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border)] hover:border-[var(--color-accent)] rounded-md transition-all flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                <Compass className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Discover our work</span>
              </button>
            </div>

            {/* Live Telemetry Metadata Strip */}
            <div className="mt-10 pt-6 border-t border-[var(--color-border)]/60 flex flex-wrap items-center gap-6 text-xs font-mono text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-primary)] font-medium">B-FLUX:</span>
                <span className="text-[var(--color-accent)] font-semibold tabular-nums">{fluxDensity}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-primary)] font-medium">ACTIVE LABS:</span>
                <span className="tabular-nums">5 DOMAINS</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-primary)] font-medium">LOCATION:</span>
                <span>LAB 402, NIET</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-xl overflow-hidden border border-[var(--color-border)] shadow-xl bg-[var(--color-surface)] group">
              {/* Image Frame */}
              <div className="relative aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                <img
                  src="/src/assets/images/hero_magnetic_ai_1793252594611.jpg"
                  alt="High-contrast visualization of magnetic convergence and neural tensor fields"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/90 via-transparent to-transparent pointer-events-none" />
                
                {/* Visual Label Tag in lower corner */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
                  <span className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#ED2028]" />
                    <span>Neural Magnetic Flux Singularity</span>
                  </span>
                  <span className="text-white/60 text-[10px]">NIET AI CORE</span>
                </div>
              </div>

              {/* Sub-card data row */}
              <div className="p-4 grid grid-cols-3 gap-2 text-center border-t border-[var(--color-border)]/60 bg-[var(--color-surface)]">
                <div>
                  <div className="text-xs text-[var(--color-text-secondary)] font-medium">Members</div>
                  <div className="text-base font-bold text-[var(--color-text-primary)] tabular-nums">1,200+</div>
                </div>
                <div className="border-x border-[var(--color-border)]/50">
                  <div className="text-xs text-[var(--color-text-secondary)] font-medium">Projects</div>
                  <div className="text-base font-bold text-[var(--color-text-primary)] tabular-nums">48+</div>
                </div>
                <div>
                  <div className="text-xs text-[var(--color-text-secondary)] font-medium">Hackathons</div>
                  <div className="text-base font-bold text-[var(--color-accent)] tabular-nums">14 Wins</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Cue in Footer of Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
        <button
          type="button"
          onClick={onExploreClick}
          className="group inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
          aria-label="Scroll to enter website"
        >
          <span className="uppercase">SCROLL TO ENTER</span>
          <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-1" />
        </button>
      </div>
    </section>
  );
};
