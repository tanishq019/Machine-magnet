import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Terminal, X, Minimize2, Maximize2 } from 'lucide-react';
import { PROJECTS, EVENTS, MEMBERS, SAMPLE_PASSPORTS } from '../../data/mockData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme } = useTheme();
  const [history, setHistory] = useState<string[]>([
    'MACHINE MAGNETS LAB 402 TERMINAL (v2.6.4)',
    'Connected to NIET Neural Cluster [Host: 10.42.0.1]',
    'Type "help" to view available lab commands.',
    ''
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, `$ ${cmd}`];
    const parts = cmd.toLowerCase().split(' ');
    const mainCmd = parts[0];

    switch (mainCmd) {
      case 'help':
        newHistory.push(
          'Available Commands:',
          '  projects         List active research repositories',
          '  events           Show upcoming symposiums and hackathons',
          '  team             List student leadership & faculty advisors',
          '  passport <id>    Lookup verified member passport (e.g. passport NIET/2023/AI042)',
          '  theme <dark|light> Switch website visual theme',
          '  eval-model       Run simulated benchmark on DeepFlux 3D model',
          '  clear            Clear terminal screen',
          '  exit             Close terminal console'
        );
        break;

      case 'projects':
        newHistory.push(
          'Active Lab 402 Repositories:',
          ...PROJECTS.map((p) => `  - ${p.title} [${p.category}] - ${p.status} (${p.stars} stars)`)
        );
        break;

      case 'events':
        newHistory.push(
          'Upcoming Gatherings:',
          ...EVENTS.map((ev) => `  - ${ev.title} (${ev.date}) [${ev.venue}]`)
        );
        break;

      case 'team':
        newHistory.push(
          'Lab Leadership & Mentors:',
          ...MEMBERS.map((m) => `  - ${m.name}: ${m.role} (${m.department})`)
        );
        break;

      case 'passport':
        const searchId = parts[1] || 'NIET/2023/AI042';
        const found = SAMPLE_PASSPORTS[searchId];
        if (found) {
          newHistory.push(
            `PASSPORT FOUND: ${found.passportId}`,
            `Name: ${found.name} | Tier: ${found.tier}`,
            `Roll: ${found.studentId} | Joined: ${found.joinDate}`,
            `Workshops Attended: ${found.workshopsAttended} | Hackathons Won: ${found.hackathonWins}`,
            `Verified Hash: ${found.signatureHash}`
          );
        } else {
          newHistory.push(`Error: Passport ID "${searchId}" not found in current local ledger.`);
        }
        break;

      case 'theme':
        if (parts[1] === 'dark') {
          setTheme('dark');
          newHistory.push('Visual theme set to "Magnetic Night" (Dark).');
        } else if (parts[1] === 'light') {
          setTheme('light');
          newHistory.push('Visual theme set to "Magnetic Paper" (Light).');
        } else {
          newHistory.push('Usage: theme <dark|light>');
        }
        break;

      case 'eval-model':
        newHistory.push(
          'Initializing DeepFlux 3D evaluation on BraTS-2026 validation slice...',
          'Loading weights checkpoint: deepflux-v2.pt',
          'Running implicit tensor coordinate field reconstruction...',
          'Done in 82.4ms.',
          'Result: PSNR = 34.22 dB | MSE = 0.018 | SSIM = 0.941 [PASSED]'
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
        onClose();
        return;

      default:
        newHistory.push(`Command not recognized: "${cmd}". Type "help" for valid options.`);
    }

    newHistory.push('');
    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Interactive Terminal Console"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
    >
      <div className="bg-[#0B0B0B] border border-white/15 rounded-xl max-w-2xl w-full h-[480px] flex flex-col overflow-hidden shadow-2xl font-mono text-xs">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#141414] border-b border-white/10 text-neutral-300">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#ED2028]" />
            <span className="font-semibold text-white">machine-magnets@niet-lab402:~</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-neutral-400 hover:text-white cursor-pointer"
              aria-label="Close terminal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Content & History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-1 text-neutral-200">
          {history.map((line, i) => (
            <div key={i} className={line.startsWith('$') ? 'text-[#ED2028] font-semibold' : 'text-neutral-300'}>
              {line}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Prompt Input Form */}
        <form onSubmit={handleCommand} className="flex items-center px-4 py-2 bg-[#121212] border-t border-white/10">
          <span className="text-[#ED2028] font-bold mr-2">$</span>
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-white border-0 focus:outline-none placeholder-neutral-500"
          />
        </form>
      </div>
    </div>
  );
};
