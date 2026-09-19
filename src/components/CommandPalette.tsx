import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Compass,
  FileText,
  Workflow,
  Sparkles,
  Sun,
  Moon,
  X,
  Palette,
  ArrowRight,
  Download,
} from 'lucide-react';
import { useLanguage } from '../contexts/language';
import { useTheme } from '../hooks/useTheme';
import { useAccentTheme, type AccentTheme } from '../hooks/useAccentTheme';
import projectsData from '../data/projects.json';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { isZh } = useLanguage();
  const { toggleTheme, isDark } = useTheme();
  const { setAccent, themes } = useAccentTheme();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else window.dispatchEvent(new CustomEvent('open-command-palette'));
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navItems = [
    { labelZh: '首页', labelEn: 'Home', path: '/', icon: <Compass className="h-4 w-4" /> },
    { labelZh: '关于我', labelEn: 'About', path: '/about', icon: <Compass className="h-4 w-4" /> },
    { labelZh: '全部项目', labelEn: 'Projects', path: '/projects', icon: <Workflow className="h-4 w-4" /> },
    { labelZh: '研究笔记', labelEn: 'Notes', path: '/notes', icon: <FileText className="h-4 w-4" /> },
    { labelZh: '技能专长', labelEn: 'Skills', path: '/skills', icon: <Sparkles className="h-4 w-4" /> },
    { labelZh: '奖项成就', labelEn: 'Awards', path: '/awards', icon: <Sparkles className="h-4 w-4" /> },
    { labelZh: '联系方式', labelEn: 'Contact', path: '/contact', icon: <Compass className="h-4 w-4" /> },
  ];

  const projectItems = projectsData.map((p) => ({
    labelZh: p.nameZh,
    labelEn: p.name,
    path: `/projects/${p.slug}`,
    icon: <Workflow className="h-4 w-4" />,
    type: isZh ? p.typeZh : p.type,
  }));

  const filteredNav = navItems.filter((i) =>
    (i.labelZh + i.labelEn).toLowerCase().includes(query.toLowerCase()),
  );

  const filteredProjects = projectItems.filter((p) =>
    (p.labelZh + p.labelEn + p.type).toLowerCase().includes(query.toLowerCase()),
  );

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-zinc-950/60 p-4 pt-20 backdrop-blur-md animate-in fade-in-0 duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-edge/80 bg-card shadow-2xl shadow-zinc-950/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center border-b border-edge/80 px-4 py-3.5">
          <Search className="h-4 w-4 text-ink-faint mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isZh ? '搜索页面、项目、笔记或执行操作...' : 'Type a command or search...'}
            className="w-full bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center rounded border border-edge bg-card-muted px-1.5 py-0.5 font-mono text-[10px] text-ink-faint">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {/* Navigation Section */}
          {filteredNav.length > 0 && (
            <div>
              <p className="px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                {isZh ? '页面导航' : 'Pages'}
              </p>
              <div className="mt-1 space-y-0.5">
                {filteredNav.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleSelect(item.path)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-card-muted text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-ink-faint">{item.icon}</span>
                      <span>{isZh ? item.labelZh : item.labelEn}</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-ink-faint" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {filteredProjects.length > 0 && (
            <div>
              <p className="px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
                {isZh ? '项目复盘' : 'Projects'}
              </p>
              <div className="mt-1 space-y-0.5">
                {filteredProjects.map((p) => (
                  <button
                    key={p.path}
                    onClick={() => handleSelect(p.path)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-card-muted text-left"
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-indigo-500">{p.icon}</span>
                        <span className="font-semibold truncate">{isZh ? p.labelZh : p.labelEn}</span>
                      </div>
                      <span className="text-[11px] text-ink-faint ml-6 block truncate">{p.type}</span>
                    </div>
                    <ArrowRight className="h-3 w-3 text-ink-faint shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div>
            <p className="px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
              {isZh ? '快捷操作' : 'Quick Actions'}
            </p>
            <div className="mt-1 space-y-0.5">
              <button
                onClick={() => {
                  toggleTheme();
                  onClose();
                }}
                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-ink transition-colors hover:bg-card-muted text-left"
              >
                <div className="flex items-center gap-2.5">
                  {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-500" />}
                  <span>{isZh ? '切换日间 / 夜间模式' : 'Toggle Dark / Light Theme'}</span>
                </div>
                <span className="font-mono text-[10px] text-ink-faint">{isDark ? 'Dark' : 'Light'}</span>
              </button>

              <div className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-ink">
                <div className="flex items-center gap-2.5">
                  <Palette className="h-4 w-4 text-ink-faint" />
                  <span>{isZh ? '配色方案' : 'Color Palette'}</span>
                </div>
                <div className="flex items-center gap-1">
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setAccent(t.id as AccentTheme);
                        onClose();
                      }}
                      className="h-4 w-4 rounded-full transition-transform hover:scale-125"
                      style={{ backgroundColor: t.colorHex }}
                      title={isZh ? t.nameZh : t.nameEn}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-edge/80 bg-card-muted/40 px-4 py-2 flex items-center justify-between text-[11px] text-ink-faint">
          <span>{isZh ? '按 ESC 退出' : 'Press ESC to close'}</span>
          <span className="font-mono">Shengxin Xiao Portfolio</span>
        </div>
      </div>
    </div>
  );
}
