import { Github, Mail, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import personalData from '../data/personal.json';
import { useLanguage } from '../contexts/language';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { isZh } = useLanguage();

  const socials = [
    {
      label: 'GitHub',
      href: `https://github.com/${personalData.contact.github}`,
      icon: <Github className="h-[18px] w-[18px]" />,
    },
    {
      label: 'Email',
      href: `mailto:${personalData.contact.email}`,
      icon: <Mail className="h-[18px] w-[18px]" />,
    },
  ];

  return (
    <footer className="border-t border-edge/80 bg-canvas/40 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-ink-faint">
          <span>&copy; {currentYear} Shengxin Xiao</span>
          <span className="text-edge-strong">·</span>
          <span>{isZh ? '武汉大学 数学与统计学院' : 'Wuhan University'}</span>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-edge/60 bg-card/40 text-ink-faint transition-all duration-200 hover:scale-110 hover:border-edge-strong hover:bg-card hover:text-ink"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
          <span className="mx-2 hidden text-xs text-ink-faint/70 sm:inline flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-indigo-500/70" />
            {isZh ? '以数学为基 · 构建可靠智能体' : 'Grounded in Math · Building Reliable Agents'}
          </span>
        </div>
      </div>
      <div className="sr-only">
        <Link to="/">{isZh ? '返回首页' : 'Back to home'}</Link>
      </div>
    </footer>
  );
};

export default Footer;
