import { ArrowUpRight, Check, FileText, Flag, Github, User } from 'lucide-react';
import personalData from '../data/personal.json';
import projectsData from '../data/projects.json';
import directionsData from '../data/directions.json';
import { useLanguage } from '../contexts/language';
import { Reveal, SectionHeading, Tag } from '../components/ui';
import projectMemoPreview from '../assets/projectmemo-preview.jpg';

const projectImages: Record<number, string> = { 3: projectMemoPreview };

const papers = [
  {
    zh: '基于深度学习的文档结构解析研究',
    en: 'Document Structure Parsing with Deep Learning',
  },
  {
    zh: '智能体系统在数学教育中的应用探索',
    en: 'Agent Systems for Mathematics Education',
  },
];

const Projects = () => {
  const { isZh } = useLanguage();

  return (
    <div className="space-y-24 md:space-y-32">
      {/* ------------------------------ Header ----------------------------- */}
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
          {isZh ? '项目实践' : 'Portfolio'}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {isZh ? '项目与探索' : 'Projects & Exploration'}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {isZh
            ? '从竞赛作品到科研项目，每一个都在认真做。'
            : 'From competition entries to research programs — each one built with intent.'}
        </p>
      </Reveal>

      {/* ----------------------------- Projects ---------------------------- */}
      <section className="space-y-6">
        {projectsData.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <article className="group relative overflow-hidden rounded-3xl border border-edge bg-card p-7 transition-all duration-300 hover:border-edge-strong hover:shadow-xl hover:shadow-zinc-950/[0.06] sm:p-10">
              <span className="pointer-events-none absolute right-7 top-6 font-mono text-5xl font-bold text-ink/[0.04] transition-colors group-hover:text-indigo-500/10 sm:right-10 sm:text-6xl">
                {String(i + 1).padStart(2, '0')}
              </span>

              <div className={projectImages[p.id] ? 'grid gap-8 lg:grid-cols-[1.1fr_0.9fr]' : ''}>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Tag className="border-indigo-500/25 bg-indigo-500/[0.07] text-indigo-600 dark:text-indigo-300">
                      {isZh ? p.typeZh : p.type}
                    </Tag>
                    {p.status && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-600 ring-1 ring-inset ring-violet-500/25 dark:text-violet-300">
                        <Flag className="h-3 w-3" />
                        {isZh ? p.statusZh : p.status}
                      </span>
                    )}
                    <span className="font-mono text-xs text-ink-faint">{isZh ? p.periodZh : p.period}</span>
                  </div>

                  <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    {isZh ? p.nameZh : p.name}
                  </h2>

                  <p className="mt-2 inline-flex items-center gap-1.5 text-[13px] text-ink-faint">
                    <User className="h-3.5 w-3.5" />
                    {isZh ? p.roleZh : p.role}
                    <span className="mx-1 text-edge-strong">·</span>
                    {isZh ? personalData.education.universityZh : personalData.education.university}
                  </p>

                  <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
                    {isZh ? p.descriptionZh : p.description}
                  </p>

                  <div className="mt-6">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
                      {isZh ? '关键工作' : 'Key contributions'}
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {(isZh ? p.detailsZh : p.details).map((d, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500 dark:text-indigo-400" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-1.5">
                    {p.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>

                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-edge bg-card-muted px-4 py-2 text-xs font-semibold text-ink-muted transition-colors hover:border-edge-strong hover:text-ink"
                    >
                      <Github className="h-3.5 w-3.5" />
                      GitHub
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
                    </a>
                  )}
                </div>

                {projectImages[p.id] && (
                  <div className="flex items-center">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-edge">
                      <img
                        src={projectImages[p.id]}
                        alt={isZh ? p.nameZh : p.name}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      {/* --------------------------- Directions ---------------------------- */}
      <section>
        <SectionHeading
          eyebrow={isZh ? '感兴趣方向' : 'Research Interests'}
          title={isZh ? '长期关注的方向' : 'Directions I care about'}
        />
        <div className="mt-8 divide-y divide-edge overflow-hidden rounded-2xl border border-edge bg-card">
          {directionsData.map((d, i) => (
            <Reveal key={d.id} delay={i * 50}>
              <div className="group flex items-baseline gap-5 px-6 py-5 transition-colors hover:bg-card-muted sm:px-8">
                <span className="font-mono text-sm text-indigo-500/70 dark:text-indigo-400/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-ink">{isZh ? d.titleZh : d.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-muted">{isZh ? d.descZh : d.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------------ Papers ----------------------------- */}
      <section>
        <SectionHeading
          eyebrow={isZh ? '论文' : 'Papers'}
          title={isZh ? '进行中的写作' : 'Works in progress'}
        />
        <div className="mt-8 space-y-3">
          {papers.map((paper, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="flex items-center justify-between gap-4 rounded-2xl border border-edge bg-card px-6 py-5 transition-colors hover:border-edge-strong sm:px-8">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card-muted text-ink-faint">
                    <FileText className="h-4 w-4" />
                  </span>
                  <p className="truncate text-[15px] font-medium text-ink">{isZh ? paper.zh : paper.en}</p>
                </div>
                <Tag className="shrink-0">{isZh ? '准备中' : 'In progress'}</Tag>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
