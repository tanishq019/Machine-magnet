import React, { useState, useMemo } from 'react';
import { PROJECTS } from '../../data/mockData';
import { Project } from '../../types';
import { Search, Github, ExternalLink, Copy, Check, Star, Code2, Users, Layers, X } from 'lucide-react';

export const ProjectShowcase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', 'Computer Vision', 'Generative AI', 'Edge Computing', 'Systems & Data'];

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((project) => {
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const featuredProject = filteredProjects.find((p) => p.id === 'deepflux') || filteredProjects[0];
  const secondaryProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  const handleCopyLink = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}#project-${projectId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(projectId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-28 border-b border-[var(--color-border)] relative"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-3">
              OPEN-SOURCE LAB ARTIFACTS
            </div>
            <h2
              id="projects-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2"
            >
              Engineered by student minds.
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
              Production neural pipelines, edge acceleration runtimes, and distributed data systems created and maintained by Machine Magnets cohorts at NIET.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects or tech..."
              aria-label="Search projects by title, description or technology"
              className="w-full pl-10 pr-4 py-2 text-xs font-mono bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                aria-label="Clear search query"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Functional Category Filter Bar */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] mb-10 overflow-x-auto no-scrollbar">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
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

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)]">
            <Code2 className="w-8 h-8 text-[var(--color-text-secondary)] mx-auto mb-3" />
            <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-1">
              No matching projects found
            </h3>
            <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mx-auto mb-4">
              We couldn't find any repositories matching "{searchQuery}". Try searching for PyTorch, CUDA, or resetting your filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 text-xs font-mono text-[var(--color-accent)] border border-[var(--color-accent)] rounded-md hover:bg-[var(--color-accent)] hover:text-white transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            
            {/* Dominant Featured Project Card */}
            {featuredProject && (
              <div
                className="group bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/80 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  
                  {/* Left 7 Columns: Media Showcase */}
                  <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-black">
                    <img
                      src={featuredProject.image}
                      alt={featuredProject.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)]/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Status & Category Overlays */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-white border border-white/10">
                        FEATURED SYSTEM
                      </span>
                      <span className="px-2.5 py-1 rounded bg-[var(--color-accent)] text-white font-semibold">
                        {featuredProject.status}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-2 rounded border border-white/10">
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                        <span>Contributors: {featuredProject.contributors.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span className="tabular-nums">{featuredProject.stars}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right 5 Columns: Technical Spec & Links */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider mb-2">
                        {featuredProject.category}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)] mb-2">
                        {featuredProject.title}
                      </h3>
                      <p className="text-xs sm:text-sm font-medium text-[var(--color-text-secondary)] mb-4">
                        {featuredProject.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                        {featuredProject.description}
                      </p>

                      {/* Technical Benchmarks */}
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-[var(--color-surface-elevated)] border border-[var(--color-border)] mb-6 text-center">
                        {featuredProject.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="text-[10px] font-mono text-[var(--color-text-secondary)]">{m.label}</div>
                            <div className="text-sm font-bold font-mono text-[var(--color-text-primary)] tabular-nums">{m.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack (Unboxed Text with Separators) */}
                      <div className="text-xs font-mono text-[var(--color-text-primary)] flex flex-wrap items-center gap-1.5 mb-6">
                        {featuredProject.techStack.map((tech, i) => (
                          <React.Fragment key={tech}>
                            <span className="text-[var(--color-text-secondary)]">{tech}</span>
                            {i < featuredProject.techStack.length - 1 && (
                              <span className="text-[var(--color-text-secondary)] opacity-40">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex items-center justify-between pt-4 border-t border-[var(--color-border)]">
                      <div className="flex items-center gap-3">
                        <a
                          href={featuredProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--color-text-primary)] hover:text-white bg-[var(--color-surface-elevated)] hover:bg-[var(--color-accent)] border border-[var(--color-border)] rounded-md transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Repository</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => setSelectedProject(featuredProject)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[var(--color-accent)] hover:text-white hover:bg-[var(--color-accent)] border border-[var(--color-accent)]/50 rounded-md transition-colors cursor-pointer"
                        >
                          <span>Deep Dive Spec</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleCopyLink(featuredProject.id, e)}
                        className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
                        title="Copy direct project link"
                        aria-label="Copy direct link to DeepFlux project"
                      >
                        {copiedId === featuredProject.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            )}

            {/* Secondary Projects Grid */}
            {secondaryProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {secondaryProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/70 rounded-xl overflow-hidden flex flex-col justify-between card-hover-tilt"
                  >
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5 text-[10px] font-mono px-2 py-0.5 rounded bg-black/70 text-white border border-white/10">
                          {project.category}
                        </div>
                        <div className="absolute top-2.5 right-2.5 text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-accent)] text-white font-medium">
                          {project.status}
                        </div>
                      </div>

                      <div className="p-5">
                        <div className="flex items-center justify-between text-xs font-mono text-[var(--color-text-secondary)] mb-1">
                          <span className="flex items-center gap-1 text-amber-500">
                            <Star className="w-3 h-3 fill-amber-500" />
                            <span className="tabular-nums">{project.stars}</span>
                          </span>
                          <span>NIET LABS</span>
                        </div>

                        <h4 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
                          {project.title}
                        </h4>

                        <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-4 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tech Stack */}
                        <div className="text-[11px] font-mono text-[var(--color-text-secondary)] flex flex-wrap items-center gap-1 pt-3 border-t border-[var(--color-border)]/50">
                          {project.techStack.map((tech, i) => (
                            <React.Fragment key={tech}>
                              <span>{tech}</span>
                              {i < project.techStack.length - 1 && <span className="opacity-40">·</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-4 px-5 bg-[var(--color-surface-elevated)]/50 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
                      <button
                        type="button"
                        onClick={() => setSelectedProject(project)}
                        className="text-[var(--color-accent)] font-semibold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <span>Inspect Architecture</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => handleCopyLink(project.id, e)}
                          className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                          title="Copy link"
                          aria-label={`Copy link to ${project.title}`}
                        >
                          {copiedId === project.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                          aria-label={`View GitHub repository for ${project.title}`}
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] cursor-pointer"
              aria-label="Close project modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider mb-2">
              {selectedProject.category} · {selectedProject.status}
            </div>

            <h3 id="modal-project-title" className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
              {selectedProject.title}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mb-6">
              {selectedProject.subtitle}
            </p>

            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-6 border border-[var(--color-border)]">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-4 mb-6 text-xs sm:text-sm text-[var(--color-text-secondary)]">
              <h4 className="font-bold text-[var(--color-text-primary)]">Architecture & Engineering Highlights</h4>
              <ul className="space-y-2 list-disc list-inside">
                {selectedProject.highlights.map((h, i) => (
                  <li key={i} className="leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-2">Verified Contributors</h4>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[var(--color-text-primary)]">
                {selectedProject.contributors.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Repository</span>
              </a>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
              >
                Close Spec
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
