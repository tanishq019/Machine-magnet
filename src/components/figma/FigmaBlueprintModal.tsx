import React, { useState } from 'react';
import { X, ExternalLink, Maximize2, Minimize2, Layers, RefreshCw } from 'lucide-react';

interface FigmaBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FigmaBlueprintModal: React.FC<FigmaBlueprintModalProps> = ({ isOpen, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  if (!isOpen) return null;

  const figmaEmbedUrl = "https://embed.figma.com/design/dDPJMpd8nZYyIMSGnQEatR/Untitled?node-id=0-1&embed-host=share";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="figma-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/85 backdrop-blur-md"
    >
      <div
        className={`bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl flex flex-col overflow-hidden shadow-2xl transition-all duration-300 ${
          isFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-6xl h-[88vh]'
        }`}
      >
        {/* Modal Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-surface-elevated)]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <h3 id="figma-modal-title" className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[var(--color-accent)]" />
                <span>Machine Magnets · Figma Design Blueprint</span>
              </h3>
            </div>
            <span className="hidden sm:inline text-xs font-mono px-2 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)]">
              Node ID: 0-1
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIframeKey((k) => k + 1)}
              className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
              title="Reload Figma Embed"
              aria-label="Reload Figma canvas"
            >
              <RefreshCw className="w-4 h-4" />
            </button>

            <a
              href="https://www.figma.com/design/dDPJMpd8nZYyIMSGnQEatR/Untitled?node-id=0-1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors inline-flex items-center gap-1 text-xs font-mono"
              title="Open directly in Figma"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden md:inline">Open in Figma</span>
            </a>

            <button
              type="button"
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              aria-label="Toggle fullscreen view"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
              aria-label="Close Figma modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded Figma Canvas */}
        <div className="flex-1 w-full h-full relative bg-black/40">
          <iframe
            key={iframeKey}
            src={figmaEmbedUrl}
            title="Machine Magnets Figma Canvas Embed"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Bottom Status Bar */}
        <div className="px-5 py-2.5 bg-[var(--color-surface-elevated)] border-t border-[var(--color-border)] flex flex-wrap items-center justify-between text-xs font-mono text-[var(--color-text-secondary)]">
          <div className="flex items-center gap-3">
            <span>Design Sync: Active</span>
            <span aria-hidden="true">·</span>
            <span className="text-[var(--color-accent)] font-semibold">NIET AI/ML Spec</span>
          </div>
          <div className="text-[11px]">
            Fully integrated with Machine Magnets visual tokens, themes, and interactive animations.
          </div>
        </div>
      </div>
    </div>
  );
};
