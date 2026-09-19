import { ArrowRight, ArrowUpRight, Download, Medal, Network, Sigma, Sparkles, Workflow, Database, Compass, BookOpen, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import personalData from '../data/personal.json';
import projectsData from '../data/projects.json';
import directionsData from '../data/directions.json';
import nowData from '../data/now.json';
import { useLanguage } from '../contexts/language';
import { Reveal, SectionHeading, Tag } from '../components/ui';
import AgentNetworkCanvas from '../components/AgentNetworkCanvas';
import SpotlightCard from '../components/SpotlightCard';
import BorderBeam from '../components/BorderBeam';
import TiltCard from '../components/TiltCard';
import AgentLoopVisualizer from '../components/AgentLoopVisualizer';
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
      <section className="relative">
        {/* Dynamic Agent / Math Constellation Canvas */}
        <AgentNetworkCanvas className="absolute -inset-x-6 -top-12 -bottom-10 -z-10 h-[calc(100%+5rem)] w-[calc(100%+3rem)] opacity-70 transition-opacity duration-700 pointer-events-none" />

        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-edge/80 bg-card/80 px-4 py-1.5 text-[13px] font-medium text-ink-muted shadow-sm backdrop-blur-md transition-colors hover:border-indigo-500/40">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
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
              <div className="mt-9 flex flex-wrap items-center gap-3.5">
                <Link
                  to="/projects"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas shadow-md shadow-zinc-950/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
                >
                  <span className="relative z-10">{isZh ? '查看项目' : 'View Projects'}</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-indigo-500/20 via-violet-500/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center rounded-full border border-edge/80 bg-card/80 px-6 py-3 text-sm font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-edge-strong active:scale-[0.98]"
                >
                  {isZh ? '联系我' : 'Contact Me'}
                </Link>
                <a
                  href={resumeUrl}
                  download
                  className="group inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-ink-muted transition-colors hover:text-ink"
                >
                  <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  {isZh ? '简历' : 'Resume'}
                </a>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-12 grid grid-cols-3 gap-3 border-t border-edge pt-7 sm:max-w-md">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="group rounded-2xl border border-edge/60 bg-card/40 p-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-edge-strong hover:bg-card hover:shadow-sm"
                  >
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                      {s.value}
                    </dd>
                    <dd className="mt-1 text-[12px] leading-tight text-ink-faint">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Photo composition */}
          <Reveal delay={200} className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="absolute -inset-8 -z-10 rounded-[40px] bg-gradient-to-br from-indigo-500/20 via-violet-500/15 to-fuchsia-500/15 blur-3xl animate-pulse-slow" />
            
            <TiltCard maxTilt={10} scale={1.02} className="relative">
              <div className="group relative overflow-hidden rounded-[28px] border border-edge/80 bg-card/50 shadow-2xl shadow-zinc-950/10 backdrop-blur transition-all duration-500 hover:shadow-indigo-500/15">
                <img
                  src={profilePhoto}
                  alt={isZh ? '肖圣鑫的照片' : 'Photo of Shengxin Xiao'}
                  className="aspect-[4/5] w-full object-cover object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/10" />
              </div>

              {/* Floating Badges with 3D Pop */}
              <div
                style={{ transform: 'translateZ(38px)' }}
                className="animate-float absolute -left-4 top-10 hidden items-center gap-2.5 rounded-2xl border border-edge/80 bg-card/95 py-2.5 pl-3 pr-4 shadow-xl shadow-zinc-950/[0.1] backdrop-blur-md transition-transform duration-300 hover:scale-105 sm:flex"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400">
                  <Medal className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold text-ink">{isZh ? '全国数学竞赛' : 'CMC'}</p>
                  <p className="text-xs text-ink-faint">{isZh ? '省级一等奖' : 'First Prize'}</p>
                </div>
              </div>

              <div
                style={{ transform: 'translateZ(38px)' }}
                className="animate-float-delayed absolute -right-3 bottom-12 hidden items-center gap-2.5 rounded-2xl border border-edge/80 bg-card/95 py-2.5 pl-3 pr-4 shadow-xl shadow-zinc-950/[0.1] backdrop-blur-md transition-transform duration-300 hover:scale-105 sm:flex"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 dark:text-violet-400">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="leading-tight">
                  <p className="text-[13px] font-semibold text-ink">{isZh ? '忆程 ProjectMemo' : 'ProjectMemo'}</p>
                  <p className="text-xs text-ink-faint">{isZh ? 'C4-AI 已进复赛' : 'C4-AI Semifinalist'}</p>
                </div>
              </div>
            </TiltCard>
          </Reveal>
        </div>
      </section>

      {/* ------------------------------- Now ------------------------------- */}
      <section>
        <Reveal>
          <SpotlightCard className="p-7 sm:p-9 rounded-3xl border border-edge/80">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50" />
                </span>
                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.22em] text-ink">Now · 实时近况</h2>
              </div>
              <span className="font-mono text-xs text-ink-faint">{isZh ? nowData.updatedZh : nowData.updatedEn}</span>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                { data: nowData.exploring, icon: <Compass className="h-3.5 w-3.5" /> },
                { data: nowData.building, icon: <Layers className="h-3.5 w-3.5" /> },
                { data: nowData.reading, icon: <BookOpen className="h-3.5 w-3.5" /> },
              ].map(({ data: col, icon }) => (
                <div
                  key={col.label}
                  className="rounded-2xl border border-edge/60 bg-card-muted/40 p-4 transition-colors hover:border-edge-strong"
                >
                  <p className="flex items-center gap-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-indigo-500 dark:text-indigo-400">
                    {icon}
                    {isZh ? col.labelZh : col.label}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {(isZh ? col.items : col.itemsEn).map((it) => (
                      <li key={it} className="flex items-start gap-2 text-sm leading-relaxed text-ink-muted">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500/50" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </SpotlightCard>
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
              <SpotlightCard className="group h-full p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 via-violet-500/10 to-transparent text-indigo-500 transition-all duration-300 group-hover:scale-110 group-hover:from-indigo-500/20 group-hover:to-violet-500/20 dark:text-indigo-400">
                  {directionIcons[d.id]}
                </div>
                <h3 className="mt-4 text-[16px] font-semibold text-ink group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {isZh ? d.titleZh : d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{isZh ? d.descZh : d.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ------------------------ Agent Harness Loop ----------------------- */}
      <section>
        <Reveal>
          <AgentLoopVisualizer />
        </Reveal>
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
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <SpotlightCard className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1">
                {/* Luminous border beam for the flagship project */}
                {i === 0 && <BorderBeam size={220} duration={14} />}

                <Link to={`/projects/${p.slug}`} className="flex h-full flex-col">
                  <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden border-b border-edge bg-card-muted">
                    {p.slug === 'projectmemo' ? (
                      <div className="relative h-full w-full overflow-hidden">
                        <img
                          src={pmPreview}
                          alt={isZh ? p.nameZh : p.name}
                          loading="lazy"
                          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500/[0.08] via-violet-500/[0.05] to-fuchsia-500/[0.08] transition-colors duration-500 group-hover:from-indigo-500/[0.14] group-hover:to-fuchsia-500/[0.14]">
                        <span className="font-mono text-6xl font-bold tracking-tight text-ink/[0.08] transition-all duration-500 group-hover:scale-110 group-hover:text-indigo-500/20">
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
                    <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                      {isZh ? p.nameZh : p.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
                      {isZh ? p.descriptionZh : p.description}
                    </p>
                    <div className="mt-5 flex flex-wrap items-center gap-1.5 pt-2 border-t border-edge/50">
                      {p.tags.slice(0, 3).map((t) => (
                        <Tag key={t} className="transition-colors group-hover:border-edge-strong">{t}</Tag>
                      ))}
                      {p.tags.length > 3 && <Tag>+{p.tags.length - 3}</Tag>}
                      <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-ink-faint transition-all duration-300 group-hover:text-indigo-500 group-hover:translate-x-0.5">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* -------------------------------- CTA ------------------------------ */}
      <section>
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 shadow-lg shadow-indigo-500/5">
            <BorderBeam size={280} duration={16} />
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-500/20 to-violet-500/20 blur-3xl animate-pulse-slow" />
            <h2 className="relative text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              {isZh ? '一起做点有趣的东西' : 'Let’s build something interesting'}
            </h2>
            <p className="relative mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
              {isZh
                ? '欢迎交流 Agent、数学或任何有趣的研究想法。'
                : 'Always up for a conversation about agents, math, or interesting research problems.'}
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-6 py-3 text-sm font-semibold text-canvas shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20 active:scale-[0.98]"
              >
                <span className="relative z-10">{isZh ? '联系我' : 'Get in Touch'}</span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`https://github.com/${personalData.contact.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-edge/80 bg-card/80 px-6 py-3 text-sm font-semibold text-ink backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-edge-strong active:scale-[0.98]"
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
