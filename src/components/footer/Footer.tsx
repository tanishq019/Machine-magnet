import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Logo } from '../brand/Logo';
import { ArrowUp, Play, Sun, Moon, Github, Linkedin, MessageSquare, Twitter, Mail, MapPin, X } from 'lucide-react';

interface FooterProps {
  onReplayIntro: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onReplayIntro }) => {
  const { theme, toggleTheme } = useTheme();
  const [showCodeOfConduct, setShowCodeOfConduct] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About Manifesto', href: '#manifesto' },
    { name: 'Focus Areas', href: '#focus-areas' },
    { name: 'Epochs Timeline', href: '#timeline' },
    { name: 'Projects Showcase', href: '#projects' },
    { name: 'Events & Hackathons', href: '#events' },
    { name: 'Team & Mentors', href: '#team' },
    { name: 'Learning Resources', href: '#resources' },
    { name: 'Digital Passport', href: '#passport' }
  ];

  return (
    <footer className="bg-[var(--color-surface)] border-t border-[var(--color-border)] pt-16 pb-12 relative text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--color-border)]">
          
          {/* Brand & Purpose (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Logo size="lg" className="mb-4" />
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm mb-6">
                The premier Artificial Intelligence and Machine Learning student engineering society at Noida Institute of Engineering & Technology (NIET). Ideas in motion. Intelligence in action. Built together.
              </p>
            </div>

            {/* Replay Intro & Theme Switcher Action Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onReplayIntro}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] font-mono text-[11px] transition-colors cursor-pointer"
                title="Replay opening brand animation"
              >
                <Play className="w-3 h-3 text-[var(--color-accent)]" />
                <span>Replay Intro</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] font-mono text-[11px] transition-colors cursor-pointer"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-3 h-3 text-amber-400" />
                    <span>Light Theme</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3 h-3 text-neutral-700" />
                    <span>Dark Theme</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Navigation Links (3 Columns) */}
          <div className="lg:col-span-3">
            <div className="text-xs font-mono uppercase text-[var(--color-text-primary)] font-bold tracking-wider mb-4">
              SITE DIRECTORY
            </div>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus Location & Institutional Affiliation (4 Columns) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono uppercase text-[var(--color-text-primary)] font-bold tracking-wider mb-4">
                CAMPUS LABORATORY
              </div>

              <div className="space-y-3 text-[var(--color-text-secondary)] font-mono">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5" />
                  <span>
                    Lab 402, Department of Computer Science & Engineering<br />
                    NIET, 19, Knowledge Park II, Institutional Area<br />
                    Greater Noida, Uttar Pradesh 201306, India
                  </span>
                </div>

                <div className="flex items-center gap-2.5 pt-1">
                  <Mail className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                  <span>machinemagnets@niet.co.in</span>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="pt-6">
              <div className="text-[11px] font-mono text-[var(--color-text-secondary)] uppercase mb-2">
                Connect with our cohorts
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://github.com/machine-magnets-niet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors"
                  aria-label="Machine Magnets GitHub organization"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/company/machine-magnets-niet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors"
                  aria-label="Machine Magnets LinkedIn page"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://discord.gg/niet-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors"
                  aria-label="Machine Magnets Discord server"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/machinemagnets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors"
                  aria-label="Machine Magnets Twitter/X handle"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright, Code of Conduct, Back-to-Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-[var(--color-text-secondary)]">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 Machine Magnets NIET. Open-Source Academic Initiative.</span>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => setShowCodeOfConduct(true)}
              className="underline hover:text-[var(--color-text-primary)] cursor-pointer"
            >
              Lab Code of Conduct
            </button>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[var(--color-accent)] transition-colors cursor-pointer"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Code of Conduct Modal */}
      {showCodeOfConduct && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="coc-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
            <button
              type="button"
              onClick={() => setShowCodeOfConduct(false)}
              className="absolute top-4 right-4 p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 id="coc-title" className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
              Machine Magnets Lab Code of Conduct
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
              <p>
                <strong>1. Inclusive Learning:</strong> Every student, regardless of branch or technical background, deserves equal respect and supportive mentorship.
              </p>
              <p>
                <strong>2. Academic Integrity & Responsible AI:</strong> We adhere to ethical computing guidelines. Automated tools must be attributed, and research data must be handled honestly.
              </p>
              <p>
                <strong>3. Shared Resources:</strong> GPU cluster nodes and hardware prototyping kits in Lab 402 are shared community assets to be conserved and respected.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--color-border)] text-right">
              <button
                type="button"
                onClick={() => setShowCodeOfConduct(false)}
                className="px-4 py-2 text-xs font-mono bg-[var(--color-accent)] text-white rounded-md cursor-pointer"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
