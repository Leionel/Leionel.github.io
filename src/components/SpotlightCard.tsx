import { useRef, type MouseEvent, type ReactNode } from 'react';
import { cn } from '../lib/utils';

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: () => void;
}

export default function SpotlightCard({
  children,
  className,
  spotlightColor,
  onClick,
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      className={cn(
        'spotlight-card rounded-2xl border border-edge bg-card shadow-sm shadow-zinc-950/[0.03] hover:border-edge-strong hover:shadow-lg hover:shadow-zinc-950/[0.05]',
        className,
      )}
      style={
        spotlightColor
          ? ({ '--glow-a': spotlightColor } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
