import React from 'react';
import { Target, Lightbulb, Users, Terminal, CheckCircle2 } from 'lucide-react';

export const ClubManifesto: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'First-Principles Construction',
      desc: 'We don’t treat models as black boxes or API wrappers. Students understand backpropagation calculus, write custom attention blocks, and build from fundamentals before leveraging abstractions.'
    },
    {
      num: '02',
      title: 'Open Source as Standard Practice',
      desc: 'Every model weights checkpoint, edge firmware flash, and research script developed at Machine Magnets is documented and released publicly to empower the broader student community.'
    },
    {
      num: '03',
      title: 'Peer-to-Peer Research Sprints',
      desc: 'Senior fellows mentor first-year students in Python, linear algebra, and Git. Research cohorts deconstruct top ArXiv preprints weekly and turn cutting-edge ideas into verifiable repos.'
    }
  ];

  return (
    <section
      id="manifesto"
      className="py-20 md:py-28 border-b border-[var(--color-border)] relative"
      aria-labelledby="manifesto-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-3">
            THE MACHINE MAGNETS MANIFESTO
          </div>
          <h2
            id="manifesto-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-6 text-balance"
          >
            Curiosity is only the beginning.
          </h2>
          <p className="text-base sm:text-lg text-[var(--color-text-secondary)] leading-relaxed">
            Machine Magnets was founded at NIET to solve a persistent gap in undergraduate engineering: the distance between passing university exams and training production machine learning systems. We are an interdisciplinary laboratory uniting computer scientists, electrical engineers, and designers under one magnetic polarity.
          </p>
        </div>

        {/* 2-Column Split: Editorial Grid + Interactive Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Visual Manifesto Card */}
          <div className="lg:col-span-5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-8 relative overflow-hidden">
            {/* Magnetic Field Line vector backdrop */}
            <div className="absolute top-0 right-0 w-64 h-64 -mr-16 -mt-16 pointer-events-none opacity-20">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="80" stroke="var(--color-accent)" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="100" cy="100" r="50" stroke="var(--color-text-primary)" strokeWidth="1" />
                <circle cx="100" cy="100" r="20" fill="var(--color-accent)" fillOpacity="0.3" />
              </svg>
            </div>

            <div className="relative z-10">
              <span className="text-xs font-mono text-[var(--color-text-secondary)] uppercase tracking-wider block mb-2">
                ACADEMIC & RESEARCH ETHOS
              </span>
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                What drives our engineering culture at NIET:
              </h3>

              <div className="space-y-4 text-sm text-[var(--color-text-secondary)]">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--color-text-primary)]">Rigorous Hardware Access:</strong> Students get hands-on access to GPU workstations, NVIDIA Jetson modules, and IoT testbeds in Lab 402.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--color-text-primary)]">Competitive Integrity:</strong> Regular hackathon bootcamps that prepare teams for Smart India Hackathon and global AI challenges.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[var(--color-text-primary)]">Zero Gatekeeping:</strong> Any NIET student with curiosity, regardless of their branch or prior coding experience, has a structured roadmap to join.
                  </span>
                </div>
              </div>

              {/* Institution Accreditation Note */}
              <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono text-[var(--color-text-secondary)]">
                <span>AFFILIATED INSTITUTION</span>
                <span className="text-[var(--color-text-primary)] font-semibold">NIET, GREATER NOIDA</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Pillars with Editorial Numbering */}
          <div className="lg:col-span-7 space-y-6">
            {principles.map((item) => (
              <div
                key={item.num}
                className="p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/60 transition-colors"
              >
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">
                    {item.num}.
                  </span>
                  <h4 className="text-lg font-bold text-[var(--color-text-primary)]">
                    {item.title}
                  </h4>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed pl-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
