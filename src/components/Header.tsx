import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { useLanguage } from '../contexts/language';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';
import ThemeColorPicker from './ThemeColorPicker';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isZh, toggleLanguage } = useLanguage();
  const { toggleTheme, isDark } = useTheme();

  const handleOpenSearch = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  const navLinks = [
    { name: isZh ? '首页' : 'Home', path: '/' },
    { name: isZh ? '关于' : 'About', path: '/about' },
    { name: isZh ? '项目' : 'Projects', path: '/projects' },
    { name: isZh ? '笔记' : 'Notes', path: '/notes' },
    { name: isZh ? '技能' : 'Skills', path: '/skills' },
    { name: isZh ? '奖项' : 'Awards', path: '/awards' },
    { name: isZh ? '联系' : 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile sheet whenever the route changes.
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const iconBtn =
    'inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-card-muted hover:text-ink';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all duration-300',
        scrolled || isOpen
          ? 'border-edge/70 bg-canvas/80 shadow-sm shadow-zinc-950/[0.03]'
          : 'border-transparent bg-canvas/50',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-[15px] font-bold text-white shadow-md shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-indigo-500/40">
            <span className="relative z-10">S</span>
            <span className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-ink transition-colors">
            Shengxin<span className="text-ink-faint transition-colors group-hover:text-indigo-500/70">&nbsp;Xiao</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-edge/60 bg-card/40 p-1 backdrop-blur-md md:flex">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200',
                  active
                    ? 'bg-card text-ink shadow-sm shadow-zinc-950/[0.06]'
                    : 'text-ink-muted hover:text-ink hover:bg-card-muted/60',
                )}
              >
                {link.name}
                {active && (
                  <span className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-indigo-500/80" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          {/* Quick Search trigger (Cmd+K) */}
          <button
            onClick={handleOpenSearch}
            className={cn(
              iconBtn,
              'relative border border-edge/60 bg-card/40 hover:border-edge-strong',
            )}
            title={isZh ? '全局搜索 (Cmd+K)' : 'Search (Cmd+K)'}
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>

          {/* Dynamic Theme Color Palette Switcher */}
          <ThemeColorPicker />

          {/* Animated Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={cn(
              iconBtn,
              'relative overflow-hidden border border-edge/60 bg-card/40 hover:border-edge-strong',
            )}
            aria-label="Toggle theme"
          >
            <span
              className={cn(
                'flex items-center justify-center transition-all duration-300',
                isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0 absolute',
              )}
            >
              <Sun className="h-[18px] w-[18px] text-amber-400" />
            </span>
            <span
              className={cn(
                'flex items-center justify-center transition-all duration-300',
                !isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0 absolute',
              )}
            >
              <Moon className="h-[18px] w-[18px] text-indigo-500" />
            </span>
          </button>

          {/* Desktop Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="hidden h-9 items-center rounded-full border border-edge/60 bg-card/40 p-0.5 text-xs font-semibold text-ink-faint transition-all hover:border-edge-strong sm:flex"
            aria-label="Toggle language"
          >
            <span
              className={cn(
                'rounded-full px-2.5 py-1 transition-all duration-200',
                isZh ? 'bg-card text-ink shadow-sm' : 'hover:text-ink',
              )}
            >
              中
            </span>
            <span
              className={cn(
                'rounded-full px-2.5 py-1 transition-all duration-200',
                !isZh ? 'bg-card text-ink shadow-sm' : 'hover:text-ink',
              )}
            >
              EN
            </span>
          </button>

          {/* Mobile Language Button */}
          <button
            onClick={toggleLanguage}
            className={cn(iconBtn, 'text-xs font-bold border border-edge/60 bg-card/40 sm:hidden')}
            aria-label="Toggle language"
          >
            {isZh ? 'EN' : '中'}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              iconBtn,
              'border border-edge/60 bg-card/40 md:hidden transition-transform duration-200',
              isOpen && 'rotate-90',
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="border-t border-edge bg-canvas/95 backdrop-blur-xl animate-in fade-in-0 slide-in-from-top-2 duration-200 md:hidden">
          <nav className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'flex items-center justify-between rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors',
                  isActive(link.path)
                    ? 'bg-card-muted text-ink font-semibold'
                    : 'text-ink-muted hover:bg-card-muted hover:text-ink',
                )}
              >
                <span>{link.name}</span>
                {isActive(link.path) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
