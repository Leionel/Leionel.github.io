import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '../lib/utils';

/* ---------------------------------------------------------------------------
 * Reveal — fades/slides children in the first time they enter the viewport.
 * Lightweight IntersectionObserver alternative to a full motion library.
 * ------------------------------------------------------------------------- */
interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. */
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * SectionHeading — eyebrow label + title + optional lede, used at the top of
 * every page section so vertical rhythm stays consistent.
 * ------------------------------------------------------------------------- */
interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ eyebrow, title, lede, align = 'left', className }: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
      {lede && <p className="mt-3 text-base leading-relaxed text-ink-muted">{lede}</p>}
    </Reveal>
  );
}

/* ---------------------------------------------------------------------------
 * Card — the single shared surface style.
 * ------------------------------------------------------------------------- */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-edge bg-card shadow-sm shadow-zinc-950/[0.03] transition-colors duration-300',
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------------------
 * Tag — small pill for tech / meta labels.
 * ------------------------------------------------------------------------- */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-edge bg-card-muted px-2.5 py-1 font-mono text-[11px] leading-none text-ink-muted transition-colors',
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * Badge — accent-filled pill for statuses like award levels or milestones.
 * ------------------------------------------------------------------------- */
export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-500/20 dark:text-indigo-300',
        className,
      )}
    >
      {children}
    </span>
  );
}
