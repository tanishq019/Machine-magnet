import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Plus, Minus, RotateCcw, Play, Sparkles, Activity, Magnet, Info } from 'lucide-react';

interface Pole {
  id: string;
  x: number;
  y: number;
  strength: number; // positive = North, negative = South
  label: string;
}

export const MagneticSandbox: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [poles, setPoles] = useState<Pole[]>([
    { id: 'p1', x: 200, y: 180, strength: 1, label: 'N (Core)' },
    { id: 'p2', x: 500, y: 180, strength: -1, label: 'S (Sink)' },
    { id: 'p3', x: 350, y: 280, strength: 0.8, label: 'Tensor Node' }
  ]);
  const [activePoleId, setActivePoleId] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(true);
  const [fluxEnergy, setFluxEnergy] = useState('3.48 kJ');
  const [entropyScore, setEntropyScore] = useState('0.142');

  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 360);

    let step = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.02;

      // Draw vector field arrows on a grid
      const gridSize = 32;
      const accent = isDark ? '#ED2028' : '#D71920';
      const arrowColor = isDark ? 'rgba(240, 236, 232, 0.2)' : 'rgba(23, 19, 19, 0.18)';

      let totalFieldMagnitude = 0;

      for (let x = gridSize / 2; x < width; x += gridSize) {
        for (let y = gridSize / 2; y < height; y += gridSize) {
          let Bx = 0;
          let By = 0;

          for (const pole of poles) {
            const dx = x - pole.x;
            const dy = y - pole.y;
            const r2 = dx * dx + dy * dy + 150;
            const r = Math.sqrt(r2);
            const mag = (pole.strength * 900) / (r2 * 1.1);
            Bx += (dx / r) * mag;
            By += (dy / r) * mag;
          }

          const B = Math.sqrt(Bx * Bx + By * By);
          totalFieldMagnitude += B;

          if (B > 0.01) {
            const angle = Math.atan2(By, Bx);
            const len = Math.min(14, B * 1.5 + 2);

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(angle);

            // Vector line
            ctx.beginPath();
            ctx.moveTo(-len / 2, 0);
            ctx.lineTo(len / 2, 0);

            // Vector arrowhead
            ctx.lineTo(len / 2 - 3, -2);
            ctx.moveTo(len / 2, 0);
            ctx.lineTo(len / 2 - 3, 2);

            ctx.strokeStyle = B > 1.8 ? accent : arrowColor;
            ctx.lineWidth = B > 1.8 ? 1.5 : 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Calculate dynamic simulated energy
      const computedEnergy = (totalFieldMagnitude * 0.004).toFixed(2);
      setFluxEnergy(`${computedEnergy} kJ`);
      setEntropyScore((0.08 + Math.sin(step) * 0.02).toFixed(3));

      // Draw field lines connecting poles
      ctx.beginPath();
      ctx.strokeStyle = isDark ? 'rgba(237, 32, 40, 0.25)' : 'rgba(215, 25, 32, 0.2)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 4]);

      if (poles.length >= 2) {
        ctx.moveTo(poles[0].x, poles[0].y);
        ctx.quadraticCurveTo(
          (poles[0].x + poles[1].x) / 2,
          (poles[0].y + poles[1].y) / 2 - 40 * Math.sin(step),
          poles[1].x,
          poles[1].y
        );
      }
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Poles
      for (const pole of poles) {
        const isNorth = pole.strength > 0;
        const radius = 18;

        // Glow
        ctx.beginPath();
        ctx.arc(pole.x, pole.y, radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = isNorth
          ? isDark
            ? 'rgba(237, 32, 40, 0.25)'
            : 'rgba(215, 25, 32, 0.2)'
          : isDark
          ? 'rgba(70, 130, 240, 0.2)'
          : 'rgba(50, 100, 200, 0.15)';
        ctx.fill();

        // Pole Body
        ctx.beginPath();
        ctx.arc(pole.x, pole.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = isNorth ? accent : isDark ? '#253555' : '#3B5998';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = isDark ? '#FFFFFF' : '#171313';
        ctx.stroke();

        // Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 11px JetBrains Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(isNorth ? 'N+' : 'S-', pole.x, pole.y);

        // Subtitle
        ctx.fillStyle = isDark ? '#AAA5A2' : '#62595A';
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillText(pole.label, pole.x, pole.y + radius + 14);
      }

      if (isSimulating) {
        animId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, [poles, isSimulating, isDark]);

  const handleCanvasPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked near a pole
    const clickedPole = poles.find((p) => Math.hypot(p.x - x, p.y - y) <= 28);
    if (clickedPole) {
      setActivePoleId(clickedPole.id);
    }
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!activePoleId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(25, Math.min(canvas.width - 25, e.clientX - rect.left));
    const y = Math.max(25, Math.min(canvas.height - 25, e.clientY - rect.top));

    setPoles((prev) =>
      prev.map((p) => (p.id === activePoleId ? { ...p, x, y } : p))
    );
  };

  const handleCanvasPointerUp = () => {
    setActivePoleId(null);
  };

  const addNorthPole = () => {
    const id = `p-${Date.now()}`;
    setPoles((prev) => [
      ...prev,
      {
        id,
        x: Math.random() * 400 + 100,
        y: Math.random() * 200 + 80,
        strength: 1.2,
        label: `N-${prev.length + 1}`
      }
    ]);
  };

  const addSouthPole = () => {
    const id = `p-${Date.now()}`;
    setPoles((prev) => [
      ...prev,
      {
        id,
        x: Math.random() * 400 + 100,
        y: Math.random() * 200 + 80,
        strength: -1.2,
        label: `S-${prev.length + 1}`
      }
    ]);
  };

  const resetPoles = () => {
    setPoles([
      { id: 'p1', x: 200, y: 180, strength: 1, label: 'N (Core)' },
      { id: 'p2', x: 500, y: 180, strength: -1, label: 'S (Sink)' },
      { id: 'p3', x: 350, y: 280, strength: 0.8, label: 'Tensor Node' }
    ]);
  };

  return (
    <section
      id="sandbox"
      className="py-20 md:py-28 border-b border-[var(--color-border)] relative"
      aria-labelledby="sandbox-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-mono font-medium tracking-wider text-[var(--color-accent)] uppercase mb-3 flex items-center gap-2">
              <Magnet className="w-4 h-4" />
              <span>LAB 402 SIMULATION LAB</span>
            </div>
            <h2
              id="sandbox-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--color-text-primary)] mb-2"
            >
              Interactive Tensor Flux Simulator.
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-secondary)]">
              Drag magnetic polarity nodes to observe simulated vector convergence. This mathematical duality inspires how attention weights flux through transformer layers.
            </p>
          </div>

          {/* Sandbox Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={addNorthPole}
              className="px-3 py-1.5 text-xs font-mono rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-primary)] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Add North Pole</span>
            </button>

            <button
              type="button"
              onClick={addSouthPole}
              className="px-3 py-1.5 text-xs font-mono rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-primary)] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Minus className="w-3.5 h-3.5 text-blue-500" />
              <span>Add South Pole</span>
            </button>

            <button
              type="button"
              onClick={resetPoles}
              className="p-2 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] cursor-pointer transition-colors"
              title="Reset Simulator Poles"
              aria-label="Reset simulator poles to default"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Canvas Board */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-xl relative">
          
          {/* Top Status Bar */}
          <div className="px-5 py-3 border-b border-[var(--color-border)]/60 bg-[var(--color-surface-elevated)] flex flex-wrap items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-4 text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1.5 text-[var(--color-text-primary)] font-semibold">
                <Activity className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                <span>FLUX STATUS: CONTINUOUS</span>
              </span>
              <span aria-hidden="true">·</span>
              <span>POLES: <strong className="text-[var(--color-text-primary)]">{poles.length}</strong></span>
              <span aria-hidden="true">·</span>
              <span>ENERGY: <strong className="text-[var(--color-accent)]">{fluxEnergy}</strong></span>
              <span aria-hidden="true">·</span>
              <span>ENTROPY: <strong className="text-[var(--color-text-primary)]">{entropyScore}</strong></span>
            </div>

            <div className="text-[11px] text-[var(--color-text-secondary)] hidden sm:block">
              Click & drag any circle on the field
            </div>
          </div>

          {/* Interactive Vector Canvas */}
          <div className="relative w-full h-[360px] bg-[var(--color-surface)] touch-none select-none cursor-grab active:cursor-grabbing">
            <canvas
              ref={canvasRef}
              onPointerDown={handleCanvasPointerDown}
              onPointerMove={handleCanvasPointerMove}
              onPointerUp={handleCanvasPointerUp}
              onPointerLeave={handleCanvasPointerUp}
              className="w-full h-full block"
            />
          </div>

          {/* Bottom Educational Caption */}
          <div className="p-4 px-6 bg-[var(--color-surface-elevated)]/60 border-t border-[var(--color-border)]/60 flex items-start sm:items-center gap-3 text-xs text-[var(--color-text-secondary)]">
            <Info className="w-4 h-4 text-[var(--color-accent)] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Scientific Context:</strong> In physics, magnetic vector potential <code className="text-[var(--color-text-primary)] font-mono">A</code> creates solenoidal flux fields <code className="text-[var(--color-text-primary)] font-mono">B = ∇ × A</code>. Our research pod in Lab 402 applies these partial differential equations to train physics-informed neural networks (PINNs).
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
