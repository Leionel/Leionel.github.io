import { Link } from 'react-router-dom';
import { ArrowUpRight, NotebookPen } from 'lucide-react';
import { notes } from '../lib/notes';
import { useLanguage } from '../contexts/language';
import { Reveal, Tag } from '../components/ui';

const Notes = () => {
  const { isZh } = useLanguage();

  return (
    <div className="space-y-16 md:space-y-24">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
          {isZh ? '研究笔记' : 'Research Notes'}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {isZh ? '正在形成的认识' : 'Notes in progress'}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {isZh
            ? '不是论文，是看过、想过之后的记录——关于 Agent、数学推理与工具验证。'
            : 'Not papers — records of things I have read, thought about, and tested against real projects.'}
        </p>
      </Reveal>

      {notes.length === 0 ? (
        <Reveal>
          <div className="rounded-3xl border border-dashed border-edge bg-card px-8 py-16 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-card-muted text-ink-faint">
              <NotebookPen className="h-5 w-5" />
            </span>
            <p className="mt-5 text-[15px] font-medium text-ink">
              {isZh ? '笔记整理中' : 'Notes coming soon'}
            </p>
            <p className="mt-2 text-sm text-ink-faint">
              {isZh ? '内容会以 Markdown 形式陆续发布。' : 'Notes will be published here as Markdown, one by one.'}
            </p>
          </div>
        </Reveal>
      ) : (
        <div className="space-y-4">
          {notes.map((note, i) => (
            <Reveal key={note.slug} delay={i * 60}>
              <Link
                to={`/notes/${note.slug}`}
                className="group block rounded-2xl border border-edge bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-edge-strong hover:shadow-lg hover:shadow-zinc-950/[0.05] sm:p-8"
              >
                <div className="flex flex-wrap items-center gap-2.5">
                  {note.direction && (
                    <Tag className="border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-600 dark:text-indigo-300">
                      {note.direction}
                    </Tag>
                  )}
                  {note.date && <span className="font-mono text-xs text-ink-faint">{note.date}</span>}
                  <ArrowUpRight className="ml-auto h-4 w-4 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400 sm:text-xl">
                  {note.title}
                </h2>
                <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">{note.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
