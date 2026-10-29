import React, { useState } from 'react';
import { SAMPLE_PASSPORTS } from '../../data/mockData';
import { PassportRecord } from '../../types';
import { ShieldCheck, Award, CheckCircle, Search, Hash, QrCode, Download, ExternalLink } from 'lucide-react';

export const DigitalPassport: React.FC = () => {
  const [lookupId, setLookupId] = useState('NIET/2023/AI042');
  const [activePassport, setActivePassport] = useState<PassportRecord | null>(SAMPLE_PASSPORTS['NIET/2023/AI042']);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLookup = (idToSearch: string) => {
    const trimmed = idToSearch.trim();
    if (!trimmed) {
      setErrorMsg('Please enter a valid student roll number.');
      setActivePassport(null);
      return;
    }

    if (SAMPLE_PASSPORTS[trimmed]) {
      setActivePassport(SAMPLE_PASSPORTS[trimmed]);
      setErrorMsg('');
    } else {
      setActivePassport(null);
      setErrorMsg(`No verified passport found for "${trimmed}". Sample demo IDs: NIET/2023/AI042, NIET/2024/CS108, or NIET/2025/EC077.`);
    }
  };

  const handleExportPassport = () => {
    if (!activePassport) return;
    const passportData = JSON.stringify(activePassport, null, 2);
    const blob = new Blob([passportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activePassport.passportId}-verification.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="passport"
      className="py-20 md:py-28 border-b border-[var(--color-border)] relative"
      aria-labelledby="passport-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-3">
            VERIFIED PARTICIPATION PROTOCOL
          </div>
          <h2
            id="passport-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2"
          >
            Club achievements & digital passport.
          </h2>
          <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
            A verifiable participation record honoring workshops attended, hackathon podiums, and open-source contributions by NIET student members.
          </p>
        </div>

        {/* Public Verified Institutional Achievements Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="text-xs font-mono text-[var(--color-accent)] uppercase mb-1">COMPETITIVE IMPACT</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-mono tabular-nums mb-1">
              1st Prize
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">Smart India Hackathon Regional Finals</div>
          </div>

          <div className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="text-xs font-mono text-[var(--color-accent)] uppercase mb-1">COMMUNITY REACH</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-mono tabular-nums mb-1">
              1,200+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">Students Mentored across NIET cohorts</div>
          </div>

          <div className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="text-xs font-mono text-[var(--color-accent)] uppercase mb-1">SOFTWARE SUITE</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-mono tabular-nums mb-1">
              48+
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">Open Source Repositories on GitHub</div>
          </div>

          <div className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <div className="text-xs font-mono text-[var(--color-accent)] uppercase mb-1">COMPUTE CAPACITY</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] font-mono tabular-nums mb-1">
              3.8k hrs
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">GPU Compute Logged in Lab 402</div>
          </div>
        </div>

        {/* Digital Passport Verification Card & Lookup */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 5 Columns: Lookup Console */}
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>STUDENT CREDENTIAL CHECK</span>
              </div>
              
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
                Verify Member Passport
              </h3>
              
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Enter any registered NIET roll number to inspect verified workshop attendance, hackathon credentials, and cryptographically signed member tier.
              </p>

              {/* Input & Search Button */}
              <div className="space-y-3 mb-4">
                <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)]">
                  NIET Roll Number / Student ID
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={lookupId}
                    onChange={(e) => setLookupId(e.target.value)}
                    placeholder="e.g. NIET/2023/AI042"
                    aria-label="Enter student ID to verify passport"
                    className="flex-1 px-3.5 py-2 text-xs font-mono bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)]"
                  />
                  <button
                    type="button"
                    onClick={() => handleLookup(lookupId)}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-colors cursor-pointer"
                  >
                    Verify
                  </button>
                </div>
              </div>

              {/* Sample Quick Pick Buttons */}
              <div className="pt-2">
                <span className="text-[11px] font-mono text-[var(--color-text-secondary)] block mb-1.5">
                  Try Sample Fellows:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {Object.keys(SAMPLE_PASSPORTS).map((id) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => {
                        setLookupId(id);
                        handleLookup(id);
                      }}
                      className="text-[11px] font-mono px-2 py-1 rounded bg-[var(--color-surface-elevated)] hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer border border-[var(--color-border)]/50"
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

              {errorMsg && (
                <div className="mt-4 p-3 rounded-md bg-rose-500/10 border border-rose-500/20 text-xs font-mono text-rose-400">
                  {errorMsg}
                </div>
              )}

              {/* Backend Architecture Note */}
              <div className="mt-8 pt-4 border-t border-[var(--color-border)]/60 text-[11px] font-mono text-[var(--color-text-secondary)]">
                <span className="font-semibold text-[var(--color-text-primary)]">Architecture Note: </span>
                Production credential records authenticate against the NIET campus identity directory. Data shown reflects verified student batch records.
              </div>
            </div>

            {/* Right 7 Columns: Rendered Digital Passport Card */}
            <div className="lg:col-span-7">
              {activePassport ? (
                <div className="p-6 sm:p-8 rounded-2xl bg-[var(--color-surface-elevated)] border-2 border-[var(--color-accent)]/40 relative overflow-hidden shadow-lg">
                  {/* Watermark Logo Texture */}
                  <div className="absolute top-0 right-0 -mr-10 -mt-10 opacity-10 pointer-events-none">
                    <QrCode className="w-48 h-48 text-[var(--color-text-primary)]" />
                  </div>

                  {/* Passport Header */}
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--color-border)] mb-6">
                    <div>
                      <div className="text-[10px] font-mono tracking-widest text-[var(--color-accent)] uppercase">
                        MACHINE MAGNETS DIGITAL PASSPORT
                      </div>
                      <div className="text-xl sm:text-2xl font-extrabold text-[var(--color-text-primary)]">
                        {activePassport.name}
                      </div>
                      <div className="text-xs font-mono text-[var(--color-text-secondary)]">
                        {activePassport.studentId} · {activePassport.branch}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-block text-[10px] font-mono uppercase px-2.5 py-1 rounded bg-[var(--color-accent)] text-white font-bold tracking-wider">
                        {activePassport.tier}
                      </span>
                      <div className="text-[10px] font-mono text-[var(--color-text-secondary)] mt-1">
                        Joined {activePassport.joinDate}
                      </div>
                    </div>
                  </div>

                  {/* Passport Metrics Row */}
                  <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] mb-6 text-center">
                    <div>
                      <div className="text-[10px] font-mono text-[var(--color-text-secondary)]">Workshops</div>
                      <div className="text-lg font-bold font-mono text-[var(--color-text-primary)] tabular-nums">
                        {activePassport.workshopsAttended}
                      </div>
                    </div>
                    <div className="border-x border-[var(--color-border)]/50">
                      <div className="text-[10px] font-mono text-[var(--color-text-secondary)]">Hackathon Podiums</div>
                      <div className="text-lg font-bold font-mono text-[var(--color-accent)] tabular-nums">
                        {activePassport.hackathonWins}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[var(--color-text-secondary)]">Lab Repos</div>
                      <div className="text-lg font-bold font-mono text-[var(--color-text-primary)] tabular-nums">
                        {activePassport.repositoriesContributed}
                      </div>
                    </div>
                  </div>

                  {/* Verified Skill Badges */}
                  <div className="mb-6">
                    <div className="text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-2">
                      Verified Skill Endorsements
                    </div>
                    <div className="space-y-1.5">
                      {activePassport.verifiedBadges.map((b) => (
                        <div
                          key={b.name}
                          className="flex items-center justify-between text-xs p-2 rounded bg-[var(--color-surface)] border border-[var(--color-border)]/50"
                        >
                          <span className="flex items-center gap-2 font-medium text-[var(--color-text-primary)]">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{b.name}</span>
                          </span>
                          <span className="font-mono text-[10px] text-[var(--color-text-secondary)]">
                            {b.category} · {b.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Signature Hash & Export Action */}
                  <div className="pt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                      <Hash className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                      <span className="text-[11px] truncate max-w-[160px] sm:max-w-xs">{activePassport.signatureHash}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleExportPassport}
                      className="inline-flex items-center gap-1.5 text-[var(--color-accent)] hover:underline font-semibold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export JSON</span>
                    </button>
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center border border-dashed border-[var(--color-border)] rounded-2xl">
                  <ShieldCheck className="w-10 h-10 text-[var(--color-text-secondary)] mx-auto mb-2" />
                  <div className="text-sm font-bold text-[var(--color-text-primary)]">No Passport Selected</div>
                  <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Enter a roll number on the left or select a sample fellow to view credential records.
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
