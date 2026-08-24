import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/language';
import { Reveal } from '../components/ui';

const NotFound = () => {
  const { isZh } = useLanguage();

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <Reveal>
        <p className="font-mono text-7xl font-bold tracking-tight text-gradient sm:text-8xl">404</p>
        <h1 className="mt-6 text-xl font-semibold text-ink">
          {isZh ? '页面走丢了' : 'This page went missing'}
        </h1>
        <p className="mt-2 text-[15px] text-ink-muted">
          {isZh ? '你要找的内容不在这里。' : 'The page you’re looking for doesn’t exist.'}
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-all hover:opacity-85"
        >
          <ArrowLeft className="h-4 w-4" />
          {isZh ? '回到首页' : 'Back to Home'}
        </Link>
      </Reveal>
    </div>
  );
};

export default NotFound;
