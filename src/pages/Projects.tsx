import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check, FileText, Flag, Github, Sparkles, User } from 'lucide-react';
import personalData from '../data/personal.json';
import projectsData from '../data/projects.json';
import directionsData from '../data/directions.json';
import { useLanguage } from '../contexts/language';
import { Reveal, SectionHeading, Tag } from '../components/ui';
import SpotlightCard from '../components/SpotlightCard';
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

const categories = [
  { id: 'all', labelZh: '全部项目', labelEn: 'All Projects' },
  { id: 'agent', labelZh: '智能体系统', labelEn: 'Agent Systems' },
  { id: 'harness', labelZh: 'Harness & 开源', labelEn: 'Harness & Tools' },
  { id: 'competition', labelZh: '竞赛实践', labelEn: 'Competitions' },
];

const Projects = () => {
  const { isZh } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projectsData.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'agent') return p.tags.some(t => /agent/i.test(t));
    if (activeFilter === 'harness') return p.tags.some(t => /harness|cli|python/i.test(t));
    if (activeFilter === 'competition') return Boolean(p.status) || /cup|c4|大赛|竞赛/i.test(p.type + p.typeZh);
    return true;
  });

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
            ? '从竞赛作品到科研项目，围绕可靠的智能体执行环境与工具验证落地。'
            : 'From competition entries to research programs — grounded in reliable agent harnesses and tool verification.'}
        </p>

        {/* Filter pills */}
        <div className="mt-8 flex flex-wrap items-center gap-2">
          {categories.map((c) => {
            const active = activeFilter === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveFilter(c.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
                  active
                    ? 'bg-ink text-canvas shadow-sm shadow-zinc-950/10 scale-[1.02]'
                    : 'border border-edge/80 bg-card text-ink-muted hover:border-edge-strong hover:text-ink'
                }`}
              >
                {isZh ? c.labelZh : c.labelEn}
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* ----------------------------- Projects ---------------------------- */}
      <section className="space-y-6">
        {filteredProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 60}>
            <SpotlightCard className="group relative overflow-hidden rounded-3xl p-7 sm:p-10 transition-all duration-300 hover:-translate-y-1">
              <span className="pointer-events-none absolute right-7 top-6 font-mono text-5xl font-bold text-ink/[0.04] transition-colors duration-300 group-hover:text-indigo-500/10 sm:right-10 sm:text-6xl">
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

                  <h2 className="mt-4 text-xl font-bold tracking-tight text-ink transition-colors sm:text-2xl">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                      {isZh ? p.nameZh : p.name}
                    </Link>
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
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-1.5">
                    {p.tags.map((t) => (
                      <Tag key={t} className="transition-colors group-hover:border-edge-strong">{t}</Tag>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-2.5">
                    <Link
                      to={`/projects/${p.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-canvas transition-all duration-200 hover:opacity-85 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isZh ? '阅读复盘' : 'Case study'}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-card-muted/80 px-4 py-2 text-xs font-semibold text-ink-muted transition-all duration-200 hover:border-edge-strong hover:text-ink hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Github className="h-3.5 w-3.5" />
                        GitHub
                        <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>

                {projectImages[p.id] && (
                  <div className="flex items-center">
                    <div className="relative w-full overflow-hidden rounded-2xl border border-edge bg-card-muted/50">
                      <img
                        src={projectImages[p.id]}
                        alt={isZh ? p.nameZh : p.name}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                )}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </section>

      {/* --------------------------- Directions ---------------------------- */}
      <section>
        <SectionHeading
          eyebrow={isZh ? '感兴趣方向' : 'Research Interests'}
          title={isZh ? '长期关注的方向' : 'Directions I care about'}
        />
        <div className="mt-8 divide-y divide-edge overflow-hidden rounded-2xl border border-edge bg-card shadow-sm">
          {directionsData.map((d, i) => (
            <Reveal key={d.id} delay={i * 50}>
              <div className="group flex items-baseline gap-5 px-6 py-5 transition-all duration-200 hover:bg-card-muted/60 sm:px-8">
                <span className="font-mono text-sm font-semibold text-indigo-500/80 dark:text-indigo-400/80">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-ink transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {isZh ? d.titleZh : d.title}
                  </h3>
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
              <SpotlightCard className="flex items-center justify-between gap-4 px-6 py-5 sm:px-8">
                <div className="flex min-w-0 items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card-muted text-ink-faint">
                    <FileText className="h-4 w-4" />
                  </span>
                  <p className="truncate text-[15px] font-medium text-ink">{isZh ? paper.zh : paper.en}</p>
                </div>
                <Tag className="shrink-0 border-indigo-500/20 bg-indigo-500/[0.05] text-indigo-500 dark:text-indigo-400">
                  <Sparkles className="mr-1 h-3 w-3" />
                  {isZh ? '准备中' : 'In progress'}
                </Tag>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
