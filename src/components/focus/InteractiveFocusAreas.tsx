import React, { useState } from 'react';
import { FOCUS_AREAS } from '../../data/mockData';
import { FocusArea } from '../../types';
import { Compass, Cpu, Database, Network, BookOpen, ArrowRight, Code } from 'lucide-react';

export const InteractiveFocusAreas: React.FC<{ onProjectSelect?: (projectId: string) => void }> = ({
  onProjectSelect
}) => {
  const [selectedId, setSelectedId] = useState<string>(FOCUS_AREAS[0].id);

  const activeArea = FOCUS_AREAS.find((area) => area.id === selectedId) || FOCUS_AREAS[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'deep-learning':
        return <Network className="w-4 h-4" />;
      case 'generative-ai':
        return <Compass className="w-4 h-4" />;
      case 'edge-computing':
        return <Cpu className="w-4 h-4" />;
      case 'data-engineering':
        return <Database className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <section
      id="focus-areas"
      className="py-20 md:py-28 border-b border-[var(--color-border)] relative overflow-hidden"
      aria-labelledby="focus-areas-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-3">
            TECHNICAL DOMAINS & LAB CLUSTERS
          </div>
          <h2
            id="focus-areas-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-4 text-balance"
          >
            Interconnected realms of machine intelligence.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)]">
            Select a magnetic research node to inspect active curriculum paths, student repositories, and production testbeds currently active inside Lab 402.
          </p>
        </div>

        {/* Interactive Magnetic Domain Node Selector Strip */}
        <div
          role="tablist"
          aria-label="Focus Areas"
          className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-10 border-b border-[var(--color-border)]/60"
        >
          {FOCUS_AREAS.map((area, idx) => {
            const isSelected = area.id === selectedId;
            return (
              <button
                key={area.id}
                role="tab"
                id={`tab-${area.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${area.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedId(area.id)}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${
                  isSelected
                    ? 'bg-[var(--color-accent)] text-white font-semibold shadow-sm'
                    : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border)]'
                }`}
              >
                <span className={isSelected ? 'text-white' : 'text-[var(--color-accent)]'}>
                  {getIcon(area.id)}
                </span>
                <span>{area.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Focus Area Detail Panel */}
        <div
          id={`panel-${activeArea.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeArea.id}`}
          className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-10 transition-all duration-300"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 7 Columns: Narrative, Core Topics, Tech Stack */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider mb-2">
                <span>CLUSTER IDENTITY</span>
                <span aria-hidden="true">·</span>
                <span>{activeArea.id.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                {activeArea.title}
              </h3>
              <p className="text-sm font-medium text-[var(--color-accent)] mb-4">
                {activeArea.tagline}
              </p>
              <p className="text-sm sm:text-base text-[var(--color-text-secondary)] leading-relaxed mb-6">
                {activeArea.description}
              </p>

              {/* Core Topics Checklist */}
              <div className="mb-6">
                <div className="text-xs font-mono uppercase text-[var(--color-text-secondary)] tracking-wider mb-3">
                  Syllabus & Research Vectors
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-[var(--color-text-primary)]">
                  {activeArea.coreTopics.map((topic) => (
                    <div
                      key={topic}
                      className="p-2.5 rounded-md bg-[var(--color-surface-elevated)] border border-[var(--color-border)]/50 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Used (Zero Pill Text with Separators) */}
              <div className="pt-4 border-t border-[var(--color-border)]/60">
                <div className="text-xs font-mono uppercase text-[var(--color-text-secondary)] tracking-wider mb-2">
                  Toolchain & Runtimes
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--color-text-primary)]">
                  {activeArea.techStack.map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span className="hover:text-[var(--color-accent)] transition-colors">{tech}</span>
                      {i < activeArea.techStack.length - 1 && (
                        <span className="text-[var(--color-text-secondary)] opacity-60">/</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Visual Metrics & Active Project Links */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-6 lg:border-l lg:border-[var(--color-border)]/60">
              
              {/* Metrics Box */}
              <div className="p-5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
                <div className="text-xs font-mono uppercase text-[var(--color-text-secondary)] tracking-wider mb-4">
                  Lab Cluster Benchmarks
                </div>
                <div className="space-y-3">
                  {activeArea.visualMetrics.map((m) => (
                    <div key={m.label} className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]/40 last:border-0 last:pb-0">
                      <span className="text-xs text-[var(--color-text-secondary)]">{m.label}</span>
                      <span className="text-sm font-bold font-mono text-[var(--color-text-primary)] tabular-nums">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Projects in this Cluster */}
              <div className="p-5 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
                <div className="text-xs font-mono uppercase text-[var(--color-text-secondary)] tracking-wider mb-3">
                  Featured Repositories
                </div>
                <div className="space-y-2">
                  {activeArea.activeProjects.map((pName) => (
                    <div
                      key={pName}
                      className="p-3 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-between hover:border-[var(--color-accent)] transition-colors group"
                    >
                      <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-text-primary)]">
                        <Code className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                        <span>{pName}</span>
                      </div>
                      <a
                        href="#projects"
                        className="text-[11px] font-mono text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] flex items-center gap-1 transition-colors"
                      >
                        <span>View</span>
                        <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
