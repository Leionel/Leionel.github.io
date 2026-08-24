import { ArrowRight, ArrowUpRight, Download, Medal, Network, Sigma, Sparkles, Workflow, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import personalData from '../data/personal.json';
import projectsData from '../data/projects.json';
import directionsData from '../data/directions.json';
import nowData from '../data/now.json';
import { useLanguage } from '../contexts/language';
import { Reveal, SectionHeading, Tag } from '../components/ui';
import profilePhoto from '../assets/profile-photo.jpg';
import pmPreview from '../assets/projectmemo-preview.jpg';

const directionIcons: Record<string, React.ReactNode> = {
  harness: <Workflow className="h-5 w-5" />,
  'multi-agent': <Network className="h-5 w-5" />,
  'math-reasoning': <Sigma className="h-5 w-5" />,
  rag: <Database className="h-5 w-5" />,
};

const Home = () => {
  const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;
  const { isZh } = useLanguage();

  const featured = projectsData.slice(0, 3);

  const stats = [
    { value: isZh ? '3 项' : '3', label: isZh ? '竞赛奖项' : 'Competition awards' },
    { value: isZh ? '4 个' : '4', label: isZh ? '在研项目' : 'Active projects' },
    { value: isZh ? '3 个' : '3', label: isZh ? '开源仓库' : 'Open-source repos' },
  ];

  return (
    <div className="space-y-28 md:space-y-36">
      {/* ------------------------------- Hero ------------------------------ */}
      <section className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div className="max-w-2xl">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-edge bg-card px-4 py-1.5 text-[13px] font-medium text-ink-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              {isZh ? '武汉大学 · 信息与计算科学' : 'Wuhan University · Information & Computing Science'}
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-7 text-[2.6rem] font-bold leading-[1.12] tracking-tight text-ink sm:text-6xl sm:leading-[1.08]">
              {isZh ? (
                <>
                  以数学为基，
                  <br />
                  构建<span className="text-gradient">可靠的智能体</span>
                </>
              ) : (
                <>
                  Building <span className="text-gradient">reliable agents</span>,
                  <br />
                  grounded in mathematics.
                </>
              )}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {isZh ? personalData.bioZh : personalData.bio}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/projects"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-all hover:opacity-85 hover:shadow-lg hover:shadow-zinc-950/10"
              >
                {isZh ? '查看项目' : 'View Projects'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full border border-edge bg-card px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-edge-strong"
              >
                {isZh ? '联系我' : 'Contact Me'}
              </Link>
              <a
                href={resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
              >
                <Download className="h-4 w-4" />
                {isZh ? '简历' : 'Resume'}
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-edge pt-7">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-xl font-semibold tracking-tight text-ink">{s.value}</dd>
                  <dd className="mt-0.5 text-[13px] text-ink-faint">{s.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Photo composition */}
        <Reveal delay={200} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-fuchsia-500/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-edge shadow-2xl shadow-zinc-950/10">
            <img
              src={profilePhoto}
              alt={isZh ? '肖圣鑫的照片' : 'Photo of Shengxin Xiao'}
              className="aspect-[4/5] w-full object-cover object-bottom"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
          </div>

          <div className="animate-float absolute -left-4 top-10 hidden items-center gap-2.5 rounded-2xl border border-edge bg-card/90 py-2.5 pl-3 pr-4 shadow-lg shadow-zinc-950/[0.06] backdrop-blur sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400">
              <Medal className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-ink">{isZh ? '全国数学竞赛' : 'CMC'}</p>
              <p className="text-xs text-ink-faint">{isZh ? '省级一等奖' : 'First Prize'}</p>
            </div>
          </div>

          <div className="animate-float-delayed absolute -right-3 bottom-12 hidden items-center gap-2.5 rounded-2xl border border-edge bg-card/90 py-2.5 pl-3 pr-4 shadow-lg shadow-zinc-950/[0.06] backdrop-blur sm:flex">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-400">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-ink">{isZh ? '忆程 ProjectMemo' : 'ProjectMemo'}</p>
              <p className="text-xs text-ink-faint">{isZh ? 'C4-AI 已进复赛' : 'C4-AI Semifinalist'}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ------------------------------- Now ------------------------------- */}
      <section>
        <Reveal>
          <div className="rounded-3xl border border-edge bg-card p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
                </span>
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-ink">Now</h2>
              </div>
              <span className="font-mono text-xs text-ink-faint">{isZh ? nowData.updatedZh : nowData.updatedEn}</span>
            </div>
            <div className="mt-6 grid gap-7 sm:grid-cols-3">
              {[nowData.exploring, nowData.building, nowData.reading].map((col) => (
                <div key={col.label}>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                    {isZh ? col.labelZh : col.label}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {(isZh ? col.items : col.itemsEn).map((it) => (
                      <li key={it} className="text-sm leading-relaxed text-ink-muted">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* --------------------------- Directions --------------------------- */}
      <section>
        <SectionHeading
          eyebrow={isZh ? '研究方向' : 'Research Directions'}
          title={isZh ? '我在关注什么' : 'What I’m working on'}
          lede={
            isZh
              ? '围绕智能体的可靠性展开：从执行环境、协作机制，到可验证的数学推理。'
              : 'Reliability of intelligent agents — from execution harnesses and collaboration to verifiable mathematical reasoning.'
          }
        />
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {directionsData.map((d, i) => (
            <Reveal key={d.id} delay={i * 70}>
              <div className="group h-full rounded-2xl border border-edge bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-edge-strong hover:shadow-lg hover:shadow-zinc-950/[0.05]">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-500 transition-colors group-hover:from-indigo-500/20 group-hover:to-violet-500/20 dark:text-indigo-400">
                  {directionIcons[d.id]}
                </div>
                <h3 className="mt-4 text-[15px] font-semibold text-ink">{isZh ? d.titleZh : d.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{isZh ? d.descZh : d.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------ Featured projects ----------------------- */}
      <section>
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow={isZh ? '精选项目' : 'Featured Projects'}
            title={isZh ? '正在构建的东西' : 'Things I’m building'}
          />
          <Reveal className="hidden shrink-0 sm:block">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {isZh ? '全部项目' : 'All projects'}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <Link
                to={`/projects/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-edge bg-card transition-all duration-300 hover:-translate-y-0.5 hover:border-edge-strong hover:shadow-lg hover:shadow-zinc-950/[0.05]"
              >
                <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-edge">
                  {p.slug === 'projectmemo' ? (
                    <img
                      src={pmPreview}
                      alt={isZh ? p.nameZh : p.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/[0.08] via-violet-500/[0.05] to-fuchsia-500/[0.08]">
                      <span className="font-mono text-6xl font-bold tracking-tight text-ink/[0.07] transition-colors duration-300 group-hover:text-indigo-500/15">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                      {isZh ? p.typeZh : p.type}
                    </span>
                    {p.status && (
                      <span className="inline-flex shrink-0 items-center rounded-full bg-violet-500/10 px-2.5 py-1 text-[11px] font-semibold text-violet-600 ring-1 ring-inset ring-violet-500/20 dark:text-violet-300">
                        {isZh ? p.statusZh : p.status}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-ink">
                    {isZh ? p.nameZh : p.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
                    {isZh ? p.descriptionZh : p.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-1.5">
                    {p.tags.slice(0, 3).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                    {p.tags.length > 3 && <Tag>+{p.tags.length - 3}</Tag>}
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:group-hover:text-indigo-400" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------ */}
      <section>
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/15 to-violet-500/15 blur-3xl" />
            <h2 className="relative text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {isZh ? '一起做点有趣的东西' : 'Let’s build something interesting'}
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
              {isZh
                ? '欢迎交流 Agent、数学或任何有趣的研究想法。'
                : 'Always up for a conversation about agents, math, or interesting research problems.'}
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas transition-all hover:opacity-85"
              >
                {isZh ? '联系我' : 'Get in Touch'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href={`https://github.com/${personalData.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-edge bg-card px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-edge-strong"
              >
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
};

export default Home;
