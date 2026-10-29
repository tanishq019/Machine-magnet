import React, { useRef, useState, useEffect } from 'react';
import { Layers, Terminal, Sparkles } from 'lucide-react';

export const ScrollExpand: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start expansion when top enters bottom of viewport, finish when top reaches 20%
      const start = windowHeight;
      const end = windowHeight * 0.2;
      const current = rect.top;

      let progress = (start - current) / (start - end);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Compute interpolated scale, radius, and width
  // Scale from 0.88 to 1.0, border radius from 24px to 0px
  const widthPercent = 86 + scrollProgress * 14;
  const borderRadius = 20 * (1 - scrollProgress);
  const scrimOpacity = 0.45 + scrollProgress * 0.25;

  return (
    <div
      ref={containerRef}
      className="relative w-full py-12 md:py-20 flex flex-col items-center justify-center overflow-hidden"
      aria-label="Interactive Lab Visual Story Transition"
    >
      <div
        className="relative transition-all duration-150 ease-out overflow-hidden shadow-2xl border border-[var(--color-border)]"
        style={{
          width: `${widthPercent}%`,
          maxWidth: '1380px',
          borderRadius: `${borderRadius}px`,
          height: 'min(70vh, 560px)'
        }}
      >
        {/* Background Image: Research Lab Workstations */}
        <img
          src="/src/assets/images/club_workspace_lab_1793252596964.jpg"
          alt="Machine Magnets research laboratory at NIET campus with student engineers working on neural network architectures"
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: `scale(${1 + scrollProgress * 0.06})`
          }}
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Dynamic Dark Scrim Overlay for Maximum Legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 pointer-events-none transition-opacity"
          style={{ opacity: scrimOpacity }}
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-between text-white pointer-events-none">
          {/* Top Indicators */}
          <div className="flex items-center justify-between text-xs font-mono tracking-widest text-white/80">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
              <span>THE MACHINE MAGNETS EXPERIMENTAL LAB</span>
            </span>
            <span className="hidden sm:inline-block text-white/60">
              NIET KNOWLEDGE PARK II · LAB 402
            </span>
          </div>

          {/* Bottom Editorial Narrative */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#FF343C] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CULTURE OF RIGOR & OPEN COLLABORATION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-3 leading-tight">
              Where theoretical mathematics transforms into working intelligence.
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-4">
              We operate an open engineering sandbox where undergraduate innovators train vision models, optimize Triton kernels, and prototype autonomous systems on real hardware.
            </p>

            {/* Quick Stats Pill Replacement */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400 pt-2 border-t border-white/15">
              <span>3,800+ GPU Compute Hours</span>
              <span aria-hidden="true">·</span>
              <span>26 Edge Testbeds Deployed</span>
              <span aria-hidden="true">·</span>
              <span>100% Student Driven</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
