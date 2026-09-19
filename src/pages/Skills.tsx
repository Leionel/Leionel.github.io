import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Settings, Sigma, Terminal } from 'lucide-react';
import skillsData from '../data/skills.json';
import { useLanguage } from '../contexts/language';
import { Reveal } from '../components/ui';
import SpotlightCard from '../components/SpotlightCard';
import BorderBeam from '../components/BorderBeam';

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; badge: string }> = {
  'AI & Agents': {
    icon: <Bot className="h-5 w-5" />,
    color: 'from-indigo-500/15 via-violet-500/15 to-transparent text-indigo-500 dark:text-indigo-400',
    badge: 'group-hover:border-indigo-500/40',
  },
  'Languages & Frameworks': {
    icon: <Terminal className="h-5 w-5" />,
    color: 'from-emerald-500/15 via-teal-500/15 to-transparent text-emerald-500 dark:text-emerald-400',
    badge: 'group-hover:border-emerald-500/40',
  },
  'Math & Algorithms': {
    icon: <Sigma className="h-5 w-5" />,
    color: 'from-violet-500/15 via-fuchsia-500/15 to-transparent text-violet-500 dark:text-violet-400',
    badge: 'group-hover:border-violet-500/40',
  },
  'Engineering & Others': {
    icon: <Settings className="h-5 w-5" />,
    color: 'from-amber-500/15 via-orange-500/15 to-transparent text-amber-500 dark:text-amber-400',
    badge: 'group-hover:border-amber-500/40',
  },
};

const Skills = () => {
  const { isZh } = useLanguage();

  return (
    <div className="space-y-16 md:space-y-24">
      <Reveal className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
          {isZh ? '技能' : 'Skills'}
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {isZh ? '技术与能力' : 'Skills & Expertise'}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-muted sm:text-lg">
          {isZh
            ? '做智能体工程所需的数理基础、框架与工具箱。'
            : 'The math, frameworks, and tooling behind the agent systems I build.'}
        </p>
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {skillsData.map((category, i) => {
          const cfg = categoryConfig[category.category] || {
            icon: <Bot className="h-5 w-5" />,
            color: 'from-indigo-500/15 to-violet-500/15 text-indigo-500',
            badge: '',
          };

          return (
            <Reveal key={category.category} delay={i * 70}>
              <SpotlightCard className="group h-full p-7 sm:p-8 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3.5">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cfg.color} transition-transform duration-300 group-hover:scale-110 shadow-sm`}>
                    {cfg.icon}
                  </span>
                  <h2 className="text-[17px] font-bold tracking-tight text-ink">
                    {isZh ? category.categoryZh : category.category}
                  </h2>
                </div>
                <ul className="mt-6 divide-y divide-edge/60">
                  {category.skills.map((s) => (
                    <li
                      key={s.name}
                      className="group/item flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                    >
                      <span className="shrink-0 text-sm font-semibold text-ink transition-colors group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400">
                        {isZh ? s.nameZh : s.name}
                      </span>
                      <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-ink-faint">
                        <ArrowRight className="h-3 w-3 shrink-0 text-edge-strong transition-transform group-hover/item:translate-x-0.5" />
                        {s.usedIn.map((u, j) => (
                          <Fragment key={u.name}>
                            {j > 0 && <span className="text-edge-strong">·</span>}
                            {u.slug ? (
                              <Link
                                to={`/projects/${u.slug}`}
                                className="underline decoration-edge-strong underline-offset-2 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                              >
                                {isZh ? u.nameZh : u.name}
                              </Link>
                            ) : (
                              <span>{isZh ? u.nameZh : u.name}</span>
                            )}
                          </Fragment>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>

      <Reveal>
        <figure className="gradient-border relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-16 shadow-lg shadow-indigo-500/5">
          <BorderBeam size={260} duration={14} />
          <blockquote className="relative mx-auto max-w-2xl text-xl font-semibold leading-relaxed tracking-tight text-ink sm:text-2xl">
            <span aria-hidden className="absolute -left-3 -top-6 select-none font-mono text-5xl text-indigo-500/30 sm:-left-8">
              “
            </span>
            {isZh ? '数学是科学的逻辑，代码是它的表达。' : 'Math is the logic of science; code is its manifestation.'}
          </blockquote>
          <figcaption className="mt-4 font-mono text-xs uppercase tracking-wider text-ink-faint">
            {isZh ? '持续学习，探索 AI 研究的新边界。' : 'Continuously learning, exploring new frontiers in AI research.'}
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
};

export default Skills;
