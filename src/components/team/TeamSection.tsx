import React, { useState } from 'react';
import { MEMBERS } from '../../data/mockData';
import { Member } from '../../types';
import { Github, Linkedin, Award, ArrowUpRight, X, User } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [activeMemberModal, setActiveMemberModal] = useState<Member | null>(null);

  const groups = ['All', 'Core Leadership', 'Research & Engineering', 'Mentorship & Advisory'];

  const filteredMembers = MEMBERS.filter(
    (m) => selectedGroup === 'All' || m.group === selectedGroup
  );

  return (
    <section
      id="team"
      className="py-20 md:py-28 border-b border-[var(--color-border)] relative"
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-3">
              LEADERSHIP & RESEARCH CELLS
            </div>
            <h2
              id="team-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2"
            >
              The minds behind the magnetism.
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
              Student researchers, system builders, and faculty mentors guiding collaborative AI engineering across the NIET campus.
            </p>
          </div>

          {/* Role Group Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] overflow-x-auto no-scrollbar">
            {groups.map((group) => {
              const isActive = selectedGroup === group;
              return (
                <button
                  key={group}
                  type="button"
                  onClick={() => setSelectedGroup(group)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-accent)] text-white shadow-sm font-semibold'
                      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]'
                  }`}
                >
                  {group}
                </button>
              );
            })}
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/70 rounded-xl p-6 flex flex-col justify-between card-hover-tilt"
            >
              <div>
                {/* Header: Role tag & Avatar placeholder */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-accent)] group-hover:border-[var(--color-accent)] transition-colors">
                    <User className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
                    {member.year}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
                  {member.name}
                </h3>

                <div className="text-xs font-medium text-[var(--color-accent)] mb-2">
                  {member.role}
                </div>

                <div className="text-xs text-[var(--color-text-secondary)] mb-4 font-mono">
                  {member.department}
                </div>

                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Research Interests (Zero-Pill Text with Separators) */}
                <div className="pt-3 border-t border-[var(--color-border)]/50 text-[11px] font-mono text-[var(--color-text-secondary)] flex flex-wrap items-center gap-1">
                  {member.researchInterests.map((interest, i) => (
                    <React.Fragment key={interest}>
                      <span>{interest}</span>
                      {i < member.researchInterests.length - 1 && <span className="opacity-40">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bottom Action Row */}
              <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveMemberModal(member)}
                  className="text-xs font-semibold text-[var(--color-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Profile & Projects</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>

                <div className="flex items-center gap-2">
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                      aria-label={`${member.name}'s GitHub`}
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                      aria-label={`${member.name}'s LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Member Profile Drawer Modal */}
      {activeMemberModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="member-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setActiveMemberModal(null)}
              className="absolute top-4 right-4 p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
              aria-label="Close member modal"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono text-[var(--color-accent)] uppercase mb-1">
              {activeMemberModal.group} · {activeMemberModal.year}
            </div>

            <h3 id="member-modal-title" className="text-2xl font-bold text-[var(--color-text-primary)] mb-1">
              {activeMemberModal.name}
            </h3>

            <div className="text-sm font-medium text-[var(--color-accent)] mb-2">
              {activeMemberModal.role}
            </div>

            <div className="text-xs text-[var(--color-text-secondary)] font-mono mb-4">
              {activeMemberModal.department}
            </div>

            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
              {activeMemberModal.bio}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-2">Verified Badges</h4>
                <div className="flex flex-wrap items-center gap-2">
                  {activeMemberModal.badges.map((b) => (
                    <span key={b} className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)]">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      <span>{b}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-2">Key Lab Projects</h4>
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--color-text-primary)]">
                  {activeMemberModal.projects.map((p) => (
                    <span key={p} className="px-2.5 py-1 rounded bg-[var(--color-surface-elevated)] border border-[var(--color-border)]">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-3">
                {activeMemberModal.github && (
                  <a
                    href={activeMemberModal.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub Profile</span>
                  </a>
                )}
                {activeMemberModal.linkedin && (
                  <a
                    href={activeMemberModal.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-primary)] hover:text-[var(--color-accent)]"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActiveMemberModal(null)}
                className="px-4 py-2 text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
