import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
}

export const LogoEmblem: React.FC<{ size?: number; className?: string }> = ({ size = 32, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Machine Magnets Emblem"
    >
      {/* Outer Magnetic Field Induction Rings */}
      <circle
        cx="24"
        cy="24"
        r="22"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="2 3"
        strokeOpacity="0.35"
      />
      
      {/* North Polarity Induction Loop (Left Magnetic Pole) */}
      <path
        d="M14 36V16C14 11.5817 17.5817 8 22 8C23.1 8 24 8.89543 24 10V26"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* South Polarity Induction Loop (Right Magnetic Pole) */}
      <path
        d="M34 36V16C34 11.5817 30.4183 8 26 8C24.9 8 24 8.89543 24 10V26"
        stroke="var(--color-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Central Convergent 'M' Engineered Bridge */}
      <path
        d="M14 24L24 33L34 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.8"
      />

      {/* Primary Red Magnetic Core Singularity Node */}
      <circle cx="24" cy="33" r="3.2" fill="var(--color-accent)" />
      <circle cx="24" cy="33" r="6" stroke="var(--color-accent)" strokeWidth="1" strokeOpacity="0.5" />

      {/* Precision Micro Flux Terminal Points */}
      <circle cx="14" cy="36" r="2.2" fill="currentColor" fillOpacity="0.9" />
      <circle cx="34" cy="36" r="2.2" fill="var(--color-accent)" />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({ size = 'md', showWordmark = true, className = '' }) => {
  const pixelSizes = {
    sm: 24,
    md: 32,
    lg: 40,
    xl: 56
  };

  const currentSize = pixelSizes[size];

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoEmblem size={currentSize} />
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold tracking-tight text-base sm:text-lg text-[var(--color-text-primary)]">
              MACHINE
            </span>
            <span className="font-extrabold tracking-tight text-base sm:text-lg text-[var(--color-accent)]">
              MAGNETS
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-widest text-[var(--color-text-secondary)] uppercase mt-0.5">
            NIET · AI & ML LAB
          </span>
        </div>
      )}
    </div>
  );
};
