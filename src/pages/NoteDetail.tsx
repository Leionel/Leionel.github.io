import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Clock, Copy, Share2 } from 'lucide-react';
import { getNote } from '../lib/notes';
import { useLanguage } from '../contexts/language';
import { Reveal, Tag } from '../components/ui';

const NoteDetail = () => {
  const { slug } = useParams();
  const { isZh } = useLanguage();
  const note = getNote(slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!note) return <Navigate to="/notes" replace />;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <div className="flex items-center justify-between">
          <Link
            to="/notes"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {isZh ? '全部笔记' : 'All notes'}
          </Link>
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 rounded-full border border-edge/80 bg-card px-3 py-1 text-xs font-medium text-ink-muted transition-colors hover:border-edge-strong hover:text-ink"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-500">{isZh ? '链接已复制' : 'Copied'}</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>{isZh ? '分享' : 'Share'}</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {note.direction && (
            <Tag className="border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-600 dark:text-indigo-300">
              {note.direction}
            </Tag>
          )}
          {note.date && <span className="font-mono text-xs text-ink-faint">{note.date}</span>}
          <span className="inline-flex items-center gap-1 font-mono text-xs text-ink-faint">
            <Clock className="h-3 w-3" />
            {isZh ? '约 5 分钟阅读' : '5 min read'}
          </span>
        </div>

        <h1 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-ink sm:text-4xl">{note.title}</h1>
      </Reveal>

      <Reveal delay={80}>
        <article
          className="md-body mt-10 rounded-3xl border border-edge/80 bg-card p-6 sm:p-10 shadow-sm"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-14 border-t border-edge pt-8 flex items-center justify-between">
          <Link
            to="/notes"
            className="group inline-flex items-center gap-2 rounded-full border border-edge bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-all hover:border-edge-strong hover:scale-[1.02] active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {isZh ? '返回笔记列表' : 'Back to notes'}
          </Link>
        </div>
      </Reveal>
    </div>
  );
};

export default NoteDetail;
