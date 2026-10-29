import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PROJECTS, EVENTS } from '../../data/mockData';
import { Search, Compass, Calendar, Code, Users, BookOpen, Sun, Moon, Layers, X, Terminal, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFigma: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenFigma }) => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or shortcut
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const staticActions = [
    { id: 'act-about', title: 'Manifesto & Purpose', category: 'Navigation', icon: <Compass className="w-4 h-4 text-[var(--color-accent)]" />, action: () => navigateTo('#manifesto') },
    { id: 'act-focus', title: 'Focus Areas & Labs', category: 'Navigation', icon: <Layers className="w-4 h-4 text-[var(--color-accent)]" />, action: () => navigateTo('#focus-areas') },
    { id: 'act-sandbox', title: 'Tensor Flux Simulator', category: 'Lab Tool', icon: <Terminal className="w-4 h-4 text-[var(--color-accent)]" />, action: () => navigateTo('#sandbox') },
    { id: 'act-timeline', title: 'Epochs Timeline', category: 'Navigation', icon: <Calendar className="w-4 h-4 text-[var(--color-accent)]" />, action: () => navigateTo('#timeline') },
    { id: 'act-projects', title: 'Project Showcase', category: 'Navigation', icon: <Code className="w-4 h-4 text-[var(--color-accent)]" />, action: () => navigateTo('#projects') },
    { id: 'act-events', title: 'Events & Hackathons', category: 'Navigation', icon: <Calendar className="w-4 h-4 text-[var(--color-accent)]" />, action: () => navigateTo('#events') },
    { id: 'act-team', title: 'Leadership & Mentors', category: 'Navigation', icon: <Users className="w-4 h-4 text-[var(--color-accent)]" />, action: () => navigateTo('#team') },
    { id: 'act-passport', title: 'Digital Passport', category: 'Navigation', icon: <BookOpen className="w-4 h-4 text-[var(--color-accent)]" />, action: () => navigateTo('#passport') },
    { id: 'act-join', title: 'Join Machine Magnets', category: 'Action', icon: <ArrowRight className="w-4 h-4 text-[var(--color-accent)]" />, action: () => navigateTo('#join-club') },
    { id: 'act-figma', title: 'Inspect Figma Blueprint', category: 'Design Spec', icon: <Layers className="w-4 h-4 text-purple-400" />, action: () => { onClose(); onOpenFigma(); } },
    { id: 'act-theme', title: `Switch Theme to ${theme === 'dark' ? 'Light' : 'Dark'}`, category: 'Preferences', icon: theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />, action: () => { toggleTheme(); onClose(); } }
  ];

  const projectItems = PROJECTS.map((p) => ({
    id: `p-${p.id}`,
    title: p.title,
    category: `Project (${p.category})`,
    icon: <Code className="w-4 h-4 text-[var(--color-accent)]" />,
    action: () => navigateTo('#projects')
  }));

  const allItems = [...staticActions, ...projectItems];

  const filtered = allItems.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const navigateTo = (hash: string) => {
    onClose();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleItemClick = (idx: number) => {
    if (filtered[idx]) {
      filtered[idx].action();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Search Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
          <Search className="w-4 h-4 text-[var(--color-text-secondary)] mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command, project, event or section..."
            className="w-full py-3.5 text-sm bg-transparent border-0 text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-[var(--color-text-secondary)]">
              No matching commands or projects found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleItemClick(idx)}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                  selectedIndex === idx
                    ? 'bg-[var(--color-accent)] text-white font-medium'
                    : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-elevated)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={selectedIndex === idx ? 'text-white' : ''}>{item.icon}</span>
                  <span>{item.title}</span>
                </div>
                <span
                  className={`text-[10px] font-mono ${
                    selectedIndex === idx ? 'text-white/80' : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>

        {/* Bottom Keys Help */}
        <div className="px-4 py-2.5 bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-secondary)]">
          <div className="flex items-center gap-3">
            <span>[ESC] to dismiss</span>
            <span>·</span>
            <span>[ENTER] to execute</span>
          </div>
          <span>Machine Magnets Command Menu</span>
        </div>

      </div>
    </div>
  );
};
