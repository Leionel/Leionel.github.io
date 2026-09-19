import { useState, useRef, useEffect } from 'react';
import { Palette, Check } from 'lucide-react';
import { useAccentTheme, type AccentTheme } from '../hooks/useAccentTheme';
import { useLanguage } from '../contexts/language';

export default function ThemeColorPicker() {
  const { accent, setAccent, themes } = useAccentTheme();
  const { isZh } = useLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeTheme = themes.find((t) => t.id === accent);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="group relative flex h-9 w-9 items-center justify-center rounded-full border border-edge/60 bg-card/40 text-ink-muted transition-all duration-200 hover:border-edge-strong hover:bg-card-muted/70 hover:text-ink active:scale-95"
        title={isZh ? '切换主题配色' : 'Change color palette'}
        aria-label="Theme palette"
      >
        <Palette className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
        {/* Active color dot indicator */}
        <span
          className="absolute bottom-1 right-1 h-2 w-2 rounded-full ring-2 ring-card shadow-sm"
          style={{ backgroundColor: activeTheme?.colorHex || '#10b981' }}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-44 rounded-2xl border border-edge/80 bg-card/95 p-1.5 shadow-xl shadow-zinc-950/15 backdrop-blur-xl animate-in fade-in-0 zoom-in-95 duration-150">
          <p className="px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
            {isZh ? '主题主色调' : 'Accent Palette'}
          </p>
          <div className="space-y-0.5">
            {themes.map((t) => {
              const isCurrent = t.id === accent;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setAccent(t.id as AccentTheme);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
                    isCurrent
                      ? 'bg-card-muted text-ink font-semibold'
                      : 'text-ink-muted hover:bg-card-muted/60 hover:text-ink'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-3.5 w-3.5 rounded-full shadow-sm"
                      style={{ backgroundColor: t.colorHex }}
                    />
                    <span>{isZh ? t.nameZh : t.nameEn}</span>
                  </div>
                  {isCurrent && <Check className="h-3.5 w-3.5 text-ink" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
