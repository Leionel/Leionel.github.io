import { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getNote } from '../lib/notes';
import { useLanguage } from '../contexts/language';
import { Reveal, Tag } from '../components/ui';

const NoteDetail = () => {
  const { slug } = useParams();
  const { isZh } = useLanguage();
  const note = getNote(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!note) return <Navigate to="/notes" replace />;

  return (
    <div className="mx-auto max-w-3xl">
      <Reveal>
        <Link
          to="/notes"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          {isZh ? '全部笔记' : 'All notes'}
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {note.direction && (
            <Tag className="border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-600 dark:text-indigo-300">
              {note.direction}
            </Tag>
          )}
          {note.date && <span className="font-mono text-xs text-ink-faint">{note.date}</span>}
        </div>

        <h1 className="mt-4 text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">{note.title}</h1>
      </Reveal>

      <Reveal delay={80}>
        <article
          className="md-body mt-10"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />
      </Reveal>

      <Reveal delay={120}>
        <div className="mt-14 border-t border-edge pt-8">
          <Link
            to="/notes"
            className="inline-flex items-center gap-2 rounded-full border border-edge bg-card px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-edge-strong"
          >
            <ArrowLeft className="h-4 w-4" />
            {isZh ? '返回笔记列表' : 'Back to notes'}
          </Link>
        </div>
      </Reveal>
    </div>
  );
};

export default NoteDetail;
