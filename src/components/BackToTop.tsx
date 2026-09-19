import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/language';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const { isZh } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollPercentage(Math.min(100, Math.max(0, (scrollY / totalHeight) * 100)));
      }
      setVisible(scrollY > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (scrollPercentage / 100) * circumference;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-edge bg-card/90 text-ink shadow-lg shadow-zinc-950/10 backdrop-blur transition-all duration-300 hover:border-indigo-500/50 hover:scale-110 active:scale-95"
        aria-label={isZh ? '返回顶部' : 'Back to top'}
        title={isZh ? '返回顶部' : 'Back to top'}
      >
        <svg className="absolute inset-0 -rotate-90" width="44" height="44">
          <circle
            cx="22"
            cy="22"
            r="18"
            className="stroke-edge"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="22"
            cy="22"
            r="18"
            className="stroke-indigo-500 transition-all duration-150"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <ArrowUp className="h-4 w-4 text-ink transition-transform duration-300 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
