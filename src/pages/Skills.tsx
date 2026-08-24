import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Settings, Sigma, Terminal } from 'lucide-react';
import skillsData from '../data/skills.json';
import { useLanguage } from '../contexts/language';
import { Reveal } from '../components/ui';

const categoryIcons: Record<string, React.ReactNode> = {
  'AI & Agents': <Bot className="h-5 w-5" />,
  'Languages & Frameworks': <Terminal className="h-5 w-5" />,
  'Math & Algorithms': <Sigma className="h-5 w-5" />,
  'Engineering & Others': <Settings className="h-5 w-5" />,
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

      <div className="grid gap-4 md:grid-cols-2">
        {skillsData.map((category, i) => (
          <Reveal key={category.category} delay={i * 70}>
            <div className="h-full rounded-2xl border border-edge bg-card p-7 transition-colors hover:border-edge-strong sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 text-indigo-500 dark:text-indigo-400">
                  {categoryIcons[category.category]}
                </span>
                <h2 className="text-[17px] font-semibold tracking-tight text-ink">
                  {isZh ? category.categoryZh : category.category}
                </h2>
              </div>
              <ul className="mt-5 divide-y divide-edge">
                {category.skills.map((s) => (
                  <li
                    key={s.name}
                    className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                  >
                    <span className="shrink-0 text-sm font-semibold text-ink">{isZh ? s.nameZh : s.name}</span>
                    <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-ink-faint">
                      <ArrowRight className="h-3 w-3 shrink-0 text-edge-strong" />
                      {s.usedIn.map((u, j) => (
                        <Fragment key={u.name}>
                          {j > 0 && <span className="text-edge-strong">·</span>}
                          {u.slug ? (
                            <Link
                              to={`/projects/${u.slug}`}
                              className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
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
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <figure className="gradient-border rounded-3xl px-8 py-12 text-center sm:px-16">
          <blockquote className="relative mx-auto max-w-2xl text-xl font-medium leading-relaxed tracking-tight text-ink sm:text-2xl">
            <span aria-hidden className="absolute -left-2 -top-6 select-none font-mono text-5xl text-indigo-500/30 sm:-left-8">
              “
            </span>
            {isZh ? '数学是科学的逻辑，代码是它的表达。' : 'Math is the logic of science; code is its manifestation.'}
          </blockquote>
          <figcaption className="mt-4 text-sm text-ink-faint">
            {isZh ? '持续学习，探索 AI 研究的新边界。' : 'Continuously learning, exploring new frontiers in AI research.'}
          </figcaption>
        </figure>
      </Reveal>
    </div>
  );
};

export default Skills;
