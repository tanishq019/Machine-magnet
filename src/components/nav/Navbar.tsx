import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Logo } from '../brand/Logo';
import { Sun, Moon, Menu, X, ArrowUpRight, Search, Terminal, Layers } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
  onOpenFigma: () => void;
  onOpenCommand: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onJoinClick,
  onOpenFigma,
  onOpenCommand,
  onOpenTerminal
}) => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#manifesto' },
    { name: 'Focus', href: '#focus-areas' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Projects', href: '#projects' },
    { name: 'Events', href: '#events' },
    { name: 'Team', href: '#team' },
    { name: 'Resources', href: '#resources' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['hero', 'manifesto', 'focus-areas', 'timeline', 'projects', 'events', 'team', 'resources', 'passport', 'join-club'];
      const scrollPosition = window.scrollY + 180;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'py-3 bg-[var(--color-background)]/85 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark */}
            <a
              href="#hero"
              className="group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] rounded-lg transition-transform"
              aria-label="Machine Magnets Homepage"
            >
              <Logo size="md" />
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`whitespace-nowrap transition-colors relative py-1 hover:text-[var(--color-accent)] ${
                      isActive
                        ? 'text-[var(--color-accent)] font-semibold'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-accent)] rounded-full" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Actions (Search + Figma + Terminal + Theme Toggle + Primary CTA) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Command Palette Trigger */}
              <button
                type="button"
                onClick={onOpenCommand}
                aria-label="Open command palette (Cmd+K)"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                title="Search / Command Menu (Cmd+K)"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="text-[10px] bg-[var(--color-surface)] px-1.5 py-0.5 rounded border border-[var(--color-border)]">⌘K</span>
              </button>

              {/* Figma Blueprint Trigger */}
              <button
                type="button"
                onClick={onOpenFigma}
                aria-label="Inspect Figma Blueprint"
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] text-xs font-mono text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                title="Inspect Embedded Figma Canvas"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden xl:inline">Figma</span>
              </button>

              {/* Lab CLI Terminal Trigger */}
              <button
                type="button"
                onClick={onOpenTerminal}
                aria-label="Open Lab 402 Developer Terminal"
                className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
                title="Open Lab 402 Terminal Console"
              >
                <Terminal className="w-4 h-4" />
              </button>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'Light (Magnetic Paper)' : 'Dark (Magnetic Night)'} theme`}
                className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] cursor-pointer"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-neutral-700" />
                )}
              </button>

              {/* Primary Action Button */}
              <button
                type="button"
                onClick={onJoinClick}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-accent)] cursor-pointer whitespace-nowrap"
              >
                Join the Club
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[var(--color-background)]/98 backdrop-blur-xl border-b border-[var(--color-border)] px-6 py-6 overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border)]">
            <Logo size="md" />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-lg font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] py-2 border-b border-[var(--color-border)]/50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="mt-auto pt-6 flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFigma();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]"
              >
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Figma Spec</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-mono rounded-lg border border-[var(--color-border)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)]"
              >
                <Terminal className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>Lab CLI</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onJoinClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md transition-colors cursor-pointer"
            >
              Join the Club
              <ArrowUpRight className="w-4 h-4" />
            </button>
            
            <div className="flex items-center justify-between pt-3 text-xs text-[var(--color-text-secondary)] font-mono">
              <span>Theme: {theme === 'dark' ? 'Magnetic Night' : 'Magnetic Paper'}</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="underline hover:text-[var(--color-text-primary)]"
              >
                Toggle Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
