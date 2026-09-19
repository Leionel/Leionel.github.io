import { useState, useEffect } from 'react';

export type AccentTheme = 'emerald' | 'cyan' | 'indigo' | 'amber';

export interface AccentOption {
  id: AccentTheme;
  nameZh: string;
  nameEn: string;
  colorHex: string;
}

export const ACCENT_THEMES: AccentOption[] = [
  { id: 'emerald', nameZh: '翠绿 · 算法', nameEn: 'Emerald · Matrix', colorHex: '#10b981' },
  { id: 'cyan', nameZh: '极光 · 深海', nameEn: 'Cyan · Research', colorHex: '#06b6d4' },
  { id: 'indigo', nameZh: '星云 · 前沿', nameEn: 'Violet · Cosmic', colorHex: '#6366f1' },
  { id: 'amber', nameZh: '琥珀 · 数学', nameEn: 'Amber · Math', colorHex: '#f59e0b' },
];

export function useAccentTheme() {
  const [accent, setAccent] = useState<AccentTheme>(() => {
    try {
      const saved = localStorage.getItem('accent-theme') as AccentTheme | null;
      if (saved && ['emerald', 'cyan', 'indigo', 'amber'].includes(saved)) {
        return saved;
      }
    } catch {}
    return 'emerald';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-accent', accent);
    try {
      localStorage.setItem('accent-theme', accent);
    } catch {}
    // Trigger custom event so Canvas and other components react instantly
    window.dispatchEvent(new CustomEvent('accent-theme-change', { detail: { accent } }));
  }, [accent]);

  return {
    accent,
    setAccent,
    themes: ACCENT_THEMES,
  };
}
