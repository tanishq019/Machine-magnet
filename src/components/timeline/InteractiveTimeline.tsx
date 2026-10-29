import React, { useState, useRef, useEffect } from 'react';
import { TIMELINE } from '../../data/mockData';
import { Milestone } from '../../types';
import { ChevronLeft, ChevronRight, Calendar, Flag, Sparkles, TrendingUp } from 'lucide-react';

export const InteractiveTimeline: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeMilestone = TIMELINE[activeIdx];
  const total = TIMELINE.length;

  const scrollToMilestone = (index: number) => {
    const nextIdx = Math.max(0, Math.min(total - 1, index));
    setActiveIdx(nextIdx);

    if (trackRef.current) {
      const items = trackRef.current.querySelectorAll('.timeline-node');
      if (items[nextIdx]) {
        (items[nextIdx] as HTMLElement).scrollIntoView({
          behavior: 'smooth',
          inline: 'center',
          block: 'nearest'
        });
      }
    }
  };

  const handlePrev = () => {
    scrollToMilestone(activeIdx - 1);
  };

  const handleNext = () => {
    scrollToMilestone(activeIdx + 1);
  };

  // Keyboard navigation when timeline is focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      handleNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      handlePrev();
    }
  };

  // Wheel handling: advance horizontally without trapping vertical page scroll
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    const isScrollingDown = e.deltaY > 0;
    const isScrollingUp = e.deltaY < 0;

    const maxScrollLeft = track.scrollWidth - track.clientWidth;
    const canScrollRight = track.scrollLeft < maxScrollLeft - 2;
    const canScrollLeft = track.scrollLeft > 2;

    if ((isScrollingDown && canScrollRight) || (isScrollingUp && canScrollLeft)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }
  };

  const progressPercentage = ((activeIdx) / (total - 1)) * 100;

  return (
    <section
      id="timeline"
      ref={containerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      className="py-20 md:py-28 border-b border-[var(--color-border)] relative focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
      aria-labelledby="timeline-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-3">
              JOURNEY OF COLLABORATIVE INTELLIGENCE
            </div>
            <h2
              id="timeline-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2"
            >
              The Machine Magnets Epochs.
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
              From our founding lab cohorts in 2023 to national hackathon victories and autonomous edge models.
            </p>
          </div>

          {/* Navigation Controls & Progress Counter */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-xs font-mono text-[var(--color-text-secondary)]">
              Epoch <span className="text-[var(--color-accent)] font-bold tabular-nums">{activeIdx + 1}</span> of {total}
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIdx === 0}
                className="p-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                aria-label="Previous Milestone"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={activeIdx === total - 1}
                className="p-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                aria-label="Next Milestone"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Continuous Horizontal Magnetic Progress Track */}
        <div className="relative mb-12">
          {/* Background Track Line */}
          <div className="absolute top-6 left-0 right-0 h-[2px] bg-[var(--color-border)] z-0" />
          
          {/* Active Progress Red Line */}
          <div
            className="absolute top-6 left-0 h-[2px] bg-[var(--color-accent)] transition-all duration-300 z-0"
            style={{ width: `${progressPercentage}%` }}
          />

          {/* Scrollable Node Track */}
          <div
            ref={trackRef}
            onWheel={handleWheel}
            className="relative z-10 flex items-center justify-between gap-8 overflow-x-auto py-2 no-scrollbar px-2"
          >
            {TIMELINE.map((item, idx) => {
              const isActive = idx === activeIdx;
              const isPast = idx < activeIdx;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToMilestone(idx)}
                  className="timeline-node flex flex-col items-center group cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg p-2"
                  aria-label={`${item.year}: ${item.title}`}
                >
                  {/* Node Circle */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs transition-all duration-200 border-2 ${
                      isActive
                        ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-white scale-110 shadow-md ring-4 ring-[var(--color-accent)]/20'
                        : isPast
                        ? 'bg-[var(--color-surface-elevated)] border-[var(--color-accent)] text-[var(--color-accent)]'
                        : 'bg-[var(--color-surface)] border-[var(--color-border)] text-[var(--color-text-secondary)] group-hover:border-[var(--color-text-secondary)]'
                    }`}
                  >
                    {item.year.slice(2)}
                  </div>

                  {/* Year & Tag label */}
                  <div className="mt-3 text-center">
                    <div
                      className={`text-xs font-mono font-bold transition-colors ${
                        isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {item.year}
                    </div>
                    <div className="text-[10px] text-[var(--color-text-secondary)] max-w-[100px] truncate">
                      {item.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Milestone Expanded Detail Card */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-10 transition-all duration-300 relative overflow-hidden">
          {/* Subtle Top Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-accent)]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 Columns: Narrative & Context */}
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[var(--color-text-secondary)] mb-3">
                <span className="flex items-center gap-1.5 text-[var(--color-accent)] font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{activeMilestone.date}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-[var(--color-text-primary)] uppercase">{activeMilestone.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                {activeMilestone.title}
              </h3>

              <div className="text-sm font-medium text-[var(--color-accent)] mb-4">
                {activeMilestone.subtitle}
              </div>

              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {activeMilestone.description}
              </p>

              {/* Verified Highlight Box */}
              <div className="p-4 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-start gap-3 text-xs sm:text-sm text-[var(--color-text-primary)]">
                <Sparkles className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[var(--color-accent)]">Key Milestone Impact: </strong>
                  {activeMilestone.highlightText}
                </span>
              </div>
            </div>

            {/* Right 4 Columns: Concrete Metric & Navigation Quick Jump */}
            <div className="lg:col-span-4 flex flex-col justify-between h-full lg:pl-6 lg:border-l lg:border-[var(--color-border)]/60">
              <div className="p-5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] mb-4">
                <div className="text-xs font-mono uppercase text-[var(--color-text-secondary)] tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  <span>Verified Epoch Metric</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-mono tabular-nums">
                  {activeMilestone.metric}
                </div>
              </div>

              {/* Prev / Next Quick Switcher Bar */}
              <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-secondary)] pt-4 border-t border-[var(--color-border)]/40">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={activeIdx === 0}
                  className="hover:text-[var(--color-accent)] disabled:opacity-20 cursor-pointer flex items-center gap-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <span>{activeIdx + 1} / {total}</span>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={activeIdx === total - 1}
                  className="hover:text-[var(--color-accent)] disabled:opacity-20 cursor-pointer flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
