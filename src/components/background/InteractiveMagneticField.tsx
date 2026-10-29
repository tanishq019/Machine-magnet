import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Eye, EyeOff, Sliders, Zap } from 'lucide-react';

export const InteractiveMagneticField: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [intensity, setIntensity] = useState<number>(1.2);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, isHovering: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isActive) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      originX: number;
      originY: number;
      size: number;
      polarity: 1 | -1;
      alpha: number;
    }

    let particles: Particle[] = [];
    const count = Math.min(100, Math.floor((width * height) / 14000));

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          polarity: Math.random() > 0.5 ? 1 : -1,
          alpha: Math.random() * 0.4 + 0.2
        });
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.isHovering = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isDark = theme === 'dark';
      const accentColor = isDark ? '#ED2028' : '#D71920';
      const secondaryColor = isDark ? 'rgba(240, 236, 232, ' : 'rgba(23, 19, 19, ';

      // Fixed Dipoles on the page (center left and center right)
      const dipoles = [
        { x: width * 0.25, y: height * 0.4, pole: 1 },
        { x: width * 0.75, y: height * 0.6, pole: -1 }
      ];

      // If mouse is active, add mouse as dynamic magnetic pole
      if (mouseRef.current.isHovering) {
        dipoles.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          pole: 1.8 * intensity
        });
      }

      // Draw subtle magnetic flux lines connecting dipoles
      ctx.beginPath();
      ctx.strokeStyle = isDark ? 'rgba(237, 32, 40, 0.08)' : 'rgba(215, 25, 32, 0.06)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const offset = (i - 2.5) * 45;
        ctx.moveTo(dipoles[0].x, dipoles[0].y + offset);
        ctx.bezierCurveTo(
          width * 0.5,
          height * 0.2 + offset * 1.5,
          mouseRef.current.isHovering ? mouseRef.current.x : width * 0.5,
          mouseRef.current.isHovering ? mouseRef.current.y : height * 0.8 + offset,
          dipoles[1].x,
          dipoles[1].y + offset
        );
      }
      ctx.stroke();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Magnetic vector calculation
        let fx = 0;
        let fy = 0;

        for (const dipole of dipoles) {
          const dx = dipole.x - p.x;
          const dy = dipole.y - p.y;
          const distSq = dx * dx + dy * dy + 400;
          const force = (dipole.pole * p.polarity * 1800 * intensity) / distSq;
          fx += (dx / Math.sqrt(distSq)) * force;
          fy += (dy / Math.sqrt(distSq)) * force;
        }

        // Slight spring back to origin to prevent all particles collapsing
        const ox = p.originX - p.x;
        const oy = p.originY - p.y;
        p.vx = p.vx * 0.95 + fx * 0.05 + ox * 0.001;
        p.vy = p.vy * 0.95 + fy * 0.05 + oy * 0.001;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (p.polarity === 1) {
          ctx.fillStyle = isDark
            ? `rgba(237, 32, 40, ${p.alpha * 0.8})`
            : `rgba(215, 25, 32, ${p.alpha * 0.85})`;
        } else {
          ctx.fillStyle = `${secondaryColor}${p.alpha * 0.5})`;
        }
        ctx.fill();

        // Connect nearby particles with fine magnetic filaments
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist / 85) * 0.15;
            ctx.strokeStyle =
              p.polarity === p2.polarity
                ? isDark
                  ? `rgba(237, 32, 40, ${lineAlpha})`
                  : `rgba(215, 25, 32, ${lineAlpha})`
                : `${secondaryColor}${lineAlpha * 0.8})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isActive, intensity, theme]);

  return (
    <>
      {/* Background HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
        style={{ opacity: isActive ? 0.85 : 0 }}
        aria-hidden="true"
      />

      {/* Floating Canvas Control Trigger (Discrete in bottom left) */}
      <div className="fixed bottom-4 left-4 z-30 hidden sm:flex items-center gap-1.5 p-1.5 rounded-lg bg-[var(--color-surface)]/80 backdrop-blur-md border border-[var(--color-border)] shadow-md text-xs font-mono">
        <button
          type="button"
          onClick={() => setIsActive(!isActive)}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-[var(--color-surface-elevated)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
          title={isActive ? 'Disable Interactive Background' : 'Enable Interactive Background'}
          aria-label="Toggle interactive background particles"
        >
          {isActive ? (
            <>
              <Eye className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>B-Field: Active</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-neutral-400" />
              <span>B-Field: Paused</span>
            </>
          )}
        </button>

        {isActive && (
          <button
            type="button"
            onClick={() => setIntensity((prev) => (prev >= 2 ? 0.6 : prev + 0.6))}
            className="px-2 py-1 rounded hover:bg-[var(--color-surface-elevated)] text-[var(--color-accent)] font-semibold cursor-pointer"
            title="Cycle magnetic field attraction force"
            aria-label="Adjust magnetic field intensity"
          >
            {intensity.toFixed(1)}x
          </button>
        )}
      </div>
    </>
  );
};
