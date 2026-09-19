import { useEffect, useRef } from 'react';

interface AgentNetworkCanvasProps {
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phase: number;
  pulseSpeed: number;
  symbol?: string;
}

interface SignalPulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

const MATH_SYMBOLS = ['∑', '∇', 'λ', '∫', 'Ω', 'μ', 'σ', 'π'];

export default function AgentNetworkCanvas({ className }: AgentNetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let animationFrameId: number;
    let isVisible = true;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const isDarkTheme = () => document.documentElement.classList.contains('dark');

    // Create mathematical agent graph nodes
    const nodeCount = Math.min(Math.floor((width * height) / 13000), 38);
    const nodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 1.8 + 1.2;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius,
        baseRadius: radius,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
        symbol: i < MATH_SYMBOLS.length ? MATH_SYMBOLS[i] : undefined,
      });
    }

    // Active signal pulses traveling along edges
    const pulses: SignalPulse[] = [];

    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    let frameCount = 0;

    const render = () => {
      frameCount++;
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);

        const dark = isDarkTheme();
        const comp = getComputedStyle(document.documentElement);
        const aVal = comp.getPropertyValue('--glow-a').trim();
        const bVal = comp.getPropertyValue('--glow-b').trim();
        const primaryColor = aVal || (dark ? '52, 211, 153' : '16, 185, 129');
        const accentColor = bVal || (dark ? '56, 189, 248' : '6, 182, 212');
        const glowColor = aVal || (dark ? '110, 231, 183' : '52, 211, 153');

        // Connect nearby nodes and collect valid edges
        const activeEdges: { from: number; to: number }[] = [];

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];

          // Update position
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0 || node.x > width) node.vx *= -1;
          if (node.y < 0 || node.y > height) node.vy *= -1;

          node.phase += node.pulseSpeed;
          node.radius = node.baseRadius + Math.sin(node.phase) * 0.6;

          // Mouse proximity reaction
          if (mouse.active) {
            const dxm = mouse.x - node.x;
            const dym = mouse.y - node.y;
            const distMouse = Math.sqrt(dxm * dxm + dym * dym);
            if (distMouse < 180) {
              const mouseAlpha = (1 - distMouse / 180) * (dark ? 0.45 : 0.28);
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(${accentColor}, ${mouseAlpha})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();

              node.x += (dxm / distMouse) * 0.2;
              node.y += (dym / distMouse) * 0.2;
            }
          }

          // Connect with other nodes
          for (let j = i + 1; j < nodes.length; j++) {
            const other = nodes[j];
            const dx = other.x - node.x;
            const dy = other.y - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 140) {
              activeEdges.push({ from: i, to: j });
              const alpha = (1 - distance / 140) * (dark ? 0.24 : 0.12);
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = `rgba(${primaryColor}, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }

          // Draw node body
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = i % 3 === 0
            ? `rgba(${accentColor}, ${dark ? 0.8 : 0.6})`
            : `rgba(${primaryColor}, ${dark ? 0.7 : 0.5})`;
          ctx.fill();

          // Subtle glowing halo
          if (i % 4 === 0) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${glowColor}, ${dark ? 0.09 : 0.04})`;
            ctx.fill();
          }

          // Draw subtle mathematical glyph near key nodes
          if (node.symbol && i % 3 === 0) {
            ctx.font = '10px "JetBrains Mono Variable", monospace';
            ctx.fillStyle = `rgba(${accentColor}, ${dark ? 0.35 : 0.25})`;
            ctx.fillText(node.symbol, node.x + 8, node.y - 6);
          }
        }

        // Periodically spawn signal pulse packets along active edges
        if (frameCount % 45 === 0 && activeEdges.length > 0 && pulses.length < 8) {
          const edge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
          pulses.push({
            fromNode: edge.from,
            toNode: edge.to,
            progress: 0,
            speed: 0.015 + Math.random() * 0.015,
          });
        }

        // Update and draw signal pulses (simulating agent message passing)
        for (let p = pulses.length - 1; p >= 0; p--) {
          const pulse = pulses[p];
          pulse.progress += pulse.speed;

          if (pulse.progress >= 1) {
            pulses.splice(p, 1);
            continue;
          }

          const n1 = nodes[pulse.fromNode];
          const n2 = nodes[pulse.toNode];
          if (n1 && n2) {
            const px = n1.x + (n2.x - n1.x) * pulse.progress;
            const py = n1.y + (n2.y - n1.y) * pulse.progress;

            ctx.beginPath();
            ctx.arc(px, py, 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${accentColor}, ${dark ? 0.9 : 0.75})`;
            ctx.shadowColor = `rgba(${accentColor}, 0.8)`;
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ pointerEvents: 'none' }}
    />
  );
}
