import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Sparkles, Send } from 'lucide-react';

export const JoinSection: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    yearBranch: '2nd Year · CSE (AI & ML)',
    interestDomain: 'Deep Learning & Computer Vision',
    githubUrl: '',
    statement: ''
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [applicationRef, setApplicationRef] = useState('');

  const branches = [
    '1st Year · Foundation Cohort',
    '2nd Year · CSE (AI & ML)',
    '2nd Year · CSE (Data Science)',
    '2nd Year · CSE / IT',
    '3rd Year · AI / Robotics / ECE',
    'Other Technical Specialization'
  ];

  const domains = [
    'Deep Learning & Computer Vision',
    'Generative AI & LLM Systems',
    'Applied Edge AI & Embedded Systems',
    'Data Engineering & Infrastructure',
    'Hackathon Pod & Open Research'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setFormStatus('error');
      setErrorMessage('Please provide your full name.');
      return;
    }

    if (!formData.studentId.trim()) {
      setFormStatus('error');
      setErrorMessage('Please enter your NIET roll number or student ID.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setFormStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setFormStatus('submitting');
    setErrorMessage('');

    setTimeout(() => {
      // Generate authentic tracking reference code
      const refCode = `MM-APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setApplicationRef(refCode);

      // Save submission to local storage
      const existing = JSON.parse(localStorage.getItem('mm_club_applications') || '[]');
      existing.push({
        refCode,
        ...formData,
        submittedAt: new Date().toISOString()
      });
      localStorage.setItem('mm_club_applications', JSON.stringify(existing));

      setFormStatus('success');
    }, 850);
  };

  const handleReset = () => {
    setFormData({
      fullName: '',
      studentId: '',
      email: '',
      yearBranch: '2nd Year · CSE (AI & ML)',
      interestDomain: 'Deep Learning & Computer Vision',
      githubUrl: '',
      statement: ''
    });
    setFormStatus('idle');
    setErrorMessage('');
    setApplicationRef('');
  };

  return (
    <section
      id="join-club"
      className="py-20 md:py-28 relative overflow-hidden"
      aria-labelledby="join-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Strong Closing Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ANNUAL FALL RECRUITMENT COHORT</span>
          </div>

          <h2
            id="join-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-6 text-balance"
          >
            THE NEXT THING WE BUILD COULD START WITH YOU.
          </h2>

          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto leading-relaxed">
            Whether you want to train your first convolutional model, solder edge sensors onto robotics boards, or organize the next 400-hacker symposium at NIET, our doors are wide open.
          </p>
        </div>

        {/* Application Form Box */}
        <div className="max-w-2xl mx-auto bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-10 shadow-xl relative">
          
          {/* Subtle Top Red Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--color-accent)] rounded-t-2xl" />

          {formStatus === 'success' ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Application Received!
              </h3>

              <div className="p-4 rounded-xl bg-[var(--color-surface-elevated)] border border-[var(--color-border)] max-w-md mx-auto text-xs font-mono text-[var(--color-text-secondary)]">
                <div>Tracking Reference:</div>
                <div className="text-base font-bold text-[var(--color-accent)] mt-1">{applicationRef}</div>
                <div className="mt-2 text-[10px] text-[var(--color-text-secondary)]">
                  Saved to your local application ledger. Our core team reviews submissions weekly and will notify you at <strong className="text-[var(--color-text-primary)]">{formData.email}</strong> with lab interview slots in Lab 402.
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 text-xs font-mono text-[var(--color-text-primary)] bg-[var(--color-surface-elevated)] hover:border-[var(--color-accent)] border border-[var(--color-border)] rounded-md transition-colors cursor-pointer"
                >
                  Submit Another Application
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>

                {/* NIET Student ID */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                    NIET Roll Number / Student ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="e.g. 2301331530042"
                    className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.name@niet.co.in or personal email"
                  className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              {/* Year & Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                    Academic Year & Branch
                  </label>
                  <select
                    value={formData.yearBranch}
                    onChange={(e) => setFormData({ ...formData, yearBranch: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
                  >
                    {branches.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interest Domain */}
                <div>
                  <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                    Primary Domain Interest
                  </label>
                  <select
                    value={formData.interestDomain}
                    onChange={(e) => setFormData({ ...formData, interestDomain: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
                  >
                    {domains.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* GitHub / Portfolio */}
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                  GitHub Profile / Portfolio Link (Optional)
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/your-username"
                  className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)]"
                />
              </div>

              {/* Short Statement */}
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--color-text-secondary)] mb-1">
                  What excites you about machine learning? (1-2 sentences)
                </label>
                <textarea
                  rows={3}
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Tell us what you want to explore or build with Machine Magnets..."
                  className="w-full px-3.5 py-2 text-xs bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] rounded-md focus:outline-none focus:border-[var(--color-accent)] resize-none"
                />
              </div>

              {/* Error Announcement */}
              {formStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 rounded bg-rose-500/10 border border-rose-500/20 text-xs text-rose-500 font-mono">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{formStatus === 'submitting' ? 'Transmitting Application...' : 'Submit Membership Application'}</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
