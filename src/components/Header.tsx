import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useLanguage } from '../contexts/language';
import { useTheme } from '../hooks/useTheme';
import { cn } from '../lib/utils';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isZh, toggleLanguage } = useLanguage();
  const { toggleTheme, isDark } = useTheme();

  const navLinks = [
    { name: isZh ? '首页' : 'Home', path: '/' },
    { name: isZh ? '关于' : 'About', path: '/about' },
    { name: isZh ? '项目' : 'Projects', path: '/projects' },
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
          ? 'border-edge bg-canvas/85 shadow-sm shadow-zinc-950/[0.04]'
          : 'border-transparent bg-canvas/60',
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-[15px] font-bold text-white shadow-md shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
            S
          </span>
          <span className="text-[17px] font-semibold tracking-tight text-ink">
            Shengxin<span className="text-ink-faint">&nbsp;Xiao</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
                isActive(link.path)
                  ? 'bg-card-muted text-ink'
                  : 'text-ink-muted hover:text-ink',
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button onClick={toggleTheme} className={iconBtn} aria-label="Toggle theme">
            {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <button
            onClick={toggleLanguage}
            className="hidden h-9 items-center rounded-full border border-edge bg-card p-0.5 text-xs font-semibold text-ink-faint transition-colors hover:border-edge-strong sm:flex"
            aria-label="Toggle language"
          >
            <span
              className={cn(
                'rounded-full px-2.5 py-1 transition-colors',
                isZh ? 'bg-card-muted text-ink' : '',
              )}
            >
              中
            </span>
            <span
              className={cn(
                'rounded-full px-2.5 py-1 transition-colors',
                !isZh ? 'bg-card-muted text-ink' : '',
              )}
            >
              EN
            </span>
          </button>

          <button onClick={toggleLanguage} className={cn(iconBtn, 'text-xs font-bold sm:hidden')} aria-label="Toggle language">
            {isZh ? 'EN' : '中'}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(iconBtn, 'md:hidden')}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-edge bg-canvas/95 md:hidden">
          <nav className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'block rounded-xl px-4 py-2.5 text-[15px] font-medium transition-colors',
                  isActive(link.path) ? 'bg-card-muted text-ink' : 'text-ink-muted hover:bg-card-muted hover:text-ink',
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
