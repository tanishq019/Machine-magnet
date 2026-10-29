import React, { useState, useMemo } from 'react';
import { LEARNING_RESOURCES } from '../../data/mockData';
import { LearningResource } from '../../types';
import { Search, BookOpen, Clock, ArrowUpRight, FileText, CheckCircle2, X } from 'lucide-react';

export const ResourceLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeResource, setActiveResource] = useState<LearningResource | null>(null);

  const categories = ['All', 'AI/ML', 'Programming', 'Data Science', 'Developer Tools', 'Workshop Guides'];

  const filteredResources = useMemo(() => {
    return LEARNING_RESOURCES.filter((res) => {
      const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
      const matchesSearch =
        res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section
      id="resources"
      className="py-20 md:py-28 border-b border-[var(--color-border)] relative"
      aria-labelledby="resources-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-3">
              OPEN-ACCESS CURRICULUM
            </div>
            <h2
              id="resources-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2"
            >
              The Machine Magnets Library.
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
              Curated PyTorch roadmaps, Triton kernel walkthroughs, quantization cheat sheets, and starter templates open to the engineering community.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, papers..."
              aria-label="Search resources by title or topic"
              className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] mb-10 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[var(--color-accent)] text-white shadow-sm font-semibold'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]">
            <BookOpen className="w-8 h-8 text-[var(--color-text-secondary)] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
              No matching resources found
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Try adjusting your search query or switching categories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="group p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/70 flex flex-col justify-between transition-all duration-200"
              >
                <div>
                  {/* Category and Difficulty */}
                  <div className="flex items-center justify-between text-xs font-mono mb-3">
                    <span className="text-[var(--color-accent)] font-semibold uppercase">{res.type}</span>
                    <span className="text-[var(--color-text-secondary)]">{res.difficulty}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-2">
                    {res.title}
                  </h3>

                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4">
                    {res.description}
                  </p>

                  {/* Topics List (Zero-Pill) */}
                  <div className="text-[11px] font-mono text-[var(--color-text-secondary)] flex flex-wrap items-center gap-1 mb-4">
                    {res.topics.map((t, idx) => (
                      <React.Fragment key={t}>
                        <span>{t}</span>
                        {idx < res.topics.length - 1 && <span className="opacity-40">·</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Footer metadata & Action */}
                <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{res.readTime}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveResource(res)}
                    className="text-[var(--color-accent)] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read Material</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

      {/* Resource Modal View */}
      {activeResource && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resource-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveResource(null)}
              className="absolute top-4 right-4 p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
              aria-label="Close resource modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono text-[var(--color-accent)] uppercase mb-2">
              {activeResource.category} · {activeResource.difficulty} Level
            </div>

            <h3 id="resource-modal-title" className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              {activeResource.title}
            </h3>

            <div className="text-xs font-mono text-[var(--color-text-secondary)] mb-4">
              Curated by: {activeResource.author} · {activeResource.readTime}
            </div>

            <div className="p-4 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] mb-6 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {activeResource.description}
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-2">Syllabus Breakdown</h4>
              <ul className="space-y-1.5 text-xs text-[var(--color-text-primary)] font-mono">
                {activeResource.topics.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-500">
                Verified NIET Academic Material
              </span>

              <button
                type="button"
                onClick={() => {
                  alert(`Opened link for "${activeResource.title}". Material is verified on Machine Magnets knowledge base.`);
                  setActiveResource(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-colors cursor-pointer"
              >
                Access Full Notebook
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
