import { Github, Mail } from 'lucide-react';
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
    <footer className="border-t border-edge">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-ink-faint">
          &copy; {currentYear} Shengxin Xiao<span className="mx-2 text-edge-strong">·</span>
          {isZh ? '武汉大学 数学与统计学院' : 'Wuhan University'}
        </p>

        <div className="flex items-center gap-1">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith('http') ? '_blank' : undefined}
              rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-card-muted hover:text-ink"
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
          <span className="mx-2 hidden text-xs text-ink-faint/70 sm:inline">
            {isZh ? '用 React 与 Tailwind 构建' : 'Built with React & Tailwind'}
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
